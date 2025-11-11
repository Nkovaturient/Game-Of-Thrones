const path = require('path');
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const faceapi = require('@vladmandic/face-api');
const canvas = require('@napi-rs/canvas');

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
faceapi.tf = tf;

const MODELS_DIR = path.join(__dirname, '..', 'models');
const EMBEDDINGS_FILE = path.join(__dirname, '..', 'character_embeddings.json');
const MATCH_THRESHOLD = 0.6;
const MAX_DISTANCE_FOR_SIMILARITY = 1.2;

let embeddings = [];
let initialized = false;
let initializingPromise = null;

async function init() {
  if (initialized) {
    return;
  }

  if (initializingPromise) {
    return initializingPromise;
  }

  initializingPromise = (async () => {
    await tf.ready();
    await faceapi.tf.setBackend('tensorflow');
    await faceapi.tf.ready();
    await Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_DIR),
      faceapi.nets.faceLandmark68Net.loadFromDisk(MODELS_DIR),
      faceapi.nets.ssdMobilenetv1.loadFromDisk(MODELS_DIR),
    ]);

    embeddings = loadEmbeddingsFromDisk();
    initialized = true;
  })();

  return initializingPromise;
}

function loadEmbeddingsFromDisk() {
  if (!fs.existsSync(EMBEDDINGS_FILE)) {
    throw new Error(
      `Embeddings file not found at ${EMBEDDINGS_FILE}. Run loadModel.js to generate it.`
    );
  }

  const fileContents = fs.readFileSync(EMBEDDINGS_FILE, 'utf-8').trim();
  if (!fileContents) {
    return [];
  }

  const parsed = JSON.parse(fileContents);

  return parsed.map((entry) => ({
    ...entry,
    normalizedEmbedding: normalizeDescriptor(entry.embedding),
  }));
}

async function detectDescriptorFromImage(dataUrl) {
  if (!initialized) {
    await init();
  }

  const imageBuffer = decodeBase64Image(dataUrl);
  const img = await canvas.loadImage(imageBuffer);
  const detection = await faceapi
    .detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detection) {
    return null;
  }

  const descriptor = Array.from(detection.descriptor);
  return normalizeDescriptor(descriptor);
}

function decodeBase64Image(dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string') {
    throw new Error('Invalid image payload');
  }

  const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
  return Buffer.from(base64Data, 'base64');
}

function findBestMatch(descriptor, topK = 3) {
  if (!Array.isArray(descriptor) || descriptor.length === 0) {
    throw new Error('Descriptor is empty or invalid');
  }

  const normalizedDescriptor = normalizeDescriptor(descriptor);

  const rankedMatches = embeddings
    .filter((character) =>
      Array.isArray(character.normalizedEmbedding) && character.normalizedEmbedding.length > 0
    )
    .map((character) => {
      const distance = faceapi.euclideanDistance(normalizedDescriptor, character.normalizedEmbedding);
      return {
        name: character.name,
        distance,
        similarity: distanceToSimilarity(distance),
        passedThreshold: distance <= MATCH_THRESHOLD,
        sourceImage: character.sourceImage || null,
        updatedAt: character.updatedAt || null,
      };
    })
    .sort((a, b) => a.distance - b.distance);

  const matches = rankedMatches.slice(0, Math.max(1, topK));

  return {
    threshold: MATCH_THRESHOLD,
    matches,
    bestMatch: matches.length > 0 ? matches[0] : null,
  };
}

function distanceToSimilarity(distance) {
  const cappedDistance = Math.min(Math.max(distance, 0), MAX_DISTANCE_FOR_SIMILARITY);
  const normalized = 1 - cappedDistance / MAX_DISTANCE_FOR_SIMILARITY;
  return Math.round(normalized * 100);
}

function normalizeDescriptor(vector) {
  if (!Array.isArray(vector) || vector.length === 0) {
    return [];
  }

  const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));

  if (!norm) {
    return vector.slice();
  }

  return vector.map((val) => val / norm);
}

function getEmbeddings() {
  return embeddings.map(({ name, sourceImage = null, updatedAt = null }) => ({
    name,
    sourceImage,
    updatedAt,
  }));
}

module.exports = {
  init,
  detectDescriptorFromImage,
  findBestMatch,
  getEmbeddings,
};

