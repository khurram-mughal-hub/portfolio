/**
 * Navigation Data
 * Menu items and navigation configuration
 * Ready for dynamic content from API
 */

export const mainNavigation = [
  {
    id: "home",
    label: "Home",
    path: "/",
    isExternal: false
  },
  {
    id: "about",
    label: "About",
    path: "/about",
    isExternal: false
  },
  {
    id: "services",
    label: "Services",
    path: "/#services",
    isExternal: false
  },
  {
    id: "projects",
    label: "Projects",
    path: "/#projects",
    isExternal: false
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
    isExternal: false
  }
];

export const ctaButton = {
  label: "Hire Me",
  path: "/contact",
  isExternal: false
};

export const mobileMenuConfig = {
  animationDuration: 0.3,
  staggerDelay: 0.05
};
