const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res
      .status(500)
      .json({ error: "GEMINI_API_KEY is not set in environment" });
  }
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    res.status(500).json({ error: err.message, details: err.response?.data });
  }
});

module.exports = router;
