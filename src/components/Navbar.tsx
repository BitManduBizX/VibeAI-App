import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Flame,
  Moon,
  Sun,
  Settings,
  Bot,
  Wifi,
  WifiOff,
  Bell,
  Share2,
  Award,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { PRESET_TRACKS } from '../data/presetTracks';

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    progress,
    setFocusedSkills,
    copilotOpen,
    setCopilotOpen,
    isOnline,
    notificationsEnabled,
    toggleNotifications,
    setSettingsModalOpen,
    setShareModalOpen,
    setDailyChallengeOpen,
    setProjectBuilderOpen,
  } = useApp();

  const [trackDropdownOpen, setTrackDropdownOpen] = useState(false);

  // Compute active track name if matching
  const currentTrack = PRESET_TRACKS.find(
    (t) =>
      t.skillIds.length === progress.focusedSkills.length &&
      t.skillIds.every((id) => progress.focusedSkills.includes(id))
  );

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-[#090D16]/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 p-0.5 shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-[#0F172A] rounded-[10px] flex items-center justify-center text-violet-600 dark:text-violet-400">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-950 via-violet-900 to-indigo-900 dark:from-white dark:via-slate-100 dark:to-violet-300 bg-clip-text text-transparent">
                  VibeAI
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700/50">
                  2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block leading-none mt-0.5">
                Master Real-World AI Skills
              </p>
            </div>
          </a>

          {/* Track Selector Dropdown */}
          <div className="relative ml-2 hidden md:block">
            <button
              onClick={() => setTrackDropdownOpen(!trackDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Layers className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              <span>{currentTrack ? currentTrack.name : `My Track (${progress.focusedSkills.length} Skills)`}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {trackDropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-72 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setTrackDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Your 4-5 Skill Track
                  </p>
                </div>
                {PRESET_TRACKS.map((track) => {
                  const isSelected =
                    track.skillIds.length === progress.focusedSkills.length &&
                    track.skillIds.every((id) => progress.focusedSkills.includes(id));
                  return (
                    <button
                      key={track.id}
                      onClick={() => {
                        setFocusedSkills(track.skillIds);
                        setTrackDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors ${
                        isSelected
                          ? 'bg-violet-50/80 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 font-semibold'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{track.name}</div>
                        <div className="text-[10px] text-slate-400">{track.targetRole}</div>
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          <a href="#skills-matrix" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            15 Skills Matrix
          </a>
          <a href="#vibe-sandbox" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Practice Sandbox
          </a>
          <button
            onClick={() => setProjectBuilderOpen(true)}
            className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            Project Builder
          </button>
          <a href="#gamification" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Progress & Leaderboard
          </a>
        </nav>

        {/* Actions & Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak Pill */}
          <button
            onClick={() => setDailyChallengeOpen(true)}
            title="Daily Learning Streak — Click for today's AI workout"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-bold hover:scale-105 transition-transform"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{progress.streakDays}d Streak</span>
          </button>

          {/* XP Pill */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>{progress.xp} XP</span>
          </div>

          {/* Online / Offline indicator */}
          <div
            title={isOnline ? 'Online: Live Gemini Connected' : 'Offline Mode: Local Storage Active'}
            className="hidden sm:flex items-center text-xs text-slate-400 dark:text-slate-500"
          >
            {isOnline ? (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
                <Wifi className="w-3.5 h-3.5" />
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-500">
                <WifiOff className="w-3.5 h-3.5" />
                <span className="text-[10px]">Offline</span>
              </span>
            )}
          </div>

          {/* Notifications Toggle */}
          <button
            onClick={() => toggleNotifications()}
            title={notificationsEnabled ? 'Daily Reminders Active' : 'Enable Daily AI Reminders'}
            aria-label="Notification Preferences"
            className={`p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
              notificationsEnabled ? 'text-violet-600 dark:text-violet-400' : ''
            }`}
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Share Milestone Modal Button */}
          <button
            onClick={() => setShareModalOpen(true)}
            title="Share Milestones on LinkedIn / X"
            aria-label="Share Milestones"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Settings Modal Button */}
          <button
            onClick={() => setSettingsModalOpen(true)}
            aria-label="Settings and API Key"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* AI Copilot Launch Button */}
          <button
            onClick={() => setCopilotOpen(!copilotOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-md shadow-violet-600/20 active:scale-95 transition-all"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">AI Copilot</span>
            <kbd className="hidden md:inline-block px-1 py-0.2 bg-white/20 rounded text-[9px] font-mono">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
};
