/**
 * Button Component
 * Reusable button with multiple variants and animations
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { buttonHover, buttonTap } from '../../utils/animations';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'medium', // small, medium, large
  href,
  to,
  onClick,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  loading = false,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    loading ? styles.loading : '',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && <span className={styles.spinner}></span>}
      {icon && iconPosition === 'left' && !loading && (
        <span className={styles.iconLeft}>{icon}</span>
      )}
      <span className={styles.text}>{children}</span>
      {icon && iconPosition === 'right' && !loading && (
        <span className={styles.iconRight}>{icon}</span>
      )}
    </>
  );

  const motionProps = {
    whileHover: !disabled && !loading ? buttonHover : undefined,
    whileTap: !disabled && !loading ? buttonTap : undefined,
    className: buttonClasses
  };

  // External link
  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  // Internal link (React Router)
  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to} className={styles.linkWrapper} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  // Regular button
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      {...motionProps}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;
