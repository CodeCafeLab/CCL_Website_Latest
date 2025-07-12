const db = require('../config/db');

exports.getAll = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY created_at DESC');
    return rows;
  } catch (err) {
    console.error('Error in getAll categories:', err);
    throw err;
  }
};

exports.create = async (category) => {
  const [result] = await db.query('INSERT INTO categories SET ?', category);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
  return rows[0];
};

exports.update = async (id, category) => {
  const [result] = await db.query('UPDATE categories SET ? WHERE id = ?', [category, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
