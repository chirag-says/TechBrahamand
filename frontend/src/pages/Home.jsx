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
      <MarqueeBanner containerBg="bg-[#F3F5F9]" />
      <InnovationSection />
      {/* Bottom Marquee Banner - Perfectly overlapping the transition */}
      <div className="relative z-40 w-full overflow-visible">
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
          LAPTOP-FRAMED DEITY SECTION (Image Copy 4)
          ═══════════════════════════════════════════ */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden selection:bg-amber-500 selection:text-black"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, #0d1a3a 0%, #070b1a 50%, #020408 100%)',
          minHeight: '80vh',
          padding: '60px 20px',
        }}
      >
        {/* Cosmic glow effects matching image copy 4 background */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 50% at 50% 55%, rgba(30,80,220,0.15) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 30% at 50% 80%, rgba(20,100,255,0.12) 0%, transparent 60%)',
        }} />
        {/* Subtle star dots via CSS */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4,
          backgroundImage: `radial-gradient(1px 1px at 10% 20%, rgba(180,200,255,0.8), transparent),
                            radial-gradient(1px 1px at 30% 10%, rgba(180,200,255,0.6), transparent),
                            radial-gradient(1px 1px at 50% 5%, rgba(200,210,255,0.7), transparent),
                            radial-gradient(1px 1px at 70% 15%, rgba(180,200,255,0.5), transparent),
                            radial-gradient(1px 1px at 85% 8%, rgba(200,220,255,0.6), transparent),
                            radial-gradient(1px 1px at 15% 40%, rgba(180,200,255,0.4), transparent),
                            radial-gradient(1px 1px at 90% 35%, rgba(180,200,255,0.5), transparent),
                            radial-gradient(1.5px 1.5px at 25% 60%, rgba(160,180,255,0.6), transparent),
                            radial-gradient(1px 1px at 60% 70%, rgba(180,200,255,0.4), transparent),
                            radial-gradient(1px 1px at 80% 55%, rgba(190,210,255,0.5), transparent)`,
        }} />

        {/* Laptop + Screen container — maintains exact image aspect ratio */}
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ maxWidth: '1400px', aspectRatio: '1536 / 925' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Laptop frame image with subtle parallax */}
          <motion.img
            src="/image copy 4.png"
            alt="Laptop Display"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{ zIndex: 0 }}
            animate={{
              x: parallaxX,
              y: parallaxY,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.5 }}
          />

          {/* ── Keyboard Backlight Glow ── */}
          <AnimatePresence>
            {hoveredDeity && (() => {
              const zone = hoverZones.find(z => z.id === hoveredDeity);
              if (!zone) return null;
              return (
                <motion.div
                  key={`keyboard-glow-${zone.id}`}
                  className="absolute pointer-events-none mix-blend-screen"
                  style={{
                    bottom: '10%',
                    left: '18%',
                    right: '18%',
                    height: '18%',
                    background: `radial-gradient(ellipse at 50% 50%, ${zone.accent}A0, transparent 65%)`,
                    filter: 'blur(25px)',
                    zIndex: 2,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              );
            })()}
          </AnimatePresence>

          {/* ── Interactive screen overlay ── */}
          <div
            className="absolute overflow-hidden"
            style={{
              top: '11%',
              bottom: '33%',
              left: '18%',
              right: '18%',
              zIndex: 5,
              borderRadius: '4px 4px 0 0',
            }}
          >
            {/* Hover zones — invisible interactive areas over each deity */}
            {hoverZones.map((zone) => (
              <div
                key={zone.id}
                className="absolute cursor-pointer"
                style={{
                  ...zone.zone,
                  zIndex: 10,
                }}
                onMouseEnter={() => setHoveredDeity(zone.id)}
                onMouseLeave={() => setHoveredDeity(null)}
              >
                {/* Subtle scale-up effect on the hovered region */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: hoveredDeity === zone.id ? 1.03 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            ))}

            {/* Floating labels — rendered once per zone, shown via AnimatePresence */}
            <AnimatePresence>
              {hoveredDeity && (() => {
                const zone = hoverZones.find(z => z.id === hoveredDeity);
                if (!zone) return null;

                /* Slight cursor-following offset */
                const followX = (cursorPos.x - 0.5) * 8;
                const followY = (cursorPos.y - 0.5) * 5;

                return (
                  <motion.div
                    key={`label-${zone.id}`}
                    className="absolute pointer-events-none"
                    style={{
                      ...zone.labelPos,
                      zIndex: 20,
                    }}
                    variants={labelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.div
                      className="flex items-center gap-2 rounded-xl px-4 py-2.5 border select-none"
                      style={{
                        background: 'rgba(10, 15, 30, 0.75)',
                        borderColor: `${zone.accent}25`,
                        backdropFilter: 'blur(20px) saturate(1.4)',
                        boxShadow: `0 0 0 1px ${zone.accent}10, 0 8px 32px rgba(0,0,0,0.4), 0 0 60px ${zone.accent}08`,
                      }}
                      animate={{
                        x: followX,
                        y: followY,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 30,
                        mass: 0.4,
                      }}
                    >
                      {/* Accent dot */}
                      <div
                        className="w-[6px] h-[6px] rounded-full shrink-0"
                        style={{
                          background: zone.accent,
                          boxShadow: `0 0 8px ${zone.accent}80`,
                        }}
                      />
                      {/* Label text */}
                      <span
                        className="text-[10px] sm:text-[11px] md:text-[12px] font-extrabold tracking-[0.14em] uppercase whitespace-nowrap"
                        style={{
                          color: zone.textColor,
                          textShadow: `0 0 20px ${zone.accent}80`,
                        }}
                      >
                        {zone.label}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Text overlay — positioned precisely inside the laptop screen area */}
          <div
            className="absolute overflow-hidden pointer-events-none"
            style={{
              top: '11%',
              bottom: '33%',
              left: '18%',
              right: '18%',
              zIndex: 15,
            }}
          >
            {/* Title and subtitle anchored at the bottom of the screen */}
            <div className="absolute inset-0 w-full h-full flex flex-col justify-end items-center pb-[8%] px-4">
              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 40, filter: 'blur(20px)', scale: 1.05 }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="
                  font-heading text-[clamp(1.2rem,3.5vw,4rem)]
                  font-extrabold mb-1 leading-none tracking-tighter
                  bg-gradient-to-b from-[#FFFBEB] via-[#FDE68A] to-[#D97706]
                  bg-clip-text text-transparent
                  drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]
                "
                >
                  Techbrahmand
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                  className="
                  text-[4px] sm:text-[5px] md:text-[6.5px] lg:text-[8px] 
                  text-amber-100/90 font-semibold tracking-[0.08em] md:tracking-[0.15em] uppercase
                  drop-shadow-[0_4px_15px_rgba(0,0,0,1)] whitespace-nowrap
                "
                >
                  Architecting intelligent infrastructure that bridges legacy systems with autonomous AI
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;