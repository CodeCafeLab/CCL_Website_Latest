-- Create URL mappings table for short image URLs
CREATE TABLE IF NOT EXISTS url_mappings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  short_hash VARCHAR(8) NOT NULL UNIQUE,
  original_url TEXT NOT NULL,
  blog_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_short_hash (short_hash),
  INDEX idx_blog_id (blog_id),
  INDEX idx_original_url_blog (original_url(255), blog_id)
); 