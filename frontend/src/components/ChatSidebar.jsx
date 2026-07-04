import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const EASE = "cubic-bezier(0.165,0.85,0.45,1)";
const DURATION = 300;
const EXPANDED = "17rem";
const COLLAPSED = "3.3rem";

export default function ChatSidebar({ sessions, activeSessionId, onSelectSession, onNewSession, onDeleteSession, elapsed }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="hidden md:block relative flex-shrink-0 overflow-hidden border-r border-gray-200"
      style={{ width: collapsed ? COLLAPSED : EXPANDED, transition: `width ${DURATION}ms ${EASE}` }}
    >
      {/* Toggle button — anchored to the outer wrapper's right edge, always visible */}
      <button
        type="button"
        aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
        onClick={() => setCollapsed(c => !c)}
        className="absolute right-2 top-3 z-20 grid w-8 h-8 place-items-center rounded-md text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-150"
      >
        <PanelIcon />
      </button>

      {/* Inner panel — always EXPANDED wide so content never wraps during animation */}
      <div className="flex h-full flex-col bg-gray-50" style={{ width: EXPANDED }}>

        {/* ── Header ── */}
        <div className="flex flex-row items-center h-14 px-2 flex-shrink-0 border-b border-gray-200/70">
          <div
            className="flex items-center gap-2 pl-2 overflow-hidden"
            style={{ opacity: collapsed ? 0 : 1, transition: `opacity 150ms ${EASE}`, pointerEvents: collapsed ? 'none' : 'auto' }}
          >
            <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="white">
                <path d="M10 2a8 8 0 1 1 0 16A8 8 0 0 1 10 2m0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M10 5a1 1 0 0 1 1 1v3.586l2.207 2.207a1 1 0 0 1-1.414 1.414l-2.5-2.5A1 1 0 0 1 9 10V6a1 1 0 0 1 1-1" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900 whitespace-nowrap tracking-tight">TechBrahmand AI</span>
          </div>
        </div>

        {/* ── New Chat ── */}
        <div className="px-2 pt-3 flex-shrink-0">
          <button
            onClick={onNewSession}
            title={collapsed ? "New chat" : undefined}
            className="group flex h-9 w-full items-center rounded-lg px-3 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-75 overflow-hidden"
          >
            <div className="flex w-full items-center gap-3">
              <span className="grid w-5 h-5 shrink-0 place-items-center">
                <PlusIcon />
              </span>
              <span
                className="flex-1 truncate text-left font-medium"
                style={{ opacity: collapsed ? 0 : 1, transition: `opacity 150ms ${EASE}` }}
              >
                New chat
              </span>
              <span
                className="text-[11px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ display: collapsed ? 'none' : undefined }}
              >
                ⌘N
              </span>
            </div>
          </button>
        </div>

        {/* ── Sessions list ── */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden px-2 pt-3"
          style={{
            opacity: collapsed ? 0 : 1,
            transition: `opacity 150ms ${EASE}`,
            pointerEvents: collapsed ? 'none' : 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#d1d5db transparent',
          }}
          aria-hidden={collapsed}
        >
          <h3 className="px-2 pb-1.5 text-[10px] font-semibold tracking-widest text-gray-400 uppercase select-none">
            Recents
          </h3>
          <ul className="flex flex-col gap-px">
            {sessions.map(session => (
              <li key={session.id}>
                <button
                  onClick={() => onSelectSession(session.id)}
                  className={`group relative flex h-8 w-full items-center rounded-lg px-3 text-[13px] transition-colors duration-75 text-left ${
                    session.id === activeSessionId
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="flex-1 truncate">{session.title}</span>
                  {sessions.length > 1 && (
                    <span
                      className="absolute right-1 top-1/2 -translate-y-1/2 grid w-6 h-6 place-items-center rounded text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200 hover:text-red-500"
                      onClick={e => { e.stopPropagation(); onDeleteSession(session.id); }}
                    >
                      <Trash2 size={11} />
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Footer ── */}
        <div className="flex-shrink-0 border-t border-gray-200 mt-auto">
          <div className="flex h-[60px] w-full items-center gap-3 px-3 overflow-hidden">
            <div className="grid w-9 h-9 shrink-0 place-items-center rounded-full bg-gray-900 text-[11px] font-bold text-white select-none">
              TB
            </div>
            <div
              className="flex flex-1 flex-col items-start min-w-0"
              style={{ opacity: collapsed ? 0 : 1, transition: `opacity 150ms ${EASE}` }}
            >
              <span className="truncate text-sm font-semibold text-gray-900 whitespace-nowrap">TechBrahmand</span>
              <span className="flex items-center gap-1.5 text-[11px] text-gray-400 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                Session · {elapsed}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-gray-200 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:-rotate-3 group-active:scale-95">
      <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 10 3" />
      </svg>
    </span>
  );
}

function PanelIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
      <path d="M16.5 4A1.5 1.5 0 0 1 18 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5v-9A1.5 1.5 0 0 1 3.5 4zM7 15h9.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7zM3.5 5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H6V5z" />
    </svg>
  );
}
