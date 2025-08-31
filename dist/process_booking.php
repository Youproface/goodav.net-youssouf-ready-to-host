<?php
// process_booking.php
// Receives JSON booking data, validates, stores in SQLite, and attempts to forward via email.

header('Content-Type: application/json; charset=utf-8');

// Allow CORS from localhost dev servers during development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// If Composer autoload exists (project root), load it so PHPMailer or other libs are available
$autoload = __DIR__ . '/../vendor/autoload.php';
if (file_exists($autoload)) {
    require_once $autoload;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || !is_array($data)) {
    echo json_encode(['success' => false, 'error' => 'Invalid JSON payload']);
    exit;
}

// Basic validation
$required = ['name', 'email', 'organization', 'project', 'date', 'time'];
$errors = [];
foreach ($required as $f) {
    if (empty($data[$f]) || !is_string($data[$f]) || trim($data[$f]) === '') {
        $errors[] = $f . ' is required';
    }
}

if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email address';
}

if (!empty($errors)) {
    echo json_encode(['success' => false, 'error' => implode('; ', $errors)]);
    exit;
}

// Honeypot check (if client sends hp_field and it's non-empty, likely a bot)
if (!empty($data['hp_field'])) {
    // silently accept but do not store
    echo json_encode(['success' => false, 'error' => 'Spam detected']);
    exit;
}

// Simple rate limiting: allow max 3 submissions per IP per 60 seconds
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = __DIR__ . DIRECTORY_SEPARATOR . 'rate_limit.log';
$now = time();
$window = 60; // seconds
$maxPerWindow = 3;

$entries = [];
if (file_exists($rateFile)) {
    $rawrl = file_get_contents($rateFile);
    $entries = $rawrl ? json_decode($rawrl, true) : [];
    if (!is_array($entries)) $entries = [];
}

// cleanup old entries
foreach ($entries as $key => $arr) {
    $entries[$key] = array_filter($arr, function($ts) use ($now, $window) { return ($now - $ts) <= $window; });
    if (empty($entries[$key])) unset($entries[$key]);
}

$countForIp = isset($entries[$ip]) ? count($entries[$ip]) : 0;
if ($countForIp >= $maxPerWindow) {
    echo json_encode(['success' => false, 'error' => 'Too many submissions. Please wait a moment and try again.']);
    exit;
}

// record this attempt
$entries[$ip][] = $now;
file_put_contents($rateFile, json_encode($entries));

// Sanitize values
$name = trim($data['name']);
$email = trim($data['email']);
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$organization = trim($data['organization']);
$project = trim($data['project']);
$date = trim($data['date']);
$time = trim($data['time']);
$timezone = isset($data['timezone']) ? trim($data['timezone']) : '';
$meetingSoftware = isset($data['meetingSoftware']) ? trim($data['meetingSoftware']) : '';

// Database (SQLite) path
$dbFile = __DIR__ . DIRECTORY_SEPARATOR . 'bookings.db';

try {
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT,
        organization TEXT,
        project TEXT,
        date TEXT,
        time TEXT,
        timezone TEXT,
        meetingSoftware TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    $stmt = $pdo->prepare("INSERT INTO bookings (name, email, phone, organization, project, date, time, timezone, meetingSoftware) VALUES (:name, :email, :phone, :organization, :project, :date, :time, :timezone, :meetingSoftware)");
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':organization' => $organization,
        ':project' => $project,
        ':date' => $date,
        ':time' => $time,
        ':timezone' => $timezone,
        ':meetingSoftware' => $meetingSoftware
    ]);

    $insertId = $pdo->lastInsertId();

    // Attempt to forward via email
    $adminEmail = getenv('BOOKING_ADMIN_EMAIL') ?: 'admin@example.com';
    $fromEmail = getenv('BOOKING_FROM_EMAIL') ?: 'noreply@example.com';

    $subject = "New Consultation Booking (#" . $insertId . ")";
    $message = "A new booking has been submitted:\n\n";
    $message .= "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Phone: $phone\n";
    $message .= "Organization: $organization\n";
    $message .= "Project: $project\n";
    $message .= "Date: $date\n";
    $message .= "Time: $time\n";
    $message .= "Timezone: $timezone\n";
    $message .= "Meeting Platform: $meetingSoftware\n";

    $mailSent = false;
    $mailWarnings = [];

    // Prefer PHPMailer via SMTP if available and configured
    $smtpHost = getenv('SMTP_HOST');
    $smtpUser = getenv('SMTP_USER');
    $smtpPass = getenv('SMTP_PASS');
    $smtpPort = getenv('SMTP_PORT') ?: 587;
    $smtpSecure = getenv('SMTP_SECURE') ?: 'tls'; // tls or ssl

    if ($smtpHost && class_exists('\PHPMailer\PHPMailer\PHPMailer')) {
        try {
            $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
            //Server settings
            $mail->isSMTP();
            $mail->Host = $smtpHost;
            $mail->SMTPAuth = true;
            $mail->Username = $smtpUser;
            $mail->Password = $smtpPass;
            $mail->SMTPSecure = $smtpSecure;
            $mail->Port = (int)$smtpPort;

            //Recipients
            $mail->setFrom($fromEmail, 'Booking System');
            $mail->addAddress($adminEmail);
            $mail->addReplyTo($email);

            // Content
            $mail->Subject = $subject;
            $mail->Body    = $message;
            $mail->AltBody = $message;

            $mail->send();
            $mailSent = true;
        } catch (Exception $e) {
            $mailWarnings[] = 'PHPMailer error: ' . $e->getMessage();
            $mailSent = false;
        }
    } else {
        // Fallback to native mail() -- may not be available on some systems
        $headers = "From: $fromEmail\r\n" .
                   "Reply-To: $email\r\n" .
                   "Content-Type: text/plain; charset=utf-8\r\n";
        try {
            $mailSent = @mail($adminEmail, $subject, $message, $headers);
            if (!$mailSent) {
                $mailWarnings[] = 'mail() returned false or no MTA configured';
            }
        } catch (Exception $e) {
            $mailWarnings[] = 'mail() exception: ' . $e->getMessage();
            $mailSent = false;
        }
    }

    $response = ['success' => true, 'id' => $insertId];
    if (!$mailSent) {
        $response['warning'] = 'Failed to send notification email';
        if (!empty($mailWarnings)) {
            $response['warning_details'] = $mailWarnings;
        }
        $response['note'] = 'Configure SMTP by installing PHPMailer and setting SMTP_HOST, SMTP_USER, SMTP_PASS environment variables for reliable email delivery.';
    }

    echo json_encode($response);
    exit;

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    exit;
}

?>
