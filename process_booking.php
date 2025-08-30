<?php
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

// Send email notification
$email_sent = false;
$email_error = '';

try {
    // Email configuration - Update these with your actual settings
    $to = 'your-email@example.com'; // Replace with your email
    $subject = 'New Booking Submission - GoodAV';

    // Create HTML email content
    $message = "
    <html>
    <head>
        <title>New Booking Request</title>
        <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ff6b35; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin: 10px 0; }
            .label { font-weight: bold; color: #333; }
            .value { color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🎉 New Booking Request</h2>
                <p>GoodAV Contact Form Submission</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Name:</span>
                    <span class='value'>{$data['name']}</span>
                </div>
                <div class='field'>
                    <span class='label'>Email:</span>
                    <span class='value'>{$data['email']}</span>
                </div>
                <div class='field'>
                    <span class='label'>Phone:</span>
                    <span class='value'>" . ($data['phone'] ?? 'Not provided') . "</span>
                </div>
                <div class='field'>
                    <span class='label'>Organization:</span>
                    <span class='value'>{$data['organization']}</span>
                </div>
                <div class='field'>
                    <span class='label'>Project:</span>
                    <span class='value'>{$data['project']}</span>
                </div>
                <div class='field'>
                    <span class='label'>Preferred Date:</span>
                    <span class='value'>{$data['date']}</span>
                </div>
                <div class='field'>
                    <span class='label'>Preferred Time:</span>
                    <span class='value'>{$data['time']}</span>
                </div>
                <div class='field'>
                    <span class='label'>Timezone:</span>
                    <span class='value'>{$data['timezone']}</span>
                </div>
                <div class='field'>
                    <span class='label'>Booking ID:</span>
                    <span class='value'>{$booking_id}</span>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";

    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: GoodAV Contact Form <noreply@goodav.net>" . "\r\n";

    // Send email
    $email_sent = mail($to, $subject, $message, $headers);

    if (!$email_sent) {
        $email_error = 'PHP mail function failed';
    }

} catch (Exception $e) {
    $email_error = $e->getMessage();
    error_log('Email error: ' . $email_error);
}

// Return response
if ($email_sent) {
    echo json_encode([
        'success' => true,
        'id' => $booking_id,
        'message' => 'Booking saved and email sent successfully'
    ]);
} else {
    echo json_encode([
        'success' => true,
        'id' => $booking_id,
        'warning' => 'Booking saved, but email failed to send: ' . $email_error,
        'email_error' => $email_error
    ]);
}
?>
