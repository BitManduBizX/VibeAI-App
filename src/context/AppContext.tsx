import React, { createContext, useContext, useState, useEffect } from 'react';
import { Skill, UserProgress } from '../types';
import { SKILLS_DATA } from '../data/skillsData';
import { BADGES_DATA } from '../data/badgesData';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  progress: UserProgress;
  toggleSkillCompleted: (skillId: string) => void;
  setFocusedSkills: (skillIds: string[]) => void;
  saveSkillNote: (skillId: string, note: string) => void;
  recordQuizScore: (skillId: string, score: number) => void;
  addXp: (points: number) => void;
  unlockBadge: (badgeId: string) => void;
  activeSkillForCopilot: Skill | null;
  setActiveSkillForCopilot: (skill: Skill | null) => void;
  copilotOpen: boolean;
  setCopilotOpen: (open: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  isOnline: boolean;
  notificationsEnabled: boolean;
  toggleNotifications: () => Promise<boolean>;
  exportUserData: () => void;
  importUserData: (dataString: string) => boolean;
  resetProgress: () => void;
  selectedSkillDetail: Skill | null;
  setSelectedSkillDetail: (skill: Skill | null) => void;
  projectBuilderOpen: boolean;
  setProjectBuilderOpen: (open: boolean) => void;
  shareModalOpen: boolean;
  setShareModalOpen: (open: boolean) => void;
  settingsModalOpen: boolean;
  setSettingsModalOpen: (open: boolean) => void;
  dailyChallengeOpen: boolean;
  setDailyChallengeOpen: (open: boolean) => void;
  activeSandboxTab: 'prompt' | 'writing' | 'data' | 'vibe';
  setActiveSandboxTab: (tab: 'prompt' | 'writing' | 'data' | 'vibe') => void;
  triggerNewNotification: (title: string, body: string) => void;
  bannerDismissed: boolean;
  setBannerDismissed: (dismissed: boolean) => void;
}

const STORAGE_KEY = 'vibeai_user_progress_2026';
const THEME_KEY = 'vibeai_theme_mode';
const API_KEY_STORAGE = 'vibeai_gemini_client_key';

const initialProgress: UserProgress = {
  completedSkills: ['ai-fundamentals'],
  focusedSkills: ['prompt-engineering', 'vibe-coding', 'ai-agents', 'ai-automation', 'critical-thinking-ai'],
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  xp: 320,
  unlockedBadgeIds: ['first-step', 'four-skill-focus'],
  skillNotes: {
    'prompt-engineering': 'Remember: XML tags act as boundaries. Always provide few-shot examples when asking for complex JSON outputs.',
  },
  quizScores: {
    'ai-fundamentals': 100,
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 2. User Progress State
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...initialProgress, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to parse saved progress, using initial state:', e);
    }
    return initialProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage:', e);
    }
  }, [progress]);

  // Streak calculation on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastActiveDate !== today) {
      const last = new Date(progress.lastActiveDate);
      const curr = new Date(today);
      const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        setProgress((prev) => ({
          ...prev,
          streakDays: prev.streakDays + 1,
          lastActiveDate: today,
        }));
      } else if (diffDays > 1) {
        setProgress((prev) => ({
          ...prev,
          streakDays: 1,
          lastActiveDate: today,
        }));
      }
    }
  }, []);

  // 3. API Key Management
  const [apiKey, setApiKeyState] = useState<string>(() => {
    return localStorage.getItem(API_KEY_STORAGE) || '';
  });

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    localStorage.setItem(API_KEY_STORAGE, key.trim());
  };

  // 4. Online / Offline State
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 5. Push Notifications State
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    return typeof Notification !== 'undefined' && Notification.permission === 'granted';
  });

  const toggleNotifications = async (): Promise<boolean> => {
    if (typeof Notification === 'undefined') {
      alert('Desktop notifications are not supported in this browser.');
      return false;
    }
    if (Notification.permission === 'granted') {
      setNotificationsEnabled(false);
      return false;
    }
    const permission = await Notification.requestPermission();
    const granted = permission === 'granted';
    setNotificationsEnabled(granted);
    if (granted) {
      new Notification('VibeAI Daily Reminder Activated!', {
        body: 'You are all set! We will send you daily 9:00 AM micro-challenges to keep your streak alive.',
        icon: '/favicon.ico',
      });
    }
    return granted;
  };

  const triggerNewNotification = (title: string, body: string) => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
  };

  // 6. UI Modals and Navigation States
  const [copilotOpen, setCopilotOpen] = useState<boolean>(false);
  const [activeSkillForCopilot, setActiveSkillForCopilot] = useState<Skill | null>(null);
  const [selectedSkillDetail, setSelectedSkillDetail] = useState<Skill | null>(null);
  const [projectBuilderOpen, setProjectBuilderOpen] = useState<boolean>(false);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
  const [dailyChallengeOpen, setDailyChallengeOpen] = useState<boolean>(false);
  const [activeSandboxTab, setActiveSandboxTab] = useState<'prompt' | 'writing' | 'data' | 'vibe'>('prompt');
  const [bannerDismissed, setBannerDismissed] = useState<boolean>(false);

  // Helper actions
  const addXp = (points: number) => {
    setProgress((prev) => {
      const newXp = prev.xp + points;
      // Check for grandmaster unlock
      const newBadges = [...prev.unlockedBadgeIds];
      if (newXp >= 1000 && prev.completedSkills.length >= 5 && !newBadges.includes('vibe-master')) {
        newBadges.push('vibe-master');
      }
      return { ...prev, xp: newXp, unlockedBadgeIds: newBadges };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setProgress((prev) => {
      if (prev.unlockedBadgeIds.includes(badgeId)) return prev;
      const updated = {
        ...prev,
        unlockedBadgeIds: [...prev.unlockedBadgeIds, badgeId],
        xp: prev.xp + 100,
      };
      const badge = BADGES_DATA.find((b) => b.id === badgeId);
      if (badge) {
        triggerNewNotification(`🏆 Badge Unlocked: ${badge.name}!`, badge.description);
      }
      return updated;
    });
  };

  const toggleSkillCompleted = (skillId: string) => {
    setProgress((prev) => {
      const exists = prev.completedSkills.includes(skillId);
      const updated = exists
        ? prev.completedSkills.filter((id) => id !== skillId)
        : [...prev.completedSkills, skillId];

      const newBadges = [...prev.unlockedBadgeIds];
      if (!exists) {
        if (!newBadges.includes('first-step')) newBadges.push('first-step');
        if (skillId === 'prompt-engineering' && !newBadges.includes('prompt-specialist')) {
          newBadges.push('prompt-specialist');
        }
        if (skillId === 'critical-thinking-ai' && !newBadges.includes('critical-thinker')) {
          newBadges.push('critical-thinker');
        }
      }

      return {
        ...prev,
        completedSkills: updated,
        unlockedBadgeIds: newBadges,
        xp: exists ? prev.xp : prev.xp + 150,
      };
    });
  };

  const setFocusedSkills = (skillIds: string[]) => {
    setProgress((prev) => {
      const newBadges = [...prev.unlockedBadgeIds];
      if (skillIds.length >= 4 && !newBadges.includes('four-skill-focus')) {
        newBadges.push('four-skill-focus');
      }
      return {
        ...prev,
        focusedSkills: skillIds,
        unlockedBadgeIds: newBadges,
      };
    });
  };

  const saveSkillNote = (skillId: string, note: string) => {
    setProgress((prev) => ({
      ...prev,
      skillNotes: { ...prev.skillNotes, [skillId]: note },
    }));
  };

  const recordQuizScore = (skillId: string, score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: { ...prev.quizScores, [skillId]: score },
    }));
  };

  const exportUserData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `VibeAI-Portfolio-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importUserData = (dataString: string): boolean => {
    try {
      const parsed = JSON.parse(dataString);
      if (parsed && Array.isArray(parsed.completedSkills)) {
        setProgress(parsed);
        return true;
      }
    } catch (e) {
      console.error('Import failed:', e);
    }
    return false;
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress, badges, and notes?')) {
      setProgress(initialProgress);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        progress,
        toggleSkillCompleted,
        setFocusedSkills,
        saveSkillNote,
        recordQuizScore,
        addXp,
        unlockBadge,
        activeSkillForCopilot,
        setActiveSkillForCopilot,
        copilotOpen,
        setCopilotOpen,
        apiKey,
        setApiKey,
        isOnline,
        notificationsEnabled,
        toggleNotifications,
        exportUserData,
        importUserData,
        resetProgress,
        selectedSkillDetail,
        setSelectedSkillDetail,
        projectBuilderOpen,
        setProjectBuilderOpen,
        shareModalOpen,
        setShareModalOpen,
        settingsModalOpen,
        setSettingsModalOpen,
        dailyChallengeOpen,
        setDailyChallengeOpen,
        activeSandboxTab,
        setActiveSandboxTab,
        triggerNewNotification,
        bannerDismissed,
        setBannerDismissed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
