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

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
