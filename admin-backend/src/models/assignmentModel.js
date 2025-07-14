const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM assignments ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.getPublished = async () => {
  const [rows] = await db.query('SELECT * FROM assignments WHERE status = "published" ORDER BY featured DESC, created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.getByDifficulty = async (difficulty) => {
  const [rows] = await db.query('SELECT * FROM assignments WHERE difficulty = ? AND status = "published" ORDER BY featured DESC, created_at DESC', [difficulty]);
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.getFeatured = async () => {
  const [rows] = await db.query('SELECT * FROM assignments WHERE featured = true AND status = "published" ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  }));
};

exports.create = async (assignment) => {
  const assignmentData = {
    ...assignment,
    tags: assignment.tags ? JSON.stringify(assignment.tags) : null,
  };
  const [result] = await db.query('INSERT INTO assignments SET ?', assignmentData);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM assignments WHERE id = ?', [id]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  };
};

exports.findBySlug = async (slug) => {
  const [rows] = await db.query('SELECT * FROM assignments WHERE slug = ?', [slug]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
  };
};

exports.update = async (id, assignment) => {
  const assignmentData = {
    ...assignment,
    tags: assignment.tags ? JSON.stringify(assignment.tags) : null,
  };
  const [result] = await db.query('UPDATE assignments SET ? WHERE id = ?', [assignmentData, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM assignments WHERE id = ?', [id]);
  return result.affectedRows > 0;
};