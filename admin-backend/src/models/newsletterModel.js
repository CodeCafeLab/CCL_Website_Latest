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
  const [rows] = await db.query('SELECT * FROM newsletters ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.getScheduled = async () => {
  const [rows] = await db.query('SELECT * FROM newsletters WHERE status = "scheduled" ORDER BY scheduled_at ASC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.getSent = async () => {
  const [rows] = await db.query('SELECT * FROM newsletters WHERE status = "sent" ORDER BY sent_at DESC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.getFeatured = async () => {
  const [rows] = await db.query('SELECT * FROM newsletters WHERE featured = true ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: safeParse(row.tags, []),
  }));
};

exports.create = async (newsletter) => {
  const newsletterData = {
    ...newsletter,
    tags: Array.isArray(newsletter.tags) ? JSON.stringify(newsletter.tags) : (typeof newsletter.tags === 'string' ? JSON.stringify(safeParse(newsletter.tags, [])) : null),
  };
  const [result] = await db.query('INSERT INTO newsletters SET ?', newsletterData);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM newsletters WHERE id = ?', [id]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: safeParse(row.tags, []),
  };
};

exports.findBySlug = async (slug) => {
  const [rows] = await db.query('SELECT * FROM newsletters WHERE slug = ?', [slug]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: safeParse(row.tags, []),
  };
};

exports.update = async (id, newsletter) => {
  const newsletterData = {
    ...newsletter,
    tags: Array.isArray(newsletter.tags) ? JSON.stringify(newsletter.tags) : (typeof newsletter.tags === 'string' ? JSON.stringify(safeParse(newsletter.tags, [])) : null),
  };
  const [result] = await db.query('UPDATE newsletters SET ? WHERE id = ?', [newsletterData, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM newsletters WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

exports.updateStatus = async (id, status, sentAt = null) => {
  const updateData = { status };
  if (sentAt) updateData.sent_at = sentAt;
  
  const [result] = await db.query('UPDATE newsletters SET ? WHERE id = ?', [updateData, id]);
  return result.affectedRows > 0;
};

exports.updateMetrics = async (id, openRate, clickRate) => {
  const [result] = await db.query('UPDATE newsletters SET open_rate = ?, click_rate = ? WHERE id = ?', [openRate, clickRate, id]);
  return result.affectedRows > 0;
};