const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM news ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.getPublished = async () => {
  const [rows] = await db.query('SELECT * FROM news WHERE status = "published" ORDER BY featured DESC, created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.getFeatured = async () => {
  const [rows] = await db.query('SELECT * FROM news WHERE featured = true AND status = "published" ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.create = async (news) => {
  const newsData = {
    ...news,
    tags: news.tags ? JSON.stringify(news.tags) : null,
  };
  const [result] = await db.query('INSERT INTO news SET ?', newsData);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM news WHERE id = ?', [id]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  };
};

exports.findBySlug = async (slug) => {
  const [rows] = await db.query('SELECT * FROM news WHERE slug = ?', [slug]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  };
};

exports.update = async (id, news) => {
  const newsData = {
    ...news,
    tags: news.tags ? JSON.stringify(news.tags) : null,
  };
  const [result] = await db.query('UPDATE news SET ? WHERE id = ?', [newsData, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM news WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

exports.incrementViews = async (id) => {
  const [result] = await db.query('UPDATE news SET views = views + 1 WHERE id = ?', [id]);
  return result.affectedRows > 0;
};