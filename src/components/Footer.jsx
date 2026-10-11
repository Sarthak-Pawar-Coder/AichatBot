import React from 'react';
import { Award } from 'lucide-react';

export default function Footer({ onOpenFaculty }) {
  return (
    <footer className="w-full mt-4 pt-4 pb-2 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
      {/* Left Column: Slogans */}
      <div className="text-center md:text-left">
        <p className="font-semibold text-teal-300 tracking-wide text-xs">
          Smarter Conversations. Deeper Insights.
        </p>
        <p className="text-slate-400 text-[11px] mt-0.5">
          Built for learners, by learners.
        </p>
      </div>

      {/* Center Column: Copyright */}
      <div className="text-center text-slate-400 font-medium text-[11px]">
        © 2026 Zeal College of Engineering & Research, Pune.
      </div>

      {/* Right Column: Guidance Attribution */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenFaculty}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-amber-300 transition-all cursor-pointer shadow-sm group"
        >
          <Award size={14} className="text-amber-400 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-white text-xs group-hover:text-amber-200">
            Guided by: Dr. Chandan Prasad
          </span>
        </button>
      </div>
    </footer>
  );
}
