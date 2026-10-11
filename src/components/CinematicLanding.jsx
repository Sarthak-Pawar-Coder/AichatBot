import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

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

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const text = query.trim();
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
    { char: '\u00A0', delay: 0.42 }, // non-breaking space
    { char: 'A', delay: 0.48 },
    { char: 'I', delay: 0.54 },
  ];

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none overflow-x-hidden">
      {/* ─── TOP BAR: CORNER LOGOS & BRANDING ─── */}
      <header className="w-full flex items-start justify-between gap-4">
        {/* Top-Left: Official College Branding */}
        <motion.div
          className="flex items-center gap-3 sm:gap-3.5 max-w-xl"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
        >
          {/* Official ZCOER Crest (Background removed, clean transparent emblem) */}
          <div className="w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center flex-shrink-0 drop-shadow-[0_2px_10px_rgba(255,255,255,0.45)]">
            <img
              src="/logo_zcoer_clean.png"
              alt="Zeal College of Engineering and Research, Pune Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
            />
          </div>

          {/* Institutional Typography Hierarchy */}
          <div className="flex flex-col text-left">
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 tracking-widest uppercase drop-shadow leading-tight">
              ZEAL EDUCATION SOCIETY'S
            </span>
            <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase leading-snug drop-shadow-md">
              ZEAL COLLEGE OF ENGINEERING AND RESEARCH
            </h2>
            <span className="text-[10px] sm:text-[11px] text-white/80 font-medium drop-shadow leading-tight">
              Narhe, Pune – 411041
            </span>
            <span className="text-[10px] sm:text-[11px] text-cyan-300 font-semibold drop-shadow leading-tight mt-0.5">
              Department of Artificial Intelligence & Data Science Engineering
            </span>
          </div>
        </motion.div>

        {/* Top-Right: 25th Anniversary Medallion (Background removed) */}
        <motion.div
          className="flex items-center flex-shrink-0"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOutCubic }}
        >
          <div
            className="w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center flex-shrink-0 drop-shadow-[0_2px_10px_rgba(251,191,36,0.45)]"
            title="Celebrating 25th Anniversary (1996 - 2021)"
          >
            <img
              src="/logo_25th_clean.png"
              alt="25th Anniversary Emblem"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
            />
          </div>
        </motion.div>
      </header>

      {/* ─── CENTER: HERO & QUESTION COMPOSER ─── */}
      <main className="my-auto py-8 flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto px-4">
        {/* Stage 0: Iconic ZEAL AI Logo Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOutCubic }}
          className="mb-3.5"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-500/40 via-cyan-400/20 to-amber-400/30 shadow-[0_0_35px_rgba(34,211,238,0.35)] backdrop-blur-xl border border-cyan-400/40 hover:scale-105 transition-transform duration-300">
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
          <span className="text-xs sm:text-sm font-bold text-amber-300/90 tracking-widest uppercase block mb-1.5 drop-shadow">
            ZEAL EDUCATION SOCIETY'S
          </span>
        </motion.div>

        {/* Stage 2: Main Heading with Staged Character Reveal */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] flex justify-center items-center select-none"
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
          <p className="text-xs sm:text-sm md:text-base font-semibold text-cyan-300 tracking-wider uppercase mt-3 drop-shadow-md">
            DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE ENGINEERING
          </p>
        </motion.div>

        {/* Stage 4: Supporting Sentence */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: easeOutCubic }}
        >
          <p className="text-xs sm:text-sm md:text-base text-slate-200/90 font-normal mt-2 max-w-xl mx-auto leading-relaxed drop-shadow">
            Your intelligent companion for coding, learning, research, and innovation.
          </p>
        </motion.div>

        {/* ─── ONLY ONE QUESTION-INPUT BOX ─── */}
        <motion.div
          className="w-full max-w-2xl mt-8 sm:mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.95, ease: easeOutCubic }}
        >
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-2xl p-2.5 sm:p-3 transition-all duration-300 relative shadow-2xl flex items-end gap-2.5"
            style={{
              background: isFocused
                ? 'rgba(14, 18, 26, 0.88)'
                : 'rgba(15, 20, 28, 0.72)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: isFocused
                ? '1px solid rgba(45, 212, 191, 0.65)'
                : '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: isFocused
                ? '0 20px 45px -10px rgba(0, 0, 0, 0.85), 0 0 25px rgba(45, 212, 191, 0.2)'
                : '0 15px 35px -8px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Multiline Textarea Input */}
            <textarea
              ref={textareaRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask anything. Explore ideas, solve problems, and discover possibilities…"
              rows={1}
              autoFocus
              className="flex-1 bg-transparent text-white placeholder:text-slate-300/60 text-sm sm:text-base font-normal resize-none outline-none leading-relaxed px-3 py-1.5 font-sans cursor-text"
              style={{ caretColor: '#2dd4bf', minHeight: '44px', maxHeight: '140px' }}
            />

            {/* Minimal Send Arrow Button */}
            <button
              type="submit"
              disabled={!query.trim()}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 group hover:scale-105 active:scale-95 shadow-md"
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
              <ArrowUp size={16} strokeWidth={2.5} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </form>
        </motion.div>
      </main>

      {/* ─── BOTTOM-RIGHT: FACULTY CREDIT ─── */}
      <footer className="w-full flex justify-end items-center pt-4">
        <motion.div
          className="text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1, ease: easeOutCubic }}
        >
          <span className="text-[11px] sm:text-xs font-medium text-white/80 drop-shadow">
            Guided by:{' '}
            <span className="font-bold text-amber-300 text-shadow">
              Dr. Chandan Prasad
            </span>
          </span>
        </motion.div>
      </footer>
    </div>
  );
}
