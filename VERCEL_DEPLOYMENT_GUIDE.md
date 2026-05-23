# 🚀 Vercel Deployment Guide

Complete instructions for deploying your portfolio to Vercel.

---

## 📋 Prerequisites

- ✅ Vercel account ([create one free](https://vercel.com/signup))
- ✅ GitHub account with your portfolio repository
- ✅ Git installed and repository initialized
- ✅ All environment variables configured

---

## 📁 Vercel Configuration Files Created

Your project now has three Vercel configuration files:

### **1. Root `vercel.json`** (Main Configuration)
```json
{
  "builds": [
    { "src": "backend/server.js", "use": "@vercel/node" },
    { "src": "frontend/package.json", "use": "@vercel/static-build" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "backend/server.js" },
    { "src": "/(.*)", "dest": "frontend/dist/index.html" }
  ]
}
```
- Handles both backend API and frontend static files
- Routes `/api/*` requests to the Express backend
- Routes all other requests to the React frontend

### **2. `backend/vercel.json`**
- Configures Node.js runtime
- Sets environment variables
- Defines function memory and timeout

### **3. `frontend/vercel.json`**
- Configures Vite build process
- Sets output directory to `dist`
- Configures environment variables

---

## 🔧 Step 1: Prepare Your Project

### 1. Update `.gitignore` (if needed)
Ensure these are ignored:
```
.env
.env.local
node_modules/
dist/
```

### 2. Commit all changes to Git
```bash
git add .
git commit -m "Add Vercel configuration and deployment setup"
git push origin main
```

### 3. Verify `.env` files are in `.gitignore`
```bash
# Check if .env is ignored
git check-ignore -v backend/.env
```

---

## 🌐 Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI (Recommended)

**1. Install Vercel CLI:**
```bash
npm install -g vercel
```

**2. Authenticate with Vercel:**
```bash
vercel login
```

**3. Deploy your project:**
```bash
cd your-portfolio-folder
vercel
```

**4. Follow the prompts:**
```
? Set up and deploy "~/Portfolio"? [Y/n] y
? Which scope do you want to deploy to? (your-username)
? Link to existing project? [y/N] n
? What's your project's name? portfolio
? In which directory is your code located? ./
? Want to override the settings? [y/N] n
```

### Option B: Deploy via GitHub Integration (Recommended for Future Deploys)

**1. Go to [vercel.com](https://vercel.com)**

**2. Click "New Project"**

**3. Import your GitHub repository**
- Select your portfolio repository
- Vercel will auto-detect your configuration

**4. Configure environment variables:**
- Click "Environment Variables"
- Add these variables:
  ```
  EMAIL_USER = your-email@gmail.com
  EMAIL_PASS = your-app-password
  NODE_ENV = production
  VITE_API_URL = /api
  ```

**5. Click "Deploy"**

---

## ⚙️ Step 3: Configure Environment Variables

### In Vercel Dashboard:

1. Go to your project → Settings → Environment Variables

2. Add for **Production**:
   ```
   EMAIL_USER       your-email@gmail.com
   EMAIL_PASS       your-app-password
   NODE_ENV         production
   VITE_API_URL     /api
   ```

3. Add for **Preview** (optional):
   ```
   NODE_ENV         preview
   ```

### ⚠️ Important: Email Credentials
- Use **App Password** from Gmail, not your regular password
- Get it here: https://myaccount.google.com/apppasswords
- Never commit `.env` files to Git

---

## 📝 Step 4: Configure Deployment Settings

### In Vercel Dashboard → Settings:

**Build Settings:**
```
Framework Preset: Other
Build Command: npm run build (runs in frontend/)
Output Directory: dist (from frontend/)
Install Command: npm install
```

**Root Directory:**
```
Keep as: ./
```

**Node.js Version:**
```
18.x or higher
```

---

## 🧪 Step 5: Test Your Deployment

### 1. Wait for Deployment to Complete
- Vercel will show status of build
- Usually takes 2-5 minutes

### 2. Visit Your Live Site
- Vercel provides a URL like: `https://portfolio-xxx.vercel.app`
- Click the link to view your site

### 3. Test Contact Form
- Navigate to Contact section
- Fill in the form
- Click Send
- Verify email is received

### 4. Check Browser Console
- Open DevTools (F12)
- Check Console tab for errors
- Should show no errors if deployment successful

### 5. Test API Endpoints
```bash
# Test health check
curl https://your-portfolio.vercel.app/api/health

# Response should be:
{"status": "UP", "message": "Portfolio API is running"}
```

---

## 🚀 Step 6: Set Custom Domain (Optional)

### In Vercel Dashboard → Settings → Domains:

**1. Add Custom Domain**
- Click "Add Domain"
- Enter your domain (e.g., `myportfolio.com`)

**2. Update DNS Records**
- Follow Vercel's DNS instructions
- Add CNAME or A records to your domain registrar

**3. SSL Certificate**
- Vercel auto-provisions free SSL (HTTPS)
- Usually ready in 24 hours

---

## 📊 File Structure for Deployment

```
Portfolio/
├── vercel.json                    # Main Vercel config
├── backend/
│   ├── vercel.json               # Backend config
│   ├── server.js                 # Entry point
│   ├── package.json              # Backend dependencies
│   ├── controllers/
│   ├── routes/
│   └── .env                       # NOT committed (add to Vercel dashboard)
├── frontend/
│   ├── vercel.json               # Frontend config
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js
│   ├── src/
│   └── dist/                      # Auto-generated by build
└── .gitignore                     # Ensures .env is ignored
```

---

## ✅ Deployment Checklist

Before deploying:
- [ ] `.env` files are in `.gitignore`
- [ ] All code is committed to Git
- [ ] GitHub repository is created and pushed
- [ ] Vercel account is set up
- [ ] Environment variables are prepared
- [ ] Email credentials are ready
- [ ] Frontend builds locally: `npm run build`
- [ ] Backend runs locally: `npm run dev`

After deployment:
- [ ] Site loads successfully
- [ ] Contact form works
- [ ] API endpoints respond
- [ ] No console errors
- [ ] Responsive design works on mobile
- [ ] All links work

---

## 🔍 Troubleshooting

### **Build Failed**

**Error: Module not found**
```bash
# Solution: Install missing dependencies
cd backend && npm install
cd ../frontend && npm install
```

**Error: Cannot find vercel.json**
```
Solution: Ensure vercel.json files are in correct locations:
- /Portfolio/vercel.json (root)
- /Portfolio/backend/vercel.json
- /Portfolio/frontend/vercel.json
```

### **API Not Responding**

**Check Vercel Logs:**
1. Go to Deployments → Latest → Logs
2. Look for error messages
3. Check if EMAIL_USER and EMAIL_PASS are set

**Test Endpoint:**
```bash
curl https://your-portfolio.vercel.app/api/health
```

### **Contact Form Not Sending**

**Check:**
1. ✅ EMAIL_USER set in Vercel
2. ✅ EMAIL_PASS using App Password
3. ✅ Backend environment variables configured
4. ✅ Check browser console for errors
5. ✅ Check Vercel Function Logs for backend errors

### **Frontend Not Loading**

**Check:**
1. ✅ Frontend builds locally
2. ✅ dist/ folder is generated
3. ✅ Check Vercel build logs for errors
4. ✅ Verify vite.config.js is correct

### **CORS/API Connection Issues**

**Solution:**
1. Verify VITE_API_URL is set to `/api`
2. Check that routes in vercel.json are correct
3. Frontend and backend should be on same domain

---

## 📈 Monitor Your Deployment

### In Vercel Dashboard:

**Deployments Tab:**
- See all deployment history
- Rollback to previous versions
- View build logs

**Analytics Tab:**
- Track page views
- Monitor performance
- View error logs

**Settings Tab:**
- Manage environment variables
- Configure custom domains
- Set Git branch to deploy

---

## 🔄 Redeploying After Changes

### Automatic Deployment
```
Any push to main branch → Auto-deploys
```

### Manual Redeployment
```bash
git push origin main
# or
vercel --prod
```

### Rollback to Previous Version
1. Go to Deployments
2. Click the previous deployment
3. Click "Redeploy"

---

## 💡 Pro Tips

1. **Preview Deployments**
   - Non-main branches create preview URLs
   - Test changes before merging to main

2. **Environment Variables**
   - Different values for Production vs Preview
   - Never expose sensitive data in code

3. **Performance**
   - Check Analytics for slow pages
   - Use Vercel Analytics integration

4. **Logs**
   - Always check Function Logs if issues occur
   - Helpful for debugging API problems

5. **SSL Certificate**
   - Free auto-renewal every 3 months
   - Check Vercel dashboard for status

---

## 🎯 Your Deployment URL

After deployment, your portfolio will be live at:
```
https://[project-name].vercel.app
```

Or your custom domain:
```
https://your-domain.com
```

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Common Issues**: https://vercel.com/docs/errors
- **Support**: https://vercel.com/support

---

## 🎉 Next Steps

1. ✅ Set up Vercel account
2. ✅ Connect GitHub repository
3. ✅ Configure environment variables
4. ✅ Deploy!
5. ✅ Share your live portfolio
6. ✅ Monitor and maintain

Your portfolio is ready to go live! 🚀

