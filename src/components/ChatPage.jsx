import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Send,
  Square,
  Bot,
  Zap,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  MessageSquare,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';
import MessageBubble from './MessageBubble';

export default function ChatPage({
  messages,
  isStreaming,
  onSendMessage,
  onStopStreaming,
  onNewChat,
  onBackToDashboard
}) {
  const [inputValue, setInputValue] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [inputValue]);

  const handleSubmit = (customText) => {
    const text = (typeof customText === 'string' ? customText : inputValue).trim();
    if (!text || isStreaming) return;
    onSendMessage(text);
    setInputValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const followUpSuggestions = [
    { label: 'Elaborate Further', prompt: 'Could you elaborate on that in deeper technical detail?' },
    { label: 'Code Implementation', prompt: 'Can you provide a robust, production-grade code implementation with comments?' },
    { label: 'Key Summary', prompt: 'Summarize the core takeaways in structured bullet points.' },
    { label: 'Edge Cases & Tradeoffs', prompt: 'What are the main edge cases, performance tradeoffs, and architectural pitfalls?' },
  ];

  return (
    <motion.div
      className="relative z-10 flex h-[100dvh] w-full overflow-hidden select-text"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ─── MOBILE DRAWER OVERLAY ─── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 w-[285px] max-w-[85vw] bg-[rgba(10,14,22,0.96)] border-r border-white/10 z-50 flex flex-col md:hidden shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              {/* Mobile Drawer Header */}
              <div className="p-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-11 flex items-center justify-center flex-shrink-0 drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]">
                    <img src="/logo_zcoer_clean.png" alt="ZCOER Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white tracking-wide">ZCOER Pune</span>
                    <span className="text-[10px] text-cyan-300 font-medium">Dept. of AI & DS</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="p-3 space-y-2">
                {onBackToDashboard && (
                  <button
                    onClick={() => {
                      setMobileSidebarOpen(false);
                      onBackToDashboard();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase text-cyan-200 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Home</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    onNewChat();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <Plus size={14} />
                  <span>New Consultation</span>
                </button>
              </div>

              {/* Consultation List */}
              <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1">
                <div className="px-3 py-2.5 rounded-xl bg-teal-500/15 border border-teal-400/30 flex items-center gap-2.5">
                  <MessageSquare size={14} className="text-teal-300" />
                  <p className="text-xs truncate text-white/90 font-medium">
                    {messages.length > 0 ? messages[0].content.slice(0, 30) + '...' : 'Active Consultation'}
                  </p>
                </div>
              </div>

              {/* Mobile Drawer Mentorship Seal */}
              <div className="p-3.5 border-t border-white/10 bg-black/60 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-400/35 flex items-center justify-center text-amber-300 flex-shrink-0">
                  <GraduationCap size={16} />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[9px] uppercase font-bold text-amber-300 tracking-wider">
                    Project Guidance
                  </p>
                  <p className="text-xs font-bold text-white tracking-wide truncate">
                    Dr. Chandan Prasad
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    Dept. of AI & DS
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ─── DESKTOP SIDEBAR ─── */}
      <motion.aside
        className="hidden md:flex flex-col h-full z-20"
        style={{
          width: sidebarOpen ? '290px' : '0px',
          minWidth: sidebarOpen ? '290px' : '0px',
          background: 'rgba(10, 14, 22, 0.88)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          transition: 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1), min-width 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          overflow: 'hidden',
        }}
      >
        {/* Sidebar Header with Institutional Crest */}
        <div className="p-4 flex items-center justify-between border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]">
              <img src="/logo_zcoer_clean.png" alt="ZCOER Logo" className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white tracking-wide">ZCOER Pune</span>
              <span className="text-[10px] text-cyan-300 font-medium truncate max-w-[170px]">Dept. of AI & DS</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
            title="Collapse Sidebar"
          >
            <PanelLeftClose size={16} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="p-3 space-y-2">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase text-cyan-200 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
          )}

          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase text-white bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
          >
            <Plus size={14} />
            <span>New Consultation</span>
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1">
          <div className="px-3 py-2.5 rounded-xl bg-teal-500/15 border border-teal-400/30 flex items-center gap-2.5">
            <MessageSquare size={14} className="text-teal-300" />
            <p className="text-xs truncate text-white/90 font-medium">
              {messages.length > 0 ? messages[0].content.slice(0, 30) + '...' : 'Active Consultation'}
            </p>
          </div>
        </div>

        {/* Sidebar Footer with Mentorship Seal */}
        <div className="p-3.5 border-t border-white/8 flex items-center gap-3 bg-black/40">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 flex-shrink-0">
            <GraduationCap size={16} />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
              Project Mentorship
            </p>
            <p className="text-xs font-bold text-white tracking-wide">
              Dr. Chandan Prasad
            </p>
            <p className="text-[10px] text-slate-400">
              Dept. of AI & DS
            </p>
          </div>
        </div>
      </motion.aside>

      {/* ─── MAIN CHAT INTERFACE ─── */}
      <div className="flex-1 flex flex-col h-full min-w-0 z-10">
        {/* Top Chat Header */}
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-white/10 bg-black/55 backdrop-blur-2xl">
          {/* Mobile Sidebar Hamburger Button */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer md:hidden"
            title="Open Menu"
          >
            <Menu size={18} />
          </button>

          {/* Desktop Sidebar Toggle Button */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer md:block hidden"
              title="Open Sidebar"
            >
              <PanelLeftOpen size={18} />
            </button>
          )}

          {/* Quick Back to Landing (Mobile) */}
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="md:hidden p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
              title="Back to Landing"
            >
              <ArrowLeft size={15} />
            </button>
          )}

          {/* Branding Title */}
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf] animate-pulse flex-shrink-0" />
            <span className="text-sm font-bold text-white tracking-wide">
              Zeal AI
            </span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-xs text-slate-300 font-medium hidden sm:inline truncate max-w-[220px]">
              Dept. of AI & Data Science
            </span>
          </div>

          {/* Faculty Guidance Indicator Pill */}
          <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/25 text-amber-300 text-[11px] font-medium shadow-sm">
            <GraduationCap size={13} className="text-amber-400 flex-shrink-0" />
            <span className="truncate">Guided by Dr. Chandan Prasad</span>
          </div>

          {/* Model Status Pill */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full bg-slate-900/80 text-slate-300 border border-white/10 flex items-center gap-1.5">
              <Zap size={11} className="text-teal-400" />
              <span className="hidden sm:inline">Groq Llama 3.3 (70B)</span>
              <span className="sm:hidden">Groq AI</span>
            </span>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-4 sm:py-6 select-text">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-10 px-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-teal-400 mb-3 shadow-lg">
                <Bot size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                Zeal AI Academic Assistant
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mb-3">
                Inquire on machine learning, coding algorithms, engineering coursework, or research topics.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/25 text-amber-300 text-xs font-medium">
                <GraduationCap size={14} />
                <span>Mentored by Dr. Chandan Prasad</span>
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx === messages.length - 1 ? 0.05 : 0 }}
            >
              <MessageBubble
                message={msg}
                isStreaming={isStreaming && idx === messages.length - 1 && msg.role === 'assistant'}
              />
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Floating Bottom Chat Dock */}
        <div className="px-3 sm:px-6 md:px-12 lg:px-24 xl:px-32 pb-3 sm:pb-5 pt-1.5 safe-bottom">
          {/* Quick Technical Follow-up Chips - smooth horizontal scroll on mobile */}
          {messages.length > 0 && !isStreaming && (
            <div className="flex items-center gap-1.5 mb-2 overflow-x-auto no-scrollbar pb-1 px-0.5">
              {followUpSuggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSubmit(s.prompt)}
                  className="px-3 py-1 rounded-full text-[11px] font-medium text-slate-300 bg-slate-950/80 hover:bg-white/15 hover:text-white border border-white/10 hover:border-white/25 backdrop-blur-md transition-all cursor-pointer shadow-sm flex-shrink-0 active:scale-95"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Frosted Chat Input Box */}
          <div
            className="rounded-2xl p-2 sm:p-2.5 shadow-2xl transition-all duration-300"
            style={{
              background: isFocused 
                ? 'rgba(10, 14, 24, 0.94)' 
                : 'rgba(12, 18, 28, 0.85)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: isFocused 
                ? '1px solid rgba(45, 212, 191, 0.7)' 
                : '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: isFocused
                ? '0 20px 45px -10px rgba(0, 0, 0, 0.9), 0 0 25px rgba(45, 212, 191, 0.25)'
                : '0 15px 35px -8px rgba(0, 0, 0, 0.7)',
            }}
          >
            <div className="flex items-end gap-2 sm:gap-2.5">
              {/* Dynamic Textarea - text-base prevents mobile iOS auto-zoom */}
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask Zeal AI anything... (Shift+Enter for newline)"
                rows={1}
                className="flex-1 bg-transparent text-white placeholder:text-slate-400/60 text-base resize-none outline-none leading-relaxed py-2 px-3 font-sans cursor-text"
                style={{ caretColor: '#2dd4bf', maxHeight: '160px' }}
              />

              {/* Streaming Stop Button or Send Arrow */}
              {isStreaming ? (
                <button
                  onClick={onStopStreaming}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 transition-all cursor-pointer flex-shrink-0 shadow-lg animate-pulse"
                  title="Stop generating"
                >
                  <Square size={14} fill="currentColor" />
                </button>
              ) : (
                <button
                  onClick={() => handleSubmit()}
                  disabled={!inputValue.trim()}
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 cursor-pointer flex-shrink-0"
                  style={{
                    background: inputValue.trim() 
                      ? 'linear-gradient(135deg, #2dd4bf, #06b6d4)' 
                      : 'rgba(255, 255, 255, 0.08)',
                    color: inputValue.trim() ? '#021319' : 'rgba(255, 255, 255, 0.3)',
                    boxShadow: inputValue.trim() ? '0 0 16px rgba(45, 212, 191, 0.5)' : 'none',
                    transform: inputValue.trim() ? 'scale(1)' : 'scale(0.95)',
                  }}
                  title="Send message"
                >
                  <Send size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Footer Institutional & Mentorship Credit Line */}
          <p className="text-center mt-2 text-[10px] sm:text-[11px] text-slate-400/80 font-sans flex items-center justify-center gap-1.5 flex-wrap px-2">
            <span>Zeal AI</span>
            <span>•</span>
            <span className="text-amber-300 font-semibold">Guided by Dr. Chandan Prasad</span>
            <span>•</span>
            <span>Dept. of AI & DS, ZCOER Pune</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
