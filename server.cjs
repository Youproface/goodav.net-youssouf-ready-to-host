// Endpoint to save contact form and send email notification
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;
  db.run(
    `CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      subject TEXT,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    [],
    function (tableErr) {
      if (tableErr) {
        return res.status(500).json({ error: tableErr.message });
      }
      db.run(
        `INSERT INTO contacts (firstName, lastName, email, subject, message) VALUES (?, ?, ?, ?, ?)`,
        [firstName, lastName, email, subject, message],
        async function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          // Send email notification using Nodemailer
          try {
            let transporter = nodemailer.createTransport({
              host: process.env.SMTP_HOST || 'smtp.goodav.net',
              port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
              secure: false,
              auth: {
                user: process.env.SMTP_USER || 'form@goodav.net',
                pass: process.env.SMTP_PASS
              }
            });
            let mailOptions = {
              from: 'form@goodav.net',
              to: 'form@goodav.net',
              subject: 'New Contact Form Submission',
              text: `A new contact form has been submitted:\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
            };
            await transporter.sendMail(mailOptions);
            res.json({ success: true, id: this.lastID });
          } catch (emailErr) {
            res.status(500).json({ error: 'Contact saved, but email failed to send.', details: emailErr.message });
          }
        }
      );
    }
  );
});
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
        // Configure transporter (use your SMTP provider or Gmail for demo)
        let transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.goodav.net',
          port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
          secure: false,
          auth: {
            user: process.env.SMTP_USER || 'form@goodav.net',
            pass: process.env.SMTP_PASS
          }
        });
        // Email content
        let mailOptions = {
          from: 'form@goodav.net',
          to: 'form@goodav.net',
          subject: 'New Booking Submission',
          text: `A new booking has been submitted:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nOrganization: ${organization}\nProject: ${project}\nDate: ${date}\nTime: ${time}\nTimezone: ${timezone}`
        };
        await transporter.sendMail(mailOptions);
        res.json({ success: true, id: this.lastID });
      } catch (emailErr) {
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

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
