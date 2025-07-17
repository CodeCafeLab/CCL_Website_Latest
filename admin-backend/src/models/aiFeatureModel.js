const db = require("../config/db");

exports.create = async (data) => {
  const { title, description, image_url, category, tags, link } = data;
  const [result] = await db.query(
    "INSERT INTO ai_features (title, description, image_url, category, tags, link) VALUES (?, ?, ?, ?, ?, ?)",
    [title, description, image_url, category, tags, link]
  );
  return result.insertId;
};

exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM ai_features ORDER BY created_at DESC");
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM ai_features WHERE id = ?", [id]);
  return rows[0];
};

exports.update = async (id, data) => {
  const { title, description, image_url, category, tags, link } = data;
  const [result] = await db.query(
    "UPDATE ai_features SET title=?, description=?, image_url=?, category=?, tags=?, link=? WHERE id=?",
    [title, description, image_url, category, tags, link, id]
  );
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM ai_features WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

// Increment view count for an AI feature
exports.incrementViewCount = async (id) => {
  const [result] = await db.query(
    "UPDATE ai_features SET view_count = IFNULL(view_count,0) + 1 WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
};
