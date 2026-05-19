# 📘 USER MANUAL
# J-Pro Lights and Sounds Rentals - Online Booking System

---

## 📑 TABLE OF CONTENTS

1. [Getting Started](#-getting-started)
2. [Customer Guide](#-customer-guide)
3. [Admin Guide](#-admin-guide)
4. [Frequently Asked Questions](#-frequently-asked-questions)

---

## 🚀 GETTING STARTED

### System Requirements
- Internet connection
- Modern web browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled

### Accessing the System
1. Open your web browser
2. Enter the website URL
3. You will see the homepage

---

## 👤 CUSTOMER GUIDE

### 📝 Registering an Account

**Step 1:** Click the **"Register"** button in the navigation bar

**Step 2:** Fill out the registration form:
- Full Name
- Email Address
- Phone Number
- Password (minimum 6 characters)
- Confirm Password

**Step 3:** Click **"Create Account"**

**Step 4:** You will be redirected to the login page

---

### 🔐 Logging In

**Step 1:** Click the **"Login"** button in the navigation bar

**Step 2:** Enter your:
- Email address
- Password

**Step 3:** Click **"Sign In"**

**Step 4:** You will be redirected to your Customer Dashboard

---

### 📅 Making a Booking

**Step 1:** From your dashboard, click **"New Booking"** or **"Book Now"**

**Step 2:** Fill out the booking form:

| Field | Description |
|-------|-------------|
| Event Type | Select your event type (Wedding, Birthday, etc.) |
| Package | Choose your preferred package |
| Event Date | Select the date of your event |
| Event Time | Enter the start time |
| Venue | Enter the complete address |
| Notes | Add any special requests (optional) |

**Step 3:** Click **"Submit Booking"**

**Step 4:** Wait for confirmation message

**Step 5:** Your booking status will be **"Pending"** until approved

---

### 📋 Viewing Your Bookings

**Step 1:** Click **"Dashboard"** in the navigation bar

**Step 2:** Click **"My Bookings"**

**Step 3:** You will see all your bookings with:
- Booking ID
- Event Type
- Event Date
- Package
- Status

### Understanding Booking Status

| Status | Meaning | Color |
|--------|---------|-------|
| ⏳ Pending | Waiting for admin approval | Yellow |
| ✅ Approved | Booking confirmed | Green |
| ❌ Rejected | Booking declined | Red |
| ✔️ Completed | Event finished | Blue |

---

### 📦 Viewing Packages

**Step 1:** Click **"Services"** in the navigation bar

**Step 2:** Browse available packages and prices

**Step 3:** Review included features for each package

---

## 👨‍💼 ADMIN GUIDE

### 🔐 Admin Login

**Step 1:** Click **"Login"** button

**Step 2:** Enter admin credentials:
- Email: `admin@jpro.com`
- Password: `admin123`

**Step 3:** Click **"Sign In"**

---

### 📊 Admin Dashboard Overview

The admin dashboard shows:
- **Total Bookings** - All bookings in the system
- **Pending** - Bookings waiting for approval
- **Approved** - Confirmed bookings
- **Completed** - Finished events
- **Rejected** - Declined bookings
- **Customers** - Number of registered customers
- **Revenue** - Total approved/completed earnings

---

### ✅ Managing Bookings

**Step 1:** Click **"Manage Bookings"** from the dashboard

**Step 2:** Use filter buttons to view:
- All bookings
- Pending only
- Approved only
- Rejected only
- Completed only

**Step 3:** For pending bookings, choose action:

| Action | Button | Result |
|--------|--------|--------|
| Approve | ✅ Approve | Confirms the booking |
| Reject | ❌ Reject | Declines the booking |

**Step 4:** For approved bookings:
- Click **"✔️ Mark Completed"** after the event

---

### 📅 Viewing Schedule

**Step 1:** Click **"View Schedule"** from the dashboard

**Step 2:** Use arrow buttons to navigate months

**Step 3:** Days with bookings are highlighted in purple

**Step 4:** Click on a day to see:
- Event time
- Event type
- Customer name
- Venue
- Package

---

### 📊 Viewing Booking Records

**Step 1:** Click **"Booking Records"** from the dashboard

**Step 2:** Use the search bar to find specific bookings:
- By customer name
- By booking ID
- By event type

**Step 3:** Use the status filter dropdown

**Step 4:** View complete booking details in the table

---

### 👥 User Roles & Accounts Management

As an administrator, you have full control over user accounts and roles.

**Step 1:** Click **"User Roles & Accounts"** from the Admin Dashboard

**Step 2:** Search for users by name, email, or ID

**Step 3:** Use role filter buttons (**All**, **Admins**, **Customers**) to filter the list

**Step 4:** Perform account actions:
- **Switch Role:** Instantly promote a customer to Administrator, or demote an admin to Customer.
- **Delete Account:** Remove inactive or duplicate accounts. Note: The primary default administrator (`admin-001`) is protected against deletion or role changes.
- **Add New Account:** Click **"➕ Add New Account"** to directly register a new Administrator or Customer with complete details.

---

## ❓ FREQUENTLY ASKED QUESTIONS

### For Customers

**Q: How do I know if my booking is approved?**
A: Check "My Bookings" in your dashboard. The status will change from "Pending" to "Approved".

**Q: Can I cancel my booking?**
A: Contact the admin directly to request cancellation.

**Q: How do I change my booking details?**
A: Contact the admin to request changes.

**Q: What if I forgot my password?**
A: Contact the admin to reset your password.

---

### For Admin

**Q: How do I add a new admin?**
A: Access the database and add a user with role "admin".

**Q: How do I reset the system data?**
A: Clear browser localStorage or delete the data from the database.

**Q: Can I export booking records?**
A: Currently, you can copy data from the Booking Records page.

---

## 🔧 CUSTOMIZATION REFERENCE

### Changing Business Information
File: `src/App.tsx`
Section: `BUSINESS_INFO`

### Changing Packages/Prices
File: `src/App.tsx`
Section: `PACKAGES`

### Adding Event Types
File: `src/App.tsx`
Section: `EVENT_TYPES`

### Adding Logo
Path: `public/images/logo.png`

### Adding Background
Path: `public/images/hero-bg.jpg`

---

## 📞 SUPPORT CONTACTS

| Support Type | Contact |
|--------------|---------|
| Technical Issues | [Your Email] |
| Business Inquiries | [Your Phone] |
| General Questions | [Your Email] |

---

## 📝 NOTES

- All data is stored locally in the browser
- Clearing browser data will reset the system
- For production use, consider adding a database backend
- Regular backups of booking data are recommended

---

**Last Updated: January 2025**
**Version: 1.0**
