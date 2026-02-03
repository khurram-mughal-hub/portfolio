/**
 * Services Section Component - Bento Grid Design
 * Modern asymmetric grid with 3D cards and sophisticated hover effects
 */

import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { services } from '../../data/features';
import { SectionTitle, Icon } from '../common';
import styles from './Services.module.css';

// 3D Tilt Card Component
const BentoCard = ({ service, index, size = 'normal' }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
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

  // Determine card size class
  const sizeClass = size === 'large' ? styles.cardLarge : 
                    size === 'tall' ? styles.cardTall : 
                    styles.cardNormal;

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.bentoCard} ${sizeClass}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Gradient border effect */}
      <div className={styles.cardBorder} />
      
      {/* Card content */}
      <div className={styles.cardContent}>
        {/* Icon with glow */}
        <motion.div 
          className={styles.iconWrapper}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <div className={styles.iconGlow} />
          <Icon name={service.icon} size={32} />
        </motion.div>

        {/* Title */}
        <h3 className={styles.cardTitle}>{service.title}</h3>

        {/* Description */}
        <p className={styles.cardDescription}>{service.description}</p>

        {/* Features with stagger animation */}
        <ul className={styles.featuresList}>
          {service.features.slice(0, size === 'large' ? 4 : 3).map((feature, idx) => (
            <motion.li 
              key={idx} 
              className={styles.featureItem}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <span className={styles.featureIcon}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Hover arrow indicator */}
        <motion.div 
          className={styles.hoverArrow}
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* Decorative elements */}
        <div className={styles.decorativeCircle} />
        <div className={styles.decorativeLine} />
      </div>

      {/* Shine effect on hover */}
      <div className={styles.shineEffect} />
    </motion.div>
  );
};

const Services = () => {
  // Define bento grid layout sizes
  const cardSizes = ['large', 'normal', 'tall', 'normal', 'normal', 'large'];

  return (
    <section id="services" className={styles.services}>
      {/* Background decorations */}
      <div className={styles.backgroundDecor}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridLines} />
      </div>

      <div className={styles.container}>
        {/* Section header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className={styles.badgeDot} />
            Services
          </motion.span>
          <h2 className={styles.title}>
            What I <span className={styles.titleHighlight}>Build</span>
          </h2>
          <p className={styles.subtitle}>
            Crafting digital experiences that combine beautiful design with powerful functionality
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {services.map((service, index) => (
            <BentoCard
              key={service.id}
              service={service}
              index={index}
              size={cardSizes[index] || 'normal'}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className={styles.bottomCta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>Have a project in mind?</p>
          <motion.a 
            href="/contact" 
            className={styles.ctaLink}
            whileHover={{ x: 5 }}
          >
            Let's talk
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
