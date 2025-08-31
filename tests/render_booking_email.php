<?php
// Minimal test to render booking admin and client emails (no SMTP send).
// Writes inlined HTML to tests/email_output/ and prints the file paths.

$root = __DIR__ . '/..';
$vendor = $root . '/vendor/autoload.php';
if (file_exists($vendor)) require_once $vendor;

// sample booking data
$data = [
    'name' => 'Jane Doe',
    'email' => 'jane.doe@example.com',
    'organization' => 'Example Co',
    'project' => 'Event AV Support',
    'date' => '2025-09-15',
    'time' => '14:00',
    'timezone' => 'UTC',
    'meetingSoftware' => 'Zoom',
    'phone' => '+1234567890',
    'notes' => "Please discuss live-mixing and stage lighting options.",
    'bookingType' => 'booking'
];

$insertId = rand(1000,9999);

// helper to resolve logo_url
$logoUrl = getenv('LOGO_URL') ?: (getenv('SITE_URL') ? rtrim(getenv('SITE_URL'), '/') . '/favicon.ico' : 'https://via.placeholder.com/120x40?text=GoodAV');

// client template selection
$rootPublic = $root . '/public';
$templateFile = $rootPublic . '/emails/booking_confirmation.html';
if (in_array(strtolower($data['bookingType']), ['consultation','free_consultation'])) {
    $templateFile = $rootPublic . '/emails/consultation_confirmation.html';
}

$clientHtml = null;
if (file_exists($templateFile)) {
    $clientHtml = file_get_contents($templateFile);
    $replacements = [
        '{{firstName}}' => htmlspecialchars(explode(' ', $data['name'])[0] ?? $data['name'], ENT_QUOTES),
        '{{lastName}}' => htmlspecialchars(explode(' ', $data['name'])[1] ?? '', ENT_QUOTES),
        '{{service}}' => htmlspecialchars($data['project'], ENT_QUOTES),
        '{{date}}' => htmlspecialchars($data['date'], ENT_QUOTES),
        '{{time}}' => htmlspecialchars($data['time'], ENT_QUOTES),
        '{{location}}' => htmlspecialchars($data['meetingSoftware'], ENT_QUOTES),
        '{{id}}' => $insertId,
        '{{support_email}}' => 'info@goodav.net',
        '{{site_url}}' => getenv('SITE_URL') ?: '',
        '{{logo_url}}' => $logoUrl,
        '{{from_email}}' => 'noreply@goodav.net',
    ];
    $clientHtml = strtr($clientHtml, $replacements);
}

// admin template (server_emails preferred)
$adminTemplate = $root . '/server_emails/admin_booking.html';
if (!file_exists($adminTemplate)) $adminTemplate = $rootPublic . '/emails/admin_booking.html';
$adminHtml = null;
if (file_exists($adminTemplate)) {
    $adminHtml = file_get_contents($adminTemplate);
    $admRepl = [
        '{{id}}' => $insertId,
        '{{name}}' => htmlspecialchars($data['name'], ENT_QUOTES),
        '{{email}}' => htmlspecialchars($data['email'], ENT_QUOTES),
        '{{organization}}' => htmlspecialchars($data['organization'], ENT_QUOTES),
        '{{service}}' => htmlspecialchars($data['project'], ENT_QUOTES),
        '{{date}}' => htmlspecialchars($data['date'], ENT_QUOTES),
        '{{time}}' => htmlspecialchars($data['time'], ENT_QUOTES),
        '{{timezone}}' => htmlspecialchars($data['timezone'], ENT_QUOTES),
        '{{location}}' => htmlspecialchars($data['meetingSoftware'], ENT_QUOTES),
        '{{phone}}' => htmlspecialchars($data['phone'], ENT_QUOTES),
        '{{notes}}' => nl2br(htmlspecialchars($data['notes'], ENT_QUOTES)),
        '{{site_url}}' => getenv('SITE_URL') ?: '',
        '{{from_email}}' => 'noreply@goodav.net',
        '{{logo_url}}' => $logoUrl,
    ];
    $adminHtml = strtr($adminHtml, $admRepl);
}

// Inline CSS if CssToInlineStyles is available
$inlinerUsed = false;
if (class_exists('\TijsVerkoyen\CssToInlineStyles\CssToInlineStyles')) {
    try {
        $inliner = new \TijsVerkoyen\CssToInlineStyles\CssToInlineStyles();
        if ($clientHtml) $clientHtml = $inliner->convert($clientHtml);
        if ($adminHtml) $adminHtml = $inliner->convert($adminHtml);
        $inlinerUsed = true;
    } catch (Exception $e) {
        // ignore
    }
}

// write outputs
$outDir = $root . '/tests/email_output';
if (!is_dir($outDir)) @mkdir($outDir, 0777, true);
$adminOut = $outDir . '/admin_booking_inlined.html';
$clientOut = $outDir . '/client_booking_inlined.html';
if ($adminHtml) file_put_contents($adminOut, $adminHtml);
if ($clientHtml) file_put_contents($clientOut, $clientHtml);

echo "Rendered files:\n";
if ($adminHtml) echo "$adminOut\n";
else echo "Admin template not found: $adminTemplate\n";
if ($clientHtml) echo "$clientOut\n";
else echo "Client template not found: $templateFile\n";

echo "Inliner used: " . ($inlinerUsed ? 'yes' : 'no') . "\n";

// Also print a short snippet of each render to stdout for quick inspection
if ($adminHtml) {
    echo "\n--- admin snippet ---\n";
    echo substr(preg_replace('/\s+/', ' ', strip_tags($adminHtml)), 0, 500) . "\n";
}
if ($clientHtml) {
    echo "\n--- client snippet ---\n";
    echo substr(preg_replace('/\s+/', ' ', strip_tags($clientHtml)), 0, 500) . "\n";
}

?>
