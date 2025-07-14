-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  summary TEXT,
  content LONGTEXT,
  author VARCHAR(255),
  category VARCHAR(100),
  tags JSON,
  file_url VARCHAR(500),
  cover_image VARCHAR(500),
  download_count INT DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_featured (featured),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
);

-- Insert sample data
INSERT INTO reports (title, slug, summary, author, category, tags, file_url, cover_image, featured, status) VALUES
('Q4 2024 Technology Trends Report', 'q4-2024-tech-trends', 'Comprehensive analysis of emerging technology trends in Q4 2024.', 'Research Team', 'Technology Trends', '["Trends", "Technology", "Innovation", "Q4 2024"]', 'https://example.com/reports/q4-2024-trends.pdf', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400', true, 'published'),
('Digital Transformation Impact Study', 'digital-transformation-impact', 'Study on the impact of digital transformation on business performance.', 'Analytics Division', 'Business Analysis', '["Digital Transformation", "Business Impact", "Performance", "ROI"]', 'https://example.com/reports/digital-transformation.pdf', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', true, 'published'),
('Cybersecurity Threat Landscape 2024', 'cybersecurity-threats-2024', 'Analysis of current cybersecurity threats and mitigation strategies.', 'Security Team', 'Cybersecurity', '["Security", "Threats", "Mitigation", "2024"]', 'https://example.com/reports/cybersecurity-2024.pdf', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400', false, 'published'); 