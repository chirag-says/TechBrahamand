import React from 'react';
import { motion } from 'framer-motion';
import './TechStackStrip.css';

/**
 * Infinite horizontal marquee of tech stack names.
 * Pure CSS-keyframe scroll — Framer Motion only for entrance fade.
 * Two duplicate tracks run side-by-side for gapless looping.
 */
const STACK = [
  'React',
  'Next.js',
  'Flutter',
  'Python',
  'Node',
  'Docker',
  'MongoDB',
  'PostgreSQL',
  'AWS',
  'Azure',
  'Groq',
  'OpenAI',
  'TensorFlow',
  'Redis',
  'Firebase',
];

const TechStackStrip = () => {
  // Render the full list twice per track for seamless loop
  const items = [...STACK, ...STACK];

  return (
    <motion.section
      className="tech-strip"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      aria-label="Technology stack"
    >
      {/* Fade edges */}
      <div className="tech-strip__fade tech-strip__fade--left" />
      <div className="tech-strip__fade tech-strip__fade--right" />

      {/* Track — two identical children for CSS infinite scroll */}
      <div className="tech-strip__track">
        <div className="tech-strip__scroll" aria-hidden="true">
          {items.map((name, i) => (
            <span key={i} className="tech-strip__item">
              <span className="tech-strip__dot" />
              {name}
            </span>
          ))}
        </div>
        <div className="tech-strip__scroll" aria-hidden="true">
          {items.map((name, i) => (
            <span key={`dup-${i}`} className="tech-strip__item">
              <span className="tech-strip__dot" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TechStackStrip;
