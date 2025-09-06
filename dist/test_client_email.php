<?php
// Simple client email test
require_once __DIR__ . '/../vendor/autoload.php';

header('Content-Type: application/json');

// Test sending only to client email
$clientEmail = 'testclient@example.com';
$smtpHost = 'smtp.mail.me.com';
$smtpUser = 'hakizimanayoussouf@icloud.com';
$smtpPass = getenv('SMTP_PASS');
$smtpPort = 587;
$smtpSecure = 'tls';

try {
    $clientMailer = new \PHPMailer\PHPMailer\PHPMailer(true);
    $clientMailer->SMTPDebug = 2; // Enable debug
    $clientMailer->Debugoutput = function($str, $level) { 
        $line = date('c') . " [CLIENT-TEST] [level=$level] " . trim($str) . "\n"; 
        file_put_contents('/tmp/client-smtp.log', $line, FILE_APPEND); 
        echo $line;
    };
    
    $clientMailer->isSMTP();
    $clientMailer->Host = $smtpHost;
    $clientMailer->SMTPAuth = true;
    $clientMailer->Username = $smtpUser;
    $clientMailer->Password = $smtpPass;
    $clientMailer->SMTPSecure = $smtpSecure;
    $clientMailer->Port = (int)$smtpPort;

    // Use noreply as FROM
    $clientMailer->setFrom('noreply@goodav.net', 'GoodAV Test');
    $clientMailer->Sender = $smtpUser; // Envelope sender
    
    $clientMailer->addAddress($clientEmail);
    $clientMailer->addReplyTo('info@goodav.net');

    $clientMailer->Subject = 'Client Email Test - ' . date('Y-m-d H:i:s');
    $clientMailer->Body = "
        <h2>Client Email Test</h2>
        <p>This is a test to verify client email delivery works.</p>
        <p><strong>Test Time:</strong> " . date('Y-m-d H:i:s') . "</p>
        <p><strong>Client Email:</strong> $clientEmail</p>
        <p>If you receive this, client email delivery is working!</p>
    ";
    $clientMailer->isHTML(true);

    $clientMailer->send();
    
    echo json_encode([
        'success' => true,
        'message' => 'Client email sent successfully',
        'client_email' => $clientEmail,
        'log_file' => '/tmp/client-smtp.log'
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'client_email' => $clientEmail,
        'log_file' => '/tmp/client-smtp.log'
    ]);
}
?>
