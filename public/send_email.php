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

$to_admin = "info@mowglai.in";
$subject = $_POST['subject'] ?? "New Contact Request from Website";
$user_email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$name = $_POST['name'] ?? "Website Visitor";

if (!$user_email) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid email format"]);
    exit();
}

// --- 1. Send Admin Email (Multipart) ---
$boundary = md5(time());

// Headers
$headers = "From: Mowglai Website <no-reply@mowglai.in>\r\n";
$headers .= "Reply-To: {$user_email}\r\n";
$headers .= "Sender: no-reply@mowglai.in\r\n"; // Helps with Spam filters
$headers .= "Return-Path: no-reply@mowglai.in\r\n"; // Bounced emails go here
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n";

// Plain Text Body
$text_body = "New submission received from the website:\n\n";
foreach ($_POST as $key => $value) {
    if (in_array($key, ['subject', 'to'])) continue;
    $label = ucwords(str_replace(['_', '-'], ' ', $key));
    $text_body .= "{$label}: {$value}\n";
}
$text_body .= "\n----------------------------------------\nSent from mowglai.in";

// HTML Body
$html_body = "<html><body><h2>New Contact Submission</h2>";
$html_body .= "<table cellpadding='5' cellspacing='0' border='1' style='border-collapse:collapse;'>";
foreach ($_POST as $key => $value) {
    if (in_array($key, ['subject', 'to'])) continue;
    $label = ucwords(str_replace(['_', '-'], ' ', $key));
    $safe_value = htmlspecialchars($value);
    $html_body .= "<tr><td><strong>{$label}</strong></td><td>{$safe_value}</td></tr>";
}
$html_body .= "</table><br><p>Sent from mowglai.in</p></body></html>";

// Full Message
$message = "--$boundary\r\n";
$message .= "Content-Type: text/plain; charset=UTF-8\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$message .= $text_body . "\r\n";
$message .= "--$boundary\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$message .= $html_body . "\r\n";
$message .= "--$boundary--";

// Send to Admin
$mail_sent = mail($to_admin, $subject, $message, $headers, "-f no-reply@mowglai.in");


// --- 2. Send Confirmation Email to User (Multipart) ---
if ($mail_sent) {
    $user_subject = "Welcome to Mowglai - We've received your message";
    
    // Read HTML Template
    $template_path = __DIR__ . '/email_mowglai.html';
    $html_content_user = "";
    if (file_exists($template_path)) {
        $html_content_user = file_get_contents($template_path);
    } else {
        $html_content_user = "<p>Thank you for contacting Mowglai. We have received your message.</p>";
    }

    // Plain Text Fallback
    $text_content_user = "Welcome to Mowglai!\n\n";
    $text_content_user .= "Thank you for reaching out. We have received your message and will get back to you shortly.\n\n";
    $text_content_user .= "Best regards,\nThe Mowglai Team\nhttps://mowglai.in";

    $boundary_user = md5(time() . "user");

    // Headers
    $headers_user = "From: Mowglai <no-reply@mowglai.in>\r\n";
    $headers_user .= "Reply-To: info@mowglai.in\r\n";
    $headers_user .= "Sender: no-reply@mowglai.in\r\n";
    $headers_user .= "Return-Path: info@mowglai.in\r\n";
    $headers_user .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers_user .= "MIME-Version: 1.0\r\n";
    $headers_user .= "Content-Type: multipart/alternative; boundary=\"$boundary_user\"\r\n";

    // Message
    $message_user = "--$boundary_user\r\n";
    $message_user .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $message_user .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $message_user .= $text_content_user . "\r\n";
    $message_user .= "--$boundary_user\r\n";
    $message_user .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message_user .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $message_user .= $html_content_user . "\r\n";
    $message_user .= "--$boundary_user--";

    // Send to User
    mail($user_email, $user_subject, $message_user, $headers_user, "-f no-reply@mowglai.in");

    echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to send email server-side."]);
}
?>
