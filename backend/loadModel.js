const faceapi = require('face-api.js');
const fs = require('fs');
const path = require('path');
const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas;
const tf = require('@tensorflow/tfjs-node');

// Bind face-api.js to use Node.js canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const IMAGE_DIR = './images';
const OUTPUT_FILE = './character_embeddings.json';

(async () => {
    try {
        // Ensure TensorFlow backend is ready
        console.log('Initializing TensorFlow...');
        await tf.ready();
        console.log('Active backend:', tf.getBackend());

        // Load face-api.js models
        console.log('Loading models...');
        await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');
        await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
        await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
        console.log('Models loaded successfully.');

        const files = fs.readdirSync(IMAGE_DIR);
        const embeddings = [];

        for (const file of files) {
            const imgPath = path.join(IMAGE_DIR, file);
            const img = await canvas.loadImage(imgPath);

            console.log(`Processing ${file}...`);
            const detection = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!detection) {
                console.log(`No face detected in ${file}`);
                continue; // Skip this file if no face is detected
            }

            // Save embedding and character name
            const characterName = path.basename(file, path.extname(file));
            embeddings.push({
                name: characterName,
                embedding: Array.from(detection.descriptor),
            });

            console.log(`Processed ${characterName}`);
        }

        // Save embeddings to JSON
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(embeddings, null, 2));
        console.log(`Embeddings saved to ${OUTPUT_FILE}`);
    } catch (error) {
        console.log('Error:', error.message);
        console.log('Stack:', error.stack);
    }
})();
