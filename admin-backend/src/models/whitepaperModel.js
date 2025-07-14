const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM whitepapers ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.getPublished = async () => {
  const [rows] = await db.query('SELECT * FROM whitepapers WHERE status = "published" ORDER BY featured DESC, created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.getFeatured = async () => {
  const [rows] = await db.query('SELECT * FROM whitepapers WHERE featured = true AND status = "published" ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.create = async (whitepaper) => {
  const whitepaperData = {
    ...whitepaper,
    tags: whitepaper.tags ? JSON.stringify(whitepaper.tags) : null,
  };
  const [result] = await db.query('INSERT INTO whitepapers SET ?', whitepaperData);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM whitepapers WHERE id = ?', [id]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  };
};

exports.findBySlug = async (slug) => {
  const [rows] = await db.query('SELECT * FROM whitepapers WHERE slug = ?', [slug]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  };
};

exports.update = async (id, whitepaper) => {
  const whitepaperData = {
    ...whitepaper,
    tags: whitepaper.tags ? JSON.stringify(whitepaper.tags) : null,
  };
  const [result] = await db.query('UPDATE whitepapers SET ? WHERE id = ?', [whitepaperData, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM whitepapers WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

exports.incrementDownloads = async (id) => {
  const [result] = await db.query('UPDATE whitepapers SET download_count = download_count + 1 WHERE id = ?', [id]);
  return result.affectedRows > 0;
}; 