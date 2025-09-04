# GoodAV Backend Architecture

## Overview
The GoodAV booking system uses a microservices architecture with separated concerns for better maintainability and scalability.

## Services

### 1. Main Booking Service (`process_booking.php`)
**Port:** 8000
**Purpose:** Handles booking form submissions, data validation, and database operations
**Responsibilities:**
- Input validation
- Database operations (SQLite)
- Email forwarding coordination
- Response formatting

### 2. Email Forwarder Service (`email_forwarder.php`)
**Port:** 8000 (same server, different endpoint)
**Purpose:** Dedicated email sending service
**Responsibilities:**
- Email composition and formatting
- Email delivery via PHP mail()
- Email status reporting

## Architecture Benefits

### ✅ Separation of Concerns
- **Database operations** are isolated from email logic
- **Email service** can be scaled independently
- **Main service** focuses on data processing

### ✅ Maintainability
- Changes to email logic don't affect database operations
- Email service can be updated without touching booking logic
- Clear interfaces between services

### ✅ Scalability
- Email service can be moved to separate server if needed
- Database operations can be optimized independently
- Load balancing can be applied to individual services

### ✅ Error Handling
- Database failures don't prevent email attempts
- Email failures don't prevent data saving
- Detailed error reporting for each service

## API Endpoints

### POST `/process_booking.php`
Main booking endpoint that handles the complete booking flow.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "organization": "ABC Corp",
  "project": "Video production project",
  "date": "2025-08-30",
  "time": "10:00",
  "timezone": "America/New_York"
}
```

**Response:**
```json
{
  "success": true,
  "id": "123",
  "message": "Booking saved and email sent successfully",
  "email_status": "sent"
}
```

### POST `/email_forwarder.php`
Standalone email service for testing and direct email sending.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "organization": "ABC Corp",
  "project": "Video production project",
  "date": "2025-08-30",
  "time": "10:00",
  "timezone": "America/New_York",
  "booking_id": "123"
}
```

## Database Schema

```sql
CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    organization TEXT NOT NULL,
    project TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    timezone TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Configuration

### Email Settings
Update the email configuration in both `process_booking.php` and `email_forwarder.php`:
```php
$to = 'your-email@example.com'; // Replace with your actual email
```

### Database
The system uses SQLite database (`booking.db`) in the project root.

## Development Setup

1. Start PHP development server:
```bash
php -S localhost:8000
```

2. Frontend runs on separate port (Vite dev server):
```bash
npm run dev
```

3. Test the booking system by submitting the form or using curl:
```bash
curl -X POST http://localhost:8000/process_booking.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","organization":"Test","project":"Test","date":"2025-08-30","time":"10:00","timezone":"UTC"}'
```

## Production Deployment

For production, consider:
- Moving email service to separate server
- Using proper SMTP server instead of PHP mail()
- Adding authentication and rate limiting
- Implementing proper logging and monitoring
- Using MySQL/PostgreSQL instead of SQLite
