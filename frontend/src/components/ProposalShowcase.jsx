import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  MessageSquareText,
  Layers,
  IndianRupee,
  Repeat2,
  Code2,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import './ProposalShowcase.css';

/* ── Differentiator steps ── */
const STEPS = [
  { icon: MessageSquareText, title: 'Describe Your Vision', desc: 'Tell our AI what you want to build — in plain English.' },
  { icon: Layers, title: 'Get a Division Match', desc: 'Brahma creates, Vishnu scales, Mahesh dominates.' },
  { icon: BrainCircuit, title: 'Receive Architecture', desc: 'Tech stack, feature breakdown, timeline — recommended live.' },
  { icon: IndianRupee, title: 'Transparent Quotation', desc: 'Itemized cost breakdown. No hidden fees, no guesswork.' },
  { icon: Repeat2, title: 'Refine Interactively', desc: 'Swap technologies, toggle features. The proposal evolves with you.' },
];

const ProposalShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const row = (delay) => ({
    initial: { opacity: 0, x: -12 },
    animate: isInView ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="showcase" ref={ref} aria-label="AI-powered proposal showcase">

      {/* Section header — centered above both boxes */}
      <motion.div
        className="showcase__header"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="showcase__tag">
          <Sparkles size={11} strokeWidth={2.5} />
          What Makes Us Different
        </span>
        <h2 className="showcase__title">
          We Don't Sell Software.<br />
          <span className="showcase__title-accent">We Architect It With You.</span>
        </h2>
        <p className="showcase__desc">
          TechBrahmand is an AI-powered software architecture studio.
          Our chatbot isn't a support widget — it's the product experience.
        </p>
      </motion.div>

      {/* ── Side-by-side boxes ── */}
      <div className="showcase__grid">

        {/* LEFT — Differentiator steps */}
        <motion.div
          className="showcase__box showcase__box--steps"
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="showcase__box-label">How It Works</span>
          <div className="showcase__steps">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  className="s-step"
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="s-step__num">0{i + 1}</span>
                  <div className="s-step__icon"><Icon size={15} strokeWidth={2} /></div>
                  <div className="s-step__text">
                    <span className="s-step__title">{step.title}</span>
                    <span className="s-step__desc">{step.desc}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT — Live proposal card */}
        <motion.div
          className="showcase__box showcase__box--proposal"
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="showcase__box-label">Live Output</span>
          <div className="s-card">
            <div className="s-card__shimmer" />

            {/* Header */}
            <div className="s-card__header">
              <div className="s-card__header-icon"><BrainCircuit size={14} strokeWidth={2} /></div>
              <div className="s-card__header-text">
                <span className="s-card__header-title">AI Solution Architect</span>
                <span className="s-card__header-badge">Generated Proposal</span>
              </div>
              <div className="s-card__live-dot" />
            </div>

            <div className="s-card__divider" />

            {/* Project */}
            <motion.div className="s-card__project" {...row(0.35)}>
              <span className="s-card__label">PROJECT</span>
              <span className="s-card__project-name">AI Hospital Management System</span>
            </motion.div>

            {/* Fields */}
            <div className="s-card__fields">
              <motion.div className="s-card__field" {...row(0.45)}>
                <Layers size={12} className="s-card__field-ico" />
                <div><span className="s-card__label">Division</span><span className="s-card__val s-card__val--brahma">BRAHMA</span></div>
              </motion.div>
              <motion.div className="s-card__field" {...row(0.52)}>
                <Code2 size={12} className="s-card__field-ico" />
                <div>
                  <span className="s-card__label">Technology</span>
                  <div className="s-card__pills">
                    <span className="s-card__pill">React</span>
                    <span className="s-card__pill">Node</span>
                    <span className="s-card__pill">MongoDB</span>
                  </div>
                </div>
              </motion.div>
              <motion.div className="s-card__field" {...row(0.59)}>
                <IndianRupee size={12} className="s-card__field-ico" />
                <div><span className="s-card__label">Cost</span><span className="s-card__val">₹68,000</span></div>
              </motion.div>
              <motion.div className="s-card__field" {...row(0.66)}>
                <Clock size={12} className="s-card__field-ico" />
                <div><span className="s-card__label">Timeline</span><span className="s-card__val">6 Weeks</span></div>
              </motion.div>
              <motion.div className="s-card__field" {...row(0.73)}>
                <CheckCircle2 size={12} className="s-card__field-ico s-card__field-ico--green" />
                <div><span className="s-card__label">Status</span><span className="s-card__val s-card__val--green">Ready to Build</span></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA below both boxes */}
      <motion.div
        className="showcase__cta-wrap"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/chatbot" className="showcase__cta">
          <BrainCircuit size={16} strokeWidth={2.5} />
          <span>Start AI Consultation</span>
          <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
        <p className="showcase__cta-sub">Free. No signup. Takes 2 minutes.</p>
      </motion.div>
    </section>
  );
};

export default ProposalShowcase;
