<?php
// process_project.php
// Receives JSON project request data, validates, stores in MySQL, and attempts to forward via email.

header('Content-Type: application/json; charset=utf-8');

// Allow CORS from localhost dev servers during development
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

// --- Dev helper: load .env into getenv()/putenv() when running under PHP built-in server
$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) continue;
        if (!strpos($line, '=')) continue;
        list($k, $v) = explode('=', $line, 2);
        $k = trim($k);
        $v = trim($v);
        // strip surrounding quotes
        if ((substr($v,0,1) === '"' && substr($v,-1) === '"') || (substr($v,0,1) === "'" && substr($v,-1) === "'")) {
            $v = substr($v,1,-1);
        }
        if (getenv($k) === false) {
            putenv("$k=$v");
            $_ENV[$k] = $v;
            $_SERVER[$k] = $v;
        }
    }
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || !is_array($data)) {
    echo json_encode(['success' => false, 'error' => 'Invalid JSON payload']);
    exit;
}

// Basic validation
$required = ['name', 'email', 'organization', 'projectType', 'description'];
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

// Honeypot check
if (!empty($data['hp_field'])) {
    echo json_encode(['success' => false, 'error' => 'Spam detected']);
    exit;
}

// Simple rate limiting: max 5 submissions per IP per 60 seconds
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

// Sanitize values
$name = trim($data['name']);
$email = trim($data['email']);
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$organization = trim($data['organization']);
$projectType = trim($data['projectType']);
$budget = isset($data['budget']) ? trim($data['budget']) : '';
$timeline = isset($data['timeline']) ? trim($data['timeline']) : '';
$description = trim($data['description']);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=goodav_db;charset=utf8mb4', 'goodav_rw', 'xocgyg-tawhub-Junqy9');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        organization VARCHAR(255),
        project_type VARCHAR(100),
        budget VARCHAR(100),
        timeline VARCHAR(100),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    $stmt = $pdo->prepare("INSERT INTO projects (name, email, phone, organization, project_type, budget, timeline, description) VALUES (:name, :email, :phone, :organization, :project_type, :budget, :timeline, :description)");
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':organization' => $organization,
        ':project_type' => $projectType,
        ':budget' => $budget,
        ':timeline' => $timeline,
        ':description' => $description
    ]);

    $insertId = $pdo->lastInsertId();

    // record into central submissions DB
    try {
        $subDb = new PDO('mysql:host=localhost;dbname=goodav_db;charset=utf8mb4', 'goodav_rw', 'xocgyg-tawhub-Junqy9');
        $subDb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $subDb->exec("CREATE TABLE IF NOT EXISTS submissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            source VARCHAR(50),
            payload TEXT,
            email VARCHAR(255),
            name VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )");
        $payloadJson = json_encode($data);
        $sstmt = $subDb->prepare("INSERT INTO submissions (source, payload, email, name) VALUES (:source, :payload, :email, :name)");
        $sstmt->execute([':source' => 'project', ':payload' => $payloadJson, ':email' => $email, ':name' => $name]);
    } catch (Exception $e) {
        // non-fatal
    }

    // Attempt to forward via email
    // Support comma-separated admin addresses and ADMIN_FORWARD_EMAIL forwarding
    $adminEmailRaw = getenv('PROJECT_ADMIN_EMAIL') ?: (getenv('BOOKING_ADMIN_EMAIL') ?: 'admin@example.com');
    $adminForward = getenv('ADMIN_FORWARD_EMAIL') ?: '';
    $adminEmails = array_filter(array_map('trim', explode(',', $adminEmailRaw)));
    if ($adminForward) $adminEmails[] = $adminForward;
    $adminEmails[] = getenv('INQUIRIES_FROM_EMAIL') ?: 'info@goodav.net';
    $adminEmails = array_values(array_unique(array_filter($adminEmails)));
    $mainAdmin = !empty($adminEmails) ? $adminEmails[0] : (getenv('INQUIRIES_FROM_EMAIL') ?: 'info@goodav.net');
    $fromEmail = getenv('PROJECT_FROM_EMAIL') ?: (getenv('BOOKING_FROM_EMAIL') ?: 'noreply@example.com');

    $subject = "New Project Request (#" . $insertId . ")";
    $plain = "A new project request has been submitted:\n\n";
    $plain .= "Name: $name\n";
    $plain .= "Email: $email\n";
    $plain .= "Phone: $phone\n";
    $plain .= "Organization: $organization\n";
    $plain .= "Project Type: $projectType\n";
    $plain .= "Budget: $budget\n";
    $plain .= "Timeline: $timeline\n";
    $plain .= "Description:\n$description\n";

    // Prepare HTML template for user confirmation (if available)
    $templatePath = __DIR__ . '/emails/project_confirmation.html';
    $htmlBody = null;
    if (file_exists($templatePath)) {
        $htmlBody = file_get_contents($templatePath);
        $siteUrl = getenv('SITE_URL') ?: 'https://goodav.net';
        $brandLogoUrl = getenv('BRAND_LOGO_URL') ?: ($siteUrl . '/favicon.ico');
        $supportEmail = getenv('PROJECT_ADMIN_EMAIL') ?: $mainAdmin;
        $fromEmailRaw = getenv('PROJECT_FROM_EMAIL') ?: $fromEmail;

        $replacements = [
            '{{name}}' => htmlspecialchars($name, ENT_QUOTES),
            '{{project_type}}' => htmlspecialchars($projectType, ENT_QUOTES),
            '{{organization}}' => htmlspecialchars($organization, ENT_QUOTES),
            '{{budget}}' => htmlspecialchars($budget, ENT_QUOTES),
            '{{timeline}}' => htmlspecialchars($timeline, ENT_QUOTES),
            '{{description}}' => nl2br(htmlspecialchars($description, ENT_QUOTES)),
            '{{id}}' => $insertId,
            '{{support_email}}' => $supportEmail,
            '{{from_email}}' => $fromEmailRaw,
            '{{site_url}}' => $siteUrl,
            '{{logo_url}}' => $brandLogoUrl,
        ];
        $htmlBody = strtr($htmlBody, $replacements);
    }

    $adminMailSent = false;
    $clientMailSent = false;
    $mailWarnings = [];

    // Allow selecting an active SMTP profile via ACTIVE_SMTP_PROFILE (e.g., GMAIL1, ICLOUD2)
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

    $envelopeSender = $smtpUser ?: $fromEmail;

    if ($smtpHost && class_exists('\PHPMailer\PHPMailer\PHPMailer')) {
        // Send admin notification
        try {
            $adminMailer = new \PHPMailer\PHPMailer\PHPMailer(true);
            $adminMailer->CharSet = 'UTF-8';
            $adminMailer->isSMTP();
            $adminMailer->Host = $smtpHost;
            $adminMailer->SMTPAuth = true;
            $adminMailer->Username = $smtpUser;
            $adminMailer->Password = $smtpPass;
            $adminMailer->SMTPSecure = $smtpSecure;
            $adminMailer->Port = (int)$smtpPort;

            $adminMailer->setFrom($fromEmail, 'Project Requests');
            if (!empty($envelopeSender)) $adminMailer->Sender = $envelopeSender;
            foreach ($adminEmails as $addr) {
                if (filter_var($addr, FILTER_VALIDATE_EMAIL)) {
                    $adminMailer->addAddress($addr);
                }
            }
            $adminMailer->addReplyTo($mainAdmin);
            if (!empty($adminForward) && filter_var($adminForward, FILTER_VALIDATE_EMAIL)) {
                $adminMailer->addBCC($adminForward);
            }

            // use admin template when available
            $adminTemplate = __DIR__ . '/../server_emails/admin_project.html';
            if (!file_exists($adminTemplate)) $adminTemplate = __DIR__ . '/emails/admin_project.html';
            if (file_exists($adminTemplate)) {
                $admHtml = file_get_contents($adminTemplate);
                if (class_exists('\TijsVerkoyen\CssToInlineStyles\CssToInlineStyles')) {
                    try {
                        $inliner = new \TijsVerkoyen\CssToInlineStyles\CssToInlineStyles();
                        $admHtml = $inliner->convert($admHtml);
                    } catch (Exception $e) {
                        // ignore
                    }
                }
                $admRepl = [
                    '{{id}}' => $insertId,
                    '{{name}}' => htmlspecialchars($name, ENT_QUOTES),
                    '{{email}}' => htmlspecialchars($email, ENT_QUOTES),
                    '{{project_type}}' => htmlspecialchars($projectType, ENT_QUOTES),
                    '{{organization}}' => htmlspecialchars($organization, ENT_QUOTES),
                    '{{budget}}' => htmlspecialchars($budget, ENT_QUOTES),
                    '{{timeline}}' => htmlspecialchars($timeline, ENT_QUOTES),
                    '{{description}}' => nl2br(htmlspecialchars($description, ENT_QUOTES)),
                    '{{site_url}}' => getenv('SITE_URL') ?: '',
                    '{{from_email}}' => $fromEmail,
                    '{{logo_url}}' => getenv('BRAND_LOGO_URL') ?: (getenv('SITE_URL') ? rtrim(getenv('SITE_URL'), '/') . '/favicon.ico' : ''),
                ];
                $adminMailer->isHTML(true);
                $adminMailer->Body = strtr($admHtml, $admRepl);
                $adminMailer->AltBody = $plain;
                try { $adminMailer->addCustomHeader('List-Unsubscribe', '<mailto:' . ($mainAdmin ?: $fromEmail) . '>'); } catch (Exception $e) {}
                try { $adminMailer->addCustomHeader('X-Entity-Ref-ID', 'project-' . $insertId); } catch (Exception $e) {}
                try { $adminMailer->addCustomHeader('Feedback-ID', 'goodav.net:project:' . $insertId); } catch (Exception $e) {}
                try { $adminMailer->MessageID = '<' . bin2hex(random_bytes(8)) . '@' . (getenv('EMAIL_DOMAIN') ?: 'goodav.net') . '>'; } catch (Exception $e) {}
            } else {
                $adminMailer->Body = $plain;
                $adminMailer->AltBody = $plain;
            }
            $adminMailer->Subject = $subject;
            $adminMailer->send();
            $adminMailSent = true;
        } catch (Exception $e) {
            $mailWarnings[] = 'PHPMailer admin error: ' . $e->getMessage();
            $adminMailSent = false;
        }

        // Send client confirmation (separate message)
        try {
            $clientMailer = new \PHPMailer\PHPMailer\PHPMailer(true);
            $clientMailer->CharSet = 'UTF-8';
            $clientMailer->isSMTP();
            $clientMailer->Host = $smtpHost;
            $clientMailer->SMTPAuth = true;
            $clientMailer->Username = $smtpUser;
            $clientMailer->Password = $smtpPass;
            $clientMailer->SMTPSecure = $smtpSecure;
            $clientMailer->Port = (int)$smtpPort;

            $clientMailer->setFrom($fromEmail, 'GoodAV');
            if (!empty($envelopeSender)) $clientMailer->Sender = $envelopeSender;
            $clientMailer->addAddress($email);
            $clientMailer->addReplyTo($mainAdmin);

            $clientMailer->Subject = "Thanks — we received your request (#" . $insertId . ")";
            if ($htmlBody) {
                if (class_exists('\TijsVerkoyen\CssToInlineStyles\CssToInlineStyles')) {
                    try {
                        $inliner = new \TijsVerkoyen\CssToInlineStyles\CssToInlineStyles();
                        $htmlBody = $inliner->convert($htmlBody);
                    } catch (Exception $e) {
                        // ignore
                    }
                }
                $clientMailer->isHTML(true);
                $clientMailer->Body = $htmlBody;
                $clientMailer->AltBody = $plain;
            } else {
                $clientMailer->Body = $plain;
                $clientMailer->AltBody = $plain;
            }
            try { $clientMailer->addCustomHeader('X-Entity-Ref-ID', 'project-client-' . $insertId); } catch (Exception $e) {}
            try { $clientMailer->addCustomHeader('Feedback-ID', 'goodav.net:project:client:' . $insertId); } catch (Exception $e) {}
            try { $clientMailer->MessageID = '<' . bin2hex(random_bytes(8)) . '@' . (getenv('EMAIL_DOMAIN') ?: 'goodav.net') . '>'; } catch (Exception $e) {}
            $clientMailer->send();
            $clientMailSent = true;
        } catch (Exception $e) {
            $mailWarnings[] = 'PHPMailer client error: ' . $e->getMessage();
            $clientMailSent = false;
        }
        } else {
        // Fallback to mail() for admin. Add Bcc header for forward if present.
        $bccHeader = '';
        if (!empty($adminForward) && filter_var($adminForward, FILTER_VALIDATE_EMAIL)) {
            $bccHeader = "Bcc: $adminForward\r\n";
        }
        $headersAdmin = "From: $fromEmail\r\n" .
                        "Reply-To: $email\r\n" .
                        $bccHeader .
                        "Content-Type: text/plain; charset=utf-8\r\n";
        try {
            foreach ($adminEmails as $addr) {
                if (!filter_var($addr, FILTER_VALIDATE_EMAIL)) continue;
                $adminSent = @mail($addr, $subject, $plain, $headersAdmin);
                if ($adminSent) $adminMailSent = true;
            }
            if (!$adminMailSent) { $mailWarnings[] = 'mail() admin send failed or no MTA configured'; $adminMailSent = false; }
        } catch (Exception $e) {
            $mailWarnings[] = 'mail() admin exception: ' . $e->getMessage();
            $adminMailSent = false;
        }

        // Fallback to mail() for client confirmation
        $clientSubject = "Thanks — we received your request (#" . $insertId . ")";
        $headersClient = "From: $fromEmail\r\n" .
                         "Reply-To: " . (!empty($adminEmails[0]) ? $adminEmails[0] : $fromEmail) . "\r\n" .
                         "Content-Type: text/plain; charset=utf-8\r\n";
        try {
            $clientSent = @mail($email, $clientSubject, $plain, $headersClient);
            if ($clientSent) {
                $clientMailSent = true;
            } else {
                $mailWarnings[] = 'mail() client send failed or no MTA configured';
                $clientMailSent = false;
            }
        } catch (Exception $e) {
            $mailWarnings[] = 'mail() client exception: ' . $e->getMessage();
            $clientMailSent = false;
        }
    }

    $response = ['success' => true, 'id' => $insertId, 'admin_mail_sent' => $adminMailSent, 'client_mail_sent' => $clientMailSent];
    if (!($adminMailSent && $clientMailSent)) {
        $response['warning'] = 'Some emails failed to send';
        if (!empty($mailWarnings)) {
            $response['warning_details'] = $mailWarnings;
        }
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
