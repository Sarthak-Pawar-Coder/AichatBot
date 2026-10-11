import React from 'react';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';

export default function HeroSection({ onOpenAiStatus, onOpenMobileMenu }) {
  return (
    <div className="w-full relative">
      {/* Top Header Row: Mobile Toggle on Left, Status Area on Right */}
      <div className="flex items-center justify-between w-full mb-3 sm:mb-4">
        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2.5 md:hidden">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-xl bg-slate-900/80 border border-white/10 text-white shadow-md cursor-pointer hover:bg-white/10 transition-all"
            aria-label="Toggle navigation drawer"
          >
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo_zcoer.png" alt="ZCOER" className="w-7 h-7 object-contain bg-white rounded-lg p-0.5" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">ZEAL AI</span>
          </div>
        </div>

        <div className="hidden md:block">
          {/* Spacer */}
        </div>

        {/* Top-Right Status Controls */}
        <div className="flex items-center gap-3 ml-auto">
          {/* 25th Anniversary Medallion */}
          <div
            className="h-10 w-10 bg-white/95 rounded-xl p-1 shadow-md flex items-center justify-center flex-shrink-0 border border-amber-300/60 hover:scale-105 transition-transform cursor-pointer"
            title="Celebrating 25th Anniversary"
          >
            <img
              src="/logo_25th.png"
              alt="25th Anniversary Emblem"
              className="h-full w-full object-contain"
            />
          </div>

          {/* AI Status Badge */}
          <button
            onClick={onOpenAiStatus}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-md group"
            style={{
              background: 'rgba(12, 18, 28, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span className="text-white/90 group-hover:text-white">AI Status</span>
          </button>
        </div>
      </div>

      {/* Main Centered Hero Typography */}
      <motion.div
        className="text-center max-w-2xl mx-auto py-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Subtle Institutional Heading */}
        <span className="text-[11px] font-bold text-amber-300 tracking-widest uppercase block mb-1 drop-shadow">
          ZEAL EDUCATION SOCIETY'S
        </span>

        {/* Bold Prominent Heading: ZEAL AI */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)]"
          style={{ letterSpacing: '0.04em' }}
        >
          ZEAL AI
        </h1>

        {/* Department Subtitle in Cyan */}
        <p className="text-xs sm:text-sm md:text-base font-semibold text-cyan-300 tracking-wide mt-2 drop-shadow-md">
          Department of Artificial Intelligence & Data Science Engineering
        </p>

        {/* Companion Tagline */}
        <p className="text-xs sm:text-sm text-slate-300/90 font-normal mt-1.5 max-w-lg mx-auto leading-relaxed drop-shadow">
          Your intelligent companion for coding, learning, research, and innovation.
        </p>
      </motion.div>
    </div>
  );
}
