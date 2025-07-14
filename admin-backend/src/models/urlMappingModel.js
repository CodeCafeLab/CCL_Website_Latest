const db = require('../config/db');

exports.create = async (shortHash, originalUrl, blogId) => {
  try {
    const [result] = await db.query(
      'INSERT INTO url_mappings (short_hash, original_url, blog_id) VALUES (?, ?, ?)',
      [shortHash, originalUrl, blogId]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating URL mapping:', error);
    throw error;
  }
};

exports.findByShortHash = async (shortHash) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM url_mappings WHERE short_hash = ?',
      [shortHash]
    );
    return rows[0];
  } catch (error) {
    console.error('Error finding URL mapping:', error);
    throw error;
  }
};

exports.findByOriginalUrlAndBlogId = async (originalUrl, blogId) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM url_mappings WHERE original_url = ? AND blog_id = ?',
      [originalUrl, blogId]
    );
    return rows[0];
  } catch (error) {
    console.error('Error finding URL mapping:', error);
    throw error;
  }
}; 