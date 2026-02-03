/**
 * Hero Section Component - World-Class Design
 * Immersive full-screen hero with particle effects, 3D interactions,
 * animated gradient mesh, and stunning text reveals
 */

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { heroContent, socialLinks } from '../../data/content';
import { Button, Icon } from '../common';
import styles from './Hero.module.css';

// Particle system - optimized with CSS animations
const ParticleField = () => {
  const particles = useMemo(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <div className={styles.particleField}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={styles.particle}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// Animated gradient mesh background - using CSS animations for better performance
const GradientMesh = () => {
  return (
    <div className={styles.gradientMesh}>
      <div className={`${styles.gradientOrb1} ${styles.orbAnimate1}`} />
      <div className={`${styles.gradientOrb2} ${styles.orbAnimate2}`} />
      <div className={`${styles.gradientOrb3} ${styles.orbAnimate3}`} />
    </div>
  );
};

// Floating geometric shapes with CSS animations for better performance
const FloatingShapes = () => {
  return (
    <div className={styles.floatingShapes}>
      <div className={`${styles.shape} ${styles.shapeCube} ${styles.shapeAnimate1}`} />
      <div className={`${styles.shape} ${styles.shapeSphere} ${styles.shapeAnimate2}`} />
      <div className={`${styles.shape} ${styles.shapeRing} ${styles.shapeAnimate3}`} />
      <div className={`${styles.shape} ${styles.shapePyramid} ${styles.shapeAnimate4}`} />
    </div>
  );
};

// Tech Stack Visual - Right Side Visual Element
const TechStackVisual = () => {
  const techIcons = [
    { icon: '⚛️', label: 'React', x: 20, y: 15, delay: 0 },
    { icon: '🟨', label: 'JavaScript', x: 75, y: 25, delay: 0.2 },
    { icon: '🔷', label: 'TypeScript', x: 60, y: 70, delay: 0.4 },
    { icon: '🟢', label: 'Node.js', x: 15, y: 65, delay: 0.6 },
    { icon: '🎨', label: 'CSS', x: 45, y: 45, delay: 0.8 },
  ];

  const codeLines = [
    { text: 'const developer = {', color: '#c792ea' },
    { text: '  name: "Khurram",', color: '#82aaff' },
    { text: '  passion: "Building",', color: '#c3e88d' },
    { text: '  skills: ["React", "Node"]', color: '#ffcb6b' },
    { text: '};', color: '#c792ea' },
  ];

  return (
    <div className={styles.techVisualContainer}>
      {/* Main Visual Card */}
      <motion.div
        className={styles.visualCard}
        initial={{ opacity: 0, x: 100, rotateY: -15 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Code Editor */}
        <div className={styles.codeEditor}>
          <div className={styles.editorHeader}>
            <div className={styles.editorDots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <span className={styles.editorTitle}>developer.js</span>
          </div>
          <div className={styles.editorContent}>
            {codeLines.map((line, index) => (
              <motion.div
                key={index}
                className={styles.codeLine}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + index * 0.15 }}
              >
                <span className={styles.lineNumber}>{index + 1}</span>
                <span style={{ color: line.color }}>{line.text}</span>
              </motion.div>
            ))}
            <motion.div 
              className={styles.cursor}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Glow Effect */}
        <div className={styles.cardGlow} />
      </motion.div>

      {/* Floating Tech Icons */}
      {techIcons.map((tech, index) => (
        <motion.div
          key={tech.label}
          className={styles.floatingTech}
          style={{ left: `${tech.x}%`, top: `${tech.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { delay: 1.8 + tech.delay },
            scale: { delay: 1.8 + tech.delay, type: 'spring', stiffness: 300 },
            y: { delay: 2.5 + tech.delay, duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
          whileHover={{ scale: 1.2, rotate: 10 }}
        >
          <span className={styles.techIcon}>{tech.icon}</span>
          <span className={styles.techLabel}>{tech.label}</span>
        </motion.div>
      ))}

      {/* Connection Lines */}
      <svg className={styles.connectionLines} viewBox="0 0 400 400">
        <motion.path
          d="M100,80 Q200,150 300,100"
          className={styles.connectionPath}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.2, duration: 1.5 }}
        />
        <motion.path
          d="M80,280 Q200,200 320,300"
          className={styles.connectionPath}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.4, duration: 1.5 }}
        />
      </svg>

      {/* Orbiting Element */}
      <motion.div
        className={styles.orbitingElement}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <span className={styles.orbitDot} />
      </motion.div>
    </div>
  );
};

// Animated text with character-by-character reveal
const AnimatedText = ({ text, className, delay = 0 }) => {
  return (
    <motion.span
      className={`${styles.animatedText} ${className || ''}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.03,
            delayChildren: delay,
          },
        },
      }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className={styles.char}
          variants={{
            hidden: {
              y: 100,
              opacity: 0,
              rotateX: -90,
            },
            visible: {
              y: 0,
              opacity: 1,
              rotateX: 0,
              transition: {
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
              },
            },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Word reveal animation
const WordReveal = ({ children, delay = 0 }) => {
  return (
    <div className={styles.wordRevealContainer}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// 3D Tilt Card
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

// Magnetic button effect
const MagneticButton = ({ children, onClick, variant, size, to, ...props }) => {
  const buttonRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={buttonRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.magneticWrapper}
    >
      <Button onClick={onClick} variant={variant} size={size} to={to} {...props}>
        {children}
      </Button>
    </motion.div>
  );
};

// Main Hero Component
const Hero = () => {
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split title into words for animation
  const titleWords = heroContent.title.split(' ');

  return (
    <section 
      ref={heroRef}
      className={styles.hero}
      onMouseMove={handleMouseMove}
    >
      {/* Background layers */}
      <div className={styles.backgroundLayers}>
        <div className={styles.noiseOverlay} />
        <GradientMesh />
        <ParticleField />
        <FloatingShapes />
        <div className={styles.gridPattern} />
      </div>

      {/* Main content */}
      <div className={styles.container}>
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className={styles.contentWrapper}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Left side - Text content */}
              <div className={styles.content}>
              {/* Greeting badge */}
              <motion.div
                className={styles.greetingBadge}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.statusDot} />
                <span>{heroContent.greeting}</span>
              </motion.div>

              {/* Name with character reveal */}
              <TiltCard className={styles.nameContainer}>
                <h1 className={styles.name}>
                  <AnimatedText text={heroContent.name} delay={0.4} />
                  <motion.span
                    className={styles.nameDot}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, type: 'spring', stiffness: 500 }}
                  >
                    .
                  </motion.span>
                </h1>
              </TiltCard>

              {/* Title with word reveal */}
              <div className={styles.titleContainer}>
                {titleWords.map((word, index) => (
                  <WordReveal key={index} delay={0.6 + index * 0.1}>
                    <span className={styles.titleWord}>
                      {word}
                      {index < titleWords.length - 1 && '\u00A0'}
                    </span>
                  </WordReveal>
                ))}
              </div>

              {/* Subtitle with fade-blur effect */}
              <motion.p
                className={styles.subtitle}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {heroContent.subtitle}
              </motion.p>

              {/* CTA buttons with magnetic effect */}
              <motion.div
                className={styles.ctaButtons}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <MagneticButton
                  onClick={scrollToProjects}
                  variant="primary"
                  size="large"
                >
                  <span>{heroContent.primaryCTA}</span>
                  <motion.span
                    className={styles.ctaIcon}
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Icon name="arrowDown" size={18} />
                  </motion.span>
                </MagneticButton>
                <MagneticButton
                  to="/contact"
                  variant="outline"
                  size="large"
                >
                  {heroContent.secondaryCTA}
                </MagneticButton>
              </motion.div>

              {/* Social links */}
              <motion.div
                className={styles.socialLinks}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -5,
                      rotate: [0, -10, 10, 0],
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    <Icon name={social.icon} size={22} />
                    <span className={styles.socialTooltip}>{social.name}</span>
                  </motion.a>
                ))}
              </motion.div>
              </div>

              {/* Right side - Tech Visual */}
              <TechStackVisual />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Advanced scroll indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.span
            className={styles.scrollText}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {heroContent.scrollText}
          </motion.span>
          <div className={styles.scrollLine}>
            <motion.div
              className={styles.scrollDot}
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className={styles.bottomFade} />
    </section>
  );
};

export default Hero;
