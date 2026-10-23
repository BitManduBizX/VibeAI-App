import React, { useState } from 'react';
import { Skill } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckCircle2,
  Circle,
  Star,
  Copy,
  Check,
  Terminal,
  BookOpen,
  Award,
  HelpCircle,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface Props {
  skill: Skill;
  onClose: () => void;
}

export const SkillDetailModal: React.FC<Props> = ({ skill, onClose }) => {
  const {
    progress,
    toggleSkillCompleted,
    setFocusedSkills,
    saveSkillNote,
    recordQuizScore,
    addXp,
    unlockBadge,
    setActiveSkillForCopilot,
    setCopilotOpen,
    setActiveSandboxTab,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'templates' | 'minilab' | 'notes'>('overview');
  const [copiedTemplateIdx, setCopiedTemplateIdx] = useState<number | null>(null);

  // Mini-Lab Quiz State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);

  // Notes state
  const [localNote, setLocalNote] = useState<string>(progress.skillNotes[skill.id] || '');
  const [noteSaved, setNoteSaved] = useState<boolean>(false);

  const isCompleted = progress.completedSkills.includes(skill.id);
  const isFocused = progress.focusedSkills.includes(skill.id);

  const handleCopyTemplate = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplateIdx(idx);
    setTimeout(() => setCopiedTemplateIdx(null), 2000);
  };

  const handleOpenTemplateInSandbox = (templateText: string) => {
    if (skill.id === 'ai-writing') {
      setActiveSandboxTab('writing');
    } else if (skill.id === 'ai-data-analysis') {
      setActiveSandboxTab('data');
    } else {
      setActiveSandboxTab('prompt');
    }
    onClose();
    const sandboxEl = document.getElementById('vibe-sandbox');
    if (sandboxEl) {
      sandboxEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    setSubmittedQuiz(true);
    const isCorrect = selectedOption === skill.miniLab.correctIndex;
    const score = isCorrect ? 100 : 0;
    recordQuizScore(skill.id, score);
    if (isCorrect) {
      addXp(50);
      unlockBadge('first-step');
    }
  };

  const handleSaveNotes = () => {
    saveSkillNote(skill.id, localNote);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const toggleFocus = () => {
    if (isFocused) {
      setFocusedSkills(progress.focusedSkills.filter((id) => id !== skill.id));
    } else {
      setFocusedSkills([...progress.focusedSkills, skill.id]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Modal Top Bar */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090D16]/50 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-950/60 px-2.5 py-0.5 rounded-full">
                Skill #{skill.number} • {skill.category}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {skill.estimatedHours}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {skill.difficulty}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {skill.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {skill.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* 4-5 focus toggle */}
            <button
              onClick={toggleFocus}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isFocused
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-400'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isFocused ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isFocused ? 'In 4-5 Focus' : 'Add to Focus'}</span>
            </button>

            {/* Mark Mastered Toggle */}
            <button
              onClick={() => toggleSkillCompleted(skill.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isCompleted
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500'
              }`}
            >
              {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
              <span>{isCompleted ? 'Mastered' : 'Mark Mastered'}</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-violet-600 text-violet-600 dark:text-violet-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Overview & Concepts</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`py-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'templates'
                ? 'border-violet-600 text-violet-600 dark:text-violet-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Prompt Templates ({skill.promptTemplates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('minilab')}
            className={`py-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'minilab'
                ? 'border-violet-600 text-violet-600 dark:text-violet-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Interactive Mini-Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'notes'
                ? 'border-violet-600 text-violet-600 dark:text-violet-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Notes & Journal</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Executive Summary
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  {skill.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Why This Skill Matters in 2026
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-violet-50/50 dark:bg-violet-950/20 p-4 rounded-xl border border-violet-200/50 dark:border-violet-800/40">
                  {skill.whyItMatters2026}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Core Architectural Concepts
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {skill.keyConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed shadow-sm"
                    >
                      <span className="font-bold text-violet-600 dark:text-violet-400 block mb-1">
                        Concept {idx + 1}
                      </span>
                      {concept}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Best Practices & Heuristics
                </h4>
                <ul className="space-y-2">
                  {skill.bestPractices.map((bp, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Launch Copilot with this skill */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-violet-600/10 via-indigo-600/10 to-transparent border border-violet-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-violet-500" />
                    <span>Have specific questions about {skill.title}?</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Ask our AI Copilot for personalized workflows, edge cases, and code.
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveSkillForCopilot(skill);
                    setCopilotOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-sm active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Ask Copilot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PROMPT TEMPLATES */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                These vetted prompts are production-grade templates you can copy directly or run inside our interactive sandbox.
              </p>

              <div className="space-y-4">
                {skill.promptTemplates.map((template, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div>
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                          {template.name}
                        </h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {template.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopyTemplate(template.prompt, idx)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
                        >
                          {copiedTemplateIdx === idx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleOpenTemplateInSandbox(template.prompt)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white shadow-sm transition-colors"
                        >
                          <Terminal className="w-3 h-3" />
                          <span>Open in Sandbox</span>
                        </button>
                      </div>
                    </div>

                    <pre className="mt-3 p-3 bg-slate-950 text-slate-200 rounded-lg text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
                      {template.prompt}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MINI-LAB & QUIZ */}
          {activeTab === 'minilab' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
                    Skill Knowledge Check (+50 XP)
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-4">
                  {skill.miniLab.question}
                </h4>

                {/* Multiple choice options */}
                <div className="space-y-2.5 mb-5">
                  {skill.miniLab.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === skill.miniLab.correctIndex;
                    let optStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-violet-400';

                    if (submittedQuiz) {
                      if (isCorrect) {
                        optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        optStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 line-through';
                      }
                    } else if (isSelected) {
                      optStyle = 'border-violet-600 bg-violet-100/60 dark:bg-violet-900/40 text-violet-900 dark:text-violet-200 font-semibold ring-2 ring-violet-500';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={submittedQuiz}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start gap-3 ${optStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {!submittedQuiz ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleQuizSubmit}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 disabled:opacity-50 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {selectedOption === skill.miniLab.correctIndex ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct! +50 XP Awarded
                        </span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400">
                          Not quite right. See explanation below:
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {skill.miniLab.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Practical Hands-on Assignment */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Practical Real-World Assignment
                </h5>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {skill.miniLab.practicalTask}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>Hint: {skill.miniLab.hint}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NOTES & JOURNAL */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Personal Learning Journal
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Write key insights, custom prompts, or project ideas. Automatically persisted offline.
                  </p>
                </div>
                <button
                  onClick={handleSaveNotes}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  {noteSaved ? <Check className="w-3.5 h-3.5 text-white" /> : null}
                  <span>{noteSaved ? 'Saved!' : 'Save Notes'}</span>
                </button>
              </div>

              <textarea
                rows={8}
                value={localNote}
                onChange={(e) => setLocalNote(e.target.value)}
                placeholder={`Document your observations, prompt variations, and real-world results for ${skill.title}...`}
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono leading-relaxed"
              />
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090D16]/50 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div>Related Roles: {skill.relatedRoles.join(', ')}</div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium transition-colors"
          >
            Close Deep-Dive
          </button>
        </div>
      </div>
    </div>
  );
};
