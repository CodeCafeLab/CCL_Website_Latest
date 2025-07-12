const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM why_choose_us ORDER BY order_index ASC, created_at DESC');
  return rows;
};

exports.getActive = async () => {
  const [rows] = await db.query('SELECT * FROM why_choose_us WHERE status = "active" ORDER BY order_index ASC');
  return rows;
};

exports.create = async (whyChooseUs) => {
  const [result] = await db.query('INSERT INTO why_choose_us SET ?', whyChooseUs);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM why_choose_us WHERE id = ?', [id]);
  return rows[0];
};

exports.update = async (id, whyChooseUs) => {
  const [result] = await db.query('UPDATE why_choose_us SET ? WHERE id = ?', [whyChooseUs, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM why_choose_us WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

exports.updateOrder = async (id, orderIndex) => {
  const [result] = await db.query('UPDATE why_choose_us SET order_index = ? WHERE id = ?', [orderIndex, id]);
  return result.affectedRows > 0;
}; 