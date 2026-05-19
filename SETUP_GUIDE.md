# 📋 STEP-BY-STEP SETUP GUIDE
# J-Pro Lights and Sounds Rentals - Online Booking System

---

## 🎯 BEFORE YOU START

Make sure you have the following installed:
- [x] Node.js (Download from https://nodejs.org)
- [x] Any code editor (VS Code recommended: https://code.visualstudio.com)

---

## 📥 STEP 1: INSTALL NODE.JS

1. Go to https://nodejs.org
2. Download the **LTS version** (recommended)
3. Run the installer
4. Click "Next" through the installation
5. To verify installation, open Command Prompt/Terminal and type:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers displayed.

---

## 📂 STEP 2: EXTRACT PROJECT FILES

1. Extract the downloaded project zip file
2. Remember the folder location (e.g., `C:\Projects\jpro-booking`)

---

## 💻 STEP 3: OPEN COMMAND PROMPT/TERMINAL

### Windows:
- Press `Windows Key + R`
- Type `cmd` and press Enter

### Mac:
- Press `Command + Space`
- Type `terminal` and press Enter

---

## 📁 STEP 4: NAVIGATE TO PROJECT FOLDER

Type this command (replace with your actual folder path):

```bash
cd C:\Projects\jpro-booking
```

Or simply:
1. Open the project folder in File Explorer
2. Click on the address bar
3. Type `cmd` and press Enter

---

## 📦 STEP 5: INSTALL DEPENDENCIES

In the command prompt, type:

```bash
npm install
```

Wait for it to complete (may take 1-3 minutes).

---

## 🚀 STEP 6: START THE APPLICATION

Type:

```bash
npm run dev
```

You should see something like:
```
Local: http://localhost:5173/
```

---

## 🌐 STEP 7: OPEN IN BROWSER

1. Open your web browser (Chrome recommended)
2. Go to: http://localhost:5173
3. You should see the J-Pro booking system!

---

## 🎨 STEP 8: ADD YOUR LOGO (Optional)

1. Prepare your logo image:
   - Format: PNG with transparent background
   - Size: 200x200 pixels recommended
   - Name it: `logo.png`

2. Place it in:
   ```
   your-project-folder/public/images/logo.png
   ```

3. Refresh your browser to see the change

---

## 🖼️ STEP 9: ADD BACKGROUND IMAGE (Optional)

1. Prepare your background image:
   - Format: JPG
   - Size: 1920x1080 pixels recommended
   - Name it: `hero-bg.jpg`

2. Place it in:
   ```
   your-project-folder/public/images/hero-bg.jpg
   ```

## 📸 STEP 9.1: ADD PACKAGE IMAGES

To make your services look professional, add pictures for each package:

1. Prepare 3 images:
   - `basic.jpg` (Basic Package)
   - `standard.jpg` (Standard Package)
   - `premium.jpg` (Premium Package)

2. Place all three in the same folder:
   ```
   your-project-folder/public/images/
   ```

3. **IMPORTANT**: Open `src/App.tsx` in a text editor
4. Find this section (around line 100):
   ```javascript
   style={{
     // 🔴 Uncomment below line to use custom background image
     // backgroundImage: `url(${IMAGES.heroBg})`,
     // backgroundSize: 'cover',
     // backgroundPosition: 'center',
   }}
   ```
5. Remove the `//` to uncomment:
   ```javascript
   style={{
     backgroundImage: `url(${IMAGES.heroBg})`,
     backgroundSize: 'cover',
     backgroundPosition: 'center',
   }}
   ```

---

## ✏️ STEP 10: CUSTOMIZE BUSINESS INFORMATION

1. Open `src/App.tsx` in a text editor
2. Find `BUSINESS_INFO` (around line 10)
3. Edit the following:

```javascript
const BUSINESS_INFO = {
  name: 'Your Business Name',
  fullName: 'Your Full Business Name',
  phone: 'Your Phone Number',
  email: 'your@email.com',
  address: 'Your Address',
  hoursWeekday: 'Monday - Saturday: 8:00 AM - 8:00 PM',
  hoursWeekend: 'Sunday: By Appointment',
};
```

4. Save the file
5. Changes will appear automatically in the browser

---

## 💰 STEP 11: UPDATE PACKAGES AND PRICES

1. In `src/App.tsx`, find `PACKAGES` (around line 20)
2. Edit package details:

```javascript
const PACKAGES = [
  {
    id: 'basic',
    name: 'Basic Package',
    price: 5000,
    displayPrice: '₱5,000',
    features: ['2 Speakers', '1 Mixer', ...],
    color: 'from-blue-500 to-cyan-500',
  },
  // Add more packages as needed
];
```

---

## 🔑 STEP 12: LOGIN TO THE SYSTEM

### Admin Account:
- Email: `admin@jpro.com`
- Password: `admin123`

### Customer Account:
- Email: `customer@test.com`
- Password: `test123`

### Or Register New Account:
- Click "Register" in the navigation
- Fill out the form
- Login with your new credentials

---

## 🛠️ TROUBLESHOOTING

### Problem: "npm is not recognized"
**Solution:** Node.js is not installed properly. Reinstall Node.js.

### Problem: Port 5173 is already in use
**Solution:** Close other applications or press `y` when prompted to use another port.

### Problem: Changes not appearing
**Solution:** 
1. Save the file
2. Hard refresh browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

### Problem: White/blank page
**Solution:**
1. Check browser console (F12) for errors
2. Make sure all dependencies are installed: `npm install`

---

## 📱 HOW TO USE THE SYSTEM

### For Customers:
1. Register/Login
2. Click "Book Now"
3. Fill out the booking form
4. Submit and wait for approval
5. Check "My Bookings" for status

### For Admin:
1. Login with admin account
2. Go to "Manage Bookings"
3. Approve or reject pending bookings
4. View schedule on calendar
5. Check booking records

---

## 🚀 FOR PRODUCTION DEPLOYMENT

To build for production:

```bash
npm run build
```

This creates a `dist` folder with ready-to-upload files.

Upload the contents of `dist` folder to your web hosting.

---

## 📞 NEED HELP?

If you encounter issues:
1. Check this guide again
2. Make sure Node.js is installed correctly
3. Try deleting `node_modules` folder and running `npm install` again

---

## ✅ QUICK CHECKLIST

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] Server running (`npm run dev`)
- [ ] Website accessible at http://localhost:5173
- [ ] Can login with demo accounts
- [ ] Logo added (optional)
- [ ] Background image added (optional)
- [ ] Business info customized
- [ ] Packages/prices updated

---

**🎉 Congratulations! Your booking system is ready to use!**
