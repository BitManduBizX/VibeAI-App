import React, { useState, useMemo } from 'react';
import { SKILLS_DATA } from '../data/skillsData';
import { SkillCard } from './SkillCard';
import { SkillCategory } from '../types';
import { useApp } from '../context/AppContext';
import { Search, Filter, Star, CheckCircle, Sparkles, SlidersHorizontal } from 'lucide-react';

export const SkillMatrix: React.FC = () => {
  const { progress } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterMode, setFilterMode] = useState<'all' | 'focused' | 'mastered' | 'todo'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: Array<{ id: string; label: string }> = [
    { id: 'All', label: 'All 15 Skills' },
    { id: 'Foundations', label: '1. Foundations' },
    { id: 'Creation & Media', label: '2. Creation & Media' },
    { id: 'Technical & Automation', label: '3. Tech & Automation' },
    { id: 'Productivity & Business', label: '4. Business & Speed' },
    { id: 'Ethics & Evaluation', label: '5. Ethics & Critical' },
  ];

  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      // 1. Category match
      if (selectedCategory !== 'All' && skill.category !== selectedCategory) {
        return false;
      }

      // 2. Filter mode match
      if (filterMode === 'focused' && !progress.focusedSkills.includes(skill.id)) {
        return false;
      }
      if (filterMode === 'mastered' && !progress.completedSkills.includes(skill.id)) {
        return false;
      }
      if (filterMode === 'todo' && progress.completedSkills.includes(skill.id)) {
        return false;
      }

      // 3. Search query match
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = skill.title.toLowerCase().includes(q);
        const matchesTagline = skill.tagline.toLowerCase().includes(q);
        const matchesConcepts = skill.keyConcepts.some((c) => c.toLowerCase().includes(q));
        const matchesRoles = skill.relatedRoles.some((r) => r.toLowerCase().includes(q));
        if (!matchesTitle && !matchesTagline && !matchesConcepts && !matchesRoles) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, filterMode, searchQuery, progress.focusedSkills, progress.completedSkills]);

  return (
    <section id="skills-matrix" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Skill Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            The 15 Essential AI Skills (2026 Roadmap)
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm max-w-2xl leading-relaxed">
            Click any skill to view comprehensive frameworks, prompt templates, and take the interactive mini-lab. Remember: <strong>mastering 4-5 skills</strong> gives you peak practical leverage.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills, tokens, agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & State Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter modes */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              filterMode === 'all'
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            All ({SKILLS_DATA.length})
          </button>
          <button
            onClick={() => setFilterMode('focused')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              filterMode === 'focused'
                ? 'bg-amber-500 text-white font-bold shadow-sm'
                : 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/10'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>My Focus ({progress.focusedSkills.length})</span>
          </button>
          <button
            onClick={() => setFilterMode('mastered')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              filterMode === 'mastered'
                ? 'bg-emerald-600 text-white font-bold shadow-sm'
                : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
            }`}
          >
            <CheckCircle className="w-3 h-3" />
            <span>Mastered ({progress.completedSkills.length})</span>
          </button>
        </div>
      </div>

      {/* Grid of Skill Cards */}
      {filteredSkills.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No skills match your active filter criteria. Try resetting filters or search keywords.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setFilterMode('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </section>
  );
};
