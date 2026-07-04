import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════
   CONSTANTS & LAYOUT
   ═══════════════════════════════════════ */

const CYCLE_DURATION = 10000; // 10s loop

/* Module definitions with positions (% based for responsiveness) */
const MODULES = [
  {
    id: "api",
    label: "API Gateway",
    sublabel: "REST · GraphQL · gRPC",
    icon: "⬡",
    x: 14,
    y: 32,
    color: "#38bdf8",
    delay: 2.0,
  },
  {
    id: "db",
    label: "Database Cluster",
    sublabel: "PostgreSQL · Redis",
    icon: "◈",
    x: 14,
    y: 62,
    color: "#818cf8",
    delay: 2.2,
  },
  {
    id: "core",
    label: "Orchestrator",
    sublabel: "Platform Core",
    icon: "◉",
    x: 43,
    y: 47,
    color: "#a78bfa",
    delay: 2.6,
    isCore: true,
  },
  {
    id: "ai",
    label: "AI Engine",
    sublabel: "ML Pipeline · LLM",
    icon: "△",
    x: 72,
    y: 30,
    color: "#c084fc",
    delay: 2.4,
  },
  {
    id: "services",
    label: "User Services",
    sublabel: "Auth · Billing · Notify",
    icon: "□",
    x: 72,
    y: 64,
    color: "#2dd4bf",
    delay: 2.5,
  },
  {
    id: "deploy",
    label: "Deploy Pipeline",
    sublabel: "CI/CD · Containers",
    icon: "▷",
    x: 43,
    y: 82,
    color: "#34d399",
    delay: 2.8,
  },
];

/* Connection definitions (from → to) */
const CONNECTIONS = [
  { from: "api", to: "core", label: "Routing Requests" },
  { from: "db", to: "core", label: "Syncing APIs" },
  { from: "core", to: "ai", label: "AI Processing" },
  { from: "core", to: "services", label: "Scaling Infrastructure" },
  { from: "core", to: "deploy", label: "Deploying Services" },
  { from: "api", to: "ai", label: null },
  { from: "db", to: "services", label: null },
  { from: "deploy", to: "services", label: null },
];

/* Status labels that appear along connections */
const STATUS_LABELS = [
  { text: "Syncing APIs", x: 28, y: 52, delay: 4.2 },
  { text: "Routing Requests", x: 28, y: 36, delay: 4.5 },
  { text: "Deploying Services", x: 56, y: 76, delay: 4.8 },
  { text: "Scaling Infrastructure", x: 58, y: 56, delay: 5.1 },
];

/* Dashboard metrics */
const METRICS = [
  { label: "Uptime", value: "99.99", suffix: "%", delay: 6.2 },
  { label: "Response", value: "42", suffix: "ms", delay: 6.4 },
  { label: "Services", value: "128", suffix: "", delay: 6.6 },
  { label: "AI Optim.", value: "", suffix: "Enabled", delay: 6.8, isText: true },
];

/* Notification chips */
const NOTIFICATIONS = [
  { text: "Deployment Successful", color: "#34d399", delay: 7.0 },
  { text: "AI Routing Optimized", color: "#a78bfa", delay: 7.5 },
  { text: "Traffic Scaled +32%", color: "#38bdf8", delay: 8.0 },
];

/* ═══════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════ */

/* ─── Animated number counter ─── */
function MetricCounter({ value, delay, duration = 1.2 }) {
  const [count, setCount] = useState(0);
  const target = parseFloat(value);

  useEffect(() => {
    if (!value || isNaN(target)) return;
    const timeout = setTimeout(() => {
      let start = 0;
      const step = target / (duration * 60);
      const interval = setInterval(() => {
        start += step;
        if (start >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(
            target < 100 ? parseFloat(start.toFixed(2)) : Math.floor(start)
          );
        }
      }, 1000 / 60);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [value, delay, duration, target]);

  return <span>{target < 100 && target !== Math.floor(target) ? count.toFixed(2) : count}</span>;
}

/* ─── Grid node dots scattered across the panel ─── */
function GridNodes({ cycle }) {
  const nodes = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 24; i++) {
      pts.push({
        x: 8 + Math.random() * 84,
        y: 8 + Math.random() * 84,
        size: 1 + Math.random() * 1.5,
        delay: 0.4 + Math.random() * 1.2,
        opacity: 0.15 + Math.random() * 0.25,
      });
    }
    return pts;
  }, [cycle]);

  return (
    <>
      {nodes.map((n, i) => (
        <motion.div
          key={`${cycle}-node-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: n.size,
            height: n.size,
            background: `rgba(148, 163, 184, ${n.opacity})`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: n.delay,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </>
  );
}

/* ─── Connection line between two modules ─── */
function ConnectionLine({ from, to, delay, index, cycle }) {
  const fromMod = MODULES.find((m) => m.id === from);
  const toMod = MODULES.find((m) => m.id === to);
  if (!fromMod || !toMod) return null;

  /* Offset to center of module card */
  const x1 = fromMod.x + 5;
  const y1 = fromMod.y + 3;
  const x2 = toMod.x + 5;
  const y2 = toMod.y + 3;

  /* Bezier control points for curved lines */
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const cx1 = x1 + (mx - x1) * 0.7;
  const cy1 = y1;
  const cx2 = x2 - (x2 - mx) * 0.7;
  const cy2 = y2;

  const pathD = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  const lineColor = toMod.isCore || fromMod.isCore
    ? "rgba(167, 139, 250, 0.25)"
    : "rgba(148, 163, 184, 0.12)";

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ zIndex: 1 }}
    >
      {/* Static line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={lineColor}
        strokeWidth="0.3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          delay: delay,
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      {/* Data pulse */}
      <motion.circle
        r="0.6"
        fill={toMod.color || fromMod.color}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.8, 0] }}
        transition={{
          delay: delay + 1.5,
          duration: 2.0,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 1.5 + index * 0.3,
        }}
      >
        <animateMotion
          dur={`${2.0 + index * 0.2}s`}
          repeatCount="indefinite"
          begin={`${delay + 1.5}s`}
          path={pathD}
        />
      </motion.circle>
    </svg>
  );
}

/* ─── Module Card ─── */
function ModuleCard({ mod, cycle }) {
  const isCore = mod.isCore;
  const borderColor = isCore
    ? `${mod.color}40`
    : "rgba(255,255,255,0.07)";
  const bgColor = isCore
    ? "rgba(167, 139, 250, 0.06)"
    : "rgba(255,255,255,0.03)";

  return (
    <motion.div
      key={`${cycle}-${mod.id}`}
      className="absolute"
      style={{
        left: `${mod.x}%`,
        top: `${mod.y}%`,
        zIndex: isCore ? 10 : 5,
      }}
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: mod.delay,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="rounded-lg px-2 sm:px-3 py-1.5 sm:py-2.5 border relative"
        style={{
          background: bgColor,
          borderColor: borderColor,
          backdropFilter: "blur(16px)",
          minWidth: isCore ? "clamp(90px, 25vw, 110px)" : "clamp(80px, 22vw, 100px)",
          boxShadow: isCore
            ? `0 0 24px rgba(167, 139, 250, 0.08), 0 4px 16px rgba(0,0,0,0.2)`
            : "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        {/* Core glow ring */}
        {isCore && (
          <motion.div
            className="absolute -inset-[1px] rounded-lg pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${mod.color}15, transparent 50%, ${mod.color}10)`,
            }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1 relative z-10">
          <span
            className="text-[9px] sm:text-[11px]"
            style={{ color: mod.color, opacity: 0.9 }}
          >
            {mod.icon}
          </span>
          <span
            className="text-[8px] sm:text-[10px] font-semibold tracking-wide"
            style={{ color: "rgba(255,255,255,0.88)" }}
          >
            {mod.label}
          </span>
        </div>
        <span
          className="text-[7px] sm:text-[8px] font-medium tracking-wide relative z-10"
          style={{ color: "rgba(148, 163, 184, 0.6)" }}
        >
          {mod.sublabel}
        </span>

        {/* Tiny status indicator */}
        <motion.div
          className="absolute top-2 right-2 w-[4px] h-[4px] rounded-full"
          style={{ background: mod.color }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: mod.delay + 1 }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Status Label (floating) ─── */
function StatusLabel({ text, x, y, delay, cycle }) {
  return (
    <motion.div
      key={`${cycle}-status-${text}`}
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: 8,
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span
        className="text-[7px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full"
        style={{
          color: "rgba(148, 163, 184, 0.7)",
          background: "rgba(15, 23, 42, 0.6)",
          border: "1px solid rgba(148, 163, 184, 0.1)",
          backdropFilter: "blur(8px)",
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}

/* ─── Metrics Panel ─── */
function MetricsPanel({ cycle }) {
  return (
    <motion.div
      key={`${cycle}-metrics`}
      className="absolute rounded-lg border overflow-hidden"
      style={{
        top: "6%",
        right: "4%",
        zIndex: 15,
        background: "rgba(15, 23, 42, 0.75)",
        borderColor: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        width: 150,
      }}
      initial={{ opacity: 0, x: 20, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        delay: 6.0,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Panel header */}
      <div
        className="px-3 py-1.5 border-b flex items-center gap-1.5"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse" />
        <span
          className="text-[8px] font-bold tracking-wider uppercase"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Platform Status
        </span>
      </div>

      <div className="px-3 py-2 space-y-2">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: m.delay,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span
              className="text-[8px] font-medium tracking-wide"
              style={{ color: "rgba(148, 163, 184, 0.6)" }}
            >
              {m.label}
            </span>
            <span
              className="text-[10px] font-bold tracking-tight"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              {m.isText ? (
                m.suffix
              ) : (
                <>
                  <MetricCounter value={m.value} delay={m.delay} />
                  <span className="text-[8px] font-medium ml-0.5" style={{ color: "rgba(148, 163, 184, 0.5)" }}>
                    {m.suffix}
                  </span>
                </>
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Notification Chips ─── */
function NotificationChip({ text, color, delay, index, cycle }) {
  return (
    <motion.div
      key={`${cycle}-notif-${index}`}
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1 border"
      style={{
        background: "rgba(15, 23, 42, 0.8)",
        borderColor: `${color}20`,
        backdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0, x: 30, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="w-[4px] h-[4px] rounded-full shrink-0"
        style={{ background: color }}
      />
      <span
        className="text-[8px] font-semibold tracking-wide"
        style={{ color: `${color}cc` }}
      >
        {text}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════ */
export default function PaasDashboard() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCycle((c) => c + 1),
      CYCLE_DURATION
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden select-none"
      style={{
        background:
          "linear-gradient(145deg, #0a0f1e 0%, #0d1528 40%, #0a1020 100%)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`paas-${cycle}`}
          className="absolute inset-0"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* ─── Phase 1: Grid + Ambient (0s–2s) ─── */}

          {/* Technical grid */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
          />

          {/* Subtle connection grid lines (faint) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.02) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          />

          {/* Ambient glow — central */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "25%",
              left: "25%",
              width: "50%",
              height: "50%",
              background:
                "radial-gradient(ellipse, rgba(167, 139, 250, 0.06) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 2.0 }}
          />

          {/* Ambient glow — left */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "30%",
              left: "5%",
              width: "30%",
              height: "40%",
              background:
                "radial-gradient(ellipse, rgba(56, 189, 248, 0.04) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 2.0 }}
          />

          {/* Grid node dots */}
          <GridNodes cycle={cycle} />

          {/* Thin outer border glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              border: "1px solid rgba(148, 163, 184, 0.06)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.0 }}
          />

          {/* ─── Phase 2: Connection Lines (drawn behind modules) ─── */}
          {CONNECTIONS.map((conn, i) => (
            <ConnectionLine
              key={`${cycle}-conn-${i}`}
              from={conn.from}
              to={conn.to}
              delay={3.8 + i * 0.15}
              index={i}
              cycle={cycle}
            />
          ))}

          {/* ─── Phase 2: Module Cards (2s–4s) ─── */}
          {MODULES.map((mod) => (
            <ModuleCard key={`${cycle}-${mod.id}`} mod={mod} cycle={cycle} />
          ))}

          {/* ─── Phase 3: Status Labels (4s–6s) ─── */}
          {STATUS_LABELS.map((sl) => (
            <StatusLabel
              key={`${cycle}-sl-${sl.text}`}
              text={sl.text}
              x={sl.x}
              y={sl.y}
              delay={sl.delay}
              cycle={cycle}
            />
          ))}

          {/* ─── Phase 4: Metrics Panel (6s–8s) ─── */}
          <MetricsPanel cycle={cycle} />

          {/* ─── Phase 4: Notification Chips (7s–8s) ─── */}
          <motion.div
            className="absolute flex flex-col gap-1.5"
            style={{
              bottom: "6%",
              right: "4%",
              zIndex: 15,
            }}
          >
            {NOTIFICATIONS.map((n, i) => (
              <NotificationChip
                key={`${cycle}-notif-${i}`}
                text={n.text}
                color={n.color}
                delay={n.delay}
                index={i}
                cycle={cycle}
              />
            ))}
          </motion.div>

          {/* ─── Phase 5: Platform title badge (top-left) ─── */}
          <motion.div
            className="absolute flex items-center gap-2"
            style={{
              top: "6%",
              left: "4%",
              zIndex: 15,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          >
            <div
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 border"
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                borderColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="w-[5px] h-[5px] rounded-full" style={{ background: "#a78bfa" }} />
              <span
                className="text-[8px] font-bold tracking-wider uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Platform Ecosystem
              </span>
            </div>
          </motion.div>

          {/* ─── Phase 5: Final zoom + light sweep (8s–10s) ─── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 20 }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1, 0.98] }}
            transition={{
              delay: 8.0,
              duration: 2.0,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.3, 1],
            }}
          />

          {/* Light sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 25,
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 50%, transparent 60%)",
              width: "50%",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "300%" }}
            transition={{
              delay: 8.5,
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
