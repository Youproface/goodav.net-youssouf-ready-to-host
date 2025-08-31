<?php
// create_db.php - run once to ensure DB file exists and is writable by the webserver
$dbFile = __DIR__ . DIRECTORY_SEPARATOR . 'bookings.db';
if (file_exists($dbFile)) {
    echo "DB already exists: $dbFile\n";
    exit;
}
try {
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
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
    chmod($dbFile, 0666);
    echo "DB created: $dbFile\n";
} catch (Exception $e) {
    echo "Failed to create DB: " . $e->getMessage() . "\n";
}
