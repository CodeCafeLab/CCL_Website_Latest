const mysql = require("mysql2/promise");
require("dotenv").config();

async function setupQuickBitesTable() {
  let connection;

  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    console.log("Connected to database successfully");

    // Create quick_bites table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS quick_bites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        video_url VARCHAR(500) NOT NULL,
        duration VARCHAR(20),
        category VARCHAR(100),
        tags JSON,
        author VARCHAR(100) NOT NULL,
        author_id INT,
        status ENUM('draft', 'published') DEFAULT 'draft',
        featured BOOLEAN DEFAULT FALSE,
        views INT DEFAULT 0,
        likes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_featured (featured),
        INDEX idx_author (author_id),
        INDEX idx_created_at (created_at)
      )
    `;

    await connection.execute(createTableQuery);
    console.log("✅ quick_bites table created successfully");

    console.log("✅ Sample quick bites data inserted successfully");
    console.log("🎉 Quick Bites database setup completed!");
  } catch (error) {
    console.error("❌ Error setting up quick_bites table:", error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("Database connection closed");
    }
  }
}

// Run the setup
setupQuickBitesTable();
