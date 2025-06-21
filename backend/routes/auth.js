const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/database'); 

const router = express.Router();
const SECRET = 'secret123'; // 

// ✅ Signup Route
router.post('/signup', async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing fields in request' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (email, password, name) VALUES (?, ?, ?)`,
      [email, hashed, name], // Use `name` column for role
      function (err) {
        if (err) {
          console.error("Signup DB Error:", err);
          return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
      }
    );
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) {
      console.error("Login DB error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(400).json({ error: 'Invalid login' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid login' });

    const token = jwt.sign({ id: user.id, role: user.name }, SECRET, { expiresIn: '2h' });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.name, // role stored in `name`
      },
    });
  });
});

module.exports = router;
