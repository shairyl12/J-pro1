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

// MySQL Database Connection Pool
let pool;
try {
  // Check if DATABASE_URL is provided (Aiven / Render) or use individual parameters
  if (process.env.DATABASE_URL) {
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
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'jpro_booking_system',
      port: Number(process.env.DB_PORT) || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  console.log('🔌 Database pool configuration ready.');
} catch (err) {
  console.error('❌ Error configuring database pool:', err);
}

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    if (!pool) {
      return res.status(500).json({ status: 'error', message: 'Database pool not initialized' });
    }
    const [rows] = await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected', timestamp: new Date() });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// =============================================================================
// API ROUTES FOR BOOKINGS
// =============================================================================

// GET all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
    // Map camelCase to snake_case column names for frontend compatibility
    const formatted = rows.map(b => ({
      id: b.id,
      customerId: b.customer_id,
      customerName: b.customer_name,
      customerEmail: b.customer_email,
      customerPhone: b.customer_phone,
      eventType: b.event_type,
      eventDate: b.event_date instanceof Date ? b.event_date.toISOString().split('T')[0] : b.event_date,
      eventTime: b.event_time,
      venue: b.venue,
      package: b.package_name,
      packagePrice: Number(b.package_price),
      paymentMethod: b.payment_method,
      isRush: Boolean(b.is_rush),
      totalAmount: Number(b.total_amount),
      notes: b.notes || '',
      status: b.status,
      createdAt: b.created_at instanceof Date ? b.created_at.toISOString().split('T')[0] : b.created_at
    }));
    res.json(formatted);
  } catch (err) {
    console.error('GET /api/bookings error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST new booking
app.post('/api/bookings', async (req, res) => {
  const {
    id, customerId, customerName, customerEmail, customerPhone,
    eventType, eventDate, eventTime, venue,
    package: pkgName, packagePrice, paymentMethod, isRush, totalAmount, notes
  } = req.body;

  try {
    const bookingId = id || ('BK' + String(Math.floor(Math.random() * 9000) + 1000));
    const query = `
      INSERT INTO bookings (
        id, customer_id, customer_name, customer_email, customer_phone,
        event_type, event_date, event_time, venue,
        package_id, package_name, package_price, payment_method,
        is_rush, rush_fee, total_amount, notes, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `;
    
    // Determine package ID placeholder based on package name
    let pkgId = 'standard';
    if (pkgName.toLowerCase().includes('basic')) pkgId = 'basic';
    if (pkgName.toLowerCase().includes('premium')) pkgId = 'premium';

    await pool.query(query, [
      bookingId, customerId, customerName, customerEmail, customerPhone || '',
      eventType, eventDate, eventTime, venue,
      pkgId, pkgName, packagePrice, paymentMethod || 'Cash',
      isRush ? 1 : 0, isRush ? 2000 : 0, totalAmount, notes || ''
    ]);

    res.status(201).json({ id: bookingId, message: 'Booking created successfully' });
  } catch (err) {
    console.error('POST /api/bookings error:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT update booking status
app.put('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Booking status updated successfully' });
  } catch (err) {
    console.error('PUT /api/bookings error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE booking
app.delete('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM bookings WHERE id = ?', [id]);
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/bookings error:', err);
    res.status(500).json({ error: err.message });
  }
});

// =============================================================================
// API ROUTES FOR USERS & AUTH
// =============================================================================

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC');
    const formatted = rows.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone || '',
      role: u.role,
      createdAt: u.created_at instanceof Date ? u.created_at.toISOString().split('T')[0] : u.created_at
    }));
    res.json(formatted);
  } catch (err) {
    console.error('GET /api/users error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST login user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (rows.length > 0) {
      const u = rows[0];
      res.json({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone || '',
        role: u.role,
        createdAt: u.created_at instanceof Date ? u.created_at.toISOString().split('T')[0] : u.created_at
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('POST /api/login error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST register user
app.post('/api/users', async (req, res) => {
  const { id, name, email, phone, password, role } = req.body;
  try {
    const userId = id || (role === 'admin' ? `admin-${Date.now()}` : `cust-${Date.now()}`);
    const query = 'INSERT INTO users (id, name, email, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)';
    await pool.query(query, [userId, name, email, password, phone || '', role || 'customer']);
    res.status(201).json({ id: userId, message: 'User registered successfully' });
  } catch (err) {
    console.error('POST /api/users error:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email is already registered' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT update user role
app.put('/api/users/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    res.json({ message: 'User role updated successfully' });
  } catch (err) {
    console.error('PUT /api/users/role error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/users error:', err);
    res.status(500).json({ error: err.message });
  }
});

// =============================================================================
// API ROUTES FOR PACKAGES (SERVICES)
// =============================================================================

// GET all packages
app.get('/api/packages', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM packages ORDER BY price ASC');
    const formatted = rows.map(p => ({
      id: p.id,
      name: p.name,
      displayPrice: p.display_price,
      price: Number(p.price),
      features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features,
      color: p.color || 'from-purple-500 to-indigo-500',
      image: p.image_url || '/images/standard.jpg',
      popular: Boolean(p.is_popular)
    }));
    res.json(formatted);
  } catch (err) {
    console.error('GET /api/packages error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST create package
app.post('/api/packages', async (req, res) => {
  const { id, name, displayPrice, price, features, color, image, popular } = req.body;
  try {
    const pkgId = id || `pkg-${Date.now()}`;
    const query = `
      INSERT INTO packages (id, name, display_price, price, features, color, image_url, is_popular)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.query(query, [
      pkgId, name, displayPrice, Number(price), JSON.stringify(features || []),
      color || 'from-purple-500 to-indigo-500', image || '/images/standard.jpg', popular ? 1 : 0
    ]);
    res.status(201).json({ id: pkgId, message: 'Package created successfully' });
  } catch (err) {
    console.error('POST /api/packages error:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT update package
app.put('/api/packages/:id', async (req, res) => {
  const { id } = req.params;
  const { name, displayPrice, price, features, color, image, popular } = req.body;
  try {
    const query = `
      UPDATE packages SET
        name = ?, display_price = ?, price = ?, features = ?, color = ?, image_url = ?, is_popular = ?
      WHERE id = ?
    `;
    await pool.query(query, [
      name, displayPrice, Number(price), JSON.stringify(features || []),
      color, image, popular ? 1 : 0, id
    ]);
    res.json({ message: 'Package updated successfully' });
  } catch (err) {
    console.error('PUT /api/packages error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE package
app.delete('/api/packages/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM packages WHERE id = ?', [id]);
    res.json({ message: 'Package deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/packages error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend API Server running on port ${PORT}`);
});
