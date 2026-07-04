import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Clock, Hash, Activity, ShoppingCart, BarChart3, HeartPulse, ArrowRight, Rocket, PanelRightOpen, X, Wallet } from 'lucide-react';
import ChatSidebar from '../components/ChatSidebar';
import ReactMarkdown from 'react-markdown';
import { SYSTEM_PROMPT } from '../lib/systemPrompt';
import { emptyProjectState, recomputeTotal, pushVersion } from '../lib/projectState';
import ProposalPanel from '../components/ProposalPanel';

/**
 * Robustly extract {reply, projectState} from the model's raw output.
 * The Groq model with response_format: json_object SHOULD return clean JSON,
 * but in practice it sometimes wraps in ```json fences, adds trailing prose,
 * or nests the JSON inside conversational text. This function tries multiple
 * extraction strategies before giving up.
 */
function parseAIResponse(raw) {
  if (!raw || typeof raw !== 'string') return null;

  // Strategy 1: Direct JSON.parse (cleanest case)
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.reply) return parsed;
  } catch { /* continue */ }

  // Strategy 2: Strip markdown code fences (```json ... ``` or ``` ... ```)
  const fenceMatch = raw.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (fenceMatch) {
    try {
      const parsed = JSON.parse(fenceMatch[1].trim());
      if (parsed && typeof parsed === 'object' && parsed.reply) return parsed;
    } catch { /* continue */ }
  }

  // Strategy 3: Find the first top-level { ... } block using brace matching
  const firstBrace = raw.indexOf('{');
  if (firstBrace !== -1) {
    let depth = 0;
    let inString = false;
    let escapeNext = false;
    for (let i = firstBrace; i < raw.length; i++) {
      const ch = raw[i];
      if (escapeNext) { escapeNext = false; continue; }
      if (ch === '\\' && inString) { escapeNext = true; continue; }
      if (ch === '"') { inString = !inString; continue; }
      if (inString) continue;
      if (ch === '{') depth++;
      if (ch === '}') depth--;
      if (depth === 0) {
        try {
          const parsed = JSON.parse(raw.slice(firstBrace, i + 1));
          if (parsed && typeof parsed === 'object' && parsed.reply) return parsed;
        } catch { /* continue */ }
        break;
      }
    }
  }

  return null;
}

const EXAMPLE_PROMPTS = [
  { icon: ShoppingCart, text: 'Build me an e-commerce app for handmade gifts' },
  { icon: BarChart3, text: 'Create a SaaS dashboard with subscription billing' },
  { icon: HeartPulse, text: 'Develop an AI chatbot for healthcare' },
];

const DEFAULT_MSG = {
  id: 1,
  sender: 'ai',
  text: "I am the TechBrahmand AI Architect. Tell me about the digital universe you want to build, and I will generate a real-time budget and roadmap for your idea."
};

const LS_KEY = 'techbrahmand_chat_v1';

// Phase 9: Hydrate sessions from localStorage; fall back to a fresh session if
// the stored data is missing, corrupt, or from an incompatible schema version.
function loadSessions() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    // Ensure every session has the Phase-3+ fields to avoid crashes on old data.
    return parsed.map(s => ({
      ...s,
      projectState: s.projectState ?? emptyProjectState(),
      versions: s.versions ?? [],
    }));
  } catch {
    return null; // Corrupt JSON — start fresh.
  }
}

const Chatbot = () => {
  const navigate = useNavigate();

  const initialSessions = loadSessions() ?? [{ id: Date.now(), title: 'New Chat', messages: [DEFAULT_MSG], createdAt: Date.now(), projectState: emptyProjectState(), versions: [] }];
  const [chatSessions, setChatSessions] = useState(initialSessions);
  const [activeSessionId, setActiveSessionId] = useState(initialSessions[0].id);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionStart] = useState(Date.now());
  const [elapsed, setElapsed] = useState('0:00');
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const messagesEndRef = useRef(null);

  // Phase 9: Persist to localStorage whenever sessions change.
  // Strip rawJSON from messages to avoid storage bloat — it's only needed
  // for the current session's API context, not for hydration.
  useEffect(() => {
    try {
      const stripped = chatSessions.map(s => ({
        ...s,
        messages: s.messages.map(({ rawJSON, ...rest }) => rest),
      }));
      localStorage.setItem(LS_KEY, JSON.stringify(stripped));
    } catch {
      // Storage quota exceeded or unavailable — silently ignore.
    }
  }, [chatSessions]);

  // Get active session
  const activeSession = chatSessions.find(s => s.id === activeSessionId) || chatSessions[0];
  const messages = activeSession.messages;
  const projectState = activeSession.projectState || emptyProjectState();

  // Update messages helper
  const updateMessages = (newMsgs) => {
    setChatSessions(prev => prev.map(s => {
      if (s.id !== activeSessionId) return s;
      const title = newMsgs.find(m => m.sender === 'user')?.text?.slice(0, 30) || s.title;
      return { ...s, messages: newMsgs, title: s.title === 'New Chat' && title !== s.title ? title : s.title };
    }));
  };

  // Update projectState helper — recomputes total and pushes a version snapshot.
  // Guard: recommendedDivision must be one of the three known values or null.
  const VALID_DIVISIONS = new Set(['brahma', 'vishnu', 'mahesh']);
  const updateProjectState = (newState) => {
    setChatSessions(prev => prev.map(s => {
      if (s.id !== activeSessionId) return s;
      const sanitised = {
        ...newState,
        recommendedDivision: VALID_DIVISIONS.has(newState.recommendedDivision)
          ? newState.recommendedDivision
          : null,
      };
      const fixed = recomputeTotal(sanitised);
      return { ...s, projectState: fixed, versions: pushVersion(s.versions, fixed, 'update') };
    }));
  };

  // Undo: restore the second-to-last version snapshot (drop the most recent one).
  const handleUndo = () => {
    setChatSessions(prev => prev.map(s => {
      if (s.id !== activeSessionId) return s;
      const versionList = s.versions || [];
      if (versionList.length < 2) return s; // Nothing to undo to
      const restored = versionList[versionList.length - 2].state;
      const trimmed = versionList.slice(0, -1);
      return { ...s, projectState: restored, versions: trimmed };
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = Math.floor((Date.now() - sessionStart) / 1000);
      const mins = Math.floor(diff / 60);
      const secs = diff % 60;
      setElapsed(`${mins}:${secs.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStart]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handlePromptClick = (promptText) => {
    setInput(promptText);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input.trim() };
    const newMessages = [...messages, userMsg];
    
    updateMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "system", content: `CURRENT_PROJECT_STATE:\n${JSON.stringify(projectState)}` },
        ...newMessages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          // For AI messages, replay the full JSON response so the model sees
          // its own prior structured output (with projectState), not just the
          // stripped reply text. This is critical for proposal continuity.
          content: msg.sender === 'ai' && msg.rawJSON ? msg.rawJSON : msg.text,
        })),
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
        }),
      });

      if (response.status === 429) {
        updateMessages([...newMessages, {
          id: Date.now() + 1,
          sender: 'ai',
          text: "You're going a bit fast — please wait a moment before sending more messages."
        }]);
        return;
      }
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const raw = data.choices?.[0]?.message?.content ?? "";

      // Robustly extract {reply, projectState} from the model output.
      // The model can return: plain JSON, JSON inside ```json fences,
      // or JSON with trailing/leading prose. We try multiple strategies.
      let replyText = raw;
      let newState = projectState;

      const extracted = parseAIResponse(raw);
      if (extracted) {
        replyText = extracted.reply;
        if (extracted.projectState) newState = extracted.projectState;
      } else {
        console.warn('Could not parse projectState JSON, showing raw reply.');
      }

      updateMessages([...newMessages, { id: Date.now() + 1, sender: 'ai', text: replyText || "I'm having trouble processing that right now.", rawJSON: extracted ? raw : undefined }]);
      updateProjectState(newState);
    } catch (error) {
      console.error("Error connecting to AI:", error);
      updateMessages([...newMessages, {
        id: Date.now() + 1,
        sender: 'ai',
        text: "System overload: Error connecting to the TechBrahmand neural network. Please try again."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // === Phase 8: Real proposal handoff — full structured brief from projectState ===
  // Deleted: regex budgetPatterns/budgetValues detection, keyword division detection.
  // Now builds a complete, itemized proposal brief from live projectState.
  const DIVISION_TO_TARGET = { brahma: 'TechCreator', vishnu: 'TechPreserver', mahesh: 'TechTransformer' };

  const handleConnectWithUs = () => {
    const s = projectState;
    const target = DIVISION_TO_TARGET[s.recommendedDivision] || 'Multiple Services';
    const budgetBracket = getBudgetBracket(s.totalCost);
    const totalFormatted = s.totalCost ? `₹${Number(s.totalCost).toLocaleString('en-IN')}` : 'TBD';

    const lines = [];
    lines.push('PROJECT BRIEF — TechBrahmand AI Architect');
    lines.push('------------------------------------------');
    lines.push('');

    if (s.businessGoal) lines.push(`Goal: ${s.businessGoal}`);
    if (s.industry) lines.push(`Industry: ${s.industry}`);
    if (s.targetAudience) lines.push(`Audience: ${s.targetAudience}`);
    if (s.competitor) lines.push(`Competitor: ${s.competitor}`);
    if (s.recommendedDivision) lines.push(`Division: ${s.recommendedDivision.toUpperCase()} — ${s.divisionReason}`);
    if (s.timeline) lines.push(`Timeline: ${s.timeline}`);

    const includedFeatures = s.features?.filter(f => f.included) || [];
    if (includedFeatures.length) {
      lines.push('');
      lines.push(`Features (${includedFeatures.length}):`);
      includedFeatures.forEach(f => lines.push(`  - ${f.name}`));
    }

    if (s.techStack?.length) {
      lines.push('');
      lines.push('Tech Stack:');
      s.techStack.forEach(t => lines.push(`  - ${t.layer}: ${t.choice}`));
    }

    if (s.costBreakdown?.length) {
      lines.push('');
      lines.push('Cost Breakdown:');
      s.costBreakdown.forEach(c =>
        lines.push(`  - ${c.item}: Rs.${Number(c.cost).toLocaleString('en-IN')}`)
      );
      lines.push(`  TOTAL ESTIMATE: ${totalFormatted}`);
    }

    if (s.assumptions?.length) {
      lines.push('');
      lines.push('Assumptions:');
      s.assumptions.forEach(a => lines.push(`  - ${a}`));
    }

    navigate('/contact', {
      state: {
        prefill: {
          target,
          budget: budgetBracket,
          timeline: s.timeline || '',
          description: lines.join('\n'),
        },
      },
    });
  };

  const hasConversation = messages.length > 1;
  // Show CTA only when there's a real proposal (cost breakdown exists) or the bot signals handoff is ready
  const showCTA = projectState.totalCost > 0 || projectState.readyForHandoff ||
    ['quotation', 'refinement', 'handoff'].includes(projectState.stage);

  const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

  // Map a computed total cost to the nearest contact-form budget bracket
  const getBudgetBracket = (total) => {
    if (!total || total <= 0) return 'Not sure yet';
    if (total < 100000) return 'Under ₹1,00,000';
    if (total < 300000) return '₹1,00,000 - ₹3,00,000';
    if (total < 500000) return '₹3,00,000 - ₹5,00,000';
    if (total < 1000000) return '₹5,00,000 - ₹10,00,000';
    return '₹10,00,000+';
  };

  return (
    <div className="w-full h-full flex overflow-hidden bg-white">
      
      {/* ===== LEFT SIDEBAR ===== */}
      <ChatSidebar
        sessions={chatSessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewSession={() => {
          const newSession = { id: Date.now(), title: 'New Chat', messages: [DEFAULT_MSG], createdAt: Date.now(), projectState: emptyProjectState(), versions: [] };
          setChatSessions(prev => [newSession, ...prev]);
          setActiveSessionId(newSession.id);
          setInput('');
        }}
        onDeleteSession={(id) => {
          const remaining = chatSessions.filter(s => s.id !== id);
          setChatSessions(remaining);
          if (id === activeSessionId) setActiveSessionId(remaining[0].id);
        }}
        elapsed={elapsed}
      />

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden pt-[56px] md:pt-[72px]">
        
        {/* Header */}
        <div className="flex-shrink-0 text-center py-3 md:py-5 px-4">
          <h1 className="text-xl md:text-4xl font-black text-gray-900 tracking-tight">
            Project Estimator AI
          </h1>
          <p className="text-gray-400 text-xs md:text-sm mt-0.5 md:mt-1">— Turn Ideas into Scalable Products —</p>
          <p className="text-[10px] md:text-[11px] text-gray-500 font-bold tracking-[0.3em] uppercase mt-0.5 md:mt-1">
            Powered by Techbrahmand
          </p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden flex flex-col mx-auto w-full max-w-4xl px-3 md:px-4">
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto rounded-2xl bg-gray-50 border border-gray-200 px-3 md:px-8 py-4 md:py-6 space-y-4 md:space-y-5" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db transparent' }}>
            
            {messages.map((msg) => (
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                key={msg.id} 
                className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className="flex-shrink-0 mt-1">
                    {msg.sender === 'ai' ? (
                      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
                        <Bot size={18} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={18} className="text-gray-600" />
                      </div>
                    )}
                  </div>

                  {/* Bubble */}
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-gray-900 text-white rounded-tr-sm whitespace-pre-wrap shadow-md' 
                      : 'bg-white border border-gray-200/80 text-gray-800 rounded-tl-sm shadow-sm prose prose-sm max-w-none prose-headings:text-gray-900 prose-strong:text-gray-900 prose-li:text-gray-700 prose-p:text-gray-700'
                  }`}>
                    {msg.sender === 'ai' ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex w-full justify-start">
                <div className="flex gap-3 max-w-[85%] flex-row">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
                      <Bot size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="px-5 py-4 rounded-2xl bg-white border border-gray-200/80 rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                    <span className="text-xs text-gray-400 mr-2 font-medium">Typing</span>
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full animate-bounce" />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* === CTA: Connect With Us === */}
          <AnimatePresence>
            {showCTA && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex-shrink-0 mt-3"
              >
                <button
                  onClick={handleConnectWithUs}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white rounded-2xl px-6 py-4 flex items-center justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-500 active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Rocket size={18} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm tracking-tight">
                        {projectState.readyForHandoff ? 'Your proposal is ready — let\'s connect' : 'Ready to build? Connect with us'}
                      </p>
                      <p className="text-[11px] text-gray-400 group-hover:text-gray-300 transition-colors">
                        {projectState.totalCost > 0
                          ? `Estimated ${inr(projectState.totalCost)} · proposal auto-filled`
                          : 'We\'ll auto-fill your project details from this chat'}
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Example Prompts — only show when no conversation yet */}
          <AnimatePresence>
            {!hasConversation && (
              <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }} className="flex-shrink-0 mt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-3">
                  Example prompts
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {EXAMPLE_PROMPTS.map((prompt, i) => (
                    <button key={i} onClick={() => handlePromptClick(prompt.text)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-left hover:border-gray-900 hover:shadow-md transition-all group cursor-pointer">
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors leading-snug">{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <div className="flex-shrink-0 py-2.5 md:py-4">
            <form onSubmit={handleSend} className="relative flex items-center w-full">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 1000))}
                placeholder="Describe your project vision..."
                maxLength={1000}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl py-3 md:py-4 pl-4 md:pl-5 pr-14 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                disabled={isTyping}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                <Send size={16} className="ml-0.5" />
              </button>
            </form>
            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-1.5 md:mt-2">
              Estimates are indicative. AI may make mistakes.
            </p>
          </div>

        </div>

        {/* Bottom Info Cards — Dynamic */}
        <div className="flex-shrink-0 px-3 md:px-4 pb-3 md:pb-4" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2 md:gap-3">
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-2.5 md:px-4 py-2.5 md:py-3 flex items-center gap-2 md:gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                <Hash size={14} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-wide truncate">Messages</p>
                <p className="text-xs md:text-sm font-bold text-gray-900">{messages.length - 1}</p>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-2.5 md:px-4 py-2.5 md:py-3 flex items-center gap-2 md:gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                <Clock size={14} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-wide truncate">Time</p>
                <p className="text-xs md:text-sm font-bold text-gray-900">{elapsed}</p>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-2.5 md:px-4 py-2.5 md:py-3 flex items-center gap-2 md:gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                <Activity size={14} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-wide truncate">Status</p>
                <p className="text-xs md:text-sm font-bold text-gray-900">{isTyping ? 'Thinking...' : hasConversation ? 'Active' : 'Ready'}</p>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* ===== RIGHT PANEL — DESKTOP ===== */}
      <aside className="hidden lg:flex w-[340px] flex-shrink-0 flex-col border-l border-gray-200 bg-gray-50 pt-[72px]">
        <ProposalPanel state={projectState} versions={activeSession.versions} onUndo={handleUndo} />
      </aside>

      {/* ===== MOBILE PROPOSAL TOGGLE BUTTON ===== */}
      <div className="lg:hidden fixed bottom-24 right-4 z-40">
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => setShowMobilePanel(true)}
          className="flex items-center gap-2 bg-black text-white rounded-2xl px-4 py-3 shadow-xl text-sm font-semibold"
        >
          <PanelRightOpen size={16} />
          {projectState.totalCost > 0 ? (
            <span>{inr(projectState.totalCost)}</span>
          ) : (
            <span>Proposal</span>
          )}
        </motion.button>
      </div>

      {/* ===== MOBILE PROPOSAL DRAWER ===== */}
      <AnimatePresence>
        {showMobilePanel && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowMobilePanel(false)}
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl border-t border-gray-200 shadow-2xl"
              style={{ maxHeight: "80vh" }}
            >
              {/* Drawer handle + close */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2 flex-shrink-0">
                <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
                <p className="text-sm font-bold text-gray-900">Live Proposal</p>
                <button
                  onClick={() => setShowMobilePanel(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={15} className="text-gray-600" />
                </button>
              </div>
              {/* Scrollable content */}
              <div style={{ overflowY: "auto", maxHeight: "calc(80vh - 56px)" }}>
                <ProposalPanel state={projectState} versions={activeSession.versions} onUndo={handleUndo} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
