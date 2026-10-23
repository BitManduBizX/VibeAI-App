import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Key,
  Download,
  Upload,
  Bell,
  Trash2,
  Check,
  ShieldCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const {
    settingsModalOpen,
    setSettingsModalOpen,
    apiKey,
    setApiKey,
    exportUserData,
    importUserData,
    resetProgress,
    notificationsEnabled,
    toggleNotifications,
  } = useApp();

  const [inputKey, setInputKey] = useState<string>(apiKey);
  const [savedKeySuccess, setSavedKeySuccess] = useState<boolean>(false);
  const [importText, setImportText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!settingsModalOpen) return null;

  const handleSaveKey = () => {
    setApiKey(inputKey.trim());
    setSavedKeySuccess(true);
    setTimeout(() => setSavedKeySuccess(false), 2000);
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) return;
    const success = importUserData(importText);
    if (success) {
      setImportStatus('Progress imported successfully!');
      setTimeout(() => {
        setImportStatus(null);
        setSettingsModalOpen(false);
      }, 1500);
    } else {
      setImportStatus('Invalid JSON format. Please verify and try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setSettingsModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090D16]/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-600/15 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Platform Settings & Privacy
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage your API credentials, backups, and notification preferences.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSettingsModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Section 1: Gemini API Key */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                <span>Google Gemini API Key</span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Get Free Key (No Credit Card)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              If running locally or using your own AI Studio credentials, paste your Gemini API key below. Stored exclusively in your browser’s <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1 rounded">localStorage</code> and never logged.
            </p>

            <div className="flex items-center gap-2">
              <input
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                onClick={handleSaveKey}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all shadow-sm active:scale-95"
              >
                {savedKeySuccess ? 'Saved!' : 'Save Key'}
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero server leakage. Endpoints proxy securely using HTTPS.</span>
            </div>
          </div>

          {/* Section 2: Notifications */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div>
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-amber-500" />
                <span>Daily 9:00 AM AI Workout Reminder</span>
              </div>
              <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                Keep your learning streak alive with a 2-minute scenario prompt.
              </div>
            </div>

            <button
              onClick={() => toggleNotifications()}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                notificationsEnabled
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {notificationsEnabled ? 'Enabled' : 'Enable'}
            </button>
          </div>

          {/* Section 3: Backup & Restore */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="font-bold text-slate-900 dark:text-white">
              Data Synchronization & Offline Backup
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Export your notes, mastered skills, and quiz scores into a JSON portfolio file to transfer across devices.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={exportUserData}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Progress (JSON)</span>
              </button>
            </div>

            <div className="pt-2">
              <textarea
                rows={2}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste exported JSON here to restore on this device..."
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-violet-500 mb-2"
              />
              <button
                onClick={handleImportSubmit}
                disabled={!importText.trim()}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white font-medium"
              >
                Import JSON
              </button>
              {importStatus && <span className="ml-3 text-violet-600 font-semibold">{importStatus}</span>}
            </div>
          </div>

          {/* Section 4: Reset Cache */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900">
            <div>
              <div className="font-bold text-rose-800 dark:text-rose-200">Reset All Data</div>
              <div className="text-slate-500 dark:text-slate-400">
                Clear all mastered skills, notes, badges, and streaks.
              </div>
            </div>
            <button
              onClick={resetProgress}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090D16]/50 flex justify-end">
          <button
            onClick={() => setSettingsModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
