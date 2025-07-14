const db = require('../config/db');

// Helper function to safely parse technologies
const safeParseTechnologies = (technologies) => {
  if (!technologies) return [];
  
  // If it's already an array, return it
  if (Array.isArray(technologies)) return technologies;
  
  // If it's a string, try to parse as JSON first, then as comma-separated
  if (typeof technologies === 'string') {
    try {
      // Try to parse as JSON first
      return JSON.parse(technologies);
    } catch (e) {
      // If JSON parsing fails, treat as comma-separated string
      return technologies.split(',').map(item => item.trim()).filter(Boolean);
    }
  }
  
  return [];
};

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM case_studies ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    technologies: safeParseTechnologies(row.technologies),
  }));
};

exports.getPublished = async () => {
  const [rows] = await db.query('SELECT * FROM case_studies WHERE status = "published" ORDER BY featured DESC, created_at DESC');
  return rows.map(row => ({
    ...row,
    technologies: safeParseTechnologies(row.technologies),
  }));
};

exports.getFeatured = async () => {
  const [rows] = await db.query('SELECT * FROM case_studies WHERE featured = true AND status = "published" ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    technologies: safeParseTechnologies(row.technologies),
  }));
};

exports.create = async (caseStudy) => {
  const caseStudyData = {
    ...caseStudy,
    technologies: caseStudy.technologies ? JSON.stringify(caseStudy.technologies) : null,
  };
  const [result] = await db.query('INSERT INTO case_studies SET ?', caseStudyData);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM case_studies WHERE id = ?', [id]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    technologies: safeParseTechnologies(row.technologies),
  };
};

exports.findBySlug = async (slug) => {
  const [rows] = await db.query('SELECT * FROM case_studies WHERE slug = ?', [slug]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    technologies: safeParseTechnologies(row.technologies),
  };
};

exports.update = async (id, caseStudy) => {
  const caseStudyData = {
    ...caseStudy,
    technologies: caseStudy.technologies ? JSON.stringify(caseStudy.technologies) : null,
  };
  const [result] = await db.query('UPDATE case_studies SET ? WHERE id = ?', [caseStudyData, id]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM case_studies WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

exports.incrementViews = async (id) => {
  const [result] = await db.query('UPDATE case_studies SET views = views + 1 WHERE id = ?', [id]);
  return result.affectedRows > 0;
}; 