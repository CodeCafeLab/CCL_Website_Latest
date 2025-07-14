const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupTeamsDatabase() {
  let connection;
  
  try {
    console.log('Connecting to database...');
    console.log('Database config:', {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
    });
    
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    
    console.log('Connected to database successfully!');
    
    // Create teams table
    const createTeamsTableSQL = `
      CREATE TABLE IF NOT EXISTS teams (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        department VARCHAR(100),
        bio TEXT,
        avatar_url VARCHAR(500),
        email VARCHAR(255),
        phone VARCHAR(50),
        linkedin_url VARCHAR(500),
        twitter_url VARCHAR(500),
        github_url VARCHAR(500),
        portfolio_url VARCHAR(500),
        skills JSON,
        experience_years INT,
        education TEXT,
        certifications JSON,
        status ENUM('active', 'inactive') DEFAULT 'active',
        featured BOOLEAN DEFAULT FALSE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_featured (featured),
        INDEX idx_department (department),
        INDEX idx_sort_order (sort_order),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    console.log('Creating teams table...');
    await connection.execute(createTeamsTableSQL);
    console.log('Teams table created successfully!');
    
    // Insert sample team data
    const insertSampleDataSQL = `
      INSERT INTO teams (name, position, department, bio, avatar_url, email, linkedin_url, skills, experience_years, featured, sort_order) VALUES
      ('John Doe', 'CEO & Founder', 'Leadership', 'Experienced entrepreneur with 10+ years in tech industry. Passionate about innovation and team building.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 'john@codecafe.com', 'https://linkedin.com/in/johndoe', '["Leadership", "Strategy", "Product Management"]', 10, true, 1),
      ('Jane Smith', 'CTO', 'Technology', 'Full-stack developer turned CTO with expertise in scalable architecture and team leadership.', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400', 'jane@codecafe.com', 'https://linkedin.com/in/janesmith', '["Full Stack", "Architecture", "Team Leadership"]', 8, true, 2),
      ('Mike Johnson', 'Lead Developer', 'Engineering', 'Senior developer specializing in React, Node.js, and cloud technologies.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'mike@codecafe.com', 'https://linkedin.com/in/mikejohnson', '["React", "Node.js", "AWS", "TypeScript"]', 6, false, 3),
      ('Sarah Wilson', 'UX Designer', 'Design', 'Creative designer focused on user experience and interface design with a passion for accessibility.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'sarah@codecafe.com', 'https://linkedin.com/in/sarahwilson', '["UI/UX", "Figma", "Prototyping", "Accessibility"]', 5, false, 4),
      ('David Brown', 'DevOps Engineer', 'Operations', 'DevOps specialist with expertise in CI/CD, Docker, and cloud infrastructure.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', 'david@codecafe.com', 'https://linkedin.com/in/davidbrown', '["Docker", "Kubernetes", "AWS", "CI/CD"]', 7, false, 5)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      position = VALUES(position),
      department = VALUES(department),
      bio = VALUES(bio),
      avatar_url = VALUES(avatar_url),
      email = VALUES(email),
      linkedin_url = VALUES(linkedin_url),
      skills = VALUES(skills),
      experience_years = VALUES(experience_years),
      featured = VALUES(featured),
      sort_order = VALUES(sort_order);
    `;
    
    console.log('Inserting sample team data...');
    await connection.execute(insertSampleDataSQL);
    console.log('Sample team data inserted successfully!');
    
    // Check if table exists and show structure
    const [teamTables] = await connection.execute('SHOW TABLES LIKE "teams"');
    
    if (teamTables.length > 0) {
      console.log('✅ Teams table exists!');
      
      // Show teams table structure
      const [teamColumns] = await connection.execute('DESCRIBE teams');
      console.log('Teams table structure:');
      teamColumns.forEach(col => {
        console.log(`  ${col.Field} - ${col.Type} - ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'}`);
      });
      
      // Check team records
      const [teamRows] = await connection.execute('SELECT COUNT(*) as count FROM teams');
      console.log(`Number of team records: ${teamRows[0].count}`);
      
      // Show sample data
      const [sampleData] = await connection.execute('SELECT id, name, position, department, featured FROM teams ORDER BY sort_order LIMIT 5');
      console.log('Sample team data:');
      sampleData.forEach(team => {
        console.log(`  ${team.id}. ${team.name} - ${team.position} (${team.department}) ${team.featured ? '[Featured]' : ''}`);
      });
    }
    
  } catch (error) {
    console.error('Database setup error:', error.message);
    console.error('Full error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
}

// Run the setup
setupTeamsDatabase().catch(console.error); 