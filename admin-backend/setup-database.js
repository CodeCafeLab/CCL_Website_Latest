const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
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
    
    // Create blogs table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS blogs (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        summary TEXT,
        content LONGTEXT NOT NULL,
        author VARCHAR(255),
        author_id INT,
        status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
        category VARCHAR(100),
        categories JSON,
        tags JSON,
        read_time VARCHAR(50),
        views INT DEFAULT 0,
        thumbnail VARCHAR(500),
        featured BOOLEAN DEFAULT FALSE,
        cover_image VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_slug (slug),
        INDEX idx_status (status),
        INDEX idx_author_id (author_id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    console.log('Creating blogs table...');
    await connection.execute(createTableSQL);
    console.log('Blogs table created successfully!');
    
    // Check if table exists and show structure
    const [tables] = await connection.execute('SHOW TABLES LIKE "blogs"');
    if (tables.length > 0) {
      console.log('Blogs table exists!');
      
      // Show table structure
      const [columns] = await connection.execute('DESCRIBE blogs');
      console.log('Table structure:');
      columns.forEach(col => {
        console.log(`  ${col.Field} - ${col.Type} - ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'}`);
      });
      
      // Check if there are any existing records
      const [rows] = await connection.execute('SELECT COUNT(*) as count FROM blogs');
      console.log(`Number of existing blog records: ${rows[0].count}`);
      
    } else {
      console.log('Blogs table was not created!');
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
setupDatabase().catch(console.error); 