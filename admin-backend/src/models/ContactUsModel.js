const db = require('../config/db');

exports.create = async (contact) => {
  const [result] = await db.query('INSERT INTO contact_us SET ?', contact);
  return result.insertId;
};

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM contact_us ORDER BY created_at DESC');
  return rows;
};