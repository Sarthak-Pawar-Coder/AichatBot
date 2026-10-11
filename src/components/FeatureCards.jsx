import React from 'react';
import { Code2, Workflow, BookOpen, FlaskConical, Wrench, ArrowUpRight } from 'lucide-react';

export default function FeatureCards({ onSelectFeature }) {
  const cards = [
    {
      id: 'code',
      title: 'Code Assistant',
      description: 'Write, debug, and optimize code with AI assistance.',
      icon: Code2,
      accentBorder: 'hover:border-blue-400/50 border-white/10',
      badgeBg: 'bg-blue-500/15 text-blue-300 border border-blue-400/25',
      glowShadow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.18)]',
      arrowColor: 'text-blue-400',
    },
    {
      id: 'agents',
      title: 'AI Agent Workflows',
      description: 'Build and automate intelligent agent workflows.',
      icon: Workflow,
      accentBorder: 'hover:border-purple-400/50 border-white/10',
      badgeBg: 'bg-purple-500/15 text-purple-300 border border-purple-400/25',
      glowShadow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.18)]',
      arrowColor: 'text-purple-400',
    },
    {
      id: 'knowledge',
      title: 'Knowledge Base',
      description: 'Access curated resources, notes, and documentation.',
      icon: BookOpen,
      accentBorder: 'hover:border-emerald-400/50 border-white/10',
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/25',
      glowShadow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.18)]',
      arrowColor: 'text-emerald-400',
    },
    {
      id: 'research',
      title: 'Research Hub',
      description: 'Discover papers, paper summaries and insights.',
      icon: FlaskConical,
      accentBorder: 'hover:border-amber-400/50 border-white/10',
      badgeBg: 'bg-amber-500/15 text-amber-300 border border-amber-400/25',
      glowShadow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.18)]',
      arrowColor: 'text-amber-400',
    },
    {
      id: 'tools',
      title: 'Tools & Utilities',
      description: 'Useful utilities, converters and developer tools.',
      icon: Wrench,
      accentBorder: 'hover:border-teal-400/50 border-white/10',
      badgeBg: 'bg-teal-500/15 text-teal-300 border border-teal-400/25',
      glowShadow: 'hover:shadow-[0_0_20px_rgba(20,184,166,0.18)]',
      arrowColor: 'text-teal-400',
    },
  ];

  return (
    <div className="w-full my-2.5">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-2 px-0.5">
        <span className="text-[11px] font-bold text-cyan-300/90 tracking-wider uppercase">
          Explore Zeal AI
        </span>
      </div>

      {/* Responsive Grid with minmax(0, 1fr) preventing horizontal blowout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-3 w-full">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.id}
              onClick={() => onSelectFeature(card.id)}
              className={`min-w-0 h-[120px] sm:h-[128px] p-3.5 sm:p-4 rounded-2xl flex flex-col justify-between text-left transition-all duration-200 cursor-pointer group hover:-translate-y-0.5 ${card.accentBorder} ${card.glowShadow}`}
              style={{
                background: 'rgba(12, 17, 26, 0.85)',
                backdropFilter: 'blur(24px) saturate(160%)',
                WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Header: Icon & Arrow */}
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${card.badgeBg}`}
                >
                  <Icon size={14} />
                </div>
                <ArrowUpRight
                  size={14}
                  className={`${card.arrowColor} transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-80 group-hover:opacity-100 flex-shrink-0`}
                />
              </div>

              {/* Text Info */}
              <div className="min-w-0">
                <h3 className="text-xs sm:text-[13px] font-bold text-white tracking-wide group-hover:text-white truncate leading-snug">
                  {card.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-snug font-normal line-clamp-2 mt-0.5">
                  {card.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
