-- Create help_articles table
CREATE TABLE IF NOT EXISTS help_articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content LONGTEXT,
  category VARCHAR(100),
  tags JSON,
  author VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  views INT DEFAULT 0,
  helpful_votes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_featured (featured),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
);

-- Insert sample data
INSERT INTO help_articles (title, slug, content, category, tags, author, featured, status) VALUES
('Getting Started with CodeCafe Platform', 'getting-started', 'Complete guide to getting started with the CodeCafe development platform...', 'Getting Started', '["Guide", "Setup", "First Steps"]', 'Support Team', true, 'published'),
('API Documentation Guide', 'api-documentation', 'Learn how to use our comprehensive API documentation...', 'API', '["API", "Documentation", "Integration"]', 'Technical Team', true, 'published'),
('Troubleshooting Common Issues', 'troubleshooting', 'Solutions to common problems and error messages...', 'Troubleshooting', '["Errors", "Solutions", "Support"]', 'Support Team', false, 'published'); 