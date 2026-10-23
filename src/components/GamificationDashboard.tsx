import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BADGES_DATA, MOCK_LEADERBOARD } from '../data/badgesData';
import { SKILLS_DATA } from '../data/skillsData';
import {
  Trophy,
  Flame,
  Award,
  Sparkles,
  Users,
  Target,
  ArrowUpRight,
  Share2,
  Calendar,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const GamificationDashboard: React.FC = () => {
  const {
    progress,
    setShareModalOpen,
    setDailyChallengeOpen,
    setSelectedSkillDetail,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'leaderboard'>('overview');

  // Compute stats
  const totalMastered = progress.completedSkills.length;
  const focusMastered = progress.focusedSkills.filter((id) =>
    progress.completedSkills.includes(id)
  ).length;
  const focusTotal = progress.focusedSkills.length;
  const focusPercentage = focusTotal > 0 ? Math.round((focusMastered / focusTotal) * 100) : 0;
  const overallPercentage = Math.round((totalMastered / SKILLS_DATA.length) * 100);

  // Compute Level
  let level = 'Level 1: AI Curious';
  let nextLevelXp = 500;
  if (progress.xp >= 1500) {
    level = 'Level 5: Vibe AI Grandmaster';
    nextLevelXp = 2500;
  } else if (progress.xp >= 1000) {
    level = 'Level 4: Vibe Architect';
    nextLevelXp = 1500;
  } else if (progress.xp >= 600) {
    level = 'Level 3: Workflow Automator';
    nextLevelXp = 1000;
  } else if (progress.xp >= 250) {
    level = 'Level 2: Prompt Practitioner';
    nextLevelXp = 600;
  }

  const levelProgress = Math.min(100, Math.round((progress.xp / nextLevelXp) * 100));

  // Merge user into leaderboard
  const userLeaderboardItem = {
    rank: 4,
    id: 'user-you',
    name: 'You (Champion)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    role: 'Vibe AI Practitioner',
    xp: progress.xp,
    skillsMastered: totalMastered,
    focusTrack: `${focusMastered}/${focusTotal} Track Mastered`,
    isUser: true,
  };

  const combinedLeaderboard = [...MOCK_LEADERBOARD.slice(0, 3), userLeaderboardItem, ...MOCK_LEADERBOARD.slice(3)];

  return (
    <section id="gamification" className="py-16 md:py-20 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Trophy className="w-4 h-4" />
              <span>Skill Mastery & Cohort Metrics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Progress & Gamification Hub
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm max-w-2xl leading-relaxed">
              Track your daily learning habits, unlock verified capability badges, and see where you rank across global learners.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDailyChallengeOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-bold transition-all active:scale-95 shadow-sm"
            >
              <Flame className="w-4 h-4 fill-current text-amber-500" />
              <span>Today's AI Workout</span>
            </button>

            <button
              onClick={() => setShareModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-md shadow-violet-600/20 transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Milestone</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Card 1: 4-5 Focus Track Progress */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Focus Track ({focusTotal} Skills)
              </span>
              <Target className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {focusMastered}/{focusTotal}
              </span>
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                {focusPercentage}% Complete
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-violet-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${focusPercentage}%` }}
              />
            </div>
          </div>

          {/* Card 2: Learning Streak */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Daily Learning Streak
              </span>
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {progress.streakDays} Days
              </span>
              <span className="text-xs font-bold text-amber-500">Active</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Completed last active workout: today
            </p>
          </div>

          {/* Card 3: Experience Level & XP */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                AI Capability Level
              </span>
              <Award className="w-5 h-5 text-cyan-500" />
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-white truncate mb-2">
              {level}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span>{progress.xp} XP</span>
              <span>Next: {nextLevelXp} XP</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>

          {/* Card 4: Badges Unlocked */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Badges Earned
              </span>
              <Sparkles className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {progress.unlockedBadgeIds.length}/{BADGES_DATA.length}
              </span>
              <span className="text-xs text-slate-500">Badges</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {BADGES_DATA.length - progress.unlockedBadgeIds.length} remaining to unlock
            </p>
          </div>
        </div>

        {/* Dashboard Sub-Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            My Focus Track Checklist
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'badges'
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Badges Showcase ({progress.unlockedBadgeIds.length})
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Cohort Leaderboard
          </button>
        </div>

        {/* TAB CONTENT */}
        {activeTab === 'overview' && (
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Your Active Focus Curriculum (4–5 Skills)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Master these high-leverage competencies first before expanding into others.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {progress.focusedSkills.map((skillId) => {
                const skill = SKILLS_DATA.find((s) => s.id === skillId);
                if (!skill) return null;
                const isDone = progress.completedSkills.includes(skill.id);
                return (
                  <div
                    key={skill.id}
                    onClick={() => setSelectedSkillDetail(skill)}
                    className="py-3.5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/40 px-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          isDone
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : `#${skill.number}`}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{skill.title}</span>
                          <span className="text-[10px] font-normal px-2 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                            {skill.difficulty}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {skill.tagline}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
                        {skill.estimatedHours}
                      </span>
                      <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-1">
                        <span>Review</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: BADGES */}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BADGES_DATA.map((badge) => {
              const unlocked = progress.unlockedBadgeIds.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-5 rounded-2xl border transition-all text-left ${
                    unlocked
                      ? 'bg-white dark:bg-[#0F172A] border-violet-500/40 shadow-md shadow-violet-500/10'
                      : 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        unlocked
                          ? 'bg-violet-600/15 text-violet-600 dark:text-violet-400'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {unlocked ? <Award className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    </div>
                    {unlocked ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Unlocked
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400">Locked</span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {badge.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                    {badge.description}
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-lg">
                    Requirement: {badge.requirement}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500">
              <div className="w-16">Rank</div>
              <div className="flex-1">Learner & Target Role</div>
              <div className="w-28 text-center hidden sm:block">Track Status</div>
              <div className="w-24 text-right">Points (XP)</div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {combinedLeaderboard.map((user, idx) => (
                <div
                  key={user.id}
                  className={`p-4 flex items-center justify-between text-xs transition-colors ${
                    user.isUser
                      ? 'bg-violet-50/80 dark:bg-violet-950/40 font-bold border-l-4 border-violet-600'
                      : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="w-16 flex items-center gap-1.5 font-extrabold text-slate-700 dark:text-slate-300">
                    {idx === 0 && <span className="text-amber-500 text-sm">🥇</span>}
                    {idx === 1 && <span className="text-slate-400 text-sm">🥈</span>}
                    {idx === 2 && <span className="text-amber-700 text-sm">🥉</span>}
                    <span>#{idx + 1}</span>
                  </div>

                  <div className="flex-1 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{user.name}</span>
                        {user.isUser && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-violet-600 text-white font-bold">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">{user.role}</div>
                    </div>
                  </div>

                  <div className="w-28 text-center hidden sm:block text-slate-600 dark:text-slate-400">
                    {user.focusTrack}
                  </div>

                  <div className="w-24 text-right font-bold text-violet-600 dark:text-violet-400 font-mono">
                    {user.xp} XP
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
