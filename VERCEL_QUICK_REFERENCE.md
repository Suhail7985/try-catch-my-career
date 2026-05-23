# ⚡ Quick Deployment Reference

Fast reference for deploying your portfolio to Vercel.

---

## 🎯 5-Minute Quick Start

### **Step 1: Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### **Step 2: Go to Vercel**
Visit https://vercel.com and click "New Project"

### **Step 3: Import Repository**
- Select your portfolio GitHub repository
- Click "Import"

### **Step 4: Add Environment Variables**
In Vercel Dashboard → Settings → Environment Variables:

```
EMAIL_USER       =  your-email@gmail.com
EMAIL_PASS       =  your-app-password
NODE_ENV         =  production
VITE_API_URL     =  /api
```

### **Step 5: Deploy**
Click "Deploy" button and wait 2-5 minutes

### **Step 6: Done! 🎉**
Your site is live at `https://[project-name].vercel.app`

---

## 📝 Environment Variables to Set

| Variable | Value | Example |
|----------|-------|---------|
| `EMAIL_USER` | Your Gmail | `your-email@gmail.com` |
| `EMAIL_PASS` | Gmail App Password* | `xxxx xxxx xxxx xxxx` |
| `NODE_ENV` | `production` | `production` |
| `VITE_API_URL` | `/api` | `/api` |

*Get App Password: https://myaccount.google.com/apppasswords

---

## 🔧 Vercel CLI Quick Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from current directory
vercel

# Deploy to production
vercel --prod

# Show project info
vercel projects ls

# View deployment logs
vercel logs [url]
```

---

## 📂 Vercel Config Files

### Root: `vercel.json`
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

### Backend: `backend/vercel.json`
```json
{
  "buildCommand": "npm install",
  "env": { "NODE_ENV": "production" },
  "functions": { "server.js": { "memory": 1024 } }
}
```

### Frontend: `frontend/vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

---

## ✅ Pre-Deployment Checklist

- [ ] All changes committed to Git
- [ ] `.env` is in `.gitignore` (not committed)
- [ ] GitHub repository is public
- [ ] Gmail App Password generated
- [ ] Frontend builds locally (`npm run build`)
- [ ] Backend starts locally (`npm run dev`)
- [ ] Vercel account created

---

## 🧪 Test After Deployment

```bash
# Test API health
curl https://your-portfolio.vercel.app/api/health

# Expected response:
# {"status":"UP","message":"Portfolio API is running"}

# Test contact form
# 1. Go to contact section
# 2. Fill and submit form
# 3. Check email inbox
```

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| **Build failed** | Check Vercel logs, ensure `npm install` works locally |
| **API not responding** | Verify EMAIL_USER/EMAIL_PASS in Vercel dashboard |
| **Contact form not sending** | Check browser console, verify email credentials |
| **Frontend not loading** | Verify `npm run build` works, check build logs |
| **CORS errors** | Verify VITE_API_URL=/api in environment variables |

---

## 🔗 Important Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Gmail App Password**: https://myaccount.google.com/apppasswords
- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support

---

## 🎯 After First Deployment

**Auto-redeploy on Git push:**
- Any push to main branch auto-deploys
- Vercel watches your GitHub repository

**Manual redeploy:**
```bash
vercel --prod
```

**Custom domain:**
1. Buy domain
2. Add to Vercel dashboard
3. Update DNS settings
4. Wait 24 hours for SSL

---

## 💰 Vercel Pricing

- **Free**: Perfect for portfolios (10 GB bandwidth, unlimited deployments)
- **Pro**: $20/month (for more features)
- **Enterprise**: Custom pricing

---

## 🚀 You're Ready!

Your portfolio is configured for Vercel. Follow the 5-minute quick start above and your site will be live! 

Questions? Check [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

