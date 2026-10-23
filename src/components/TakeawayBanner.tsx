import React from 'react';
import { useApp } from '../context/AppContext';
import { PRESET_TRACKS } from '../data/presetTracks';
import { Target, CheckCircle2, ArrowRight, X } from 'lucide-react';

export const TakeawayBanner: React.FC = () => {
  const { progress, setFocusedSkills, bannerDismissed, setBannerDismissed } = useApp();

  if (bannerDismissed) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white border-y border-violet-800/50 py-5 px-4 sm:px-6 shadow-inner">
      {/* Background ambient lighting */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
        {/* Banner Copy */}
        <div className="flex items-start gap-3.5 max-w-2xl">
          <div className="w-10 h-10 rounded-xl bg-violet-600/40 border border-violet-400/30 flex items-center justify-center shrink-0 text-violet-300 mt-0.5">
            <Target className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                The 2026 Golden Rule
              </span>
              <span className="text-xs text-slate-300 font-medium">Strategic Focus</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-white mt-1">
              You don’t need to master all 15 skills!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-0.5">
              Focus on <strong className="text-cyan-300 font-semibold">4–5 skills</strong> directly relevant to your workflow. Future competition is about solving real-world problems with AI, not collecting theoretical certificates.
            </p>
          </div>
        </div>

        {/* Quick Track Selection Chips */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider w-full sm:w-auto">
            Quick Tracks:
          </span>
          {PRESET_TRACKS.map((track) => {
            const isSelected =
              track.skillIds.length === progress.focusedSkills.length &&
              track.skillIds.every((id) => progress.focusedSkills.includes(id));

            return (
              <button
                key={track.id}
                onClick={() => setFocusedSkills(track.skillIds)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 active:scale-95 ${
                  isSelected
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-400/25 ring-2 ring-cyan-300'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
                }`}
              >
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />}
                <span>{track.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setBannerDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors self-start lg:self-center"
          title="Dismiss Banner"
          aria-label="Dismiss 2026 Golden Rule Banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
