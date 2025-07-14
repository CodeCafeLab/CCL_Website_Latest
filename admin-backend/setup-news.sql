-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  summary TEXT,
  content LONGTEXT,
  author VARCHAR(255),
  category VARCHAR(100),
  tags JSON,
  image_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_featured (featured),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
);

-- Insert sample data
INSERT INTO news (title, slug, summary, author, category, tags, image_url, featured, status) VALUES
('CodeCafe Launches New AI-Powered Development Platform', 'codecafe-launches-ai-platform', 'CodeCafe introduces revolutionary AI-powered development platform to streamline software development.', 'Tech Team', 'Company News', '["AI", "Platform", "Launch", "Innovation"]', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400', true, 'published'),
('Major Partnership Announced with TechCorp', 'partnership-announcement-techcorp', 'CodeCafe announces strategic partnership with TechCorp to expand service offerings.', 'Business Team', 'Partnerships', '["Partnership", "TechCorp", "Strategy", "Growth"]', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400', true, 'published'),
('Industry Recognition: Best Tech Company 2024', 'best-tech-company-2024', 'CodeCafe recognized as Best Tech Company 2024 by Industry Awards.', 'PR Team', 'Awards', '["Award", "Recognition", "2024", "Achievement"]', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', false, 'published');
``` 