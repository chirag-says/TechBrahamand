import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Wallet, Clock, CheckCircle2, Circle, AlertCircle, RotateCcw, Sparkles, RefreshCw, Zap } from "lucide-react";

const DIVISION_LABEL = {
  brahma: "Brahma — Creator",
  vishnu: "Vishnu — Preserver",
  mahesh: "Mahesh — Transformer",
};

const DIVISION_ICON = {
  brahma: Sparkles,
  vishnu: RefreshCw,
  mahesh: Zap,
};

// Maps common tech names (lowercase) to devicon CDN slugs.
// Pattern: https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{slug}/{slug}-original.svg
const DEVICON_MAP = {
  react:       'react',
  'next.js':   'nextjs',
  nextjs:      'nextjs',
  'node.js':   'nodejs',
  nodejs:      'nodejs',
  node:        'nodejs',
  python:      'python',
  django:      'django',
  fastapi:     'fastapi',
  postgresql:  'postgresql',
  postgres:    'postgresql',
  mongodb:     'mongodb',
  mongo:       'mongodb',
  mysql:       'mysql',
  redis:       'redis',
  docker:      'docker',
  kubernetes:  'kubernetes',
  aws:         'amazonwebservices',
  gcp:         'googlecloud',
  azure:       'azure',
  typescript:  'typescript',
  javascript:  'javascript',
  flutter:     'flutter',
  dart:        'dart',
  graphql:     'graphql',
  tailwind:    'tailwindcss',
  'tailwind css': 'tailwindcss',
  firebase:    'firebase',
  supabase:    'supabase',
  vercel:      'vercel',
  nginx:       'nginx',
  linux:       'linux',
  git:         'git',
};

function TechIcon({ name }) {
  const slug = DEVICON_MAP[name?.toLowerCase()];
  if (!slug) return null;
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`}
      alt={name}
      className="w-4 h-4 flex-shrink-0"
      onError={(e) => { e.currentTarget.style.display = 'none'; }}
    />
  );
}

const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function ProposalPanel({ state, versions, onUndo }) {
  const hasContent =
    state &&
    (state.recommendedDivision ||
      (state.costBreakdown && state.costBreakdown.length) ||
      (state.techStack && state.techStack.length));

  const revisionCount = versions ? versions.length : 0;

  if (!hasContent) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
          <Layers size={20} className="text-gray-400" />
        </div>
        <p className="text-sm text-gray-400 max-w-[200px] leading-relaxed">
          Tell me about your project and your live proposal will build itself here.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-5 space-y-5 flex flex-col" style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}>
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex-shrink-0">Live Proposal</h2>

      {/* Division badge */}
      <AnimatePresence mode="wait">
        {state.recommendedDivision && (
          <motion.div
            key={state.recommendedDivision}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-black text-white p-4 flex-shrink-0"
          >
            <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Recommended Division</p>
            <p className="text-base font-black flex items-center gap-2">
              {(() => { const Icon = DIVISION_ICON[state.recommendedDivision]; return Icon ? <Icon size={16} className="text-white flex-shrink-0" /> : null; })()}
              {DIVISION_LABEL[state.recommendedDivision]}
            </p>
            {state.divisionReason && (
              <p className="text-[11px] text-gray-300 mt-2 leading-relaxed">{state.divisionReason}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Snapshot row */}
      <div className="grid grid-cols-2 gap-3 flex-shrink-0">
        <div className="rounded-xl border border-gray-200 p-3">
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px] uppercase tracking-wide mb-1">
            <Wallet size={11} /> Total
          </div>
          <p className="text-lg font-bold text-gray-900">
            {state.totalCost ? inr(state.totalCost) : "—"}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 p-3">
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px] uppercase tracking-wide mb-1">
            <Clock size={11} /> Timeline
          </div>
          <p className="text-base font-bold text-gray-900 truncate">{state.timeline || "—"}</p>
        </div>
      </div>

      {/* Business context */}
      {(state.businessGoal || state.industry || state.targetAudience) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-gray-100 bg-gray-50 p-3 space-y-1.5 flex-shrink-0"
        >
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Context</p>
          {state.businessGoal && (
            <div>
              <span className="text-[10px] text-gray-400">Goal · </span>
              <span className="text-xs text-gray-700">{state.businessGoal}</span>
            </div>
          )}
          {state.industry && (
            <div>
              <span className="text-[10px] text-gray-400">Industry · </span>
              <span className="text-xs text-gray-700">{state.industry}</span>
            </div>
          )}
          {state.targetAudience && (
            <div>
              <span className="text-[10px] text-gray-400">Audience · </span>
              <span className="text-xs text-gray-700">{state.targetAudience}</span>
            </div>
          )}
          {state.competitor && (
            <div>
              <span className="text-[10px] text-gray-400">Competitor · </span>
              <span className="text-xs text-gray-700">{state.competitor}</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Features */}
      {state.features?.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-shrink-0">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Features</p>
          <ul className="space-y-1.5">
            {state.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                {f.included ? (
                  <CheckCircle2 size={14} className="text-green-600 flex-shrink-0" />
                ) : (
                  <Circle size={14} className="text-gray-300 flex-shrink-0" />
                )}
                <span className={f.included ? "" : "line-through text-gray-400"}>{f.name}</span>
                {f.cost > 0 && (
                  <span className="ml-auto text-[10px] text-gray-400 font-medium">{inr(f.cost)}</span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Tech stack */}
      {state.techStack?.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-shrink-0">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Layers size={11} /> Tech Stack
          </p>
          <ul className="space-y-2">
            {state.techStack.map((t, i) => (
              <li key={i} className="rounded-xl border border-gray-100 p-2.5 bg-white">
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-400 text-[11px] uppercase tracking-wide">{t.layer}</span>
                  <span className="font-semibold text-gray-900 text-[13px] flex items-center gap-1.5">
                    <TechIcon name={t.choice} />
                    {t.choice}
                  </span>
                </div>
                {t.reason && (
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{t.reason}</p>
                )}
                {t.alternatives?.length > 0 && (
                  <p className="text-[10px] text-gray-300 mt-0.5">
                    Alt: {t.alternatives.join(", ")}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Cost breakdown */}
      {state.costBreakdown?.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-shrink-0">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Cost Breakdown</p>
          <ul className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white overflow-hidden">
            {state.costBreakdown.map((c, i) => (
              <li key={i} className="px-3 py-2.5">
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-gray-800 text-[12px]">{c.item}</span>
                  <span className="font-semibold text-gray-900 text-[12px] ml-2 flex-shrink-0">{inr(c.cost)}</span>
                </div>
                {/* Always render reason — fallback if model omits it */}
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {c.reason || <span className="italic text-gray-300">No reason provided</span>}
                </p>
              </li>
            ))}
          </ul>
          {/* Frontend-verified total — only show when > 0 (recomputeTotal already ran in updateProjectState) */}
          {state.totalCost > 0 && (
            <div className="flex justify-between mt-2 pt-2 border-t border-gray-300 text-sm font-bold px-1">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">{inr(state.totalCost)}</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Assumptions */}
      {state.assumptions?.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-shrink-0">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Assumptions</p>
          <ul className="space-y-1">
            {state.assumptions.map((a, i) => (
              <li key={i} className="text-[11px] text-gray-500 flex items-start gap-1.5">
                <span className="text-gray-300 mt-0.5">·</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Risks */}
      {state.risks?.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-shrink-0">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <AlertCircle size={11} /> Risks
          </p>
          <ul className="space-y-1">
            {state.risks.map((r, i) => (
              <li key={i} className="text-[11px] text-gray-500 flex items-start gap-1.5">
                <span className="text-gray-300 mt-0.5">·</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Revisions footer + Undo */}
      <div className="flex-shrink-0 mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
        <p className="text-[10px] text-gray-300">
          Revisions: {revisionCount}
        </p>
        {onUndo && (
          <button
            onClick={onUndo}
            disabled={revisionCount < 2}
            title={revisionCount < 2 ? "Nothing to undo yet" : "Undo last change"}
            className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-2 py-1 rounded-lg hover:bg-gray-100 disabled:hover:bg-transparent"
          >
            <RotateCcw size={11} />
            Undo
          </button>
        )}
      </div>
    </div>
  );
}
