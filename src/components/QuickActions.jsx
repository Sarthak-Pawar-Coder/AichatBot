import React from 'react';
import { MessageSquarePlus, Code, FileText, Database, Bot } from 'lucide-react';

export default function QuickActions({
  onNewChat,
  onPythonOptimizer,
  onResearchPaperHelper,
  onDatasetExplorer,
  onAgentBuilder
}) {
  const actions = [
    {
      id: 'new-chat',
      label: 'New Chat',
      icon: MessageSquarePlus,
      color: 'text-cyan-300',
      handler: onNewChat,
    },
    {
      id: 'python',
      label: 'Python Optimizer',
      icon: Code,
      color: 'text-amber-300',
      handler: onPythonOptimizer,
    },
    {
      id: 'research',
      label: 'Research Paper Helper',
      icon: FileText,
      color: 'text-sky-300',
      handler: onResearchPaperHelper,
    },
    {
      id: 'dataset',
      label: 'Dataset Explorer',
      icon: Database,
      color: 'text-teal-300',
      handler: onDatasetExplorer,
    },
    {
      id: 'agent',
      label: 'Agent Builder',
      icon: Bot,
      color: 'text-indigo-300',
      handler: onAgentBuilder,
    },
  ];

  return (
    <div className="w-full my-2.5">
      {/* Section Heading */}
      <div className="flex items-center gap-2 mb-2 px-0.5">
        <span className="text-[11px] font-bold text-cyan-300/90 tracking-wider uppercase">
          Quick Actions
        </span>
      </div>

      {/* Responsive Buttons Row */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.handler}
              className="h-9 px-3.5 rounded-xl text-xs font-semibold text-white/90 bg-slate-900/80 hover:bg-slate-800 hover:text-white border border-white/12 hover:border-cyan-400/40 backdrop-blur-xl transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-98 flex items-center gap-2 whitespace-nowrap"
            >
              <Icon size={14} className={`${act.color} flex-shrink-0`} />
              <span>{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
