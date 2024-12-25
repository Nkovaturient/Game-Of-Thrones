'use client';

import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export default function LookalikeCam() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [result, setResult] = useState(null);
  const [alikeImg, setAlikeImg]=useState(null);

const fetchEmbeddings = async () => {
    const res = await fetch('/character_embeddings.json');
    return await res.json();
  };

  const GOT_CHARACTERS = [
    { name: 'Jon Snow', embedding: [/* example embedding */] },
    { name: 'Daenerys Targaryen', embedding: [/* example embedding */] },
    // Add other characters here
  ];

  // Load the TensorFlow model
  useEffect(() => {
    async function loadModel() {
      const loadedModel = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      );
      setModel(loadedModel);
    }
    loadModel();
  }, []);

  // Start the camera
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

  // Analyze the face
  const analyzeFace = async () => {
    if (model && videoRef.current) {
      const predictions = await model.estimateFaces({
        input: videoRef.current,
      });

      if (predictions.length > 0) {
        const userEmbedding = extractEmbeddings(predictions[0]);
        const match = findBestMatch(userEmbedding);
        setResult(match.name);
        //setAlikeImg(match.img) //set with the img fs and display below using next/image src
      } else {
        setResult('No face detected');
      }
    }
  };

  // Extract embeddings from the face landmarks
  const extractEmbeddings = (prediction) => {
    // Simplified example: calculate embeddings from landmarks
    return prediction.scaledMesh.flat();
  };

  // Find the closest character match
  const findBestMatch = (userEmbedding) => {
    let closestMatch = null;
    let smallestDistance = Infinity;

    GOT_CHARACTERS.forEach((character) => {
      const distance = tf.metrics.cosineProximity(
        tf.tensor(userEmbedding),
        tf.tensor(character.embedding)
      );
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestMatch = character;
      }
    });

    return closestMatch;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-10">Find Your Game of Thrones Match</h1>
      <video ref={videoRef} className="w-3/4 h-auto mt-5 rounded-lg shadow-lg" />
      <button
        onClick={analyzeFace}
        className="mt-5 bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-500"
      >
        Analyze Face
      </button>
      {result && (
        <div className="mt-5 text-xl font-semibold">
          Your closest match is: <span className="text-yellow-400">{result}</span>
        </div>
      )}
    </div>
  );
}
