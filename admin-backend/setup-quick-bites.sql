-- Create quick_bites table
CREATE TABLE IF NOT EXISTS quick_bites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
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
);

-- Insert sample data
INSERT INTO quick_bites (title, description, video_url, thumbnail_url, duration, category, tags, author, author_id, status, featured) VALUES
('React Hooks Explained', 'Quick overview of React Hooks and their usage', 'https://example.com/videos/react-hooks.mp4', 'https://example.com/thumbnails/react-hooks.jpg', '2:30', 'Frontend', '["react", "hooks", "javascript"]', 'John Doe', 1, 'published', true),
('CSS Grid Layout', 'Learn CSS Grid in under 3 minutes', 'https://example.com/videos/css-grid.mp4', 'https://example.com/thumbnails/css-grid.jpg', '2:45', 'Frontend', '["css", "grid", "layout"]', 'Jane Smith', 2, 'published', true),
('Node.js Async/Await', 'Understanding async/await in Node.js', 'https://example.com/videos/node-async.mp4', 'https://example.com/thumbnails/node-async.jpg', '3:15', 'Backend', '["nodejs", "async", "javascript"]', 'Mike Johnson', 3, 'published', false); 