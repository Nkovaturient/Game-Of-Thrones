const faceapi = require('@vladmandic/face-api');
const fs = require('fs');
const path = require('path');
const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas;
const tf = require('@tensorflow/tfjs-node');

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
faceapi.tf = tf;

const MODELS_DIR = path.join(__dirname, 'models');
const IMAGE_DIR = path.join(__dirname, 'images');
const OUTPUT_FILE = path.join(__dirname, 'character_embeddings.json');

async function ensureModelsLoaded() {
  await tf.ready();
  await faceapi.tf.setBackend('tensorflow');
  await faceapi.tf.ready();
  await Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_DIR),
    faceapi.nets.faceLandmark68Net.loadFromDisk(MODELS_DIR),
    faceapi.nets.ssdMobilenetv1.loadFromDisk(MODELS_DIR),
  ]);
}


async function createEmbeddings() {
  console.log('Initializing TensorFlow backend...');
  await ensureModelsLoaded();
  console.log('Active backend:', tf.getBackend());

  const files = await fs.promises.readdir(IMAGE_DIR);
  const embeddings = [];

  for (const file of files) {
    const imgPath = path.join(IMAGE_DIR, file);
    const stat = await fs.promises.stat(imgPath);

    if (!stat.isFile()) {
      continue;
    }

    const characterName = path.basename(file, path.extname(file));
    console.log(`Processing ${characterName}...`);

    const img = await canvas.loadImage(imgPath);
    const detection = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      console.warn(`No face detected in ${file}, skipping.`);
      continue;
    }

    embeddings.push({
      name: characterName,
      embedding: Array.from(detection.descriptor),
      sourceImage: file,
      updatedAt: new Date().toISOString(),
    });
  }

  await fs.promises.writeFile(OUTPUT_FILE, JSON.stringify(embeddings, null, 2));
  console.log(`Embeddings saved to ${OUTPUT_FILE} (${embeddings.length} records).`);
}

if (require.main === module) {
  createEmbeddings().catch((error) => {
    console.error('Failed to build embeddings:', error);
    process.exit(1);
  });
}

module.exports = {
  createEmbeddings,
};
