import React, { useState } from 'react';
import {
  X,
  Code2,
  Workflow,
  BookOpen,
  FlaskConical,
  Database,
  Wrench,
  Settings,
  Award,
  Activity,
  CheckCircle2,
  Copy,
  Play,
  FileCode,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function FeatureModal({
  modalType,
  onClose,
  onAskChatWithPrompt
}) {
  const [copied, setCopied] = useState(false);

  // Tools utility states
  const [inputText, setInputText] = useState('');
  const [outputResult, setOutputResult] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  if (!modalType) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    switch (modalType) {
      case 'code':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center">
                  <Code2 size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Code Assistant & Optimizer</h3>
                  <p className="text-xs text-slate-400">Generate, refactor, and benchmark algorithms in Python, C++, and JS</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: 'Python Complexity Optimization', prompt: 'Analyze and optimize this Python algorithm to O(n log n) with memory profiling:', icon: '🐍' },
                { title: 'Data Structures & Trees', prompt: 'Implement a self-balancing AVL Tree in C++ with delete, insert, and traversal operations:', icon: '🌲' },
                { title: 'PyTorch Neural Layer', prompt: 'Write a custom PyTorch nn.Module for Multi-Head Self-Attention with gradient checkpointing:', icon: '🔥' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/4 border border-white/8 hover:border-blue-400/40 transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-lg mb-1 block">{item.icon}</span>
                    <h4 className="text-xs font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-400">{item.prompt}</p>
                  </div>
                  <button
                    onClick={() => {
                      onAskChatWithPrompt(item.prompt);
                      onClose();
                    }}
                    className="mt-3 w-full py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 text-xs font-semibold border border-blue-400/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Run in Zeal AI</span>
                    <span>→</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-xs text-slate-300">
              <p className="font-semibold text-white mb-1">💡 Quick Tip for Students:</p>
              <p>You can paste full script stack-traces or error logs directly into the Zeal AI composer to get automated root-cause analysis and fixed snippets.</p>
            </div>
          </div>
        );

      case 'agents':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-white/8 pb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center justify-center">
                <Workflow size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">AI Agent Workflows & Multi-Agent Chains</h3>
                <p className="text-xs text-slate-400">Design autonomous, collaborative LLM agents with specialized tools</p>
              </div>
            </div>

            {/* Workflow Diagram */}
            <div className="p-4 rounded-2xl bg-black/50 border border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-400/30 w-full">
                <p className="text-xs font-bold text-purple-200">1. Ingestion Agent</p>
                <p className="text-[10px] text-slate-400">Scrapes datasets & PDFs</p>
              </div>
              <span className="text-purple-400 font-bold">➔</span>
              <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-400/30 w-full">
                <p className="text-xs font-bold text-cyan-200">2. Reasoning Agent</p>
                <p className="text-[10px] text-slate-400">Extracts logic & math</p>
              </div>
              <span className="text-cyan-400 font-bold">➔</span>
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 w-full">
                <p className="text-xs font-bold text-emerald-200">3. Verification Agent</p>
                <p className="text-[10px] text-slate-400">Audits edge cases</p>
              </div>
            </div>

            <button
              onClick={() => {
                onAskChatWithPrompt("Design a complete multi-agent workflow architecture in Python using LangGraph or AutoGen for autonomous research paper analysis.");
                onClose();
              }}
              className="w-full py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wide uppercase transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              Build Multi-Agent Workflow in Zeal AI →
            </button>
          </div>
        );

      case 'knowledge':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-white/8 pb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center">
                <BookOpen size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Department Knowledge Base</h3>
                <p className="text-xs text-slate-400">Curated materials, lecture references, and syllabus repositories</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {[
                { title: 'Machine Learning & Neural Nets', items: ['Backpropagation mathematics', 'Convolutional & Recurrent Nets', 'Transformer Attention'] },
                { title: 'Data Science & Big Data', items: ['PySpark Distributed Pipelines', 'Feature Engineering & PCA', 'Statistical Hypothesis Testing'] },
                { title: 'Computer Vision & GenAI', items: ['Object Detection (YOLOv8)', 'Diffusion Models & Latent Spaces', 'Self-Supervised Representation'] },
                { title: 'NLP & LLM Engineering', items: ['Tokenization & Embeddings', 'LoRA & PEFT Fine-Tuning', 'Retrieval-Augmented Generation (RAG)'] },
              ].map((sec, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white/4 border border-white/8">
                  <h4 className="text-xs font-bold text-emerald-300 mb-2">{sec.title}</h4>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {sec.items.map((it, j) => (
                      <li key={j} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                onAskChatWithPrompt("Provide a comprehensive revision guide on Retrieval-Augmented Generation (RAG) vs Model Fine-tuning for the AI & DS curriculum.");
                onClose();
              }}
              className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide uppercase transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
            >
              Ask Knowledge Base Question in Zeal AI →
            </button>
          </div>
        );

      case 'research':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-white/8 pb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                <FlaskConical size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Academic Research Hub</h3>
                <p className="text-xs text-slate-400">Discover recent arXiv publications, formulate hypotheses, and generate LaTeX citations</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                { title: 'Literature Review Synthesizer', desc: 'Summarizes key related work, datasets, and benchmark baselines for IEEE/Springer papers.' },
                { title: 'Mathematical Proof Formulator', desc: 'Validates convergence bounds, convex optimization, and loss function derivations.' },
                { title: 'LaTeX & BibTeX Citation Builder', desc: 'Generates formatted citations and table markup ready for Overleaf.' },
              ].map((res, i) => (
                <div key={i} className="p-3 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-between gap-3">
                  <div className="text-left">
                    <p className="text-xs font-bold text-amber-300">{res.title}</p>
                    <p className="text-[11px] text-slate-400">{res.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      onAskChatWithPrompt(`Help me draft an academic ${res.title.toLowerCase()} for my final year AI & DS engineering project.`);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold border border-amber-400/30 flex-shrink-0 cursor-pointer"
                  >
                    Draft Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'datasets':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-white/8 pb-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center">
                <Database size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Curated Engineering Datasets</h3>
                <p className="text-xs text-slate-400">Pre-indexed academic benchmarks for training & experimentation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {[
                { name: 'Indian Traffic & Urban Road Dataset', type: 'Computer Vision', size: '14.2 GB • 50k annotated frames' },
                { name: 'Multilingual Indic NLP Corpus', type: 'NLP & Translation', size: '8.5M sentence pairs across 11 languages' },
                { name: 'Smart Grid Power Telemetry', type: 'Time Series / IoT', size: '120k sensor telemetry streams' },
                { name: 'Medical CXR Radiology Benchmark', type: 'Biomedical AI', size: '112k chest radiographs with clinical labels' },
              ].map((d, i) => (
                <div key={i} className="p-3 rounded-2xl bg-white/4 border border-white/8">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">{d.type}</span>
                  </div>
                  <p className="text-xs font-bold text-white">{d.name}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{d.size}</p>
                  <button
                    onClick={() => {
                      onAskChatWithPrompt(`How should I preprocess and construct an efficient PyTorch DataLoader for the ${d.name} (${d.type})?`);
                      onClose();
                    }}
                    className="mt-2 text-[11px] text-cyan-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
                  >
                    Generate Loader Code →
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tools':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-white/8 pb-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center">
                <Wrench size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Developer Tools & Utilities</h3>
                <p className="text-xs text-slate-400">Live token counter, JSON validator, and dimension calculators</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Token Length & Context Estimator:</label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste code or prompt text here to calculate estimated tokens..."
                  rows={3}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-teal-400"
                />
              </div>

              <div className="flex items-center justify-between text-xs bg-white/5 p-3 rounded-xl border border-white/8">
                <div>
                  <span className="text-slate-400">Character Count: </span>
                  <span className="font-bold text-white">{inputText.length}</span>
                </div>
                <div>
                  <span className="text-slate-400">Word Count: </span>
                  <span className="font-bold text-white">{inputText.trim() ? inputText.trim().split(/\s+/).length : 0}</span>
                </div>
                <div>
                  <span className="text-slate-400">Estimated Llama Tokens: </span>
                  <span className="font-bold text-teal-300">~{Math.ceil(inputText.length / 3.8)}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-white/8 pb-3">
              <div className="w-9 h-9 rounded-xl bg-slate-700/50 text-slate-200 border border-white/20 flex items-center justify-center">
                <Settings size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Platform Settings</h3>
                <p className="text-xs text-slate-400">Inference preferences and model parameters</p>
              </div>
            </div>

            <div className="space-y-3 text-left">
              <div className="p-3 rounded-xl bg-white/4 border border-white/8 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Inference Engine</p>
                  <p className="text-[11px] text-slate-400">Groq Cloud Ultra-Low Latency</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/4 border border-white/8 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Streaming Output</p>
                  <p className="text-[11px] text-slate-400">Server-Sent Events (SSE) enabled</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Enabled
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/4 border border-white/8 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Context Window</p>
                  <p className="text-[11px] text-slate-400">Max tokens per interaction: 2048</p>
                </div>
                <span className="text-xs font-mono text-white/80">2048 tokens</span>
              </div>
            </div>
          </div>
        );

      case 'faculty':
        return (
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3 border-b border-white/8 pb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/30 to-amber-400/10 border-2 border-amber-400/50 flex items-center justify-center text-amber-300 font-bold text-xl shadow-lg">
                CP
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                  Project Mentor & Guide
                </span>
                <h3 className="text-lg font-bold text-white">Dr. Chandan Prasad</h3>
                <p className="text-xs text-cyan-300 font-medium">
                  Department of Artificial Intelligence & Data Science Engineering
                </p>
                <p className="text-[11px] text-slate-400">
                  Zeal College of Engineering & Research, Narhe, Pune
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white/4 border border-white/8">
                <h4 className="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
                  <Award size={14} className="text-amber-400" />
                  <span>Academic Leadership & Mentorship</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Guided this state-of-the-art AI Assistant platform to empower students, researchers, and innovators in the Department of Artificial Intelligence and Data Science Engineering at Zeal College of Engineering and Research.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/4 border border-white/8">
                <h4 className="text-xs font-bold text-white mb-1.5">Areas of Specialization</h4>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Deep Learning & Neural Networks',
                    'Cognitive Artificial Intelligence',
                    'Distributed Data Science Systems',
                    'Natural Language Processing',
                    'Academic Research & Innovation'
                  ].map((spec, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-800 text-slate-200 border border-white/10">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'status':
        return (
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2.5 border-b border-white/8 pb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center">
                <Activity size={18} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">System Diagnostics & AI Status</h3>
                <p className="text-xs text-slate-400">Live operational metrics and service telemetry</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-white/4 border border-white/8">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">System State</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  100% Operational
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/4 border border-white/8">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Engine Model</span>
                <span className="text-xs font-bold text-cyan-300 block mt-0.5 truncate">
                  Groq Llama 3 / Neural Net
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/4 border border-white/8">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Streaming Latency</span>
                <span className="text-xs font-bold text-amber-300 block mt-0.5">
                  ~180ms TTFT
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/4 border border-white/8">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Department Tier</span>
                <span className="text-xs font-bold text-white block mt-0.5">
                  NAAC A+ Institutional
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-2xl rounded-3xl p-5 sm:p-6 shadow-2xl z-10 select-none animate-in fade-in zoom-in-95 duration-200"
        style={{
          background: 'rgba(12, 17, 26, 0.95)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.9), 0 0 40px rgba(45, 212, 191, 0.15)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {renderContent()}
      </div>
    </div>
  );
}
