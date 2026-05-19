import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Fix __dirname (ESM support)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// =========================
// DATABASE (SAFE INIT)
// =========================
let pool;

const createPool = () => {
  if (process.env.DATABASE_URL) {
    return mysql.createPool({
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  return mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'defaultdb',
    port: Number(process.env.DB_PORT) || 3306,
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
};

try {
  pool = createPool();
  console.log('🔌 Database pool ready');
} catch (err) {
  console.error('DB Error:', err);
}

// =========================
// API ROUTES
// =========================

// Health check (safe test)
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      database: 'connected',
      result: rows
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// Example routes
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// FRONTEND SERVE (FIXED)
// =========================

// Serve Vite build folder
app.use(express.static(path.join(__dirname, 'dist')));

// IMPORTANT: DO NOT USE "*"
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// =========================
// START SERVER
// =========================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
