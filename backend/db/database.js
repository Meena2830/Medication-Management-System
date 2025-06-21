// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');

// // This resolves to: backend/db/meds.db
// const dbPath = path.resolve(__dirname, 'meds.db');

// const db = new sqlite3.Database(dbPath, (err) => {
//   if (err) {
//     console.error('❌ Failed to connect to database:', err.message);
//   } else {
//     console.log('✅ Connected to SQLite database at', dbPath);
//   }
// });

// module.exports = db;


const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Resolved path to backend/db/meds.db
const dbPath = path.resolve(__dirname, 'meds.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database at', dbPath);
  }
});

// Initialize tables if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS medications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      time TEXT NOT NULL,
      description TEXT,
      dosage TEXT,
      frequency TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS medication_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      medication_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      taken INTEGER NOT NULL DEFAULT 0,
      time_taken TEXT,
      has_photo INTEGER NOT NULL DEFAULT 0,
      photo_url TEXT,
      FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;
