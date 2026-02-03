/**
 * Custom Cursor Component
 * Magnetic cursor effect that changes based on hover context
 * Optimized for performance with RAF and reduced state updates
 */

import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const rafRef = useRef(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const [hoverType, setHoverType] = useState('default');

  // Check for touch device early
  const [isTouchDevice] = useState(() => 
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );

  const updateCursorPosition = useCallback(() => {
    if (cursorRef.current && trailRef.current) {
      const { x, y } = positionRef.current;
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      trailRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e) => {
      positionRef.current = { x: e.clientX - 16, y: e.clientY - 16 };
      
      // Use RAF for smooth updates
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCursorPosition);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      if (target.closest('a, button, [data-cursor="pointer"]')) {
        setHoverType('pointer');
      } else if (target.closest('[data-cursor="text"]')) {
        setHoverType('text');
      } else if (target.closest('[data-cursor="expand"]')) {
        setHoverType('expand');
      } else {
        setHoverType('default');
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice, updateCursorPosition]);

  if (isTouchDevice) return null;

  const isHovering = hoverType !== 'default';

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${styles[hoverType]} ${isHovering ? styles.hovering : ''}`}
      />
      
      {/* Cursor trail */}
      <div
        ref={trailRef}
        className={`${styles.cursorTrail} ${isHovering ? styles.trailHovering : ''}`}
      />
    </>
  );
};

export default CustomCursor;
