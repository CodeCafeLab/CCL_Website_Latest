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
  const [rows] = await db.query('SELECT * FROM webinars ORDER BY date_time DESC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.getUpcoming = async () => {
  const [rows] = await db.query('SELECT * FROM webinars WHERE status = "upcoming" AND date_time > NOW() ORDER BY date_time ASC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.getFeatured = async () => {
  const [rows] = await db.query('SELECT * FROM webinars WHERE featured = true AND status = "upcoming" ORDER BY date_time ASC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.getCompleted = async () => {
  const [rows] = await db.query('SELECT * FROM webinars WHERE status = "completed" ORDER BY date_time DESC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.create = async (webinar) => {
  const webinarData = {
    ...webinar,
    tags: Array.isArray(webinar.tags) ? JSON.stringify(webinar.tags) : (typeof webinar.tags === 'string' ? JSON.stringify(safeParse(webinar.tags, [])) : null),
  };
  const [result] = await db.query('INSERT INTO webinars SET ?', webinarData);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM webinars WHERE id = ?', [id]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: safeParse(row.tags, []),
  };
};

exports.findBySlug = async (slug) => {
  const [rows] = await db.query('SELECT * FROM webinars WHERE slug = ?', [slug]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: safeParse(row.tags, []),
  };
};

exports.update = async (id, webinar) => {
  const webinarData = {
    ...webinar,
    tags: Array.isArray(webinar.tags) ? JSON.stringify(webinar.tags) : (typeof webinar.tags === 'string' ? JSON.stringify(safeParse(webinar.tags, [])) : null),
  };
  const [result] = await db.query('UPDATE webinars SET ? WHERE id = ?', [webinarData, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM webinars WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

exports.updateStatus = async (id, status) => {
  const [result] = await db.query('UPDATE webinars SET status = ? WHERE id = ?', [status, id]);
  return result.affectedRows > 0;
};

exports.incrementRegistrations = async (id) => {
  const [result] = await db.query('UPDATE webinars SET registered_participants = registered_participants + 1 WHERE id = ?', [id]);
  return result.affectedRows > 0;
};