const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const chatRouter = require('./routes/chatbot');
const faceRecognitionService = require('./services/faceRecognitionService');

const app = express();
const PORT = process.env.PORT || 5200;

const allowedOrigins = [
  'http://localhost:3000',
  'https://game-of-thrones-xi-indol.vercel.app',
  process.env.FRONTEND_ORIGIN,
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api/chat', chatRouter);

app.get('/api/embeddings', async (req, res) => {
  try {
    await faceRecognitionService.init();
    res.json(faceRecognitionService.getEmbeddings());
  } catch (error) {
    res.status(500).json({ message: 'Failed to load embeddings', error: error.message });
  }
});

app.post('/api/match', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'Image payload is required' });
    }

    await faceRecognitionService.init();
    const descriptor = await faceRecognitionService.detectDescriptorFromImage(image);

    if (!descriptor) {
      return res.status(422).json({ message: 'No face detected in the provided image' });
    }

    const bestMatch = faceRecognitionService.findBestMatch(descriptor);
    res.json(bestMatch);
  } catch (error) {
    res.status(500).json({ message: 'Failed to process face match', error: error.message });
  }
});

app.get('/home', (req, res) => {
  res.send('Ice and Fire- Wit, Strategy & Grit! ');
});

(async () => {
  try {
    await faceRecognitionService.init();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/home`));
  } catch (error) {
    console.error('Failed to initialize ML models:', error);
    process.exit(1);
  }
})();
