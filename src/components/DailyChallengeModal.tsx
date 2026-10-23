import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Flame,
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export const DailyChallengeModal: React.FC = () => {
  const {
    dailyChallengeOpen,
    setDailyChallengeOpen,
    addXp,
    unlockBadge,
    progress,
  } = useApp();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);

  if (!dailyChallengeOpen) return null;

  // Today's scenario
  const challenge = {
    title: "Today's AI Workout: Hallucination Interception",
    date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    scenario: `You ask an AI model to summarize the legal requirements for GDPR Article 17 ("Right to Erasure") and recommend how long user backup tapes should be kept. The model writes a fluid, professional 3-paragraph reply citing "Directive EU-2026/8991" and claims backups must be deleted within 48 hours under threat of criminal arrest.

What is the best immediate course of action before sharing this with your leadership team?`,
    options: [
      {
        text: 'Forward the AI memo directly to the CEO since the writing style is authoritative and uses legal terminology.',
        isCorrect: false,
      },
      {
        text: 'Cross-reference the cited directive number against official EUR-Lex databases and check if GDPR Article 17 actually specifies a 48-hour rule for immutable backups.',
        isCorrect: true,
      },
      {
        text: 'Ask the same model "Are you 100% sure this directive exists?" and accept whatever it says.',
        isCorrect: false,
      },
      {
        text: 'Delete the entire company backup system immediately to avoid arrest.',
        isCorrect: false,
      },
    ],
    explanation: `Frontier LLMs excel at generating statistically plausible legal jargon (such as fake EU directive numbers like "EU-2026/8991") that sound convincing but do not exist. Always triangulate statutory references against authoritative primary sources (e.g. EUR-Lex or court registries).`,
  };

  const handleOptionSelect = (idx: number) => {
    if (completed) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setCompleted(true);
    if (challenge.options[selectedOption].isCorrect) {
      addXp(60);
      unlockBadge('streak-master');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setDailyChallengeOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-amber-500/10 dark:bg-amber-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <span>Daily AI Workout</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-slate-500 font-normal">{challenge.date}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {challenge.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setDailyChallengeOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {challenge.scenario}
          </div>

          <div className="space-y-2">
            {challenge.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnClass = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-violet-400';

              if (completed) {
                if (opt.isCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold';
                } else if (isSelected && !opt.isCorrect) {
                  btnClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 line-through';
                }
              } else if (isSelected) {
                btnClass = 'border-violet-600 bg-violet-50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200 font-bold ring-2 ring-violet-500';
              }

              return (
                <button
                  key={idx}
                  disabled={completed}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 ${btnClass}`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {completed && (
            <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 space-y-1 animate-in fade-in">
              <span className="font-bold text-cyan-400 block">Expert Takeaway:</span>
              <p className="leading-relaxed">{challenge.explanation}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090D16]/50 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Streak: {progress.streakDays} Days (+60 XP)</span>
          </div>

          {!completed ? (
            <button
              disabled={selectedOption === null}
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold text-xs transition-all active:scale-95 shadow-sm"
            >
              Verify Choice
            </button>
          ) : (
            <button
              onClick={() => setDailyChallengeOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs transition-all"
            >
              Workout Completed!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
