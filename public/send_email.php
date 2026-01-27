<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get JSON input
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (empty($_POST['email'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit();
}

$to = "info@mowglai.in"; // Admin email
$subject = $_POST['subject'] ?? "New Contact Request from Website";
$from = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$name = $_POST['name'] ?? "Website Visitor";

if (!$from) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid email format"]);
    exit();
}

// Construct email body for Admin
$body = "New submission received from the website:\n\n";
foreach ($_POST as $key => $value) {
    // Skip internal fields if any
    if (in_array($key, ['subject', 'to'])) continue;
    
    // Format the key to be more readable
    $label = ucwords(str_replace(['_', '-'], ' ', $key));
    
    $body .= "{$label}:\n{$value}\n\n";
}

$body .= "----------------------------------------\n";
$body .= "Sent from mowglai.in";

// Headers for Admin Email
$headers = "From: Mowglai Website <no-reply@mowglai.in>\r\n"; 
$headers .= "Reply-To: {$from}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send Admin Email
if (mail($to, $subject, $body, $headers)) {
    
    // --- Send Confirmation Email to User ---
    $user_email = $from;
    $user_subject = "Welcome to Mowglai - We've received your message";
    
    // Read the HTML template
    // The template file is expected to be in the same directory as this script in the build output
    $template_path = __DIR__ . '/email_mowglai.html';
    
    if (file_exists($template_path)) {
        $user_body = file_get_contents($template_path);
        
        // Set headers for User Email (HTML)
        $user_headers = "MIME-Version: 1.0" . "\r\n";
        $user_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $user_headers .= "From: Mowglai <no-reply@mowglai.in>" . "\r\n";
        $user_headers .= "Reply-To: info@mowglai.in" . "\r\n";
        $user_headers .= "X-Mailer: PHP/" . phpversion();
        
        // Send user email
        mail($user_email, $user_subject, $user_body, $user_headers);
    } else {
        // Log error if needed, or just proceed. 
        // In production, we might want to know if this fails.
        error_log("Template file not found at: " . $template_path);
    }

    echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to send email server-side."]);
}
?>
