import React from 'react';
import { Sparkles, Terminal, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setSettingsModalOpen, setProjectBuilderOpen, setCopilotOpen } = useApp();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#070B14] transition-colors py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                VibeAI
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-bold uppercase">
                2026 Edition
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Master the 15 essential AI skills for 2026. Avoid theoretical hype by focusing on 4–5 core skills directly tied to your workflow, tested in live sandboxes, and demonstrated in a capstone portfolio project.
            </p>
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Offline-First Architecture & Private Local Storage</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Core Modules
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <a href="#skills-matrix" className="hover:text-violet-600 dark:hover:text-violet-400">
                  15 Skills Matrix
                </a>
              </li>
              <li>
                <a href="#vibe-sandbox" className="hover:text-violet-600 dark:hover:text-violet-400">
                  Prompt Engineering Lab
                </a>
              </li>
              <li>
                <a href="#vibe-sandbox" className="hover:text-violet-600 dark:hover:text-violet-400">
                  AI Writing Studio
                </a>
              </li>
              <li>
                <a href="#vibe-sandbox" className="hover:text-violet-600 dark:hover:text-violet-400">
                  Data Analysis & Formulas
                </a>
              </li>
              <li>
                <button
                  onClick={() => setProjectBuilderOpen(true)}
                  className="hover:text-violet-600 dark:hover:text-violet-400 text-left"
                >
                  Portfolio Project Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Capabilities & Tools
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setCopilotOpen(true)}
                  className="hover:text-violet-600 dark:hover:text-violet-400 text-left"
                >
                  Gemini AI Copilot (⌘K)
                </button>
              </li>
              <li>
                <a href="#gamification" className="hover:text-violet-600 dark:hover:text-violet-400">
                  Badges & Leaderboard
                </a>
              </li>
              <li>
                <button
                  onClick={() => setSettingsModalOpen(true)}
                  className="hover:text-violet-600 dark:hover:text-violet-400 text-left"
                >
                  Gemini API Key Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSettingsModalOpen(true)}
                  className="hover:text-violet-600 dark:hover:text-violet-400 text-left"
                >
                  Export Portfolio Data (JSON)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© 2026 VibeAI Platform. Built for the modern human workforce.</p>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">Google Gemini 3.8 Flash</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
