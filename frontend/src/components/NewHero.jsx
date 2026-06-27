import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sparkles, Zap, Globe, ShieldCheck, ArrowRight, Menu, ChevronDown, LogIn, MessageCircle, BrainCircuit, Check, IndianRupee, Clock, Layers } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import ProfileRail from './ProfileRail';
import CyborgRobot from './CyborgRobot';
import FloatingParticles from './FloatingParticles';
import FloatingCards from './FloatingCards';
import MarqueeBanner from './MarqueeBanner';
import './AiPreviewCard.css';
import './HeroMotion.css';

/* ── Letter Reveal — word-by-word stagger ── */
const WordReveal = ({ children, delay = 0, className = '' }) => {
  const words = children.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', marginRight: '0.27em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/* ── CountUp — animate number on viewport entry ── */
const CountUp = ({ target, suffix = '', prefix = '', duration = 2, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const delayMs = delay * 1000;
    const durMs = duration * 1000;
    let raf;
    const tick = (now) => {
      const elapsed = now - start - delayMs;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / durMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration, delay]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

/* ── MagneticWrap — pulls element toward cursor ── */
const MagneticWrap = ({ children, strength = 0.25, className = '' }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.style.transition = 'transform 0.15s ease-out';
  };
  const onLeave = () => {
    if (ref.current) {
      ref.current.style.transform = '';
      ref.current.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
    }
  };
  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
};

const NewHero = () => {
  const [isMobileLoaded, setIsMobileLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setIsMobileLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToProjects = useCallback(() => {
    const el = document.getElementById('projects-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Mouse parallax for background layers
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleHeroMouse = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  // Animation variants
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
  });

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, delay, ease: 'easeOut' } },
  });

  const scaleIn = (delay = 0) => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } },
  });

  return (
    <div
      className="relative w-full min-h-[100dvh] bg-[#F3F5F9] overflow-hidden font-sans tracking-tight"
      onMouseMove={handleHeroMouse}
    >

      {/* ═══════════════════════════════════════════ */}
      {/* MOBILE ONLY ELEMENTS                        */}
      {/* ═══════════════════════════════════════════ */}

      {/* Mobile: ProfileRail */}
      <div className="md:hidden">
        <ProfileRail />
      </div>

      {/* ── Apple-style ambient background layers ── */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{
          transform: `translate(${mousePos.x * -6}px, ${mousePos.y * -4}px)`,
          transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
      >

        {/* Layer 1 — Soft radial gradient wash */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 50% at 75% 15%, rgba(139,92,246,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 60% 45% at 15% 75%, rgba(59,130,246,0.035) 0%, transparent 60%),
            radial-gradient(ellipse 45% 35% at 50% 50%, rgba(245,158,11,0.018) 0%, transparent 50%)
          `
        }} />

        {/* Layer 2 — Noise texture (SVG feTurbulence) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.028]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <filter id="heroNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroNoise)" />
        </svg>

        {/* Layer 3 — Subtle grid lines */}
        <div className="absolute inset-0 opacity-[0.022]" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Layer 4 — Blur blobs (static, calm) */}
        <div className="absolute rounded-full" style={{ width: '500px', height: '500px', top: '-8%', right: '-6%', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, rgba(96,165,250,0.03) 40%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute rounded-full" style={{ width: '420px', height: '420px', top: '50%', left: '-4%', background: 'radial-gradient(circle, rgba(251,191,36,0.04) 0%, rgba(251,146,60,0.02) 40%, transparent 70%)', filter: 'blur(70px)' }} />
        <div className="absolute rounded-full" style={{ width: '360px', height: '360px', bottom: '8%', right: '18%', background: 'radial-gradient(circle, rgba(34,211,238,0.035) 0%, rgba(52,211,153,0.015) 40%, transparent 70%)', filter: 'blur(60px)' }} />

        {/* Layer 5 — Diagonal light rays */}
        <div className="absolute inset-0 opacity-[0.018]" style={{
          background: 'linear-gradient(125deg, transparent 25%, rgba(255,255,255,0.9) 32%, transparent 39%, transparent 58%, rgba(255,255,255,0.7) 64%, transparent 72%)',
        }} />

        {/* Layer 6 — Floating particles */}
        <FloatingParticles />

      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden absolute bottom-[10px] left-1/2 -translate-x-[42%] w-[105%] max-w-[460px] z-[5] pointer-events-none"
        style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)' }}
      >
        <CyborgRobot isMobile />
      </motion.div>

      {/* Mobile Content Wrapper — stacked over robot */}
      <div className="md:hidden relative z-30 flex flex-col min-h-[100dvh] pt-[60px] pb-[56px] pointer-events-none">

        {/* ── TOP ZONE: Brand + Heading ── */}
        {/* Brand name — fixed top center */}
        <motion.div {...fadeIn(0.1)} className="pointer-events-auto absolute top-[25px] left-0 right-0 flex items-center justify-center z-40 pl-[10px]">
          <h1 className="font-heading font-extrabold text-[22px] sm:text-[26px] tracking-[0.14em] text-[#1A1E23] text-center">
            TECH BRAHMAND
          </h1>
        </motion.div>

        <div className="flex flex-col px-4 mt-[36px]">




          {/* Main heading — word reveal */}
          <div className="pointer-events-auto pl-[54px] sm:pl-[64px] mt-3 z-20">
            <h2 className="text-[30px] sm:text-[36px] font-semibold leading-[1.08] text-[#0A0A0A] tracking-[-0.03em]">
              <span className="block"><WordReveal delay={0.3}>Architecting</WordReveal></span>
              <span className="block mt-0.5">
                <WordReveal delay={0.45}>Tomorrow's</WordReveal>{' '}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent font-bold inline-block"
                >Digital</motion.span>
              </span>
              <span className="block mt-0.5"><WordReveal delay={0.75}>Businesses</WordReveal></span>
            </h2>
          </div>

          {/* Subtitle — multi-line value prop */}
          <motion.div {...fadeUp(0.4)} className="pointer-events-auto pl-[54px] sm:pl-[64px] mt-3 z-20">
            <p className="text-[12px] sm:text-[13px] text-[#555] font-medium max-w-[280px] leading-[1.7] tracking-[0.005em]">
              From innovative ideas to enterprise-scale software,<br />
              our AI architects design, estimate, and plan<br />
              your digital product before a single line of code is written.
            </p>
          </motion.div>

          {/* Mobile: AI Preview Card */}
          <motion.div {...fadeUp(0.45)} className="pointer-events-auto pl-[54px] sm:pl-[64px] pr-4 mt-4 z-20">
            <div className="ai-preview-card ai-preview-card--mobile">
              <div className="ai-preview-header">
                <div className="ai-preview-header-icon">
                  <BrainCircuit size={14} strokeWidth={2} />
                </div>
                <span className="ai-preview-header-title">AI Solution Architect</span>
                <div className="ai-preview-live-dot" />
              </div>
              <div className="ai-preview-checklist">
                {['Project Analysis', 'Technology Selection', 'Budget Estimation', 'Live Proposal Builder'].map((item) => (
                  <div key={item} className="ai-preview-check-item">
                    <Check size={10} strokeWidth={3} className="ai-preview-check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="ai-preview-divider" />
              <div className="ai-preview-stats">
                <div className="ai-preview-stat">
                  <span className="ai-preview-stat-label">Division</span>
                  <span className="ai-preview-stat-value ai-preview-stat-value--brahma">BRAHMA</span>
                </div>
                <div className="ai-preview-stat">
                  <span className="ai-preview-stat-label">Budget</span>
                  <span className="ai-preview-stat-value">₹48,000</span>
                </div>
                <div className="ai-preview-stat">
                  <span className="ai-preview-stat-label">Timeline</span>
                  <span className="ai-preview-stat-value">5 Weeks</span>
                </div>
              </div>
              <Link to="/chatbot" className="ai-preview-cta">
                <span>Start Consultation</span>
                <ArrowRight size={12} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>

          {/* Dual CTA buttons */}
          <motion.div {...fadeUp(0.55)} className="pointer-events-auto pl-[54px] sm:pl-[64px] mt-5 flex items-center gap-3 z-20">
            <Link
              to="/chatbot"
              className="hero-btn-glow inline-flex items-center gap-2.5 bg-[#0A0A0A] text-white rounded-full pl-4.5 pr-1 py-1 group shadow-[0_6px_24px_rgba(0,0,0,0.25)] active:scale-[0.97] transition-all duration-200"
            >
              <BrainCircuit size={14} strokeWidth={2.5} className="text-violet-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em]">Start AI Consultation</span>
              <span className="w-[28px] h-[28px] bg-white text-[#0A0A0A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ArrowRight size={12} strokeWidth={2.5} className="-rotate-45" />
              </span>
            </Link>
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.12] bg-white/60 backdrop-blur-sm text-[#222] shadow-[0_2px_10px_rgba(0,0,0,0.06)] active:scale-[0.97] transition-all duration-200 cursor-pointer"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.14em]">View Our Work</span>
            </button>
          </motion.div>
        </div>

        {/* ── SPACER — pushes stats to bottom ── */}
        <div className="flex-1 min-h-[40px]" />

        {/* ── BOTTOM ZONE: Floating glass stats card ── */}
        <motion.div {...fadeUp(0.65)} className="pointer-events-auto z-30 px-3 mb-3">
          <div className="relative w-full bg-white/70 backdrop-blur-2xl rounded-[20px] border border-white/90 shadow-[0_-4px_30px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.08)] px-2 py-3.5 overflow-hidden">
            {/* Top shimmer */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/25 to-transparent" />
            {/* Bottom shimmer */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/15 to-transparent" />

            <div className="grid grid-cols-4 gap-0">

              {/* Stat 1 — Projects */}
              <div className="flex flex-col items-center gap-1">
                <div className="relative w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-white to-[#f4f5f7] border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center">
                  <div className="absolute inset-[3px] rounded-full border-[1.5px] border-dashed border-violet-500/12 animate-[spin_14s_linear_infinite]" />
                  <span className="text-[18px] font-black text-[#111] tracking-tight relative z-10"><CountUp target={63} /><span className="text-[11px] text-violet-400 font-bold">+</span></span>
                </div>
                <span className="text-[7px] font-bold text-[#777] text-center uppercase tracking-[0.1em] leading-[1.2]">Projects<br />Delivered</span>
              </div>

              {/* Stat 2 — AI Consultations */}
              <div className="flex flex-col items-center gap-1">
                <div className="relative w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-white to-[#f4f5f7] border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center">
                  <div className="absolute top-[4px] right-[4px] w-[6px] h-[6px] rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)] animate-pulse" />
                  <span className="text-[17px] font-black text-[#111] tracking-tight relative z-10"><CountUp target={300} delay={0.15} /><span className="text-[10px] text-blue-400 font-bold">+</span></span>
                </div>
                <span className="text-[7px] font-bold text-[#777] text-center uppercase tracking-[0.1em] leading-[1.2]">AI<br />Consultations</span>
              </div>

              {/* Stat 3 — Satisfaction */}
              <div className="flex flex-col items-center gap-1">
                <div className="relative w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-white to-[#f4f5f7] border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center">
                  <div className="absolute top-[4px] right-[4px] w-[6px] h-[6px] rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse" />
                  <span className="text-[18px] font-black text-[#111] tracking-tight relative z-10"><CountUp target={99} delay={0.3} /><span className="text-[10px] font-bold text-emerald-400">%</span></span>
                </div>
                <span className="text-[7px] font-bold text-[#777] text-center uppercase tracking-[0.1em] leading-[1.2]">Client<br />Satisfaction</span>
              </div>

              {/* Stat 4 — Launch Time */}
              <div className="flex flex-col items-center gap-1">
                <div className="relative w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-white to-[#f4f5f7] border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center">
                  <svg className="absolute w-[28px] h-[28px] opacity-[0.04]" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                  <span className="text-[18px] font-black text-[#111] tracking-tight relative z-10"><CountUp target={21} delay={0.45} /><span className="text-[8px] text-amber-500 font-bold ml-[1px]">d</span></span>
                </div>
                <span className="text-[7px] font-bold text-[#777] text-center uppercase tracking-[0.1em] leading-[1.2]">Avg Launch<br />Time</span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>

      {/* Mobile: Marquee Banner pinned to hero bottom */}
      <div className="md:hidden absolute bottom-0 left-0 w-full z-40">
        <MarqueeBanner containerBg="bg-[#F3F5F9]" marginTop="mt-0" marginBottom="mb-0" />
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* DESKTOP ONLY ELEMENTS                       */}
      {/* ═══════════════════════════════════════════ */}

      {/* Desktop: Cyborg Image (Background right side) */}
      <div className="hidden md:flex absolute top-13 right-0 w-[55%] h-full items-center justify-end">
        <CyborgRobot className="w-[90%] h-[90%] scale-[0.9]" />
        <FloatingCards />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F3F5F9] to-transparent z-10" />
      </div>

      {/* Desktop: Left Black Vertical Bar — magnetic hover */}
      <div className="hidden md:flex absolute top-[40px] bottom-[100px] left-6 w-[70px] bg-[#0F1115] rounded-[40px] z-30 flex-col items-center py-6 justify-between shadow-xl">
        <MagneticWrap strength={0.3}>
          <button className="w-[46px] h-[46px] rounded-full flex items-center justify-center hover:scale-105 transition-transform overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.5)] bg-transparent">
            <img
              src="/techbrahmand-badge.png"
              alt="Techbrahmand Logo"
              className="w-[110%] h-[110%] max-w-none object-cover rounded-full"
            />
          </button>
        </MagneticWrap>

        <div className="flex-1 flex items-center justify-center w-full">
          <span className="text-white text-[10px] uppercase font-bold tracking-[6px]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Where Ideas Evolve
          </span>
        </div>

        <MagneticWrap strength={0.35}>
          <div className="w-[46px] h-[46px] rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/[0.12] transition-colors duration-300">
            <ChevronDown size={18} strokeWidth={2} className="text-white/50" />
          </div>
        </MagneticWrap>
      </div>

      {/* Desktop: Center Top Logo (Geometric A) */}
      <div className="hidden md:block absolute top-[50px] left-1/2 -translate-x-1/2 z-20 drop-shadow-lg opacity-95 pointer-events-none">
        <div className="flex flex-col gap-[3px] items-center">
          <svg width="68" height="42" viewBox="0 0 100 60" fill="white" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,10 70,10 85,30 15,30" />
            <polygon points="15,33 85,33 100,53 0,53" />
          </svg>
        </div>
      </div>

      {/* Desktop: Content Wrapper */}
      <div className="hidden md:flex relative z-30 flex-col min-h-[100dvh] pt-[28px] pb-[100px] pl-[130px] pr-[40px] pointer-events-none">

        {/* Desktop: Top Header & Autonomous Evolution Card */}
        <div className="pointer-events-auto">
          <h1 className="font-heading font-extrabold text-[22px] tracking-wide text-[#1A1E23] uppercase">
            TECH BRAHMAND
          </h1>

          {/* Premium Frosted Floating Card */}
          <Link to="/products" className="card-float mt-2 relative z-20 w-[380px] rounded-[28px] p-[8px] pr-6 flex items-center gap-5 group overflow-hidden cursor-pointer isolate border border-white/60 bg-white/50 backdrop-blur-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] hover:bg-white/70 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 block">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 pointer-events-none" />
            <div className="relative w-[90px] h-[90px] rounded-[20px] overflow-hidden shrink-0 shadow-[0_6px_16px_rgba(0,0,0,0.08)] bg-white border border-white/80">
              <img src="/glass_abstract.png" alt="Abstract Tech" className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.12] transition-transform duration-[1200ms] ease-out mix-blend-multiply" />
            </div>
            <div className="flex flex-col gap-3 justify-center py-1 h-full">
              <p className="text-[12px] font-medium leading-[1.4] text-[#555]">
                <span className="text-black font-extrabold tracking-tight uppercase block mb-[4px] text-[9px]">Autonomous Evolution</span>
                Explore advanced architectures transforming future ecosystems.
              </p>
              <div className="flex items-center gap-2 group/btn mt-1 ml-[1px]">
                <div className="w-[28px] h-[28px] rounded-full bg-black flex items-center justify-center text-white relative shadow-[0_4px_10px_rgba(0,0,0,0.2)] group-hover/btn:scale-110 transition-all duration-300">
                  <ArrowRight size={12} className="relative z-10 transform -translate-x-[2px] group-hover/btn:translate-x-0 transition-transform duration-500" strokeWidth={3} />
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#555] opacity-80 group-hover/btn:opacity-100 transition-all group-hover/btn:translate-x-1 duration-300 group-hover/btn:text-black">
                  Discover
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop: Main Massive H1 Text + AI Preview Card */}
        <div className="flex-1 flex items-center pointer-events-auto my-10 shrink-0 relative">
          {/* Left column — text + CTAs */}
          <div className="flex flex-col justify-center max-w-[520px]">
            <h2 className="text-[48px] lg:text-[58px] font-medium leading-[1.08] text-[#111] tracking-[-0.03em]">
              <WordReveal delay={0.15}>Architecting Tomorrow's</WordReveal>{' '}
              <motion.span
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(12px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent inline-block"
              >Digital</motion.span>{' '}
              <WordReveal delay={0.7}>Businesses</WordReveal>
            </h2>
            <p className="mt-6 text-[15px] lg:text-[16px] text-[#444] font-medium max-w-[460px] leading-[1.8]">
              From innovative ideas to enterprise-scale software,
              our AI architects design, estimate, and plan
              your digital product before a single line of code is written.
            </p>
            {/* Desktop: Dual CTAs below hero text */}
            <div className="mt-8 flex items-center gap-4">
              <Link
                to="/chatbot"
                className="hero-btn-glow inline-flex items-center gap-3 bg-[#0A0A0A] text-white rounded-full pl-6 pr-1.5 py-1.5 group shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300"
              >
                <BrainCircuit size={16} strokeWidth={2.5} className="text-violet-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em]">Start AI Consultation</span>
                <span className="w-[32px] h-[32px] bg-white text-[#0A0A0A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="-rotate-45" />
                </span>
              </Link>
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/[0.12] bg-white/60 backdrop-blur-sm text-[#222] shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:bg-white/80 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 cursor-pointer"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.14em]">View Our Work</span>
              </button>
            </div>
          </div>

          {/* Right column — AI Preview Card (floating) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
            style={{ right: '-40px' }}
          >
            <div className="ai-preview-card ai-preview-card--desktop ai-preview-float">
              {/* Top shimmer line */}
              <div className="ai-preview-shimmer" />
              
              <div className="ai-preview-header">
                <div className="ai-preview-header-icon">
                  <BrainCircuit size={16} strokeWidth={2} />
                </div>
                <span className="ai-preview-header-title">AI Solution Architect</span>
                <div className="ai-preview-live-dot" />
              </div>

              <div className="ai-preview-checklist">
                {['Project Analysis', 'Technology Selection', 'Budget Estimation', 'Live Proposal Builder'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 + i * 0.12, ease: 'easeOut' }}
                    className="ai-preview-check-item"
                  >
                    <Check size={11} strokeWidth={3} className="ai-preview-check-icon" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="ai-preview-divider" />

              <div className="ai-preview-sample-label">Sample Output Preview</div>

              <div className="ai-preview-stats">
                <div className="ai-preview-stat">
                  <Layers size={12} className="ai-preview-stat-icon-sm" />
                  <div className="ai-preview-stat-text">
                    <span className="ai-preview-stat-label">Recommended Division</span>
                    <span className="ai-preview-stat-value ai-preview-stat-value--brahma">BRAHMA</span>
                  </div>
                </div>
                <div className="ai-preview-stat">
                  <IndianRupee size={12} className="ai-preview-stat-icon-sm" />
                  <div className="ai-preview-stat-text">
                    <span className="ai-preview-stat-label">Estimated Budget</span>
                    <span className="ai-preview-stat-value">₹48,000</span>
                  </div>
                </div>
                <div className="ai-preview-stat">
                  <Clock size={12} className="ai-preview-stat-icon-sm" />
                  <div className="ai-preview-stat-text">
                    <span className="ai-preview-stat-label">Timeline</span>
                    <span className="ai-preview-stat-value">5 Weeks</span>
                  </div>
                </div>
              </div>

              <div className="ai-preview-divider" />

              <Link to="/chatbot" className="ai-preview-cta">
                <span>Start Consultation</span>
                <ArrowRight size={13} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Desktop: Bottom Long Glass Card with Stats */}
        <div className="flex pointer-events-auto shrink-0 z-30">
          <div className="w-full bg-white/70 backdrop-blur-[40px] rounded-[48px] py-7 pr-8 pl-10 border border-white flex items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(255,255,255,0.6)]">

            {/* Left col — CTA */}
            <div className="flex-shrink-0 max-w-[320px]">
              <h3 className="text-[22px] font-semibold text-[#111] leading-[1.15] tracking-tight">
                Architecting Tomorrow's Digital Businesses
              </h3>
              <p className="mt-2 text-[12px] text-[#555] font-medium max-w-[300px] leading-relaxed">
                AI-powered consultation that analyzes your vision and generates a live project proposal.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <Link to="/chatbot" className="hero-btn-glow flex items-center justify-between bg-[#111] rounded-full pl-5 pr-[4px] py-[4px] hover:scale-105 transition-transform group shadow-md">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFF] mr-3">
                    Start AI Consultation
                  </span>
                  <span className="bg-[#FFF] text-[#111] rounded-full w-[28px] h-[28px] flex items-center justify-center">
                    <ArrowRight size={14} strokeWidth={3} />
                  </span>
                </Link>
                <button onClick={scrollToProjects} className="text-[10px] font-extrabold uppercase tracking-widest text-[#555] hover:text-[#111] transition-colors cursor-pointer bg-transparent border-none">
                  View Our Work ↓
                </button>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] self-stretch bg-gradient-to-b from-transparent via-black/10 to-transparent flex-shrink-0" />

            {/* Right col — Polished Stats Grid */}
            <div className="flex-1 grid grid-cols-4 gap-4">

              {/* Stat 1 — Projects */}
              <div className="flex flex-col items-center gap-3 group/stat cursor-default">
                <div className="relative w-[64px] h-[64px] rounded-2xl bg-white/80 border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover/stat:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-400">
                  <div className="absolute inset-[5px] rounded-full border-[1.5px] border-dashed border-black/10 animate-[spin_14s_linear_infinite] group-hover/stat:border-black/25 transition-colors duration-500" />
                  <span className="text-[20px] font-black text-[#111] tracking-tight relative z-10"><CountUp target={63} /><span className="text-[14px] text-[#888]">+</span></span>
                </div>
                <span className="text-[10px] font-bold text-[#444] text-center uppercase tracking-[0.08em] leading-tight">Projects<br />Delivered</span>
              </div>

              {/* Stat 2 — AI Consultations */}
              <div className="flex flex-col items-center gap-3 group/stat cursor-default">
                <div className="relative w-[64px] h-[64px] rounded-2xl bg-white/80 border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover/stat:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-400">
                  <div className="absolute top-[6px] right-[6px] w-[6px] h-[6px] rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.5)] animate-pulse" />
                  <span className="text-[18px] font-black text-[#111] tracking-tight relative z-10"><CountUp target={300} delay={0.15} /><span className="text-[12px] font-bold text-[#888]">+</span></span>
                </div>
                <span className="text-[10px] font-bold text-[#444] text-center uppercase tracking-[0.08em] leading-tight">AI<br />Consultations</span>
              </div>

              {/* Stat 3 — Satisfaction */}
              <div className="flex flex-col items-center gap-3 group/stat cursor-default">
                <div className="relative w-[64px] h-[64px] rounded-2xl bg-white/80 border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover/stat:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-400">
                  <div className="absolute top-[6px] right-[6px] w-[6px] h-[6px] rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)] animate-pulse" />
                  <span className="text-[20px] font-black text-[#111] tracking-tight relative z-10">
                    <CountUp target={99} delay={0.3} /><span className="text-[12px] font-bold text-[#888]">%</span>
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#444] text-center uppercase tracking-[0.08em] leading-tight">Client<br />Satisfaction</span>
              </div>

              {/* Stat 4 — Launch Time */}
              <div className="flex flex-col items-center gap-3 group/stat cursor-default">
                <div className="relative w-[64px] h-[64px] rounded-2xl bg-white/80 border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover/stat:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-400">
                  <svg className="absolute w-[36px] h-[36px] opacity-[0.06] group-hover/stat:opacity-[0.12] transition-opacity duration-500" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                  <span className="text-[20px] font-black text-[#111] tracking-tight relative z-10"><CountUp target={21} delay={0.45} /><span className="text-[11px] text-amber-500 font-bold ml-[1px]">d</span></span>
                </div>
                <span className="text-[10px] font-bold text-[#444] text-center uppercase tracking-[0.08em] leading-tight">Avg Launch<br />Time</span>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default NewHero;