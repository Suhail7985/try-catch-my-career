# 🎨 Personal Portfolio Website

A modern, full-stack portfolio website showcasing projects, skills, education, and professional profiles. Built with React, Vite, and Node.js, featuring smooth animations, responsive design, and a contact form with email integration.

![Portfolio Preview](https://img.shields.io/badge/React-19.2-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express%205-green) ![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen) ![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-cyan)

---

## ✨ Features

### Frontend
- **🎭 Smooth Animations**: Cursor glow effects, scroll reveals, and typewriter animations
- **⚡ Performance Optimized**: Lazy loading sections, deferred image loading, code splitting
- **📱 Fully Responsive**: Mobile-first design with Tailwind CSS
- **🌐 Smooth Scrolling**: Lenis scroll integration for enhanced UX
- **🎨 Modern UI Components**: Glass cards, section shells, custom styled components
- **🔗 Integrated Profiles**: GitHub stats, LeetCode profile, LinkedIn, and social links
- **📧 Contact Form**: Email submission with toast notifications

### Backend
- **🔐 Security**: Helmet.js for HTTP headers, CORS configuration, rate limiting
- **⚙️ Production Ready**: Environment-based configuration, health check endpoint
- **📧 Email Integration**: Nodemailer with Gmail SMTP for contact messages
- **🛡️ Rate Limiting**: API protection with 100 requests per 15 minutes per IP
- **🚀 Scalable**: Express.js with MongoDB support

---

## 🏗️ Project Structure

```
Portfolio/
├── backend/                          # Express.js API server
│   ├── controllers/
│   │   └── contactController.js     # Email handler
│   ├── routes/
│   │   └── contactRoutes.js         # Contact endpoint
│   ├── server.js                    # Express app setup
│   ├── package.json
│   └── .env                         # Environment variables (not committed)
│
├── frontend/                         # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── animations/          # Loading screen, cursor glow, scroll reveal
│   │   │   ├── layout/              # Navbar, footer
│   │   │   ├── sections/            # Hero, about, skills, projects, etc.
│   │   │   └── ui/                  # Reusable UI components
│   │   ├── context/                 # ThemeContext for dark/light mode
│   │   ├── data/                    # portfolioData.js (site content)
│   │   ├── hooks/                   # Custom hooks (Lenis scroll, media queries)
│   │   ├── api/                     # API client (axios)
│   │   ├── App.jsx                  # Main app component
│   │   └── main.jsx                 # Entry point
│   ├── public/                      # Static assets
│   ├── package.json
│   ├── vite.config.js              # Vite configuration
│   └── eslint.config.js            # ESLint rules
│
└── README.md                        # This file
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite 8** - Build tool & dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12** - Animation library
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Router 7** - Client-side routing
- **Lenis** - Smooth scroll experience
- **React Hot Toast** - Toast notifications
- **React Intersection Observer** - Lazy loading trigger
- **Typewriter Effect** - Text animation
- **React CountUp** - Number animations

### Backend
- **Node.js** - Runtime
- **Express 5** - Web framework
- **Nodemailer 8** - Email service
- **MongoDB** - Database (configured, not required for core features)
- **Mongoose** - MongoDB ODM
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting
- **dotenv** - Environment management

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Portfolio
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

---

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Email Configuration (Gmail SMTP)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password

# Optional: Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

**Note**: For Gmail, generate an [App Password](https://myaccount.google.com/apppasswords) instead of using your regular password.

#### Frontend Configuration
Update contact information and projects in [src/data/portfolioData.js](frontend/src/data/portfolioData.js):

```javascript
export const personalInfo = {
  name: 'Your Name',
  location: 'Your Location',
  email: 'your-email@example.com',
  githubUsername: 'your-github',
  university: 'Your University',
  // ... more fields
}
```

---

## 💻 Running the Application

### Development Mode

**Terminal 1 - Backend (http://localhost:5000)**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend (http://localhost:5173)**
```bash
cd frontend
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

**Frontend Build**
```bash
cd frontend
npm run build
# Output: dist/ folder ready for deployment
```

**Backend Production**
```bash
cd backend
npm start
```

---

## 📋 Available Scripts

### Frontend
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

### Backend
```bash
npm start         # Start server (production)
npm run dev       # Start with nodemon (development)
npm run test      # Run tests (not configured)
```

---

## 📚 Page Sections

1. **Hero** - Introduction with CTA
2. **About** - Personal bio and professional summary
3. **Skills** - Technical skills with categories
4. **Projects** - Featured work with live links and tech stack
5. **Courses** - Professional development and certifications
6. **Education** - Academic background
7. **Coding Profiles** - GitHub stats, LeetCode achievements
8. **Services** - What you offer
9. **Contact** - Email form with validation

---

## 🔌 API Endpoints

### Health Check
```
GET /api/health
Response: { status: 'UP', message: 'Portfolio API is running' }
```

### Contact Form
```
POST /api/contact
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Your message here"
}

Response:
{
  "success": true,
  "message": "Message sent successfully!"
}
```

**Rate Limit**: 100 requests per 15 minutes per IP

---

## 🎨 Customization

### Update Portfolio Content
Edit [frontend/src/data/portfolioData.js](frontend/src/data/portfolioData.js) to modify:
- Personal information
- Projects and their details
- Skills and technologies
- Education history
- Social links
- Coding profiles

### Change Theme/Styling
- Tailwind CSS configuration: [frontend/tailwind.config.js](frontend/tailwind.config.js)
- CSS variables and custom styles: [frontend/src/App.css](frontend/src/App.css) and [frontend/src/index.css](frontend/src/index.css)

### Add New Sections
1. Create component in [frontend/src/components/sections/](frontend/src/components/sections/)
2. Lazy load in [App.jsx](frontend/src/App.jsx)
3. Update navigation links in [portfolioData.js](frontend/src/data/portfolioData.js)

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the dist/ folder to Vercel, Netlify, or any static host
```

### Backend (Render/Railway/Heroku)
```bash
# Push to Git repository
# Connect to deployment service
# Set environment variables in dashboard
# Service automatically deploys from main branch
```

**Note**: Backend serves the frontend build in production. Ensure `NODE_ENV=production` is set.

---

## 🔒 Security Features

- ✅ **Helmet.js** - Secure HTTP headers
- ✅ **CORS** - Controlled cross-origin requests
- ✅ **Rate Limiting** - DDoS protection
- ✅ **Input Validation** - Required fields check
- ✅ **Email Validation** - Contact form verification
- ✅ **Environment Variables** - Sensitive data protection

---

## 📝 License

This project is open source and available under the [ISC License](LICENSE).

---

## 👤 Author

**Mohd Suhail**

- 📧 Email: suhailmansoori7985@gmail.com
- 🐙 GitHub: [@Suhail7985](https://github.com/Suhail7985)
- 💼 LinkedIn: [@mohdsuhail0](https://www.linkedin.com/in/mohdsuhail0/)
- 🏠 Location: Lucknow, India

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests with improvements.

---

## ❓ Troubleshooting

### Email not sending
- Check `EMAIL_USER` and `EMAIL_PASS` in `.env`
- Ensure Gmail app password is used (not regular password)
- Verify less secure app access if using older Gmail accounts

### CORS errors
- Ensure backend is running on correct port
- Check CORS origin configuration in [backend/server.js](backend/server.js)

### Frontend build issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf frontend/dist && npm run build`

---

## 📞 Support

For issues, questions, or feature requests, please open an issue on GitHub or contact via email.

