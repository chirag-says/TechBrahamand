import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  Layers,
  Code2,
  IndianRupee,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import './LiveProposal.css';

const LiveProposal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const row = (delay) => ({
    initial: { opacity: 0, x: -16 },
    animate: isInView ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="live-proposal" ref={ref} aria-label="Live AI proposal demo">
      {/* Section label */}
      <motion.p
        className="live-proposal__label"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Sparkles size={12} strokeWidth={2.5} />
        See What Our AI Builds
      </motion.p>

      <motion.p
        className="live-proposal__subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        Every consultation generates a live, editable project proposal
      </motion.p>

      {/* Card */}
      <motion.div
        className="proposal-card"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top shimmer */}
        <div className="proposal-card__shimmer" />

        {/* Header */}
        <div className="proposal-card__header">
          <div className="proposal-card__header-icon">
            <BrainCircuit size={16} strokeWidth={2} />
          </div>
          <div className="proposal-card__header-text">
            <span className="proposal-card__header-title">AI Solution Architect</span>
            <span className="proposal-card__header-badge">Live Output</span>
          </div>
          <div className="proposal-card__live-dot" />
        </div>

        {/* Divider */}
        <div className="proposal-card__divider" />

        {/* Project name */}
        <motion.div className="proposal-card__project" {...row(0.35)}>
          <span className="proposal-card__project-label">PROJECT</span>
          <span className="proposal-card__project-name">AI Hospital Management System</span>
        </motion.div>

        {/* Details grid */}
        <div className="proposal-card__grid">
          {/* Division */}
          <motion.div className="proposal-card__field" {...row(0.45)}>
            <Layers size={13} className="proposal-card__field-icon" />
            <div className="proposal-card__field-text">
              <span className="proposal-card__field-label">Recommended Division</span>
              <span className="proposal-card__field-value proposal-card__field-value--brahma">BRAHMA</span>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div className="proposal-card__field" {...row(0.55)}>
            <Code2 size={13} className="proposal-card__field-icon" />
            <div className="proposal-card__field-text">
              <span className="proposal-card__field-label">Technology</span>
              <div className="proposal-card__tech-pills">
                <span className="proposal-card__tech-pill">React</span>
                <span className="proposal-card__tech-pill">Node</span>
                <span className="proposal-card__tech-pill">MongoDB</span>
              </div>
            </div>
          </motion.div>

          {/* Cost */}
          <motion.div className="proposal-card__field" {...row(0.65)}>
            <IndianRupee size={13} className="proposal-card__field-icon" />
            <div className="proposal-card__field-text">
              <span className="proposal-card__field-label">Estimated Cost</span>
              <span className="proposal-card__field-value">₹68,000</span>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div className="proposal-card__field" {...row(0.75)}>
            <Clock size={13} className="proposal-card__field-icon" />
            <div className="proposal-card__field-text">
              <span className="proposal-card__field-label">Timeline</span>
              <span className="proposal-card__field-value">6 Weeks</span>
            </div>
          </motion.div>

          {/* Status */}
          <motion.div className="proposal-card__field" {...row(0.85)}>
            <CheckCircle2 size={13} className="proposal-card__field-icon proposal-card__field-icon--green" />
            <div className="proposal-card__field-text">
              <span className="proposal-card__field-label">Status</span>
              <span className="proposal-card__field-value proposal-card__field-value--green">Ready to Build</span>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="proposal-card__divider" />

        {/* CTA */}
        <motion.div {...row(0.95)}>
          <Link to="/chatbot" className="proposal-card__cta">
            <span>Try It Yourself</span>
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LiveProposal;
