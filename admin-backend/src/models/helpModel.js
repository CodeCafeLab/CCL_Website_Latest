const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM help_articles ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.getPublished = async () => {
  const [rows] = await db.query('SELECT * FROM help_articles WHERE status = "published" ORDER BY featured DESC, created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.getByCategory = async (category) => {
  const [rows] = await db.query('SELECT * FROM help_articles WHERE category = ? AND status = "published" ORDER BY featured DESC, created_at DESC', [category]);
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.getFeatured = async () => {
  const [rows] = await db.query('SELECT * FROM help_articles WHERE featured = true AND status = "published" ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.create = async (helpArticle) => {
  const helpArticleData = {
    ...helpArticle,
    tags: helpArticle.tags ? JSON.stringify(helpArticle.tags) : null,
  };
  const [result] = await db.query('INSERT INTO help_articles SET ?', helpArticleData);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM help_articles WHERE id = ?', [id]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  };
};

exports.findBySlug = async (slug) => {
  const [rows] = await db.query('SELECT * FROM help_articles WHERE slug = ?', [slug]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  };
};

exports.update = async (id, helpArticle) => {
  const helpArticleData = {
    ...helpArticle,
    tags: helpArticle.tags ? JSON.stringify(helpArticle.tags) : null,
  };
  const [result] = await db.query('UPDATE help_articles SET ? WHERE id = ?', [helpArticleData, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM help_articles WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

exports.incrementViews = async (id) => {
  const [result] = await db.query('UPDATE help_articles SET views = views + 1 WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

exports.incrementHelpfulVotes = async (id) => {
  const [result] = await db.query('UPDATE help_articles SET helpful_votes = helpful_votes + 1 WHERE id = ?', [id]);
  return result.affectedRows > 0;
}; 