const db = require("../config/db");

// Create a new AI feature
exports.createAiFeature = async (req, res) => {
  try {
    const { title, description, image_url, category, tags, link } = req.body;
    const [result] = await db.query(
      "INSERT INTO ai_features (title, description, image_url, category, tags, link) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, image_url, category, tags, link]
    );
    const [rows] = await db.query("SELECT * FROM ai_features WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create AI feature", details: err.message });
  }
};

// Get all AI features
exports.getAllAiFeatures = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM ai_features ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch AI features", details: err.message });
  }
};

// Get a single AI feature by ID
exports.getAiFeatureById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM ai_features WHERE id = ?", [id]);
    if (!rows[0]) return res.status(404).json({ error: "AI feature not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch AI feature", details: err.message });
  }
};

// Update an AI feature
exports.updateAiFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_url, category, tags, link } = req.body;
    const [result] = await db.query(
      "UPDATE ai_features SET title=?, description=?, image_url=?, category=?, tags=?, link=? WHERE id=?",
      [title, description, image_url, category, tags, link, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "AI feature not found" });
    const [rows] = await db.query("SELECT * FROM ai_features WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update AI feature", details: err.message });
  }
};

// Delete an AI feature
exports.deleteAiFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM ai_features WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "AI feature not found" });
    res.json({ message: "AI feature deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete AI feature", details: err.message });
  }
};

// Increment view count for an AI feature
exports.incrementViewCount = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await require("../models/aiFeatureModel").incrementViewCount(id);
    if (!success) return res.status(404).json({ error: "AI feature not found" });
    res.json({ message: "View count incremented" });
  } catch (err) {
    res.status(500).json({ error: "Failed to increment view count", details: err.message });
  }
};
