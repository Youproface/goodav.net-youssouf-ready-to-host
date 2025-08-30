const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const nodemailer = require('nodemailer');

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
          host: 'smtp.goodav.net', // Use your domain SMTP server
          port: 587,
          secure: false,
          auth: {
            user: 'form@goodav.net',
            pass: 'YOUR_EMAIL_PASSWORD' // Replace with your actual password or use env variable
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
