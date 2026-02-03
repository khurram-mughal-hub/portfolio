/**
 * Testimonials Section Component
 * Premium 3D carousel with auto-play and smooth transitions
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { testimonials } from '../../data/features';
import styles from './Testimonials.module.css';

// 3D Carousel Card Component
const CarouselCard = ({ testimonial, position, isActive, onClick }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e) => {
    if (!cardRef.current || !isActive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  // Calculate position-based transforms
  const getPositionStyles = () => {
    switch(position) {
      case 'left':
        return { x: '-70%', scale: 0.8, rotateY: 25, zIndex: 1, opacity: 0.6 };
      case 'right':
        return { x: '70%', scale: 0.8, rotateY: -25, zIndex: 1, opacity: 0.6 };
      case 'farLeft':
        return { x: '-140%', scale: 0.6, rotateY: 35, zIndex: 0, opacity: 0.3 };
      case 'farRight':
        return { x: '140%', scale: 0.6, rotateY: -35, zIndex: 0, opacity: 0.3 };
      case 'center':
      default:
        return { x: '0%', scale: 1, rotateY: 0, zIndex: 10, opacity: 1 };
    }
  };
  
  const positionStyles = getPositionStyles();
  
  return (
    <motion.div
      ref={cardRef}
      className={`${styles.carouselCard} ${isActive ? styles.activeCard : ''}`}
      initial={false}
      animate={{
        x: positionStyles.x,
        scale: positionStyles.scale,
        rotateY: positionStyles.rotateY,
        zIndex: positionStyles.zIndex,
        opacity: positionStyles.opacity,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : positionStyles.rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Card Glow */}
      <div className={styles.cardGlow} />
      
      {/* Quote Icon */}
      <div className={styles.quoteWrapper}>
        <svg 
          className={styles.quoteIcon} 
          viewBox="0 0 32 32" 
          fill="currentColor"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
      </div>
      
      {/* Content */}
      <p className={styles.testimonialContent}>{testimonial.content}</p>
      
      {/* Rating Stars */}
      <div className={styles.rating}>
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className={`${styles.star} ${i < testimonial.rating ? styles.filled : ''}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            ★
          </motion.span>
        ))}
      </div>
      
      {/* Author */}
      <div className={styles.author}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <span className={styles.avatarInitial}>{testimonial.name.charAt(0)}</span>
          </div>
          <div className={styles.avatarRing} />
        </div>
        <div className={styles.authorInfo}>
          <h4 className={styles.authorName}>{testimonial.name}</h4>
          <p className={styles.authorRole}>
            {testimonial.role}
            <span className={styles.company}> @ {testimonial.company}</span>
          </p>
        </div>
      </div>
      
      {/* Shine Effect */}
      <div className={styles.cardShine} />
    </motion.div>
  );
};

// Floating Particle Component
const FloatingParticle = ({ delay }) => (
  <motion.div
    className={styles.floatingParticle}
    initial={{ opacity: 0, y: 100 }}
    animate={{ 
      opacity: [0, 1, 0],
      y: [-20, -100],
      x: [0, Math.random() * 40 - 20],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  />
);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const autoPlayRef = useRef(null);
  
  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setDirection(1);
    }, 5000);
  }, []);
  
  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  }, []);
  
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoPlaying, startAutoPlay, stopAutoPlay]);
  
  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  
  const handleDotClick = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  
  // Get card position relative to active
  const getCardPosition = (index) => {
    const diff = index - activeIndex;
    const total = testimonials.length;
    
    // Handle wrap-around
    let normalizedDiff = diff;
    if (diff > total / 2) normalizedDiff = diff - total;
    if (diff < -total / 2) normalizedDiff = diff + total;
    
    if (normalizedDiff === 0) return 'center';
    if (normalizedDiff === 1) return 'right';
    if (normalizedDiff === -1) return 'left';
    if (normalizedDiff === 2) return 'farRight';
    if (normalizedDiff === -2) return 'farLeft';
    return 'hidden';
  };
  
  return (
    <section id="testimonials" className={styles.testimonials}>
      {/* Background */}
      <div className={styles.backgroundDecor}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridLines} />
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
      </div>
      
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className={styles.badgeIcon}>💬</span>
            Client Stories
          </motion.span>
          <h2 className={styles.title}>
            What <span className={styles.titleHighlight}>Clients</span> Say
          </h2>
          <p className={styles.subtitle}>
            Don&apos;t just take my word for it — hear from the amazing people I&apos;ve worked with
          </p>
        </motion.div>
        
        {/* 3D Carousel */}
        <div 
          className={styles.carouselWrapper}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className={styles.carousel}>
            <AnimatePresence mode="sync">
              {testimonials.map((testimonial, index) => {
                const position = getCardPosition(index);
                if (position === 'hidden') return null;
                
                return (
                  <CarouselCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    position={position}
                    isActive={position === 'center'}
                    onClick={() => handleDotClick(index)}
                  />
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <motion.span
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              ←
            </motion.span>
          </button>
          <button 
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <motion.span
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.9 }}
            >
              →
            </motion.span>
          </button>
        </div>
        
        {/* Dots Navigation */}
        <div className={styles.dotsWrapper}>
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
              onClick={() => handleDotClick(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              {index === activeIndex && (
                <motion.span
                  className={styles.dotProgress}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isAutoPlaying ? 1 : 0 }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <motion.div
          className={styles.trustSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className={styles.trustText}>Trusted by industry leaders</p>
          <div className={styles.companyLogos}>
            {['TechCorp', 'InnovateCo', 'StartupX', 'DesignHub'].map((company, i) => (
              <motion.div
                key={company}
                className={styles.companyLogo}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
