import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// =============================================================================
// DATABASE CONNECTION
// =============================================================================

let pool;

try {
  if (process.env.DATABASE_URL) {
    // For Aiven / Render deployment
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  } else {
    // Manual database configuration
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'defaultdb',
      port: Number(process.env.DB_PORT) || 3306,
      ssl: {
        rejectUnauthorized: false
      },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  console.log('🔌 Database pool configuration ready.');
} catch (err) {
  console.error('❌ Error configuring database pool:', err);
}

// =============================================================================
// HOME ROUTE
// =============================================================================

app.get('/', (req, res) => {
  res.send('J-Pro Lights and Sounds Rentals API is Running');
});

// =============================================================================
// HEALTH CHECK
// =============================================================================

app.get('/api/health', async (req, res) => {
  try {
    if (!pool) {
      return res.status(500).json({
        status: 'error',
        message: 'Database pool not initialized'
      });
    }

    const [rows] = await pool.query('SELECT 1');

    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date(),
      result: rows
    });
  } catch (err) {
    console.error('Health check error:', err);

    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// =============================================================================
// BOOKINGS ROUTES
// =============================================================================

// GET all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM bookings ORDER BY created_at DESC'
    );

    const formatted = rows.map((b) => ({
      id: b.id,
      customerId: b.customer_id,
      customerName: b.customer_name,
      customerEmail: b.customer_email,
      customerPhone: b.customer_phone,
      eventType: b.event_type,
      eventDate:
        b.event_date instanceof Date
          ? b.event_date.toISOString().split('T')[0]
          : b.event_date,
      eventTime: b.event_time,
      venue: b.venue,
      package: b.package_name,
      packagePrice: Number(b.package_price),
      paymentMethod: b.payment_method,
      isRush: Boolean(b.is_rush),
      totalAmount: Number(b.total_amount),
      notes: b.notes || '',
      status: b.status,
      createdAt:
        b.created_at instanceof Date
          ? b.created_at.toISOString().split('T')[0]
          : b.created_at
    }));

    res.json(formatted);
  } catch (err) {
    console.error('GET bookings error:', err);

    res.status(500).json({
      error: err.message
    });
  }
});

// CREATE booking
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      id,
      customerId,
      customerName,
      customerEmail,
      customerPhone,
      eventType,
      eventDate,
      eventTime,
      venue,
      package: pkgName,
      packagePrice,
      paymentMethod,
      isRush,
      totalAmount,
      notes
    } = req.body;

    const bookingId =
      id || 'BK' + String(Math.floor(Math.random() * 9000) + 1000);

    let pkgId = 'standard';

    if (pkgName?.toLowerCase().includes('basic')) {
      pkgId = 'basic';
    }

    if (pkgName?.toLowerCase().includes('premium')) {
      pkgId = 'premium';
    }

    const query = `
      INSERT INTO bookings (
        id,
        customer_id,
        customer_name,
        customer_email,
        customer_phone,
        event_type,
        event_date,
        event_time,
        venue,
        package_id,
        package_name,
        package_price,
        payment_method,
        is_rush,
        rush_fee,
        total_amount,
        notes,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `;

    await pool.query(query, [
      bookingId,
      customerId,
      customerName,
      customerEmail,
      customerPhone || '',
      eventType,
      eventDate,
      eventTime,
      venue,
      pkgId,
      pkgName,
      packagePrice,
      paymentMethod || 'Cash',
      isRush ? 1 : 0,
      isRush ? 2000 : 0,
      totalAmount,
      notes || ''
    ]);

    res.status(201).json({
      id: bookingId,
      message: 'Booking created successfully'
    });
  } catch (err) {
    console.error('POST booking error:', err);

    res.status(500).json({
      error: err.message
    });
  }
});

// UPDATE booking status
app.put('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.query(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, id]
    );

    res.json({
      message: 'Booking updated successfully'
    });
  } catch (err) {
    console.error('PUT booking error:', err);

    res.status(500).json({
      error: err.message
    });
  }
});

// DELETE booking
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      'DELETE FROM bookings WHERE id = ?',
      [id]
    );

    res.json({
      message: 'Booking deleted successfully'
    });
  } catch (err) {
    console.error('DELETE booking error:', err);

    res.status(500).json({
      error: err.message
    });
  }
});

// =============================================================================
// USERS ROUTES
// =============================================================================

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC'
    );

    const formatted = rows.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone || '',
      role: u.role,
      createdAt:
        u.created_at instanceof Date
          ? u.created_at.toISOString().split('T')[0]
          : u.created_at
    }));

    res.json(formatted);
  } catch (err) {
    console.error('GET users error:', err);

    res.status(500).json({
      error: err.message
    });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length > 0) {
      const u = rows[0];

      res.json({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone || '',
        role: u.role
      });
    } else {
      res.status(401).json({
        error: 'Invalid email or password'
      });
    }
  } catch (err) {
    console.error('LOGIN error:', err);

    res.status(500).json({
      error: err.message
    });
  }
});

// REGISTER USER
app.post('/api/users', async (req, res) => {
  try {
    const {
      id,
      name,
      email,
      phone,
      password,
      role
    } = req.body;

    const userId =
      id ||
      (role === 'admin'
        ? `admin-${Date.now()}`
        : `cust-${Date.now()}`);

    await pool.query(
      'INSERT INTO users (id, name, email, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)',
      [
        userId,
        name,
        email,
        password,
        phone || '',
        role || 'customer'
      ]
    );

    res.status(201).json({
      id: userId,
      message: 'User registered successfully'
    });
  } catch (err) {
    console.error('REGISTER error:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        error: 'Email already exists'
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
});

// =============================================================================
// START SERVER
// =============================================================================

app.listen(PORT, () => {
  console.log(`🚀 Backend API Server running on port ${PORT}`);
});
