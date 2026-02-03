/**
 * Loading Screen Component
 * Creative loading animation when site first loads
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);

  const taglines = [
    "Crafting Digital Excellence",
    "Where Ideas Come to Life",
    "Building Tomorrow's Web"
  ];

  useEffect(() => {
    // Tagline rotation every 1 second
    const taglineTimer = setInterval(() => {
      setTaglineIndex(prev => (prev + 1) % taglines.length);
    }, 1000);

    // Progress over 3 seconds (30 steps at 100ms each)
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          clearInterval(taglineTimer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        // Increment ~3.5% per 100ms to reach 100% in ~3 seconds
        return Math.min(prev + 3.5, 100);
      });
    }, 100);

    return () => {
      clearInterval(progressTimer);
      clearInterval(taglineTimer);
    };
  }, [onComplete]);

  const text = "KHURRAM";
  
  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className={styles.loadingScreen}
          exit={{ 
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Animated background grid - using CSS animations */}
          <div className={styles.gridBackground}>
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={styles.gridLine}
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className={styles.content}>
            {/* Animated logo text */}
            <div className={styles.logoContainer}>
              {text.split('').map((char, index) => (
                <motion.span
                  key={index}
                  className={styles.logoChar}
                  initial={{ y: 100, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.6,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                className={styles.logoDot}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, type: 'spring', stiffness: 500 }}
              >
                .
              </motion.span>
            </div>

            {/* Catchy Tagline */}
            <div className={styles.taglineContainer}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={taglineIndex}
                  className={styles.tagline}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {taglines[taglineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className={styles.progressContainer}>
              <div
                className={styles.progressBar}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
              <span className={styles.progressText}>
                {Math.round(Math.min(progress, 100))}%
              </span>
            </div>

            {/* Loading text */}
            <p className={`${styles.loadingText} ${styles.loadingPulse}`}>
              ✨ Loading Magic...
            </p>
          </div>

          {/* Floating particles - using CSS animations */}
          <div className={styles.particles}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={styles.particle}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`,
                  transform: `scale(${Math.random() * 0.5 + 0.5})`,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
