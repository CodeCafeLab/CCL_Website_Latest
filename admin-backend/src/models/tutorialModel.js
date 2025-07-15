const db = require('../config/db');

function safeParse(str, fallback) {
  if (!str) return fallback;
  try {
    return JSON.parse(str);
  } catch {
    if (typeof str === 'string' && str.includes(',')) {
      return str.split(',').map(s => s.trim()).filter(Boolean);
    }
    return fallback;
  }
}

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM tutorials ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.getPublished = async () => {
  const [rows] = await db.query('SELECT * FROM tutorials WHERE status = "published" ORDER BY featured DESC, created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.getByDifficulty = async (difficulty) => {
  const [rows] = await db.query('SELECT * FROM tutorials WHERE difficulty = ? AND status = "published" ORDER BY featured DESC, created_at DESC', [difficulty]);
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.getFeatured = async () => {
  const [rows] = await db.query('SELECT * FROM tutorials WHERE featured = true AND status = "published" ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.create = async (tutorial) => {
  const tutorialData = {
    ...tutorial,
    tags: Array.isArray(tutorial.tags) ? JSON.stringify(tutorial.tags) : (typeof tutorial.tags === 'string' ? JSON.stringify(safeParse(tutorial.tags, [])) : null),
  };
  const [result] = await db.query('INSERT INTO tutorials SET ?', tutorialData);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM tutorials WHERE id = ?', [id]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: safeParse(row.tags, []),
  };
};

exports.findBySlug = async (slug) => {
  const [rows] = await db.query('SELECT * FROM tutorials WHERE slug = ?', [slug]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: safeParse(row.tags, []),
  };
};

exports.update = async (id, tutorial) => {
  const tutorialData = {
    ...tutorial,
    tags: Array.isArray(tutorial.tags) ? JSON.stringify(tutorial.tags) : (typeof tutorial.tags === 'string' ? JSON.stringify(safeParse(tutorial.tags, [])) : null),
  };
  const [result] = await db.query('UPDATE tutorials SET ? WHERE id = ?', [tutorialData, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM tutorials WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

exports.incrementViews = async (id) => {
  const [result] = await db.query('UPDATE tutorials SET views = views + 1 WHERE id = ?', [id]);
  return result.affectedRows > 0;
};