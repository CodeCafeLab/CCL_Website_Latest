const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM client_reviews ORDER BY created_at DESC');
  return rows;
};

exports.create = async (review) => {
  const [result] = await db.query('INSERT INTO client_reviews SET ?', review);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM client_reviews WHERE id = ?', [id]);
  return rows[0];
};

exports.update = async (id, review) => {
  const [result] = await db.query('UPDATE client_reviews SET ? WHERE id = ?', [review, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM client_reviews WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
