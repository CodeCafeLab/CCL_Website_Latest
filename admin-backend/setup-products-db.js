const mysql = require("mysql2/promise");
require("dotenv").config();

async function setupProductsTable() {
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

    // Create products table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        short_description TEXT,
        description LONGTEXT,
        price DECIMAL(10,2) NOT NULL,
        discount_price DECIMAL(10,2),
        image_url VARCHAR(500),
        gallery JSON,
        stock INT DEFAULT 0,
        sku VARCHAR(100),
        brand VARCHAR(100),
        category VARCHAR(100),
        tags JSON,
        status ENUM('active', 'inactive', 'draft') DEFAULT 'draft',
        is_featured BOOLEAN DEFAULT FALSE,
        weight DECIMAL(8,2),
        dimensions JSON,
        meta_title VARCHAR(255),
        meta_description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_slug (slug),
        INDEX idx_status (status),
        INDEX idx_category (category),
        INDEX idx_brand (brand),
        INDEX idx_sku (sku),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await connection.execute(createTableQuery);
    console.log("✅ products table created successfully");

    // Insert sample data with proper null handling
    const sampleProducts = [
      {
        name: "Premium Coffee Mug",
        slug: "premium-coffee-mug",
        short_description: "High-quality ceramic coffee mug",
        description: "A beautiful, durable coffee mug perfect for your morning brew. Made from premium ceramic material.",
        price: 19.99,
        discount_price: null,
        image_url: "https://example.com/mug.jpg",
        gallery: null,
        stock: 50,
        sku: "MUG-001",
        brand: "HomeStyle",
        category: "Kitchen",
        tags: null,
        status: "active",
        is_featured: true,
        weight: 0.5,
        dimensions: null,
        meta_title: "Premium Coffee Mug - HomeStyle",
        meta_description: "High-quality ceramic coffee mug for your daily brew"
      },
      {
        name: "Wireless Headphones",
        slug: "wireless-headphones",
        short_description: "Bluetooth wireless headphones with noise cancellation",
        description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
        price: 149.99,
        discount_price: 129.99,
        image_url: "https://example.com/headphones.jpg",
        gallery: null,
        stock: 25,
        sku: "HP-002",
        brand: "AudioTech",
        category: "Electronics",
        tags: null,
        status: "active",
        is_featured: true,
        weight: 0.3,
        dimensions: null,
        meta_title: "Wireless Headphones - AudioTech",
        meta_description: "Premium wireless headphones with noise cancellation"
      }
    ];

    for (const product of sampleProducts) {
      const insertQuery = `
        INSERT INTO products (
          name, slug, short_description, description, price, discount_price, 
          image_url, gallery, stock, sku, brand, category, tags, status, 
          is_featured, weight, dimensions, meta_title, meta_description
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      await connection.execute(insertQuery, [
        product.name,
        product.slug,
        product.short_description,
        product.description,
        product.price,
        product.discount_price,
        product.image_url,
        product.gallery,
        product.stock,
        product.sku,
        product.brand,
        product.category,
        product.tags,
        product.status,
        product.is_featured,
        product.weight,
        product.dimensions,
        product.meta_title,
        product.meta_description
      ]);
    }

    console.log("✅ Sample products data inserted successfully");
    console.log("🎉 Products database setup completed!");
  } catch (error) {
    console.error("❌ Error setting up products table:", error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("Database connection closed");
    }
  }
}

// Run the setup
setupProductsTable(); 