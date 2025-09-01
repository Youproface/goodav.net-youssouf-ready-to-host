<?php
// Load .env variables using vlucas/phpdotenv
require_once __DIR__ . '/vendor/autoload.php';
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for CORS and JSON response
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON data from request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit();
}

// Validate required fields
$required_fields = ['name', 'email', 'organization', 'project', 'date', 'time'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: ' . implode(', ', $missing_fields)]);
    exit();
}

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit();
}

// Save to database (SQLite)
try {
    $db = new PDO('sqlite:' . __DIR__ . '/booking.db');

    // Create table if it doesn't exist
    $db->exec("CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        organization TEXT NOT NULL,
        project TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        timezone TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // Insert booking data
    $stmt = $db->prepare("INSERT INTO bookings (name, email, phone, organization, project, date, time, timezone)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->execute([
        $data['name'],
        $data['email'],
        $data['phone'] ?? '',
        $data['organization'],
        $data['project'],
        $data['date'],
        $data['time'],
        $data['timezone']
    ]);

    $booking_id = $db->lastInsertId();

} catch (Exception $e) {
    error_log('Database error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    exit();
}

// Send email notification using PHPMailer and SMTP from .env
require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/SMTP.php';
require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function get_env($key, $default = null) {
// Helper to load and fill template
function load_and_fill_template($template_path, $data) {
    $template = file_get_contents($template_path);
    foreach ($data as $key => $value) {
        $template = str_replace('{{' . $key . '}}', htmlspecialchars($value), $template);
    }
    return $template;
}
    if (getenv($key) !== false) {
        return getenv($key);
    }
    if (isset($_ENV[$key])) {
        return $_ENV[$key];
    }
    return $default;
}

$email_result = ['success' => false, 'error' => 'Email service not available'];
try {
    // 1. Send confirmation to client using template
    $clientMail = new PHPMailer(true);
    $clientMail->isSMTP();
    $clientMail->Host = get_env('SMTP_ICLOUD1_HOST');
    $clientMail->Port = get_env('SMTP_ICLOUD1_PORT');
    $clientMail->SMTPAuth = true;
    $clientMail->Username = get_env('SMTP_ICLOUD1_USER');
    $clientMail->Password = get_env('SMTP_ICLOUD1_PASS');
    $clientMail->SMTPSecure = get_env('SMTP_ICLOUD1_SECURE', 'tls');
    $clientMail->setFrom(get_env('BOOKING_FROM_EMAIL', 'noreply@goodav.net'), 'GoodAV Booking');
    $clientMail->addAddress($data['email'], $data['name']);
    $clientMail->isHTML(true);
    $clientMail->Subject = 'Your booking is confirmed — GoodAV';
    $templateData = [
        'name' => $data['name'],
        'email' => $data['email'],
        'phone' => $data['phone'] ?? '',
        'organization' => $data['organization'],
        'project' => $data['project'],
        'date' => $data['date'],
        'time' => $data['time'],
        'timezone' => $data['timezone'],
        'booking_id' => $booking_id,
        'support_email' => get_env('SUPPORT_EMAIL', 'support@goodav.net'),
    ];
    $clientMail->Body = load_and_fill_template(__DIR__ . '/public/emails/booking_confirmation.html', $templateData);
    if (get_env('ENABLE_SMTP_DEBUG', '0') === '1') {
        $clientMail->SMTPDebug = SMTP::DEBUG_SERVER;
        $clientMail->Debugoutput = function($str, $level) {
            file_put_contents('/tmp/php-smtp.log', $str . "\n", FILE_APPEND);
        };
    }
    $clientMail->send();

    // 2. Send notification to admin only
    $adminMail = new PHPMailer(true);
    $adminMail->isSMTP();
    $adminMail->Host = get_env('SMTP_ICLOUD1_HOST');
    $adminMail->Port = get_env('SMTP_ICLOUD1_PORT');
    $adminMail->SMTPAuth = true;
    $adminMail->Username = get_env('SMTP_ICLOUD1_USER');
    $adminMail->Password = get_env('SMTP_ICLOUD1_PASS');
    $adminMail->SMTPSecure = get_env('SMTP_ICLOUD1_SECURE', 'tls');
    $adminMail->setFrom(get_env('BOOKING_FROM_EMAIL', 'noreply@goodav.net'), 'GoodAV Booking');
    $adminEmails = explode(',', get_env('BOOKING_ADMIN_EMAIL', 'booking@goodav.net'));
    foreach ($adminEmails as $adminEmail) {
        $adminMail->addAddress(trim($adminEmail));
    }
    $forwardEmail = get_env('ADMIN_FORWARD_EMAIL');
    if ($forwardEmail) {
        $adminMail->addAddress($forwardEmail);
    }
    $adminMail->isHTML(true);
    $adminMail->Subject = "New Booking: {$data['name']} ({$data['email']})";
    $adminMail->Body = "<html><body style='font-family:Arial,sans-serif;background:#fff7ed;'><div style='max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #fff1e6;'><div style='background:#ff6b35;color:#fff;padding:16px 20px;'><h1 style='margin:0;font-size:20px;color:#fff;font-weight:700;'>GoodAV</h1><div style='color:#fff8; font-size:15px'>Professional AV production &amp; services</div></div><div style='padding:20px;color:#0f172a;line-height:1.5;'><h2 style='text-align:center;'>New Booking Received</h2><p style='color:#b45309;font-size:16px;text-align:center;'>A new booking has been submitted by <strong>{$data['name']}</strong>.</p><div style='background:#fff7ed;padding:12px;border-radius:6px;color:#0f172a;max-width:400px;margin:0 auto;'><div><strong>Name</strong>: {$data['name']}</div><div><strong>Email</strong>: {$data['email']}</div><div><strong>Phone</strong>: " . ($data['phone'] ?? 'Not provided') . "</div><div><strong>Organization</strong>: {$data['organization']}</div><div><strong>Project</strong>: {$data['project']}</div><div><strong>Date</strong>: {$data['date']}</div><div><strong>Time</strong>: {$data['time']}</div><div><strong>Timezone</strong>: {$data['timezone']}</div><div><strong>Booking ID</strong>: {$booking_id}</div></div></div><div style='background:#fff7ed;color:#92400e;font-size:13px;padding:12px 20px;text-align:center;'><strong>Important Notice:</strong> This is an automated notification for admin only. For support, contact <a href='mailto:support@goodav.net'>support@goodav.net</a>.<br>GoodAV &bull; Kigali, Rwanda &bull; Reference: #{$booking_id}</div></div></body></html>";
    if (get_env('ENABLE_SMTP_DEBUG', '0') === '1') {
        $adminMail->SMTPDebug = SMTP::DEBUG_SERVER;
        $adminMail->Debugoutput = function($str, $level) {
            file_put_contents('/tmp/php-smtp.log', $str . "\n", FILE_APPEND);
        };
    }
    $adminMail->send();

    $email_result = [
        'success' => true,
        'message' => 'Client and admin emails sent successfully via iCloud SMTP'
    ];
} catch (Exception $e) {
    $email_result = [
        'success' => false,
        'error' => 'Email sending failed: ' . $e->getMessage()
    ];
    error_log('Email sending error: ' . $e->getMessage());
}

// Return response
if ($email_result['success']) {
    echo json_encode([
        'success' => true,
        'id' => $booking_id,
        'message' => 'Booking saved and email sent successfully',
        'email_status' => 'sent'
    ]);
} else {
    echo json_encode([
        'success' => true,
        'id' => $booking_id,
        'warning' => 'Booking saved, but email failed to send: ' . ($email_result['error'] ?? 'Unknown error'),
        'email_status' => 'failed',
        'email_error' => $email_result['error'] ?? 'Unknown error'
    ]);
}
?>
