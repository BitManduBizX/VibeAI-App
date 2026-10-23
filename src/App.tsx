/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { TakeawayBanner } from './components/TakeawayBanner';
import { Hero } from './components/Hero';
import { SkillMatrix } from './components/SkillMatrix';
import { VibeSandbox } from './components/VibeSandbox';
import { GamificationDashboard } from './components/GamificationDashboard';
import { Footer } from './components/Footer';
import { SkillDetailModal } from './components/SkillDetailModal';
import { ProjectBuilderModal } from './components/ProjectBuilderModal';
import { SettingsModal } from './components/SettingsModal';
import { ShareModal } from './components/ShareModal';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { AiCopilot } from './components/AiCopilot';

const MainAppLayout: React.FC = () => {
  const { selectedSkillDetail, setSelectedSkillDetail } = useApp();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* 2026 Golden Rule Banner (4-5 Skills Focus) */}
      <TakeawayBanner />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <SkillMatrix />
        <VibeSandbox />
        <GamificationDashboard />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      {selectedSkillDetail && (
        <SkillDetailModal
          skill={selectedSkillDetail}
          onClose={() => setSelectedSkillDetail(null)}
        />
      )}
      <ProjectBuilderModal />
      <SettingsModal />
      <ShareModal />
      <DailyChallengeModal />

      {/* Persistent Context-Aware Gemini Copilot */}
      <AiCopilot />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainAppLayout />
      </AppProvider>
    </ErrorBoundary>
  );
}
