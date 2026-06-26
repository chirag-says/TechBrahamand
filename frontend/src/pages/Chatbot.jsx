import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Plus, MessageSquare, Compass, Clock, Zap, Hash, Activity, ShoppingCart, BarChart3, HeartPulse, Trash2, ArrowRight, Rocket } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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

const Chatbot = () => {
  const navigate = useNavigate();
  const [chatSessions, setChatSessions] = useState([{ id: Date.now(), title: 'New Chat', messages: [DEFAULT_MSG], createdAt: Date.now() }]);
  const [activeSessionId, setActiveSessionId] = useState(chatSessions[0].id);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionStart] = useState(Date.now());
  const [elapsed, setElapsed] = useState('0:00');
  const messagesEndRef = useRef(null);

  // Get active session
  const activeSession = chatSessions.find(s => s.id === activeSessionId) || chatSessions[0];
  const messages = activeSession.messages;

  // Update messages helper
  const updateMessages = (newMsgs) => {
    setChatSessions(prev => prev.map(s => {
      if (s.id !== activeSessionId) return s;
      const title = newMsgs.find(m => m.sender === 'user')?.text?.slice(0, 30) || s.title;
      return { ...s, messages: newMsgs, title: s.title === 'New Chat' && title !== s.title ? title : s.title };
    }));
  };

  // Live session timer
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
        {
          role: "system",
          content: `You are the TechBrahmand AI Architect — a warm, confident, and consultative digital strategist for TechBrahmand, a rising startup based in India.

YOUR PERSONALITY:
- You are NOT a price calculator. You are a trusted advisor who makes clients feel heard, understood, and excited about their idea.
- Speak like a senior consultant who genuinely cares. Be warm, reassuring, and confident — never robotic or transactional.
- Use "we" language: "Here's what we can build together..." not "The cost will be..."

CONVERSATION FLOW (follow this strictly):
1. UNDERSTAND FIRST: When a client describes their idea, respond with genuine enthusiasm. Summarize what you understood in your own words to show you're listening. Ask 1-2 clarifying questions MAX — never bombard them with a list of questions.
2. REFRAME & EDUCATE: If they reference big platforms ("like Myntra", "like Zomato"), gently reframe expectations: "That's a great inspiration! For your stage, we'd focus on the core experience that makes your brand unique — things like [specific features]. The beauty is we can start lean and scale up."
3. RECOMMEND A SOLUTION: Before any pricing, proactively suggest what you'd build and WHY. Structure it as phases if appropriate. Help them see the roadmap, not just a price tag.
4. THEN PRICE (only when context is clear): Break down costs by the three pillars. Keep it conversational, not like an invoice. Briefly explain what each cost covers and why it's worth it.
5. HANDLE PUSHBACK GRACEFULLY: If they say it's expensive, never just lower the price. Instead, suggest phased approaches: "We could start with Phase 1 for ₹X and add the rest once you're generating revenue."

PRICING GUIDELINES (Indian market, startup-friendly):
- Simple static/portfolio website: ₹3,000 – ₹8,000
- Dynamic website with CMS: ₹8,000 – ₹15,000
- E-commerce store: ₹10,000 – ₹25,000
- Custom web application: ₹20,000 – ₹50,000
- Logo & brand identity: ₹2,000 – ₹5,000
- SEO: ₹2,000 – ₹5,000/month
- Maintenance: ₹1,000 – ₹3,000/month
All prices in ₹ (INR). Most projects under ₹25,000. Never quote in lakhs for standard projects.

SERVICE PILLARS (use naturally, don't force):
- Brahma (Creation): Design, development, brand identity
- Vishnu (Protection): Maintenance, security, updates, hosting
- Mahesh (Disruption): SEO, marketing, competitor analysis, growth

KEY RULES:
- Never ask more than 2 questions at a time. If unsure, make a smart recommendation and ask "Does this direction feel right?"
- Never list technical jargon without a simple explanation
- Always end your message with a clear next step or gentle question — never leave the client hanging
- If the client seems unsure or overwhelmed, simplify and guide: "Based on what you've shared, here's what I'd suggest we start with..."
- Format responses with markdown for readability`
        },
        ...newMessages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))
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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const aiResponseText = data.choices?.[0]?.message?.content || "I'm having trouble processing that right now.";
      
      const aiResponse = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: aiResponseText 
      };
      
      updateMessages([...newMessages, aiResponse]);
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

  // === CTA: Extract chat summary and navigate to Contact page ===
  const handleConnectWithUs = () => {
    const userMessages = messages.filter(m => m.sender === 'user').map(m => m.text);
    const aiMessages = messages.filter(m => m.sender === 'ai').map(m => m.text);

    // Build a human-readable summary from the conversation
    const projectIdea = userMessages[0] || '';
    const allUserInput = userMessages.join('\n- ');
    
    // Try to extract budget from AI messages (look for ₹ amounts)
    let detectedBudget = 'Not sure yet';
    const budgetPatterns = [
      /₹5,00,000\+|₹5,00,000/,
      /₹1,00,000\s*[-–]\s*₹5,00,000|₹[1-4],\d{2},\d{3}/,
      /₹50,000\s*[-–]\s*₹1,00,000|₹[5-9]\d,\d{3}/,
      /₹25,000\s*[-–]\s*₹50,000|₹[2-4]\d,\d{3}/,
      /Under ₹25,000|₹[1]?\d,\d{3}/,
    ];
    const budgetValues = [
      '₹5,00,000+',
      '₹1,00,000 - ₹5,00,000',
      '₹50,000 - ₹1,00,000',
      '₹25,000 - ₹50,000',
      'Under ₹25,000',
    ];
    const fullAiText = aiMessages.join(' ');
    for (let i = 0; i < budgetPatterns.length; i++) {
      if (budgetPatterns[i].test(fullAiText)) {
        detectedBudget = budgetValues[i];
        break;
      }
    }

    // Determine which service pillar was discussed
    let detectedTarget = 'Multiple Services';
    const lowerAiText = fullAiText.toLowerCase();
    if (lowerAiText.includes('brahma') && !lowerAiText.includes('vishnu') && !lowerAiText.includes('mahesh')) {
      detectedTarget = 'TechCreator';
    } else if (lowerAiText.includes('vishnu') && !lowerAiText.includes('brahma') && !lowerAiText.includes('mahesh')) {
      detectedTarget = 'TechPreserver';
    } else if (lowerAiText.includes('mahesh') && !lowerAiText.includes('brahma') && !lowerAiText.includes('vishnu')) {
      detectedTarget = 'TechTransformer';
    }

    // Build a clean, professional project brief
    const uniqueRequirements = [...new Set(userMessages)];
    const numberedRequirements = uniqueRequirements.map((msg, i) => `  ${i + 1}. ${msg}`).join('\n');

    const timestamp = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    const summary = [
      `PROJECT BRIEF`,
      `Generated via TechBrahmand AI Estimator on ${timestamp}`,
      ``,
      `Project Overview:`,
      `${projectIdea}`,
      ``,
      `Client Requirements:`,
      numberedRequirements,
      ``,
      `Indicative Budget Range: ${detectedBudget}`,
      ``,
      `Note: This is an auto-generated summary from the AI consultation. Final scope and pricing will be confirmed after a detailed discussion with the TechBrahmand team.`,
    ].join('\n');

    // Navigate to contact page with pre-filled data
    navigate('/contact', {
      state: {
        prefill: {
          target: detectedTarget,
          budget: detectedBudget,
          description: summary,
        }
      }
    });
  };

  const hasConversation = messages.length > 1;
  const showCTA = messages.filter(m => m.sender === 'user').length >= 2; // Show after 2+ user messages

  return (
    <div className="w-full h-full flex overflow-hidden bg-white">
      
      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="hidden md:flex w-[240px] flex-shrink-0 flex-col bg-gray-50 border-r border-gray-200 p-4 pt-10 pb-4 gap-2">
        
        {/* New Project Button */}
        <button onClick={() => {
          const newSession = { id: Date.now(), title: 'New Chat', messages: [DEFAULT_MSG], createdAt: Date.now() };
          setChatSessions(prev => [newSession, ...prev]);
          setActiveSessionId(newSession.id);
          setInput('');
        }}
          className="flex items-center gap-2 bg-black text-white rounded-xl px-4 py-3 font-semibold text-sm hover:bg-gray-800 transition-all active:scale-[0.98] mb-3">
          <Plus size={18} /> New Project
        </button>

        {/* Chat Sessions */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Your Chats</p>
          <div className="flex flex-col gap-1">
            {chatSessions.map((session) => (
              <button key={session.id} onClick={() => setActiveSessionId(session.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all truncate group ${
                  session.id === activeSessionId ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}>
                <MessageSquare size={14} className="flex-shrink-0" />
                <span className="truncate flex-1 text-left">{session.title}</span>
                {chatSessions.length > 1 && (
                  <Trash2 size={12} className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                    session.id === activeSessionId ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-red-500'
                  }`} onClick={(e) => {
                    e.stopPropagation();
                    const remaining = chatSessions.filter(s => s.id !== session.id);
                    setChatSessions(remaining);
                    if (session.id === activeSessionId) setActiveSessionId(remaining[0].id);
                  }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Session Info */}
        <div className="mt-auto border-t border-gray-200/60 pt-3">
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Session active · {elapsed}</span>
          </div>
        </div>
      </aside>

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
                      <p className="font-bold text-sm tracking-tight">Ready to build? Connect with us</p>
                      <p className="text-[11px] text-gray-400 group-hover:text-gray-300 transition-colors">We'll auto-fill your project details from this chat</p>
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
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your project vision..."
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
    </div>
  );
};

export default Chatbot;
