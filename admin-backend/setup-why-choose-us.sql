-- Create why_choose_us table
CREATE TABLE IF NOT EXISTS why_choose_us (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  image_url VARCHAR(500),
  order_index INT DEFAULT 0,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_order (order_index),
  INDEX idx_created_at (created_at)
);

-- Insert sample data
INSERT INTO why_choose_us (title, description, icon, image_url, order_index, status) VALUES
('Expert Team', 'Our team consists of experienced professionals with deep expertise in their respective fields.', '', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400', 1, 'active'),
('Quality Assurance', 'We maintain the highest standards of quality in all our deliverables.', '✅', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', 2, 'active'),
('Innovation', 'We stay ahead of the curve with cutting-edge technologies and innovative solutions.', '', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400', 3, 'active'),
('24/7 Support', 'Round-the-clock support to ensure your project runs smoothly.', '', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400', 4, 'active');

-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  summary TEXT,
  content LONGTEXT,
  client_name VARCHAR(255),
  industry VARCHAR(100),
  duration VARCHAR(100),
  budget VARCHAR(100),
  technologies JSON,
  results TEXT,
  image_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_featured (featured),
  INDEX idx_industry (industry),
  INDEX idx_created_at (created_at)
);

-- Insert sample data
INSERT INTO case_studies (title, slug, summary, client_name, industry, duration, budget, technologies, results, image_url, featured, status) VALUES
('E-commerce Platform Redesign', 'ecommerce-platform-redesign', 'Complete redesign of an e-commerce platform resulting in 40% increase in conversions.', 'TechCorp Inc.', 'E-commerce', '3 months', '$50,000', '["React", "Node.js", "MongoDB", "AWS"]', '40% increase in conversions, 60% faster page load times, 25% reduction in cart abandonment', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400', true, 'published'),
('Healthcare Management System', 'healthcare-management-system', 'Custom healthcare management system for a network of clinics.', 'HealthNet', 'Healthcare', '6 months', '$120,000', '["Vue.js", "Python", "PostgreSQL", "Docker"]', 'Streamlined patient management, 50% reduction in administrative overhead, improved patient satisfaction', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400', true, 'published'),
('Fintech Mobile App', 'fintech-mobile-app', 'Mobile banking application with advanced security features.', 'SecureBank', 'Fintech', '4 months', '$80,000', '["React Native", "Node.js", "Redis", "AWS"]', '1M+ downloads, 99.9% uptime, enhanced security compliance', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400', false, 'published');

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