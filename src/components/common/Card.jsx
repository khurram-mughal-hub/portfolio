/**
 * Card Component
 * Reusable card with hover effects and animations
 */

import { motion } from 'framer-motion';
import { fadeInUp, cardHover } from '../../utils/animations';
import styles from './Card.module.css';

const Card = ({
  children,
  variant = 'default', // default, elevated, outlined, gradient
  hoverable = true,
  clickable = false,
  onClick,
  className = '',
  padding = 'medium', // none, small, medium, large
  ...props
}) => {
  const cardClasses = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    hoverable ? styles.hoverable : '',
    clickable ? styles.clickable : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      className={cardClasses}
      variants={fadeInUp}
      whileHover={hoverable ? cardHover : undefined}
      onClick={clickable ? onClick : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card Header subcomponent
Card.Header = ({ children, className = '' }) => (
  <div className={`${styles.cardHeader} ${className}`}>
    {children}
  </div>
);

// Card Body subcomponent
Card.Body = ({ children, className = '' }) => (
  <div className={`${styles.cardBody} ${className}`}>
    {children}
  </div>
);

// Card Footer subcomponent
Card.Footer = ({ children, className = '' }) => (
  <div className={`${styles.cardFooter} ${className}`}>
    {children}
  </div>
);

export default Card;
