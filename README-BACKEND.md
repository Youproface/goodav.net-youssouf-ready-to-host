PHP backend for Booking Modal

1) Purpose
- `public/process_booking.php` accepts POSTed JSON booking data, validates it, stores it in `public/bookings.db` (SQLite), and attempts to send an email notification to the admin.

2) Quick local test (PHP built-in server)

Run these commands from the repo root:

```bash
php -S localhost:8000 -t public
# in another shell, create DB (optional):
php public/create_db.php
```

3) Environment variables
You may set these environment variables to configure email recipients:

- `BOOKING_ADMIN_EMAIL` - admin recipient for booking notifications
- `BOOKING_FROM_EMAIL` - From header for outgoing email

SMTP (recommended for production):

- `SMTP_HOST` - e.g., smtp.sendgrid.net
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `SMTP_PORT` - default 587
- `SMTP_SECURE` - tls or ssl

4) Notes
- `mail()` may not work on local machines without an MTA; use an SMTP relay or inspect the SQLite DB directly.

5) Using PHPMailer (recommended)

Install Composer (if not installed):

```bash
curl -sS https://getcomposer.org/installer | php
php composer.phar require phpmailer/phpmailer
```

Then set `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` as environment variables and restart your PHP server.

6) Spam protection

- A hidden honeypot field `hp_field` is checked server-side; if filled, the request is rejected as spam.
- A simple rate-limiter allows up to 3 submissions per IP per 60 seconds and returns an informative error if exceeded.

7) Testing SMTP

After installing PHPMailer and configuring SMTP env vars, you can test sending with:

```bash
php -S localhost:8000 -t public
curl -sS http://localhost:8000/test_mail.php
```

