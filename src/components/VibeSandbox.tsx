import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Terminal,
  PenTool,
  BarChart3,
  Code,
  Play,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Sliders,
  FileSpreadsheet,
} from 'lucide-react';

export const VibeSandbox: React.FC = () => {
  const { activeSandboxTab, setActiveSandboxTab, apiKey, isOnline, addXp, unlockBadge } = useApp();

  // Loading and Error states
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // ----------------------------------------------------
  // LAB 1: PROMPT ENGINEERING STUDIO STATE
  // ----------------------------------------------------
  const promptPresets: Record<string, { raw: string; engineered: string; input: string; technique: string }> = {
    delimiters: {
      technique: 'XML Delimiters & Schema Boundaries',
      raw: 'Summarize the customer review and give me the sentiment.',
      engineered: `You are an expert Customer Insights Analyst.
<context>
Analyze the provided customer feedback delimited by <customer_review> tags.
</context>
<instruction>
1. Identify the core product pain point.
2. Determine sentiment: Positive, Neutral, or Negative.
3. Suggest a 1-sentence recovery action.
</instruction>
<constraints>
- Strict JSON output with keys: "painPoint", "sentiment", "recoveryAction".
- Do not include conversational greetings.
</constraints>
<output_format>
Return valid JSON only.
</output_format>`,
      input: `<customer_review>
"The software looked gorgeous in the demo, but when our team tried uploading a 50MB CSV file, it stalled at 99% for 20 minutes without any error message. We lost half a day of data entry. If this isn't resolved by Friday we'll need to cancel our enterprise trial."
</customer_review>`,
    },
    chainOfThought: {
      technique: 'Chain-of-Thought (CoT) Reasoning',
      raw: 'Which cloud provider is better for a startup?',
      engineered: `Act as a Principal Infrastructure Architect.
Before delivering your recommendation, think step by step inside <thinking> tags:
1. Evaluate cost vs developer velocity for early-stage teams.
2. Assess serverless ecosystems and AI acceleration hardware availability.
3. Weigh vendor lock-in risks.
Then provide your final synthesized advice inside <recommendation> tags.`,
      input: 'We have 3 full-stack engineers building an AI-powered SaaS with 10k monthly active users.',
    },
    fewShot: {
      technique: 'Few-Shot Exemplar Anchoring',
      raw: 'Extract software features from this tweet.',
      engineered: `Extract newly released software features in this format: [Feature Name] -> [Impact].
Example 1:
Tweet: "Just shipped dark mode and 2x faster exports!"
Output:
- Dark Mode -> Visual comfort & accessibility
- 2x Faster Exports -> Productivity improvement

Example 2:
Tweet: "Webhook triggers and multi-tenant auth are live."
Output:
- Webhook Triggers -> Third-party workflow automation
- Multi-Tenant Auth -> Enterprise security compliance`,
      input: 'Tweet: "We just rolled out real-time audio transcription and 1-click Notion export for all Pro plans!"',
    },
  };

  const [activeTechniqueKey, setActiveTechniqueKey] = useState<string>('delimiters');
  const [rawPrompt, setRawPrompt] = useState<string>(promptPresets.delimiters.raw);
  const [engineeredPrompt, setEngineeredPrompt] = useState<string>(promptPresets.delimiters.engineered);
  const [testInput, setTestInput] = useState<string>(promptPresets.delimiters.input);
  const [promptLabResult, setPromptLabResult] = useState<{
    rawOutput?: string;
    engineeredOutput?: string;
    analysis?: string;
    offline?: boolean;
  } | null>(null);

  const handleSelectTechnique = (key: string) => {
    setActiveTechniqueKey(key);
    const preset = promptPresets[key];
    if (preset) {
      setRawPrompt(preset.raw);
      setEngineeredPrompt(preset.engineered);
      setTestInput(preset.input);
    }
  };

  const handleRunPromptLab = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/gemini/sandbox/prompt-lab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-gemini-api-key': apiKey } : {}),
        },
        body: JSON.stringify({
          rawPrompt,
          engineeredPrompt,
          testInput,
          technique: promptPresets[activeTechniqueKey]?.technique || 'Structured Prompting',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Execution failed');
      setPromptLabResult(data);
      addXp(40);
      unlockBadge('sandbox-explorer');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to run prompt comparison.');
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // LAB 2: AI WRITING STUDIO STATE
  // ----------------------------------------------------
  const [writingDraft, setWritingDraft] = useState<string>(
    'Hey team, so basically we had a meeting about AI literacy yesterday and people are kind of confused. There are so many tools coming out every week and no one knows which ones we actually have permission to use. We should probably make a list or some kind of training so people don\'t mess up and leak confidential data. Let me know what you think.'
  );
  const [targetTone, setTargetTone] = useState<string>('Executive & Direct (BLUF)');
  const [formatType, setFormatType] = useState<string>('Executive Memo');
  const [writingResult, setWritingResult] = useState<{
    result?: string;
    metrics?: { wordCount: number; readingTime: string; clarityScore: string };
    offline?: boolean;
  } | null>(null);

  const handleRunWritingLab = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/gemini/sandbox/writing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-gemini-api-key': apiKey } : {}),
        },
        body: JSON.stringify({
          draftText: writingDraft,
          targetTone,
          formatType,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Writing transformation failed');
      setWritingResult(data);
      addXp(40);
      unlockBadge('sandbox-explorer');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to polish writing.');
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // LAB 3: AI DATA ANALYSIS STATE
  // ----------------------------------------------------
  const sampleDatasets: Record<string, { name: string; csv: string; goal: string }> = {
    saas: {
      name: '2026 SaaS Retention & AI Adoption',
      csv: `Month,PlanTier,ActiveUsers,AiFeatureAdoptionRate,MonthlyChurnRate,SupportTicketResolutionMinutes
Jan,Pro,1200,34%,3.8%,45
Feb,Pro,1350,42%,3.1%,38
Mar,Pro,1510,51%,2.6%,31
Apr,Enterprise,620,68%,1.4%,19
May,Enterprise,680,76%,1.1%,14
Jun,Enterprise,750,84%,0.8%,9`,
      goal: 'Identify the statistical correlation between AI feature adoption and monthly churn reduction.',
    },
    skillsSurvey: {
      name: 'Global Workforce AI Competency Index',
      csv: `SkillDomain,MedianSalaryPremium,AvgLearningWeeksToProficiency,EnterpriseDemandIndex
Prompt Engineering,+18%,3,94
AI Automation & Agents,+28%,6,98
AI Data Analysis,+22%,4,88
AI Security & Ethics,+31%,5,92
AI Video Creation,+15%,4,79`,
      goal: 'Highlight the highest ROI skill domains and provide comparison formulas.',
    },
  };

  const [activeDatasetKey, setActiveDatasetKey] = useState<string>('saas');
  const [customCsv, setCustomCsv] = useState<string>(sampleDatasets.saas.csv);
  const [dataAnalysisGoal, setDataAnalysisGoal] = useState<string>(sampleDatasets.saas.goal);
  const [dataAnalysisResult, setDataAnalysisResult] = useState<any>(null);

  const handleSelectDataset = (key: string) => {
    setActiveDatasetKey(key);
    if (sampleDatasets[key]) {
      setCustomCsv(sampleDatasets[key].csv);
      setDataAnalysisGoal(sampleDatasets[key].goal);
    }
  };

  const handleRunDataAnalysis = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/gemini/sandbox/data-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-gemini-api-key': apiKey } : {}),
        },
        body: JSON.stringify({
          datasetText: customCsv,
          analysisGoal: dataAnalysisGoal,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Data analysis failed');
      setDataAnalysisResult(data);
      addXp(40);
      unlockBadge('sandbox-explorer');
    } catch (err: any) {
      setErrorMsg(err.message || 'Data analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // LAB 4: VIBE CODING APP SPEC GENERATOR
  // ----------------------------------------------------
  const [appIdea, setAppIdea] = useState<string>(
    'A minimalist web app that records voice meeting audio, transcribes it, and extracts a 3-column accountability table: Owner, Action Item, and Due Date.'
  );
  const [vibeSpecResult, setVibeSpecResult] = useState<string | null>(null);

  const handleGenerateVibeSpec = () => {
    setLoading(true);
    setTimeout(() => {
      const generated = `# SYSTEM SPECIFICATION: ${appIdea.slice(0, 40)}...

## 1. High-Level Architecture
- Framework: React 19 + TypeScript + Vite
- Styling: Tailwind CSS (Modern clean aesthetic, 60-30-10 palette)
- AI Engine: Google Gemini API (gemini-3.8-flash for structured JSON parsing)
- Local State: React Context + localStorage persistence for offline resilience

## 2. Component Hierarchy
├── App.tsx (Root layout with ErrorBoundary)
├── components/
│   ├── AudioRecorder.tsx (MediaStream capture + AudioContext level visualizer)
│   ├── TranscriptionFeed.tsx (Real-time speaker turns & timestamped segments)
│   ├── ActionItemTable.tsx (Sortable, editable accountability matrix)
│   └── ExportDrawer.tsx (JSON/Markdown/Notion webhook trigger)

## 3. Data Schema Contract (TypeScript)
\`\`\`typescript
export interface ActionItem {
  id: string;
  assignee: string;
  task: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed';
}
\`\`\`

## 4. Master Prompt for AI Studio / Cursor
Copy and paste this into your coding agent:
"Act as a Principal Full-Stack Engineer. Build a responsive, single-page application meeting the specification above. Ensure zero white screens on boot, include a mock fallback when offline, and adhere strictly to WCAG AA color contrast standards."`;

      setVibeSpecResult(generated);
      setLoading(false);
      addXp(50);
      unlockBadge('sandbox-explorer');
    }, 600);
  };

  return (
    <section id="vibe-sandbox" className="py-16 md:py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-xs font-bold text-cyan-800 dark:text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>Interactive Practice Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Practice AI Skills Hands-On
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Theory without practice is forgotten in days. Test prompt engineering, polish executive writing, inspect datasets, and architect vibe-coded apps in real-time.
          </p>
        </div>

        {/* Sandbox Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveSandboxTab('prompt')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeSandboxTab === 'prompt'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                : 'bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>1. Prompt Engineering Lab</span>
          </button>

          <button
            onClick={() => setActiveSandboxTab('writing')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeSandboxTab === 'writing'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                : 'bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>2. AI Writing & Synthesis</span>
          </button>

          <button
            onClick={() => setActiveSandboxTab('data')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeSandboxTab === 'data'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                : 'bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>3. Data Analysis & Formulas</span>
          </button>

          <button
            onClick={() => setActiveSandboxTab('vibe')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeSandboxTab === 'vibe'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                : 'bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>4. Vibe Coding Spec Studio</span>
          </button>
        </div>

        {errorMsg && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 1: PROMPT ENGINEERING STUDIO */}
        {/* ------------------------------------------------------------------ */}
        {activeSandboxTab === 'prompt' && (
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  <span>Prompt Comparison & Diagnostics</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Compare a vague prompt against a structured prompt using frontier prompt engineering techniques.
                </p>
              </div>

              {/* Preset Technique Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                  Preset:
                </span>
                {Object.keys(promptPresets).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSelectTechnique(key)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                      activeTechniqueKey === key
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {key.replace(/([A-Z])/g, ' $1')}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
              {/* Left: Raw Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Raw / Casual Prompt
                  </label>
                  <span className="text-[10px] text-amber-500 font-medium">Unconstrained</span>
                </div>
                <textarea
                  rows={6}
                  value={rawPrompt}
                  onChange={(e) => setRawPrompt(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 leading-relaxed"
                />
              </div>

              {/* Right: Engineered Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Engineered Prompt ({promptPresets[activeTechniqueKey]?.technique})</span>
                  </label>
                  <span className="text-[10px] text-emerald-500 font-medium">Production-Grade</span>
                </div>
                <textarea
                  rows={6}
                  value={engineeredPrompt}
                  onChange={(e) => setEngineeredPrompt(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-violet-50/30 dark:bg-slate-900 border border-violet-200 dark:border-violet-900/60 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 leading-relaxed"
                />
              </div>
            </div>

            {/* Test Input Data */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Sample Test Data / Context Payload
              </label>
              <textarea
                rows={3}
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Data or context to be processed..."
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Action Button */}
            <div className="flex items-center justify-end">
              <button
                disabled={loading}
                onClick={handleRunPromptLab}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-md shadow-violet-600/25 active:scale-95"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Executing with Gemini 3.8 Flash...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Run Comparison Lab (+40 XP)</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Comparison Area */}
            {promptLabResult && (
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Live Output Comparison</span>
                  </h4>
                  {promptLabResult.offline && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20">
                      Offline Simulated Mode
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Raw Output */}
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-500">Raw Prompt Result</span>
                    </div>
                    <pre className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                      {promptLabResult.rawOutput}
                    </pre>
                  </div>

                  {/* Engineered Output */}
                  <div className="p-4 rounded-xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-violet-700 dark:text-violet-300 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Engineered Prompt Result</span>
                      </span>
                      <button
                        onClick={() => copyToClipboard(promptLabResult.engineeredOutput || '', 'eng-out')}
                        className="text-[11px] text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
                      >
                        {copiedKey === 'eng-out' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-slate-900 dark:text-slate-100 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                      {promptLabResult.engineeredOutput}
                    </pre>
                  </div>
                </div>

                {/* AI Architectural Diagnostic */}
                {promptLabResult.analysis && (
                  <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 text-xs">
                    <span className="font-bold text-cyan-400 block mb-1">
                      Architectural Diagnostic Insight:
                    </span>
                    <p className="leading-relaxed">{promptLabResult.analysis}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 2: AI WRITING & SYNTHESIS STUDIO */}
        {/* ------------------------------------------------------------------ */}
        {activeSandboxTab === 'writing' && (
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  <span>AI Writing & Executive Synthesis</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Eliminate generic corporate fluff. Calibrate tone, pacing, and executive brevity.
                </p>
              </div>

              {/* Format pills */}
              <div className="flex items-center gap-2">
                {['Executive Memo', 'Client Proposal', 'Product Update', 'LinkedIn Post'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setFormatType(fmt)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      formatType === fmt
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selector */}
            <div className="my-6">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Target Voice & Tonal Vector
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  'Executive & Direct (BLUF)',
                  'Persuasive & Bold',
                  'Academic & Measured',
                  'Casual & Punchy',
                ].map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setTargetTone(tone)}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                      targetTone === tone
                        ? 'border-violet-600 bg-violet-50 dark:bg-violet-950/40 text-violet-800 dark:text-violet-200 ring-1 ring-violet-500'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Draft Text */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Raw Draft or Brain Dump
              </label>
              <textarea
                rows={6}
                value={writingDraft}
                onChange={(e) => setWritingDraft(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 leading-relaxed font-sans"
              />
            </div>

            {/* Run Button */}
            <div className="flex items-center justify-end">
              <button
                disabled={loading}
                onClick={handleRunWritingLab}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-md shadow-violet-600/25 active:scale-95"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Polishing with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Transform & Synthesize (+40 XP)</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Polished Area */}
            {writingResult && (
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Polished Document ({targetTone})</span>
                  </h4>

                  {/* Metrics Badges */}
                  {writingResult.metrics && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                        {writingResult.metrics.wordCount} words
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                        {writingResult.metrics.readingTime}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                        Clarity: {writingResult.metrics.clarityScore}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 relative">
                  <button
                    onClick={() => copyToClipboard(writingResult.result || '', 'writing-res')}
                    className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
                  >
                    {copiedKey === 'writing-res' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>Copy Text</span>
                  </button>

                  <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed pr-16 font-sans">
                    {writingResult.result}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 3: DATA ANALYSIS & FORMULAS */}
        {/* ------------------------------------------------------------------ */}
        {activeSandboxTab === 'data' && (
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  <span>AI Data Analysis & Spreadsheet Assistant</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Paste tabular CSV data to discover outliers, extract formulas, and generate visual chart structures.
                </p>
              </div>

              {/* Sample Dataset Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Sample:
                </span>
                {Object.keys(sampleDatasets).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSelectDataset(key)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeDatasetKey === key
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {sampleDatasets[key].name}
                  </button>
                ))}
              </div>
            </div>

            {/* CSV Input */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
              <div className="lg:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                  <span>Dataset (CSV Format)</span>
                </label>
                <textarea
                  rows={8}
                  value={customCsv}
                  onChange={(e) => setCustomCsv(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 leading-relaxed"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Analysis Objective
                  </label>
                  <textarea
                    rows={4}
                    value={dataAnalysisGoal}
                    onChange={(e) => setDataAnalysisGoal(e.target.value)}
                    placeholder="What specific question do you want answered from this data?"
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 leading-relaxed"
                  />
                </div>

                <button
                  disabled={loading}
                  onClick={handleRunDataAnalysis}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-md shadow-violet-600/25 active:scale-95"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Analyzing Patterns...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Analyze Data & Formulas (+40 XP)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Analysis Output */}
            {dataAnalysisResult && (
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-6 animate-in fade-in duration-300">
                {/* Summary */}
                <div className="p-4 rounded-xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800">
                  <span className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider block mb-1">
                    Executive Analysis Summary
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {dataAnalysisResult.summary}
                  </p>
                </div>

                {/* Key Insights & Formulas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Insights */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2">
                      Key Quantitative Takeaways
                    </span>
                    <ul className="space-y-2">
                      {(dataAnalysisResult.keyInsights || []).map((insight: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <span className="text-cyan-500 font-bold shrink-0">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Formulas */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2">
                      Excel / Google Sheets Formulas
                    </span>
                    <div className="space-y-2">
                      {(dataAnalysisResult.formulas || []).map((formula: string, idx: number) => (
                        <div key={idx} className="p-2.5 rounded bg-slate-950 text-slate-200 font-mono text-xs flex items-center justify-between gap-2 border border-slate-800">
                          <code className="text-emerald-400 overflow-x-auto">{formula}</code>
                          <button
                            onClick={() => copyToClipboard(formula, `form-${idx}`)}
                            className="text-slate-400 hover:text-white shrink-0"
                          >
                            {copiedKey === `form-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Simulated Visual Chart */}
                {dataAnalysisResult.chartSuggestion && (
                  <div className="p-5 rounded-xl bg-slate-900 text-white border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                          Recommended Visualization: {dataAnalysisResult.chartSuggestion.title}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {dataAnalysisResult.chartSuggestion.type} chart
                      </span>
                    </div>

                    {/* Interactive Visual Bar Representation */}
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-300 font-mono">
                          <span>Enterprise AI Automation</span>
                          <span>98% Demand (+28% Salary Premium)</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full rounded-full w-[98%]" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-300 font-mono">
                          <span>Prompt Architecture & Delimiters</span>
                          <span>94% Demand (+18% Salary Premium)</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full w-[94%]" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-300 font-mono">
                          <span>AI Security & Privacy Defenses</span>
                          <span>92% Demand (+31% Salary Premium)</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full rounded-full w-[92%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 4: VIBE CODING SPEC STUDIO */}
        {/* ------------------------------------------------------------------ */}
        {activeSandboxTab === 'vibe' && (
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  <span>Vibe Coding Architecture & Spec Studio</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Describe software intent in natural language. Generate production specs and prompts for AI coding assistants.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300">
                  Spec-Driven Development
                </span>
              </div>
            </div>

            <div className="my-6 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Application Idea or Feature Description
              </label>
              <textarea
                rows={4}
                value={appIdea}
                onChange={(e) => setAppIdea(e.target.value)}
                placeholder="Describe what you want to build (e.g. 'A CRM lead triage agent that writes to Airtable via webhooks')..."
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 leading-relaxed font-sans"
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                disabled={loading}
                onClick={handleGenerateVibeSpec}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-md shadow-violet-600/25 active:scale-95"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Architecting Application Spec...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Vibe Coding Spec (+50 XP)</span>
                  </>
                )}
              </button>
            </div>

            {vibeSpecResult && (
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Production Architecture Spec</span>
                  </h4>
                  <button
                    onClick={() => copyToClipboard(vibeSpecResult, 'vibe-spec')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white shadow-sm transition-colors"
                  >
                    {copiedKey === 'vibe-spec' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Full Spec</span>
                  </button>
                </div>

                <pre className="p-5 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800 max-h-96">
                  {vibeSpecResult}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
