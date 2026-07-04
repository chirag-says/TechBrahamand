import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ScrollReveal — a reusable wrapper that animates children into view
 * when they scroll into the viewport.
 *
 * Automatically detects `.bezel-viewport` as the IntersectionObserver root
 * so it works correctly inside the custom scroll container.
 *
 * Props:
 *   direction  — 'up' | 'down' | 'left' | 'right' | 'none' (default: 'up')
 *   delay      — stagger delay in seconds (default: 0)
 *   duration   — animation duration (default: 0.8)
 *   distance   — travel distance in px (default: 60)
 *   scale      — initial scale (default: 1)
 *   blur       — initial blur in px (default: 0)
 *   once       — trigger only once (default: true)
 *   threshold  — IntersectionObserver amount (default: 0.15)
 *   className  — passthrough className
 *   style      — passthrough style
 */
const directionOffsets = {
  up:    { y:  1, x: 0 },
  down:  { y: -1, x: 0 },
  left:  { y:  0, x:  1 },
  right: { y:  0, x: -1 },
  none:  { y:  0, x: 0 },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  scale = 1,
  blur = 0,
  once = true,
  threshold = 0.15,
  className = '',
  style = {},
  ...rest
}) {
  const ref = useRef(null);
  const rootRef = useRef(null);

  /* Grab the bezel-viewport as IntersectionObserver root on mount */
  useEffect(() => {
    rootRef.current = document.querySelector('.bezel-viewport');
  }, []);

  const isInView = useInView(ref, { once, amount: threshold, root: rootRef });

  const offset = directionOffsets[direction] || directionOffsets.up;

  const initial = {
    opacity: 0,
    y: offset.y * distance,
    x: offset.x * distance,
    scale,
    filter: blur > 0 ? `blur(${blur}px)` : 'blur(0px)',
  };

  const animate = isInView
    ? {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
      }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // custom cubic-bezier for premium feel
      }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export { ScrollReveal };
