
## 2. Backend Implementation

### Career Model

-- Create careers table
CREATE TABLE IF NOT EXISTS careers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  requirements TEXT,
  responsibilities TEXT,
  benefits TEXT,
  location VARCHAR(100),
  type ENUM('full-time', 'part-time', 'contract', 'internship') DEFAULT 'full-time',
  experience_level ENUM('entry', 'mid', 'senior', 'lead') DEFAULT 'mid',
  salary_min DECIMAL(10,2),
  salary_max DECIMAL(10,2),
  department VARCHAR(100),
  tags JSON,
  status ENUM('active', 'inactive', 'draft') DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,
  views INT DEFAULT 0,
  applications_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_featured (featured),
  INDEX idx_type (type),
  INDEX idx_department (department),
  INDEX idx_created_at (created_at)
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT NOT NULL,
  applicant_name VARCHAR(255) NOT NULL,
  applicant_email VARCHAR(255) NOT NULL,
  applicant_phone VARCHAR(50),
  resume_url VARCHAR(500),
  cover_letter TEXT,
  portfolio_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  github_url VARCHAR(500),
  experience_years INT,
  current_company VARCHAR(255),
  current_position VARCHAR(255),
  expected_salary DECIMAL(10,2),
  notice_period VARCHAR(100),
  status ENUM('pending', 'reviewed', 'shortlisted', 'rejected', 'hired') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES careers(id) ON DELETE CASCADE,
  INDEX idx_job_id (job_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);

