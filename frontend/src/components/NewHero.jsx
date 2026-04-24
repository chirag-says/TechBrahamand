import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Globe, ShieldCheck, ArrowRight, Menu, ChevronDown, LogIn, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfileRail from './ProfileRail';
import MarqueeBanner from './MarqueeBanner';

const NewHero = () => {
  const [isMobileLoaded, setIsMobileLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsMobileLoaded(true), 100);
    return () => clearTimeout(t);
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
    <div className="relative w-full min-h-[100dvh] bg-[#F3F5F9] overflow-hidden font-sans tracking-tight">

      {/* ═══════════════════════════════════════════ */}
      {/* MOBILE ONLY ELEMENTS                        */}
      {/* ═══════════════════════════════════════════ */}

      {/* Mobile: ProfileRail */}
      <div className="md:hidden">
        <ProfileRail />
      </div>

      {/* Mobile: Background layers */}
      <div className="md:hidden absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Gradient orbs */}
        <div className="absolute -top-16 -right-16 w-[260px] h-[260px] rounded-full bg-gradient-to-br from-violet-400/25 via-blue-300/15 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[35%] -left-12 w-[180px] h-[180px] rounded-full bg-gradient-to-tr from-amber-300/12 via-rose-300/8 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
        <div className="absolute bottom-[20%] right-[-8%] w-[160px] h-[160px] rounded-full bg-gradient-to-tl from-cyan-400/10 via-emerald-300/6 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '4s' }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, #000 0.6px, transparent 0.6px)', backgroundSize: '20px 20px' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden absolute bottom-[10px] left-1/2 -translate-x-[42%] w-[105%] max-w-[460px] z-[5] pointer-events-none"
        style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)' }}
      >
        {/* Radial glow behind robot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[60%] h-[60%] rounded-full bg-gradient-to-b from-violet-400/12 via-blue-300/6 to-transparent blur-3xl translate-y-[-10%]" />
        </div>
        <img
          src="/ChatGPT-upscaled.png"
          alt="Cyborg character"
          className="w-full h-auto object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.15)] relative z-10"
        />
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




          {/* Main heading */}
          <motion.div {...fadeUp(0.28)} className="pointer-events-auto pl-[54px] sm:pl-[64px] mt-3 z-20">
            <h2 className="text-[34px] sm:text-[42px] font-semibold leading-[0.98] text-[#0A0A0A] tracking-[-0.04em]">
              <span className="block">Turning Ideas</span>
              <span className="block mt-0.5">Into <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent font-bold">Intelligent</span></span>
              <span className="block mt-0.5">Experiences</span>
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.div {...fadeUp(0.4)} className="pointer-events-auto pl-[54px] sm:pl-[64px] mt-3 z-20">
            <p className="text-[12.5px] sm:text-[13.5px] text-[#555] font-medium max-w-[280px] leading-[1.6] tracking-[0.005em]">
              Future-ready technology crafted to solve real challenges and create lasting impact
            </p>
          </motion.div>

          {/* Dual CTA buttons */}
          <motion.div {...fadeUp(0.5)} className="pointer-events-auto pl-[54px] sm:pl-[64px] mt-4 flex items-center gap-3 z-20">
            <Link
              to="/chatbot"
              className="inline-flex items-center gap-2.5 bg-[#0A0A0A] text-white rounded-full pl-4.5 pr-1 py-1 group shadow-[0_6px_24px_rgba(0,0,0,0.25)] active:scale-[0.97] transition-all duration-200"
            >
              <MessageCircle size={14} strokeWidth={2.5} className="text-violet-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em]">Ask AI</span>
              <span className="w-[28px] h-[28px] bg-white text-[#0A0A0A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ArrowRight size={12} strokeWidth={2.5} className="-rotate-45" />
              </span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.12] bg-white/60 backdrop-blur-sm text-[#222] shadow-[0_2px_10px_rgba(0,0,0,0.06)] active:scale-[0.97] transition-all duration-200"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.14em]">Contact Us</span>
            </Link>
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
                  <span className="text-[18px] font-black text-[#111] tracking-tight relative z-10">50<span className="text-[11px] text-violet-400 font-bold">+</span></span>
                </div>
                <span className="text-[7px] font-bold text-[#777] text-center uppercase tracking-[0.1em] leading-[1.2]">Projects<br />Delivered</span>
              </div>

              {/* Stat 2 — Retention */}
              <div className="flex flex-col items-center gap-1">
                <div className="relative w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-white to-[#f4f5f7] border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center">
                  <span className="text-[18px] font-black text-[#111] tracking-tight relative z-10">99<span className="text-[10px] font-bold text-emerald-400">%</span></span>
                  <div className="absolute top-[4px] right-[4px] w-[6px] h-[6px] rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse" />
                </div>
                <span className="text-[7px] font-bold text-[#777] text-center uppercase tracking-[0.1em] leading-[1.2]">Client<br />Retention</span>
              </div>

              {/* Stat 3 — Support */}
              <div className="flex flex-col items-center gap-1">
                <div className="relative w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-white to-[#f4f5f7] border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 flex gap-[2px] items-end justify-center px-2 pb-1 opacity-[0.08]">
                    <div className="w-[2.5px] rounded-t-full bg-blue-500 h-[7px]" />
                    <div className="w-[2.5px] rounded-t-full bg-blue-500 h-[12px]" />
                    <div className="w-[2.5px] rounded-t-full bg-blue-500 h-[18px]" />
                    <div className="w-[2.5px] rounded-t-full bg-blue-500 h-[10px]" />
                    <div className="w-[2.5px] rounded-t-full bg-blue-500 h-[14px]" />
                  </div>
                  <span className="text-[18px] font-black text-[#111] tracking-tight relative z-10">24<span className="text-[11px] text-blue-400">/7</span></span>
                </div>
                <span className="text-[7px] font-bold text-[#777] text-center uppercase tracking-[0.1em] leading-[1.2]">Active<br />Support</span>
              </div>

              {/* Stat 4 — Trust */}
              <div className="flex flex-col items-center gap-1">
                <div className="relative w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-white to-[#f4f5f7] border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center">
                  <svg className="absolute w-[28px] h-[28px] opacity-[0.04]" viewBox="0 0 36 36" fill="#111">
                    <path d="M18 2L32 9V18C32 26 26 32 18 34C10 32 4 26 4 18V9L18 2Z" />
                  </svg>
                  <span className="text-[18px] font-black text-[#111] tracking-tight relative z-10">5<span className="text-[12px] text-amber-400">★</span></span>
                </div>
                <span className="text-[7px] font-bold text-[#777] text-center uppercase tracking-[0.1em] leading-[1.2]">Trusted<br />Partner</span>
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
        <img
          src="/ChatGPT-upscaled.png"
          alt="Cyborg background"
          className="w-[90%] h-[90%] object-contain object-center scale-[0.9]"
        />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F3F5F9] to-transparent" />
      </div>

      {/* Desktop: Left Black Vertical Bar */}
      <div className="hidden md:flex absolute top-[40px] bottom-[100px] left-6 w-[70px] bg-[#0F1115] rounded-[40px] z-30 flex-col items-center py-6 justify-between shadow-xl">
        <button className="w-[46px] h-[46px] rounded-full flex items-center justify-center hover:scale-105 transition-transform overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.5)] bg-transparent">
          <img
            src="/techbrahmand-badge.png"
            alt="Techbrahmand Logo"
            className="w-[110%] h-[110%] max-w-none object-cover rounded-full"
          />
        </button>

        <div className="flex-1 flex items-center justify-center w-full">
          <span className="text-white text-[10px] uppercase font-bold tracking-[6px]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Where Ideas Evolve
          </span>
        </div>

        <div className="w-[46px] h-[46px] rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
          <ChevronDown size={18} strokeWidth={2} className="text-white/50" />
        </div>
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
          <Link to="/products" className="mt-2 relative z-20 w-[380px] rounded-[28px] p-[8px] pr-6 flex items-center gap-5 group overflow-hidden cursor-pointer isolate border border-white/60 bg-white/50 backdrop-blur-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] hover:bg-white/70 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 transform hover:-translate-y-1 block">
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

        {/* Desktop: Main Massive H1 Text */}
        <div className="flex-1 flex flex-col justify-center pointer-events-auto max-w-[600px] my-10 shrink-0">
          <h2 className="text-[52px] lg:text-[62px] font-medium leading-[1.05] text-[#111] tracking-[-0.03em]">
            Turning Ideas Into Intelligent Experiences
          </h2>
          <p className="mt-6 text-[15px] lg:text-[16px] text-[#444] font-medium max-w-[460px] leading-relaxed">
            Future-ready technology crafted to solve real challenges and create lasting impact
          </p>
        </div>

        {/* Desktop: Bottom Long Glass Card with Stats */}
        <div className="flex pointer-events-auto shrink-0 z-30">
          <div className="w-full bg-white/70 backdrop-blur-[40px] rounded-[48px] py-7 pr-8 pl-10 border border-white flex items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(255,255,255,0.6)]">

            {/* Left col — CTA */}
            <div className="flex-shrink-0 max-w-[320px]">
              <h3 className="text-[22px] font-semibold text-[#111] leading-[1.15] tracking-tight">
                Turning Ideas Into Intelligent Experiences
              </h3>
              <p className="mt-2 text-[12px] text-[#555] font-medium max-w-[300px] leading-relaxed">
                Future-ready technology crafted to solve real challenges and create lasting impact
              </p>
              <Link to="/services" className="mt-5 flex items-center justify-between bg-[#111] rounded-full pl-6 pr-[4px] py-[4px] w-[180px] hover:scale-105 transition-transform group shadow-md block">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFF]">
                  Explore More
                </span>
                <span className="bg-[#FFF] text-[#111] rounded-full w-[28px] h-[28px] flex items-center justify-center">
                  <ArrowRight size={14} strokeWidth={3} />
                </span>
              </Link>
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] self-stretch bg-gradient-to-b from-transparent via-black/10 to-transparent flex-shrink-0" />

            {/* Right col — Polished Stats Grid */}
            <div className="flex-1 grid grid-cols-4 gap-4">

              {/* Stat 1 — Projects */}
              <div className="flex flex-col items-center gap-3 group/stat cursor-default">
                <div className="relative w-[64px] h-[64px] rounded-2xl bg-white/80 border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover/stat:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-400">
                  <div className="absolute inset-[5px] rounded-full border-[1.5px] border-dashed border-black/10 animate-[spin_14s_linear_infinite] group-hover/stat:border-black/25 transition-colors duration-500" />
                  <span className="text-[20px] font-black text-[#111] tracking-tight relative z-10">50<span className="text-[14px] text-[#888]">+</span></span>
                </div>
                <span className="text-[10px] font-bold text-[#444] text-center uppercase tracking-[0.08em] leading-tight">Projects<br />Delivered</span>
              </div>

              {/* Stat 2 — Retention */}
              <div className="flex flex-col items-center gap-3 group/stat cursor-default">
                <div className="relative w-[64px] h-[64px] rounded-2xl bg-white/80 border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover/stat:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-400">
                  <span className="text-[20px] font-black text-[#111] tracking-tight relative z-10">
                    99<span className="text-[12px] font-bold text-[#888]">%</span>
                  </span>
                  <div className="absolute top-[6px] right-[6px] w-[6px] h-[6px] rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)] animate-pulse" />
                </div>
                <span className="text-[10px] font-bold text-[#444] text-center uppercase tracking-[0.08em] leading-tight">Client<br />Retention</span>
              </div>

              {/* Stat 3 — Support */}
              <div className="flex flex-col items-center gap-3 group/stat cursor-default">
                <div className="relative w-[64px] h-[64px] rounded-2xl bg-white/80 border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover/stat:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-400 overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 flex gap-[2px] items-end justify-center px-2 pb-1 opacity-[0.12]">
                    <div className="w-[3px] rounded-t-full bg-[#111] h-[8px] group-hover/stat:h-[14px] transition-all duration-500" />
                    <div className="w-[3px] rounded-t-full bg-[#111] h-[14px] group-hover/stat:h-[20px] transition-all duration-500 delay-75" />
                    <div className="w-[3px] rounded-t-full bg-[#111] h-[20px] group-hover/stat:h-[28px] transition-all duration-500 delay-100" />
                    <div className="w-[3px] rounded-t-full bg-[#111] h-[12px] group-hover/stat:h-[18px] transition-all duration-500 delay-150" />
                    <div className="w-[3px] rounded-t-full bg-[#111] h-[16px] group-hover/stat:h-[24px] transition-all duration-500 delay-200" />
                  </div>
                  <span className="text-[20px] font-black text-[#111] tracking-tight relative z-10">24<span className="text-[14px] text-[#888]">/7</span></span>
                </div>
                <span className="text-[10px] font-bold text-[#444] text-center uppercase tracking-[0.08em] leading-tight">Active<br />Support</span>
              </div>

              {/* Stat 4 — Trust */}
              <div className="flex flex-col items-center gap-3 group/stat cursor-default">
                <div className="relative w-[64px] h-[64px] rounded-2xl bg-white/80 border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover/stat:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-400">
                  <svg className="absolute w-[36px] h-[36px] opacity-[0.06] group-hover/stat:opacity-[0.12] transition-opacity duration-500" viewBox="0 0 36 36" fill="#111">
                    <path d="M18 2L32 9V18C32 26 26 32 18 34C10 32 4 26 4 18V9L18 2Z" />
                  </svg>
                  <span className="text-[20px] font-black text-[#111] tracking-tight relative z-10">5<span className="text-[14px] text-amber-500">★</span></span>
                </div>
                <span className="text-[10px] font-bold text-[#444] text-center uppercase tracking-[0.08em] leading-tight">Trusted<br />Partner</span>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default NewHero;