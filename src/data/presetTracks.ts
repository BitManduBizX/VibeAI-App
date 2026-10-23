export interface PresetTrack {
  id: string;
  name: string;
  targetRole: string;
  tagline: string;
  badge: string;
  skillIds: string[];
  description: string;
}

export const PRESET_TRACKS: PresetTrack[] = [
  {
    id: 'vibe-coder',
    name: 'Vibe Coder & Builder',
    targetRole: 'Software Developer, Indie Hacker, Founder',
    tagline: 'Build complete apps and autonomous agents at light speed.',
    badge: '🚀 Developer Track',
    skillIds: ['prompt-engineering', 'vibe-coding', 'ai-agents', 'ai-automation', 'critical-thinking-ai'],
    description: 'Empowers you to design, build, and deploy production-grade software applications and agentic tools using conversational AI direction.',
  },
  {
    id: 'content-creator',
    name: 'Creative Studio & Media Producer',
    targetRole: 'Content Creator, Designer, Marketer, Author',
    tagline: 'Produce captivating visuals, scripts, and video campaigns.',
    badge: '🎨 Creator Track',
    skillIds: ['ai-writing', 'ai-image-generation', 'ai-video-creation', 'ai-presentation', 'prompt-engineering'],
    description: 'Master the multimodal creation pipeline: from high-converting written copy to studio-quality product photos, viral video cuts, and slide decks.',
  },
  {
    id: 'business-executive',
    name: 'Business Leader & Operator',
    targetRole: 'Manager, Executive, Founder, Consultant',
    tagline: 'Transform team productivity, unit economics, and executive buy-in.',
    badge: '💼 Executive Track',
    skillIds: ['ai-business', 'ai-productivity', 'ai-data-analysis', 'ai-presentation', 'critical-thinking-ai'],
    description: 'Lead AI adoption responsibly: automate meeting overhead, uncover hidden spreadsheet trends, craft winning slide decks, and achieve measurable ROI.',
  },
  {
    id: 'researcher-analyst',
    name: 'Research & Intelligence Analyst',
    targetRole: 'Data Analyst, Researcher, Journalist, Student',
    tagline: 'Extract signal from noise, verify facts, and spot market shifts.',
    badge: '🔬 Intelligence Track',
    skillIds: ['ai-fundamentals', 'ai-research', 'ai-data-analysis', 'ai-security-ethics', 'critical-thinking-ai'],
    description: 'Deep-dive into verified literature, audit synthetic hallucinations, maintain data security, and make rock-solid evidence-based recommendations.',
  },
  {
    id: 'automation-architect',
    name: 'AI Operations & Automator',
    targetRole: 'Operations Lead, Growth Marketer, Sysadmin',
    tagline: 'Eliminate manual grunt work with 24/7 background AI loops.',
    badge: '⚡ Operations Track',
    skillIds: ['ai-fundamentals', 'prompt-engineering', 'ai-automation', 'ai-agents', 'ai-security-ethics'],
    description: 'Connect disparate software tools via webhooks and autonomous agents to triage leads, sanitize data, and automate business processes safely.',
  },
];
