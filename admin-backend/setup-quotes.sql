CREATE TABLE IF NOT EXISTS quotes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  company_name VARCHAR(100),
  service_interest VARCHAR(100) NOT NULL,
  project_description TEXT NOT NULL,
  budget_range VARCHAR(100),
  preferred_contact_method ENUM('email', 'phone'),
  phone_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
