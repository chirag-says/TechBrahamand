import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MousePointer2, Sparkles, SlidersHorizontal, Bell,
  Layers, Copy, Share2, Trash2, ArrowRight
} from 'lucide-react';

const TEAL = 'oklch(42% 0.18 195)';
const TEAL_LIGHT = 'oklch(62% 0.18 195)';
const INK = '#0c0c1e';
const SURFACE = '#ffffff';
const BG = '#f7f8fc';

export function HeroInteractiveCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full h-full flex justify-center items-center overflow-visible relative cursor-pointer select-none"
      style={{ minHeight: 420 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating chip — top-left */}
      <motion.div
        initial={{ opacity: 0, y: -50, x: -50, rotate: 0, scale: 0.8 }}
        animate={isHovered
          ? { opacity: 1, y: -190, x: -100, rotate: -4, scale: 1 }
          : { opacity: 0, y: -50, x: -50, rotate: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute z-50 flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold shadow-xl pointer-events-none"
        style={{ background: INK, color: SURFACE }}
      >
        <Sparkles className="w-3.5 h-3.5" style={{ color: '#4ade80' }} />
        <span>AI-Powered</span>
      </motion.div>

      {/* Floating chip — bottom-right */}
      <motion.div
        initial={{ opacity: 0, y: 50, x: 50, rotate: 0, scale: 0.8 }}
        animate={isHovered
          ? { opacity: 1, y: 150, x: 120, rotate: 6, scale: 1 }
          : { opacity: 0, y: 50, x: 50, rotate: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.05 }}
        className="absolute z-50 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-xl pointer-events-none border"
        style={{ background: SURFACE, color: INK, borderColor: 'rgba(0,0,0,0.1)' }}
      >
        <MousePointer2 className="w-3.5 h-3.5" />
        <span>Start Free</span>
      </motion.div>

      <div className="relative w-64 h-72 lg:w-80 lg:h-80 flex justify-center items-center pointer-events-none">

        {/* ── Left card: Project Scope ── */}
        <motion.div
          initial={{ rotate: -4, scale: 0.95, x: -10, y: 5 }}
          animate={isHovered
            ? { rotate: -15, scale: 0.9, x: -120, y: 30 }
            : { rotate: -4, scale: 0.95, x: -10, y: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="absolute inset-0 rounded-3xl shadow-lg flex flex-col p-5"
          style={{ background: SURFACE, border: '1px solid rgba(0,0,0,0.08)', opacity: 0.95 }}
        >
          <div className="flex items-center gap-3 pb-4 mb-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.04)' }}>
              <SlidersHorizontal className="w-4 h-4" style={{ color: `${INK}99` }} />
            </div>
            <span className="font-medium text-sm" style={{ color: `${INK}dd` }}>Project Scope</span>
          </div>

          {/* Smart Estimate toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-4 h-4" style={{ color: `${INK}99` }} />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2 animate-pulse"
                  style={{ background: '#4ade80', borderColor: SURFACE }} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold" style={{ color: `${INK}cc` }}>Smart Estimate</span>
                <span className="text-[9px]" style={{ color: `${INK}66` }}>Auto-enabled</span>
              </div>
            </div>
            <div className="relative w-11 h-6 rounded-full flex items-center p-0.5 shadow-inner"
              style={{ background: `linear-gradient(to right, ${TEAL_LIGHT}, ${TEAL})` }}>
              <motion.div
                initial={{ x: 0 }}
                animate={isHovered ? { x: 20 } : { x: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-5 h-5 bg-white rounded-full shadow-sm"
              />
            </div>
          </div>

          {/* Division dots */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4" style={{ color: `${INK}99` }} />
              <span className="text-xs font-semibold" style={{ color: `${INK}cc` }}>Division</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[
                { bg: '#a78bfa', selected: false },
                { bg: TEAL, selected: true },
                { bg: '#34d399', selected: false },
                { bg: '#fb923c', selected: false },
              ].map(({ bg, selected }, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{
                    background: bg,
                    opacity: selected ? 1 : 0.5,
                    outline: selected ? `2px solid ${bg}` : 'none',
                    outlineOffset: 2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Clarity bar */}
          <div className="flex flex-col gap-1.5 mt-auto">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-wider"
              style={{ color: `${INK}66` }}>
              <span className="uppercase">Clarity</span>
              <span style={{ color: TEAL }}>72%</span>
            </div>
            <div className="relative h-2 w-full rounded-full overflow-hidden"
              style={{ background: 'rgba(0,0,0,0.06)' }}>
              <motion.div
                initial={{ width: '30%' }}
                animate={isHovered ? { width: '72%' } : { width: '30%' }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ background: `linear-gradient(to right, ${TEAL_LIGHT}, ${TEAL})` }}
              />
            </div>
          </div>
        </motion.div>

        {/* ── Right card: AI Actions ── */}
        <motion.div
          initial={{ rotate: 4, scale: 0.95, x: 10, y: 0 }}
          animate={isHovered
            ? { rotate: 20, scale: 0.9, x: 110, y: 20 }
            : { rotate: 4, scale: 0.95, x: 10, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="absolute inset-0 rounded-3xl shadow-lg flex flex-col p-2"
          style={{ background: SURFACE, border: '1px solid rgba(0,0,0,0.08)', opacity: 0.95 }}
        >
          <div className="px-3 py-2 text-xs font-semibold tracking-wider"
            style={{ color: `${INK}66` }}>AI ACTIONS</div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg"
              style={{ background: 'rgba(0,0,0,0.03)' }}>
              <div className="flex items-center gap-3">
                <Copy className="w-4 h-4" style={{ color: `${INK}88` }} />
                <span className="text-sm font-medium" style={{ color: `${INK}cc` }}>Analyze Scope</span>
              </div>
              <span className="text-xs font-mono tracking-widest" style={{ color: `${INK}44` }}>⌘A</span>
            </div>

            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg">
              <div className="flex items-center gap-3">
                <Share2 className="w-4 h-4" style={{ color: `${INK}88` }} />
                <span className="text-sm font-medium" style={{ color: `${INK}cc` }}>Generate Quote</span>
              </div>
              <span className="text-xs font-mono tracking-widest" style={{ color: `${INK}44` }}>⌘Q</span>
            </div>

            <div className="h-px w-full my-1" style={{ background: 'rgba(0,0,0,0.06)' }} />

            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg">
              <div className="flex items-center gap-3">
                <Trash2 className="w-4 h-4" style={{ color: 'rgba(239,68,68,0.6)' }} />
                <span className="text-sm font-medium" style={{ color: 'rgba(239,68,68,0.7)' }}>Start Over</span>
              </div>
              <span className="text-xs font-mono tracking-widest" style={{ color: 'rgba(239,68,68,0.35)' }}>⌘⌫</span>
            </div>
          </div>
        </motion.div>

        {/* ── Center card: main ── */}
        <motion.div
          animate={isHovered
            ? { rotate: 0, scale: 1.05, y: -20 }
            : { rotate: 0, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="relative z-10 w-full h-full rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden"
          style={{ background: SURFACE, border: '1px solid rgba(0,0,0,0.08)' }}
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }} />

          {/* Header */}
          <div className="relative z-10 p-6 flex justify-between items-start">
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: -10 } : { scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden"
              style={{ background: INK }}
            >
              <img
                src="/techbrahmand-logo.png"
                alt="TB"
                className="w-7 h-7 object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </motion.div>
            <div className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2"
              style={{ background: 'rgba(0,0,0,0.04)', color: `${INK}99` }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
              Live
            </div>
          </div>

          {/* Skeleton content */}
          <div className="relative z-10 px-6 flex flex-col gap-4">
            <div className="h-8 w-4/5 rounded-lg" style={{ background: 'rgba(0,0,0,0.06)' }} />
            <div className="h-5 w-2/3 rounded-lg" style={{ background: 'rgba(0,0,0,0.04)' }} />
          </div>

          {/* Bottom bar: AI Solution Architect */}
          <div className="relative z-10 p-5 w-full">
            <Link to="/chatbot" className="block no-underline pointer-events-auto">
              <motion.div
                initial={{ y: 10, opacity: 0.8 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 10, opacity: 0.8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                className="w-full rounded-2xl p-4 flex justify-between items-center"
                style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)', cursor: 'pointer' }}
              >
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold" style={{ color: INK }}>AI Solution Architect</span>
                  <span className="text-xs" style={{ color: `${INK}66` }}>Start estimating →</span>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
                  style={{ background: SURFACE }}>
                  <ArrowRight className="w-4 h-4" style={{ color: `${INK}66` }} />
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Cursor pointer easter egg */}
          <motion.div
            initial={{ opacity: 0, x: 200, y: 150, rotate: 0 }}
            animate={isHovered
              ? { opacity: 1, x: 90, y: -40, rotate: -15 }
              : { opacity: 0, x: 200, y: 150, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute bottom-12 right-12 pointer-events-none z-20 hidden sm:block"
          >
            <MousePointer2
              className="w-10 h-10"
              style={{ color: `${INK}bb`, fill: `${INK}22` }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
