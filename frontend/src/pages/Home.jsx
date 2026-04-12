import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [hoveredDeity, setHoveredDeity] = useState(null);

  const deities = [
    { id: 'brahma', name: 'Tech Brahma', role: 'Autonomous AI Architecture', align: 'items-start text-left', posParams: 'pl-6 md:pl-16' },
    { id: 'vishnu', name: 'Tech Vishnu', role: 'Neural Security & Cloud Scalability', align: 'items-center text-center', posParams: '' },
    { id: 'mahesh', name: 'Tech Mahesh', role: 'Disruptive Machine Evolution', align: 'items-end text-right', posParams: 'pr-6 md:pr-16' },
  ];

  return (
    <div className="relative w-full h-full min-h-[100dvh] bg-black overflow-hidden selection:bg-amber-500 selection:text-black">
      
      {/* Base Background Image */}
      <img 
        src="/download (3).png" 
        alt="Techbrahmand Universe" 
        className="absolute inset-0 w-full h-full object-cover object-top z-0" 
      />

      {/* Dynamic Cinematic Spotlight Overlay (Syncs perfectly across all screen sizes) */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-700 z-10
          ${hoveredDeity ? 'opacity-100 backdrop-blur-[2px]' : 'opacity-0'}
        `}
        style={{
          background: hoveredDeity === 'brahma' 
            ? 'radial-gradient(circle at 20% 40%, transparent 10%, rgba(0,0,0,0.85) 50%)'
            : hoveredDeity === 'vishnu'
            ? 'radial-gradient(circle at 50% 45%, transparent 15%, rgba(0,0,0,0.85) 60%)'
            : hoveredDeity === 'mahesh'
            ? 'radial-gradient(circle at 80% 40%, transparent 10%, rgba(0,0,0,0.85) 50%)'
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
            {/* Hover zones don't need independent dimming overlays anymore, handled globally above */}
            {/* Hover Text Overlays */}
            <AnimatePresence>
              {hoveredDeity === deity.id && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`absolute inset-x-0 top-[25%] md:top-[35%] flex flex-col pointer-events-none ${deity.align} ${deity.posParams}`}
                >
                  <h3 className="
                    font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight
                    drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]
                  ">
                    {deity.name}
                  </h3>
                  <p className="
                    mt-2 md:mt-4 text-[10px] md:text-sm lg:text-base 
                    text-amber-400 font-bold tracking-widest md:tracking-[0.3em] uppercase
                    drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]
                    max-w-xs md:max-w-md
                  ">
                    {deity.role}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Centered Main Title (Pointer events ignored so it doesn't block deity hovers) */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-end items-center pb-24 md:pb-36 px-4 z-30 pointer-events-none">
        
        <div className="text-center">
          
          {/* Main Title with Cinematic Un-blur Entrance */}
          <motion.h1 
            initial={{ opacity: 0, y: 60, filter: 'blur(20px)', scale: 1.05 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="
              font-heading text-[clamp(3.5rem,8vw,11rem)]
              font-extrabold mb-2 md:mb-4 leading-none tracking-tight
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
              text-[10px] sm:text-xs md:text-sm lg:text-lg 
              text-amber-100/90 font-semibold tracking-widest md:tracking-[0.3em] uppercase
              drop-shadow-[0_4px_15px_rgba(0,0,0,1)]
            "
          >
            Architecting the next dimension of autonomous AI ecosystems
          </motion.p>
          
        </div>

      </div>
    </div>
  );
};

export default Home;