const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM webinars ORDER BY date_time DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.getUpcoming = async () => {
  const [rows] = await db.query('SELECT * FROM webinars WHERE status = "upcoming" AND date_time > NOW() ORDER BY date_time ASC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.getFeatured = async () => {
  const [rows] = await db.query('SELECT * FROM webinars WHERE featured = true AND status = "upcoming" ORDER BY date_time ASC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.getCompleted = async () => {
  const [rows] = await db.query('SELECT * FROM webinars WHERE status = "completed" ORDER BY date_time DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.create = async (webinar) => {
  const webinarData = {
    ...webinar,
    tags: webinar.tags ? JSON.stringify(webinar.tags) : null,
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
    tags: row.tags ? JSON.parse(row.tags) : [],
  };
};

exports.findBySlug = async (slug) => {
  const [rows] = await db.query('SELECT * FROM webinars WHERE slug = ?', [slug]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  };
};

exports.update = async (id, webinar) => {
  const webinarData = {
    ...webinar,
    tags: webinar.tags ? JSON.stringify(webinar.tags) : null,
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