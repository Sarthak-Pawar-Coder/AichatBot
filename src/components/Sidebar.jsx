import React, { useState } from 'react';
import {
  Home,
  MessageSquare,
  Code2,
  Workflow,
  BookOpen,
  FlaskConical,
  Database,
  Wrench,
  Settings,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  X
} from 'lucide-react';

export default function Sidebar({
  activeNav,
  onSelectNav,
  onOpenFaculty,
  isMobileOpen,
  onCloseMobile
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Ask Zeal AI', icon: MessageSquare },
    { id: 'code', label: 'Code Assistant', icon: Code2 },
    { id: 'agents', label: 'Agent Workflows', icon: Workflow },
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
    { id: 'research', label: 'Research Hub', icon: FlaskConical },
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'tools', label: 'Tools & Utilities', icon: Wrench },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const content = (
    <div
      className="h-full flex flex-col justify-between p-4 rounded-3xl select-none transition-all duration-300"
      style={{
        background: 'rgba(11, 15, 23, 0.88)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75)',
      }}
    >
      {/* Top Section: College Branding & Navigation */}
      <div>
        {/* Official College Branding */}
        <div className="flex items-center justify-between pb-3.5 mb-2.5 border-b border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            {/* Pristine College Logo Container */}
            <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0 shadow-md border border-white/30">
              <img
                src="/logo_zcoer.png"
                alt="ZEAL College Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* College Name & Details */}
            {!isCollapsed && (
              <div className="flex flex-col text-left min-w-0">
                <span className="text-[11px] font-bold text-amber-300 tracking-wider uppercase leading-tight truncate">
                  ZEAL COLLEGE
                </span>
                <span className="text-[11px] font-bold text-white tracking-wider uppercase leading-tight truncate">
                  OF ENGINEERING
                </span>
                <span className="text-[10px] text-slate-400 font-medium truncate">
                  Narhe, Pune
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          </button>

          {/* Mobile Close Button */}
          {isMobileOpen && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 mt-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectNav(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3.5 py-2.5'
                } rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'text-amber-200 bg-amber-500/12 border border-amber-400/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/6 border border-transparent'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  size={16}
                  className={`flex-shrink-0 transition-colors ${
                    isActive ? 'text-amber-300' : 'text-slate-400'
                  }`}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Faculty Profile Card */}
      <div className="pt-3 border-t border-white/10">
        <button
          onClick={() => {
            onOpenFaculty();
            if (onCloseMobile) onCloseMobile();
          }}
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center p-1.5' : 'justify-between p-2.5'
          } rounded-2xl bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/15 transition-all cursor-pointer group`}
          title={isCollapsed ? 'Dr. Chandan Prasad • Faculty AI & DS' : undefined}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Initials Avatar */}
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow">
              CP
            </div>
            {/* Profile Info */}
            {!isCollapsed && (
              <div className="flex flex-col text-left min-w-0">
                <span className="text-xs font-bold text-white tracking-wide truncate group-hover:text-amber-300 transition-colors">
                  Chandan Prasad
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Faculty • AI & DS</span>
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <ChevronRight size={14} className="text-slate-500 group-hover:text-white transition-colors flex-shrink-0" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (250px expanded, 72px collapsed) */}
      <aside
        className={`hidden md:block ${
          isCollapsed ? 'w-[72px]' : 'w-[250px]'
        } h-[calc(100vh-3rem)] sticky top-6 z-20 flex-shrink-0 transition-all duration-300`}
      >
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            onClick={onCloseMobile}
          />
          <div className="relative w-[260px] max-w-[85vw] h-full p-3 z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
