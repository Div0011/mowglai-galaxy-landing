-- schema.sql
-- Run this SQL in your Hostinger phpMyAdmin to create the purchases table

CREATE TABLE IF NOT EXISTS `purchases` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `plan_name` VARCHAR(100) NOT NULL,
    `purchase_date` DATE NOT NULL,
    `expiration_date` DATE DEFAULT NULL,
    `status` ENUM('active', 'expired', 'cancelled', 'completed') NOT NULL DEFAULT 'active',
    `details` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Example Data (Optional - Insert to test)
-- INSERT INTO `purchases` (`email`, `plan_name`, `purchase_date`, `expiration_date`, `status`, `details`) VALUES
-- ('test@example.com', 'Mowglai Growth', '2023-10-27', '2024-10-27', 'active', 'Yearly subscription');
