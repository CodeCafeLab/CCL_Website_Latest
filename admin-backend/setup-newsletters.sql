-- Create newsletters table
CREATE TABLE IF NOT EXISTS newsletters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content LONGTEXT,
  subject_line VARCHAR(255),
  author VARCHAR(255),
  category VARCHAR(100),
  tags JSON,
  featured BOOLEAN DEFAULT FALSE,
  status ENUM('draft', 'scheduled', 'sent', 'archived') DEFAULT 'draft',
  scheduled_at DATETIME,
  sent_at DATETIME,
  recipient_count INT DEFAULT 0,
  open_rate DECIMAL(5,2),
  click_rate DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_featured (featured),
  INDEX idx_scheduled_at (scheduled_at),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
);

-- Insert sample data
INSERT INTO newsletters (title, slug, content, subject_line, author, category, tags, featured, status, scheduled_at) VALUES
('December 2024 Tech Insights', 'dec-2024-tech-insights', 'Monthly newsletter covering the latest in technology trends and innovations...', 'December 2024: AI Breakthroughs & Tech Trends', 'Editorial Team', 'Monthly Newsletter', '["AI", "Trends", "Innovation", "December 2024"]', true, 'scheduled', '2024-12-01 09:00:00'),
('Weekly Development Tips', 'weekly-dev-tips-12', 'This week''s top development tips and best practices...', 'This Week in Development: React 18 Tips & Tricks', 'Development Team', 'Weekly Tips', '["React", "Tips", "Best Practices", "Weekly"]', false, 'draft', NULL),
('Q4 2024 Industry Report', 'q4-2024-industry-report', 'Comprehensive industry analysis and market insights...', 'Q4 2024: Industry Trends & Market Analysis', 'Research Team', 'Quarterly Report', '["Industry", "Analysis", "Q4 2024", "Market"]', true, 'sent', '2024-10-01 10:00:00'); 