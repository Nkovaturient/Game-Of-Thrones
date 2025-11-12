const express = require("express");
const router = express.Router();
const {InferenceClient} = require("@huggingface/inference");
const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;

const client = new InferenceClient(HF_API_KEY);

router.post("/", async (req, res) => {

  try {
    const { userMsg } = req.body;
    if (!userMsg) {
      return res
        .status(400)
        .json({ success: false, message: "Message cannot be empty" });
    }

    let out = "";

    const stream = client.chatCompletionStream({
      model: "Qwen/Qwen2.5-72B-Instruct",  // "Qwen/Qwen3-32B",
      messages: [{ role: "user", content: userMsg }],
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 0.7,
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const deltaContent = chunk.choices[0].delta?.content;
        if (typeof deltaContent === 'string') {
          out += deltaContent;
        }
      }
    }

    return res.status(200).json({ success: true, aiResponse: out });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Error-${err.message}` });
  }
});

module.exports = router;
