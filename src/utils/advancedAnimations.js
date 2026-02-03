/**
 * Advanced Animation Utilities
 * World-class animation presets for framer-motion
 */

// Smooth easing curves (industry-standard)
export const easings = {
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  springBouncy: { type: 'spring', stiffness: 400, damping: 25 },
  springGentle: { type: 'spring', stiffness: 100, damping: 20 },
};

// Text reveal animation (character by character)
export const textReveal = {
  container: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  },
  child: {
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
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  },
};

// Word reveal animation
export const wordReveal = {
  container: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  child: {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
};

// Line reveal animation
export const lineReveal = {
  hidden: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
  },
  visible: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Fade in with blur
export const fadeInBlur = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
    y: 20,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Scale in with rotation
export const scaleInRotate = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

// Slide in from direction
export const slideIn = (direction, delay = 0) => ({
  hidden: {
    x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

// Stagger container with custom values
export const staggerContainer = (staggerAmount = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerAmount,
      delayChildren,
    },
  },
});

// Card 3D tilt effect (for use with mouse position)
export const tilt3D = {
  rest: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Magnetic effect (for buttons/links)
export const magneticEffect = {
  rest: { x: 0, y: 0 },
  hover: (custom) => ({
    x: custom.x * 0.3,
    y: custom.y * 0.3,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15,
    },
  }),
};

// Parallax scroll animation - returns animation config based on scroll amount
export const parallax = (amount = 0.5) => ({
  y: amount * 100,
  transition: {
    y: {
      duration: 0.3,
      ease: 'linear',
    },
  },
});

// Reveal on scroll (bottom to top)
export const revealOnScroll = {
  hidden: {
    opacity: 0,
    y: 75,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Glowing pulse effect
export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(99, 102, 241, 0.3)',
      '0 0 40px rgba(99, 102, 241, 0.5)',
      '0 0 20px rgba(99, 102, 241, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Morphing background
export const morphBackground = {
  animate: {
    background: [
      'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      'linear-gradient(135deg, #ec4899 0%, #6366f1 100%)',
      'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Float animation
export const float = (duration = 3, distance = 10) => ({
  animate: {
    y: [-distance, distance, -distance],
    transition: {
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
});

// Rotate animation
export const rotate = (duration = 20) => ({
  animate: {
    rotate: 360,
    transition: {
      duration,
      repeat: Infinity,
      ease: 'linear',
    },
  },
});

// Draw SVG path
export const drawPath = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: 'easeInOut' },
      opacity: { duration: 0.3 },
    },
  },
};

// Counter animation hook helper
export const getCounterConfig = (end, duration = 2) => ({
  initial: 0,
  whileInView: end,
  transition: { duration, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true },
});

// Viewport settings
export const viewport = {
  once: true,
  amount: 0.3,
  margin: '-100px',
};

// Page transition variants
export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(10px)',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Card hover effect
export const cardHoverEffect = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Button hover effect
export const buttonHoverEffect = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17,
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Image reveal
export const imageReveal = {
  hidden: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Noise grain animation
export const noiseAnimation = {
  animate: {
    x: [0, -10, 5, -5, 10, 0],
    y: [0, 5, -10, 10, -5, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

export default {
  easings,
  textReveal,
  wordReveal,
  lineReveal,
  fadeInBlur,
  scaleInRotate,
  slideIn,
  staggerContainer,
  tilt3D,
  magneticEffect,
  parallax,
  revealOnScroll,
  glowPulse,
  morphBackground,
  float,
  rotate,
  drawPath,
  getCounterConfig,
  viewport,
  pageTransitionVariants,
  cardHoverEffect,
  buttonHoverEffect,
  imageReveal,
  noiseAnimation,
};
