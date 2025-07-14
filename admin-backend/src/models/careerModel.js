const db = require("../config/db");

exports.getAll = async () => {
  const [rows] = await db.query("SELECT * FROM careers ORDER BY created_at DESC");
  return rows;
};

exports.getActive = async () => {
  const [rows] = await db.query("SELECT * FROM careers WHERE status = 'active' ORDER BY featured DESC, created_at DESC");
  return rows;
};

exports.getFeatured = async () => {
  const [rows] = await db.query("SELECT * FROM careers WHERE featured = true AND status = 'active' ORDER BY created_at DESC");
  return rows;
};

exports.create = async (career) => {
  try {
    const careerData = {
      title: career.title,
      slug: career.slug,
      description: career.description,
      requirements: career.requirements,
      responsibilities: career.responsibilities,
      benefits: career.benefits,
      location: career.location,
      type: career.type || 'full-time',
      experience_level: career.experience_level || 'mid',
      salary_min: career.salary_min,
      salary_max: career.salary_max,
      department: career.department,
      tags: career.tags ? JSON.stringify(career.tags) : null,
      status: career.status || "draft",
      featured: career.featured || false,
      views: career.views || 0,
      applications_count: career.applications_count || 0,
      created_at: new Date(),
    };

    const [result] = await db.query("INSERT INTO careers SET ?", careerData);
    return result.insertId;
  } catch (error) {
    console.error("Database error in create career:", error);
    throw error;
  }
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM careers WHERE id = ?", [id]);
  return rows[0];
};

exports.findBySlug = async (slug) => {
  const [rows] = await db.query("SELECT * FROM careers WHERE slug = ?", [slug]);
  return rows[0];
};

exports.update = async (id, career) => {
  const careerData = {
    title: career.title,
    slug: career.slug,
    description: career.description,
    requirements: career.requirements,
    responsibilities: career.responsibilities,
    benefits: career.benefits,
    location: career.location,
    type: career.type,
    experience_level: career.experience_level,
    salary_min: career.salary_min,
    salary_max: career.salary_max,
    department: career.department,
    tags: career.tags ? JSON.stringify(career.tags) : null,
    status: career.status,
    featured: career.featured,
    views: career.views,
    applications_count: career.applications_count,
  };

  const [result] = await db.query("UPDATE careers SET ? WHERE id = ?", [
    careerData,
    id,
  ]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM careers WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

exports.incrementViews = async (id) => {
  const [result] = await db.query("UPDATE careers SET views = views + 1 WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

exports.incrementApplications = async (id) => {
  const [result] = await db.query("UPDATE careers SET applications_count = applications_count + 1 WHERE id = ?", [id]);
  return result.affectedRows > 0;
}; 