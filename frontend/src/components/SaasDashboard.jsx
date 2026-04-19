import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Utility: Animated counter ─── */
function AnimatedCounter({ target, prefix = "", suffix = "", duration = 1.6, delay = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const step = target / (duration * 60);
      const interval = setInterval(() => {
        start += step;
        if (start >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return (
    <span>
      {prefix}
      {typeof target === "number" && target >= 1000
        ? count >= 1000000
          ? (count / 1000000).toFixed(1) + "M"
          : count >= 1000
          ? (count / 1000).toFixed(count >= 100000 ? 0 : 0) + "K"
          : count
        : count}
      {suffix}
    </span>
  );
}

/* ─── Revenue graph SVG path (smooth) ─── */
const graphPoints = [
  [0, 70], [40, 62], [80, 55], [120, 48], [160, 52],
  [200, 38], [240, 42], [280, 30], [320, 25], [360, 18],
  [400, 22], [440, 12], [480, 8],
];

function buildPath(pts) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpx1 = prev[0] + (curr[0] - prev[0]) * 0.4;
    const cpx2 = prev[0] + (curr[0] - prev[0]) * 0.6;
    d += ` C ${cpx1} ${prev[1]}, ${cpx2} ${curr[1]}, ${curr[0]} ${curr[1]}`;
  }
  return d;
}

const graphPath = buildPath(graphPoints);
const graphAreaPath = graphPath + ` L 480 80 L 0 80 Z`;

/* ─── Card entrance variants ─── */
const cardVariant = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.3 + i * 0.18,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

/* ─── Grid line fade variant ─── */
const gridVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.06,
    transition: { delay: 0.1, duration: 1.2, ease: "easeOut" },
  },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

/* ─── Notification chip ─── */
const chipVariant = {
  hidden: { opacity: 0, x: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { delay: 2.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3 },
  },
};

/* ─── Light sweep ─── */
const sweepVariant = {
  hidden: { x: "-100%" },
  visible: {
    x: "200%",
    transition: { delay: 2.6, duration: 1.4, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ═══════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════ */
export default function SaasDashboard() {
  const [cycle, setCycle] = useState(0);

  // Seamless loop: reset every 8s
  useEffect(() => {
    const timer = setInterval(() => setCycle((c) => c + 1), 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden select-none"
      style={{ background: "linear-gradient(145deg, #0f1729 0%, #111827 40%, #0c1220 100%)" }}
    >
      {/* ── Grid Lines ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`grid-${cycle}`}
          variants={gridVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </AnimatePresence>

      {/* ── Subtle ambient glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "30%", width: "50%", height: "60%",
          background: "radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`dashboard-${cycle}`}
          className="relative z-10 w-full h-full p-5 flex flex-col gap-3"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* ── Top row: 4 metric cards ── */}
          <div className="grid grid-cols-2 sm:flex gap-3">
            {/* Revenue */}
            <motion.div
              custom={0}
              variants={cardVariant}
              className="flex-1 rounded-xl p-4 border"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500 mb-1">
                Revenue
              </p>
              <p className="text-[22px] font-bold text-white tracking-tight leading-none">
                $2.4M
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                ↑ 24.5%
              </span>
            </motion.div>

            {/* Growth */}
            <motion.div
              custom={1}
              variants={cardVariant}
              className="flex-1 rounded-xl p-4 border"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500 mb-1">
                Growth
              </p>
              <p className="text-[22px] font-bold text-white tracking-tight leading-none">
                +18%
              </p>
              <div className="flex gap-[2px] mt-2 items-end h-[14px]">
                {[6, 9, 7, 11, 8, 13, 10, 14].map((h, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full"
                    style={{
                      height: `${h}px`,
                      background: `rgba(56,189,248,${0.3 + i * 0.08})`,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Active Users */}
            <motion.div
              custom={2}
              variants={cardVariant}
              className="flex-1 rounded-xl p-4 border"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500 mb-1">
                Active Users
              </p>
              <p className="text-[22px] font-bold text-white tracking-tight leading-none">
                128K
              </p>
              <div className="flex items-center gap-1 mt-2">
                <div className="w-[6px] h-[6px] rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[9px] text-slate-500 font-medium">Live</span>
              </div>
            </motion.div>

            {/* Automation */}
            <motion.div
              custom={3}
              variants={cardVariant}
              className="flex-1 rounded-xl p-4 border"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500 mb-1">
                Automation
              </p>
              <p className="text-[22px] font-bold text-white tracking-tight leading-none">
                98%
              </p>
              {/* Mini progress ring */}
              <svg width="18" height="18" viewBox="0 0 20 20" className="mt-2">
                <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                <motion.circle
                  cx="10"
                  cy="10"
                  r="8"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 8}
                  initial={{ strokeDashoffset: 2 * Math.PI * 8 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 8 * 0.02 }}
                  transition={{ delay: 1.2, duration: 1.4, ease: "easeOut" }}
                  transform="rotate(-90 10 10)"
                />
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

          {/* ── Main row: Graph + Activity list ── */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1 min-h-0">
            {/* Revenue Graph Card */}
            <motion.div
              custom={4}
              variants={cardVariant}
              className="flex-[2] rounded-xl p-5 border flex flex-col"
              style={{
                background: "rgba(255,255,255,0.025)",
                borderColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold text-slate-400 tracking-wide">
                  Revenue Overview
                </p>
                <div className="flex gap-3">
                  {["1W", "1M", "1Y"].map((t, i) => (
                    <span
                      key={t}
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        i === 2
                          ? "bg-white/10 text-white"
                          : "text-slate-600 hover:text-slate-400"
                      } cursor-pointer transition-colors`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* SVG Graph */}
              <div className="flex-1 relative">
                <svg
                  viewBox="0 0 480 80"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                >
                  {/* Horizontal guide lines */}
                  {[20, 40, 60].map((y) => (
                    <line
                      key={y}
                      x1="0" y1={y} x2="480" y2={y}
                      stroke="rgba(148,163,184,0.08)"
                      strokeWidth="0.5"
                    />
                  ))}

                  {/* Area fill */}
                  <motion.path
                    d={graphAreaPath}
                    fill="url(#areaGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 1.2 }}
                  />

                  {/* Line */}
                  <motion.path
                    d={graphPath}
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 1.4,
                      duration: 1.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />

                  {/* Dot at the end */}
                  <motion.circle
                    cx={480}
                    cy={8}
                    r="3"
                    fill="#38bdf8"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3.2, duration: 0.4 }}
                  />
                  <motion.circle
                    cx={480}
                    cy={8}
                    r="6"
                    fill="none"
                    stroke="rgba(56,189,248,0.3)"
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3.3, duration: 0.5 }}
                  />

                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="50%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#2dd4bf" />
                    </linearGradient>
                    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(56,189,248,0.12)" />
                      <stop offset="100%" stopColor="rgba(56,189,248,0)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            {/* Activity List Card */}
            <motion.div
              custom={5}
              variants={cardVariant}
              className="flex-1 rounded-xl p-4 border flex flex-col"
              style={{
                background: "rgba(255,255,255,0.025)",
                borderColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p className="text-[11px] font-semibold text-slate-400 tracking-wide mb-3">
                Recent Activity
              </p>

              <div className="flex flex-col gap-2.5 flex-1">
                {[
                  { label: "New deployment", time: "2m ago", dot: "#2dd4bf" },
                  { label: "User milestone: 128K", time: "14m ago", dot: "#38bdf8" },
                  { label: "AI model retrained", time: "1h ago", dot: "#a78bfa" },
                  { label: "Security scan passed", time: "3h ago", dot: "#34d399" },
                  { label: "API v4.2 released", time: "6h ago", dot: "#818cf8" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    custom={6 + i * 0.5}
                    variants={cardVariant}
                    className="flex items-center gap-2.5 py-1.5 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.04)" }}
                  >
                    <div
                      className="w-[5px] h-[5px] rounded-full shrink-0"
                      style={{ background: item.dot }}
                    />
                    <span className="text-[10px] text-slate-300 font-medium flex-1 truncate">
                      {item.label}
                    </span>
                    <span className="text-[9px] text-slate-600 font-medium shrink-0">
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Notification chip ── */}
          <motion.div
            variants={chipVariant}
            className="absolute top-4 right-4 flex items-center gap-2 rounded-full px-3 py-1.5 border z-20"
            style={{
              background: "rgba(16,24,48,0.85)",
              borderColor: "rgba(56,189,248,0.2)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="w-[6px] h-[6px] rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-semibold text-emerald-300 tracking-wide">
              AI Sync Complete
            </span>
          </motion.div>

          {/* ── Light sweep ── */}
          <motion.div
            variants={sweepVariant}
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)",
              width: "50%",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
