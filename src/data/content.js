/**
 * Content Data
 * All text content for the portfolio website
 * Easy to update and ready for future API integration
 */

export const siteConfig = {
  name: "Khurram",
  title: "Full Stack Developer",
  email: "khurramak2005@gmail.com",
  phone: "+92 322 6129311",
  location: "Lahore, Pakistan",
  tagline: "From Idea to Deployment: Full-Stack Solutions",
  description: "I'm  Khurram, a versatile software professional proficient in designing, developing, and maintaining both the front-end (client-side) and back-end (server-side) components of web applications. Skilled in a variety of programming languages and frameworks, I ensure seamless integration between user interfaces and server logic to deliver robust, efficient, and user-friendly digital experiences.",
};

export const heroContent = {
  greeting: "Hello, I'm",
  name: siteConfig.name,
  title: siteConfig.title,
  subtitle: "I craft beautiful, performant web applications with modern technologies. Passionate about clean code, user experience, and bringing ideas to life.",
  primaryCTA: "View My Work",
  secondaryCTA: "Get In Touch",
  scrollText: "Scroll to explore",
};

export const aboutContent = {
  sectionTitle: "About Me",
  sectionSubtitle: "Get to know me better",
  headline: "Passionate Developer with a Love for Clean Code",
  paragraphs: [
    "I'm a full-stack developer with over 1 year of experience building web applications that make a difference. I specialize in React, Node.js, and modern JavaScript, always staying current with the latest technologies and best practices.",
    "My journey in tech started with a curiosity about how things work on the web. That curiosity has evolved into a career where I get to solve complex problems and create intuitive user experiences every day.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical writing and mentoring."
  ],
  stats: [
    { value: "1+", label: "Years Experience" },
    { value: "3+", label: "Projects Completed" },
    { value: "10+", label: "Happy Clients" },
    { value: "99%", label: "Client Satisfaction" }
  ],
  resumeLink: "resume.pdf",
  resumeText: "Download Resume"
};

export const contactContent = {
  sectionTitle: "Get In Touch",
  sectionSubtitle: "Let's work together",
  headline: "Have a project in mind?",
  description: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let's create something amazing together.",
  form: {
    namePlaceholder: "Your Name",
    emailPlaceholder: "Your Email",
    subjectPlaceholder: "Subject",
    messagePlaceholder: "Your Message",
    submitText: "Send Message",
    successMessage: "Message sent successfully! I'll get back to you soon.",
  },
  contactInfo: [
    {
      icon: "email",
      label: "Email",
      value: siteConfig.email,
      link: `mailto:${siteConfig.email}`
    },
    {
      icon: "phone",
      label: "Phone",
      value: siteConfig.phone,
      link: `tel:${siteConfig.phone.replace(/\D/g, '')}`
    },
    {
      icon: "location",
      label: "Location",
      value: siteConfig.location,
      link: null
    }
  ]
};

export const footerContent = {
  copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`,
  tagline: "Building the future, one line of code at a time.",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/contact" }
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ]
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/khurram-mughal-hub",
    icon: "github"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/khurrampervaiz",
    icon: "linkedin"
  },
  {
    name: "Insatagram",
    url: "https://instagram.com/_khurram_mughal_ak",
    icon: "instagram"
  },
  {
    name: "Facebook",
    url: "https://facebook.com/khurram.pervez.520",
    icon: "facebook"
  }
];

export const skillsContent = {
  sectionTitle: "Skills & Technologies",
  sectionSubtitle: "What I work with",
  categories: [
    {
      name: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"]
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"]
    },
    {
      name: "Tools & Others",
      skills: ["Git", "Docker", "AWS", "Figma", "CI/CD"]
    }
  ]
};
