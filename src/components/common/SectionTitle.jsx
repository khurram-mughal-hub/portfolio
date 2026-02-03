/**
 * SectionTitle Component
 * Consistent section headings with animations
 */

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import styles from './SectionTitle.module.css';

const SectionTitle = ({
  title,
  subtitle,
  alignment = 'center', // left, center, right
  light = false,
  className = ''
}) => {
  const containerClasses = [
    styles.container,
    styles[alignment],
    light ? styles.light : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      className={containerClasses}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {subtitle && (
        <motion.span className={styles.subtitle} variants={fadeInUp}>
          {subtitle}
        </motion.span>
      )}
      <motion.h2 className={styles.title} variants={fadeInUp}>
        {title}
      </motion.h2>
      <motion.div className={styles.divider} variants={fadeInUp}>
        <span className={styles.dividerLine}></span>
        <span className={styles.dividerDot}></span>
        <span className={styles.dividerLine}></span>
      </motion.div>
    </motion.div>
  );
};

export default SectionTitle;
