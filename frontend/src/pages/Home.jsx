import React, { useRef, useEffect, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Lenis from "lenis";

const ScrollVideoCanvas = React.lazy(() => import("../components/ScrollVideoCanvas"));

/* ============================
   SMOOTH SCROLL
   ============================ */
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

/* ============================
   HOME
   ============================ */
const Home = () => {
  useSmoothScroll();

  const immersiveRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: immersiveRef,
    offset: ["start start", "end end"],
  });

  // Hero fades out early
  const heroOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.06], [0, -60]);
  const heroScale = useTransform(scrollYProgress, [0, 0.06], [1, 0.95]);

  // Trinity labels fade in after the video finishes and STAY forever (no fade out)
  const trinityOpacity = useTransform(scrollYProgress, [0.30, 0.40], [0, 1]);
  const trinityY = useTransform(scrollYProgress, [0.30, 0.40], [40, 0]);

  return (
    <div className="font-sans bg-black text-white selection:bg-white selection:text-black">
      <motion.div ref={immersiveRef} className="relative w-full bg-black">
        
        {/* Background Canvas — fixed behind everything */}
        <div className="sticky top-0 left-0 w-full h-[100dvh]" style={{ zIndex: 1 }}>
           <Suspense fallback={<div className="w-full h-full bg-black flex items-center justify-center text-white text-lg tracking-widest uppercase">Loading...</div>}>
              <ScrollVideoCanvas progress={scrollYProgress} />
           </Suspense>
           {/* Corner button badges to cover watermarks */}
           <Link to="/contact" className="absolute bottom-0 left-0 bg-black px-10 py-5 rounded-tr-2xl z-10 transition-all duration-300 cursor-pointer group">
             <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/60 group-hover:text-white transition-colors duration-300">Contact Us</span>
           </Link>
           <Link to="/chatbot" className="absolute bottom-0 right-0 bg-black px-10 py-5 rounded-tl-2xl z-10 transition-all duration-300 cursor-pointer group">
             <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/60 group-hover:text-white transition-colors duration-300">Idea to Reality</span>
           </Link>
        </div>

        {/* Content Scrolling Overlay */}
        <div className="relative pointer-events-none" style={{ zIndex: 2, marginTop: "-100vh" }}>
          
          {/* ══════════════════════════════════
              HERO — First screen
              ══════════════════════════════════ */}
          <div className="h-[100vh] w-full flex flex-col items-center justify-center px-6 relative">
            {/* Top gradient so navbar text is readable against bright galaxy */}
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
            
            <motion.div style={{ opacity: heroOpacity, y: heroY, scale: heroScale }} className="text-center z-10">
               <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white mb-4 leading-none tracking-tight"
                   style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)" }}>
                 Techbrahmand
               </h1>
               <p className="text-lg md:text-2xl text-white/70 font-light tracking-[0.3em] uppercase"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}>
                 Where digital universes are born
               </p>
            </motion.div>
            
            {/* Scroll Indicator */}
            <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">Scroll</span>
              <div className="w-px h-12 bg-white/20 relative overflow-hidden">
                 <motion.div 
                   animate={{ y: [-48, 48] }} 
                   transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                   className="w-full h-6 bg-white/80" 
                 />
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════════
              TRINITY LABELS — Bottom of viewport, stay visible permanently
              ══════════════════════════════════ */}
          <div className="h-[200vh] w-full relative">
            <div className="sticky top-0 h-[100vh] w-full flex items-end justify-center pb-24 md:pb-28">
              <motion.div 
                style={{ opacity: trinityOpacity, y: trinityY }}
                className="w-full max-w-6xl mx-auto px-6 grid grid-cols-3 gap-4 md:gap-12 pointer-events-auto"
              >
                {/* Brahma — Create */}
                <div className="text-center">
                  <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-amber-400/80 mb-2"
                     style={{ textShadow: "0 0 10px rgba(245,158,11,0.4)" }}>
                    Brahma
                  </p>
                  <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-none"
                      style={{ textShadow: "0 2px 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6)" }}>
                    Create
                  </h2>
                </div>

                {/* Vishnu — Protect */}
                <div className="text-center">
                  <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-amber-400/80 mb-2"
                     style={{ textShadow: "0 0 10px rgba(245,158,11,0.4)" }}>
                    Vishnu
                  </p>
                  <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-none"
                      style={{ textShadow: "0 2px 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6)" }}>
                    Protect
                  </h2>
                </div>

                {/* Shiva — Destroy */}
                <div className="text-center">
                  <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-amber-400/80 mb-2"
                     style={{ textShadow: "0 0 10px rgba(245,158,11,0.4)" }}>
                    Mahesh
                  </p>
                  <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-none"
                      style={{ textShadow: "0 2px 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6)" }}>
                    Destroy
                  </h2>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Home;