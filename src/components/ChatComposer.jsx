import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Code2, BarChart2, FlaskConical, BookOpen, Palette } from 'lucide-react';

export default function ChatComposer({ onSubmit, initialPrompt = '' }) {
  const [input, setInput] = useState(initialPrompt);
  const [selectedChip, setSelectedChip] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [initialPrompt]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.max(46, Math.min(textareaRef.current.scrollHeight, 150)) + 'px';
    }
  }, [input]);

  const chips = [
    { id: 'code', label: 'Code', icon: Code2, prefix: 'Write production-grade code for: ' },
    { id: 'analyze', label: 'Analyze', icon: BarChart2, prefix: 'Perform an in-depth technical analysis on: ' },
    { id: 'research', label: 'Research', icon: FlaskConical, prefix: 'Synthesize research literature and academic findings on: ' },
    { id: 'explain', label: 'Explain', icon: BookOpen, prefix: 'Explain from first principles with examples: ' },
    { id: 'design', label: 'Design', icon: Palette, prefix: 'Provide a comprehensive architecture and system design for: ' },
  ];

  const handleChipClick = (chip) => {
    if (selectedChip === chip.id) {
      setSelectedChip(null);
      if (input.startsWith(chip.prefix)) {
        setInput(input.replace(chip.prefix, ''));
      }
    } else {
      setSelectedChip(chip.id);
      if (!input.startsWith(chip.prefix)) {
        setInput(`${chip.prefix}${input}`);
      }
      if (textareaRef.current) textareaRef.current.focus();
    }
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSubmit(text);
    setInput('');
    setSelectedChip(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="w-full rounded-2xl p-3.5 sm:p-4 transition-all duration-200 relative shadow-2xl"
      style={{
        background: isFocused
          ? 'rgba(12, 17, 26, 0.94)'
          : 'rgba(14, 20, 30, 0.88)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        border: isFocused
          ? '1px solid rgba(45, 212, 191, 0.65)'
          : '1px solid rgba(45, 212, 191, 0.25)',
        boxShadow: isFocused
          ? '0 20px 50px -10px rgba(0, 0, 0, 0.85), 0 0 25px rgba(45, 212, 191, 0.2)'
          : '0 15px 40px -10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(45, 212, 191, 0.1)',
      }}
    >
      <div className="flex items-start gap-3">
        {/* Sparkle Icon */}
        <div className="pt-2 pl-0.5 flex-shrink-0 text-amber-400">
          <Sparkles size={18} className="animate-pulse" />
        </div>

        {/* Text Input Container */}
        <div className="flex-1 min-w-0">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask anything. Explore ideas, code algorithms, analyze systems..."
            rows={1}
            className="w-full bg-transparent text-white placeholder:text-slate-400/70 text-sm sm:text-base font-normal resize-none outline-none leading-relaxed py-0.5 font-sans cursor-text"
            style={{ caretColor: '#2dd4bf', minHeight: '46px', maxHeight: '150px' }}
          />

          {/* Action Chips in an Organized Row */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5 pt-2.5 border-t border-white/8">
            {chips.map((chip) => {
              const Icon = chip.icon;
              const isSelected = selectedChip === chip.id;

              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => handleChipClick(chip)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-500/25 text-teal-200 border border-teal-400/50 shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon size={12} className={isSelected ? 'text-teal-300' : 'text-slate-400'} />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Send Button */}
        <div className="pt-1 pr-0.5 flex-shrink-0">
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed group hover:scale-105 active:scale-95 shadow-md"
            style={{
              background: input.trim()
                ? 'linear-gradient(135deg, #2dd4bf, #06b6d4)'
                : 'rgba(255, 255, 255, 0.08)',
              color: input.trim() ? '#021319' : 'rgba(255, 255, 255, 0.4)',
              boxShadow: input.trim()
                ? '0 0 20px rgba(45, 212, 191, 0.45)'
                : 'none',
            }}
            title="Send query"
          >
            <Send size={16} className="transform -rotate-12 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
