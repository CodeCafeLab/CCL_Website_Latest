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
  const [rows] = await db.query('SELECT * FROM reports ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.getPublished = async () => {
  const [rows] = await db.query('SELECT * FROM reports WHERE status = "published" ORDER BY featured DESC, created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.getFeatured = async () => {
  const [rows] = await db.query('SELECT * FROM reports WHERE featured = true AND status = "published" ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.create = async (report) => {
  const reportData = {
    ...report,
    tags: Array.isArray(report.tags) ? JSON.stringify(report.tags) : (typeof report.tags === 'string' ? JSON.stringify(safeParse(report.tags, [])) : null),
  };
  const [result] = await db.query('INSERT INTO reports SET ?', reportData);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM reports WHERE id = ?', [id]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: safeParse(row.tags, []),
  };
};

exports.findBySlug = async (slug) => {
  const [rows] = await db.query('SELECT * FROM reports WHERE slug = ?', [slug]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: safeParse(row.tags, []),
  };
};

exports.update = async (id, report) => {
  const reportData = {
    ...report,
    tags: Array.isArray(report.tags) ? JSON.stringify(report.tags) : (typeof report.tags === 'string' ? JSON.stringify(safeParse(report.tags, [])) : null),
  };
  const [result] = await db.query('UPDATE reports SET ? WHERE id = ?', [reportData, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM reports WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

exports.incrementDownloads = async (id) => {
  const [result] = await db.query('UPDATE reports SET download_count = download_count + 1 WHERE id = ?', [id]);
  return result.affectedRows > 0;
};