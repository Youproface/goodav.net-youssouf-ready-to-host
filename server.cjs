const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./booking.db');

// Endpoint to save a booking and send email notification
app.post('/api/bookings', async (req, res) => {
  const { name, email, phone, organization, project, date, time, timezone } = req.body;
  db.run(
    `INSERT INTO bookings (name, email, phone, organization, project, date, time, timezone)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone, organization, project, date, time, timezone],
    async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // Send email notification using Nodemailer
      try {
        // Configure transporter with better error handling
        let transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT) || 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          },
          // Add timeout and debug options
          debug: true,
          logger: true
        });

        // Verify connection before sending
        await transporter.verify();

        // Email content
        let mailOptions = {
          from: `"GoodAV Contact Form" <${process.env.SMTP_USER}>`,
          to: process.env.SMTP_USER, // Send to yourself for notifications
          subject: 'New Booking Submission - GoodAV',
          html: `
            <h2>New Booking Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Project:</strong> ${project || 'Not specified'}</p>
            <p><strong>Preferred Date:</strong> ${date}</p>
            <p><strong>Preferred Time:</strong> ${time}</p>
            <p><strong>Timezone:</strong> ${timezone}</p>
            <hr>
            <p><em>This booking was submitted via the GoodAV website contact form.</em></p>
          `,
          text: `A new booking has been submitted:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nOrganization: ${organization}\nProject: ${project || 'Not specified'}\nDate: ${date}\nTime: ${time}\nTimezone: ${timezone}`
        };
        await transporter.sendMail(mailOptions);
        res.json({ success: true, id: this.lastID });
      } catch (emailErr) {
        console.error('Email sending failed:', emailErr);
        res.status(500).json({ error: 'Booking saved, but email failed to send.', details: emailErr.message });
      }
    }
  );
});

// (Optional) Endpoint to get all bookings
app.get('/api/bookings', (req, res) => {
  db.all('SELECT * FROM bookings', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Root endpoint - Server status and API documentation
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GoodAV Booking API Server</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background: linear-gradient(135deg, #1b1b1d 0%, #2d2d30 100%);
                color: #ffffff;
                min-height: 100vh;
            }
            .container {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                padding: 30px;
                margin: 20px 0;
                border: 1px solid rgba(255, 165, 0, 0.3);
            }
            .status {
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                margin-bottom: 20px;
                font-weight: bold;
            }
            .endpoint {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 165, 0, 0.2);
                border-radius: 8px;
                padding: 15px;
                margin: 10px 0;
            }
            .method {
                background: #ff6b35;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-weight: bold;
                font-size: 12px;
            }
            .method.get {
                background: #28a745;
            }
            .url {
                font-family: 'Courier New', monospace;
                background: rgba(0, 0, 0, 0.3);
                padding: 2px 6px;
                border-radius: 4px;
                margin-left: 10px;
            }
            h1, h2 {
                color: #ff6b35;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                color: rgba(255, 255, 255, 0.7);
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 GoodAV Booking API Server</h1>
            <div class="status">
                ✅ Server is running successfully on port 4000
            </div>

            <h2>📋 Available API Endpoints</h2>

            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="url">/</span>
                <br>
                <strong>Server Status</strong> - Returns this status page
            </div>

            <div class="endpoint">
                <span class="method">POST</span>
                <span class="url">/api/bookings</span>
                <br>
                <strong>Create Booking</strong> - Submit a new booking request
                <br>
                <small>Body: { name, email, phone, organization, project, date, time, timezone }</small>
            </div>

            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="url">/api/bookings</span>
                <br>
                <strong>Get All Bookings</strong> - Retrieve all booking records
            </div>

            <h2>📧 Email Configuration</h2>
            <p>The server is configured to send email notifications for new bookings. Make sure to update the <code>.env</code> file with your SMTP credentials:</p>
            <ul>
                <li><code>SMTP_HOST</code> - Your email provider's SMTP server</li>
                <li><code>SMTP_PORT</code> - Usually 587 for TLS</li>
                <li><code>SMTP_USER</code> - Your email address</li>
                <li><code>SMTP_PASS</code> - Your email password or app password</li>
            </ul>

            <h2>🗄️ Database</h2>
            <p>Bookings are stored in a SQLite database (<code>booking.db</code>) with the following fields:</p>
            <ul>
                <li><code>id</code> - Auto-incrementing primary key</li>
                <li><code>name</code> - Full name</li>
                <li><code>email</code> - Email address</li>
                <li><code>phone</code> - Phone number with country code</li>
                <li><code>organization</code> - Organization/company name</li>
                <li><code>project</code> - Project description</li>
                <li><code>date</code> - Preferred date</li>
                <li><code>time</code> - Preferred time</li>
                <li><code>timezone</code> - Timezone</li>
                <li><code>created_at</code> - Timestamp</li>
            </ul>
        </div>

        <div class="footer">
            <p>GoodAV Booking System - Backend API Server</p>
            <p>Running on Node.js with Express, SQLite, and Nodemailer</p>
        </div>
    </body>
    </html>
  `);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
