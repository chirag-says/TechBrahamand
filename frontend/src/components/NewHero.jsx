import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeroInteractiveCard } from './HeroInteractiveCard';
import './NewHero.css';

/* ── animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, delay, ease: 'easeOut' } },
});

const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
});

/* ── Stat item ── */
function Stat({ value, suffix, label, suffixStyle }) {
  return (
    <div className="tb-hero-stat">
      <div className="tb-hero-stat-num">
        {value}
        <span className="tb-hero-stat-suffix" style={suffixStyle}>{suffix}</span>
      </div>
      <div className="tb-hero-stat-label">{label}</div>
    </div>
  );
}

const NewHero = () => {

  return (
    <div className="tb-hero-root">

      {/* ── Background: dot grid + teal glow ── */}
      <div className="tb-hero-bg" aria-hidden="true">
        <div className="tb-hero-bg-dots" />
        <div className="tb-hero-bg-glow" />
        <div className="tb-hero-bg-fade" />
      </div>

      {/* ── HERO BODY ── */}
      <div className="tb-hero-body">

        {/* ════ LEFT COLUMN ════ */}
        <div className="tb-hero-left">

          {/* Logo + Brand name */}
          <motion.div {...fadeIn(0)} className="tb-hero-logo-wrap">
            <img
              src="/techbrahmand-logo.png"
              alt="Tech Brahmand — Building Digital Futures"
              className="tb-hero-logo"
            />
            <div className="tb-hero-brand-name">
              <span className="tb-hero-brand-tech">TECH</span>
              <span className="tb-hero-brand-brahmand">BRAHMAND</span>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div {...fadeIn(0.05)} className="tb-hero-badge">
            <span className="tb-hero-badge-dot" />
            <span className="tb-hero-badge-text">AI-POWERED CLIENT ONBOARDING</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 {...fadeUp(0.18)} className="tb-hero-h1">
            Turning Ideas<br />
            Into <em className="tb-hero-h1-accent">Intelligent</em><br />
            Experiences
          </motion.h1>

          {/* Sub */}
          <motion.p {...fadeUp(0.3)} className="tb-hero-sub">
            Describe your vision — our AI Architect instantly builds a real-time budget and roadmap tailored to your project.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.42)} className="tb-hero-ctas">
            <Link to="/chatbot" className="tb-hero-cta-primary">
              Estimate My Project
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/services" className="tb-hero-cta-ghost">
              Explore Services
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.54)} className="tb-hero-stats">
            <Stat value="50" suffix="+" label="PROJECTS DELIVERED" suffixStyle={{ color: 'oklch(42% 0.18 195)' }} />
            <div className="tb-hero-stat-divider" />
            <Stat value="99" suffix="%" label="CLIENT RETENTION" suffixStyle={{ color: 'oklch(42% 0.18 195)' }} />
            <div className="tb-hero-stat-divider" />
            <Stat value="24" suffix="/7" label="ACTIVE SUPPORT" suffixStyle={{ color: 'oklch(42% 0.18 195)' }} />
            <div className="tb-hero-stat-divider" />
            <Stat value="5" suffix="★" label="TRUSTED PARTNER" suffixStyle={{ color: 'oklch(42% 0.18 195)', fontSize: '17px' }} />
          </motion.div>
        </div>

        {/* ════ RIGHT COLUMN ════ */}
        <motion.div {...fadeIn(0.28)} className="tb-hero-right">

          {/* Soft glow behind frame */}
          <div className="tb-hero-right-glow" aria-hidden="true" />

          {/* Interactive card */}
          <HeroInteractiveCard />



        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div {...fadeIn(1.4)} className="tb-hero-scroll">
        <div className="tb-hero-scroll-label">SCROLL</div>
        <div className="tb-hero-scroll-line" />
      </motion.div>

    </div>
  );
};

export default NewHero;