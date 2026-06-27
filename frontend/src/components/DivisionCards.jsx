import React from 'react';
import { motion } from 'framer-motion';
import './DivisionCards.css';

const DIVISIONS = [
  {
    name: 'BRAHMA',
    verb: 'Create',
    accent: '#EAB308',
    description: 'From zero to product. We architect, design, and build your digital foundation from the ground up.',
  },
  {
    name: 'VISHNU',
    verb: 'Scale',
    accent: '#3B82F6',
    description: 'Optimize, automate, and scale what works. Infrastructure that grows as fast as your ambition.',
  },
  {
    name: 'MAHESH',
    verb: 'Dominate',
    accent: '#9333EA',
    description: 'AI-powered transformation. We rebuild legacy into weapons. Total market dominance.',
  },
];

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
        <motion.div
          key={div.name}
          className="division-card"
          style={{
            '--card-accent': div.accent,
            '--card-accent-15': `${div.accent}26`,
            '--card-accent-08': `${div.accent}14`,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.6,
            delay: 0.12 * i,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Top accent line */}
          <div className="division-card__accent-line" />

          {/* Division name */}
          <span className="division-card__name">{div.name}</span>

          {/* Separator */}
          <div className="division-card__separator" />

          {/* Verb */}
          <span className="division-card__verb">{div.verb}</span>

          {/* Description — hidden, reveals on hover */}
          <p className="division-card__desc">{div.description}</p>

          {/* Bottom accent dot */}
          <span className="division-card__dot" />
        </motion.div>
      ))}
    </div>
  </section>
);

export default DivisionCards;
