-- Create whitepapers table
CREATE TABLE IF NOT EXISTS whitepapers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  summary TEXT,
  content LONGTEXT,
  author VARCHAR(255),
  author_bio TEXT,
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
INSERT INTO whitepapers (title, slug, summary, author, author_bio, category, tags, file_url, cover_image, featured, status) VALUES
('The Future of AI in Business', 'future-of-ai-in-business', 'Comprehensive analysis of AI trends and their impact on business transformation.', 'Dr. Sarah Johnson', 'AI Research Director with 15+ years experience in machine learning and business applications.', 'Artificial Intelligence', '["AI", "Business", "Machine Learning", "Digital Transformation"]', 'https://example.com/whitepapers/ai-future.pdf', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400', true, 'published'),
('Cybersecurity Best Practices 2024', 'cybersecurity-best-practices-2024', 'Essential cybersecurity practices for modern businesses.', 'Mike Chen', 'Cybersecurity expert with certifications in CISSP, CISM, and CEH.', 'Cybersecurity', '["Security", "Best Practices", "Compliance", "Risk Management"]', 'https://example.com/whitepapers/cybersecurity-2024.pdf', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400', true, 'published'),
('Cloud Migration Strategies', 'cloud-migration-strategies', 'Step-by-step guide to successful cloud migration.', 'Emily Rodriguez', 'Cloud architect with expertise in AWS, Azure, and Google Cloud.', 'Cloud Computing', '["Cloud", "Migration", "AWS", "Azure", "Strategy"]', 'https://example.com/whitepapers/cloud-migration.pdf', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', false, 'published');
``` 