<?php
header('Content-Type: application/json');
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$email = filter_input(INPUT_GET, 'email', FILTER_VALIDATE_EMAIL);

if (!$email) {
    echo json_encode(['success' => false, 'message' => 'Valid email is required.']);
    exit;
}

try {
    if (!isset($pdo)) {
        throw new PDOException("Database connection failed.");
    }

    $stmt = $pdo->prepare("SELECT id, plan_name, purchase_date, expiration_date, status, details FROM purchases WHERE email = ? ORDER BY purchase_date DESC");
    $stmt->execute([$email]);
    $purchases = $stmt->fetchAll();

    if (empty($purchases)) {
        // Return mock data for demonstration if no DB connection or empty result
        // TODO: Remove this mock data in production
        echo json_encode([
            'success' => true,
            'purchases' => [
                [
                    'id' => 'sub_mock_123',
                    'plan_name' => 'Mowglai Growth',
                    'purchase_date' => date('Y-m-d'),
                    'expiration_date' => date('Y-m-d', strtotime('+1 month')),
                    'status' => 'active',
                    'details' => 'Monthly subscription via Razorpay'
                ]
            ],
            'mock' => true // Flag to indicate data is mocked
        ]);
    } else {
        echo json_encode(['success' => true, 'purchases' => $purchases]);
    }

} catch (PDOException $e) {
    // If DB fails (likely since table might not exist), return mock data gracefully for UI testing
    echo json_encode([
        'success' => true, 
        'purchases' => [
            [
                'id' => 'err_mock_1',
                'plan_name' => 'Demo Plan (DB Error)',
                'purchase_date' => date('Y-m-d'), 
                'expiration_date' => date('Y-m-d', strtotime('+1 year')),
                'status' => 'active',
                'details' => 'Database not connected. Please configure db.php.'
            ]
        ],
        'error' => $e->getMessage()
    ]);
}
?>
