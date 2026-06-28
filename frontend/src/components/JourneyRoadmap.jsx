import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Lightbulb, LayoutTemplate, FileText, Code2, Rocket, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./JourneyRoadmap.css";

const E = [0.22, 1, 0.36, 1];

/* Single unified color for all steps */
const BRAND = { color: "oklch(42% 0.18 195)", glow: "oklch(42% 0.18 195 / 0.28)", accent: "oklch(42% 0.18 195 / 0.10)" };

const STEPS = [
  { id: "idea",         num: "01", icon: Lightbulb,     title: "Idea",         desc: "Describe your business idea, challenges and vision in plain language.",         ...BRAND },
  { id: "architecture", num: "02", icon: LayoutTemplate, title: "Architecture", desc: "AI recommends technologies, features and complete software architecture.",     ...BRAND },
  { id: "quotation",    num: "03", icon: FileText,       title: "Quotation",    desc: "Receive transparent cost estimation with timeline and full breakdown.",         ...BRAND },
  { id: "development",  num: "04", icon: Code2,          title: "Development",  desc: "Track live progress with regular updates and milestone deliveries.",            ...BRAND },
  { id: "deployment",   num: "05", icon: Rocket,         title: "Deployment",   desc: "Launch confidently with cloud deployment, testing and monitoring.",            ...BRAND },
  { id: "growth",       num: "06", icon: TrendingUp,     title: "Growth",       desc: "Scale using analytics, AI automation and continuous optimisation.",            ...BRAND },
];

/* ── Travelling dot on SVG path ── */
function TravellingDot({ pathId, color, delay = 0, duration = 3.5 }) {
  return (
    <motion.circle r="3.5" fill={color} filter="url(#dotGlow)"
      style={{ offsetPath: `path('${pathId}')` }}
    >
      <animateMotion
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
        calcMode="linear"
      >
        <mpath href={`#${pathId.replace(/[^a-zA-Z0-9]/g, "")}`} />
      </animateMotion>
    </motion.circle>
  );
}

/* ── Milestone Card ── */
function MilestoneCard({ step, index, isActive, isHovered, onHover, onLeave, visible }) {
  const Icon = step.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={`jr-card ${isActive ? "jr-card--active" : ""} ${isHovered && !isActive ? "jr-card--dim" : ""}`}
      style={{ "--c": step.color, "--g": step.glow, "--a": step.accent }}
      initial={{ opacity: 0, y: 32, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, ease: E, delay: index * 0.12 }}
      onMouseEnter={() => onHover(step.id)}
      onMouseLeave={onLeave}
      whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3, ease: E } }}
    >
      <div className="jr-card__glow" />
      <div className="jr-card__border" />

      <div className="jr-card__top">
        <motion.div
          className="jr-card__icon"
          animate={isActive ? { rotate: [0, -8, 8, 0], scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.6, ease: E }}
        >
          <Icon size={20} strokeWidth={1.8} />
        </motion.div>
        <span className="jr-card__num">{step.num}</span>
      </div>

      <h3 className="jr-card__title">{step.title}</h3>
      <p className="jr-card__desc">{step.desc}</p>

      {isActive && (
        <motion.div className="jr-card__pulse"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

/* ── AI Core ── */
function AICore() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className="jr-core"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, ease: E, delay: 0.3 }}
    >
      <div className="jr-core__orbit jr-core__orbit--1" />
      <div className="jr-core__orbit jr-core__orbit--2" />
      <div className="jr-core__orbit jr-core__orbit--3" />
      <div className="jr-core__sphere">
        <div className="jr-core__inner">
          <div className="jr-core__pulse" />
          <span className="jr-core__label">AI</span>
        </div>
      </div>
      <p className="jr-core__caption">AI Solution Architect</p>
    </motion.div>
  );
}

/* ══ MAIN COMPONENT ══ */
export default function JourneyRoadmap() {
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleHover = useCallback((id) => setHoveredId(id), []);
  const handleLeave = useCallback(() => setHoveredId(null), []);

  const activeStep = STEPS.find((s) => s.id === hoveredId);

  return (
    <section className="jr-section" ref={sectionRef}>

      {/* Header */}
      <motion.div className="jr-header"
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: E }}
      >
        <p className="jr-header__over">How It Works</p>
        <h2 className="jr-header__title">From Idea to Growth</h2>
        <p className="jr-header__sub">
          Every successful product follows a carefully architected journey.<br />
          Our AI guides every step — from concept to long-term growth.
        </p>
      </motion.div>

      {/* Desktop Roadmap */}
      <div className="jr-map">
        {/* SVG paths layer */}
        <RoadmapSVG activeId={hoveredId} inView={inView} />

        {/* AI Core center */}
        <div className="jr-map__core">
          <AICore />
        </div>

        {/* Cards — positioned around the map */}
        {STEPS.map((step, i) => (
          <div key={step.id} className={`jr-slot jr-slot--${step.id}`}>
            <MilestoneCard
              step={step}
              index={i}
              isActive={hoveredId === step.id}
              isHovered={hoveredId !== null}
              onHover={handleHover}
              onLeave={handleLeave}
              visible={inView}
            />
          </div>
        ))}
      </div>

      {/* Mobile vertical roadmap */}
      <div className="jr-mobile">
        <MobileRoadmap steps={STEPS} />
      </div>

      {/* CTA */}
      <motion.div className="jr-cta"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, ease: E, delay: 0.2 }}
      >
        <p className="jr-cta__label">Ready to begin your journey?</p>
        <Link to="/chatbot">
          <motion.button className="jr-cta__btn"
            whileHover={{ scale: 1.05, boxShadow: "0 0 48px oklch(42% 0.18 195 / 0.45)" }}
            whileTap={{ scale: 0.97 }}
          >
            Start AI Consultation <ArrowRight size={15} />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}

/* ── SVG connector paths with animated dots ── */
function RoadmapSVG({ activeId, inView }) {
  /* 
   * Paths connect: center core → each step
   * Using a 1000×760 viewBox
   * Core is at (500, 380)
   * Cards placed at:
   *   idea:        (160, 100)  — top-left
   *   architecture:(500, 60)   — top-center
   *   quotation:   (840, 160)  — top-right
   *   development: (840, 560)  — bottom-right
   *   deployment:  (500, 680)  — bottom-center
   *   growth:      (160, 560)  — bottom-left
   */
  const PATH_COLOR = "oklch(42% 0.18 195)";
  const paths = [
    { id: "p-idea",         d: "M 500 380 C 420 300 280 200 200 130",    color: PATH_COLOR, stepId: "idea"         },
    { id: "p-architecture", d: "M 500 380 C 500 280 500 160 500 100",    color: PATH_COLOR, stepId: "architecture" },
    { id: "p-quotation",    d: "M 500 380 C 580 280 720 200 800 170",    color: PATH_COLOR, stepId: "quotation"    },
    { id: "p-development",  d: "M 500 380 C 580 460 720 510 800 570",    color: PATH_COLOR, stepId: "development"  },
    { id: "p-deployment",   d: "M 500 380 C 500 460 500 570 500 650",    color: PATH_COLOR, stepId: "deployment"   },
    { id: "p-growth",       d: "M 500 380 C 420 460 280 510 200 570",    color: PATH_COLOR, stepId: "growth"       },
  ];

  return (
    <svg
      className="jr-svg"
      viewBox="0 0 1000 760"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="pathGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {inView && paths.map((p, i) => (
        <g key={p.id}>
          {/* Glow layer */}
          <path d={p.d} stroke={p.color} strokeWidth="1.5" strokeDasharray="6 5"
            fill="none" opacity="0.22" filter="url(#pathGlow)" />
          {/* Main dashed path */}
          <path id={p.id} d={p.d} stroke={p.color} strokeWidth="1"
            strokeDasharray="6 5" fill="none" opacity="0.45" />
          {/* Animated travelling dot */}
          <circle r="3.5" fill={p.color} opacity="0.75" filter="url(#dotGlow)">
            <animateMotion dur={`${3.2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.55}s`}>
              <mpath href={`#${p.id}`} />
            </animateMotion>
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* ── Mobile vertical roadmap ── */
function MobileRoadmap({ steps }) {
  return (
    <div className="jr-mob-list">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.id}
            className="jr-mob-item"
            style={{ "--c": "oklch(42% 0.18 195)", "--g": "oklch(42% 0.18 195 / 0.28)" }}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: E, delay: i * 0.1 }}
          >
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="jr-mob-line">
                <svg width="2" height="64" viewBox="0 0 2 64" aria-hidden="true">
                  <path d="M 1 0 L 1 64" stroke="oklch(42% 0.18 195)" strokeWidth="1.5"
                    strokeDasharray="5 4" opacity="0.4" />
                  <circle r="2.5" fill="oklch(42% 0.18 195)" opacity="0.75">
                    <animateMotion dur="2s" repeatCount="indefinite">
                      <mpath href={`#mob-path-${i}`} />
                    </animateMotion>
                  </circle>
                  <path id={`mob-path-${i}`} d="M 1 0 L 1 64" fill="none" />
                </svg>
              </div>
            )}

            <div className="jr-mob-icon">
              <Icon size={18} strokeWidth={1.8} />
            </div>
            <div className="jr-mob-content">
              <span className="jr-mob-num">{step.num}</span>
              <h3 className="jr-mob-title">{step.title}</h3>
              <p className="jr-mob-desc">{step.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ConstellationDots removed per user request */
