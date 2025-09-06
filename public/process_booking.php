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

    // Also record into central submissions DB for unified access
    try {
        $subDb = new PDO('sqlite:' . __DIR__ . DIRECTORY_SEPARATOR . 'submissions.db');
        $subDb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $subDb->exec("CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source TEXT,
            payload TEXT,
            email TEXT,
            name TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
        $payloadJson = json_encode($data);
        $sstmt = $subDb->prepare("INSERT INTO submissions (source, payload, email, name) VALUES (:source, :payload, :email, :name)");
        $sstmt->execute([':source' => 'booking', ':payload' => $payloadJson, ':email' => $email, ':name' => $name]);
    } catch (Exception $e) {
        // non-fatal: continue even if central submissions DB fails
    }

    // Attempt to forward via email (send both admin notification and client confirmation)
    // Support comma-separated admin addresses and an ADMIN_FORWARD_EMAIL for guaranteed forwarding
    $adminEmailRaw = getenv('BOOKING_ADMIN_EMAIL') ?: 'admin@example.com';
    $adminForward = getenv('ADMIN_FORWARD_EMAIL') ?: '';
    $adminEmails = array_filter(array_map('trim', explode(',', $adminEmailRaw)));
    if ($adminForward) $adminEmails[] = $adminForward;
    // always include an internal copy if not already present
    $adminEmails[] = getenv('INQUIRIES_FROM_EMAIL') ?: 'info@goodav.net';
    // dedupe and normalize
    $adminEmails = array_values(array_unique(array_filter($adminEmails)));
    // main admin address used for Reply-To and support placeholders (first valid admin)
    $mainAdmin = !empty($adminEmails) ? $adminEmails[0] : (getenv('INQUIRIES_FROM_EMAIL') ?: 'info@goodav.net');
    $fromEmail = getenv('BOOKING_FROM_EMAIL') ?: 'noreply@example.com';

    // Prepare plain text and select html template based on booking type
    $type = isset($data['bookingType']) ? strtolower(trim($data['bookingType'])) : 'booking';

    $subjectAdmin = "New Consultation Booking (#" . $insertId . ")";
    $plainAdmin = "A new booking has been submitted:\n\n";
    $plainAdmin .= "Name: $name\n";
    $plainAdmin .= "Email: $email\n";
    $plainAdmin .= "Phone: $phone\n";
    $plainAdmin .= "Organization: $organization\n";
    $plainAdmin .= "Project: $project\n";
    $plainAdmin .= "Date: $date\n";
    $plainAdmin .= "Time: $time\n";
    $plainAdmin .= "Timezone: $timezone\n";
    $plainAdmin .= "Meeting Platform: $meetingSoftware\n";

    // Determine SMTP settings and email configuration early for template processing
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

    // Configure noreply setup for iCloud SMTP
    $noreplyEmail = getenv('NOREPLY_EMAIL') ?: 'noreply@goodav.net';
    $useNoreplyForFrom = getenv('USE_NOREPLY_FROM') === '1' || getenv('USE_NOREPLY_FROM') === 'true';
    
    // Set envelope sender to authenticated SMTP user (required for iCloud)
    $envelopeSender = $smtpUser ?: $fromEmail;
    
    // Determine visible FROM address based on noreply configuration
    if ($useNoreplyForFrom && $noreplyEmail) {
        $visibleFromEmail = $noreplyEmail;
    } else {
        $visibleFromEmail = $smtpUser ?: $fromEmail;
    }

    $templateFile = __DIR__ . '/emails/booking_confirmation.html';
    if ($type === 'consultation' || $type === 'free_consultation') {
        $templateFile = __DIR__ . '/emails/consultation_confirmation.html';
    }

    $htmlBodyClient = null;
    if (file_exists($templateFile)) {
        $htmlBodyClient = file_get_contents($templateFile);
        $brandLogoUrl = getenv('BRAND_LOGO_URL') ?: (getenv('SITE_URL') ? rtrim(getenv('SITE_URL'), '/') . '/favicon.ico' : '');
        $replacements = [
                '{{firstName}}' => htmlspecialchars(explode(' ', $name)[0] ?? $name, ENT_QUOTES),
                '{{lastName}}' => htmlspecialchars(explode(' ', $name)[1] ?? '', ENT_QUOTES),
                '{{name}}' => htmlspecialchars($name, ENT_QUOTES),
                '{{service}}' => htmlspecialchars($project, ENT_QUOTES),
                '{{date}}' => htmlspecialchars($date, ENT_QUOTES),
                '{{time}}' => htmlspecialchars($time, ENT_QUOTES),
                '{{location}}' => htmlspecialchars($meetingSoftware, ENT_QUOTES),
                '{{organization}}' => htmlspecialchars($organization, ENT_QUOTES),
                '{{description}}' => isset($data['description']) ? nl2br(htmlspecialchars($data['description'], ENT_QUOTES)) : (isset($data['notes']) ? nl2br(htmlspecialchars($data['notes'], ENT_QUOTES)) : ''),
                '{{id}}' => $insertId,
                '{{support_email}}' => $mainAdmin,
                '{{site_url}}' => getenv('SITE_URL') ?: '',
                '{{logo_url}}' => $brandLogoUrl,
                '{{from_email}}' => $visibleFromEmail,
            ];
        $htmlBodyClient = strtr($htmlBodyClient, $replacements);
    }

    $adminMailSent = false;
    $clientMailSent = false;
    $mailWarnings = [];

    $enableSmtpDebug = getenv('ENABLE_SMTP_DEBUG') === '1';

    if ($smtpHost && class_exists('\PHPMailer\PHPMailer\PHPMailer')) {
        // Send admin notification
        try {
            $adminMailer = new \PHPMailer\PHPMailer\PHPMailer(true);
            $adminMailer->CharSet = 'UTF-8';
            $adminMailer->SMTPDebug = $enableSmtpDebug ? 2 : 0;
            if ($enableSmtpDebug) {
                $adminMailer->Debugoutput = function($str, $level) { $line = date('c') . " [booking-admin] [level=$level] " . trim($str) . "\n"; @file_put_contents('/tmp/php-smtp.log', $line, FILE_APPEND); };
            }
            $adminMailer->isSMTP();
            $adminMailer->Host = $smtpHost;
            $adminMailer->SMTPAuth = true;
            $adminMailer->Username = $smtpUser;
            $adminMailer->Password = $smtpPass;
            $adminMailer->SMTPSecure = $smtpSecure;
            $adminMailer->Port = (int)$smtpPort;

            // Set visible FROM to noreply (if configured) with envelope sender as SMTP user
            $adminMailer->setFrom($visibleFromEmail, 'GoodAV Booking System');
            // Critical: Set envelope sender to authenticated SMTP user for iCloud compatibility
            if (!empty($envelopeSender)) {
                $adminMailer->Sender = $envelopeSender; // SMTP MAIL FROM envelope
            }
            // add each admin recipient
            foreach ($adminEmails as $addr) {
                if (filter_var($addr, FILTER_VALIDATE_EMAIL)) {
                    $adminMailer->addAddress($addr);
                }
            }
            // reply-to should point to the site support/main admin
            $adminMailer->addReplyTo($mainAdmin);
            // add explicit BCC for the forward address if present
            if (!empty($adminForward) && filter_var($adminForward, FILTER_VALIDATE_EMAIL)) {
                $adminMailer->addBCC($adminForward);
            }
            // Use admin HTML template when available
            $adminTemplate = __DIR__ . '/../server_emails/admin_booking.html';
            // fallback to public/emails if server_emails not present
            if (!file_exists($adminTemplate)) $adminTemplate = __DIR__ . '/emails/admin_booking.html';
            if (file_exists($adminTemplate)) {
                $admHtml = file_get_contents($adminTemplate);
                // If CssToInlineStyles is available, inline the CSS for email client compatibility
                if (class_exists('\TijsVerkoyen\CssToInlineStyles\CssToInlineStyles')) {
                    try {
                        $inliner = new \TijsVerkoyen\CssToInlineStyles\CssToInlineStyles();
                        $admHtml = $inliner->convert($admHtml);
                    } catch (Exception $e) {
                        // ignore inliner failure and use original HTML
                    }
                }
                $admRepl = [
                    '{{id}}' => $insertId,
                    '{{name}}' => htmlspecialchars($name, ENT_QUOTES),
                    '{{email}}' => htmlspecialchars($email, ENT_QUOTES),
                    '{{organization}}' => htmlspecialchars($organization, ENT_QUOTES),
                    '{{service}}' => htmlspecialchars($project, ENT_QUOTES),
                    '{{date}}' => htmlspecialchars($date, ENT_QUOTES),
                    '{{time}}' => htmlspecialchars($time, ENT_QUOTES),
                    '{{timezone}}' => htmlspecialchars($timezone, ENT_QUOTES),
                    '{{location}}' => htmlspecialchars($meetingSoftware, ENT_QUOTES),
                    '{{phone}}' => htmlspecialchars($phone, ENT_QUOTES),
                    '{{notes}}' => isset($data['notes']) ? nl2br(htmlspecialchars($data['notes'], ENT_QUOTES)) : '',
                    '{{description}}' => isset($data['description']) ? nl2br(htmlspecialchars($data['description'], ENT_QUOTES)) : (isset($data['notes']) ? nl2br(htmlspecialchars($data['notes'], ENT_QUOTES)) : ''),
                    '{{site_url}}' => getenv('SITE_URL') ?: '',
                    '{{from_email}}' => $visibleFromEmail,
                    '{{logo_url}}' => $brandLogoUrl,
                ];
                // deliverability helpers
                try { $adminMailer->addCustomHeader('List-Unsubscribe', '<mailto:' . ($mainAdmin ?: $visibleFromEmail) . '>'); } catch (Exception $e) {}
                try { $adminMailer->addCustomHeader('X-Entity-Ref-ID', 'booking-' . $insertId); } catch (Exception $e) {}
                try { $adminMailer->addCustomHeader('Feedback-ID', 'goodav.net:booking:' . $insertId); } catch (Exception $e) {}
                // set Message-ID domain if possible
                try { $adminMailer->MessageID = '<' . bin2hex(random_bytes(8)) . '@' . (getenv('EMAIL_DOMAIN') ?: 'goodav.net') . '>'; } catch (Exception $e) {}
                $adminMailer->isHTML(true);
                $adminMailer->Body = strtr($admHtml, $admRepl);
                $adminMailer->AltBody = $plainAdmin;
            } else {
                $adminMailer->Body = $plainAdmin;
                $adminMailer->AltBody = $plainAdmin;
            }
            $adminMailer->Subject = $subjectAdmin;
            $adminMailer->send();
            $adminMailSent = true;
        } catch (Exception $e) {
            $mailWarnings[] = 'PHPMailer admin error: ' . $e->getMessage();
            $adminMailSent = false;
        }

        // Send client confirmation
        try {
            $clientMailer = new \PHPMailer\PHPMailer\PHPMailer(true);
            $clientMailer->CharSet = 'UTF-8';
            $clientMailer->SMTPDebug = $enableSmtpDebug ? 2 : 0;
            if ($enableSmtpDebug) {
                $clientMailer->Debugoutput = function($str, $level) { $line = date('c') . " [booking-client] [level=$level] " . trim($str) . "\n"; @file_put_contents('/tmp/php-smtp.log', $line, FILE_APPEND); };
            }
            $clientMailer->isSMTP();
            $clientMailer->Host = $smtpHost;
            $clientMailer->SMTPAuth = true;
            $clientMailer->Username = $smtpUser;
            $clientMailer->Password = $smtpPass;
            $clientMailer->SMTPSecure = $smtpSecure;
            $clientMailer->Port = (int)$smtpPort;

            $clientMailer->setFrom($visibleFromEmail, 'GoodAV');
            if (!empty($envelopeSender)) $clientMailer->Sender = $envelopeSender;
            $clientMailer->addAddress($email);
            $clientMailer->addReplyTo($mainAdmin);

            $clientMailer->Subject = ($type === 'consultation' ? 'Your consultation request is received' : 'Your booking is confirmed') . " (#" . $insertId . ")";
            if ($htmlBodyClient) {
                // Inline client HTML if inliner available
                if (class_exists('\TijsVerkoyen\CssToInlineStyles\CssToInlineStyles')) {
                    try {
                        $inliner = new \TijsVerkoyen\CssToInlineStyles\CssToInlineStyles();
                        $htmlBodyClient = $inliner->convert($htmlBodyClient);
                    } catch (Exception $e) {
                        // fallback to original
                    }
                }
                $clientMailer->isHTML(true);
                $clientMailer->Body = $htmlBodyClient;
                $clientMailer->AltBody = $plainAdmin;
            } else {
                $clientMailer->Body = $plainAdmin;
                $clientMailer->AltBody = $plainAdmin;
            }
                // deliverability helpers for client message
                try { $clientMailer->addCustomHeader('X-Entity-Ref-ID', 'booking-client-' . $insertId); } catch (Exception $e) {}
                try { $clientMailer->addCustomHeader('Feedback-ID', 'goodav.net:booking:client:' . $insertId); } catch (Exception $e) {}
                try { $clientMailer->MessageID = '<' . bin2hex(random_bytes(8)) . '@' . (getenv('EMAIL_DOMAIN') ?: 'goodav.net') . '>'; } catch (Exception $e) {}
                $clientMailer->send();
            $clientMailSent = true;
        } catch (Exception $e) {
            $mailWarnings[] = 'PHPMailer client error: ' . $e->getMessage();
            $clientMailSent = false;
        }
        } else {
        // Fallback to mail() for admin and client (best-effort). Add Bcc header for forward if present.
        $bccHeader = '';
        if (!empty($adminForward) && filter_var($adminForward, FILTER_VALIDATE_EMAIL)) {
            $bccHeader = "Bcc: $adminForward\r\n";
        }
        $headersAdmin = "From: $visibleFromEmail\r\n" .
                        "Reply-To: $email\r\n" .
                        $bccHeader .
                        "Content-Type: text/plain; charset=utf-8\r\n";
        try {
            // send to all admin addresses
            foreach ($adminEmails as $addr) {
                if (!filter_var($addr, FILTER_VALIDATE_EMAIL)) continue;
                $adminSent = @mail($addr, $subjectAdmin, $plainAdmin, $headersAdmin);
                if ($adminSent) $adminMailSent = true;
            }
            if (!$adminMailSent) { $mailWarnings[] = 'mail() admin send failed or no MTA configured'; $adminMailSent = false; }
        } catch (Exception $e) {
            $mailWarnings[] = 'mail() admin exception: ' . $e->getMessage();
            $adminMailSent = false;
        }

        $headersClient = "From: $visibleFromEmail\r\n" .
                         "Reply-To: " . (!empty($adminEmails[0]) ? $adminEmails[0] : $visibleFromEmail) . "\r\n" .
                         "Content-Type: text/plain; charset=utf-8\r\n";
        try {
            $clientSent = @mail($email, ($type === 'consultation' ? 'Your consultation request is received' : 'Your booking is confirmed') . " (#" . $insertId . ")", $plainAdmin, $headersClient);
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
