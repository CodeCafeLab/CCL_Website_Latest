const db = require('../config/db');

exports.create = async (quote) => {
  const [result] = await db.query('INSERT INTO quotes SET ?', quote);
  return result.insertId;
};

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM quotes ORDER BY created_at DESC');
  return rows;
};
