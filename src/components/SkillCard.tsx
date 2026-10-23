import React from 'react';
import { Skill } from '../types';
import { useApp } from '../context/AppContext';
import {
  Cpu,
  Terminal,
  Search,
  PenTool,
  Image as ImageIcon,
  Video,
  Presentation,
  BarChart3,
  Workflow,
  Bot,
  Code,
  Clock,
  Briefcase,
  ShieldCheck,
  BrainCircuit,
  CheckCircle2,
  Circle,
  Star,
  ArrowRight,
  BookOpen,
  MessageSquare,
} from 'lucide-react';

interface Props {
  skill: Skill;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  Terminal,
  Search,
  PenTool,
  Image: ImageIcon,
  Video,
  Presentation,
  BarChart3,
  Workflow,
  Bot,
  Code,
  Clock,
  Briefcase,
  ShieldCheck,
  BrainCircuit,
};

export const SkillCard: React.FC<Props> = ({ skill }) => {
  const {
    progress,
    toggleSkillCompleted,
    setFocusedSkills,
    setSelectedSkillDetail,
    setActiveSkillForCopilot,
    setCopilotOpen,
    setActiveSandboxTab,
  } = useApp();

  const isCompleted = progress.completedSkills.includes(skill.id);
  const isFocused = progress.focusedSkills.includes(skill.id);

  const IconComponent = iconMap[skill.iconName] || Cpu;

  const toggleFocus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFocused) {
      setFocusedSkills(progress.focusedSkills.filter((id) => id !== skill.id));
    } else {
      if (progress.focusedSkills.length >= 6) {
        alert('We recommend focusing on 4–5 core skills to avoid overwhelm! You can still practice all 15.');
      }
      setFocusedSkills([...progress.focusedSkills, skill.id]);
    }
  };

  const handleOpenCopilot = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSkillForCopilot(skill);
    setCopilotOpen(true);
  };

  const handlePracticeInSandbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (skill.id === 'prompt-engineering' || skill.id === 'ai-fundamentals' || skill.id === 'ai-research') {
      setActiveSandboxTab('prompt');
    } else if (skill.id === 'ai-writing') {
      setActiveSandboxTab('writing');
    } else if (skill.id === 'ai-data-analysis') {
      setActiveSandboxTab('data');
    } else {
      setActiveSandboxTab('vibe');
    }
    const sandboxEl = document.getElementById('vibe-sandbox');
    if (sandboxEl) {
      sandboxEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={() => setSelectedSkillDetail(skill)}
      className={`group relative rounded-2xl p-6 transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
        isFocused
          ? 'bg-white dark:bg-[#0F172A] border-violet-500/60 dark:border-violet-500/60 shadow-lg shadow-violet-500/10 ring-1 ring-violet-500/30'
          : 'bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md'
      }`}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                isCompleted
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : isFocused
                  ? 'bg-violet-600/15 text-violet-600 dark:text-violet-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  #{skill.number.toString().padStart(2, '0')}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {skill.category}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors mt-0.5">
                {skill.title}
              </h3>
            </div>
          </div>

          {/* Quick Focus Pin Button */}
          <button
            onClick={toggleFocus}
            title={isFocused ? 'In your 4-5 focus track (Click to remove)' : 'Add to your 4-5 focus track'}
            aria-label={isFocused ? `Remove ${skill.title} from focus track` : `Add ${skill.title} to focus track`}
            className={`p-1.5 rounded-lg transition-colors ${
              isFocused
                ? 'text-amber-500 hover:text-amber-600 bg-amber-500/10'
                : 'text-slate-300 hover:text-amber-500 dark:text-slate-600 dark:hover:text-amber-400'
            }`}
          >
            <Star className={`w-4 h-4 ${isFocused ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Tagline / Summary */}
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {skill.tagline}
        </p>

        {/* Key Concepts Preview */}
        <div className="space-y-1.5 mb-4">
          {skill.keyConcepts.slice(0, 2).map((concept, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
              <span className="text-violet-500 font-bold shrink-0">•</span>
              <span className="line-clamp-1">{concept}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        {/* Completion status button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSkillCompleted(skill.id);
          }}
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
            isCompleted
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mastered</span>
            </>
          ) : (
            <>
              <Circle className="w-3.5 h-3.5 text-slate-400" />
              <span>Mark Done</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={handleOpenCopilot}
            title="Ask Copilot about this skill"
            aria-label={`Ask Copilot about ${skill.title}`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handlePracticeInSandbox}
            title="Practice in Sandbox"
            aria-label={`Practice ${skill.title} in Sandbox`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>

          <span className="inline-flex items-center gap-1 text-xs font-medium text-violet-600 dark:text-violet-400 group-hover:translate-x-0.5 transition-transform ml-1">
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
