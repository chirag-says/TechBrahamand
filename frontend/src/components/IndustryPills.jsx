import React from 'react';
import { motion } from 'framer-motion';
import './IndustryPills.css';

const INDUSTRIES = [
  { name: 'Healthcare', accent: '#10B981' },
  { name: 'FinTech',    accent: '#6366F1' },
  { name: 'EdTech',     accent: '#F59E0B' },
  { name: 'Retail',     accent: '#EC4899' },
  { name: 'AI',         accent: '#8B5CF6' },
  { name: 'SaaS',       accent: '#3B82F6' },
  { name: 'Travel',     accent: '#14B8A6' },
  { name: 'Real Estate', accent: '#F97316' },
  { name: 'Education',  accent: '#EAB308' },
  { name: 'Manufacturing', accent: '#64748B' },
];

const IndustryPills = () => (
  <section className="industry-pills" aria-label="Industries we serve">
    <motion.p
      className="industry-pills__label"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      Industries We Serve
    </motion.p>
    <div className="industry-pills__row">
      {INDUSTRIES.map((ind, i) => (
        <motion.span
          key={ind.name}
          className="industry-pill"
          style={{ '--pill-accent': ind.accent }}
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{
            duration: 0.45,
            delay: 0.06 * i,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="industry-pill__dot" />
          {ind.name}
        </motion.span>
      ))}
    </div>
  </section>
);

export default IndustryPills;
