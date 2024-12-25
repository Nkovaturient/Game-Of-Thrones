'use client';

import { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import GOT_EMBEDDINGS from './got_embeddings.json'; // Precomputed embeddings for GOT characters
import { motion } from 'framer-motion';

export default function LookalikeCam() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [matchResult, setMatchResult] = useState(null);

  useEffect(() => {
    async function loadModel() {
      const loadedModel = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      );
      setModel(loadedModel);
    }

    loadModel();
  }, []);

  useEffect(() => {
    async function startCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }

    startCamera();
  }, []);

  const analyzeFace = async () => {
    if (!model || !videoRef.current) return;

    const predictions = await model.estimateFaces({ input: videoRef.current });

    if (predictions.length === 0) {
      setMatchResult('No face detected. Please try again.');
      return;
    }

    // Extract facial embedding
    const userEmbedding = predictions[0].scaledMesh.flat();

    // Find closest match
    const closestMatch = findClosestMatch(userEmbedding);
    setMatchResult(closestMatch);
  };

  const findClosestMatch = (userEmbedding) => {
    let closestMatch = null;
    let smallestDistance = Infinity;

    GOT_EMBEDDINGS.forEach((character) => {
      const distance = cosineSimilarity(userEmbedding, character.embedding);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestMatch = character.name;
      }
    });

    return closestMatch;
  };

  const cosineSimilarity = (embedding1, embedding2) => {
    const dotProduct = embedding1.reduce((sum, val, i) => sum + val * embedding2[i], 0);
    const norm1 = Math.sqrt(embedding1.reduce((sum, val) => sum + val ** 2, 0));
    const norm2 = Math.sqrt(embedding2.reduce((sum, val) => sum + val ** 2, 0));
    return 1 - dotProduct / (norm1 * norm2); // Return 1 - cosine similarity for distance
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-5">Find Your Game of Thrones Match</h1>
      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Video Section */}
        <div className="relative">
          <video
            ref={videoRef}
            className="rounded-lg shadow-lg w-[300px] h-[300px] bg-gray-800"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-[300px] h-[300px] rounded-lg"
          />
        </div>

        {/* Prediction Section */}
        <div className="text-center">
          {matchResult ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-900 p-5 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold text-yellow-400 mb-3">Match Found:</h2>
              <p className="text-xl">{matchResult}</p>
            </motion.div>
          ) : (
            <p className="text-lg">Click "Analyze" to find your match!</p>
          )}
          <button
            onClick={analyzeFace}
            className="mt-5 bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600"
          >
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
}
