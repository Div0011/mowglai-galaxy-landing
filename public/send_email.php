<?php
// ============================================================
// Mowglai Email & Database Handler
// Saves form submissions to MySQL database (u707591712_mowglai_data)
// and sends email notifications via Hostinger SMTP / mail()
// ============================================================

// Prevent raw PHP notices/warnings from breaking JSON output
error_reporting(0);
ini_set('display_errors', '0');
ob_start();

// CORS & JSON Headers – must come before any output
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle browser preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    ob_end_clean();
    exit(0);
}

// ── Configuration ──────────────────────────────────────────────
$ADMIN_EMAIL  = "info@mowglai.com";
$FROM_NAME    = "Mowglai Website";
$FROM_ADDRESS = "info@mowglai.com";

// Hostinger SMTP configuration
$SMTP_CONFIG = [
    'enabled'  => true,
    'host'     => getenv('SMTP_HOST') ?: 'ssl://smtp.hostinger.com',
    'port'     => (int)(getenv('SMTP_PORT') ?: 465),
    'username' => getenv('SMTP_USER') ?: 'info@mowglai.com',
    'password' => getenv('SMTP_PASS') ?: 'Jungle!@#99',
    'timeout'  => 10
];

// ── Logger Helper ──────────────────────────────────────────────
function log_email(string $status, string $details): void {
    $timestamp = gmdate('Y-m-d H:i:s UTC');
    $log_line  = "[{$timestamp}] {$status}: {$details}\n";
    $log_dir   = __DIR__ . '/api';
    if (!is_dir($log_dir)) {
        @mkdir($log_dir, 0755, true);
    }
    $log_file = $log_dir . '/email.log';
    @file_put_contents($log_file, $log_line, FILE_APPEND | LOCK_EX);
}

// ── Header Injection Sanitizer ─────────────────────────────────
function sanitize_header(string $val): string {
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], '', $val));
}

// ── Diagnostic / Health Check (GET ?test=1) ────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['test'])) {
    ob_end_clean();
    $db_ok = false;
    try {
        if (file_exists(__DIR__ . '/api/db.php')) {
            include_once __DIR__ . '/api/db.php';
            if (isset($pdo) && $pdo instanceof PDO) {
                $db_ok = true;
            }
        }
    } catch (\Throwable $e) {}

    echo json_encode([
        "status"               => "ok",
        "service"              => "Mowglai Mail & Database Handler",
        "php_version"          => phpversion(),
        "database_connected"   => $db_ok,
        "mail_func"            => function_exists('mail'),
        "openssl"              => extension_loaded('openssl'),
        "smtp_pass_configured" => !empty($SMTP_CONFIG['password']),
        "log_writable"          => is_writable(__DIR__ . '/api') || is_writable(__DIR__)
    ]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ob_end_clean();
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit();
}

// Parse JSON payload
$raw  = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!is_array($data)) {
    ob_end_clean();
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON payload"]);
    exit();
}

// ── Extract Submission Fields ──────────────────────────────────
$user_email_raw = isset($data['email']) ? sanitize_header((string)$data['email']) : '';
$user_email     = $user_email_raw ? filter_var($user_email_raw, FILTER_VALIDATE_EMAIL) : false;

$user_name = isset($data['name']) ? sanitize_header((string)$data['name']) : null;
if (!$user_name && isset($data['company_name'])) {
    $user_name = sanitize_header((string)$data['company_name']);
}

$user_phone = isset($data['phone_number']) ? sanitize_header((string)$data['phone_number']) : null;
if (!$user_phone && isset($data['phone'])) {
    $user_phone = sanitize_header((string)$data['phone']);
}
if (!$user_phone && isset($data['phoneNumber'])) {
    $user_phone = sanitize_header((string)$data['phoneNumber']);
}

$form_type = isset($data['service_type']) ? sanitize_header((string)$data['service_type']) : 'General Form Submission';

$raw_subject = isset($data['subject']) && $data['subject'] ? (string)$data['subject'] : "New Form Submission from mowglai.com";
$subject     = sanitize_header(strip_tags($raw_subject));

// ── Database Storage (MySQL) ───────────────────────────────────
$submission_id = null;
$pdo_conn = null;

try {
    if (file_exists(__DIR__ . '/api/db.php')) {
        include_once __DIR__ . '/api/db.php';
        if (isset($pdo) && $pdo instanceof PDO) {
            $pdo_conn = $pdo;

            // Ensure table exists
            $create_sql = "CREATE TABLE IF NOT EXISTS `form_submissions` (
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
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

            $pdo_conn->exec($create_sql);

            // Insert submission
            $stmt = $pdo_conn->prepare("INSERT INTO `form_submissions` (`subject`, `name`, `email`, `phone`, `form_type`, `payload_json`, `mail_status`) VALUES (:subject, :name, :email, :phone, :form_type, :payload, 'pending')");
            $stmt->execute([
                ':subject'   => $subject,
                ':name'      => $user_name,
                ':email'     => $user_email_raw ?: null,
                ':phone'     => $user_phone,
                ':form_type' => $form_type,
                ':payload'   => json_encode($data, JSON_UNESCAPED_UNICODE)
            ]);
            $submission_id = (int)$pdo_conn->lastInsertId();
            log_email("DB_SAVE", "Form submission saved to database (ID: {$submission_id})");
        }
    }
} catch (\Throwable $db_err) {
    log_email("DB_ERROR", "Database insertion warning: " . $db_err->getMessage());
}

// ── Build HTML & Text Email Templates ──────────────────────────
$skip_keys  = ['subject', 'to', 'message'];
$table_rows = "";
foreach ($data as $key => $value) {
    if (in_array($key, $skip_keys)) continue;
    $label    = ucwords(str_replace(['_', '-'], ' ', (string)$key));
    $safe_val = htmlspecialchars(is_array($value) ? implode(", ", $value) : (string)$value, ENT_QUOTES, 'UTF-8');
    $table_rows .= "<tr>
        <td style='padding:10px 14px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold;color:#374151;white-space:nowrap;'>{$label}</td>
        <td style='padding:10px 14px;border:1px solid #e5e7eb;color:#111827;'>{$safe_val}</td>
    </tr>";
}

$message_text = isset($data['message']) ? htmlspecialchars((string)$data['message'], ENT_QUOTES, 'UTF-8') : '';
if ($message_text) {
    $table_rows .= "<tr>
        <td style='padding:10px 14px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold;color:#374151;vertical-align:top;'>Message</td>
        <td style='padding:10px 14px;border:1px solid #e5e7eb;color:#111827;white-space:pre-wrap;'>{$message_text}</td>
    </tr>";
}

$db_ref_text = $submission_id ? "<p style='color:#6b7280;font-size:12px;margin-bottom:16px;'>Database Record ID: #{$submission_id}</p>" : "";

// Plain-text version
$plain = "New Form Submission from mowglai.com\n";
if ($submission_id) {
    $plain .= "Database Record ID: #{$submission_id}\n";
}
$plain .= "===========================================\n\n";
foreach ($data as $key => $value) {
    if ($key === 'subject') continue;
    $label   = ucwords(str_replace(['_', '-'], ' ', (string)$key));
    $val_str = is_array($value) ? implode(", ", $value) : (string)$value;
    $plain  .= "{$label}: {$val_str}\n";
}
$plain .= "\n---\nStored in Database & Sent from mowglai.com";

// HTML version
$html = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;margin:0;padding:24px;background:#f3f4f6;">
  <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);border:1px solid #e5e7eb;">
    <div style="background:#111827;padding:24px 32px;border-bottom:3px solid #e6b93d;">
      <h1 style="color:#e6b93d;margin:0;font-size:24px;letter-spacing:0.05em;">🌿 MOWGLAI</h1>
      <p style="color:#9ca3af;margin:6px 0 0;font-size:14px;">New website submission notification</p>
    </div>
    <div style="padding:32px;">
      <h2 style="font-size:18px;margin:0 0 8px;color:#111827;">{$subject}</h2>
      {$db_ref_text}
      <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.5;">
        {$table_rows}
      </table>
    </div>
    <div style="padding:18px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:12px;color:#6b7280;">Stored in database and sent automatically from mowglai.com — Reply to this email to respond directly.</p>
    </div>
  </div>
</body>
</html>
HTML;

// ── Native SMTP Socket Function ────────────────────────────────
function send_smtp(array $config, string $to, string $subject, string $htmlBody, string $plainBody, string $fromAddress, string $fromName, string $replyTo): bool {
    $host    = $config['host'];
    $port    = $config['port'];
    $user    = $config['username'];
    $pass    = $config['password'];
    $timeout = $config['timeout'];

    $socket = @fsockopen($host, $port, $errno, $errstr, $timeout);
    if (!$socket) {
        log_email("SMTP_ERROR", "Connection failed to {$host}:{$port} - {$errstr} ({$errno})");
        return false;
    }

    $read = function() use ($socket) {
        $response = "";
        while ($str = fgets($socket, 512)) {
            $response .= $str;
            if (substr($str, 3, 1) === " ") break;
        }
        return $response;
    };

    $send = function(string $cmd) use ($socket, $read) {
        fputs($socket, $cmd . "\r\n");
        return $read();
    };

    $res = $read();
    if (substr($res, 0, 3) !== "220") {
        log_email("SMTP_ERROR", "Server did not respond with 220: {$res}");
        fclose($socket);
        return false;
    }

    $send("EHLO mowglai.com");
    $res = $send("AUTH LOGIN");
    if (substr($res, 0, 3) !== "334") {
        log_email("SMTP_ERROR", "AUTH LOGIN failed: {$res}");
        fclose($socket);
        return false;
    }

    $res = $send(base64_encode($user));
    if (substr($res, 0, 3) !== "334") {
        log_email("SMTP_ERROR", "Username rejected: {$res}");
        fclose($socket);
        return false;
    }

    $res = $send(base64_encode($pass));
    if (substr($res, 0, 3) !== "235") {
        log_email("SMTP_ERROR", "Password rejected: {$res}");
        fclose($socket);
        return false;
    }

    $send("MAIL FROM: <{$fromAddress}>");
    $send("RCPT TO: <{$to}>");
    $res = $send("DATA");

    if (substr($res, 0, 3) !== "354") {
        log_email("SMTP_ERROR", "DATA command rejected: {$res}");
        fclose($socket);
        return false;
    }

    $boundary = "mowglai_smtp_" . md5(uniqid((string)rand(), true));

    $headers  = "From: {$fromName} <{$fromAddress}>\r\n";
    $headers .= "To: {$to}\r\n";
    $headers .= "Reply-To: {$replyTo}\r\n";
    $headers .= "Subject: {$subject}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";
    $headers .= "X-Mailer: Mowglai Mailer 2.0\r\n";

    $body  = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";
    $body .= quoted_printable_encode($plainBody) . "\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";
    $body .= quoted_printable_encode($htmlBody) . "\r\n";
    $body .= "--{$boundary}--\r\n.";

    $res = $send($headers . "\r\n" . $body);
    $send("QUIT");
    fclose($socket);

    if (substr($res, 0, 3) === "250") {
        return true;
    }

    log_email("SMTP_ERROR", "Failed to finalize message sending: {$res}");
    return false;
}

// ── Email Execution Strategy ───────────────────────────────────
$reply_to    = $user_email ? $user_email : $FROM_ADDRESS;
$sent        = false;
$method_used = "";

// 1. Attempt SMTP if password provided
if ($SMTP_CONFIG['enabled'] && !empty($SMTP_CONFIG['password'])) {
    $sent = send_smtp($SMTP_CONFIG, $ADMIN_EMAIL, $subject, $html, $plain, $FROM_ADDRESS, $FROM_NAME, $reply_to);
    if ($sent) {
        $method_used = "Hostinger SMTP";
    }
}

// 2. Fall back to optimized PHP mail() with -f parameter and \n line endings
if (!$sent && function_exists('mail')) {
    $boundary = "mowglai_" . md5(uniqid((string)rand(), true));

    $headers  = "From: {$FROM_NAME} <{$FROM_ADDRESS}>\n";
    $headers .= "Reply-To: {$reply_to}\n";
    $headers .= "MIME-Version: 1.0\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\n";

    $body  = "--{$boundary}\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\n";
    $body .= "Content-Transfer-Encoding: quoted-printable\n\n";
    $body .= quoted_printable_encode($plain) . "\n";
    $body .= "--{$boundary}\n";
    $body .= "Content-Type: text/html; charset=UTF-8\n";
    $body .= "Content-Transfer-Encoding: quoted-printable\n\n";
    $body .= quoted_printable_encode($html) . "\n";
    $body .= "--{$boundary}--";

    $sent = @mail($ADMIN_EMAIL, $subject, $body, $headers, "-f" . $FROM_ADDRESS);
    if ($sent) {
        $method_used = "PHP mail() with -f envelope sender";
    }
}

// ── Auto-Reply to Submitter ────────────────────────────────────
if ($sent && $user_email) {
    $reply_subject  = "We received your message – Mowglai";
    $reply_plain    = "Hi there,\n\nThank you for reaching out to Mowglai! We have received your submission and will get back to you within 24 hours.\n\nBest regards,\nThe Mowglai Team\nhttps://mowglai.com";
    $reply_html     = <<<HTML2
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;margin:0;padding:24px;background:#f3f4f6;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);border:1px solid #e5e7eb;">
    <div style="background:#111827;padding:24px 32px;border-bottom:3px solid #e6b93d;">
      <h1 style="color:#e6b93d;margin:0;font-size:24px;">🌿 MOWGLAI</h1>
    </div>
    <div style="padding:32px;">
      <h2 style="font-size:18px;color:#111827;margin:0 0 14px;">We've received your message!</h2>
      <p style="color:#374151;line-height:1.6;">Thank you for reaching out to Mowglai. Our team will review your submission and get back to you within <strong>24 hours</strong>.</p>
      <p style="color:#374151;line-height:1.6;">In the meantime, feel free to explore our work at <a href="https://mowglai.com" style="color:#e6b93d;text-decoration:none;font-weight:bold;">mowglai.com</a>.</p>
      <p style="color:#374151;margin-top:28px;">Warm regards,<br><strong>The Mowglai Team</strong></p>
    </div>
  </div>
</body>
</html>
HTML2;

    if (!empty($SMTP_CONFIG['password'])) {
        @send_smtp($SMTP_CONFIG, $user_email, $reply_subject, $reply_html, $reply_plain, $FROM_ADDRESS, $FROM_NAME, $FROM_ADDRESS);
    } else if (function_exists('mail')) {
        $reply_boundary = "mowglai_reply_" . md5(uniqid((string)rand(), true));
        $reply_headers  = "From: {$FROM_NAME} <{$FROM_ADDRESS}>\n";
        $reply_headers .= "Reply-To: {$FROM_ADDRESS}\n";
        $reply_headers .= "MIME-Version: 1.0\n";
        $reply_headers .= "Content-Type: multipart/alternative; boundary=\"{$reply_boundary}\"\n";

        $reply_body  = "--{$reply_boundary}\n";
        $reply_body .= "Content-Type: text/plain; charset=UTF-8\n";
        $reply_body .= "Content-Transfer-Encoding: quoted-printable\n\n";
        $reply_body .= quoted_printable_encode($reply_plain) . "\n";
        $reply_body .= "--{$reply_boundary}\n";
        $reply_body .= "Content-Type: text/html; charset=UTF-8\n";
        $reply_body .= "Content-Transfer-Encoding: quoted-printable\n\n";
        $reply_body .= quoted_printable_encode($reply_html) . "\n";
        $reply_body .= "--{$reply_boundary}--";

        @mail($user_email, $reply_subject, $reply_body, $reply_headers, "-f" . $FROM_ADDRESS);
    }
}

// ── Update Database Status ─────────────────────────────────────
if ($pdo_conn && $submission_id) {
    try {
        $new_status = $sent ? 'sent' : 'failed';
        $update_stmt = $pdo_conn->prepare("UPDATE `form_submissions` SET `mail_status` = :st WHERE `id` = :id");
        $update_stmt->execute([':st' => $new_status, ':id' => $submission_id]);
    } catch (\Throwable $e) {}
}

ob_end_clean();

// ── Respond to Frontend (Website UI handles response) ────────
if ($sent || $submission_id) {
    log_email("SUCCESS", "Completed processing for submission ID: " . ($submission_id ?: 'N/A') . " via {$method_used}");
    echo json_encode([
        "status"        => "success",
        "message"       => "Your message has been submitted and saved successfully.",
        "submission_id" => $submission_id
    ]);
} else {
    log_email("FAILURE", "Failed to process form submission [Subject: {$subject}]");
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "Submission error. Please try again or reach us at info@mowglai.com."
    ]);
}
?>