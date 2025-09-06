<?php
// create_db.php - Create MySQL database tables for GoDaddy hosting
// This will create all necessary tables in your GoDaddy MySQL database

try {
    $pdo = new PDO('mysql:host=localhost;dbname=goodav_db;charset=utf8mb4', 'goodav_rw', 'xocgyg-tawhub-Junqy9');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "Connected to MySQL database successfully!\n";
    
    // Create bookings table
    $pdo->exec("CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        organization VARCHAR(255),
        project TEXT,
        date VARCHAR(20),
        time VARCHAR(20),
        timezone VARCHAR(100),
        meetingSoftware VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    echo "Bookings table created/verified.\n";
    
    // Create contacts table
    $pdo->exec("CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        subject VARCHAR(500),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    echo "Contacts table created/verified.\n";
    
    // Create projects table
    $pdo->exec("CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        organization VARCHAR(255),
        project_type VARCHAR(100),
        budget VARCHAR(100),
        timeline VARCHAR(100),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    echo "Projects table created/verified.\n";
    
    // Create central submissions table
    $pdo->exec("CREATE TABLE IF NOT EXISTS submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        source VARCHAR(50),
        payload TEXT,
        email VARCHAR(255),
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    echo "Submissions table created/verified.\n";
    
    echo "All database tables created successfully in GoDaddy MySQL!\n";
    
} catch (Exception $e) {
    echo "Failed to create MySQL tables: " . $e->getMessage() . "\n";
}
