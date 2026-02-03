/**
 * Header Component - Premium Glass Morphism Design
 * Sticky navigation with magnetic links and scroll progress
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { mainNavigation, ctaButton } from '../../data/navigation';
import { siteConfig } from '../../data/content';
import { Button, Icon } from '../common';
import styles from './Header.module.css';

// Magnetic link component
const MagneticLink = ({ children, to, onClick, isActive }) => {
  const linkRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback((e) => {
    if (!linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={linkRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.magneticWrapper}
    >
      <Link
        to={to}
        onClick={onClick}
        className={`${styles.navLink} ${isActive ? styles.active : ''}`}
      >
        <span className={styles.navText}>{children}</span>
        <motion.span 
          className={styles.linkGlow}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
        <span className={styles.linkUnderline} />
      </Link>
    </motion.div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, path) => {
    if (path.includes('#')) {
      const [pagePath, anchor] = path.split('#');
      if (location.pathname === pagePath || (pagePath === '/' && location.pathname === '/')) {
        e.preventDefault();
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('#')[0]);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: 30 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <>
      <motion.header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Scroll progress bar */}
        <motion.div 
          className={styles.progressBar}
          style={{ scaleX, transformOrigin: '0%' }}
        />
        
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <motion.span 
              className={styles.logoText}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {siteConfig.name}
            </motion.span>
            <motion.span 
              className={styles.logoDot}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              .
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {mainNavigation.map((item) => (
              <MagneticLink
                key={item.id}
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                isActive={isActiveLink(item.path)}
              >
                {item.label}
              </MagneticLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div 
            className={styles.desktopCta}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button to={ctaButton.path} variant="primary" size="small">
              {ctaButton.label}
            </Button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className={styles.mobileMenuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
              <span />
              <span />
              <span />
            </div>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              className={styles.mobileMenu}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className={styles.mobileMenuContent}>
                {mainNavigation.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={menuItemVariants}
                    custom={index}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      to={item.path}
                      onClick={(e) => handleNavClick(e, item.path)}
                      className={`${styles.mobileNavLink} ${isActiveLink(item.path) ? styles.active : ''}`}
                    >
                      <span className={styles.mobileNavNumber}>0{index + 1}</span>
                      <span className={styles.mobileNavText}>{item.label}</span>
                      <motion.span 
                        className={styles.mobileNavArrow}
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={menuItemVariants}
                  custom={mainNavigation.length}
                  initial="closed"
                  animate="open"
                  className={styles.mobileCta}
                >
                  <Button to={ctaButton.path} variant="primary" fullWidth>
                    {ctaButton.label}
                  </Button>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
