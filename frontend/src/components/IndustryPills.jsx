import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Heart, TrendingUp, GraduationCap, ShoppingBag, Brain, Cloud, Plane, Building2, BookOpen, Factory, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './IndustryPills.css';

const INDUSTRIES = [
  {
    id: 1, name: 'Healthcare', accent: '#10B981',
    icon: <Heart size={28} />,
    subtitle: 'Digital health & AI diagnostics',
    teaser: 'Patient portals, EHR & telemedicine',
    description: 'We build HIPAA-compliant digital health platforms that connect patients, providers, and data — fast.',
    approach: 'From patient-facing apps to backend clinical data pipelines, we architect systems that meet compliance standards without sacrificing UX.',
    preview: ['Patient portals & booking systems', 'AI diagnostic dashboards'],
    content: ['Patient portal & appointment booking', 'AI-powered diagnostic dashboards', 'EHR/EMR integration & HL7 FHIR APIs', 'Telemedicine & remote monitoring apps'],
    gridColumn: '1 / 3', gridRow: '1 / 3', featured: true,
  },
  {
    id: 2, name: 'FinTech', accent: '#6366F1',
    icon: <TrendingUp size={20} />,
    subtitle: 'Payments, lending & wealth',
    teaser: 'UPI, loan origination & KYC automation',
    description: 'Secure, regulation-ready financial products that scale from Day 1.',
    approach: 'We design fintech infrastructure with compliance baked in — not bolted on. Payment flows, credit pipelines, and real-time dashboards built for growth.',
    content: ['Payment gateway & UPI integration', 'Loan origination & credit scoring', 'Real-time trading dashboards', 'KYC / AML compliance automation'],
    gridColumn: '3 / 4', gridRow: '1 / 2',
  },
  {
    id: 3, name: 'EdTech', accent: '#F59E0B',
    icon: <GraduationCap size={20} />,
    subtitle: 'LMS, live classes & AI tutoring',
    teaser: 'Cohort tools, gamification & certs',
    description: 'Scalable learning platforms built to drive real outcomes, not just engagement metrics.',
    approach: 'We build custom LMS platforms and AI-powered tutoring systems that adapt to learners — with live class tools, progress tracking, and certification workflows.',
    content: ['Custom LMS with progress tracking', 'Live class & cohort management', 'AI personalised learning paths', 'Gamification & certification modules'],
    gridColumn: '4 / 5', gridRow: '1 / 2',
  },
  {
    id: 4, name: 'Retail', accent: '#EC4899',
    icon: <ShoppingBag size={20} />,
    subtitle: 'E-commerce & omnichannel',
    teaser: 'Storefront to fulfilment, fully digital',
    description: 'End-to-end retail tech — from custom storefronts to real-time inventory and POS sync.',
    approach: 'We build retail systems that unify online and offline channels with smart inventory, AI recommendations, and seamless checkout flows.',
    content: ['Custom e-commerce & marketplace builds', 'Real-time inventory management', 'AI recommendation & personalisation engine', 'POS & omnichannel sync'],
    gridColumn: '3 / 4', gridRow: '2 / 3',
  },
  {
    id: 5, name: 'SaaS', accent: '#3B82F6',
    icon: <Cloud size={20} />,
    subtitle: 'Multi-tenant apps & billing',
    teaser: 'Architecture, metering & growth loops',
    description: 'Ship faster and scale without breaking. We architect SaaS products built to grow.',
    approach: 'Multi-tenant architecture, subscription billing, usage metering, and the product analytics loops that turn activation into retention.',
    content: ['Multi-tenant SaaS architecture', 'Subscription billing & usage metering', 'Role-based access & team management', 'Product analytics & growth loops'],
    gridColumn: '4 / 5', gridRow: '2 / 3',
  },
  {
    id: 6, name: 'AI', accent: '#8B5CF6',
    icon: <Brain size={28} />,
    subtitle: 'LLM products, agents & ML pipelines',
    teaser: 'RAG, fine-tuning & agent orchestration',
    description: 'We build AI-native products — not integrations. From fine-tuned LLMs to autonomous agents.',
    approach: 'Custom RAG pipelines, LLM fine-tuning, computer vision, and multi-agent orchestration systems. We bring AI from prototype to production.',
    preview: ['Custom LLM fine-tuning & RAG systems', 'AI agent orchestration & automation'],
    content: ['Custom LLM fine-tuning & RAG systems', 'AI agent orchestration & automation', 'Computer vision & NLP pipelines', 'AI SaaS product development'],
    gridColumn: '1 / 3', gridRow: '3 / 5', featured: true,
  },
  {
    id: 7, name: 'Travel', accent: '#14B8A6',
    icon: <Plane size={20} />,
    subtitle: 'Booking engines & OTAs',
    teaser: 'Dynamic pricing, loyalty & AI itineraries',
    description: 'Travel tech that moves as fast as your customers — booking to boarding, fully digital.',
    approach: 'We build OTA platforms, AI trip planners, and loyalty systems with real-time availability APIs and dynamic pricing engines.',
    content: ['Flight, hotel & activity booking engines', 'Dynamic pricing & availability APIs', 'AI itinerary builder & travel assistant', 'Loyalty & reward programme systems'],
    gridColumn: '3 / 4', gridRow: '3 / 4',
  },
  {
    id: 8, name: 'Real Estate', accent: '#F97316',
    icon: <Building2 size={20} />,
    subtitle: 'PropTech, listings & CRM',
    teaser: 'From listings to lease — fully digital',
    description: 'PropTech platforms that close the gap between discovery and deal — fast.',
    approach: 'Property search, virtual tours, agent CRM, and rent collection — all in one integrated digital platform built to convert leads.',
    content: ['Property listing & search platforms', 'Virtual tour & 3D walkthrough integration', 'Lead management & agent CRM', 'Rent collection & lease management'],
    gridColumn: '4 / 5', gridRow: '3 / 4',
  },
  {
    id: 9, name: 'Education', accent: '#EAB308',
    icon: <BookOpen size={20} />,
    subtitle: 'School ERP & admissions',
    teaser: 'ERP, fee portals & parent-teacher apps',
    description: 'Tech for institutions that shape the future — from admissions to alumni.',
    approach: 'We build school ERP systems, online admission portals, attendance management, and exam platforms that reduce admin overhead and improve visibility.',
    content: ['School ERP & attendance management', 'Online admissions & fee portals', 'Parent-teacher communication apps', 'Exam & assessment platforms'],
    gridColumn: '3 / 4', gridRow: '4 / 5',
  },
  {
    id: 10, name: 'Manufacturing', accent: '#64748B',
    icon: <Factory size={20} />,
    subtitle: 'IoT dashboards & supply chain',
    teaser: 'Smart factory software for Industry 4.0',
    description: 'Connected factory systems — from IoT sensor alerts to supply chain visibility.',
    approach: 'We integrate IoT data streams into actionable dashboards, build ERP connectors, and create quality audit systems that reduce waste and downtime.',
    content: ['IoT sensor dashboards & alerts', 'Production planning & ERP integration', 'Supply chain visibility platforms', 'Quality control & audit trail systems'],
    gridColumn: '4 / 5', gridRow: '4 / 5',
  },
];

const IndustryPills = () => {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setActive(null); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setActive(null);
    }
    if (active) document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [active]);

  return (
    <section className="industry-bento" aria-label="Industries we serve">
      <motion.p
        className="industry-bento__label"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        Industries We Serve
      </motion.p>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="industry-bento__backdrop"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="industry-bento__modal-wrap">
            <motion.button
              layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="industry-bento__close"
              onClick={() => setActive(null)}
            >
              <X size={15} />
            </motion.button>

            <motion.div layoutId={`card-${active.name}-${id}`} ref={ref} className="industry-bento__modal">
              {/* Hero */}
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <div className="industry-bento__modal-hero" style={{ background: `${active.accent}15` }}>
                  <div style={{ color: active.accent, transform: 'scale(2.4)' }}>{active.icon}</div>
                </div>
              </motion.div>

              <div className="industry-bento__modal-body">
                {/* Header row */}
                <div className="industry-bento__modal-top">
                  <div>
                    <motion.h3 layoutId={`title-${active.name}-${id}`} className="industry-bento__modal-title">
                      {active.name}
                    </motion.h3>
                    <motion.p layoutId={`desc-${active.name}-${id}`} className="industry-bento__modal-desc">
                      {active.description}
                    </motion.p>
                  </div>
                  <div className="industry-bento__modal-badge" style={{ background: `${active.accent}15`, color: active.accent }}>
                    {active.subtitle}
                  </div>
                </div>

                {/* Approach paragraph */}
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="industry-bento__modal-approach">{active.approach}</p>
                </motion.div>

                {/* What we build */}
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="industry-bento__modal-section-label">What we build</p>
                  <ul className="industry-bento__modal-list">
                    {active.content.map((item, i) => (
                      <li key={i} className="industry-bento__modal-item">
                        <span className="industry-bento__modal-dot" style={{ background: active.accent }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* CTA */}
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Link
                    to="/chatbot"
                    className="industry-bento__modal-cta"
                    style={{ background: active.accent }}
                    onClick={() => setActive(null)}
                  >
                    Estimate a {active.name} project
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bento grid */}
      <ul className="industry-bento__grid">
        {INDUSTRIES.map((ind, i) => (
          <motion.li
            layoutId={`card-${ind.name}-${id}`}
            key={ind.id}
            onClick={() => setActive(ind)}
            className={`industry-bento__card ${ind.featured ? 'industry-bento__card--featured' : ''}`}
            style={{ gridColumn: ind.gridColumn, gridRow: ind.gridRow }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.45, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            {ind.featured ? (
              <div className="industry-bento__featured-inner">
                <div className="industry-bento__featured-top">
                  <motion.div layoutId={`image-${ind.name}-${id}`}>
                    <div className="industry-bento__featured-icon" style={{ background: `${ind.accent}18`, color: ind.accent }}>
                      {ind.icon}
                    </div>
                  </motion.div>
                  <span className="industry-bento__featured-tag" style={{ background: `${ind.accent}12`, color: ind.accent }}>
                    Click to explore
                  </span>
                </div>
                <motion.h3 layoutId={`title-${ind.name}-${id}`} className="industry-bento__featured-name">
                  {ind.name}
                </motion.h3>
                <motion.p layoutId={`desc-${ind.name}-${id}`} className="industry-bento__featured-sub">
                  {ind.description}
                </motion.p>
                <ul className="industry-bento__featured-preview">
                  {ind.preview.map((item, i) => (
                    <li key={i}>
                      <span style={{ background: ind.accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                <motion.div layoutId={`image-${ind.name}-${id}`}>
                  <div className="industry-bento__card-icon" style={{ background: `${ind.accent}15`, color: ind.accent }}>
                    {ind.icon}
                  </div>
                </motion.div>
                <div className="industry-bento__card-text">
                  <motion.h3 layoutId={`title-${ind.name}-${id}`} className="industry-bento__card-name">
                    {ind.name}
                  </motion.h3>
                  <motion.p layoutId={`desc-${ind.name}-${id}`} className="industry-bento__card-sub">
                    {ind.subtitle}
                  </motion.p>
                  <p className="industry-bento__card-teaser">{ind.teaser}</p>
                </div>
              </>
            )}
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default IndustryPills;
