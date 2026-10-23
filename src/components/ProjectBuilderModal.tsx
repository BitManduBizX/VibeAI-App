import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SKILLS_DATA } from '../data/skillsData';
import { ProjectPlan } from '../types';
import {
  X,
  Target,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Terminal,
  Copy,
  Check,
  AlertCircle,
  Briefcase,
} from 'lucide-react';

export const ProjectBuilderModal: React.FC = () => {
  const {
    projectBuilderOpen,
    setProjectBuilderOpen,
    progress,
    apiKey,
    addXp,
    unlockBadge,
    setActiveSandboxTab,
  } = useApp();

  const [selectedSkills, setSelectedSkills] = useState<string[]>(progress.focusedSkills);
  const [targetRole, setTargetRole] = useState<string>('Founder / Full-Stack Creator');
  const [userGoal, setUserGoal] = useState<string>(
    'Build a verifiable AI portfolio piece that proves practical problem-solving capability in 2026.'
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<ProjectPlan | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  if (!projectBuilderOpen) return null;

  const toggleSkill = (id: string) => {
    if (selectedSkills.includes(id)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== id));
    } else {
      if (selectedSkills.length >= 5) {
        alert('We recommend capping your project at 4–5 skills for maximum focus and high completion rate!');
      }
      setSelectedSkills([...selectedSkills, id]);
    }
  };

  const handleGenerateProject = async () => {
    if (selectedSkills.length === 0) {
      alert('Please select at least 2-3 skills to combine into your project.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/project-builder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-gemini-api-key': apiKey } : {}),
        },
        body: JSON.stringify({
          selectedSkills: selectedSkills.map(
            (id) => SKILLS_DATA.find((s) => s.id === id)?.title || id
          ),
          userGoal,
          targetRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Project generation failed');
      setGeneratedPlan(data);
      addXp(100);
      unlockBadge('capstone-builder');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to generate project roadmap.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyStarterPrompt = () => {
    if (generatedPlan?.starterPrompt) {
      navigator.clipboard.writeText(generatedPlan.starterPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const handleOpenInSandbox = () => {
    setProjectBuilderOpen(false);
    setActiveSandboxTab('prompt');
    const sandboxEl = document.getElementById('vibe-sandbox');
    if (sandboxEl) {
      sandboxEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setProjectBuilderOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090D16]/50 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 flex items-center gap-1">
                <Target className="w-3.5 h-3.5" />
                <span>Capstone Portfolio Studio</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">1 Project Architecture</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Build 1 Real-World Project
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Future employers and clients don’t care about completed checklists. They care about <strong>what you built</strong>. Combine your 4-5 skills into an impressive portfolio deliverable.
            </p>
          </div>

          <button
            onClick={() => setProjectBuilderOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Step 1: Skill Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                1. Select 4–5 Skills to Combine ({selectedSkills.length} selected)
              </label>
              <button
                onClick={() => setSelectedSkills(progress.focusedSkills)}
                className="text-[11px] text-violet-600 dark:text-violet-400 hover:underline"
              >
                Use My Active Focus Track
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {SKILLS_DATA.map((skill) => {
                const isSelected = selectedSkills.includes(skill.id);
                return (
                  <button
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-violet-600 text-white shadow-sm ring-2 ring-violet-400'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isSelected ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                    <span>{skill.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Role & Goals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                2. Target Professional Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                3. Primary Capstone Objective
              </label>
              <input
                type="text"
                value={userGoal}
                onChange={(e) => setUserGoal(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center justify-end">
            <button
              disabled={loading || selectedSkills.length === 0}
              onClick={handleGenerateProject}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold text-xs shadow-lg shadow-violet-600/25 active:scale-95 transition-all"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing Project Blueprint with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Custom Project Blueprint (+100 XP)</span>
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Generated Project Display */}
          {generatedPlan && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6 animate-in fade-in duration-300">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-900/40 via-indigo-900/30 to-slate-900 border border-violet-800/40 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-400 text-slate-950">
                    Capstone Recommendation
                  </span>
                  <span className="text-xs text-slate-300 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                    {generatedPlan.duration}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-slate-200">
                    {generatedPlan.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                  {generatedPlan.projectName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {generatedPlan.summary}
                </p>
              </div>

              {/* Phases */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Execution Milestones (Step-by-Step)
                </h4>
                <div className="space-y-3">
                  {(generatedPlan.phases || []).map((phase, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5"
                    >
                      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                        <span className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{phase.title}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                        {phase.description}
                      </p>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pl-7 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Deliverable: {phase.milestone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Starter Prompt */}
              {generatedPlan.starterPrompt && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Starter Blueprint Prompt</span>
                    </span>
                    <button
                      onClick={handleCopyStarterPrompt}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                    >
                      {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPrompt ? 'Copied' : 'Copy Prompt'}</span>
                    </button>
                  </div>
                  <pre className="p-3 rounded bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {generatedPlan.starterPrompt}
                  </pre>
                </div>
              )}

              {/* Portfolio Showcase Advice */}
              {generatedPlan.portfolioDeliverable && (
                <div className="p-4 rounded-xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 text-xs">
                  <span className="font-bold text-violet-700 dark:text-violet-300 block mb-1">
                    How to Showcase on LinkedIn / Resume:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {generatedPlan.portfolioDeliverable}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090D16]/50 flex items-center justify-between">
          {generatedPlan ? (
            <button
              onClick={handleOpenInSandbox}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Test Starter Prompt in Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="text-xs text-slate-500">Pick your skills and click Generate.</div>
          )}

          <button
            onClick={() => setProjectBuilderOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
