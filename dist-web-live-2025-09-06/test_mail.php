<?php
// test_mail.php - simple script to test SMTP sending via PHPMailer
require_once __DIR__ . '/../vendor/autoload.php';

header('Content-Type: text/plain; charset=utf-8');

$smtpHost = getenv('SMTP_HOST');
$smtpUser = getenv('SMTP_USER');
$smtpPass = getenv('SMTP_PASS');
$smtpPort = getenv('SMTP_PORT') ?: 587;
$fromEmail = getenv('BOOKING_FROM_EMAIL') ?: 'noreply@example.com';
$to = getenv('BOOKING_ADMIN_EMAIL') ?: 'admin@example.com';

if (!$smtpHost || !$smtpUser || !$smtpPass) {
    echo "SMTP vars not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS.\n";
    exit;
}

try {
    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = getenv('SMTP_SECURE') ?: 'tls';
    $mail->Port = (int)$smtpPort;

    $mail->setFrom($fromEmail, 'Booking Test');
    $mail->addAddress($to);
    $mail->Subject = 'Test SMTP message';
    $mail->Body = "This is a test message from Booking system.";

    $mail->send();
    echo "Mail sent successfully to $to\n";
} catch (Exception $e) {
    echo "Mail failed: " . $e->getMessage() . "\n";
}
