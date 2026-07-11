import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const fan = isMobile
    ? { leftX: -62, rightX: 58, chipTopY: -130, chipTopX: -65, chipBotY: 105, chipBotX: 72 }
    : { leftX: -120, rightX: 110, chipTopY: -190, chipTopX: -100, chipBotY: 150, chipBotX: 120 };

  return (
    <div
      className="w-full h-full flex justify-center items-center overflow-visible relative cursor-pointer select-none"
      style={{ minHeight: isMobile ? 340 : 420 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating chip — top-left */}
      <motion.div
        initial={{ opacity: 0, y: -50, x: -50, rotate: 0, scale: 0.8 }}
        animate={isHovered
          ? { opacity: 1, y: fan.chipTopY, x: fan.chipTopX, rotate: -4, scale: 1 }
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
          ? { opacity: 1, y: fan.chipBotY, x: fan.chipBotX, rotate: 6, scale: 1 }
          : { opacity: 0, y: 50, x: 50, rotate: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.05 }}
        className="absolute z-50 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-xl pointer-events-none border"
        style={{ background: SURFACE, color: INK, borderColor: 'rgba(0,0,0,0.1)' }}
      >
        <MousePointer2 className="w-3.5 h-3.5" />
        <span>Start Free</span>
      </motion.div>

      <div className="relative w-60 h-72 sm:w-64 sm:h-72 lg:w-80 lg:h-80 flex justify-center items-center pointer-events-none">

        {/* ── Left card: Project Scope ── */}
        <motion.div
          initial={{ rotate: -4, scale: 0.95, x: -10, y: 5 }}
          animate={isHovered
            ? { rotate: -15, scale: 0.9, x: fan.leftX, y: 30 }
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
            ? { rotate: 20, scale: 0.9, x: fan.rightX, y: 20 }
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
          <div className="relative z-10 px-5 pt-4 pb-3 flex justify-between items-start">
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: -10 } : { scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md overflow-hidden"
              style={{ background: INK }}
            >
              <img
                src="/techbrahmand-logo.png"
                alt="TB"
                className="w-6 h-6 object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </motion.div>
            <div className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5"
              style={{ background: 'rgba(0,0,0,0.04)', color: `${INK}99` }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
              Live
            </div>
          </div>

          {/* Live proposal preview */}
          <div className="relative z-10 px-5 flex flex-col gap-1.5">
            {/* Title row */}
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight" style={{ color: INK }}>
                SaaS Platform
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{ background: `${TEAL}18`, color: TEAL }}>
                Brahma
              </span>
            </div>
            {/* Stack */}
            <span className="text-xs font-medium" style={{ color: `${INK}77` }}>
              React · Node · PostgreSQL
            </span>

            {/* Module breakdown */}
            <div className="mt-0.5 flex flex-col gap-0.5">
              {[
                { label: 'Auth & Onboarding', price: '₹60K', done: true },
                { label: 'Dashboard & Analytics', price: '₹1.1L', done: true },
                { label: 'API Integrations', price: '₹80K', done: false },
              ].map(({ label, price, done }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0"
                      style={{
                        background: done ? `${TEAL}22` : 'rgba(0,0,0,0.05)',
                        color: done ? TEAL : `${INK}44`,
                      }}
                    >
                      {done ? '✓' : '·'}
                    </span>
                    <span className="text-[11px]" style={{ color: done ? `${INK}aa` : `${INK}55` }}>{label}</span>
                  </div>
                  <span className="text-[11px] font-semibold tabular-nums" style={{ color: done ? `${INK}99` : `${INK}44` }}>{price}</span>
                </div>
              ))}
            </div>

            {/* Total + status */}
            <div className="flex items-center justify-between mt-1 pt-1.5" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold" style={{ color: INK }}>₹3.8L total</span>
                <span className="text-[10px]" style={{ color: `${INK}55` }}>· 10–12 wks</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: '#4ade80' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                AI live
              </span>
            </div>
          </div>

          {/* Bottom bar: AI Solution Architect */}
          <div className="relative z-10 px-4 pb-4 pt-2 w-full">
            <Link to="/chatbot" className="block no-underline pointer-events-auto">
              <motion.div
                initial={{ y: 8, opacity: 0.8 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 8, opacity: 0.8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                className="w-full rounded-xl px-3 py-2.5 flex justify-between items-center"
                style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)', cursor: 'pointer' }}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold" style={{ color: INK }}>AI Solution Architect</span>
                  <span className="text-[10px]" style={{ color: `${INK}55` }}>Start estimating →</span>
                </div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center shadow-sm flex-shrink-0"
                  style={{ background: SURFACE }}>
                  <ArrowRight className="w-3 h-3" style={{ color: `${INK}66` }} />
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
