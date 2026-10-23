import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Terminal, ArrowRight, ShieldCheck, Zap, Bot, Target } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setProjectBuilderOpen, setCopilotOpen } = useApp();

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80 dark:border-slate-800/80">
      {/* Decorative gradient backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-600/15 via-indigo-600/10 to-cyan-500/15 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800/60 text-xs font-semibold text-violet-700 dark:text-violet-300 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
          <span>The Definitive 2026 AI Roadmap & Interactive Sandbox</span>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
          <span className="text-slate-500 dark:text-slate-400 font-normal">Powered by Gemini 3.8 Flash</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.12]">
          Master Real-World AI Skills —{' '}
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            All in One Platform.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Stop drowning in theoretical AI hype. Master the <strong>15 essential skills</strong> that matter in 2026, test them live in our interactive sandbox, and build a portfolio project that sets you apart.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#skills-matrix"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 hover:shadow-violet-600/40 active:scale-95 transition-all"
          >
            <span>Explore 15 Essential Skills</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#vibe-sandbox"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-[#0F172A] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-sm shadow-sm active:scale-95 transition-all"
          >
            <Terminal className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span>Open Vibe Sandbox</span>
          </a>

          <button
            onClick={() => setProjectBuilderOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-600/25 active:scale-95 transition-all"
          >
            <Target className="w-4 h-4" />
            <span>Build Your 1 Project</span>
          </button>
        </div>

        {/* Feature Highlights Pills */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 shadow-sm text-left">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-2.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">15 Skills</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">2026 Core Roadmap</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 shadow-sm text-left">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-2.5">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">4 Live Labs</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Prompt, Writing, Data & Specs</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 shadow-sm text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
              <Bot className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">Gemini 3.8</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Context-Aware AI Copilot</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 shadow-sm text-left">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">Offline Ready</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Local Storage & Privacy First</div>
          </div>
        </div>
      </div>
    </section>
  );
};
