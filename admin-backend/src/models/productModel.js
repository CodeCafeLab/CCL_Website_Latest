const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
  // Parse JSON fields with error handling
  return rows.map(row => ({
    ...row,
    gallery: safeParse(row.gallery, []),
    tags: safeParse(row.tags, []),
    dimensions: safeParse(row.dimensions, { width: 0, height: 0, depth: 0 }),
  }));
};

function safeParse(str, fallback) {
  if (!str) return fallback;
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

exports.create = async (product) => {
  // Prepare the product object for DB (stringify JSON fields)
  const dbProduct = {
    ...product,
    gallery: product.gallery ? JSON.stringify(product.gallery) : null,
    tags: product.tags ? JSON.stringify(product.tags) : null,
    dimensions: product.dimensions ? JSON.stringify(product.dimensions) : null,
  };
  const [result] = await db.query('INSERT INTO products SET ?', dbProduct);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  if (!rows[0]) return null;
  const row = rows[0];
  return {
    ...row,
    gallery: safeParse(row.gallery, []),
    tags: safeParse(row.tags, []),
    dimensions: safeParse(row.dimensions, { width: 0, height: 0, depth: 0 }),
  };
};

exports.update = async (id, product) => {
  const dbProduct = {
    ...product,
    gallery: product.gallery ? JSON.stringify(product.gallery) : null,
    tags: product.tags ? JSON.stringify(product.tags) : null,
    dimensions: product.dimensions ? JSON.stringify(product.dimensions) : null,
  };
  const [result] = await db.query('UPDATE products SET ? WHERE id = ?', [dbProduct, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
