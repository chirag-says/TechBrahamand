import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Brain, TrendingUp, Cloud, BookOpen, ArrowRight } from 'lucide-react';
import './IndustryStack.css';


const INDUSTRIES = [
  {
    id: 1,
    name: 'Healthcare',
    subtitle: 'Digital health & AI diagnostics',
    description: 'We build HIPAA-compliant digital health platforms that connect patients, providers, and data — without sacrificing UX.',
    icon: Heart,
    accent: '#10B981',
    bg: '#d1f5e9',
    items: ['Patient portal & appointment booking', 'AI-powered diagnostic dashboards', 'EHR/EMR integration & HL7 FHIR APIs', 'Telemedicine & remote monitoring apps'],
  },
  {
    id: 2,
    name: 'AI',
    subtitle: 'LLM products, agents & ML pipelines',
    description: 'We build AI-native products — not integrations. From fine-tuned LLMs to autonomous agents running in production.',
    icon: Brain,
    accent: '#8B5CF6',
    bg: '#ede9ff',
    items: ['Custom LLM fine-tuning & RAG systems', 'AI agent orchestration & automation', 'Computer vision & NLP pipelines', 'AI SaaS product development'],
  },
  {
    id: 3,
    name: 'FinTech',
    subtitle: 'Payments, lending & wealth',
    description: 'Secure, regulation-ready financial products that scale from Day 1. Compliance baked in — not bolted on.',
    icon: TrendingUp,
    accent: '#6366F1',
    bg: '#e0e2ff',
    items: ['Payment gateway & UPI integration', 'Loan origination & credit scoring', 'Real-time trading dashboards', 'KYC / AML compliance automation'],
  },
  {
    id: 4,
    name: 'SaaS',
    subtitle: 'Multi-tenant apps & billing',
    description: 'Ship faster and scale without breaking. We architect SaaS products built to grow — with metering, billing, and analytics from day one.',
    icon: Cloud,
    accent: '#3B82F6',
    bg: '#dbeafe',
    items: ['Multi-tenant SaaS architecture', 'Subscription billing & usage metering', 'Role-based access & team management', 'Product analytics & growth loops'],
  },
  {
    id: 5,
    name: 'Education',
    subtitle: 'School ERP & admissions',
    description: 'Tech for institutions that shape the future — from admissions to alumni. Reduce admin overhead, improve visibility.',
    icon: BookOpen,
    accent: '#EAB308',
    bg: '#fef3c7',
    items: ['School ERP & attendance management', 'Online admissions & fee portals', 'Parent-teacher communication apps', 'Exam & assessment platforms'],
  },
];

function IndustryCard({ industry, i, progress, range, targetScale }) {
  const scale = useTransform(progress, range, [1, targetScale]);
  const Icon = industry.icon;

  return (
    <div className="industry-card-sticky">
      <motion.div
        className="industry-card"
        style={{
          backgroundColor: industry.bg,
          scale,
          top: `calc(-5vh + ${i * 22}px)`,
        }}
      >
        {/* Progress indicator — top right */}
        <div className="industry-card__progress">
          <span style={{ color: industry.accent, fontWeight: 700 }}>0{i + 1}</span>
          <span className="industry-card__progress-sep">/</span>
          <span>{INDUSTRIES.length.toString().padStart(2, '0')}</span>
        </div>

        {/* Left: text */}
        <div className="industry-card__left">
          <div className="industry-card__meta">
            <span className="industry-card__subtitle" style={{ color: industry.accent }}>
              {industry.subtitle}
            </span>
          </div>

          <h2 className="industry-card__name">{industry.name}</h2>
          <p className="industry-card__desc">{industry.description}</p>

          <Link
            to="/chatbot"
            className="industry-card__cta"
            style={{ background: industry.accent }}
          >
            Estimate a {industry.name} project
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Right: icon + capabilities */}
        <div className="industry-card__right">
          <div className="industry-card__icon-wrap" style={{ background: `${industry.accent}18` }}>
            <Icon size={52} strokeWidth={1.2} style={{ color: industry.accent }} />
          </div>
          <ul className="industry-card__list">
            {industry.items.map((item, j) => (
              <li key={j} className="industry-card__list-item">
                <span className="industry-card__dot" style={{ background: industry.accent }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

function Stack({ scroller }) {
  const scrollerRef = useRef(scroller);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: scrollerRef,
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef}>
      {INDUSTRIES.map((ind, i) => {
        const targetScale = 1 - (INDUSTRIES.length - i) * 0.04;
        return (
          <IndustryCard
            key={ind.id}
            industry={ind}
            i={i}
            progress={scrollYProgress}
            range={[i / INDUSTRIES.length, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}

const IndustryStack = () => {
  const rootRef = useRef(null);
  const [scroller, setScroller] = useState(null);

  useLayoutEffect(() => {
    const vp = document.querySelector('.bezel-viewport');
    if (vp) setScroller(vp);
  }, []);

  return (
    <div ref={rootRef} className="industry-stack">
      {/* Section header — outside the sticky scroll area */}
      <div className="industry-stack__header">
        <p className="industry-stack__label">Industries We Serve</p>
        <h2 className="industry-stack__heading">
          Scroll through five<br />
          <span className="industry-stack__heading-accent">verticals we own.</span>
        </h2>
      </div>

      {scroller && <Stack scroller={scroller} />}
    </div>
  );
};

export default IndustryStack;
