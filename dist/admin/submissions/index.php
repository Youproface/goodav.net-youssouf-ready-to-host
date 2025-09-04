<?php
// admin/submissions/index.php — viewer for central submissions.db
// Access: HTTP Basic auth using ADMIN_USER/ADMIN_PASS or ?token=ADMIN_TOKEN

// Basic auth or token
$adminUser = getenv('ADMIN_USER');
$adminPass = getenv('ADMIN_PASS');
$adminToken = getenv('ADMIN_TOKEN') ?: '';

// token fallback
$providedToken = $_GET['token'] ?? '';
if ($adminUser && $adminPass) {
    if (!isset($_SERVER['PHP_AUTH_USER'])) {
        header('WWW-Authenticate: Basic realm="Submissions Admin"');
        header('HTTP/1.0 401 Unauthorized');
        echo "<h1>401 — Authorization required</h1>";
        exit;
    }
    $u = $_SERVER['PHP_AUTH_USER'];
    $p = $_SERVER['PHP_AUTH_PW'] ?? '';
    if (!hash_equals($adminUser, $u) || !hash_equals($adminPass, $p)) {
        header('HTTP/1.0 403 Forbidden');
        echo "<h1>403 — Forbidden</h1><p>Invalid credentials.</p>";
        exit;
    }
} else {
    if ($adminToken !== '' && $providedToken === $adminToken) {
        // allowed
    } else {
        http_response_code(403);
        echo "<h1>403 — Forbidden</h1><p>Missing or invalid admin token.</p>";
        exit;
    }
}

// locate DB
$dbPath = __DIR__ . '/../../submissions.db';
if (!file_exists($dbPath)) {
    echo "<h1>No submissions DB</h1><p>Expected at: " . htmlspecialchars($dbPath) . "</p>";
    exit;
}

try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo "<h1>DB error</h1><pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
    exit;
}

// determine id from pretty URL (/admin/submissions/123) or ?id=123
$id = null;
$requestUri = $_SERVER['REQUEST_URI'] ?? '';
$scriptName = $_SERVER['SCRIPT_NAME'] ?? '';

// If request URI contains /admin/submissions/{id}
if (preg_match('#/admin/submissions/([0-9]+)#', $requestUri, $m)) {
    $id = (int)$m[1];
}
if (!$id && isset($_GET['id'])) $id = (int)$_GET['id'];

function h($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

if ($id) {
    // show single submission
    $stmt = $pdo->prepare('SELECT * FROM submissions WHERE id = :id');
    $stmt->execute([':id' => $id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        echo "<h1>Submission not found</h1><p>ID: " . h($id) . "</p>";
        echo "<p><a href='./'>Back to list</a></p>";
        exit;
    }
    $payload = json_decode($row['payload'] ?? '{}', true);
    ?>
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Submission #<?php echo h($id); ?></title>
      <style>body{font-family:Arial,Helvetica,sans-serif;padding:18px;background:#f7f9fc}pre{background:#fff;padding:12px;border:1px solid #e6eef8;overflow:auto}</style>
    </head>
    <body>
      <h1>Submission #<?php echo h($id); ?></h1>
      <p><strong>Source:</strong> <?php echo h($row['source']); ?> — <strong>From:</strong> <?php echo h($row['email']); ?> — <strong>Name:</strong> <?php echo h($row['name']); ?> — <em><?php echo h($row['created_at']); ?></em></p>
      <h2>Payload</h2>
      <pre><?php echo h(json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)); ?></pre>
      <p><a href="./">Back to submissions list</a></p>
    </body>
    </html>
    <?php
    exit;
}

// list recent submissions
$stmt = $pdo->query('SELECT id, source, email, name, created_at FROM submissions ORDER BY id DESC LIMIT 200');
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Submissions</title>
  <style>body{font-family:Arial,Helvetica,sans-serif;padding:18px;background:#f7f9fc}table{width:100%;border-collapse:collapse;background:#fff}th,td{padding:8px;border:1px solid #e6eef8;text-align:left}th{background:#f1f5f9}a.cta{display:inline-block;padding:8px 10px;background:#fb923c;color:#fff;border-radius:6px;text-decoration:none}</style>
</head>
<body>
  <h1>Submissions</h1>
  <p>DB: <?php echo h($dbPath); ?></p>
  <?php if (!$rows): ?>
    <div style="padding:30px;background:#fff;border:1px solid #eee">No submissions found.</div>
  <?php else: ?>
    <table>
      <thead><tr><th>ID</th><th>Source</th><th>Name</th><th>Email</th><th>Received</th><th></th></tr></thead>
      <tbody>
        <?php foreach($rows as $r): ?>
          <tr>
            <td><?php echo h($r['id']); ?></td>
            <td><?php echo h($r['source']); ?></td>
            <td><?php echo h($r['name']); ?></td>
            <td><?php echo h($r['email']); ?></td>
            <td><?php echo h($r['created_at']); ?></td>
            <td><a class="cta" href="/<?php echo 'admin/submissions/' . urlencode($r['id']); ?>">View</a></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</body>
</html>
