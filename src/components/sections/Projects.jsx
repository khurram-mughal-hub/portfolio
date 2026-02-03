/**
 * Projects Section Component - Interactive Gallery
 * Stunning portfolio showcase with 3D cards and morphing animations
 */

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects, projectCategories } from '../../data/features';
import { Button, Icon } from '../common';
import styles from './Projects.module.css';

// 3D Project Card with sophisticated hover
const ProjectCard = ({ project, index }) => {
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
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.article
      ref={cardRef}
      className={styles.projectCard}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      layout
    >
      {/* Gradient border */}
      <div className={styles.cardBorder} />
      
      {/* Card content */}
      <div className={styles.cardInner}>
        {/* Image area */}
        <div className={styles.imageWrapper}>
          <div className={styles.imagePlaceholder}>
            <motion.span 
              className={styles.projectNumber}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>
            <div className={styles.placeholderDecor}>
              <div className={styles.decorLine1} />
              <div className={styles.decorLine2} />
              <div className={styles.decorCircle} />
            </div>
          </div>
          
          {/* Hover overlay */}
          <motion.div 
            className={styles.imageOverlay}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div className={styles.overlayContent}>
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.overlayButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="externalLink" size={20} />
                <span>Live Demo</span>
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.overlayButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="github" size={20} />
                <span>Source</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        {/* Content area */}
        <div className={styles.cardContent}>
          <div className={styles.contentHeader}>
            <span className={styles.category}>{project.category}</span>
            <span className={styles.year}>2024</span>
          </div>
          
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>
          
          {/* Tech stack */}
          <div className={styles.techStack}>
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <motion.span 
                key={tech} 
                className={styles.techTag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + techIndex * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 4 && (
              <span className={styles.techMore}>+{project.technologies.length - 4}</span>
            )}
          </div>
          
          {/* Learn more link */}
          <motion.a 
            href={project.liveUrl}
            className={styles.learnMore}
            whileHover={{ x: 5 }}
          >
            <span>View Project</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>
      </div>
      
      {/* Shine effect */}
      <div className={styles.shineEffect} />
    </motion.article>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => 
        project.category.toLowerCase().replace(/[/ ]/g, '-') === activeCategory
      );

  return (
    <section id="projects" className={styles.projects}>
      {/* Background */}
      <div className={styles.background}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
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
            transition={{ delay: 0.2 }}
          >
            <span className={styles.badgeDot} />
            Portfolio
          </motion.span>
          <h2 className={styles.sectionTitle}>
            Featured <span className={styles.titleHighlight}>Work</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            A curated selection of projects showcasing my expertise in design and development
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className={styles.filterTabs}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {projectCategories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`${styles.filterTab} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className={styles.tabText}>{category.label}</span>
              {activeCategory === category.id && (
                <motion.span
                  className={styles.tabIndicator}
                  layoutId="tabIndicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className={styles.grid}>
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <motion.div
          className={styles.viewAllWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="outline" size="large">
            View All Projects
            <Icon name="arrowRight" size={18} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
