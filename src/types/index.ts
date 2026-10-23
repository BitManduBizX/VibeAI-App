export type SkillCategory =
  | 'Foundations'
  | 'Creation & Media'
  | 'Technical & Automation'
  | 'Productivity & Business'
  | 'Ethics & Evaluation';

export interface MiniLabQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  practicalTask: string;
  hint: string;
}

export interface PromptTemplate {
  name: string;
  description: string;
  prompt: string;
  sampleInput?: string;
}

export interface Skill {
  id: string;
  number: number;
  title: string;
  category: SkillCategory;
  tagline: string;
  summary: string;
  whyItMatters2026: string;
  keyConcepts: string[];
  bestPractices: string[];
  promptTemplates: PromptTemplate[];
  miniLab: MiniLabQuestion;
  relatedRoles: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
  iconName: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  requirement: string;
}

export interface UserProgress {
  completedSkills: string[];
  focusedSkills: string[]; // The 4-5 chosen focus skills
  streakDays: number;
  lastActiveDate: string;
  xp: number;
  unlockedBadgeIds: string[];
  skillNotes: Record<string, string>;
  quizScores: Record<string, number>;
  dailyChallengeCompletedDate?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  skillContext?: string;
  isOffline?: boolean;
}

export interface ProjectPlan {
  projectName: string;
  summary: string;
  duration: string;
  difficulty: string;
  skillsApplied: string[];
  phases: Array<{
    title: string;
    description: string;
    milestone: string;
  }>;
  starterPrompt: string;
  portfolioDeliverable: string;
  offline?: boolean;
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  role: string;
  xp: number;
  skillsMastered: number;
  focusTrack: string;
  isUser?: boolean;
}
