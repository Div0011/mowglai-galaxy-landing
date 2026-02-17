<?php
// db.php - Database Connection

// -------------------------------------------------------------------------
// HOSTINGER CONFIGURATION
// -------------------------------------------------------------------------
// 1. Open your Hostinger Dashboard -> Databases
// 2. Create a new MySQL Database and User
// 3. Replace the values below with your actual database details:

$host = 'localhost';      // Usually 'localhost' on Hostinger
$db   = 'u707591712_mowglai_data'; // Updated from screenshot
$user = 'u707591712_mowglai_user'; // Assuming same prefix for user
$pass = 'Mowglai@2025'; // The password you set

// -------------------------------------------------------------------------
// NOTE: For local development, you might want to use different checks or ENV vars.
// But for simple shared hosting, editing the variables above is easiest.
// -------------------------------------------------------------------------

$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // If connection fails, return a JSON error instead of crashing/printing stack trace
    // This is important for the React frontend to handle gracefully
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed. Please check db.php configuration.',
        // 'debug_error' => $e->getMessage() // Uncomment for debugging, hide in production
    ]);
    exit;
}
?>
