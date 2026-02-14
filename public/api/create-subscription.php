<?php
declare(strict_types=1);

header('Content-Type: application/json');

function log_event(string $message): void {
    $timestamp = gmdate('Y-m-d H:i:s');
    $line = '[' . $timestamp . ' UTC] ' . $message . "\n";
    $logFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'mowglai-razorpay.log';
    @file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    log_event('Invalid method: ' . ($_SERVER['REQUEST_METHOD'] ?? 'unknown'));
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode((string) file_get_contents('php://input'), true);
$planId = isset($input['plan_id']) ? (string) $input['plan_id'] : '';
$planName = isset($input['plan_name']) ? (string) $input['plan_name'] : '';

$allowedPlans = [
    'plan_SG1iI7omyDN39z',
    'plan_SG1j6DcHgFk70v',
    'plan_SG1jkJ8tcJTgOS',
];

if ($planId === '' || !in_array($planId, $allowedPlans, true)) {
    http_response_code(400);
    log_event('Invalid plan id: ' . $planId);
    echo json_encode(['error' => 'Invalid plan id']);
    exit;
}

$razorpayKeyId = getenv('RAZORPAY_KEY_ID') ?: '';
$razorpayKeySecret = getenv('RAZORPAY_KEY_SECRET') ?: '';

if ($razorpayKeyId === '' || $razorpayKeySecret === '') {
    http_response_code(500);
    log_event('Missing Razorpay credentials');
    echo json_encode(['error' => 'Razorpay credentials not configured']);
    exit;
}

$payload = json_encode([
    'plan_id' => $planId,
    'total_count' => 12,
    'customer_notify' => 1,
    'notes' => [
        'plan_name' => $planName,
        'source' => 'mowglai-investment',
    ],
]);

$ch = curl_init('https://api.razorpay.com/v1/subscriptions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_USERPWD, $razorpayKeyId . ':' . $razorpayKeySecret);

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false) {
    http_response_code(500);
    log_event('Razorpay request failed: ' . curl_error($ch));
    echo json_encode(['error' => 'Failed to connect to Razorpay']);
    curl_close($ch);
    exit;
}

curl_close($ch);

$data = json_decode($response, true);

if ($status < 200 || $status >= 300) {
    http_response_code(502);
    $message = isset($data['error']['description']) ? (string) $data['error']['description'] : 'Subscription creation failed';
    log_event('Razorpay error (' . $status . '): ' . $message);
    echo json_encode(['error' => $message]);
    exit;
}

$subscriptionId = isset($data['id']) ? (string) $data['id'] : '';

if ($subscriptionId === '') {
    http_response_code(502);
    log_event('Razorpay response missing subscription id');
    echo json_encode(['error' => 'Invalid Razorpay response']);
    exit;
}

log_event('Subscription created: ' . $subscriptionId . ' for plan ' . $planId);
echo json_encode(['subscription_id' => $subscriptionId]);
