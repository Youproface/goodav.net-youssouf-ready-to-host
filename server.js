const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./booking.db');

// Endpoint to save a booking
app.post('/api/bookings', (req, res) => {
  const { name, email, phone, organization, project, date, time, timezone } = req.body;
  db.run(
    `INSERT INTO bookings (name, email, phone, organization, project, date, time, timezone)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone, organization, project, date, time, timezone],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, id: this.lastID });
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
