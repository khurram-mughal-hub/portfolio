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
    title: "Blogging site",
    category: "Full Stack",
    description: "It defines the scope (consumer electronics/tech) and establishes authority.",
    image: "/images/project-1.png",
    technologies: ["React", "Tailwind CSS", "PostgreSQL", "Stripe", "Node.js", "Express"],
    liveUrl: "https://inkly-blog-lemon.vercel.app/",
    githubUrl: "https://github.com/khurram-mughal-hub/Inkly-blog",
    featured: true
  },
  {
    id: 2,
    title: "Project 2",
    category: "Web App",
    description: "Description for project 2 - update this",
    image: "/images/project-2.jpg",
    technologies: ["React", "Node.js"],
    liveUrl: "", // Add your live URL
    githubUrl: "", // Add your GitHub URL
    featured: true
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah ",
    role: "CEO",
    avatar: "/images/avatar-1.jpg",
    content: "Working with Khurram was an absolute pleasure. He delivered our project on time and exceeded all expectations. His attention to detail and technical expertise is remarkable.",
    rating: 5
  },
  {
    id: 2,
    name: "Saamir Khan",
    role: "Product Manager",
    avatar: "/images/avatar-2.jpg",
    content: "Khurram transformed our outdated system into a modern, scalable application. His communication throughout the project was excellent, and he was always open to feedback.",
    rating: 5
  },
  {
    id: 3,
    name: "Shaista Akram",
    role: "Founder",
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
