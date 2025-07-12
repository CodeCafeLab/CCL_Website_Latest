-- Create tutorials table
CREATE TABLE IF NOT EXISTS tutorials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  content LONGTEXT,
  author VARCHAR(255),
  difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'intermediate',
  category VARCHAR(100),
  tags JSON,
  video_url VARCHAR(500),
  thumbnail_url VARCHAR(500),
  duration VARCHAR(50),
  featured BOOLEAN DEFAULT FALSE,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_featured (featured),
  INDEX idx_difficulty (difficulty),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
);

-- Insert sample data
INSERT INTO tutorials (title, slug, description, author, difficulty, category, tags, video_url, thumbnail_url, duration, featured, status) VALUES
('React Hooks Complete Guide', 'react-hooks-guide', 'Master React Hooks with practical examples and real-world applications.', 'Sarah Johnson', 'intermediate', 'Frontend Development', '["React", "Hooks", "JavaScript"]', 'https://example.com/videos/react-hooks.mp4', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', '45 minutes', true, 'published'),
('Node.js API Development', 'nodejs-api-development', 'Build RESTful APIs with Node.js, Express, and MongoDB.', 'Mike Chen', 'intermediate', 'Backend Development', '["Node.js", "Express", "MongoDB", "API"]', 'https://example.com/videos/nodejs-api.mp4', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400', '60 minutes', true, 'published'),
('CSS Grid Layout Mastery', 'css-grid-mastery', 'Learn CSS Grid from basics to advanced techniques.', 'Emily Rodriguez', 'beginner', 'Frontend Development', '["CSS", "Grid", "Layout"]', 'https://example.com/videos/css-grid.mp4', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', '30 minutes', false, 'published'); 