/**
 * Loading Component
 * Skeleton screens and spinners for loading states
 */

import { motion } from 'framer-motion';
import styles from './Loading.module.css';

// Full page loader
export const PageLoader = () => (
  <div className={styles.pageLoader}>
    <motion.div
      className={styles.spinner}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
    <p className={styles.loadingText}>Loading...</p>
  </div>
);

// Skeleton card for loading states
export const SkeletonCard = ({ height = '200px' }) => (
  <div className={styles.skeletonCard} style={{ height }}>
    <div className={styles.skeletonImage}></div>
    <div className={styles.skeletonContent}>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText} style={{ width: '60%' }}></div>
    </div>
  </div>
);

// Skeleton text line
export const SkeletonText = ({ width = '100%', height = '1rem' }) => (
  <div 
    className={styles.skeletonLine} 
    style={{ width, height }}
  ></div>
);

// Inline spinner
export const Spinner = ({ size = 24, color = 'var(--primary-color)' }) => (
  <motion.div
    className={styles.inlineSpinner}
    style={{ width: size, height: size, borderColor: `${color} transparent ${color} transparent` }}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  />
);

// Default export with all variants
const Loading = {
  Page: PageLoader,
  Card: SkeletonCard,
  Text: SkeletonText,
  Spinner
};

export default Loading;
