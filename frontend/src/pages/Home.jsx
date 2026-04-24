import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NewHero from "../components/NewHero";
import InnovationSection from "../components/InnovationSection";
import MarqueeBanner from "../components/MarqueeBanner";

/* ─── Hover zone definitions ─── */
const hoverZones = [
  {
    id: "brahma",
    label: "Tech Creator",
    accent: "#EAB308",       // yellow border/shadow
    textColor: "#FDE047",    // bright yellow text
    /* Zone covers Brahma (left deity) within the laptop screen */
    zone: { left: "3%", width: "30%", top: "10%", height: "75%" },
    /* Label floats above-right of Brahma */
    labelPos: { left: "18%", top: "18%" },
    /* Glow center for the radial highlight */
    glowCenter: "20% 50%",
  },
  {
    id: "vishnu",
    label: "Tech Preserver",
    accent: "#0284C7",       // blue border/shadow
    textColor: "#38BDF8",    // bright blue text
    zone: { left: "33%", width: "34%", top: "5%", height: "80%" },
    labelPos: { left: "50%", top: "10%", transform: "translateX(-50%)" },
    glowCenter: "50% 45%",
  },
  {
    id: "shiva",
    label: "Tech Transformer",
    accent: "#9333EA",       // purple border/shadow
    textColor: "#C084FC",    // bright purple text
    zone: { left: "67%", width: "30%", top: "10%", height: "75%" },
    labelPos: { right: "18%", top: "18%" },
    glowCenter: "80% 50%",
  },
];

/* ─── Label animation variants ─── */
const labelVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.96,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    filter: "blur(4px)",
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const Home = () => {
  const [hoveredDeity, setHoveredDeity] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef(null);

  /* Track normalised cursor position over the laptop container */
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setCursorPos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredDeity(null);
    setCursorPos({ x: 0.5, y: 0.5 });
  }, []);

  /* Subtle parallax transform from cursor */
  const parallaxX = (cursorPos.x - 0.5) * 6;   // max ±3px
  const parallaxY = (cursorPos.y - 0.5) * 4;   // max ±2px

  return (
    <div className="w-full overflow-y-auto">
      <NewHero />
      <div className="hidden md:block">
        <MarqueeBanner containerBg="bg-[#F3F5F9]" />
      </div>
      <InnovationSection />
      {/* Bottom Marquee Banner - desktop only (mobile version is inside InnovationSection) */}
      <div className="relative z-40 w-full overflow-visible hidden lg:block">
        {/* We use a white background patch that perfectly matches the skew to extend the Innovation section seamlessly */}
        <div className="absolute top-0 left-0 w-full h-[30px] bg-[#F3F5F9] origin-bottom-right skew-y-1 -translate-y-full pointer-events-none" />
        
        <MarqueeBanner
          direction="right"
          skewClass="skew-y-1 origin-right"
          containerBg="bg-transparent"
          marginTop="-mt-6"
          marginBottom="-mb-16"
        />
      </div>

      {/* ═══════════════════════════════════════════
          LAPTOP-FRAMED DEITY SECTION — Cinematic Redesign
          ═══════════════════════════════════════════ */}

      {/* Mobile: "The Trinity of Tech" in light area */}
      <div className="md:hidden bg-[#F3F5F9] text-center pt-6 pb-4 px-6">
        <h3 className="text-[22px] font-bold text-[#111] tracking-[-0.02em] mt-1">The Trinity of Tech</h3>
        <p className="text-[11px] text-[#888] font-medium mt-1 tracking-[0.02em]">Where creation, preservation & transformation unite</p>
      </div>

      {/* Top gradient transition — mobile: light-to-dark, desktop: light-to-dark */}
      <div className="md:hidden relative w-full h-[60px] pointer-events-none" style={{ background: 'linear-gradient(to bottom, #F3F5F9 0%, #0a0f1e 100%)' }} />
      <div className="hidden md:block relative w-full h-[100px] pointer-events-none" style={{ background: 'linear-gradient(to bottom, #F3F5F9 0%, #0a0f1e 100%)' }} />

      <div
        className="relative w-full flex flex-col items-center overflow-hidden selection:bg-amber-500 selection:text-black"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, #0d1a3a 0%, #070b1a 45%, #020408 100%)',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        {/* ── Nebula gradient layers ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 35%, rgba(30,80,220,0.18) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(100,60,200,0.08) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 30% at 50% 75%, rgba(20,100,255,0.1) 0%, transparent 55%)' }} />

        {/* ── Star field ── */}
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{
          backgroundImage: `radial-gradient(1px 1px at 8% 15%, rgba(180,200,255,0.9), transparent),
            radial-gradient(1px 1px at 22% 8%, rgba(200,210,255,0.7), transparent),
            radial-gradient(1.2px 1.2px at 35% 22%, rgba(180,200,255,0.6), transparent),
            radial-gradient(1px 1px at 48% 4%, rgba(220,230,255,0.8), transparent),
            radial-gradient(0.8px 0.8px at 62% 18%, rgba(180,200,255,0.5), transparent),
            radial-gradient(1px 1px at 75% 12%, rgba(200,220,255,0.7), transparent),
            radial-gradient(1.3px 1.3px at 88% 6%, rgba(180,200,255,0.6), transparent),
            radial-gradient(1px 1px at 5% 45%, rgba(180,200,255,0.4), transparent),
            radial-gradient(0.8px 0.8px at 18% 55%, rgba(200,210,255,0.5), transparent),
            radial-gradient(1px 1px at 32% 48%, rgba(180,200,255,0.3), transparent),
            radial-gradient(1px 1px at 55% 42%, rgba(200,220,255,0.4), transparent),
            radial-gradient(1.2px 1.2px at 72% 52%, rgba(180,200,255,0.5), transparent),
            radial-gradient(1px 1px at 92% 38%, rgba(200,210,255,0.6), transparent),
            radial-gradient(0.8px 0.8px at 15% 78%, rgba(180,200,255,0.3), transparent),
            radial-gradient(1px 1px at 42% 82%, rgba(200,220,255,0.4), transparent),
            radial-gradient(1px 1px at 68% 75%, rgba(180,200,255,0.3), transparent),
            radial-gradient(1.5px 1.5px at 85% 68%, rgba(200,210,255,0.5), transparent),
            radial-gradient(1px 1px at 95% 85%, rgba(180,200,255,0.4), transparent)`,
        }} />

        {/* ── Mandala geometry ── */}
        <div className="absolute pointer-events-none" style={{ top: '15%', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '500px', opacity: 0.04 }}>
          <svg viewBox="0 0 500 500" fill="none" stroke="rgba(150,180,255,1)" strokeWidth="0.5" className="w-full h-full animate-[spin_120s_linear_infinite]">
            <circle cx="250" cy="250" r="240" /><circle cx="250" cy="250" r="200" /><circle cx="250" cy="250" r="160" /><circle cx="250" cy="250" r="120" /><circle cx="250" cy="250" r="80" />
            {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => <line key={a} x1="250" y1="10" x2="250" y2="490" transform={`rotate(${a} 250 250)`} />)}
          </svg>
        </div>



        {/* ── Laptop + Glow Container ── */}
        <div
          ref={containerRef}
          className="relative w-full z-10 mx-auto"
          style={{ maxWidth: '1400px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Mobile: use a taller container so laptop fills the screen */}
          <div className="relative w-full" style={{ aspectRatio: '1536 / 925' }}>

            {/* Radial glow behind laptop center */}
            <div className="absolute pointer-events-none" style={{ top: '5%', left: '10%', right: '10%', bottom: '15%', background: 'radial-gradient(ellipse at 50% 50%, rgba(40,90,220,0.15) 0%, transparent 60%)', filter: 'blur(40px)', zIndex: 0 }} />

            {/* Glow ring beneath laptop */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ bottom: '14%', left: '15%', right: '15%', height: '15%', background: 'radial-gradient(ellipse at 50% 80%, rgba(30,100,255,0.3) 0%, rgba(60,140,255,0.1) 40%, transparent 70%)', filter: 'blur(20px)', zIndex: 1 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Soft shadow under laptop */}
            <div className="absolute pointer-events-none" style={{ bottom: '12%', left: '20%', right: '20%', height: '10%', background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.5) 0%, transparent 70%)', filter: 'blur(30px)', zIndex: 0 }} />

            {/* Laptop image — scaled up on mobile for deity visibility */}
            <motion.img
              src="/image copy 4.png"
              alt="Laptop Display"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none scale-[1.35] md:scale-[1.15]"
              style={{ zIndex: 2, transformOrigin: 'center 55%' }}
              animate={{
                x: parallaxX,
                y: [0, -4, 0],
              }}
              transition={{
                x: { type: "spring", stiffness: 150, damping: 25, mass: 0.5 },
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
            />

            {/* Keyboard backlight glow on hover */}
            <AnimatePresence>
              {hoveredDeity && (() => {
                const zone = hoverZones.find(z => z.id === hoveredDeity);
                if (!zone) return null;
                return (
                  <motion.div key={`keyboard-glow-${zone.id}`} className="absolute pointer-events-none mix-blend-screen" style={{ bottom: '8%', left: '18%', right: '18%', height: '18%', background: `radial-gradient(ellipse at 50% 50%, ${zone.accent}A0, transparent 65%)`, filter: 'blur(25px)', zIndex: 3 }} initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }} />
                );
              })()}
            </AnimatePresence>

            {/* Interactive screen overlay */}
            <div className="absolute overflow-hidden" style={{ top: '6%', bottom: '28%', left: '14%', right: '14%', zIndex: 5, borderRadius: '4px 4px 0 0' }}>
              {hoverZones.map((zone) => (
                <div key={zone.id} className="absolute cursor-pointer" style={{ ...zone.zone, zIndex: 10 }} onMouseEnter={() => setHoveredDeity(zone.id)} onMouseLeave={() => setHoveredDeity(null)}>
                  <motion.div className="absolute inset-0" animate={{ scale: hoveredDeity === zone.id ? 1.03 : 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
                </div>
              ))}
              <AnimatePresence>
                {hoveredDeity && (() => {
                  const zone = hoverZones.find(z => z.id === hoveredDeity);
                  if (!zone) return null;
                  const followX = (cursorPos.x - 0.5) * 8;
                  const followY = (cursorPos.y - 0.5) * 5;
                  return (
                    <motion.div key={`label-${zone.id}`} className="absolute pointer-events-none" style={{ ...zone.labelPos, zIndex: 20 }} variants={labelVariants} initial="hidden" animate="visible" exit="exit">
                      <motion.div className="flex items-center gap-2 rounded-xl px-4 py-2.5 border select-none" style={{ background: 'rgba(10,15,30,0.75)', borderColor: `${zone.accent}25`, backdropFilter: 'blur(20px) saturate(1.4)', boxShadow: `0 0 0 1px ${zone.accent}10, 0 8px 32px rgba(0,0,0,0.4), 0 0 60px ${zone.accent}08` }} animate={{ x: followX, y: followY }} transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.4 }}>
                        <div className="w-[6px] h-[6px] rounded-full shrink-0" style={{ background: zone.accent, boxShadow: `0 0 8px ${zone.accent}80` }} />
                        <span className="text-[10px] sm:text-[11px] md:text-[12px] font-extrabold tracking-[0.14em] uppercase whitespace-nowrap" style={{ color: zone.textColor, textShadow: `0 0 20px ${zone.accent}80` }}>{zone.label}</span>
                      </motion.div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>

            {/* Text overlay inside laptop screen — desktop only */}
            <div className="hidden md:block absolute overflow-hidden pointer-events-none" style={{ top: '11%', bottom: '33%', left: '18%', right: '18%', zIndex: 15 }}>
              <div className="absolute inset-0 w-full h-full flex flex-col justify-end items-center pb-[8%] px-4">
                <div className="text-center">
                  <motion.h1 initial={{ opacity: 0, y: 40, filter: 'blur(20px)', scale: 1.05 }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }} transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} className="font-heading text-[clamp(1.2rem,3.5vw,4rem)] font-extrabold mb-1 leading-none tracking-tighter bg-gradient-to-b from-[#FFFBEB] via-[#FDE68A] to-[#D97706] bg-clip-text text-transparent drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
                    Techbrahmand
                  </motion.h1>
                  <motion.p initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }} className="text-[4px] sm:text-[5px] md:text-[6.5px] lg:text-[8px] text-amber-100/90 font-semibold tracking-[0.08em] md:tracking-[0.15em] uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,1)] whitespace-nowrap">
                    Architecting intelligent infrastructure that bridges legacy systems with autonomous AI
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-[10px] md:h-[40px]" />
      </div>

      {/* Bottom gradient transition — dark on mobile, dark-to-light on desktop */}
      <div className="hidden md:block relative w-full h-[80px] pointer-events-none" style={{ background: 'linear-gradient(to bottom, #020408 0%, #F3F5F9 100%)' }} />
    </div>
  );
};

export default Home;