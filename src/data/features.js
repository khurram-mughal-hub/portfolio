/**
 * Features, Services & Portfolio Data
 * Structured for easy backend integration
 */

export const services = [
  {
    id: 1,
    icon: "code",
    title: "Web Development",
    description: "Building responsive, performant web applications using modern frameworks like React, Next.js, and Node.js.",
    features: ["Custom Web Apps", "API Development", "Database Design", "Performance Optimization"]
  },
  {
    id: 2,
    icon: "design",
    title: "UI/UX Design",
    description: "Creating intuitive, user-centered designs that balance aesthetics with functionality.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
  },
  {
    id: 3,
    icon: "mobile",
    title: "Mobile Development",
    description: "Developing cross-platform mobile applications with React Native for iOS and Android.",
    features: ["React Native", "Cross-Platform", "App Store Deploy", "Push Notifications"]
  },
  {
    id: 4,
    icon: "cloud",
    title: "Cloud Solutions",
    description: "Deploying and managing scalable applications on AWS, Google Cloud, and other platforms.",
    features: ["AWS/GCP", "DevOps", "CI/CD Pipelines", "Serverless Architecture"]
  },
  {
    id: 5,
    icon: "analytics",
    title: "Technical Consulting",
    description: "Providing expert guidance on technology stack selection, architecture, and best practices.",
    features: ["Architecture Review", "Code Audits", "Tech Strategy", "Team Training"]
  },
  {
    id: 6,
    icon: "maintenance",
    title: "Maintenance & Support",
    description: "Ongoing support, updates, and improvements to keep your applications running smoothly.",
    features: ["Bug Fixes", "Updates", "Monitoring", "Performance Tuning"]
  }
];

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Full Stack",
    description: "A complete e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    image: "/images/project-1.jpg",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/khurram/ecommerce",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    category: "Web App",
    description: "A collaborative task management tool with real-time updates, team features, and productivity analytics.",
    image: "/images/project-2.jpg",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Socket.io"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/khurram/taskapp",
    featured: true
  },
  {
    id: 3,
    title: "Fitness Tracking App",
    category: "Mobile",
    description: "Cross-platform mobile app for tracking workouts, nutrition, and health metrics.",
    image: "/images/project-3.jpg",
    technologies: ["React Native", "Firebase", "Redux", "HealthKit"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/khurram/fitness",
    featured: true
  },
  {
    id: 4,
    title: "AI Content Generator",
    category: "AI/ML",
    description: "An intelligent content generation tool powered by GPT for marketing copy and blog posts.",
    image: "/images/project-4.jpg",
    technologies: ["Python", "FastAPI", "OpenAI", "React"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/khurram/ai-content",
    featured: false
  },
  {
    id: 5,
    title: "Real Estate Portal",
    category: "Full Stack",
    description: "Property listing platform with advanced search, virtual tours, and agent management.",
    image: "/images/project-5.jpg",
    technologies: ["Vue.js", "Django", "PostgreSQL", "Mapbox"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/khurram/realestate",
    featured: false
  },
  {
    id: 6,
    title: "Social Dashboard",
    category: "Web App",
    description: "Analytics dashboard for social media management with scheduled posting and insights.",
    image: "/images/project-6.jpg",
    technologies: ["React", "D3.js", "Node.js", "Redis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/khurram/social-dash",
    featured: false
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    avatar: "/images/avatar-1.jpg",
    content: "Working with Khurram was an absolute pleasure. He delivered our project on time and exceeded all expectations. His attention to detail and technical expertise is remarkable.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateCo",
    avatar: "/images/avatar-2.jpg",
    content: "Khurram transformed our outdated system into a modern, scalable application. His communication throughout the project was excellent, and he was always open to feedback.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder",
    company: "Design Studio",
    avatar: "/images/avatar-3.jpg",
    content: "I've worked with many developers, but Khurram stands out for his problem-solving abilities and commitment to quality. He truly cares about delivering the best solution.",
    rating: 5
  },
  {
    id: 4,
    name: "David Park",
    role: "CTO",
    company: "FinanceApp",
    avatar: "/images/avatar-4.jpg",
    content: "Khurram's expertise in both frontend and backend development helped us launch our product faster than expected. Highly recommend for any complex web project.",
    rating: 5
  }
];

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "full-stack", label: "Full Stack" },
  { id: "web-app", label: "Web App" },
  { id: "mobile", label: "Mobile" },
  { id: "ai-ml", label: "AI/ML" }
];
