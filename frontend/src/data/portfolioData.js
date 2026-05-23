// ─── Personal & site config (edit here) ───────────────────────────────────────
export const personalInfo = {
  name: 'Mohd Suhail',
  location: 'Lucknow, India',
  email: 'suhailmansoori7985@gmail.com',
  githubUsername: 'Suhail7985',
  university: 'Lovely Professional University',
  intermediate: 'Lucknow Public College',
  highSchool: 'Don Bosco High School',
}

export const navMain = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const navMore = [
  { label: 'Courses', href: '#courses' },
  { label: 'Education', href: '#education' },
  { label: 'Profiles', href: '#coding-profiles' },
  { label: 'Services', href: '#services' },
]

/** All sections for scroll-spy (order matches page flow) */
export const navLinks = [
  { label: 'Home', href: '#home' },
  ...navMain.slice(0, 3),
  ...navMore,
  navMain[3],
]

const GITHUB_USER = personalInfo.githubUsername

// ─── Coding profiles (GitHub + LeetCode cards) ────────────────────────────────
export const codingProfiles = {
  github: {
    title: 'GitHub Stats',
    subtitle: 'Contributions & Activity',
    statsImage: `https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&theme=transparent&title_color=7c3aed&text_color=94a3b8&icon_color=06b6d4&bg_color=00000000&hide_border=true&rank_icon=github`,
    streakImage: `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USER}&theme=transparent&hide_border=true&ring=7c3aed&fire=06b6d4&currStreakLabel=94a3b8&sideLabels=94a3b8&dates=64748b`,
    stats: [
      { label: 'Repos', value: '10+' },
      { label: 'Commits', value: '200+' },
      { label: 'Stars', value: '50+' },
    ],
    profileUrl: `https://github.com/${GITHUB_USER}`,
    linkLabel: 'View Profile →',
    linkClass: 'text-purple-400 hover:text-white',
  },
  leetcode: {
    title: 'Problem Solving',
    subtitle: 'LeetCode · Algorithms & DSA',
    totalSolved: 250,
    rankLabel: 'Active',
    rankValue: '250+',
    difficulties: [
      { label: 'Easy', count: 120, color: '#10b981' },
      { label: 'Medium', count: 105, color: '#f59e0b' },
      { label: 'Hard', count: 25, color: '#ef4444' },
    ],
    profileUrl: 'https://leetcode.com/u/suhail955/',
    linkLabel: 'View LeetCode →',
    linkClass: 'text-amber-400 hover:text-white',
  },
  platforms: [
    { id: 'github', name: 'GitHub', url: `https://github.com/${GITHUB_USER}`, color: '#a78bfa' },
    { id: 'leetcode', name: 'LeetCode', url: 'https://leetcode.com/u/suhail955/', color: '#ffa116' },
    { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/mohdsuhail0/', color: '#0a66c2' },
    { id: 'email', name: 'Email', url: 'mailto:suhailmansoori7985@gmail.com', color: '#ec4899' },
  ],
}

export const contactInfo = [
  { id: 'email', label: 'Email', value: personalInfo.email, href: 'mailto:suhailmansoori7985@gmail.com', external: false },
  { id: 'location', label: 'Location', value: personalInfo.location, href: null },
  { id: 'github', label: 'GitHub', value: `@${GITHUB_USER}`, href: `https://github.com/${GITHUB_USER}`, external: true },
]

// ─── Projects (live products only) ────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: 'The Dessert Lab',
    description:
      'Full-featured dessert e-commerce store with product browsing, cart, checkout flow, and a polished brand experience for online orders.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    features: ['Product catalog & filters', 'Shopping cart', 'Order flow', 'Responsive storefront', 'Admin-ready backend'],
    live: 'https://dessertlab.vercel.app/',
    featured: true,
    category: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'CV Glass',
    description:
      'ATS resume score checker that analyzes CVs against job descriptions, surfaces improvement tips, and helps candidates optimize for applicant tracking systems.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'PDF Parsing', 'REST API'],
    features: ['ATS compatibility scoring', 'Resume vs JD analysis', 'Actionable feedback', 'Fast upload flow', 'Clean results UI'],
    live: 'https://cvglass.onrender.com/',
    featured: true,
    category: ['React', 'Node.js', 'Tools'],
  },
  {
    id: 3,
    title: 'Xylen',
    description:
      'DSA learning platform for practicing data structures and algorithms with structured paths, problems, and a focused study experience.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'DSA', 'Vercel'],
    features: ['Topic-wise DSA tracks', 'Practice problems', 'Progress-friendly UI', 'Modern learning layout', 'Mobile responsive'],
    live: 'https://xylen.vercel.app/',
    featured: true,
    category: ['Next.js', 'React', 'TypeScript', 'DSA'],
  },
]

// ─── Skills Data ──────────────────────────────────────────────────────────────
export const skills = {
  Frontend: [
    { name: 'React.js', level: 92, icon: '⚛️' },
    { name: 'Next.js', level: 85, icon: '▲' },
    { name: 'TypeScript', level: 85, icon: '📘' },
    { name: 'HTML5', level: 95, icon: '🌐' },
    { name: 'CSS3', level: 90, icon: '🎨' },
    { name: 'JavaScript', level: 88, icon: '⚡' },
    { name: 'Tailwind CSS', level: 90, icon: '💨' },
    { name: 'Framer Motion', level: 80, icon: '🎭' },
  ],
  Backend: [
    { name: 'Node.js', level: 88, icon: '🟢' },
    { name: 'Express.js', level: 87, icon: '🚀' },
    { name: 'REST APIs', level: 90, icon: '🔗' },
    { name: 'JWT Auth', level: 85, icon: '🔐' },
    { name: 'Socket.io', level: 70, icon: '🔌' },
  ],
  Database: [
    { name: 'MongoDB', level: 87, icon: '🍃' },
    { name: 'SQL', level: 75, icon: '🗄️' },
    { name: 'Redis', level: 65, icon: '🔴' },
    { name: 'Mongoose', level: 85, icon: '📊' },
  ],
  Tools: [
    { name: 'Git & GitHub', level: 90, icon: '🐙' },
    { name: 'VS Code', level: 95, icon: '💻' },
    { name: 'Postman', level: 88, icon: '📬' },
    { name: 'Figma', level: 70, icon: '🎨' },
    { name: 'Linux', level: 72, icon: '🐧' },
  ],
  Deployment: [
    { name: 'Docker', level: 68, icon: '🐳' },
    { name: 'Vercel', level: 88, icon: '▲' },
    { name: 'Render', level: 82, icon: '☁️' },
    { name: 'Railway', level: 78, icon: '🚂' },
    { name: 'AWS', level: 60, icon: '☁️' },
  ],
}

// ─── Courses & Certifications Data ───────────────────────────────────────────
export const courses = [
  {
    id: 1,
    title: 'Agile Project Management',
    institution: 'University of Colorado Boulder',
    platform: 'Coursera',
    date: 'April 2026',
    categories: ['Design and Product', 'Project Management', 'Strategy', 'Leadership'],
    color: '#7c3aed',
    credentialUrl: 'https://www.coursera.org/account/accomplishments',
  },
  {
    id: 2,
    title: 'Project Management: Foundations and Initiation',
    institution: 'University of Colorado Boulder',
    platform: 'Coursera',
    date: 'February 2026',
    categories: ['People Analysis', 'Communication', 'Strategy and Operations', 'Collaboration'],
    color: '#06b6d4',
    credentialUrl: 'https://www.coursera.org/account/accomplishments',
  },
  {
    id: 3,
    title: 'Project Planning and Execution',
    institution: 'University of Colorado Boulder',
    platform: 'Coursera',
    date: 'February 2026',
    categories: ['Programming Principles', 'Decision Making', 'Product Management', 'Leadership'],
    color: '#ec4899',
    credentialUrl: 'https://www.coursera.org/account/accomplishments',
  },
  {
    id: 4,
    title: 'AWS Cloud Technical Essentials',
    institution: 'Amazon Web Services',
    platform: 'edX / Coursera',
    date: 'November 2025',
    categories: ['Cloud Storage', 'AWS', 'Cloud Computing'],
    color: '#f59e0b',
    credentialUrl: 'https://www.coursera.org/account/accomplishments',
  },
  {
    id: 5,
    title: 'Architecting Solutions on AWS',
    institution: 'Amazon Web Services',
    platform: 'edX / Coursera',
    date: 'November 2025',
    categories: ['Data Engineering', 'Infrastructure', 'Cloud Platforms', 'Computer Architecture'],
    color: '#10b981',
    credentialUrl: 'https://www.coursera.org/account/accomplishments',
  },
  {
    id: 6,
    title: 'AWS Multi-Tier VPC Architecture',
    institution: 'Amazon Web Services',
    platform: 'Coursera',
    date: 'September 2025',
    categories: ['Network Architecture', 'VPC', 'Cloud Security'],
    color: '#8b5cf6',
    credentialUrl: 'https://www.coursera.org/account/accomplishments',
  },
  {
    id: 7,
    title: 'Building Data Lakes on AWS',
    institution: 'Amazon Web Services',
    platform: 'Coursera',
    date: '2025',
    categories: ['Data Lake', 'AWS', 'S3', 'Glue'],
    color: '#3b82f6',
    credentialUrl: 'https://www.coursera.org/account/accomplishments',
  },
  {
    id: 8,
    title: 'HTML, CSS, and Javascript for Web Developers',
    institution: 'Johns Hopkins University',
    platform: 'Coursera',
    date: '2024',
    categories: ['Web Development', 'Frontend', 'JavaScript'],
    color: '#ef4444',
    credentialUrl: 'https://www.coursera.org/account/accomplishments',
  },
]

// ─── Education Data ───────────────────────────────────────────────────────────
export const education = [
  {
    id: 1,
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science & Engineering',
    institution: personalInfo.university,
    duration: '2022 – 2026',
    coursework: ['Data Structures', 'Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'Web Technologies'],
    color: '#7c3aed',
  },
  {
    id: 2,
    degree: 'Intermediate (12th)',
    field: 'Science – PCM with Computer',
    institution: personalInfo.intermediate,
    duration: '2022',
    coursework: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
    color: '#06b6d4',
  },
  {
    id: 3,
    degree: 'High School (10th)',
    field: 'Science',
    institution: personalInfo.highSchool,
    duration: '2020',
    coursework: ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer Basics'],
    color: '#ec4899',
  },
]

// ─── Services Data ────────────────────────────────────────────────────────────
export const services = [
  {
    id: 1,
    title: 'Full Stack Development',
    description: 'End-to-end web application development from database design to pixel-perfect UI, built to scale.',
    icon: '🚀',
    features: ['React & Next.js', 'TypeScript', 'REST API design', 'Database architecture', 'Authentication & Security'],
    color: '#7c3aed',
  },
  {
    id: 2,
    title: 'REST API Development',
    description: 'Robust, secure, and well-documented APIs that power your web and mobile applications.',
    icon: '🔗',
    features: ['Express.js APIs', 'JWT Authentication', 'Rate limiting', 'API documentation'],
    color: '#06b6d4',
  },
  {
    id: 3,
    title: 'Responsive Web Design',
    description: 'Pixel-perfect, mobile-first responsive websites that look stunning on every device and screen size.',
    icon: '📱',
    features: ['Mobile-first approach', 'Cross-browser compatibility', 'Performance optimization', 'Accessibility'],
    color: '#ec4899',
  },
  {
    id: 4,
    title: 'Backend Development',
    description: 'Scalable server-side solutions with Node.js, Express, and MongoDB for high-performance applications.',
    icon: '⚙️',
    features: ['Node.js servers', 'MongoDB & SQL', 'Caching with Redis', 'Real-time with Socket.io'],
    color: '#f59e0b',
  },
  {
    id: 5,
    title: 'MERN Applications',
    description: 'Complete MERN stack applications with authentication, real-time features, and cloud deployment.',
    icon: '⚛️',
    features: ['React / Next.js frontend', 'TypeScript', 'Node.js backend', 'MongoDB database', 'Cloud deployment'],
    color: '#10b981',
  },
  {
    id: 6,
    title: 'Portfolio Websites',
    description: 'Stunning, award-winning portfolio websites that leave a lasting impression on recruiters and clients.',
    icon: '✨',
    features: ['Modern design', 'Smooth animations', 'SEO optimized', 'Fast & responsive'],
    color: '#8b5cf6',
  },
]

// ─── Stats Data ───────────────────────────────────────────────────────────────
export const stats = [
  { label: 'Live Projects', value: projects.length, suffix: '', icon: '🚀' },
  { label: 'Technologies', value: 12, suffix: '+', icon: '⚡' },
  { label: 'Certifications', value: 8, suffix: '+', icon: '📜' },
  { label: 'LeetCode Problems', value: codingProfiles.leetcode.totalSolved, suffix: '+', icon: '🧩' },
]

// ─── Social Links ─────────────────────────────────────────────────────────────
export const socialLinks = {
  github: 'https://github.com/Suhail7985',
  linkedin: 'https://www.linkedin.com/in/mohdsuhail0/',
  leetcode: 'https://leetcode.com/u/suhail955/',
  email: 'mailto:suhailmansoori7985@gmail.com',
}
