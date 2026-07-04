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
  ArrowRight,
} from 'lucide-react';
import './Differentiator.css';

const STEPS = [
  {
    icon: MessageSquareText,
    title: 'Describe Your Vision',
    desc: 'Tell our AI what you want to build — in plain English.',
  },
  {
    icon: Layers,
    title: 'Get a Division Match',
    desc: 'Brahma creates, Vishnu scales, Mahesh dominates. The AI picks the right one.',
  },
  {
    icon: BrainCircuit,
    title: 'Receive Architecture',
    desc: 'Technology stack, feature breakdown, timeline — all recommended live.',
  },
  {
    icon: IndianRupee,
    title: 'Transparent Quotation',
    desc: 'Itemized cost breakdown generated instantly. No hidden fees, no guesswork.',
  },
  {
    icon: Repeat2,
    title: 'Refine Interactively',
    desc: 'Swap technologies, toggle features, adjust scope. The proposal evolves with you.',
  },
];

const Differentiator = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="diff-section" ref={ref} aria-label="What makes us different">
      {/* Header */}
      <motion.div
        className="diff-section__header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="diff-section__tag">What Makes Us Different</span>
        <h2 className="diff-section__title">
          We Don't Sell Software.<br />
          <span className="diff-section__title-accent">We Architect It With You.</span>
        </h2>
        <p className="diff-section__desc">
          TechBrahmand is an AI-powered software architecture studio.
          Our chatbot isn't a support widget — it's the product experience.
          Every consultation produces a live, editable project proposal.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="diff-steps">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              className="diff-step"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="diff-step__number">0{i + 1}</div>
              <div className="diff-step__icon">
                <Icon size={18} strokeWidth={2} />
              </div>
              <div className="diff-step__text">
                <span className="diff-step__title">{step.title}</span>
                <span className="diff-step__desc">{step.desc}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.div
        className="diff-section__cta-wrap"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/chatbot" className="diff-section__cta">
          <BrainCircuit size={16} strokeWidth={2.5} />
          <span>Start AI Consultation</span>
          <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
        <p className="diff-section__cta-sub">Free. No signup. Takes 2 minutes.</p>
      </motion.div>
    </section>
  );
};

export default Differentiator;
