import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

/* ── Paper scan beam hook ── */
function useScanBeam(beamRef) {
  useEffect(() => {
    const beam = beamRef.current;
    if (!beam) return;

    const papers = [[0.13, 0.72], [0.08, 0.66], [0.15, 0.74]];
    let paperIdx = 0;
    let phase = 'scan';
    let phaseStart = null;
    const scanDur = 1800, pauseDur = 320, jumpDur = 280;
    let rafId;

    function tick(ts) {
      if (!phaseStart) phaseStart = ts;
      const elapsed = ts - phaseStart;
      const [start, end] = papers[paperIdx];

      if (phase === 'scan') {
        const t = Math.min(elapsed / scanDur, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        beam.style.top = (start + (end - start) * ease) * 100 + '%';
        beam.style.opacity = t < 0.06 ? String(t / 0.06) : t > 0.94 ? String((1 - t) / 0.06) : '1';
        if (t >= 1) { phase = 'pause'; phaseStart = ts; }
      } else if (phase === 'pause') {
        beam.style.opacity = '0';
        if (elapsed >= pauseDur) { paperIdx = (paperIdx + 1) % papers.length; phase = 'jump'; phaseStart = ts; }
      } else if (phase === 'jump') {
        if (elapsed >= jumpDur) { beam.style.top = papers[paperIdx][0] * 100 + '%'; phase = 'scan'; phaseStart = ts; }
      }
      rafId = requestAnimationFrame(tick);
    }

    const timer = setTimeout(() => { rafId = requestAnimationFrame(tick); }, 600);
    return () => { clearTimeout(timer); cancelAnimationFrame(rafId); };
  }, [beamRef]);
}

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
  const beamRef = useRef(null);
  useScanBeam(beamRef);

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

          {/* Papers frame */}
          <div className="tb-hero-frame">

            {/* Paper 1: BRD (back left) */}
            <div className="tb-hero-paper tb-hero-paper--brd">
              <div className="tb-paper-lines tb-paper-lines--green" />
              <div className="tb-paper-content">
                <div className="tb-paper-header tb-paper-header--blue">B.R.D.</div>
                <div className="tb-paper-body" style={{ fontFamily: 'Caveat, cursive', fontSize: '15px', color: '#1a1a2e', lineHeight: 1.55 }}>
                  Project: ___________<br />Client: ___________<br />Budget: ₹__________
                </div>
                <div className="tb-paper-checks">
                  ☐ User Auth &amp; Login<br />
                  ☐ Dashboard UI<br />
                  ☐ API Integration<br />
                  ☐ Mobile Ready<br />
                  ☐ Analytics
                </div>
                <div className="tb-paper-sign">Sign: _______________</div>
              </div>
            </div>

            {/* Paper 2: Idea (front center) */}
            <div className="tb-hero-paper tb-hero-paper--idea">
              <div className="tb-paper-redline" />
              <div className="tb-paper-lines tb-paper-lines--blue" />
              <div className="tb-paper-content" style={{ paddingLeft: '10px' }}>
                <div className="tb-paper-idea-title">MY IDEA 💡</div>
                <svg width="38" height="44" viewBox="0 0 38 44" fill="none" className="tb-paper-bulb" aria-hidden="true">
                  <ellipse cx="19" cy="16" rx="10" ry="11" stroke="#1a1a2e" strokeWidth="1.5" />
                  <path d="M13 26h12M14 30h10M16 34h6" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M16 38h6" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
                  <path d="M19 5V2M7 9L5 7M31 9l2-2M5 18H2M36 18h-3" stroke="#1a1a2e" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <div className="tb-paper-idea-quote">
                  "An app that ______<br />_______ for people<br />who need _______"
                </div>
                <div className="tb-paper-idea-features">
                  → Feature One<br />→ Feature Two<br />→ Feature Three
                </div>
                <div className="tb-paper-idea-cost">Total Cost = ❓</div>
              </div>
            </div>

            {/* Paper 3: Specs (back right) */}
            <div className="tb-hero-paper tb-hero-paper--specs">
              <div className="tb-paper-lines tb-paper-lines--warm" />
              <div className="tb-paper-content">
                <div className="tb-paper-header tb-paper-header--orange">TECH SPECS</div>
                <div className="tb-paper-spec-label">Phase timeline:</div>
                <div className="tb-paper-timeline">
                  <div className="tb-tl-dot tb-tl-dot--empty" />
                  <div className="tb-tl-line tb-tl-line--solid" />
                  <div className="tb-tl-dot tb-tl-dot--filled" />
                  <div className="tb-tl-line tb-tl-line--dim" />
                  <div className="tb-tl-dot tb-tl-dot--dim" />
                </div>
                <div className="tb-paper-spec-list">
                  Backend: Node.js<br />Frontend: React<br />DB: PostgreSQL<br />↳ ~3 months<br />↳ 3 devs needed
                </div>
                <div className="tb-paper-spec-note">*rough estimates</div>
              </div>
            </div>

            {/* Scan beam */}
            <div ref={beamRef} className="tb-hero-scan-beam" aria-hidden="true" />

            {/* Corner brackets */}
            <div className="tb-corner tb-corner--tl" aria-hidden="true" />
            <div className="tb-corner tb-corner--tr" aria-hidden="true" />
            <div className="tb-corner tb-corner--bl" aria-hidden="true" />
            <div className="tb-corner tb-corner--br" aria-hidden="true" />
          </div>

          {/* Floating chatbot preview card */}
          <motion.div {...fadeIn(0.9)} className="tb-hero-chat-card">
            <div className="tb-chat-header">
              <div className="tb-chat-avatar">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <circle cx="6.5" cy="6.5" r="2.5" fill="oklch(42% 0.18 195)" />
                  <circle cx="6.5" cy="6.5" r="5" stroke="oklch(42% 0.18 195)" strokeWidth="1" opacity="0.35" />
                </svg>
              </div>
              <div className="tb-chat-meta">
                <div className="tb-chat-name">Project Estimator AI</div>
                <div className="tb-chat-powered">POWERED BY TECHBRAHMAND</div>
              </div>
              <div className="tb-chat-live-dot" />
            </div>
            <div className="tb-chat-bubble">
              <p className="tb-chat-text">"Tell me about your project — I'll generate a real-time budget and roadmap."</p>
            </div>
            <Link to="/chatbot" className="tb-chat-cta">
              START ONBOARDING
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M1.5 5.5h8M6 2l3.5 3.5L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>


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