# J-Pro Lights and Sounds Rentals - Online Booking System

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [System Requirements](#system-requirements)
3. [Installation Steps](#installation-steps)
4. [Customization Guide](#customization-guide)
5. [Demo Accounts](#demo-accounts)
6. [Features](#features)
7. [File Structure](#file-structure)

---

## 🎯 Project Overview

This is an online booking and reservation system for J-Pro Lights and Sounds Rentals. The system allows customers to book lights and sound equipment for events, while administrators can manage and approve reservations.

---

## 💻 System Requirements

- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Modern web browser (Chrome, Firefox, Edge)

---

## 📥 Installation Steps

### Step 1: Extract the Project
```
Extract the project files to your desired folder
```

### Step 2: Open Terminal/Command Prompt
```
Navigate to the project folder using cd command
Example: cd jpro-booking-system
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Start the Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
```
The system will be available at: http://localhost:5173
```

---

## 🎨 Customization Guide

### Adding Your Logo
1. **Location**: `public/images/`
2. **File name**: `logo.png`
3. **Recommended size**: 200x200 pixels (PNG with transparent background)
4. **How to add**:
   - Place your logo file in `public/images/logo.png`
   - The system will automatically display it

### Adding Background Image
1. **Location**: `public/images/`
2. **File name**: `hero-bg.jpg`
3. **Recommended size**: 1920x1080 pixels
4. **How to add**:
   - Place your background image in `public/images/hero-bg.jpg`
   - The system will automatically use it on the homepage

### Changing Business Information
1. **File to edit**: `src/App.tsx`
2. **Search for**: `BUSINESS_INFO`
3. **Update the following**:
   - Business name
   - Phone number
   - Email address
   - Address/location
   - Business hours

### Changing Package Prices
1. **File to edit**: `src/App.tsx`
2. **Search for**: `PACKAGES`
3. **Update**: Package names, prices, and included features

---

## 🔑 Demo Accounts

### Admin Account
- **Email**: admin@jpro.com
- **Password**: admin123
- **Access**: Full system management

### Customer Account
- Register a new account through the registration page
- Or use the following test account:
  - **Email**: customer@test.com
  - **Password**: test123

---

## ✨ Features

### For Customers:
- ✅ User Registration and Login
- ✅ Online Booking/Reservation
- ✅ View Booking Status
- ✅ Booking History

### For Administrators:
- ✅ Dashboard with Statistics
- ✅ Approve/Reject Bookings
- ✅ View Calendar Schedule
- ✅ Booking Records Management
- ✅ Customer Management

---

## 📁 File Structure

```
jpro-booking-system/
├── public/
│   └── images/          ← PUT YOUR IMAGES HERE
│       ├── logo.png     ← Your logo (replace)
│       ├── hero-bg.jpg  ← Your background (replace)
│       ├── basic.jpg    ← Image for Basic Package
│       ├── standard.jpg ← Image for Standard Package
│       └── premium.jpg  ← Image for Premium Package
├── src/
│   ├── App.tsx          ← Main application code
│   ├── index.css        ← Styles
│   └── main.tsx         ← Entry point
├── index.html           ← HTML template
├── package.json         ← Dependencies
└── README.md            ← This file
```

---

## 📞 Support

For questions or issues, contact:
- **Developer**: [Your Name]
- **Email**: [Your Email]

---

## 📝 Notes

- All booking data is stored in the browser's localStorage
- To reset data, clear browser cache or use browser dev tools
- The system works offline after initial load
- For production deployment, consider using a database backend
