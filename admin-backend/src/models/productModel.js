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
  const [rows] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    gallery: safeParse(row.gallery, []),
    tags: safeParse(row.tags, []),
    dimensions: safeParse(row.dimensions, { width: 0, height: 0, depth: 0 }),
  }));
};

exports.create = async (product) => {
  const dbProduct = {
    ...product,
    gallery: Array.isArray(product.gallery) ? JSON.stringify(product.gallery) : (typeof product.gallery === 'string' ? JSON.stringify(safeParse(product.gallery, [])) : null),
    tags: Array.isArray(product.tags) ? JSON.stringify(product.tags) : (typeof product.tags === 'string' ? JSON.stringify(safeParse(product.tags, [])) : null),
    dimensions: typeof product.dimensions === 'object' ? JSON.stringify(product.dimensions) : (typeof product.dimensions === 'string' ? JSON.stringify(safeParse(product.dimensions, { width: 0, height: 0, depth: 0 })) : null),
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
    gallery: Array.isArray(product.gallery) ? JSON.stringify(product.gallery) : (typeof product.gallery === 'string' ? JSON.stringify(safeParse(product.gallery, [])) : null),
    tags: Array.isArray(product.tags) ? JSON.stringify(product.tags) : (typeof product.tags === 'string' ? JSON.stringify(safeParse(product.tags, [])) : null),
    dimensions: typeof product.dimensions === 'object' ? JSON.stringify(product.dimensions) : (typeof product.dimensions === 'string' ? JSON.stringify(safeParse(product.dimensions, { width: 0, height: 0, depth: 0 })) : null),
  };
  const [result] = await db.query('UPDATE products SET ? WHERE id = ?', [dbProduct, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
