const db = require("../config/db");

exports.getAll = async () => {
  const [rows] = await db.query("SELECT * FROM quick_bites ORDER BY created_at DESC");
  return rows;
};

exports.create = async (quickBite) => {
  try {
    const quickBiteData = {
      title: quickBite.title,
      description: quickBite.description,
      video_url: quickBite.video_url,
      duration: quickBite.duration,
      category: quickBite.category,
      tags: quickBite.tags ? JSON.stringify(quickBite.tags) : null,
      author: quickBite.author,
      author_id: quickBite.author_id,
      status: quickBite.status || "draft",
      featured: quickBite.featured || false,
      views: quickBite.views || 0,
      likes: quickBite.likes || 0,
      created_at: new Date(),
    };

    const [result] = await db.query("INSERT INTO quick_bites SET ?", quickBiteData);
    return result.insertId;
  } catch (error) {
    console.error("Database error in create quick bite:", error);
    throw error;
  }
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM quick_bites WHERE id = ?", [id]);
  return rows[0];
};

exports.update = async (id, quickBite) => {
  const quickBiteData = {
    title: quickBite.title,
    description: quickBite.description,
    video_url: quickBite.video_url,
    duration: quickBite.duration,
    category: quickBite.category,
    tags: quickBite.tags ? JSON.stringify(quickBite.tags) : null,
    author: quickBite.author,
    author_id: quickBite.author_id,
    status: quickBite.status,
    featured: quickBite.featured,
    views: quickBite.views,
    likes: quickBite.likes,
  };

  const [result] = await db.query("UPDATE quick_bites SET ? WHERE id = ?", [
    quickBiteData,
    id,
  ]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM quick_bites WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

exports.getFeatured = async () => {
  const [rows] = await db.query("SELECT * FROM quick_bites WHERE featured = true AND status = 'published' ORDER BY created_at DESC");
  return rows;
};

exports.incrementViews = async (id) => {
  const [result] = await db.query("UPDATE quick_bites SET views = views + 1 WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

exports.incrementLikes = async (id) => {
  const [result] = await db.query("UPDATE quick_bites SET likes = likes + 1 WHERE id = ?", [id]);
  return result.affectedRows > 0;
}; 