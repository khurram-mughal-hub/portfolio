/**
 * Content Data
 * All text content for the portfolio website
 * Easy to update and ready for future API integration
 */

export const siteConfig = {
  name: "Khurram",
  title: "Full Stack Developer",
  email: "hello@khurram.dev",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  tagline: "Crafting Digital Experiences",
  description: "I build exceptional digital experiences that combine beautiful design with robust functionality.",
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
    "I'm a full-stack developer with over 5 years of experience building web applications that make a difference. I specialize in React, Node.js, and modern JavaScript, always staying current with the latest technologies and best practices.",
    "My journey in tech started with a curiosity about how things work on the web. That curiosity has evolved into a career where I get to solve complex problems and create intuitive user experiences every day.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical writing and mentoring."
  ],
  stats: [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "30+", label: "Happy Clients" },
    { value: "99%", label: "Client Satisfaction" }
  ],
  resumeLink: "#",
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
    url: "https://github.com/khurram",
    icon: "github"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/khurram",
    icon: "linkedin"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/khurram",
    icon: "twitter"
  },
  {
    name: "Dribbble",
    url: "https://dribbble.com/khurram",
    icon: "dribbble"
  }
];

export const skillsContent = {
  sectionTitle: "Skills & Technologies",
  sectionSubtitle: "What I work with",
  categories: [
    {
      name: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
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
