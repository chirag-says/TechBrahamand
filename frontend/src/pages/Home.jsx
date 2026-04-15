import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NewHero from "../components/NewHero";
import InnovationSection from "../components/InnovationSection";
import MarqueeBanner from "../components/MarqueeBanner";

const Home = () => {
  const [hoveredDeity, setHoveredDeity] = useState(null);

  const deities = [
    { 
      id: 'brahma', 
      name: 'TechCreator', 
      role: 'AI Architecture', 
      align: 'items-start text-left', 
      posParams: 'left-3 md:left-6 lg:left-8 top-[55%] md:top-[58%]',
      subtitleWidth: 'max-w-[120px] md:max-w-[160px]'
    },
    { 
      id: 'vishnu', 
      name: 'TechPreserver', 
      role: 'System Intelligence', 
      align: 'items-center text-center', 
      posParams: 'left-1/2 -translate-x-1/2 top-[18%] md:top-[16%] lg:top-[14%]',
      subtitleWidth: 'max-w-[130px] md:max-w-[170px]'
    },
    { 
      id: 'mahesh', 
      name: 'TechTransformer', 
      role: 'Legacy Migration', 
      align: 'items-end text-right', 
      posParams: 'right-3 md:right-6 lg:right-8 top-[55%] md:top-[58%]',
      subtitleWidth: 'max-w-[120px] md:max-w-[160px]'
    },
  ];

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

      <div className="relative w-full h-[65vh] md:h-[70vh] bg-black overflow-hidden selection:bg-amber-500 selection:text-black">

        {/* Base Background Image */}
        <img
          src="/download (3).png"
          alt="Techbrahmand Universe"
          className="absolute inset-0 w-full h-full object-cover object-top z-0"
        />

        {/* Dynamic Cinematic Spotlight Overlay (Syncs perfectly across all screen sizes) */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-700 z-10
          ${hoveredDeity ? 'opacity-100 backdrop-blur-[1px]' : 'opacity-0'}
        `}
          style={{
            background: hoveredDeity === 'brahma'
              ? 'radial-gradient(circle at 15% 50%, transparent 8%, rgba(0,0,0,0.8) 40%)'
              : hoveredDeity === 'vishnu'
                ? 'radial-gradient(circle at 50% 35%, transparent 12%, rgba(0,0,0,0.8) 50%)'
                : hoveredDeity === 'mahesh'
                  ? 'radial-gradient(circle at 85% 50%, transparent 8%, rgba(0,0,0,0.8) 40%)'
                  : 'rgba(0,0,0,0)'
          }}
        />

        {/* Cinematic Vignette / Bottom Gradient for Text Readability */}
        <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10" />

        {/* =======================
          INTERACTIVE HOVER ZONES
          ======================= */}
        <div className="absolute inset-0 w-full h-full flex z-20">
          {deities.map((deity) => (
            <div
              key={deity.id}
              onMouseEnter={() => setHoveredDeity(deity.id)}
              onMouseLeave={() => setHoveredDeity(null)}
              className="group relative flex-1 h-full cursor-pointer"
            >
              {/* Hover Text Overlays — small secondary labels */}
              <AnimatePresence>
                {hoveredDeity === deity.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`absolute flex flex-col pointer-events-none w-[140px] md:w-[170px] lg:w-[200px] z-30 ${deity.align} ${deity.posParams}`}
                  >
                    <h3 className="
                    font-heading text-lg md:text-xl lg:text-2xl font-extrabold text-white leading-tight
                    drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)]
                  ">
                      {deity.name}
                    </h3>
                    <p className={`
                    mt-0.5 md:mt-1 text-[7px] md:text-[9px] lg:text-[10px] 
                    text-amber-400/90 font-bold tracking-[0.15em] md:tracking-[0.18em] uppercase
                    drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]
                    ${deity.subtitleWidth}
                  `}>
                      {deity.role}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Centered Main Title (Pointer events ignored so it doesn't block deity hovers) */}
        <div className="absolute inset-0 w-full h-full flex flex-col justify-end items-center pb-6 md:pb-10 px-4 z-30 pointer-events-none">

          <div className="text-center">

            {/* Main Title with Cinematic Un-blur Entrance */}
            <motion.h1
              initial={{ opacity: 0, y: 60, filter: 'blur(20px)', scale: 1.05 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="
              font-heading text-[clamp(2.8rem,6vw,7rem)]
              font-extrabold mb-1 md:mb-3 leading-none tracking-tighter
              bg-gradient-to-b from-[#FFFBEB] via-[#FDE68A] to-[#D97706]
              bg-clip-text text-transparent
              drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]
            "
            >
              Techbrahmand
            </motion.h1>

            {/* AI Subtitle with Staggered Fade Up */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="
              text-[9px] sm:text-[10px] md:text-xs lg:text-sm 
              text-amber-100/90 font-semibold tracking-widest md:tracking-[0.25em] uppercase
              drop-shadow-[0_4px_15px_rgba(0,0,0,1)] whitespace-nowrap
            "
            >
              Architecting intelligent infrastructure that bridges legacy systems with autonomous AI
            </motion.p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;