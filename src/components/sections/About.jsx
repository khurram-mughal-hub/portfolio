/**
 * About Section Component - Premium Split-Screen Design
 * Parallax effects, animated counters, and stunning visual layout
 */

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { aboutContent, skillsContent, siteConfig } from '../../data/content';
import { Button, Icon } from '../common';
import styles from './About.module.css';

// Animated counter component
const AnimatedCounter = ({ target, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    const startValue = 0;
    const endValue = parseInt(target);
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startValue + (endValue - startValue) * easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);
  
  return <span ref={ref}>{count}{suffix}</span>;
};

// Floating decoration component
const FloatingElement = ({ children, delay = 0, duration = 4, y = 15 }) => (
  <motion.div
    animate={{ y: [-y, y, -y] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

// Skill bar with animation
const SkillBar = ({ skill, level, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  return (
    <motion.div
      ref={ref}
      className={styles.skillBar}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{skill}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.skillTrack}>
        <motion.div
          className={styles.skillProgress}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <section ref={sectionRef} id="about" className={styles.about}>
      {/* Background decorations */}
      <div className={styles.backgroundDecor}>
        <motion.div className={styles.gradientOrb1} style={{ y: y1 }} />
        <motion.div className={styles.gradientOrb2} style={{ y: y2 }} />
        <div className={styles.gridPattern} />
      </div>

      <div className={styles.container}>
        {/* Section Header */}
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
          >
            <span className={styles.badgeIcon}>👋</span>
            About Me
          </motion.span>
        </motion.div>

        {/* Split Content */}
        <div className={styles.splitContent}>
          {/* Visual Side */}
          <motion.div 
            className={styles.visualSide}
            style={{ scale }}
          >
            {/* Main Image Card */}
            <motion.div 
              className={styles.imageCard}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.imageFrame}>
                {siteConfig.profileImage ? (
                  <img 
                    src={siteConfig.profileImage} 
                    alt={siteConfig.name}
                    className={styles.profileImage}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span className={styles.initials}>{siteConfig.name.charAt(0)}</span>
                    <div className={styles.imageGlow} />
                  </div>
                )}
                <div className={styles.imageOverlay} />
              </div>
              
              {/* Decorative elements */}
              <FloatingElement delay={0} y={10}>
                <div className={styles.floatingCard1}>
                  <span className={styles.floatingIcon}>🚀</span>
                  <span>Fast & Efficient</span>
                </div>
              </FloatingElement>
              
              <FloatingElement delay={1} y={12}>
                <div className={styles.floatingCard2}>
                  <span className={styles.floatingIcon}>💡</span>
                  <span>Creative Solutions</span>
                </div>
              </FloatingElement>
              
              <motion.div 
                className={styles.decorCircle}
                style={{ rotate }}
              />
              <div className={styles.decorDots} />
            </motion.div>

            {/* Experience Badge */}
            <motion.div
              className={styles.experienceBadge}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
              <span className={styles.expNumber}>
                <AnimatedCounter target="1" suffix="+" />
              </span>
              <span className={styles.expText}>Years of<br/>Experience</span>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            className={styles.contentSide}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={styles.headline}>
              {aboutContent.headline.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className={i === 0 ? styles.headlineHighlight : ''}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </h2>

            <div className={styles.paragraphs}>
              {aboutContent.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className={styles.paragraph}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Stats Grid */}
            <motion.div 
              className={styles.statsGrid}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {aboutContent.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={styles.statCard}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className={styles.statValue}>
                    <AnimatedCounter 
                      target={stat.value.replace(/\D/g, '')} 
                      suffix={stat.value.replace(/\d/g, '')} 
                    />
                  </span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div 
              className={styles.ctaWrapper}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Button
                href={aboutContent.resumeLink}
                variant="primary"
                size="large"
              >
                {aboutContent.resumeText}
                <Icon name="download" size={18} />
              </Button>
              <Button
                to="/contact"
                variant="outline"
                size="large"
              >
                Let's Connect
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div 
          className={styles.skillsSection}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.skillsHeader}>
            <h3 className={styles.skillsTitle}>
              Technical <span className={styles.titleHighlight}>Expertise</span>
            </h3>
            <p className={styles.skillsSubtitle}>
              Technologies and tools I work with daily
            </p>
          </div>

          <div className={styles.skillsGrid}>
            {skillsContent.categories.map((category, catIndex) => (
              <motion.div
                key={category.name}
                className={styles.skillCategory}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryIcon}>
                    {catIndex === 0 ? '⚡' : catIndex === 1 ? '🎨' : catIndex === 2 ? '🔧' : '📱'}
                  </span>
                  <h4 className={styles.categoryTitle}>{category.name}</h4>
                </div>
                <div className={styles.skillTags}>
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className={styles.skillTag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ 
                        scale: 1.1, 
                        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                        color: 'white'
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
