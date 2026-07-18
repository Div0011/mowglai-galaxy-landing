-- schema.sql
-- Run this SQL in your Hostinger phpMyAdmin to create necessary tables

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

CREATE TABLE IF NOT EXISTS `form_submissions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `subject` VARCHAR(255) DEFAULT NULL,
    `name` VARCHAR(255) DEFAULT NULL,
    `email` VARCHAR(255) DEFAULT NULL,
    `phone` VARCHAR(100) DEFAULT NULL,
    `form_type` VARCHAR(100) DEFAULT NULL,
    `payload_json` JSON DEFAULT NULL,
    `mail_status` ENUM('sent', 'failed', 'pending') DEFAULT 'pending',
    `mail_error` TEXT DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_email` (`email`),
    INDEX `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
