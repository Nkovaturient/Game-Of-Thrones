const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const chatRouter=require("./routes/chatbot");
const bodyParser = require('body-parser');
const embeddings = [];

const PORT = process.env.PORT || 5200;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/chat', chatRouter);

app.get('/api/embeddings', (req, res) => {
  res.json(embeddings);
});

app.get("/home", (req,res)=>{
    res.send("Ice and Fire-");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/home`));
