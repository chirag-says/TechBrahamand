import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Lightbulb, PenTool, IndianRupee, Code2, Rocket, TrendingUp,
  BrainCircuit, Repeat2, Layers, ShieldCheck, Clock, ArrowRight,
} from 'lucide-react';
import './HowWeBuild.css';

/* ─── Process steps ─────────────────────────────────────── */
const STEPS = [
  {
    icon: Lightbulb,   label: 'Idea',          num: '01',
    desc: 'You share your vision in plain language — we listen, ask the right questions, and map out what you actually need.',
    bg: 'linear-gradient(135deg, #1a120a 0%, #2d1f05 100%)', accent: '#EAB308',
  },
  {
    icon: PenTool,     label: 'Architecture',  num: '02',
    desc: 'Stack, feature scope, and timeline are designed live. You see decisions as they\'re made — no black box.',
    bg: 'linear-gradient(135deg, #0e0a1f 0%, #1c0e3a 100%)', accent: '#8B5CF6',
  },
  {
    icon: IndianRupee, label: 'Quotation',     num: '03',
    desc: 'Itemised cost breakdown generated instantly. Every line justified — no hidden fees, no surprise invoices.',
    bg: 'linear-gradient(135deg, #050e1f 0%, #081a38 100%)', accent: '#3B82F6',
  },
  {
    icon: Code2,       label: 'Development',   num: '04',
    desc: 'Sprint-by-sprint builds with weekly demos. Security-first, production-grade code from the first commit.',
    bg: 'linear-gradient(135deg, #041509 0%, #072914 100%)', accent: '#10B981',
  },
  {
    icon: Rocket,      label: 'Deployment',    num: '05',
    desc: 'Zero-downtime launch on your infrastructure. CI/CD, monitoring, and rollback — all wired before go-live.',
    bg: 'linear-gradient(135deg, #1a0900 0%, #2e1000 100%)', accent: '#F97316',
  },
  {
    icon: TrendingUp,  label: 'Growth',        num: '06',
    desc: 'Post-launch metrics, iteration sprints, and scaling support. We stay on as your product compound-wins.',
    bg: 'linear-gradient(135deg, #1a0519 0%, #2d0930 100%)', accent: '#EC4899',
  },
];

/* ─── Differentiators ────────────────────────────────────── */
const EDGES = [
  {
    num: '01', title: 'AI Architect, not a sales rep',
    body: 'Our chatbot designs your solution architecture live — no discovery calls, no waiting for a quote.',
  },
  {
    num: '02', title: 'Transparent, itemised pricing',
    body: 'Full cost breakdown in real time. Every module priced, zero hidden fees.',
  },
  {
    num: '03', title: 'Edit your proposal live',
    body: 'Swap stacks, toggle features, resize scope. The proposal updates as you think.',
  },
  {
    num: '04', title: 'Division-matched teams',
    body: 'Brahma builds. Vishnu scales. Mahesh dominates. Right crew for every stage.',
  },
  {
    num: '05', title: 'Security by default',
    body: 'OWASP top 10, rate limits, auth — production-grade from commit one.',
  },
  {
    num: '06', title: 'Zero discovery fee',
    body: 'The AI consultation is free. Real proposal, real numbers — in 2 minutes.',
  },
];

/* ─── Accordion Panel ─────────────────────────────────────── */
function StepPanel({ step, index, active, onClick }) {
  const Icon = step.icon;
  const isActive = index === active;

  return (
    <motion.div
      className="hwb-panel"
      initial={false}
      animate={{ flexGrow: isActive ? 6 : 1 }}
      transition={{ type: 'spring', stiffness: 160, damping: 26 }}
      onClick={onClick}
      style={{ background: step.bg }}
    >
      {/* Accent top bar */}
      <div className="hwb-panel__bar" style={{ background: step.accent }} />

      {/* Collapsed label — vertical */}
      <motion.div
        className="hwb-panel__collapsed"
        initial={false}
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="hwb-panel__num-small">{step.num}</span>
        <span className="hwb-panel__label-v">{step.label}</span>
      </motion.div>

      {/* Expanded content */}
      <motion.div
        className="hwb-panel__expanded"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
        transition={{ duration: 0.35, delay: isActive ? 0.15 : 0 }}
      >
        <span className="hwb-panel__num-big" style={{ color: step.accent }}>{step.num}</span>
        <div className="hwb-panel__icon" style={{ color: step.accent, borderColor: `${step.accent}35`, background: `${step.accent}12` }}>
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <h3 className="hwb-panel__title">{step.label}</h3>
        <p className="hwb-panel__desc">{step.desc}</p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Edge item ───────────────────────────────────────────── */
function EdgeItem({ edge, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`hwb-edge__item ${hovered ? 'hwb-edge__item--hovered' : ''}`}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="hwb-edge__num">{edge.num}</span>
      <div className="hwb-edge__text">
        <span className="hwb-edge__title">{edge.title}</span>
        <span className="hwb-edge__body">{edge.body}</span>
      </div>
    </motion.div>
  );
}

/* ─── Main component ──────────────────────────────────────── */
const HowWeBuild = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const edgeRef = useRef(null);
  const edgeInView = useInView(edgeRef, { once: true, margin: '-60px' });

  /* Auto-advance accordion */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive(a => (a + 1) % STEPS.length), 3200);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="hwb">

      {/* ── PART 1: Process accordion ── */}
      <div className="hwb__process">
        <motion.div
          className="hwb__process-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hwb__label">How We Build</p>
          <h2 className="hwb__heading">
            Six steps. One living product.
          </h2>
        </motion.div>

        <motion.div
          className="hwb__accordion"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {STEPS.map((step, i) => (
            <StepPanel
              key={step.label}
              step={step}
              index={i}
              active={active}
              onClick={() => { setActive(i); setPaused(true); }}
            />
          ))}
        </motion.div>

        {/* Step dots */}
        <div className="hwb__dots">
          {STEPS.map((_, i) => (
            <button
              key={i}
              className={`hwb__dot ${i === active ? 'hwb__dot--active' : ''}`}
              onClick={() => { setActive(i); setPaused(true); }}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── PART 2: Differentiators split ── */}
      <div className="hwb__split" ref={edgeRef}>

        {/* Left: headline + CTA */}
        <motion.div
          className="hwb__split-left"
          initial={{ opacity: 0, y: 20 }}
          animate={edgeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hwb__label">What Makes Us Different</p>
          <h2 className="hwb__heading hwb__heading--left">
            We don't sell software.{' '}
            <span className="hwb__heading-accent">We architect it with you.</span>
          </h2>
          <p className="hwb__split-desc">
            TechBrahmand is an AI-powered software architecture studio.
            Every consultation produces a live, editable project proposal — not a sales pitch.
          </p>
          <Link to="/chatbot" className="hwb__cta">
            <BrainCircuit size={16} strokeWidth={2.2} />
            Start AI Consultation
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
          <p className="hwb__cta-sub">Free · No signup · 2 minutes</p>
        </motion.div>

        {/* Right: numbered list */}
        <div className="hwb__split-right">
          {EDGES.map((edge, i) => (
            <EdgeItem key={edge.num} edge={edge} index={i} inView={edgeInView} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowWeBuild;
