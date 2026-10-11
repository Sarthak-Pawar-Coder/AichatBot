import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, GraduationCap, Sparkles, Code2, BrainCircuit, BookOpen } from 'lucide-react';

export default function CinematicLanding({ onStartChat }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.max(46, Math.min(textareaRef.current.scrollHeight, 140)) + 'px';
    }
  }, [query]);

  const handleSubmit = (e, customText) => {
    if (e && e.preventDefault) e.preventDefault();
    const text = (typeof customText === 'string' ? customText : query).trim();
    if (!text) return;
    onStartChat(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Easing curve for cinematic feel
  const easeOutCubic = [0.22, 1, 0.36, 1];

  // Letters of "ZEAL AI" for staged character reveal
  const titleLetters = [
    { char: 'Z', delay: 0.25 },
    { char: 'E', delay: 0.30 },
    { char: 'A', delay: 0.35 },
    { char: 'L', delay: 0.40 },
    { char: '\u00A0', delay: 0.42 },
    { char: 'A', delay: 0.48 },
    { char: 'I', delay: 0.54 },
  ];

  // Quick suggestion chips for instant mobile interaction
  const quickChips = [
    {
      icon: BrainCircuit,
      label: 'Transformer AI Models',
      prompt: 'Explain the core architecture of Transformer models and multi-head attention in simple terms.',
    },
    {
      icon: Code2,
      label: 'Python Algorithm Guide',
      prompt: 'Provide an optimal Python implementation of Dijkstra algorithm with clean comments.',
    },
    {
      icon: Sparkles,
      label: 'AI Project Ideas',
      prompt: 'Suggest 5 innovative final-year AI & Data Science project ideas with technical stacks.',
    },
    {
      icon: BookOpen,
      label: 'Exam & Research Prep',
      prompt: 'Summarize key machine learning concepts including gradient descent, overfitting, and regularization.',
    },
  ];

  return (
    <div className="relative z-10 w-full min-h-[100dvh] flex flex-col justify-between p-3.5 sm:p-6 md:p-8 overflow-x-hidden safe-bottom">
      {/* ─── TOP BAR: CORNER LOGOS & INSTITUTIONAL BRANDING ─── */}
      <header className="w-full">
        <motion.div
          className="w-full flex items-center justify-between gap-2.5 sm:gap-4 p-2.5 sm:p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
        >
          {/* Top-Left: Official College Branding & Crest */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
            {/* Official ZCOER Crest */}
            <div className="w-10 h-12 xs:w-12 xs:h-14 sm:w-14 sm:h-16 flex items-center justify-center flex-shrink-0 drop-shadow-[0_2px_10px_rgba(255,255,255,0.45)]">
              <img
                src="/logo_zcoer_clean.png"
                alt="Zeal College of Engineering and Research, Pune Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
              />
            </div>

            {/* Institutional Typography Hierarchy */}
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold text-amber-300 tracking-wider sm:tracking-widest uppercase drop-shadow leading-tight truncate">
                ZEAL EDUCATION SOCIETY'S
              </span>
              <h2 className="text-[11px] xs:text-xs sm:text-sm md:text-base font-extrabold text-white tracking-tight sm:tracking-wide uppercase leading-tight drop-shadow-md">
                ZEAL COLLEGE OF ENGINEERING AND RESEARCH
              </h2>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-0.5">
                <span className="text-[9px] xs:text-[10px] sm:text-[11px] text-white/80 font-medium drop-shadow leading-tight hidden xs:inline">
                  Narhe, Pune – 411041
                </span>
                <span className="text-white/40 hidden xs:inline">•</span>
                <span className="text-[9px] xs:text-[10px] sm:text-[11px] text-cyan-300 font-semibold drop-shadow leading-tight truncate">
                  Dept. of AI & Data Science
                </span>
              </div>
            </div>
          </div>

          {/* Top-Right: 25th Anniversary Medallion */}
          <div className="flex items-center flex-shrink-0 pl-1">
            <div
              className="w-10 h-12 xs:w-12 xs:h-14 sm:w-14 sm:h-16 flex items-center justify-center flex-shrink-0 drop-shadow-[0_2px_10px_rgba(251,191,36,0.45)]"
              title="Celebrating 25th Anniversary (1996 - 2021)"
            >
              <img
                src="/logo_25th_clean.png"
                alt="25th Anniversary Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        </motion.div>
      </header>

      {/* ─── CENTER: HERO & QUESTION COMPOSER ─── */}
      <main className="my-auto py-6 sm:py-8 flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto px-2 sm:px-4">
        {/* Stage 0: Iconic ZEAL AI Logo Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOutCubic }}
          className="mb-3 sm:mb-4"
        >
          <div className="w-16 h-16 xs:w-18 xs:h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-500/50 via-cyan-400/25 to-amber-400/35 shadow-[0_0_35px_rgba(34,211,238,0.4)] backdrop-blur-xl border border-cyan-400/50 hover:scale-105 transition-transform duration-300">
            <img
              src="/logo_zeal_ai.png"
              alt="Zeal AI Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </motion.div>

        {/* Stage 1: Institutional Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: easeOutCubic }}
        >
          <span className="text-[11px] sm:text-xs md:text-sm font-bold text-amber-300 tracking-widest uppercase block mb-1 drop-shadow">
            ZEAL EDUCATION SOCIETY'S
          </span>
        </motion.div>

        {/* Stage 2: Main Heading with Staged Character Reveal */}
        <h1
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] flex justify-center items-center select-none"
          style={{ letterSpacing: '0.04em' }}
          aria-label="ZEAL AI"
        >
          {titleLetters.map((item, idx) => (
            <motion.span
              key={idx}
              className="inline-block"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: item.delay, ease: easeOutCubic }}
            >
              {item.char}
            </motion.span>
          ))}
        </h1>

        {/* Stage 3: Department Subtitle in Cyan */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: easeOutCubic }}
        >
          <p className="text-[11px] xs:text-xs sm:text-sm md:text-base font-bold text-cyan-300 tracking-wider uppercase mt-2.5 sm:mt-3 drop-shadow-md px-2">
            DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE ENGINEERING
          </p>
        </motion.div>

        {/* Stage 4: Supporting Sentence */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: easeOutCubic }}
        >
          <p className="text-xs sm:text-sm md:text-base text-slate-200/90 font-normal mt-1.5 max-w-xl mx-auto leading-relaxed drop-shadow px-3">
            Your intelligent companion for coding, learning, research, and innovation.
          </p>
        </motion.div>

        {/* ─── QUESTION-INPUT BOX (TEXT BOX) ─── */}
        <motion.div
          className="w-full max-w-2xl mt-6 sm:mt-8 px-1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.95, ease: easeOutCubic }}
        >
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-full rounded-2xl p-2 sm:p-2.5 transition-all duration-300 relative shadow-2xl flex items-end gap-2"
            style={{
              background: isFocused
                ? 'rgba(12, 16, 26, 0.92)'
                : 'rgba(14, 19, 28, 0.78)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: isFocused
                ? '1px solid rgba(45, 212, 191, 0.75)'
                : '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: isFocused
                ? '0 20px 45px -10px rgba(0, 0, 0, 0.9), 0 0 28px rgba(45, 212, 191, 0.25)'
                : '0 15px 35px -8px rgba(0, 0, 0, 0.65)',
            }}
          >
            {/* Multiline Textarea Input - text-base avoids iOS zoom */}
            <textarea
              ref={textareaRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask anything on AI, coding, research, or academics…"
              rows={1}
              autoFocus
              className="flex-1 bg-transparent text-white placeholder:text-slate-300/60 text-base font-normal resize-none outline-none leading-relaxed px-3 py-2 font-sans cursor-text"
              style={{ caretColor: '#2dd4bf', minHeight: '44px', maxHeight: '140px' }}
            />

            {/* Touch-Friendly Send Arrow Button */}
            <button
              type="submit"
              disabled={!query.trim()}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 group hover:scale-105 active:scale-95 shadow-md"
              style={{
                background: query.trim()
                  ? 'linear-gradient(135deg, #2dd4bf, #06b6d4)'
                  : 'rgba(255, 255, 255, 0.08)',
                color: query.trim() ? '#021319' : 'rgba(255, 255, 255, 0.4)',
                boxShadow: query.trim()
                  ? '0 0 16px rgba(45, 212, 191, 0.5)'
                  : 'none',
              }}
              title="Submit query"
            >
              <ArrowUp size={18} strokeWidth={2.5} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </form>

          {/* Quick Suggestion Chips for instant 1-tap engagement */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-3 overflow-x-auto no-scrollbar pb-1 px-0.5 justify-start sm:justify-center">
            {quickChips.map((chip, idx) => {
              const ChipIcon = chip.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSubmit(null, chip.prompt)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium text-slate-300 bg-black/50 hover:bg-cyan-500/15 hover:text-cyan-200 hover:border-cyan-400/40 border border-white/10 backdrop-blur-md transition-all cursor-pointer shadow-sm flex-shrink-0 active:scale-95"
                >
                  <ChipIcon size={12} className="text-cyan-400" />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </main>

      {/* ─── BOTTOM: ESTEEMED FACULTY GUIDANCE SHOWCASE ─── */}
      <footer className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 sm:pt-4">
        {/* Left: Department & Accreditation Notice */}
        <div className="text-center sm:text-left text-[10px] sm:text-[11px] text-white/50">
          <span>Zeal College of Engineering & Research • NAAC "A+" Grade</span>
        </div>

        {/* Right / Center on mobile: OFFICIAL DR. CHANDAN PRASAD GUIDANCE BADGE */}
        <motion.div
          className="mentorship-card rounded-2xl px-4 py-2 sm:px-5 sm:py-2.5 flex items-center gap-3 cursor-default"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease: easeOutCubic }}
          title="Project academically guided by Dr. Chandan Prasad, Faculty Dept. of AI & DS"
        >
          {/* Glowing Faculty Mentor Icon */}
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)] flex-shrink-0">
            <GraduationCap size={18} />
          </div>

          {/* Distinguished Credentials */}
          <div className="text-left flex flex-col">
            <span className="text-[9px] sm:text-[10px] font-bold text-amber-300/90 tracking-widest uppercase leading-tight">
              Guided by
            </span>
            <span className="text-xs sm:text-sm font-extrabold bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent drop-shadow leading-tight">
              Dr. Chandan Prasad
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-300/80 font-medium leading-tight">
              Department of AI & Data Science Engineering
            </span>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
