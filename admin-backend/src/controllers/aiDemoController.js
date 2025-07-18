// admin-backend/src/controllers/aiDemoController.js

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.runAIDemo = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  // Use the prompt directly, without any template
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4", etc.
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512,
      temperature: 0.7,
    });

    const answer = completion.choices[0].message.content.trim();
    res.json({ answer });
  } catch (err) {
    if (err.status === 429) {
      res.status(429).json({
        error: "AI request failed",
        details: "You have exceeded your OpenAI API quota. Please check your OpenAI account usage and billing."
      });
    } else {
      res.status(500).json({ error: "AI request failed", details: err.message });
    }
  }
};
