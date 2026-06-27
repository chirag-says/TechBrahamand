import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './SocialProof.css';

const METRICS = [
  { value: 63,  suffix: '+', label: 'Projects' },
  { value: 18,  suffix: '',  label: 'Industries' },
  { value: 12,  suffix: '',  label: 'Technologies' },
  { value: 99,  suffix: '%', label: 'Retention' },
  { value: 300, suffix: '+', label: 'AI Consultations' },
];

/* CountUp — RAF-driven, ease-out cubic */
const CountUp = ({ target, suffix = '', duration = 2, delay = 0, active }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const delayMs = delay * 1000;
    const durMs = duration * 1000;
    let raf;
    const tick = (now) => {
      const elapsed = now - start - delayMs;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / durMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, delay]);

  return <>{count}{suffix}</>;
};

const SocialProof = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="social-proof" ref={ref} aria-label="Key metrics">
      <motion.p
        className="social-proof__label"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        Trusted By Numbers
      </motion.p>

      <div className="social-proof__grid">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            className="proof-metric"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.15 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="proof-metric__number">
              <CountUp target={m.value} suffix={m.suffix} delay={0.2 + i * 0.1} active={isInView} />
            </span>
            <span className="proof-metric__label">{m.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SocialProof;
