const db = require('../config/db');

exports.create = async (partner) => {
  const [result] = await db.query('INSERT INTO partners SET ?', partner);
  return result.insertId;
};

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM partners ORDER BY created_at DESC');
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM partners WHERE id = ?', [id]);
  return rows[0];
};
