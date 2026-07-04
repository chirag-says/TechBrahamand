import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, CalendarRange, Fingerprint, MousePointer2 } from 'lucide-react';
import './DivisionCards.css';

const container = {
  rest:  { transition: { staggerChildren: 0.1, staggerDirection: -1 } },
  hover: { transition: { staggerChildren: 0.1, staggerDirection:  1 } },
};

const card = {
  rest:  { scale: 1,    y: 0,   transition: { duration: 0.4, ease: [1, 0.18, 0.6, 0.8] } },
  hover: { scale: 1.05, y: -10, transition: { duration: 0.4, ease: [1, 0.18, 0.6, 0.8] } },
};

const pointer2 = {
  rest:  { x: 0,    rotate: 0,  transition: { duration: 0.4, ease: [1, 0.18, 0.6, 0.8] } },
  hover: { x: -100, rotate: 20, transition: { duration: 0.6, ease: [1, 0.18, 0.6, 0.8] } },
};

const DIVISIONS = [
  {
    name:   'BRAHMA',
    badge:  'Build',
    title:  'From Idea to Product',
    desc:   'We architect, design, and build your digital foundation from the ground up.',
    accent: '#EAB308',
    cta:    'Start Building',
  },
  {
    name:   'VISHNU',
    badge:  'Scale',
    title:  'Grow Without Limits',
    desc:   'Optimize, automate, and scale what works. Infrastructure built for your ambition.',
    accent: '#3B82F6',
    cta:    'Scale Now',
  },
  {
    name:   'MAHESH',
    badge:  'Dominate',
    title:  'Total Market Dominance',
    desc:   'AI-powered transformation. We rebuild legacy systems into competitive weapons.',
    accent: '#9333EA',
    cta:    'Dominate',
  },
];

function DivisionCard({ div, index }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: 0.12 * index, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        variants={container}
        animate={isHover ? 'hover' : 'rest'}
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        className="div-card"
      >
        {/* Badge — replaces TextMatrixRain */}
        <span className="div-card__badge" style={{ color: div.accent }}>
          ● {div.badge.toUpperCase()}
        </span>

        <h3 className="div-card__title">{div.title}</h3>

        <p className="div-card__desc">{div.desc}</p>

        {/* Stacked card section — exact CardAnimation layout */}
        <section className="div-card__stack-section">

          {/* Mouse pointer flies in */}
          <motion.div
            variants={pointer2}
            className="div-card__pointer"
          >
            <MousePointer2 size={22} />
          </motion.div>

          {/* Back card */}
          <motion.div variants={card} className="div-card__mini div-card__mini--back">
            <div className="div-card__mini-row">
              <div className="div-card__mini-bars">
                <div className="div-card__mini-bar div-card__mini-bar--wide" />
                <div className="div-card__mini-bar div-card__mini-bar--narrow" />
              </div>
              <CalendarRange size={14} style={{ color: 'rgba(0,0,0,0.35)', flexShrink: 0 }} />
            </div>
          </motion.div>

          {/* Middle card — accent colour */}
          <motion.div
            variants={card}
            className="div-card__mini div-card__mini--mid"
            style={{ background: div.accent, borderColor: 'transparent' }}
          >
            <div className="div-card__mini-row">
              <div className="div-card__mini-bars">
                <div className="div-card__mini-bar div-card__mini-bar--wide"   style={{ background: 'rgba(255,255,255,0.25)' }} />
                <div className="div-card__mini-bar div-card__mini-bar--narrow" style={{ background: 'rgba(255,255,255,0.25)' }} />
              </div>
              <Fingerprint size={14} style={{ color: 'rgba(255,255,255,0.85)', flexShrink: 0 }} />
            </div>
          </motion.div>

          {/* Front card — CTA */}
          <motion.div variants={card} className="div-card__mini div-card__mini--front">
            <div className="div-card__mini-row">
              <div className="div-card__mini-bars">
                <div className="div-card__mini-bar div-card__mini-bar--wide" />
                <div className="div-card__mini-bar div-card__mini-bar--narrow" />
              </div>
              <Bookmark size={14} style={{ color: 'rgba(0,0,0,0.35)', flexShrink: 0 }} />
            </div>
            {/* Coloured tray + CTA button */}
            <div className="div-card__mini-tray">
              <Link
                to="/chatbot"
                className="div-card__mini-cta"
                style={{
                  borderColor: isHover ? 'transparent' : 'rgba(0,0,0,0.15)',
                  background:  isHover ? div.accent : '#fff',
                  color:       isHover ? '#fff' : '#111',
                }}
              >
                {div.cta}
              </Link>
            </div>
          </motion.div>

        </section>
      </motion.div>
    </motion.div>
  );
}

const DivisionCards = () => (
  <section className="divisions" aria-label="Our three divisions">
    <motion.p
      className="divisions__label"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      Three Divisions. One Mission.
    </motion.p>

    <div className="divisions__grid">
      {DIVISIONS.map((div, i) => (
        <DivisionCard key={div.name} div={div} index={i} />
      ))}
    </div>
  </section>
);

export default DivisionCards;
