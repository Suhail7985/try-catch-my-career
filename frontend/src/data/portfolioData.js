// ─── Personal & site config ───────────────────────────────────────────────────
export const personalInfo = {
  name: 'Mohd Suhail',
  location: 'Lucknow, India',
  email: 'suhailmansoori7985@gmail.com',
  phone: '+919555635456',
  githubUsername: 'Suhail7985',
  university: 'Lovely Professional University, Phagwara, Punjab',
  intermediate: 'Lucknow Public College, Lucknow, Uttar Pradesh',
  highSchool: 'Don Bosco High School, Mahmudabad, Uttar Pradesh',
}

export const aboutBio =
  'Full-Stack MERN developer and AI systems evaluation intern — building immersive web experiences with React, Next.js & TypeScript while benchmarking LLMs for reliability at AirDawg Labs.'

export const siteNav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const GITHUB_USER = personalInfo.githubUsername

const skill = (name) => ({ name, icon: '' })

// ─── Work experience ──────────────────────────────────────────────────────────
export const workExperience = [
  {
    id: 1,
    role: 'AI Systems Evaluation Intern',
    company: 'AirDawg Labs',
    duration: 'Jul 2026 – Present',
    highlights: [
      'Test and evaluate LLMs in Linux using Terminal Bench 2.0 and Docker to assess model reliability and performance.',
      'Design test cases and run structured AI benchmarking to identify bugs, edge cases, and inconsistencies in model behavior.',
      'Apply prompt engineering techniques to probe model responses and surface failure modes across task scenarios.',
      'Document findings through bug reports and technical documentation for more reliable, high-performing AI systems.',
    ],
  },
]

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: 'BuggyBot',
    subtitle: 'AI Debugging Assistant',
    description:
      'AI-powered DSA learning assistant built with Next.js and TypeScript — interactive chat interface for debugging concepts, algorithms, and coding problems with personalized AI support.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'Python', 'MongoDB', 'LangChain', 'OpenAI API', 'GitHub Actions'],
    features: [
      'OpenAI + RAG-based contextual querying',
      'Real-time AI responses & problem-solving support',
      'CI/CD with GitHub Actions, Vercel & Render',
    ],
    live: 'https://buggybot-alpha.vercel.app/',
    period: 'May 2025 – Apr 2026',
    featured: true,
    category: ['Next.js', 'TypeScript', 'OpenAI', 'Python'],
  },
  {
    id: 2,
    title: 'The Dessert Lab',
    subtitle: 'E-commerce Platform',
    description:
      'Full-stack dessert e-commerce platform with responsive UI, dynamic cart, JWT authentication, and RESTful backend for products, users, orders, and admin access control.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Axios', 'JWT'],
    features: [
      'Product catalog with dynamic cart & checkout flow',
      'JWT auth, protected routes & admin access control',
      'RESTful API for products, users & orders',
    ],
    live: 'https://dessertlab.vercel.app/',
    period: 'Jun 2025 – Jul 2025',
    featured: true,
    category: ['React', 'Node.js', 'MongoDB'],
  },
]

// ─── Skills (from CV — no percentage ratings) ─────────────────────────────────
export const skills = {
  Languages: [
    skill('C++'),
    skill('JavaScript'),
    skill('TypeScript'),
    skill('Python'),
  ],
  'AI & Evaluation': [
    skill('AI Systems Evaluation'),
    skill('Large Language Models (LLMs)'),
    skill('AI Model Testing'),
    skill('Prompt Engineering'),
    skill('AI Benchmarking'),
    skill('Model Evaluation'),
    skill('Terminal Bench 2.0'),
    skill('OpenAI API'),
    skill('REST APIs'),
    skill('Async Data Handling'),
  ],
  Frontend: [
    skill('HTML'),
    skill('CSS'),
    skill('React'),
    skill('Next.js'),
    skill('Tailwind CSS'),
    skill('Context API'),
    skill('Shadcn/UI'),
    skill('Framer Motion'),
    skill('SSR/SSG'),
  ],
  Backend: [
    skill('Node.js'),
    skill('Express.js'),
    skill('REST API Development'),
    skill('JWT Authentication'),
  ],
  Databases: [
    skill('MongoDB'),
    skill('MySQL'),
    skill('Mongoose'),
  ],
  'Tools & Platforms': [
    skill('AWS'),
    skill('Git'),
    skill('GitHub'),
    skill('GitHub Actions'),
    skill('Linux'),
    skill('Docker'),
    skill('CLI'),
    skill('Vercel'),
    skill('Render'),
    skill('Figma'),
    skill('Postman'),
  ],
  'QA & Testing': [
    skill('Test Case Design'),
    skill('Quality Assurance (QA)'),
    skill('Debugging'),
    skill('Bug Reporting'),
    skill('Performance Analysis'),
    skill('Data Analysis'),
    skill('Technical Documentation'),
  ],
}

// ─── Certifications (CV only) ─────────────────────────────────────────────────
export const courses = [
  {
    id: 1,
    title: 'Agile Project Management',
    institution: 'Coursera',
    platform: 'Coursera',
    date: 'May 2026 – Apr 2026',
    categories: ['Project Management', 'Agile'],
    color: '#33ff33',
  },
  {
    id: 2,
    title: 'AWS Cloud Technical Essentials',
    institution: 'Amazon Web Services',
    platform: 'Coursera',
    date: 'Sep 2025 – Nov 2025',
    categories: ['AWS', 'Cloud Computing'],
    color: '#00ffff',
  },
  {
    id: 3,
    title: 'Data Structures and Algorithms using C++',
    institution: 'Coding Spoon',
    platform: 'Coding Spoon',
    date: 'May 2024 – Aug 2024',
    categories: ['C++', 'DSA'],
    color: '#ffb000',
  },
  {
    id: 4,
    title: 'Server-side JavaScript with Node.js',
    institution: 'Coursera',
    platform: 'Coursera',
    date: 'Apr 2024 – May 2024',
    categories: ['Node.js', 'Backend'],
    color: '#ff6600',
  },
  {
    id: 5,
    title: 'HTML, CSS, and JavaScript for Web Developers',
    institution: 'Coursera',
    platform: 'Coursera',
    date: 'Mar 2024 – Apr 2024',
    categories: ['Web Development', 'Frontend'],
    color: '#00ffff',
  },
]

// ─── Achievements (CV only) ─────────────────────────────────────────────────
export const achievements = [
  {
    id: 1,
    title: '4 Star Rating in C++',
    org: 'HackerRank',
    date: 'Mar 2024 – May 2024',
  },
  {
    id: 2,
    title: 'Capture The Flag (CTF) Hackathon',
    org: 'Hackathon',
    date: 'Apr 2023',
  },
]

// ─── Education (CV) ───────────────────────────────────────────────────────────
export const education = [
  {
    id: 1,
    degree: 'B.Tech (CSE)',
    field: 'Computer Science & Engineering',
    institution: personalInfo.university,
    duration: 'Since Jun 2022',
    coursework: ['Data Structures', 'Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'Web Technologies'],
    color: '#33ff33',
  },
  {
    id: 2,
    degree: 'Intermediate',
    field: 'Science – PCM with Computer',
    institution: personalInfo.intermediate,
    duration: 'Apr 2021 – Mar 2022',
    coursework: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
    color: '#ffb000',
  },
  {
    id: 3,
    degree: 'Matriculation',
    field: 'Science',
    institution: personalInfo.highSchool,
    duration: 'Apr 2019 – Mar 2020',
    coursework: ['Mathematics', 'Science', 'English', 'Social Studies'],
    color: '#00ffff',
  },
]

// ─── Stats (derived from CV content) ──────────────────────────────────────────
export const stats = [
  { label: 'Live Projects', value: projects.length, suffix: '' },
  { label: 'Certifications', value: courses.length, suffix: '' },
  { label: 'Skill Areas', value: Object.keys(skills).length, suffix: '' },
  { label: 'Achievements', value: achievements.length, suffix: '' },
]

// ─── Social & contact ─────────────────────────────────────────────────────────
export const socialLinks = {
  github: `https://github.com/${GITHUB_USER}`,
  linkedin: 'https://www.linkedin.com/in/mohdsuhail0/',
  email: `mailto:${personalInfo.email}`,
  phone: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
}

export const contactInfo = [
  { id: 'email', label: 'Email', value: personalInfo.email, href: socialLinks.email, external: false },
  { id: 'phone', label: 'Mobile', value: personalInfo.phone, href: socialLinks.phone, external: false },
  { id: 'location', label: 'Location', value: personalInfo.location, href: null },
  { id: 'github', label: 'GitHub', value: `@${GITHUB_USER}`, href: socialLinks.github, external: true },
]
