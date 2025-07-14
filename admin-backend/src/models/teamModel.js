const db = require("../config/db");

// Helper function to safely parse JSON or comma-separated strings
const safeParseArray = (value) => {
  if (!value) return [];
  
  // If it's already an array, return it
  if (Array.isArray(value)) return value;
  
  // If it's a string, try to parse as JSON first, then as comma-separated
  if (typeof value === 'string') {
    try {
      // Try to parse as JSON first
      return JSON.parse(value);
    } catch (e) {
      // If JSON parsing fails, treat as comma-separated string
      return value.split(',').map(item => item.trim()).filter(Boolean);
    }
  }
  
  return [];
};

exports.getAll = async () => {
  const [rows] = await db.query("SELECT * FROM teams ORDER BY sort_order ASC, created_at DESC");
  return rows.map(row => ({
    ...row,
    skills: safeParseArray(row.skills),
    certifications: safeParseArray(row.certifications)
  }));
};

exports.getActive = async () => {
  const [rows] = await db.query("SELECT * FROM teams WHERE status = 'active' ORDER BY sort_order ASC, created_at DESC");
  return rows.map(row => ({
    ...row,
    skills: safeParseArray(row.skills),
    certifications: safeParseArray(row.certifications)
  }));
};

exports.getFeatured = async () => {
  const [rows] = await db.query("SELECT * FROM teams WHERE featured = true AND status = 'active' ORDER BY sort_order ASC, created_at DESC");
  return rows.map(row => ({
    ...row,
    skills: safeParseArray(row.skills),
    certifications: safeParseArray(row.certifications)
  }));
};

exports.create = async (team) => {
  try {
    const teamData = {
      name: team.name,
      position: team.position,
      department: team.department,
      bio: team.bio,
      avatar_url: team.avatar_url,
      email: team.email,
      phone: team.phone,
      linkedin_url: team.linkedin_url,
      twitter_url: team.twitter_url,
      github_url: team.github_url,
      portfolio_url: team.portfolio_url,
      skills: team.skills ? JSON.stringify(team.skills) : null,
      experience_years: team.experience_years,
      education: team.education,
      certifications: team.certifications ? JSON.stringify(team.certifications) : null,
      status: team.status || "active",
      featured: team.featured || false,
      sort_order: team.sort_order || 0,
      created_at: new Date(),
    };

    const [result] = await db.query("INSERT INTO teams SET ?", teamData);
    return result.insertId;
  } catch (error) {
    console.error("Database error in create team:", error);
    throw error;
  }
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM teams WHERE id = ?", [id]);
  if (!rows[0]) return null;
  
  const row = rows[0];
  return {
    ...row,
    skills: safeParseArray(row.skills),
    certifications: safeParseArray(row.certifications)
  };
};

exports.update = async (id, team) => {
  const teamData = {
    name: team.name,
    position: team.position,
    department: team.department,
    bio: team.bio,
    avatar_url: team.avatar_url,
    email: team.email,
    phone: team.phone,
    linkedin_url: team.linkedin_url,
    twitter_url: team.twitter_url,
    github_url: team.github_url,
    portfolio_url: team.portfolio_url,
    skills: team.skills ? JSON.stringify(team.skills) : null,
    experience_years: team.experience_years,
    education: team.education,
    certifications: team.certifications ? JSON.stringify(team.certifications) : null,
    status: team.status,
    featured: team.featured,
    sort_order: team.sort_order,
  };

  const [result] = await db.query("UPDATE teams SET ? WHERE id = ?", [
    teamData,
    id,
  ]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM teams WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

exports.updateSortOrder = async (id, sortOrder) => {
  const [result] = await db.query("UPDATE teams SET sort_order = ? WHERE id = ?", [sortOrder, id]);
  return result.affectedRows > 0;
}; 