import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════
   CONSTANTS & CONFIG
   ═══════════════════════════════════════ */
const CYCLE_DURATION = 10000; // 10s loop

/* Base Nodes (always visible) */
const BASE_NODES = [
  { id: "lb", label: "Load Balancer", x: 25, y: 35, color: "#38bdf8", delay: 1.2 },
  { id: "edge", label: "Edge Node", x: 25, y: 65, color: "#2dd4bf", delay: 1.4 },
  { id: "compute1", label: "Compute Cluster", x: 50, y: 50, color: "#818cf8", delay: 1.6, isCore: true },
  { id: "storage", label: "Storage", x: 75, y: 35, color: "#a78bfa", delay: 1.8 },
  { id: "backup", label: "Backup Region", x: 75, y: 65, color: "#cbd5e1", delay: 2.0 },
];

/* Scaling Nodes (appear during traffic spike at 6s) */
const SCALING_NODES = [
  { id: "compute2", label: "Compute Worker", x: 50, y: 25, color: "#34d399", delay: 6.2 },
  { id: "compute3", label: "Compute Worker", x: 50, y: 75, color: "#34d399", delay: 6.4 },
];

/* Base Connections */
const BASE_CONNECTIONS = [
  { from: "lb", to: "compute1" },
  { from: "edge", to: "compute1" },
  { from: "compute1", to: "storage" },
  { from: "compute1", to: "backup" },
];

/* Scaling Connections */
const SCALING_CONNECTIONS = [
  { from: "lb", to: "compute2", delay: 6.5 },
  { from: "lb", to: "compute3", delay: 6.6 },
  { from: "compute2", to: "storage", delay: 6.7 },
  { from: "compute3", to: "backup", delay: 6.8 },
];

/* Notifications Timeline */
const NOTIFICATIONS = [
  { text: "Auto Scaling Enabled", color: "#38bdf8", delay: 4.5, duration: 4.5 },
  { text: "Traffic Spike Detected", color: "#f59e0b", delay: 6.0, duration: 2.0 },
  { text: "Resources Reallocated", color: "#34d399", delay: 7.2, duration: 2.8 },
];

/* ═══════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════ */

/* ── Animated Counter ── */
function MetricCounter({ value, duration = 1.0, delay = 0, isDecimal = false }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const step = value / (duration * 60);
      const interval = setInterval(() => {
        start += step;
        if (start >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(isDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [value, duration, delay, isDecimal]);

  return <span>{isDecimal && count % 1 === 0 ? count + ".0" : count}</span>;
}

/* ── Connection Line with Data Pulse ── */
function ConnectionLine({ fromId, toId, delay, nodes, cycle }) {
  const fromMod = nodes.find((n) => n.id === fromId);
  const toMod = nodes.find((n) => n.id === toId);
  if (!fromMod || !toMod) return null;

  /* Offset mapping */
  const x1 = fromMod.x;
  const y1 = fromMod.y;
  const x2 = toMod.x;
  const y2 = toMod.y;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const controlPointOffset = 10;
  
  // Create a subtle curve
  const cx1 = x1 + dx * 0.5;
  const cy1 = y1 - controlPointOffset;
  const cx2 = x1 + dx * 0.5;
  const cy2 = y2 + controlPointOffset;

  const pathD = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

  return (
    <svg
      key={`${cycle}-line-${fromId}-${toId}`}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ zIndex: 5 }}
    >
      <motion.path
        d={pathD}
        fill="none"
        stroke="rgba(148, 163, 184, 0.15)"
        strokeWidth="0.4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Animated data pulses flowing along the path */}
      <motion.circle
        r="0.8"
        fill={toMod.color}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{
          delay: delay + 1.0,
          duration: 2.5,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${delay + 1.0}s`} path={pathD} />
      </motion.circle>
    </svg>
  );
}

/* ── Infrastructure Node ── */
function InfraNode({ node, cycle, isScaling = false }) {
  const isCore = node.isCore;
  
  return (
    <motion.div
      key={`${cycle}-node-${node.id}`}
      className="absolute flex items-center justify-center pointer-events-none"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isCore ? 15 : 10,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: node.delay, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div 
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: isCore ? 44 : 32,
          height: isCore ? 44 : 32,
          background: isCore ? "rgba(129, 140, 248, 0.15)" : "rgba(255, 255, 255, 0.04)",
          border: `1px solid ${isCore ? "rgba(129, 140, 248, 0.4)" : "rgba(255, 255, 255, 0.1)"}`,
          backdropFilter: "blur(8px)",
          boxShadow: `0 4px 12px rgba(0,0,0,0.2), inset 0 0 ${isCore ? '20px' : '10px'} ${node.color}20`
        }}
      >
        {/* Active Ping */}
        <motion.div
          className="absolute inset-[2px] rounded-full"
          style={{ border: `1px solid ${node.color}60` }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0] }}
          transition={{
            delay: node.delay + 0.5,
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        
        {/* Core specific animated dot */}
        <div className="w-[8px] h-[8px] rounded-full" style={{ background: node.color }} />
      </div>

      {/* Label placed below */}
      <div className="absolute top-[120%] whitespace-nowrap text-center">
        <span className="text-[9px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>
          {node.label}
        </span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   MAIN DASHBOARD COMPONENT
   ═══════════════════════════════════════ */
export default function IaasDashboard() {
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState("init"); // init, build, live, scaling, final

  useEffect(() => {
    const timer = setInterval(() => {
      setCycle((prev) => prev + 1);
      setPhase("init");
    }, CYCLE_DURATION);

    /* Local phase tracking for conditional renders inside loop */
    const t1 = setTimeout(() => setPhase("build"), 2000);
    const t2 = setTimeout(() => setPhase("live"), 4000);
    const t3 = setTimeout(() => setPhase("scaling"), 6000);
    const t4 = setTimeout(() => setPhase("final"), 8000);

    return () => {
      clearInterval(timer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [cycle]);

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden select-none"
      style={{
        background: "linear-gradient(140deg, #090e17 0%, #0c1322 50%, #060912 100%)",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)"
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`iaas-cycle-${cycle}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* ── Background Grid & Blur ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              top: "20%", left: "40%", width: "40%", height: "60%",
              background: "radial-gradient(ellipse, rgba(56,189,248,0.05) 0%, transparent 60%)",
            }}
          />

          {/* ── Center Infrastructure Map (0s–2s Init) ── */}
          {BASE_CONNECTIONS.map((c, i) => (
            <ConnectionLine
              key={`base-conn-${i}`}
              fromId={c.from}
              toId={c.to}
              delay={1.5 + i * 0.2}
              nodes={BASE_NODES}
              cycle={cycle}
            />
          ))}

          {BASE_NODES.map((node) => (
            <InfraNode key={node.id} node={node} cycle={cycle} />
          ))}

          {/* ── Auto-Scaling Nodes & Lines (Spawn at 6s) ── */}
          <AnimatePresence>
            {(phase === "scaling" || phase === "final") && (
              <>
                {SCALING_CONNECTIONS.map((c, i) => (
                  <ConnectionLine
                    key={`scale-conn-${i}`}
                    fromId={c.from}
                    toId={c.to}
                    delay={0} // local delay since component mounts at 6s
                    nodes={[...BASE_NODES, ...SCALING_NODES]}
                    cycle={cycle}
                  />
                ))}
                {SCALING_NODES.map((node) => (
                  <InfraNode key={node.id} node={{ ...node, delay: 0.2 }} cycle={cycle} isScaling />
                ))}
              </>
            )}
          </AnimatePresence>


          {/* ── Overlay Cards (2s–4s Build) ── */}
          {/* 1. CPU / RAM Monitoring (Top Left) */}
          <motion.div
            className="absolute left-2 sm:left-5 top-2 sm:top-5 rounded-lg sm:rounded-xl border p-2 sm:p-3.5 backdrop-blur-md"
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              borderColor: "rgba(255,255,255,0.06)",
              width: "clamp(120px, 35vw, 160px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Compute Load</span>
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            <div className="flex flex-col gap-2.5">
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-slate-300">CPU</span>
                  <span className="text-cyan-400 font-mono"><MetricCounter value={68} delay={4.0} />%</span>
                </div>
                <div className="w-full h-[3px] bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-400"
                    initial={{ width: "0%" }}
                    animate={{ width: phase === "scaling" || phase === "final" ? "42%" : "68%" }}
                    transition={{ delay: 4.1, duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-slate-300">RAM</span>
                  <span className="text-violet-400 font-mono"><MetricCounter value={14.2} isDecimal delay={4.2} /> TB</span>
                </div>
                <div className="w-full h-[3px] bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-violet-400"
                    initial={{ width: "0%" }}
                    animate={{ width: "84%" }}
                    transition={{ delay: 4.3, duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Live Traffic Chart (Bottom Left) */}
          <motion.div
            className="absolute left-2 sm:left-5 bottom-2 sm:bottom-5 rounded-lg sm:rounded-xl border p-2 sm:p-3.5 backdrop-blur-md"
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              borderColor: "rgba(255,255,255,0.06)",
              width: "clamp(140px, 40vw, 200px)"
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Live Traffic</div>
            <div className="text-[18px] text-white font-mono font-medium tracking-tight mb-2">
              <MetricCounter value={1.2} isDecimal delay={4.5} />M <span className="text-[10px] text-slate-500">req/min</span>
            </div>
            
            {/* Animated Bar Chart representing traffic */}
            <div className="flex items-end gap-[3px] h-[24px]">
              {[0.4, 0.3, 0.5, 0.4, 0.6, 0.7, 0.5, 0.8, 1.0, 0.9, 0.8, 0.6, 0.7, 0.5, 0.4].map((h, i) => (
                <motion.div
                  key={`bar-${i}`}
                  className="w-full rounded-t-sm"
                  style={{
                    background: i > 6 ? "#38bdf8" : "#334155",
                    opacity: i === 8 ? 1 : 0.6
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${h * 100}%` }}
                  transition={{ delay: 4.5 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                />
              ))}
            </div>
          </motion.div>

          {/* 3. Global Uptime (Top Right) */}
          <motion.div
            className="absolute right-2 sm:right-5 top-2 sm:top-5 rounded-lg sm:rounded-xl border p-2 sm:p-3.5 backdrop-blur-md flex items-center gap-2 sm:gap-4"
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              borderColor: "rgba(255,255,255,0.06)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              transformOrigin: "top right",
              transform: "scale(0.85) sm:scale-1"
            }}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Global Uptime</div>
              <div className="text-[18px] text-emerald-400 font-mono font-medium tracking-tight">
                99.<MetricCounter value={99} delay={4.8} />%
              </div>
            </div>
            {/* Minimal success badge */}
             <div className="w-8 h-8 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
             </div>
          </motion.div>

          {/* ── Event Notifications (Slide in / out dynamically) ── */}
          <div className="absolute right-2 sm:right-5 bottom-2 sm:bottom-5 flex flex-col gap-1.5 sm:gap-2 items-end z-30">
            {NOTIFICATIONS.map((notif, index) => {
              // Determine if it should be visible based on current time into the loop
              // In a real interval we'd track precise ms, but we can fake it using CSS animation delays
              return (
                <motion.div
                  key={`notif-${index}-${cycle}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 border backdrop-blur-xl"
                  style={{
                    background: "rgba(15, 23, 42, 0.85)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: [0, 1, 1, 0], x: [20, 0, 0, 10] }}
                  transition={{
                    duration: notif.duration,
                    delay: notif.delay,
                    times: [0, 0.1, 0.9, 1], // quick in, hold, quick out
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: notif.color, boxShadow: `0 0 8px ${notif.color}` }} />
                  <span className="text-[10px] font-semibold tracking-wide text-slate-200">
                    {notif.text}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* ── Subtitle Badge (Top Center) ── */}
          <motion.div
            className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
             <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Control Center</span>
          </motion.div>

          {/* ── Final composition zoom & light sweep (8s–10s) ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-0"
            animate={{ scale: phase === "final" ? 0.98 : 1 }}
            transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="absolute inset-0 pointer-events-none z-50"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)",
              width: "50%",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: phase === "final" ? "300%" : "-100%" }}
            transition={{ duration: 1.5, ease: "easeIn" }}
          />

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
