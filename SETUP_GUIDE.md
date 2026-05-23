# 🚀 Quick Setup Guide

Follow these steps to get your portfolio running locally and deploy it.

## Prerequisites
- Node.js (v14+)
- Git
- Gmail account (for contact form)

---

## 📥 Local Development Setup

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Backend Email

1. Get Gmail App Password:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Factor Authentication (if not enabled)
   - Go to "App passwords"
   - Select Mail & Windows Computer
   - Copy the generated password

2. Update `.env` file in `backend/`:
   ```env
   PORT=5000
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=paste-app-password-here
   NODE_ENV=development
   ```

### Step 3: Update Portfolio Content

Edit `frontend/src/data/portfolioData.js`:
- Change name, email, location
- Update GitHub username
- Add/update projects
- Update skills and education
- Update social links

### Step 4: Run Locally

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Step 5: Test Contact Form

1. Go to Contact section
2. Fill in the form with test data
3. Click Send
4. Check your Gmail inbox for the message
5. Check browser console for any errors

---

## 🏗️ Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

This creates a `dist/` folder with optimized production files.

### Backend Preparation

1. Update `.env`:
   ```env
   NODE_ENV=production
   PORT=5000
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   ```

2. Backend automatically serves the frontend in production mode.

---

## 🌐 Deployment Options

### Option 1: Deploy to Vercel (Frontend) + Render (Backend)

**Frontend on Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

**Backend on Render:**
1. Push your code to GitHub
2. Create account on [render.com](https://render.com)
3. New → Web Service
4. Connect your GitHub repo
5. Set environment variables in dashboard:
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `NODE_ENV=production`
6. Deploy

### Option 2: Deploy Both to Vercel (Recommended)

```bash
# Build frontend
cd frontend
npm run build

# Deploy to Vercel
vercel --prod
```

For backend, use serverless functions or deploy to Render/Railway/Heroku.

### Option 3: Single Server Deployment (Railway/Render)

1. Backend serves both API and frontend
2. Push entire Portfolio folder to GitHub
3. Deploy to Railway or Render
4. Set `NODE_ENV=production`
5. Configure environment variables

---

## 🔍 Troubleshooting

### Email not sending
- ✅ Check `.env` has correct EMAIL_USER and EMAIL_PASS
- ✅ Use App Password, not regular Gmail password
- ✅ Check Gmail security allows "Less secure apps"
- ✅ Backend terminal should show email config status

### CORS errors
- ✅ Backend must be running on http://localhost:5000
- ✅ Frontend proxies to backend automatically in dev mode
- ✅ In production, backend serves frontend directly

### Form validation errors
- ✅ Name: 2-100 characters
- ✅ Email: valid format (e.g., user@domain.com)
- ✅ Message: 5-5000 characters
- ✅ Subject (optional): max 200 characters

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## 📱 Testing Checklist

- [ ] Contact form sends message successfully
- [ ] Validation errors display correctly
- [ ] Email received in inbox
- [ ] Form clears after successful submission
- [ ] Error state shows when backend is down
- [ ] Responsive design works on mobile
- [ ] All projects link work
- [ ] GitHub/LinkedIn links open correctly
- [ ] Animations load smoothly
- [ ] No console errors

---

## 🔐 Security Checklist

- [ ] `.env` file is in `.gitignore` (never commit secrets)
- [ ] Email app password is used, not regular password
- [ ] `NODE_ENV=production` in production
- [ ] HTTPS enabled on all domains
- [ ] Rate limiting active (100 requests/15 min)
- [ ] Payload size limited (10KB)
- [ ] No sensitive data in error messages

---

## 📞 Support

If you encounter issues:
1. Check [FIXES_SUMMARY.md](FIXES_SUMMARY.md) for known issues
2. Review error messages in browser console
3. Check backend logs in terminal
4. Verify `.env` configuration
5. Ensure both servers are running on correct ports

---

## 🎯 Next Steps

1. ✅ Setup complete - test locally
2. 🔧 Customize portfolio content
3. 🚀 Build and deploy frontend
4. 🖥️ Deploy backend to server
5. 🎉 Share your portfolio!

