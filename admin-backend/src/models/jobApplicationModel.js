const db = require("../config/db");

exports.getAll = async () => {
  const [rows] = await db.query(`
    SELECT ja.*, c.title as job_title 
    FROM job_applications ja 
    JOIN careers c ON ja.job_id = c.id 
    ORDER BY ja.created_at DESC
  `);
  return rows;
};

exports.getByJobId = async (jobId) => {
  const [rows] = await db.query(`
    SELECT ja.*, c.title as job_title 
    FROM job_applications ja 
    JOIN careers c ON ja.job_id = c.id 
    WHERE ja.job_id = ? 
    ORDER BY ja.created_at DESC
  `, [jobId]);
  return rows;
};

exports.create = async (application) => {
  try {
    const applicationData = {
      job_id: application.job_id,
      applicant_name: application.applicant_name,
      applicant_email: application.applicant_email,
      applicant_phone: application.applicant_phone,
      resume_url: application.resume_url,
      cover_letter: application.cover_letter,
      portfolio_url: application.portfolio_url,
      linkedin_url: application.linkedin_url,
      github_url: application.github_url,
      experience_years: application.experience_years,
      current_company: application.current_company,
      current_position: application.current_position,
      expected_salary: application.expected_salary,
      notice_period: application.notice_period,
      status: application.status || 'pending',
      notes: application.notes,
      created_at: new Date(),
    };

    const [result] = await db.query("INSERT INTO job_applications SET ?", applicationData);
    return result.insertId;
  } catch (error) {
    console.error("Database error in create job application:", error);
    throw error;
  }
};

exports.findById = async (id) => {
  const [rows] = await db.query(`
    SELECT ja.*, c.title as job_title 
    FROM job_applications ja 
    JOIN careers c ON ja.job_id = c.id 
    WHERE ja.id = ?
  `, [id]);
  return rows[0];
};

exports.update = async (id, application) => {
  const applicationData = {
    status: application.status,
    notes: application.notes,
  };

  const [result] = await db.query("UPDATE job_applications SET ? WHERE id = ?", [
    applicationData,
    id,
  ]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM job_applications WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

exports.getStats = async () => {
  const [rows] = await db.query(`
    SELECT 
      COUNT(*) as total_applications,
      COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
      COUNT(CASE WHEN status = 'reviewed' THEN 1 END) as reviewed,
      COUNT(CASE WHEN status = 'shortlisted' THEN 1 END) as shortlisted,
      COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
      COUNT(CASE WHEN status = 'hired' THEN 1 END) as hired
    FROM job_applications
  `);
  return rows[0];
}; 