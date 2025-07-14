-- Create webinars table
CREATE TABLE IF NOT EXISTS webinars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  speaker VARCHAR(255),
  speaker_bio TEXT,
  date_time DATETIME,
  duration VARCHAR(50),
  category VARCHAR(100),
  tags JSON,
  registration_url VARCHAR(500),
  recording_url VARCHAR(500),
  thumbnail_url VARCHAR(500),
  max_participants INT,
  registered_participants INT DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  status ENUM('upcoming', 'live', 'completed', 'cancelled') DEFAULT 'upcoming',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_featured (featured),
  INDEX idx_date_time (date_time),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
);

-- Insert sample data
INSERT INTO webinars (title, slug, description, speaker, speaker_bio, date_time, duration, category, tags, registration_url, thumbnail_url, max_participants, featured, status) VALUES
('Introduction to React 18', 'react-18-intro', 'Learn about the latest features in React 18 and how to use them effectively.', 'Sarah Johnson', 'Senior React Developer with 8+ years of experience, React core contributor.', '2024-12-15 14:00:00', '60 minutes', 'Frontend Development', '["React", "JavaScript", "Frontend"]', 'https://example.com/webinars/react-18/register', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', 100, true, 'upcoming'),
('AI in Modern Applications', 'ai-modern-applications', 'Explore how AI is transforming modern web applications and business processes.', 'Dr. Mike Chen', 'AI Research Director with 15+ years in machine learning and business applications.', '2024-12-20 15:00:00', '90 minutes', 'Artificial Intelligence', '["AI", "Machine Learning", "Applications"]', 'https://example.com/webinars/ai-applications/register', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400', 150, true, 'upcoming'),
('DevOps Best Practices', 'devops-best-practices', 'Learn essential DevOps practices for modern software development teams.', 'Emily Rodriguez', 'DevOps Engineer with expertise in CI/CD, Docker, and cloud infrastructure.', '2024-12-25 16:00:00', '75 minutes', 'DevOps', '["DevOps", "CI/CD", "Docker", "Cloud"]', 'https://example.com/webinars/devops/register', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', 80, false, 'upcoming'); 