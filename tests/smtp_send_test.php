<?php
// tests/smtp_send_test.php
// Simple SMTP send test using PHPMailer and environment variables.

$root = __DIR__ . '/..';
$autoload = $root . '/vendor/autoload.php';
if (!file_exists($autoload)) {
    echo "Vendor autoload not found; run composer install\n";
    exit(1);
}
require_once $autoload;

// Resolve active profile
$active = getenv('ACTIVE_SMTP_PROFILE') ?: '';
$host = getenv('SMTP_HOST');
$user = getenv('SMTP_USER');
$pass = getenv('SMTP_PASS');
$port = getenv('SMTP_PORT');
$secure = getenv('SMTP_SECURE');

if ($active) {
    $pref = 'SMTP_' . strtoupper($active) . '_';
    $pHost = getenv($pref . 'HOST');
    if ($pHost) $host = $pHost;
    $pUser = getenv($pref . 'USER'); if ($pUser) $user = $pUser;
    $pPass = getenv($pref . 'PASS'); if ($pPass) $pass = $pPass;
    $pPort = getenv($pref . 'PORT'); if ($pPort) $port = $pPort;
    $pSecure = getenv($pref . 'SECURE'); if ($pSecure) $secure = $pSecure;
}

// Visible From (what recipients see)
$from = getenv('BOOKING_FROM_EMAIL') ?: getenv('INQUIRIES_FROM_EMAIL') ?: 'noreply@example.com';

// Determine SMTP auth user and envelope Sender. If using iCloud, authenticate as the iCloud account
$sender = null;
if ($active) {
    $pref = 'SMTP_' . strtoupper($active) . '_';
    $pHost = getenv($pref . 'HOST');
    if ($pHost) $host = $pHost;
    $pUser = getenv($pref . 'USER'); if ($pUser) $user = $pUser;
    $pPass = getenv($pref . 'PASS'); if ($pPass) $pass = $pPass;
    $pPort = getenv($pref . 'PORT'); if ($pPort) $port = $pPort;
    $pSecure = getenv($pref . 'SECURE'); if ($pSecure) $secure = $pSecure;

    // For iCloud, set the envelope Sender to the authenticated iCloud user to satisfy provider checks
    if (strtoupper($active) === 'ICLOUD1') {
        $icloudUser = getenv('SMTP_ICLOUD1_USER');
        if ($icloudUser) $sender = $icloudUser;
    }
}
$toAdminRaw = getenv('BOOKING_ADMIN_EMAIL') ?: '';
$adminForward = getenv('ADMIN_FORWARD_EMAIL') ?: '';

$adminRecipients = [];
if ($toAdminRaw) {
    $parts = array_map('trim', explode(',', $toAdminRaw));
    foreach ($parts as $p) if ($p) $adminRecipients[] = $p;
}
if ($adminForward) $adminRecipients[] = $adminForward;

$adminRecipients = array_values(array_unique($adminRecipients));

if (!$host || !$user || !$pass) {
    echo "SMTP settings incomplete. host/user/pass required.\n";
    echo "Resolved settings: host={$host}, user={$user}, port={$port}, secure={$secure}\n";
    exit(1);
}

$mail = new PHPMailer\PHPMailer\PHPMailer(true);
$enableDebug = getenv('ENABLE_SMTP_DEBUG') === '1';
$mail->SMTPDebug = $enableDebug ? 2 : 0;
if ($enableDebug) {
    $mail->Debugoutput = function($str, $level) {
        $line = date('c') . " [smtp-test] [level=$level] " . trim($str) . "\n";
        echo $line;
        @file_put_contents('/tmp/php-smtp.log', $line, FILE_APPEND);
    };
}

try {
    $mail->isSMTP();
    $mail->Host = $host;
    $mail->SMTPAuth = true;
    $mail->Username = $user;
    $mail->Password = $pass;
    $mail->SMTPSecure = $secure ?: 'tls';
    $mail->Port = (int)($port ?: 587);

    $mail->setFrom($from, 'GoodAV Test');
    // Add first admin recipient for test
    if (count($adminRecipients) === 0) {
        echo "No admin recipients configured (BOOKING_ADMIN_EMAIL or ADMIN_FORWARD_EMAIL).\n";
        exit(1);
    }
    foreach ($adminRecipients as $addr) {
        if (filter_var($addr, FILTER_VALIDATE_EMAIL)) {
            $mail->addAddress($addr);
        }
    }

    $mail->addReplyTo($user);
    $mail->isHTML(true);
    $mail->Subject = 'GoodAV SMTP test — ' . date('c');
    $mail->Body = '<h1>SMTP test</h1><p>This is a test message sent by tests/smtp_send_test.php</p>';
    $mail->AltBody = 'SMTP test — plain text fallback';

    $sent = $mail->send();
    echo "Send result: " . ($sent ? 'success' : 'failure') . "\n";
} catch (Exception $e) {
    echo "PHPMailer exception: " . $e->getMessage() . "\n";
    exit(1);
}

?>
