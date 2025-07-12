-- Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  requirements TEXT,
  difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'intermediate',
  category VARCHAR(100),
  tags JSON,
  estimated_time VARCHAR(50),
  file_url VARCHAR(500),
  solution_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
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
INSERT INTO assignments (title, slug, description, requirements, difficulty, category, tags, estimated_time, file_url, featured, status) VALUES
('Build a Todo App with React', 'react-todo-app', 'Create a fully functional todo application using React hooks and local storage.', 'Basic knowledge of React, JavaScript, and HTML/CSS', 'beginner', 'Frontend Development', '["React", "JavaScript", "Hooks", "Local Storage"]', '2-3 hours', 'https://example.com/assignments/react-todo.pdf', true, 'published'),
('API Integration Challenge', 'api-integration-challenge', 'Build a weather app that integrates with a public weather API.', 'Knowledge of JavaScript, API calls, and DOM manipulation', 'intermediate', 'Backend Integration', '["API", "JavaScript", "Fetch", "JSON"]', '4-5 hours', 'https://example.com/assignments/api-challenge.pdf', true, 'published'),
('Full-Stack E-commerce', 'fullstack-ecommerce', 'Create a complete e-commerce platform with user authentication and payment integration.', 'Advanced knowledge of full-stack development, databases, and payment APIs', 'advanced', 'Full-Stack Development', '["Node.js", "React", "MongoDB", "Stripe"]', '1-2 weeks', 'https://example.com/assignments/ecommerce.pdf', false, 'published'); 