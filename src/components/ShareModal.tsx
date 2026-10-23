import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Share2,
  Copy,
  Check,
  Flame,
  Award,
  Sparkles,
  ExternalLink,
  Target,
} from 'lucide-react';
import { SKILLS_DATA } from '../data/skillsData';

export const ShareModal: React.FC = () => {
  const { shareModalOpen, setShareModalOpen, progress } = useApp();
  const [copied, setCopied] = useState(false);

  if (!shareModalOpen) return null;

  const totalMastered = progress.completedSkills.length;
  const focusMastered = progress.focusedSkills.filter((id) =>
    progress.completedSkills.includes(id)
  ).length;

  const shareText = `🚀 I'm future-proofing my workflow on VibeAI!
Currently mastered ${focusMastered}/${progress.focusedSkills.length} core AI skills on my 2026 focus track, maintaining a ${progress.streakDays}-day active learning streak and ${progress.xp} XP!

The golden rule for 2026: You don't need all 15 skills—master 4-5 high-leverage skills and build 1 real-world capstone project.

#AI2026 #VibeAI #PromptEngineering #VibeCoding #GenerativeAI`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.href
    )}&summary=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setShareModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Share Your AI Capability Milestone
            </h3>
          </div>
          <button
            onClick={() => setShareModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Card Preview */}
        <div className="p-6">
          <div className="p-6 rounded-2xl bg-gradient-to-tr from-violet-950 via-slate-900 to-indigo-950 border border-violet-800/60 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-violet-600/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-white shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-extrabold text-sm tracking-tight text-white">VibeAI</div>
                  <div className="text-[10px] text-slate-400">2026 Verified Capability Certificate</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Verified Learner
              </span>
            </div>

            <div className="my-4 relative z-10">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Strategic AI Focus
              </div>
              <div className="text-xl font-extrabold text-white mt-0.5">
                {focusMastered}/{progress.focusedSkills.length} Focus Skills Mastered
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center relative z-10">
              <div className="p-2 rounded-xl bg-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Streak</div>
                <div className="text-sm font-extrabold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{progress.streakDays} Days</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Total XP</div>
                <div className="text-sm font-extrabold text-violet-400 flex items-center justify-center gap-1 mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{progress.xp} XP</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Mastered</div>
                <div className="text-sm font-extrabold text-cyan-400 mt-0.5">
                  {totalMastered}/15 Skills
                </div>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleCopy}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handleShareLinkedIn}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-semibold transition-all active:scale-95 shadow-md"
            >
              <span>Post to LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleShareTwitter}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-all active:scale-95"
            >
              <span>X (Twitter)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
