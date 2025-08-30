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

// Send email notification via separate email forwarder service
$email_result = ['success' => false, 'error' => 'Email service not available'];

try {
    // Prepare data for email forwarder
    $email_data = [
        'name' => $data['name'],
        'email' => $data['email'],
        'phone' => $data['phone'] ?? '',
        'organization' => $data['organization'],
        'project' => $data['project'],
        'date' => $data['date'],
        'time' => $data['time'],
        'timezone' => $data['timezone'],
        'booking_id' => $booking_id
    ];

    // Use cURL to send data to email forwarder
    $ch = curl_init('http://localhost:8000/email_forwarder.php');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($email_data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json'
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30); // 30 second timeout

    $email_response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    curl_close($ch);

    if ($curl_error) {
        $email_result = [
            'success' => false,
            'error' => 'Email service connection failed: ' . $curl_error
        ];
    } elseif ($http_code >= 200 && $http_code < 300) {
        $email_response_data = json_decode($email_response, true);
        if ($email_response_data && isset($email_response_data['success'])) {
            $email_result = $email_response_data;
        } else {
            $email_result = [
                'success' => false,
                'error' => 'Invalid response from email service'
            ];
        }
    } else {
        $email_result = [
            'success' => false,
            'error' => 'Email service returned HTTP ' . $http_code
        ];
    }

} catch (Exception $e) {
    $email_result = [
        'success' => false,
        'error' => 'Email forwarding failed: ' . $e->getMessage()
    ];
    error_log('Email forwarding error: ' . $e->getMessage());
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
