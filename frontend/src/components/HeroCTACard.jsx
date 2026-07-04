import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, CalendarRange, Fingerprint, MousePointer2 } from 'lucide-react';

const TEAL = 'oklch(42% 0.18 195)';
const INK = '#0c0c1e';
const SURFACE = '#ffffff';

const container = {
  rest: { transition: { staggerChildren: 0.1, staggerDirection: -1 } },
  hover: { transition: { staggerChildren: 0.1, staggerDirection: 1 } },
};

const card = {
  rest: {
    scale: 1, y: 0,
    transition: { duration: 0.4, ease: [1, 0.18, 0.6, 0.8] },
  },
  hover: {
    scale: 1.05, y: -8,
    transition: { duration: 0.4, ease: [1, 0.18, 0.6, 0.8] },
  },
};

const pointer = {
  rest: {
    x: 0, rotate: 0,
    transition: { duration: 0.4, ease: [1, 0.18, 0.6, 0.8] },
  },
  hover: {
    x: -80, rotate: 20,
    transition: { duration: 0.6, ease: [1, 0.18, 0.6, 0.8] },
  },
};

export function HeroCTACard() {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      variants={container}
      animate={isHover ? 'hover' : 'rest'}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className="w-full border rounded-3xl p-4"
      style={{ background: SURFACE, borderColor: 'rgba(0,0,0,0.1)', fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase"
        style={{ background: `${TEAL}18`, color: TEAL }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: TEAL }} />
        AI Powered
      </div>

      <p className="mt-2 text-sm font-semibold leading-snug" style={{ color: INK }}>
        Get Instant Project Estimates
      </p>
      <p className="mt-1 text-[10px] leading-relaxed" style={{ color: `${INK}88` }}>
        Describe your idea. Our AI builds a real budget &amp; roadmap in seconds.
      </p>

      {/* Stacked card animation */}
      <div className="mt-6 relative h-40 flex justify-center items-start">

        {/* Cursor */}
        <motion.div
          variants={pointer}
          className="absolute z-50 bottom-8 right-10 flex items-center justify-center"
        >
          <MousePointer2 size={18} style={{ color: INK }} />
        </motion.div>

        {/* Back card: Project Brief */}
        <motion.div
          variants={card}
          className="h-28 w-[70%] border rounded-xl absolute"
          style={{ right: '50%', transform: 'translateX(50%)', background: SURFACE, borderColor: 'rgba(0,0,0,0.08)', padding: '10px' }}
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-1.5 flex-1">
              <div className="w-[50%] h-4 rounded" style={{ background: 'rgba(0,0,0,0.06)' }} />
              <div className="w-[15%] h-4 rounded" style={{ background: 'rgba(0,0,0,0.06)' }} />
            </div>
            <CalendarRange size={13} style={{ color: `${INK}66` }} />
          </div>
        </motion.div>

        {/* Middle card: AI Analysis (teal) */}
        <motion.div
          variants={card}
          className="h-28 w-[80%] border rounded-xl absolute"
          style={{
            right: '50%', transform: 'translateX(50%) translateY(28px)',
            background: TEAL, borderColor: 'transparent', padding: '10px',
          }}
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-1.5 flex-1">
              <div className="w-[50%] h-4 rounded" style={{ background: 'rgba(255,255,255,0.2)' }} />
              <div className="w-[15%] h-4 rounded" style={{ background: 'rgba(255,255,255,0.2)' }} />
            </div>
            <Fingerprint size={13} style={{ color: 'rgba(255,255,255,0.8)' }} />
          </div>
        </motion.div>

        {/* Front card: Proposal + CTA */}
        <motion.div
          variants={card}
          className="h-28 w-[90%] border rounded-xl absolute"
          style={{
            right: '50%', transform: 'translateX(50%) translateY(52px)',
            background: SURFACE, borderColor: 'rgba(0,0,0,0.08)', padding: '10px',
          }}
        >
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-1.5 flex-1">
                <div className="w-[50%] h-4 rounded" style={{ background: 'rgba(0,0,0,0.06)' }} />
                <div className="w-[15%] h-4 rounded" style={{ background: 'rgba(0,0,0,0.06)' }} />
              </div>
              <Bookmark size={13} style={{ color: `${INK}66` }} />
            </div>
            <div className="w-full h-14 rounded-lg flex items-end justify-center pb-2"
              style={{ background: 'rgba(0,0,0,0.04)' }}>
              <Link
                to="/chatbot"
                className="px-3 py-1 rounded-lg text-[10px] font-semibold border no-underline"
                style={{
                  color: isHover ? SURFACE : INK,
                  background: isHover ? TEAL : SURFACE,
                  borderColor: isHover ? 'transparent' : 'rgba(0,0,0,0.12)',
                  transition: 'all 0.25s ease',
                }}
              >
                Start Estimating →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
