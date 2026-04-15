import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './TextRevealAnimation.css';

/**
 * TextRevealAnimation
 * 
 * Cinematic letter-by-letter text reveal for "TECH BRAHMAND".
 * Inspired by the Deadpool title-card style — each letter fades in
 * from below with blur, scale, and staggered timing, then a shine
 * sweep crosses the completed text.
 *
 * Drop-in replacement for the static <h1>TECH BRAHMAND</h1>.
 * Preserves the same className / styling as the original.
 */

const TEXT = 'TECH BRAHMAND';

/* ─── Per-letter animation variants ─── */
const letterVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 1.15,
    filter: 'blur(12px)',
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      delay: 0.3 + i * 0.1,           // stagger each letter by 100ms
      ease: [0.16, 1, 0.3, 1],        // custom cubic for cinematic decel
    },
  }),
};

/* ─── Shine sweep animation ─── */
const shineVariants = {
  hidden: { x: '-120%' },
  sweep: {
    x: '280%',
    transition: {
      duration: 1.0,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const TextRevealAnimation = ({ className = '' }) => {
  const [allRevealed, setAllRevealed] = useState(false);
  const shineControls = useAnimation();

  // Split TEXT into an array of { char, globalIndex }
  const words = TEXT.split(' ');
  let globalIdx = 0;
  const wordData = words.map((word) => {
    const letters = word.split('').map((char) => ({
      char,
      index: globalIdx++,
    }));
    return { word, letters };
  });

  const totalLetters = globalIdx;

  // Calculate when the last letter finishes animating
  const lastLetterDelay = 0.3 + (totalLetters - 1) * 0.1;
  const lastLetterDuration = 0.55;
  const revealCompleteAt = (lastLetterDelay + lastLetterDuration) * 1000;

  // Trigger shine after all letters are visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setAllRevealed(true);
      shineControls.start('sweep');
    }, revealCompleteAt + 200); // 200ms buffer

    return () => clearTimeout(timer);
  }, [shineControls, revealCompleteAt]);

  return (
    <h1
      className={`font-extrabold text-[36px] lg:text-[42px] tracking-wide text-[#1A1E23] uppercase ${className}`}
      style={{ fontFamily: "'Cinzel', serif" }}
    >
      <span className="text-reveal-shine-wrapper">
        {/* Glow background */}
        <span
          className={`text-reveal-glow ${allRevealed ? 'active' : ''}`}
          aria-hidden="true"
        />

        {/* Letter container */}
        <motion.span
          className="text-reveal-container"
          initial="hidden"
          animate="visible"
          aria-label={TEXT}
        >
          {wordData.map((wordObj, wIdx) => (
            <React.Fragment key={wIdx}>
              {wIdx > 0 && (
                <span className="text-reveal-space" aria-hidden="true" />
              )}
              <span className="text-reveal-word">
                {wordObj.letters.map(({ char, index }) => (
                  <motion.span
                    key={index}
                    className="text-reveal-letter"
                    custom={index}
                    variants={letterVariants}
                    aria-hidden="true"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </React.Fragment>
          ))}
        </motion.span>

        {/* Shine sweep overlay */}
        <span className="text-reveal-shine-overlay" aria-hidden="true">
          <motion.span
            className="text-reveal-shine-gradient"
            variants={shineVariants}
            initial="hidden"
            animate={shineControls}
          />
        </span>
      </span>
    </h1>
  );
};

export default TextRevealAnimation;
