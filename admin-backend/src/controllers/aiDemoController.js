const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.runAIDemo = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const answer = result.response.text();
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: "AI request failed", details: err.message });
  }
};

// GET endpoint for AI demo info
exports.getAIDemoInfo = (req, res) => {
  res.json({
    message: "This is the AI Demo endpoint. Use POST to /api/ai-demo with a 'prompt' to get a response from Gemini AI.",
    usage: {
      method: "POST",
      endpoint: "/api/ai-demo",
      body: { prompt: "<your prompt here>" }
    }
  });
};
