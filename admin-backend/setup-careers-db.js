const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupCareersDatabase() {
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
    
    // Create careers table
    const createCareersTableSQL = `
      CREATE TABLE IF NOT EXISTS careers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        requirements TEXT,
        responsibilities TEXT,
        benefits TEXT,
        location VARCHAR(100),
        type ENUM('full-time', 'part-time', 'contract', 'internship') DEFAULT 'full-time',
        experience_level ENUM('entry', 'mid', 'senior', 'lead') DEFAULT 'mid',
        salary_min DECIMAL(10,2),
        salary_max DECIMAL(10,2),
        department VARCHAR(100),
        tags JSON,
        status ENUM('active', 'inactive', 'draft') DEFAULT 'draft',
        featured BOOLEAN DEFAULT FALSE,
        views INT DEFAULT 0,
        applications_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_featured (featured),
        INDEX idx_type (type),
        INDEX idx_department (department),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    console.log('Creating careers table...');
    await connection.execute(createCareersTableSQL);
    console.log('Careers table created successfully!');
    
    // Create job_applications table
    const createApplicationsTableSQL = `
      CREATE TABLE IF NOT EXISTS job_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        job_id INT NOT NULL,
        applicant_name VARCHAR(255) NOT NULL,
        applicant_email VARCHAR(255) NOT NULL,
        applicant_phone VARCHAR(50),
        resume_url VARCHAR(500),
        cover_letter TEXT,
        portfolio_url VARCHAR(500),
        linkedin_url VARCHAR(500),
        github_url VARCHAR(500),
        experience_years INT,
        current_company VARCHAR(255),
        current_position VARCHAR(255),
        expected_salary DECIMAL(10,2),
        notice_period VARCHAR(100),
        status ENUM('pending', 'reviewed', 'shortlisted', 'rejected', 'hired') DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (job_id) REFERENCES careers(id) ON DELETE CASCADE,
        INDEX idx_job_id (job_id),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    console.log('Creating job_applications table...');
    await connection.execute(createApplicationsTableSQL);
    console.log('Job applications table created successfully!');
    
    // Check if tables exist and show structure
    const [careerTables] = await connection.execute('SHOW TABLES LIKE "careers"');
    const [applicationTables] = await connection.execute('SHOW TABLES LIKE "job_applications"');
    
    if (careerTables.length > 0) {
      console.log('✅ Careers table exists!');
      
      // Show careers table structure
      const [careerColumns] = await connection.execute('DESCRIBE careers');
      console.log('Careers table structure:');
      careerColumns.forEach(col => {
        console.log(`  ${col.Field} - ${col.Type} - ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'}`);
      });
      
      // Check career records
      const [careerRows] = await connection.execute('SELECT COUNT(*) as count FROM careers');
      console.log(`Number of career records: ${careerRows[0].count}`);
    }
    
    if (applicationTables.length > 0) {
      console.log('✅ Job applications table exists!');
      
      // Show applications table structure
      const [applicationColumns] = await connection.execute('DESCRIBE job_applications');
      console.log('Job applications table structure:');
      applicationColumns.forEach(col => {
        console.log(`  ${col.Field} - ${col.Type} - ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'}`);
      });
      
      // Check application records
      const [applicationRows] = await connection.execute('SELECT COUNT(*) as count FROM job_applications');
      console.log(`Number of application records: ${applicationRows[0].count}`);
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
setupCareersDatabase().catch(console.error); 