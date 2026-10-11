import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

export default function LandingPage({ onStartChat }) {
  const [inputValue, setInputValue] = useState('');
  const [activeMode, setActiveMode] = useState('Reasoning');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const quickPrompts = [
    { label: 'Transformer Attention Mechanisms', query: 'Explain the mathematics of multi-head self-attention in transformers with examples.' },
    { label: 'Python Algorithm Optimization', query: 'Write a high-performance Python algorithm for Dijkstra shortest path with heap optimization.' },
    { label: 'Autonomous Agent Workflows', query: 'Explain how autonomous multi-agent cooperative systems function in software development.' },
    { label: 'Distributed Systems & Consensus', query: 'Explain distributed consensus algorithms like Raft and Paxos in simple terms.' },
  ];

  const modes = [
    { id: 'Reasoning', label: 'Reasoning' },
    { id: 'Code', label: 'Code' },
    { id: 'Creative', label: 'Creative' },
    { id: 'Analysis', label: 'Analysis' },
  ];

  const handleSubmit = (customMessage) => {
    const message = (typeof customMessage === 'string' ? customMessage : inputValue).trim() || "What can you help me with today?";
    onStartChat(message);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      className="relative z-10 flex flex-col min-h-screen justify-between py-3 px-4 sm:px-6 md:px-10 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Institutional Top Header Bar */}
      <motion.header
        className="w-full rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4"
        style={{
          background: 'rgba(10, 14, 22, 0.78)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        {/* Left: College Logo + Institutional Details */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* ZCOER Crest - High-contrast clean white container */}
          <div className="h-14 w-12 sm:h-16 sm:w-14 bg-white rounded-xl p-1 shadow-lg flex items-center justify-center flex-shrink-0 border-2 border-white/90">
            <img
              src="/logo_zcoer.png"
              alt="Zeal College of Engineering and Research, Pune"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Institutional Typography */}
          <div className="flex flex-col text-left">
            <span className="text-[11px] sm:text-xs font-bold text-amber-300 tracking-wider uppercase drop-shadow">
              Zeal Education Society's
            </span>
            <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-white tracking-wide leading-tight drop-shadow-md">
              ZEAL COLLEGE OF ENGINEERING AND RESEARCH
            </h2>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-[11px]">
              <span className="text-white/80">Narhe, Pune – 411041</span>
              <span className="text-white/40">•</span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px]">
                NAAC "A+" Grade
              </span>
              <span className="text-white/40">•</span>
              <span className="text-cyan-300 font-semibold text-[11px]">
                Dept. of Artificial Intelligence & Data Science Engineering
              </span>
            </div>
          </div>
        </div>

        {/* Right: 25th Anniversary Medal + Start Chat CTA */}
        <div className="flex items-center gap-3.5 flex-shrink-0">
          {/* 25th Anniversary Emblem - High-contrast clean container */}
          <div
            className="h-14 w-12 sm:h-16 sm:w-14 bg-white/95 rounded-xl p-1 shadow-lg flex items-center justify-center flex-shrink-0 border-2 border-amber-300/60"
            title="Celebrating 25th Anniversary"
          >
            <img
              src="/logo_25th.png"
              alt="Celebrating 25th Anniversary"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Launch Chat Button */}
          <button
            onClick={() => handleSubmit()}
            className="btn-pill-blue px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase cursor-pointer flex items-center gap-1.5 shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <span>Start Chat</span>
            <span>→</span>
          </button>
        </div>
      </motion.header>

      {/* Clean, Focused Center Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto py-4 max-w-4xl mx-auto w-full">
        {/* Bold Clean Title: ZEAL AI */}
        <motion.div
          className="mb-5 text-center"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-wider uppercase text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
            style={{ letterSpacing: '0.04em' }}
          >
            ZEAL AI
          </h1>
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-cyan-200/90 uppercase mt-1 drop-shadow-md">
            Department of Artificial Intelligence & Data Science Engineering
          </p>
        </motion.div>

        {/* Floating Cyber-Glass Prompter Box */}
        <motion.div
          className="w-full max-w-[720px] rounded-3xl overflow-hidden p-3 shadow-2xl transition-all duration-300"
          style={{
            background: isFocused 
              ? 'rgba(14, 18, 26, 0.92)' 
              : 'rgba(18, 22, 30, 0.82)',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            border: isFocused 
              ? '1px solid rgba(56, 189, 248, 0.65)' 
              : '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: isFocused
              ? '0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 30px rgba(56, 189, 248, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
              : '0 25px 60px -12px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top Mode Selector Tabs */}
          <div className="flex items-center gap-1.5 px-3 pt-1 pb-2 border-b border-white/8">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeMode === mode.id
                    ? 'bg-sky-500/25 text-sky-200 border border-sky-400/50 shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {mode.label}
              </button>
            ))}
            <span className="ml-auto text-[11px] text-white/40 font-mono hidden sm:inline">
              ↵ Enter to send
            </span>
          </div>

          {/* Main Input Textarea */}
          <div className="px-3 pt-3 pb-2">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask anything. Explore ideas, code algorithms, analyze systems..."
              rows={2}
              autoFocus
              className="w-full bg-transparent text-white text-base md:text-lg font-normal placeholder:text-white/40 resize-none outline-none leading-relaxed font-sans cursor-text"
              style={{ caretColor: '#38bdf8' }}
            />
          </div>

          {/* Bottom Action Tray */}
          <div className="flex items-center justify-between px-3 pt-2 pb-1 border-t border-white/8">
            {/* Status / Model Tag */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-white/70 font-medium">
                Zeal AI • Groq Accelerated Inference
              </span>
            </div>

            {/* Send Button */}
            <button
              onClick={() => handleSubmit()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.35)] cursor-pointer"
              title="Send message"
            >
              <span>Explore</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Quick Suggestion Chips - Distinct Frosted Glass Pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2.5 mt-4 max-w-3xl px-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSubmit(p.query)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-white/90 bg-black/60 hover:bg-white/20 hover:text-white border border-white/20 hover:border-white/40 backdrop-blur-md transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              {p.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Clean Footer with Project Mentorship Credit */}
      <motion.footer
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        {/* Left Side: Subtitle */}
        <div className="text-left">
          <p className="text-[11px] font-mono tracking-widest text-white/50 uppercase">
            | SMARTER CONVERSATIONS
          </p>
          <p className="text-xs text-white/80 font-sans mt-0.5 font-medium">
            Turn your questions into possibilities.
          </p>
        </div>

        {/* Right Side: Dr. Chandan Prasad Project Guidance Badge */}
        <div 
          className="px-4 py-2 rounded-xl flex items-center gap-3 shadow-xl border border-amber-400/40"
          style={{
            background: 'rgba(14, 18, 26, 0.85)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500/25 to-amber-400/15 border border-amber-400/50 flex items-center justify-center text-amber-300 flex-shrink-0 shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
              Project Guidance
            </span>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide block">
              Guided by: Dr. Chandan Prasad
            </span>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}
