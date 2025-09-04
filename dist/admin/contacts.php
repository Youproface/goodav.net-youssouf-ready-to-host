<?php
// admin/contacts.php — protected admin viewer for contacts.db with CSV export

// Basic protection: HTTP Basic auth using ADMIN_USER/ADMIN_PASS or token via ?token=
session_start();

$envAdminUser = getenv('ADMIN_USER') ?: 'admin';
$envAdminPass = getenv('ADMIN_PASS') ?: 'admin';
$envAdminToken = getenv('ADMIN_TOKEN') ?: '';

// token check
if (!empty($envAdminToken) && isset($_GET['token']) && $_GET['token'] === $envAdminToken) {
    // allowed via token
} else {
    // HTTP Basic auth
    if (!isset($_SERVER['PHP_AUTH_USER'])) {
        header('WWW-Authenticate: Basic realm="Contacts Admin"');
        header('HTTP/1.0 401 Unauthorized');
        echo 'Authentication required.';
        exit;
    } else {
        if (!hash_equals($envAdminUser, $_SERVER['PHP_AUTH_USER']) || !hash_equals($envAdminPass, $_SERVER['PHP_AUTH_PW'])) {
            header('HTTP/1.0 403 Forbidden');
            echo 'Forbidden';
            exit;
        }
    }
}

$dbFile = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'contacts.db';
if (!file_exists($dbFile)) {
    echo "No contacts database found at: $dbFile";
    exit;
}

try {
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query('SELECT id, first_name, last_name, email, subject, message, created_at FROM contacts ORDER BY created_at DESC');
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (isset($_GET['export']) && $_GET['export'] === 'csv') {
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="contacts-export-' . date('Ymd-His') . '.csv"');
        $out = fopen('php://output', 'w');
        fputcsv($out, ['id','first_name','last_name','email','subject','message','created_at']);
        foreach ($rows as $r) {
            fputcsv($out, [$r['id'],$r['first_name'],$r['last_name'],$r['email'],$r['subject'],$r['message'],$r['created_at']]);
        }
        fclose($out);
        exit;
    }

} catch (Exception $e) {
    echo 'DB error: ' . $e->getMessage();
    exit;
}

?><!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Contacts Admin</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      body{font-family:Arial,Helvetica,sans-serif;background:#f7f7f7;color:#111;padding:20px}
      table{width:100%;border-collapse:collapse}
      th,td{padding:8px;border:1px solid #e4e4e4;text-align:left}
      th{background:#111;color:#fff}
      .controls{margin-bottom:12px}
    </style>
  </head>
  <body>
    <div class="controls">
      <strong>Contacts</strong>
      <span style="float:right"><a href="?export=csv">Export CSV</a></span>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Subject</th>
          <th>Message</th>
          <th>Received</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach($rows as $r): ?>
          <tr>
            <td><?php echo htmlspecialchars($r['id']); ?></td>
            <td><?php echo htmlspecialchars($r['first_name'] . ' ' . $r['last_name']); ?></td>
            <td><?php echo htmlspecialchars($r['email']); ?></td>
            <td><?php echo htmlspecialchars($r['subject']); ?></td>
            <td style="max-width:420px;white-space:pre-wrap;word-break:break-word"><?php echo nl2br(htmlspecialchars($r['message'])); ?></td>
            <td><?php echo htmlspecialchars($r['created_at']); ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </body>
</html>
