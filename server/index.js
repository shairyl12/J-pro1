import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ================= DATABASE =================
let pool;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'defaultdb',
    port: Number(process.env.DB_PORT) || 3306,
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10
  });

  console.log('DB Connected');
} catch (err) {
  console.error(err);
}

// ================= API =================
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users');
  res.json(rows);
});

app.get('/api/bookings', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM bookings');
  res.json(rows);
});

// ================= FRONTEND =================
// ❗ SAFE FIX (NO '*')
app.use(express.static('dist'));

app.get(/.*/, (req, res) => {
  res.sendFile(process.cwd() + '/dist/index.html');
});

// ================= START =================
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
