CREATE DATABASE IF NOT EXISTS mowglai_db;
USE mowglai_db;

CREATE TABLE IF NOT EXISTS purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subscription_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    expiration_date DATETIME,
    status VARCHAR(50) DEFAULT 'active',
    details TEXT,
    INDEX (email)
);

-- Insert some dummy data for testing
INSERT INTO purchases (subscription_id, email, plan_name, purchase_date, expiration_date, status, details)
VALUES 
('sub_123456789', 'test@example.com', 'Mowglai Growth', NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), 'active', 'Monthly subscription via Razorpay'),
('sub_987654321', 'client@mowglai.in', 'Mowglai Elite', '2023-01-01 10:00:00', '2023-02-01 10:00:00', 'expired', 'Past subscription');
