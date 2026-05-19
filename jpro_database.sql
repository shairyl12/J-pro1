-- =============================================================================
-- J-PRO LIGHTS AND SOUNDS RENTALS
-- MYSQL DATABASE SETUP SCRIPT (For MySQL Workbench)
-- =============================================================================

CREATE DATABASE IF NOT EXISTS jpro_booking_system;
USE jpro_booking_system;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role ENUM('admin', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- 2. PACKAGES TABLE
CREATE TABLE IF NOT EXISTS packages (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    display_price VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    features JSON,
    color VARCHAR(100),
    image_url MEDIUMTEXT,
    is_popular BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    event_type VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    venue TEXT NOT NULL,
    package_id VARCHAR(50),
    package_name VARCHAR(255) NOT NULL,
    package_price DECIMAL(10,2) NOT NULL,
    payment_method ENUM('Cash', 'GCash', 'Bank Transfer', 'PayMaya') DEFAULT 'Cash',
    is_rush BOOLEAN DEFAULT FALSE,
    rush_fee DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    notes TEXT,
    status ENUM('pending', 'approved', 'rejected', 'completed', 'cancelled') DEFAULT 'pending',
    admin_notes TEXT,
    approved_by VARCHAR(50),
    approved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL,
    INDEX idx_customer_id (customer_id),
    INDEX idx_event_date (event_date),
    INDEX idx_status (status)
);

-- 4. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('Cash', 'GCash', 'Bank Transfer', 'PayMaya') NOT NULL,
    payment_status ENUM('pending', 'partial', 'paid', 'refunded') DEFAULT 'pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reference_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_booking_id (booking_id),
    INDEX idx_payment_status (payment_status)
);

-- 5. EVENT TYPES TABLE
CREATE TABLE IF NOT EXISTS event_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. EQUIPMENT TABLE
CREATE TABLE IF NOT EXISTS equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    quantity INT NOT NULL DEFAULT 0,
    available_quantity INT NOT NULL DEFAULT 0,
    rental_price DECIMAL(10,2),
    image_url VARCHAR(500),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 7. SCHEDULE TABLE
CREATE TABLE IF NOT EXISTS schedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(50) NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    venue TEXT NOT NULL,
    event_type VARCHAR(100),
    customer_name VARCHAR(255),
    package_name VARCHAR(255),
    status ENUM('scheduled', 'in_progress', 'completed', 'cancelled') DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_event_date (event_date),
    INDEX idx_status (status)
);

-- 8. ACTIVITY LOG TABLE
CREATE TABLE IF NOT EXISTS activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50),
    action VARCHAR(100) NOT NULL,
    table_affected VARCHAR(100),
    record_id VARCHAR(50),
    details TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);

-- 9. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    notification_type ENUM('booking', 'payment', 'system', 'reminder') DEFAULT 'system',
    related_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read)
);

-- =============================================================================
-- INSERT DEFAULT DATA
-- =============================================

-- Default Users
INSERT IGNORE INTO users (id, name, email, password, phone, role)
VALUES 
('admin-001', 'Administrator', 'admin@jpro.com', 'admin123', '09123456789', 'admin'),
('cust-001', 'Test Customer', 'customer@test.com', 'test123', '09171234567', 'customer');

-- Default Packages
INSERT IGNORE INTO packages (id, name, display_price, price, features, color, is_popular, image_url)
VALUES 
('basic', 'Basic Package', '₱5,000', 5000.00, '["2 Speakers", "1 Mixer", "2 Microphones", "Basic Lighting", "4 Hours Service"]', 'from-blue-500 to-cyan-500', FALSE, '/images/basic.jpg'),
('standard', 'Standard Package', '₱10,000', 10000.00, '["4 Speakers", "1 Mixer", "4 Microphones", "LED Par Lights", "DJ Equipment", "6 Hours Service"]', 'from-purple-500 to-pink-500', TRUE, '/images/standard.jpg'),
('premium', 'Premium Package', '₱20,000', 20000.00, '["6 Speakers", "2 Subwoofers", "Professional Mixer", "Wireless Microphones", "Moving Head Lights", "Fog Machine", "Full Day Service"]', 'from-yellow-500 to-orange-500', FALSE, '/images/premium.jpg');

-- Default Event Types
INSERT IGNORE INTO event_types (name, description)
VALUES 
('Wedding', 'Wedding ceremonies and receptions'),
('Birthday Party', 'Birthday celebrations'),
('Corporate Event', 'Business meetings and conferences'),
('Concert', 'Live music performances'),
('Graduation', 'Graduation ceremonies'),
('Reunion', 'Family or class reunions'),
('Product Launch', 'Product unveiling events'),
('Fiesta', 'Philippine fiesta celebrations'),
('Other', 'Other types of events');

-- Sample Bookings
INSERT IGNORE INTO bookings (id, customer_id, customer_name, customer_email, customer_phone, event_type, event_date, event_time, venue, package_id, package_name, package_price, payment_method, is_rush, rush_fee, total_amount, notes, status)
VALUES 
('BK001', 'cust-001', 'Juan Dela Cruz', 'juan@email.com', '09171234567', 'Wedding', '2025-02-15', '14:00:00', 'Grand Ballroom, Manila Hotel', 'premium', 'Premium Package', 20000.00, 'GCash', FALSE, 0.00, 20000.00, 'Please bring extra microphones for the ceremony', 'approved'),
('BK002', 'cust-001', 'Maria Santos', 'maria@email.com', '09181234567', 'Birthday Party', '2025-02-20', '18:00:00', 'Quezon City Sports Club', 'standard', 'Standard Package', 10000.00, 'Cash', FALSE, 0.00, 10000.00, 'Kids party with DJ needed', 'pending'),
('BK003', 'cust-001', 'Pedro Reyes', 'pedro@email.com', '09191234567', 'Corporate Event', '2025-02-25', '09:00:00', 'SMX Convention Center', 'premium', 'Premium Package', 20000.00, 'Bank Transfer', TRUE, 2000.00, 22000.00, 'Annual company meeting', 'pending');

SELECT '✅ J-Pro MySQL Database Setup Complete!' AS message;
