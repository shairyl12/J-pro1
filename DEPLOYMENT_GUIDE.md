# 🚀 LIVE DEPLOYMENT GUIDE
# J-Pro Lights and Sounds Rentals - Online Booking System

This guide will walk you through putting your code on **GitHub** and hosting it for free on **Render**.

---

## 📦 PART 1: PREPARE YOUR FILES
Before uploading, ensure your project folder looks like this:
- `public/images/` (contains your logo and package pictures)
- `src/` (contains App.tsx)
- `package.json`
- `index.html`
- `vite.config.ts`

---

## 🐙 PART 2: PUSH TO GITHUB

### Step 1: Create a GitHub Account
If you don't have one, sign up at [github.com](https://github.com).

### Step 2: Create a New Repository
1. Click the **+** icon in the top right and select **New repository**.
2. **Repository name**: `jpro-booking-system`
3. Set it to **Public**.
4. Click **Create repository**.

### Step 3: Upload your code
You can use the **GitHub Desktop** app (easiest) or the command line:

**Using Command Line:**
1. Open your terminal/CMD inside your project folder.
2. Run these commands one by one:
```bash
git init
git add .
git commit -m "Initial commit - J-Pro System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jpro-booking-system.git
git push -u origin main
```
*(Replace YOUR_USERNAME with your actual GitHub username)*

---

## 🌐 PART 3: DEPLOY LIVE ON RENDER.COM

Render is a free platform that will host your website live.

### Step 1: Create a Render Account
1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Sign up using your **GitHub** account (this is faster).

### Step 2: Create a New Static Site
1. Click the **New +** button and select **Static Site**.
2. Connect your GitHub account if prompted.
3. Select your repository: `jpro-booking-system`.

### Step 3: Configure Build Settings
Render will ask for these exact settings. Make sure they match:

- **Name**: `jpro-rentals` (or any name)
- **Runtime**: `Static Site`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### Step 4: Deploy
1. Click **Create Static Site**.
2. Render will start "building" your site. This takes about 1-2 minutes.
3. Once finished, you will see a link like: `https://jpro-rentals.onrender.com`

---

## 🛠️ PART 4: FIXING THE "PAGE NOT FOUND" (404) ON REFRESH
Since this is a React app, you need to tell Render to redirect all traffic to `index.html`.

1. In your Render Dashboard, go to your site.
2. Click **Redirects/Rewrites** on the left menu.
3. Click **Add Rule**.
4. **Source**: `/*`
5. **Destination**: `/index.html`
6. **Action**: `Rewrite`
7. Click **Save Changes**.

---

## ✅ FINAL CHECKLIST
- [ ] Code is pushed to GitHub.
- [ ] Render is connected to GitHub.
- [ ] Build command is `npm run build`.
- [ ] Publish directory is `dist`.
- [ ] Redirect rule is added (to prevent 404 errors).

---

## 💡 PRO TIP: UPDATING YOUR LIVE SITE
Whenever you want to change your prices or images:
1. Edit the code on your computer.
2. Save and **Push** the changes to GitHub.
3. **Render will automatically detect the change and update your live website!**
