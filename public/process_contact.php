<?php
// process_contact.php
// Receives JSON contact form data, validates, stores in SQLite, and attempts to forward via email.

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

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

// Required fields
$required = ['firstName', 'lastName', 'email', 'subject', 'message'];
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

// Honeypot
if (!empty($data['hp_field'])) {
    echo json_encode(['success' => false, 'error' => 'Spam detected']);
    exit;
}

// Rate limiting
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = __DIR__ . DIRECTORY_SEPARATOR . 'rate_limit.log';
$now = time();
$window = 60;
$maxPerWindow = 5;

$entries = [];
if (file_exists($rateFile)) {
    $rawrl = file_get_contents($rateFile);
    $entries = $rawrl ? json_decode($rawrl, true) : [];
    if (!is_array($entries)) $entries = [];
}

foreach ($entries as $key => $arr) {
    $entries[$key] = array_filter($arr, function($ts) use ($now, $window) { return ($now - $ts) <= $window; });
    if (empty($entries[$key])) unset($entries[$key]);
}

$countForIp = isset($entries[$ip]) ? count($entries[$ip]) : 0;
if ($countForIp >= $maxPerWindow) {
    echo json_encode(['success' => false, 'error' => 'Too many submissions. Please wait a moment and try again.']);
    exit;
}

$entries[$ip][] = $now;
file_put_contents($rateFile, json_encode($entries));

// Sanitize
$firstName = trim($data['firstName']);
$lastName = trim($data['lastName']);
$email = trim($data['email']);
$subject = trim($data['subject']);
$message = trim($data['message']);

$dbFile = __DIR__ . DIRECTORY_SEPARATOR . 'contacts.db';

try {
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT,
        subject TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    $stmt = $pdo->prepare("INSERT INTO contacts (first_name, last_name, email, subject, message) VALUES (:first_name, :last_name, :email, :subject, :message)");
    $stmt->execute([
        ':first_name' => $firstName,
        ':last_name' => $lastName,
        ':email' => $email,
        ':subject' => $subject,
        ':message' => $message
    ]);

    $insertId = $pdo->lastInsertId();

    $adminEmail = getenv('CONTACT_ADMIN_EMAIL') ?: (getenv('PROJECT_ADMIN_EMAIL') ?: 'admin@example.com');
    $fromEmail = getenv('CONTACT_FROM_EMAIL') ?: (getenv('PROJECT_FROM_EMAIL') ?: 'noreply@example.com');

    $plain = "New contact message:\n\n";
    $plain .= "Name: $firstName $lastName\n";
    $plain .= "Email: $email\n";
    $plain .= "Subject: $subject\n\n";
    $plain .= "Message:\n$message\n";

    $templatePath = __DIR__ . '/emails/contact_confirmation.html';
    $htmlBody = null;
    if (file_exists($templatePath)) {
        $htmlBody = file_get_contents($templatePath);
        $replacements = [
            '{{firstName}}' => htmlspecialchars($firstName, ENT_QUOTES),
            '{{lastName}}' => htmlspecialchars($lastName, ENT_QUOTES),
            '{{subject}}' => htmlspecialchars($subject, ENT_QUOTES),
            '{{message}}' => nl2br(htmlspecialchars($message, ENT_QUOTES)),
            '{{id}}' => $insertId,
            '{{support_email}}' => $adminEmail,
        ];
        $htmlBody = strtr($htmlBody, $replacements);
    }

    $adminMailSent = false;
    $clientMailSent = false;
    $mailWarnings = [];

    $activeProfile = getenv('ACTIVE_SMTP_PROFILE') ?: '';
    if ($activeProfile) {
        $prefix = 'SMTP_' . strtoupper($activeProfile) . '_';
        $smtpHost = getenv($prefix . 'HOST') ?: getenv('SMTP_HOST');
        $smtpUser = getenv($prefix . 'USER') ?: getenv('SMTP_USER');
        $smtpPass = getenv($prefix . 'PASS') ?: getenv('SMTP_PASS');
        $smtpPort = getenv($prefix . 'PORT') ?: getenv('SMTP_PORT') ?: 587;
        $smtpSecure = getenv($prefix . 'SECURE') ?: getenv('SMTP_SECURE') ?: 'tls';
    } else {
        $smtpHost = getenv('SMTP_HOST');
        $smtpUser = getenv('SMTP_USER');
        $smtpPass = getenv('SMTP_PASS');
        $smtpPort = getenv('SMTP_PORT') ?: 587;
        $smtpSecure = getenv('SMTP_SECURE') ?: 'tls';
    }

    if ($smtpHost && class_exists('\PHPMailer\PHPMailer\PHPMailer')) {
        try {
            $adminMailer = new \PHPMailer\PHPMailer\PHPMailer(true);
            // Enable SMTP debug only when explicitly requested via environment (safe default: off)
            $enableSmtpDebug = getenv('ENABLE_SMTP_DEBUG') === '1';
            if ($enableSmtpDebug) {
                // write SMTP debug output to /tmp/php-smtp.log for troubleshooting
                $adminMailer->SMTPDebug = 2;
                $adminMailer->Debugoutput = function($str, $level) {
                    $line = date('c') . " [admin] [level=$level] " . trim($str) . "\n";
                    @file_put_contents('/tmp/php-smtp.log', $line, FILE_APPEND);
                };
            } else {
                $adminMailer->SMTPDebug = 0;
            }
            $adminMailer->isSMTP();
            $adminMailer->Host = $smtpHost;
            $adminMailer->SMTPAuth = true;
            $adminMailer->Username = $smtpUser;
            $adminMailer->Password = $smtpPass;
            $adminMailer->SMTPSecure = $smtpSecure;
            $adminMailer->Port = (int)$smtpPort;

            $adminMailer->setFrom($fromEmail, 'Website Contact');
            $adminMailer->addAddress($adminEmail);
            $adminMailer->addReplyTo($email);

            $adminMailer->Subject = "New contact message (#" . $insertId . ")";
            if ($htmlBody) {
                $adminMailer->isHTML(true);
                $adminMailer->Body = $htmlBody;
                $adminMailer->AltBody = $plain;
            } else {
                $adminMailer->Body = $plain;
                $adminMailer->AltBody = $plain;
            }
            $adminMailer->send();
            $adminMailSent = true;
        } catch (Exception $e) {
            $mailWarnings[] = 'PHPMailer admin error: ' . $e->getMessage();
            $adminMailSent = false;
        }

        try {
            $clientMailer = new \PHPMailer\PHPMailer\PHPMailer(true);
            if ($enableSmtpDebug) {
                $clientMailer->SMTPDebug = 2;
                $clientMailer->Debugoutput = function($str, $level) {
                    $line = date('c') . " [client] [level=$level] " . trim($str) . "\n";
                    @file_put_contents('/tmp/php-smtp.log', $line, FILE_APPEND);
                };
            } else {
                $clientMailer->SMTPDebug = 0;
            }
            $clientMailer->isSMTP();
            $clientMailer->Host = $smtpHost;
            $clientMailer->SMTPAuth = true;
            $clientMailer->Username = $smtpUser;
            $clientMailer->Password = $smtpPass;
            $clientMailer->SMTPSecure = $smtpSecure;
            $clientMailer->Port = (int)$smtpPort;

            $clientMailer->setFrom($fromEmail, 'GoodAV');
            $clientMailer->addAddress($email);
            $clientMailer->addReplyTo($adminEmail);

            $clientMailer->Subject = "Thanks — we received your message (#" . $insertId . ")";
            if ($htmlBody) {
                $clientMailer->isHTML(true);
                $clientMailer->Body = $htmlBody;
                $clientMailer->AltBody = $plain;
            } else {
                $clientMailer->Body = $plain;
                $clientMailer->AltBody = $plain;
            }
            $clientMailer->send();
            $clientMailSent = true;
        } catch (Exception $e) {
            $mailWarnings[] = 'PHPMailer client error: ' . $e->getMessage();
            $clientMailSent = false;
        }
    } else {
        $headersAdmin = "From: $fromEmail\r\n" .
                        "Reply-To: $email\r\n" .
                        "Content-Type: text/plain; charset=utf-8\r\n";
        try {
            $adminSent = @mail($adminEmail, "New contact message (#" . $insertId . ")", $plain, $headersAdmin);
            if ($adminSent) $adminMailSent = true; else { $mailWarnings[] = 'mail() admin send failed or no MTA configured'; $adminMailSent = false; }
        } catch (Exception $e) {
            $mailWarnings[] = 'mail() admin exception: ' . $e->getMessage();
            $adminMailSent = false;
        }

        $headersClient = "From: $fromEmail\r\n" .
                         "Reply-To: $adminEmail\r\n" .
                         "Content-Type: text/plain; charset=utf-8\r\n";
        try {
            $clientSent = @mail($email, "Thanks — we received your message (#" . $insertId . ")", $plain, $headersClient);
            if ($clientSent) $clientMailSent = true; else { $mailWarnings[] = 'mail() client send failed or no MTA configured'; $clientMailSent = false; }
        } catch (Exception $e) {
            $mailWarnings[] = 'mail() client exception: ' . $e->getMessage();
            $clientMailSent = false;
        }
    }

    $response = ['success' => true, 'id' => $insertId, 'admin_mail_sent' => $adminMailSent, 'client_mail_sent' => $clientMailSent];
    if (!($adminMailSent && $clientMailSent)) {
        $response['warning'] = 'Some emails failed to send';
        if (!empty($mailWarnings)) $response['warning_details'] = $mailWarnings;
        $response['note'] = 'Configure SMTP correctly (check ACTIVE_SMTP_PROFILE and profile credentials) for reliable email delivery.';
    }

    echo json_encode($response);
    exit;

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    exit;
}

?>
