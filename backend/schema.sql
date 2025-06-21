-- -- Users table
-- CREATE TABLE IF NOT EXISTS users (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   email TEXT UNIQUE NOT NULL,
--   password TEXT NOT NULL,
--   name TEXT NOT NULL
-- );


-- -- Medications table
-- CREATE TABLE IF NOT EXISTS medications (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   user_id INTEGER NOT NULL,
--   name TEXT NOT NULL,
--   time TEXT NOT NULL, -- Stored as "HH:MM"
--   description TEXT,
--   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- Medication logs (per date)
-- CREATE TABLE IF NOT EXISTS medication_logs (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   medication_id INTEGER NOT NULL,
--   date TEXT NOT NULL, -- ISO format "YYYY-MM-DD"
--   taken INTEGER NOT NULL DEFAULT 0, -- 1 = taken, 0 = missed
--   time_taken TEXT, -- e.g. "08:30 AM"
--   has_photo INTEGER NOT NULL DEFAULT 0,
--   photo_url TEXT,
--   FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE
-- );

-- -- Notification preferences
-- CREATE TABLE IF NOT EXISTS notification_settings (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   user_id INTEGER NOT NULL,
--   email_notifications INTEGER DEFAULT 1,
--   email_address TEXT,
--   reminder_time TEXT DEFAULT '20:00', -- e.g., 8:00 PM
--   missed_med_notification INTEGER DEFAULT 1,
--   missed_med_delay INTEGER DEFAULT 2, -- hours
--   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );



-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL
);

-- Medications table (updated with dosage and frequency)
CREATE TABLE IF NOT EXISTS medications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  time TEXT NOT NULL DEFAULT '08:00',
  description TEXT,
  dosage TEXT,         -- ✅ NEW COLUMN
  frequency TEXT,      -- ✅ NEW COLUMN
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Medication logs (per date)
CREATE TABLE IF NOT EXISTS medication_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  medication_id INTEGER NOT NULL,
  date TEXT NOT NULL, -- ISO format "YYYY-MM-DD"
  taken INTEGER NOT NULL DEFAULT 0, -- 1 = taken, 0 = missed
  time_taken TEXT, -- e.g. "08:30 AM"
  has_photo INTEGER NOT NULL DEFAULT 0,
  photo_url TEXT,
  FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE
);

-- Notification preferences
CREATE TABLE IF NOT EXISTS notification_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  email_notifications INTEGER DEFAULT 1,
  email_address TEXT,
  reminder_time TEXT DEFAULT '20:00',
  missed_med_notification INTEGER DEFAULT 1,
  missed_med_delay INTEGER DEFAULT 2,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
