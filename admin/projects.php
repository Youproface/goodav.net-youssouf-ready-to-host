<?php
// Simple admin viewer for projects.db
// Usage: /admin/projects.php?token=YOUR_TOKEN

// Prefer HTTP Basic auth using ADMIN_USER/ADMIN_PASS from environment
$adminUser = getenv('ADMIN_USER');
$adminPass = getenv('ADMIN_PASS');

// If admin credentials are set, require HTTP Basic auth
if ($adminUser && $adminPass) {
  if (!isset($_SERVER['PHP_AUTH_USER'])) {
    header('WWW-Authenticate: Basic realm="Projects Admin"');
    header('HTTP/1.0 401 Unauthorized');
    echo "<h1>401 — Authorization required</h1>";
    exit;
  }
  $user = $_SERVER['PHP_AUTH_USER'];
  $pass = $_SERVER['PHP_AUTH_PW'] ?? '';
  if (!hash_equals($adminUser, $user) || !hash_equals($adminPass, $pass)) {
    header('HTTP/1.0 403 Forbidden');
    echo "<h1>403 — Forbidden</h1><p>Invalid credentials.</p>";
    exit;
  }
} else {
  // Fallback to token query param for compatibility (if no admin user/pass set)
  $ADMIN_TOKEN = getenv('ADMIN_TOKEN') ?: 'devtoken';
  $provided = $_GET['token'] ?? '';
  if ($provided !== $ADMIN_TOKEN) {
    http_response_code(403);
    echo "<h1>403 — Forbidden</h1><p>Missing or invalid admin token.</p>";
    exit;
  }
}

$dbPath = __DIR__ . '/../projects.db';
if (!file_exists($dbPath)) {
    echo "<h1>No database found</h1><p>Expected at: " . htmlspecialchars($dbPath) . "</p>";
    exit;
}

try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo "<h1>DB error</h1><pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
    exit;
}

// CSV export
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="projects.csv"');
    $out = fopen('php://output', 'w');
    $stmt = $pdo->query('SELECT * FROM projects ORDER BY id DESC');
    $first = true;
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if ($first) {
            fputcsv($out, array_keys($row));
            $first = false;
        }
        fputcsv($out, $row);
    }
    fclose($out);
    exit;
}

// Fetch rows
$stmt = $pdo->query('SELECT * FROM projects ORDER BY id DESC');
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

function h($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Projects Admin</title>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;margin:20px;background:#f7f9fc}
    table{border-collapse:collapse;width:100%;background:#fff}
    th,td{padding:8px 10px;border:1px solid #e3e8ef;text-align:left;font-size:13px}
    th{background:#f1f5f9}
    .meta{margin-bottom:12px}
    .actions{margin-top:8px}
    .note{color:#555;font-size:13px}
    .empty{padding:40px;text-align:center;color:#666}
  </style>
</head>
<body>
  <h1>Projects — Admin View</h1>
  <div class="meta">
    <span class="note">DB: <?php echo h($dbPath); ?></span>
    <div class="actions">
      <?php
        // Build CSV href: if token fallback was used, include it; otherwise just ?export=csv
        $csvHref = '?export=csv';
        if (isset($provided) && $provided !== '') {
            $csvHref = '?token=' . urlencode($provided) . '&export=csv';
        }
      ?>
      <a href="<?php echo h($csvHref); ?>">Download CSV</a>
    </div>
  </div>

  <?php if (!$rows): ?>
    <div class="empty">No project submissions found.</div>
  <?php else: ?>
    <table>
      <thead>
        <tr>
          <?php foreach (array_keys($rows[0]) as $col): ?>
            <th><?php echo h($col); ?></th>
          <?php endforeach; ?>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($rows as $r): ?>
          <tr>
            <?php foreach ($r as $v): ?>
              <td><?php echo nl2br(h($v)); ?></td>
            <?php endforeach; ?>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>

  <p class="note">Tip: set <code>ADMIN_TOKEN</code> in your <code>.env</code> and use it as <code>?token=YOUR_TOKEN</code> when visiting this page.</p>
</body>
</html>
