<?php
// Test noreply email configuration with iCloud SMTP
// This tests if noreply@goodav.net works as an alias/forward

// Load autoload if available
$autoload = __DIR__ . '/../vendor/autoload.php';
if (file_exists($autoload)) {
    require_once $autoload;
}

header('Content-Type: application/json');

// Test email configuration
$testRecipient = 'hakizimanayoussouf@icloud.com'; // Test recipient
$smtpHost = 'smtp.mail.me.com';
$smtpUser = 'hakizimanayoussouf@icloud.com';
$smtpPass = getenv('SMTP_PASS'); // Your iCloud app password
$smtpPort = 587;
$smtpSecure = 'tls';

// Test both configurations
$tests = [
    [
        'name' => 'SMTP User as FROM (Current Working)',
        'from_email' => $smtpUser,
        'from_name' => 'GoodAV Test'
    ],
    [
        'name' => 'Noreply as FROM with SMTP User as Envelope',
        'from_email' => 'noreply@goodav.net',
        'from_name' => 'GoodAV Noreply Test'
    ]
];

$results = [];

if (class_exists('\PHPMailer\PHPMailer\PHPMailer')) {
    foreach ($tests as $test) {
        try {
            $mailer = new \PHPMailer\PHPMailer\PHPMailer(true);
            $mailer->SMTPDebug = 0; // No debug output for clean results
            $mailer->isSMTP();
            $mailer->Host = $smtpHost;
            $mailer->SMTPAuth = true;
            $mailer->Username = $smtpUser;
            $mailer->Password = $smtpPass;
            $mailer->SMTPSecure = $smtpSecure;
            $mailer->Port = $smtpPort;

            // Set visible FROM
            $mailer->setFrom($test['from_email'], $test['from_name']);
            // Always set envelope sender to authenticated SMTP user
            $mailer->Sender = $smtpUser;
            
            $mailer->addAddress($testRecipient);
            $mailer->addReplyTo('info@goodav.net');

            $mailer->Subject = 'Noreply Test: ' . $test['name'];
            $mailer->Body = "
                <h3>Email Configuration Test</h3>
                <p><strong>Test:</strong> {$test['name']}</p>
                <p><strong>Visible FROM:</strong> {$test['from_email']}</p>
                <p><strong>Envelope Sender:</strong> {$smtpUser}</p>
                <p><strong>Time:</strong> " . date('Y-m-d H:i:s') . "</p>
                <p>If you receive this email, the configuration is working!</p>
            ";
            $mailer->isHTML(true);

            $mailer->send();
            $results[] = [
                'test' => $test['name'],
                'status' => 'SUCCESS',
                'from_email' => $test['from_email'],
                'envelope_sender' => $smtpUser
            ];
        } catch (Exception $e) {
            $results[] = [
                'test' => $test['name'],
                'status' => 'FAILED',
                'error' => $e->getMessage(),
                'from_email' => $test['from_email'],
                'envelope_sender' => $smtpUser
            ];
        }
    }
} else {
    $results[] = [
        'error' => 'PHPMailer not available'
    ];
}

echo json_encode([
    'timestamp' => date('Y-m-d H:i:s'),
    'tests' => $results,
    'note' => 'Check if noreply@goodav.net is configured as an alias/forward in your iCloud email settings'
], JSON_PRETTY_PRINT);
?>
