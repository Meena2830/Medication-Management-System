


const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const { format } = require('date-fns');
const SECRET = 'secret123';

module.exports = (io) => {
  const router = express.Router();

  // Auth middleware
  router.use((req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token' });
    }

    try {
      req.user = jwt.verify(auth.split(' ')[1], SECRET);
      next();
    } catch (err) {
      res.status(403).json({ error: 'Invalid token' });
    }
  });

  // GET all medications for user
  router.get('/', (req, res) => {
    db.all(
      `SELECT id, name, dosage, frequency FROM medications WHERE user_id = ?`,
      [req.user.id],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      }
    );
  });

  // POST new medication
  router.post('/', (req, res) => {
    const { name, dosage, frequency } = req.body;
    if (!name || !dosage || !frequency) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    db.run(
      `INSERT INTO medications (user_id, name, dosage, frequency) VALUES (?, ?, ?, ?)`,
      [req.user.id, name, dosage, frequency],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });

        const med = { id: this.lastID, name, dosage, frequency };
        io.emit(`med_added:${req.user.id}`, med);
        res.status(201).json(med);
      }
    );
  });

  // DELETE a medication
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run(
      `DELETE FROM medications WHERE id = ? AND user_id = ?`,
      [id, req.user.id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });

        io.emit(`med_deleted:${req.user.id}`, +id);
        res.json({ success: true });
      }
    );
  });

  // POST medication log (mark as taken)
  router.post('/:id/log', (req, res) => {
    const medId = req.params.id;
    const date = format(new Date(), 'yyyy-MM-dd');

    db.run(
      `INSERT INTO medication_logs (medication_id, date, taken) VALUES (?, ?, 1)`,
      [medId, date],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });

        io.emit(`log_added:${req.user.id}`, { medId: +medId, date });
        res.status(201).json({ logId: this.lastID });
      }
    );
  });

  // GET adherence logs for chart
  router.get('/logs', (req, res) => {
    db.all(
      `SELECT date, COUNT(*) as total
       FROM medication_logs ml
       JOIN medications m ON ml.medication_id = m.id
       WHERE m.user_id = ?
       GROUP BY date`,
      [req.user.id],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      }
    );
  });

  return router;
};
