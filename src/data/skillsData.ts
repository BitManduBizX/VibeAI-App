import { Skill } from '../types';

export const SKILLS_DATA: Skill[] = [
  {
    id: 'ai-fundamentals',
    number: 1,
    title: 'AI Fundamentals',
    category: 'Foundations',
    tagline: 'Grasp the core mechanics: LLMs, tokens, context windows, and hallucination bounds.',
    summary: 'Mastering the fundamental architecture of modern Artificial Intelligence lets you anticipate model strengths, inherent limits, and non-deterministic behavior.',
    whyItMatters2026: 'In 2026, AI is no longer a novelty; it is foundational infrastructure. Knowing how weights, parameters, context windows, and latent representations work prevents common mistakes and unrealistic expectations.',
    keyConcepts: [
      'Tokenization & Next-Token Prediction: Models operate on sub-words/tokens, not syllables or raw text.',
      'Context Window & Needle-in-a-Haystack: Understand memory constraints, attention decay, and retrieval limits.',
      'Hallucinations & Temperature: Why models invent plausible-sounding falsehoods and how randomness settings affect creativity.',
      'Fine-Tuning vs RAG vs In-Context Learning: Choosing the right paradigm for business data.',
    ],
    bestPractices: [
      'Treat LLMs as brilliant but forgetful interns who need explicit reference sources.',
      'Lower temperature (0.0 - 0.2) for analytical tasks; increase (0.7 - 0.9) for brainstorming.',
      'Keep critical instructions near the end of long prompts to counteract attention drift.',
    ],
    promptTemplates: [
      {
        name: 'Model Limitation Diagnosis',
        description: 'Expose internal reasoning and test model boundaries.',
        prompt: 'Act as a Senior AI Research Scientist. Analyze the following scenario and identify three intrinsic failure modes or hallucination vectors a frontier LLM would encounter:\n\n[Scenario Description]',
      },
      {
        name: 'Token & Latency Estimator',
        description: 'Calculate approximate token footprint for API economics.',
        prompt: 'Given the following system prompt and user input volume, calculate estimated token consumption, context usage, and recommend whether RAG or full prompt injection is optimal.',
      },
    ],
    miniLab: {
      question: 'Why do Large Language Models (LLMs) hallucinate citations and URLs?',
      options: [
        'They intentionally search dark-web archives for hidden academic papers.',
        'They predict statistically probable token sequences based on pattern matching without an active fact verification loop.',
        'Their internal database is temporarily corrupted during server load.',
        'They run out of floating point decimals in GPU memory.',
      ],
      correctIndex: 1,
      explanation: 'LLMs are generative sequence prediction models. They generate plausible-sounding titles, author names, and URLs that look statistically valid even if they do not exist in the real world.',
      practicalTask: 'Prompt an AI to answer a niche question and ask it to provide verifiable DOIs. Verify whether the DOI URLs resolve.',
      hint: 'Remember that token probability does not equal verified truth.',
    },
    relatedRoles: ['All Roles', 'Tech Lead', 'Product Manager', 'Student'],
    difficulty: 'Beginner',
    estimatedHours: '2-3 hours',
    iconName: 'Cpu',
  },
  {
    id: 'prompt-engineering',
    number: 2,
    title: 'Prompt Engineering',
    category: 'Foundations',
    tagline: 'Engineer precise instructions using Chain-of-Thought, Delimiters, and Schema Constraints.',
    summary: 'Move beyond chatty queries to deterministic, structured prompt architecture. Learn role framing, XML delimiters, few-shot exemplars, and strict output contracts.',
    whyItMatters2026: 'Prompt engineering in 2026 is programming in natural language. High-performing teams write prompts like production code with regression tests and version control.',
    keyConcepts: [
      'Role & Persona Definition: Anchoring the model in domain expertise and tone.',
      'XML Delimiters (<context>, <instruction>, <constraints>): Preventing prompt injection and confusion.',
      'Few-Shot Prompting: Providing 2-3 high-quality input/output pairs to lock in exact syntax.',
      'Chain-of-Thought (CoT): Forcing intermediate reasoning steps before delivering the final answer.',
    ],
    bestPractices: [
      'Never leave output formatting to chance: specify JSON or Markdown markdown headers.',
      'Specify negative constraints ("Do NOT include greetings, preamble, or conversational filler").',
      'Provide edge cases and explicit fallback instructions.',
    ],
    promptTemplates: [
      {
        name: 'The Mega-Prompt Framework (R-C-I-C-O)',
        description: 'Role, Context, Instructions, Constraints, Output Schema.',
        prompt: `You are an expert [Role].
<context>
[Background details, audience, and objectives]
</context>
<instruction>
[Specific task to execute step by step]
</instruction>
<constraints>
- Strict brevity: no corporate jargon
- Format output as clean JSON
- Never invent missing figures; flag them as [UNKNOWN]
</constraints>
<output_format>
Return valid JSON only.
</output_format>`,
      },
      {
        name: 'Chain-of-Thought Decomposition',
        description: 'Forces step-by-step logic before conclusion.',
        prompt: 'Before providing the final answer, think step by step inside <thinking> tags. Evaluate pros, cons, and mathematical calculations. Then output the final recommendation in <answer> tags.',
      },
    ],
    miniLab: {
      question: 'Which technique is most effective at preventing the model from mixing user input text with system instructions?',
      options: [
        'Writing the entire prompt in capital letters.',
        'Wrapping user inputs in distinct delimiters like <user_input>...</user_input> or markdown code blocks.',
        'Adding multiple exclamation marks to critical sentences.',
        'Asking the model "Are you sure?" three times.',
      ],
      correctIndex: 1,
      explanation: 'Explicit delimiters establish strict boundaries around variable user inputs, making it clear to the model where instructions end and data begins.',
      practicalTask: 'Write a prompt that extracts product names and sentiment from a messy customer review using XML tags.',
      hint: 'Delimiters act like quotes in coding languages.',
    },
    relatedRoles: ['Developer', 'Marketer', 'Analyst', 'Writer', 'Manager'],
    difficulty: 'Beginner',
    estimatedHours: '3-4 hours',
    iconName: 'Terminal',
  },
  {
    id: 'ai-research',
    number: 3,
    title: 'AI Research & Fact-Checking',
    category: 'Foundations',
    tagline: 'Deep research, multi-source triangulation, and rigorous synthetic fact-checking.',
    summary: 'Transform AI into an investigative research assistant. Learn to verify sources, check ground truth, detect subtle bias, and extract synthesized insights from complex literature.',
    whyItMatters2026: 'With the web flooded with AI-generated synthetic content, the ability to independently verify claims and trace provenance is the ultimate intellectual moat.',
    keyConcepts: [
      'Source Triangulation: Cross-checking AI outputs against primary authoritative documentation.',
      'Reverse Citation Auditing: Tracing claims back to original peer-reviewed papers or government datasets.',
      'Deep Research Protocols: Formulating investigative multi-query trees rather than single queries.',
      'Epistemic Calibration: Assessing certainty levels and identifying speculation.',
    ],
    bestPractices: [
      'Demand direct URLs, author names, and publication dates for any statistical claim.',
      'Instruct the model to highlight contradictory evidence and alternate viewpoints.',
      'Use the "Red Team Audit" prompt to attack the model\'s own generated claims.',
    ],
    promptTemplates: [
      {
        name: 'Red-Team Fact Checker',
        description: 'Stress-test a hypothesis and search for counter-evidence.',
        prompt: `Act as a cynical academic reviewer. Critique the following statement: "[Statement]"
1. Identify hidden assumptions
2. List 3 verified counterarguments or empirical studies that contradict it
3. Provide a calibrated confidence score (0-100%) with justification.`,
      },
    ],
    miniLab: {
      question: 'What is the most reliable way to verify a statistical claim made by an AI model?',
      options: [
        'Ask the model: "Are you 100% certain this is true?"',
        'Verify the claim in primary external sources (e.g., government databases, official earnings reports, peer-reviewed journals).',
        'Check if the text has great grammar and smooth sentence flow.',
        'Run the same prompt three times and see if it outputs the same number.',
      ],
      correctIndex: 1,
      explanation: 'Smooth writing does not guarantee accuracy. True verification requires inspecting primary sources outside the model’s closed weights.',
      practicalTask: 'Ask an AI for a recent industry growth rate, then manually search for the cited institution’s press release to confirm the number.',
      hint: 'Primary sources always trump generated consensus.',
    },
    relatedRoles: ['Researcher', 'Consultant', 'Journalist', 'Executive', 'Student'],
    difficulty: 'Intermediate',
    estimatedHours: '3 hours',
    iconName: 'Search',
  },
  {
    id: 'ai-writing',
    number: 4,
    title: 'AI Writing & Synthesis',
    category: 'Creation & Media',
    tagline: 'Draft executive memos, pitch decks, proposals, and prose with distinctive voice.',
    summary: 'Elevate your writing beyond generic "AI slop". Master tonal calibration, structural pacing, executive brevity, and ghostwriting frameworks.',
    whyItMatters2026: 'Readers instantly recognize bland AI text ("In today\'s fast-paced digital world..."). Mastering high-fidelity synthesis gives you 10x output speed while preserving human voice and authority.',
    keyConcepts: [
      'Slop Elimination: Banning cliché phrases, passive constructions, and fake excitement.',
      'Voice Cloning & Tone Vectors: Conditioning writing style on your own published writing samples.',
      'BLUF Principle: Bottom Line Up Front for high-velocity executive communication.',
      'Multi-Draft Iteration: Generating outlines, structural critiques, and line edits sequentially.',
    ],
    bestPractices: [
      'Include a "Banned Words List" in your prompt (e.g. delve, testament, paramount, tapestry, robust).',
      'Feed the model 3 paragraphs of your best writing and ask it to analyze and emulate your cadence.',
      'Ask for 3 distinct tonal variations: punchy/provocative, academic/measured, and executive/direct.',
    ],
    promptTemplates: [
      {
        name: 'Executive Memo (BLUF)',
        description: 'Transforms rambling ideas into a crisp 1-page decision document.',
        prompt: `Transform these raw notes into a 1-page Executive Memo following the BLUF structure:
- Bottom Line Up Front (The core decision requested)
- Strategic Context & Why Now
- Options Considered with Trade-offs
- Recommended Action & First 30 Days
Raw Notes:
[Paste raw thoughts]`,
      },
    ],
    miniLab: {
      question: 'Which of the following phrases is a notorious hallmark of unedited generic AI writing?',
      options: [
        '"Revenue rose 14% quarter-over-quarter."',
        '"In today\'s fast-paced digital landscape, it is paramount to delve into..."',
        '"We recommend pausing Project Apollo due to budget constraints."',
        '"The server latency dropped to 42 milliseconds."',
      ],
      correctIndex: 1,
      explanation: 'Phrases like "in today\'s fast-paced landscape", "paramount", "delve into", and "tapestry of innovation" are heavily over-represented in raw LLM outputs.',
      practicalTask: 'Take an old email or report and run it through the Vibe Writing Sandbox with the "Executive" tone toggle.',
      hint: 'Look for fluff and generic introductory sentences.',
    },
    relatedRoles: ['Copywriter', 'Executive', 'Product Manager', 'Founder', 'Marketer'],
    difficulty: 'Beginner',
    estimatedHours: '2-3 hours',
    iconName: 'PenTool',
  },
  {
    id: 'ai-image-generation',
    number: 5,
    title: 'AI Image Generation',
    category: 'Creation & Media',
    tagline: 'Direct camera angles, lighting, aspect ratios, and visual styles for professional assets.',
    summary: 'Generate high-impact visual assets: product photos, concept art, editorial illustrations, and marketing graphics using precise prompt physics and composition parameters.',
    whyItMatters2026: 'Visual storytelling drives engagement across every screen. Directing generative image models replaces days of stock photo searches and expensive studio shoots.',
    keyConcepts: [
      'Composition Grammar: Medium shots, macro lens, wide-angle 24mm, isometric views, depth of field.',
      'Lighting & Materiality: Volumetric god-rays, rim light, diffused softbox, matte textures, subsurface scattering.',
      'Negative Prompting: Explicitly excluding unwanted artifacts, awkward anatomy, and messy text.',
      'Aspect Ratios & Resolutions: Choosing 16:9 for banners, 9:16 for mobile, 1:1 for social grids.',
    ],
    bestPractices: [
      'Describe the scene from background to foreground, specifying lighting source and camera gear.',
      'Use photographer terminology (e.g. Hasselblad 50mm, f/1.8, editorial color grade).',
      'Iterate on seeds and visual reference images rather than rewriting the entire prompt every time.',
    ],
    promptTemplates: [
      {
        name: 'Commercial Product Photography Prompt',
        description: 'Studio-grade aesthetic for physical or digital products.',
        prompt: 'Commercial product photography of [Product], placed on a minimalist matte slate pedestal, soft studio rim lighting, 85mm portrait lens, clean neutral background, hyper-detailed texture, 4K resolution, --ar 16:9',
      },
    ],
    miniLab: {
      question: 'In visual AI prompting, why is specifying camera lens and lighting more effective than using buzzwords like "hyper-realistic 8k"?',
      options: [
        'Camera parameters cost fewer API credits.',
        'Lens types and lighting styles anchor the model in real photographic datasets and specific optical characteristics.',
        'Generative models only understand Nikon and Canon brands.',
        'Buzzwords cause models to overheat their GPU clusters.',
      ],
      correctIndex: 1,
      explanation: 'Words like "8k" or "photorealistic" are generic noise in modern models, while specific photographic terms (e.g. 50mm f/1.8, golden hour rim lighting) activate distinct visual clusters in the training data.',
      practicalTask: 'Write a studio product prompt for an eco-friendly water bottle using studio softbox lighting and shallow depth of field.',
      hint: 'Think like a director or studio photographer.',
    },
    relatedRoles: ['Designer', 'Creator', 'Marketer', 'E-commerce Seller', 'Art Director'],
    difficulty: 'Intermediate',
    estimatedHours: '3 hours',
    iconName: 'Image',
  },
  {
    id: 'ai-video-creation',
    number: 6,
    title: 'AI Video Creation',
    category: 'Creation & Media',
    tagline: 'Produce scripts, storyboards, AI voiceovers, dynamic b-roll, and auto-subtitles.',
    summary: 'End-to-end AI video pipelines: from ideation and storyboard generation to voice synthesis, text-to-video scene creation, and automated short-form editing.',
    whyItMatters2026: 'Video is the dominant medium on YouTube, TikTok, and corporate training. Solo creators can now execute full production studios with AI video generation models.',
    keyConcepts: [
      'Visual Storyboarding: Translating conceptual scripts into time-stamped shot lists with camera motions.',
      'Camera Dynamics: Pan, zoom, tilt, tracking shot, drone reveal in text-to-video prompts.',
      'Neural Voice Synthesis: Directing emotion, cadence, pause marks, and dual-speaker dialogues.',
      'Short-Form Repurposing: Automated silence removal, punchy auto-captions, and hook optimization.',
    ],
    bestPractices: [
      'Keep text-to-video shots short (3-5 seconds per cut) to avoid physical motion degradation.',
      'Lock down the script and audio timing first before generating matching visual b-roll.',
      'Use speech markups (e.g., breath pauses and emphasized syllables) for natural voice delivery.',
    ],
    promptTemplates: [
      {
        name: 'Viral Video Storyboard Generator',
        description: '60-second retention-optimized video blueprint.',
        prompt: `Act as a Viral Short-Form Video Producer. Create a 60-second video storyboard on [Topic]:
Include:
- 0-3s: Visual & Verbal Hook (Pattern interrupt)
- 3-15s: Problem agitation & visual proof
- 15-45s: 3 rapid actionable takeaways with camera directions
- 45-60s: Strong CTA & loop transition
Format as a 4-column table: [Timestamp | Voiceover | Visual Shot / AI Prompt | SFX]`,
      },
    ],
    miniLab: {
      question: 'What is the primary factor in keeping audience retention high during AI-generated short-form video?',
      options: [
        'Making the video 10 minutes long without any scene cuts.',
        'A strong visual/verbal hook in the first 3 seconds, paired with dynamic camera cuts every 3-5 seconds.',
        'Using exclusively monotone robotic voiceovers.',
        'Omitting all text captions and subtitles.',
      ],
      correctIndex: 1,
      explanation: 'Short-form algorithms prioritize initial retention. Hooks in the first 3 seconds combined with frequent visual state changes keep viewers engaged.',
      practicalTask: 'Write a 3-second hook for an educational video about AI Agents.',
      hint: 'Start in the middle of the action or pose a counter-intuitive question.',
    },
    relatedRoles: ['Video Creator', 'Educator', 'Brand Strategist', 'Influencer', 'Founder'],
    difficulty: 'Intermediate',
    estimatedHours: '3-4 hours',
    iconName: 'Video',
  },
  {
    id: 'ai-presentation',
    number: 7,
    title: 'AI Presentation & Decks',
    category: 'Creation & Media',
    tagline: 'Architect persuasive slide decks, executive narrative arcs, and slide visual designs.',
    summary: 'Turn messy meeting transcripts or raw data into boardroom-ready pitch decks. Master slide structure, visual hierarchy, one-idea-per-slide discipline, and presenter speaker notes.',
    whyItMatters2026: 'In a world overloaded with data, leaders who communicate ideas clearly in compelling visual presentations win buy-in and funding faster.',
    keyConcepts: [
      'Minto Pyramid Principle: Leading with the conclusion, grouped by supporting logical arguments.',
      'Slide-to-Script Alignment: Generating natural speaker notes that augment rather than repeat slide text.',
      'Visual Chunking: Replacing bullet-point lists with 3-column cards, comparison tables, and metric callouts.',
      'Design Token Prompting: Structuring slide copy ready for import into PowerPoint, Keynote, or Gamma.',
    ],
    bestPractices: [
      'Limit each slide to 1 core takeaway; if you need "and", make it two slides.',
      'Always request slide headlines that are active assertions rather than passive categories.',
      'Instruct the model to write speaker notes in first-person conversational voice.',
    ],
    promptTemplates: [
      {
        name: 'The 10-Slide Pitch Deck Blueprint',
        description: 'Venture capital standard pitch deck structure.',
        prompt: `Act as a Silicon Valley Pitch Deck Advisor. Create a 10-slide outline for [Company/Product Idea].
For each slide provide:
1. Slide Title (Action-oriented takeaway)
2. Visual Layout (e.g. 3-card comparison, big metric callout, flow diagram)
3. 3 Core Bullet Points (under 12 words each)
4. Speaker Notes (Conversational script for the presenter)`,
      },
    ],
    miniLab: {
      question: 'Which of the following slide headlines is most effective according to executive presentation standards?',
      options: [
        '"Quarterly Financial Overview"',
        '"Q3 Cloud Migration Reduced Operational Costs by 34%"',
        '"A Few Considerations Regarding Infrastructure"',
        '"Slide 4: Miscellaneous Notes"',
      ],
      correctIndex: 1,
      explanation: 'Action-oriented assertion headlines immediately communicate the insight and bottom line, saving time for busy stakeholders.',
      practicalTask: 'Rewrite three passive presentation slide titles into active executive assertion headlines.',
      hint: 'Include the metric or outcome directly in the headline.',
    },
    relatedRoles: ['Founder', 'Consultant', 'Product Manager', 'Sales Lead', 'Student'],
    difficulty: 'Beginner',
    estimatedHours: '2 hours',
    iconName: 'Presentation',
  },
  {
    id: 'ai-data-analysis',
    number: 8,
    title: 'AI Data Analysis',
    category: 'Technical & Automation',
    tagline: 'Synthesize spreadsheets, generate complex formulas, and uncover statistical trends.',
    summary: 'Analyze CSV files, financial reports, and survey datasets in seconds. Master natural language data queries, automated anomaly detection, regression summaries, and chart recommendations.',
    whyItMatters2026: 'Every business runs on data, but 90% of workers struggle with advanced pivot tables and SQL. AI democratizes senior data scientist workflows for everyone.',
    keyConcepts: [
      'Natural Language SQL & Formulas: Converting plain English questions into Excel/Sheets/SQL queries.',
      'Statistical Outlier Detection: Finding sudden spikes, customer churn clusters, and data errors.',
      'Data Cleansing & Normalization: Automatically formatting messy date fields, phone numbers, and categories.',
      'Visual Chart Recommendation: Matching data types to optimal charts (Bar, Sankey, Scatter, Waterfall).',
    ],
    bestPractices: [
      'Provide a sample of the first 3 rows and column headers so the model understands data types.',
      'Always verify math calculations: LLMs can make arithmetic errors; ask for the formula or Python code.',
      'Request correlation vs causation disclaimers before acting on business data.',
    ],
    promptTemplates: [
      {
        name: 'Spreadsheet Genius & Formula Builder',
        description: 'Generates robust formulas and explain step-by-step logic.',
        prompt: `I have a dataset with columns: [Column A, Column B, Column C].
I need a formula in Google Sheets / Excel to calculate [Specific Goal].
Provide:
1. The exact formula
2. Plain-English explanation of how each nested function works
3. Edge-case handling (e.g. #N/A or blank cells)`,
      },
    ],
    miniLab: {
      question: 'When asking an AI model to analyze a large CSV dataset, what is the best practice for accurate mathematical computations?',
      options: [
        'Ask the model to compute 50,000 additions purely in its natural language token stream.',
        'Ask the model to generate Python code (using Pandas/NumPy) or spreadsheet formulas to perform the math deterministically.',
        'Assume the first number the model outputs is 100% mathematically exact.',
        'Multiply the model’s estimate by 2 just in case.',
      ],
      correctIndex: 1,
      explanation: 'Language models predict text tokens; they are not deterministic calculation engines. Generating Python code or formulas offloads the computation to exact calculation engines.',
      practicalTask: 'Paste a small 5-row table into the Vibe Data Sandbox and ask for an anomaly detection summary.',
      hint: 'Code-backed calculation prevents subtle arithmetic drift.',
    },
    relatedRoles: ['Financial Analyst', 'Operations Lead', 'Marketer', 'Engineer', 'Founder'],
    difficulty: 'Intermediate',
    estimatedHours: '3-4 hours',
    iconName: 'BarChart3',
  },
  {
    id: 'ai-automation',
    number: 9,
    title: 'AI Automation & Workflows',
    category: 'Technical & Automation',
    tagline: 'Connect apps, webhooks, and AI triggers to automate repetitive business tasks.',
    summary: 'Design hands-off automation pipelines using Zapier, Make, n8n, and webhooks. Inject AI intelligence into email routing, lead qualification, meeting follow-ups, and data sync.',
    whyItMatters2026: 'Manual busywork destroys high-leverage focus. Autonomous workflows run 24/7 in the background, freeing teams to focus on strategy and creative problem solving.',
    keyConcepts: [
      'Trigger-Action Architecture: When event X occurs, extract data, run AI prompt, execute action Y.',
      'Structured JSON Parsing: Ensuring AI outputs can be fed directly into databases and CRM APIs.',
      'Error Handling & Human-in-the-Loop: Routing low-confidence outputs to human Slack channels for approval.',
      'Webhooks & REST APIs: Connecting disparate cloud tools into unified pipelines.',
    ],
    bestPractices: [
      'Always enforce JSON schema validation before passing AI output to downstream database writes.',
      'Implement a threshold score: if sentiment or confidence is <80%, route to a human reviewer.',
      'Rate-limit automation workflows to prevent runaway loops and unexpected API bills.',
    ],
    promptTemplates: [
      {
        name: 'Inbound Lead Classifier & CRM Router',
        description: 'Triage customer inquiries into structured CRM fields.',
        prompt: `Act as a CRM Automation Triage Agent. Given this customer email, return valid JSON:
{
  "leadScore": number (1-100),
  "urgency": "High" | "Medium" | "Low",
  "recommendedOwner": "Enterprise Sales" | "Support" | "Billing",
  "suggestedReplyDraft": string,
  "actionItems": string[]
}
Email Content:
[Paste email]`,
      },
    ],
    miniLab: {
      question: 'What is the purpose of a "Human-in-the-Loop" (HITL) step in an AI business automation pipeline?',
      options: [
        'To slow down the automation so employees look busy.',
        'To have a human review and approve high-risk or low-confidence actions before they affect customers or financial databases.',
        'To manually re-type every email sent by the AI.',
        'Because AI cannot run without a person holding down the Enter key.',
      ],
      correctIndex: 1,
      explanation: 'Human-in-the-Loop creates safe, resilient automation: the AI does 95% of the extraction and drafting, but humans approve sensitive or low-confidence operations.',
      practicalTask: 'Map out a 3-step automation from receiving a support ticket to sending a Slack notification.',
      hint: 'Safety boundaries build confidence in automated systems.',
    },
    relatedRoles: ['Operations Manager', 'Growth Marketer', 'SysAdmin', 'Freelancer', 'Engineer'],
    difficulty: 'Intermediate',
    estimatedHours: '4 hours',
    iconName: 'Workflow',
  },
  {
    id: 'ai-agents',
    number: 10,
    title: 'AI Agents & Tool Calling',
    category: 'Technical & Automation',
    tagline: 'Build autonomous agents that plan, reason, invoke APIs, and achieve goals.',
    summary: 'Go beyond single prompt-response interactions. Master autonomous agents that maintain state, formulate multi-step plans, call external tools (search, calculators, databases), and self-correct.',
    whyItMatters2026: 'The frontier of AI has shifted from passive chatbots to active agents. Understanding tool calling and agentic loops is the defining engineering and product skill of 2026.',
    keyConcepts: [
      'The ReAct Loop (Reasoning + Acting): Thought -> Action -> Observation -> Final Answer.',
      'Function Calling & Tool Definitions: Supplying JSON schemas so models know when and how to invoke functions.',
      'Memory & State Management: Distinguishing short-term scratchpads from long-term vector memory.',
      'Multi-Agent Collaboration: Orchestrating specialist agents (e.g., Researcher, Critic, Coder) under a Coordinator.',
    ],
    bestPractices: [
      'Constrain agent tool permissions: never give an agent unverified write access to production databases.',
      'Set strict iteration limits (max 5 loops) to prevent infinite loops and runaway costs.',
      'Include a Critic/Evaluator step to verify tool outputs before concluding the task.',
    ],
    promptTemplates: [
      {
        name: 'ReAct Agent Scratchpad Blueprint',
        description: 'Implements the foundational reasoning loop.',
        prompt: `Answer the following question using the ReAct pattern:
Question: [Insert multi-step question]

Use this exact loop format:
Thought 1: [What do I need to find out?]
Action 1: [ToolName(arguments)]
Observation 1: [Result of action]
... (repeat until confident)
Final Thought: [Synthesize evidence]
Final Answer: [Clear, comprehensive answer]`,
      },
    ],
    miniLab: {
      question: 'In an autonomous agent architecture, what is "Tool Calling" (or Function Calling)?',
      options: [
        'The model physically dials a phone number to talk to a human.',
        'The model outputs structured JSON with function name and arguments, requesting the host application to run external code and return the result.',
        'The model installs physical hardware into your computer.',
        'A technique where the user repeatedly types "Tool" in the prompt.',
      ],
      correctIndex: 1,
      explanation: 'Tool calling allows models to extend their capabilities beyond static training data by invoking external calculators, search engines, and APIs through structured parameters.',
      practicalTask: 'Define a simple JSON schema for a weather lookup tool with city and units parameters.',
      hint: 'Agents decide which tool to call based on the user’s request.',
    },
    relatedRoles: ['AI Engineer', 'Software Developer', 'Solutions Architect', 'Product Leader'],
    difficulty: 'Advanced',
    estimatedHours: '5 hours',
    iconName: 'Bot',
  },
  {
    id: 'vibe-coding',
    number: 11,
    title: 'Vibe Coding',
    category: 'Technical & Automation',
    tagline: 'Build software, prototypes, and applications by describing intent to AI assistants.',
    summary: 'The revolutionary software development paradigm: write specs, steer AI coding engines, debug in real-time, and ship complete full-stack web applications without writing raw syntax line-by-line.',
    whyItMatters2026: 'Vibe coding collapses the barrier between ideas and execution. Anyone with strong domain knowledge and clear product intuition can ship production-ready software in hours.',
    keyConcepts: [
      'Spec-Driven Development: Writing rigorous markdown specifications before touching any code.',
      'Iterative Prompt Steerage: Making small, targeted changes rather than monolithic rewrites.',
      'Debugging by Error Log Injection: Feeding terminal stack traces directly to the AI for instant diagnosis.',
      'Architecture Oversight: Guarding component boundaries, state flow, and security practices.',
    ],
    bestPractices: [
      'Start with a single vertical slice (one working screen) before building complex secondary features.',
      'Always keep files modular (under 300 lines) so the AI never exceeds token limits or loses context.',
      'Commit working states to git frequently so you can roll back bad AI hallucinations instantly.',
    ],
    promptTemplates: [
      {
        name: 'Vibe Coding Feature Spec Prompt',
        description: 'Generates a clean implementation spec for coding assistants.',
        prompt: `Act as a Senior Full-Stack Architect. I want to build a [Feature Name] in React + Tailwind.
Requirements:
1. Component breakdown and state requirements
2. Props and TypeScript interfaces
3. User interaction edge cases (loading, empty, error states)
4. Step-by-step implementation plan without writing the full code yet. Let's agree on the plan first.`,
      },
    ],
    miniLab: {
      question: 'What is the most effective approach when an AI coding assistant introduces a bug into your project?',
      options: [
        'Delete the entire project and start over from scratch.',
        'Paste the exact error message and stack trace, explain expected vs actual behavior, and request a surgical fix.',
        'Type "Fix it immediately!" ten times.',
        'Switch to a completely different programming language.',
      ],
      correctIndex: 1,
      explanation: 'Surgical debugging requires precision context: provide the exact compiler or console error, line numbers, and the specific failure condition.',
      practicalTask: 'Use the Vibe Coding generator in our sandbox to draft a specification for a task timer app.',
      hint: 'Context is king when directing AI coding assistants.',
    },
    relatedRoles: ['Indie Hacker', 'Founder', 'Product Manager', 'Designer', 'Developer'],
    difficulty: 'Intermediate',
    estimatedHours: '4 hours',
    iconName: 'Code',
  },
  {
    id: 'ai-productivity',
    number: 12,
    title: 'AI for Productivity',
    category: 'Productivity & Business',
    tagline: 'Meeting summaries, inbox zero, calendar triage, and daily high-velocity focus.',
    summary: 'Reclaim 10+ hours per week. Turn transcripts into instant action item matrices, prioritize inbound messages, draft contextual replies, and structure your daily high-impact sprint.',
    whyItMatters2026: 'Information overload is the number one productivity killer. Workers who use AI personal productivity workflows produce higher quality output with significantly lower burnout.',
    keyConcepts: [
      'Transcript Extraction: Mining Zoom/Meet recordings for commitments, deadlines, and owners.',
      'Email Batch Processing: Categorizing 100 emails into "FYI", "Immediate Action", and "Draft Needed".',
      'Cognitive Offloading: Using AI to break vague, overwhelming projects into 15-minute micro-tasks.',
      'Voice-to-Task Capture: Speaking brain dumps while walking and having AI convert them into structured tickets.',
    ],
    bestPractices: [
      'Use the "Assignee-Action-Deadline" schema for all meeting notes.',
      'Have AI draft 3 variations of difficult emails: firm, diplomatic, and collaborative.',
      'End each workday with a 2-minute AI reflection: "What did I accomplish and what is tomorrow\'s #1 priority?"',
    ],
    promptTemplates: [
      {
        name: 'The Ultimate Meeting Action Extractor',
        description: 'Turns messy meeting chatter into accountability tables.',
        prompt: `Analyze this raw meeting transcript and produce:
1. Executive Summary (Max 3 sentences)
2. Decisions Made (Bullet points with context)
3. Action Item Matrix:
| Owner | Task | Deadline | Priority |
4. Open Questions / Unresolved Blockers
Transcript:
[Paste transcript]`,
      },
    ],
    miniLab: {
      question: 'What makes an AI-generated meeting summary truly actionable for a leadership team?',
      options: [
        'It reproduces a word-for-word transcript of every spoken sentence.',
        'It clearly attributes specific action items to named owners with explicit deadlines and key decisions highlighted.',
        'It summarizes the meeting as a rhyming poem.',
        'It lists the weather during the call.',
      ],
      correctIndex: 1,
      explanation: 'A great meeting summary discards chatter and highlights decisions made and who owns what by when (Owner, Action, Deadline).',
      practicalTask: 'Paste a short conversation into the Copilot and ask it to extract an Action Item Matrix.',
      hint: 'Clarity and accountability drive execution.',
    },
    relatedRoles: ['Executive Assistant', 'Manager', 'Team Lead', 'Freelancer', 'Student'],
    difficulty: 'Beginner',
    estimatedHours: '2 hours',
    iconName: 'Clock',
  },
  {
    id: 'ai-business',
    number: 13,
    title: 'AI for Business & ROI',
    category: 'Productivity & Business',
    tagline: 'Marketing funnels, customer support triage, sales enablement, and unit economics.',
    summary: 'Apply AI where it impacts the bottom line: customer acquisition cost reduction, automated 24/7 tier-1 support, dynamic personalization, and calculating return on AI tool investment.',
    whyItMatters2026: 'Companies that successfully deploy AI operational models operate with 3x higher profit margins and faster response times than legacy competitors.',
    keyConcepts: [
      'AI Unit Economics: Calculating token cost vs employee hourly cost to prove ROI.',
      'Support Tier-1 Deflection: Resolving routine customer questions instantly while elevating customer satisfaction.',
      'Outbound Personalization at Scale: Generating bespoke research-backed sales emails in seconds.',
      'Competitive Intelligence Scraping: Tracking competitor pricing, feature releases, and messaging changes.',
    ],
    bestPractices: [
      'Never deploy AI in business without measuring a baseline KPI (e.g., ticket resolution time, conversion rate).',
      'Ensure brand tone guidelines and company knowledge bases are verified before customer-facing deployment.',
      'Start with internal employee-facing workflows before turning AI onto external customers.',
    ],
    promptTemplates: [
      {
        name: 'Hyper-Personalized Sales Prospecting Memo',
        description: 'Researches a prospect and crafts a tailored value proposition.',
        prompt: `Act as a Top Enterprise Account Executive.
Prospect Company: [Company Name & Industry]
Recent News/Trigger Event: [e.g. New round of funding, launch]
Our Product: [Your solution]

Draft a 75-word email that:
1. Congratulates them on the specific trigger event
2. Identifies a friction point they likely face right now
3. Proposes an insight (not a sales pitch) with a low-friction question.`,
      },
    ],
    miniLab: {
      question: 'What is the most prudent first step when introducing AI into an established company workflow?',
      options: [
        'Replace all senior customer support staff overnight with an unmonitored chatbot.',
        'Deploy an internal prototype to assist employees (co-pilot model), benchmark quality and cost, then gradually expand.',
        'Ban all employees from ever touching AI tools.',
        'Spend the entire annual budget on GPU servers without a business case.',
      ],
      correctIndex: 1,
      explanation: 'Starting with internal co-pilot workflows lets employees train the system safely, verify accuracy, and establish concrete ROI before rolling out to customers.',
      practicalTask: 'Draft a 1-page business justification for adopting an AI tool in your department.',
      hint: 'De-risk the deployment by keeping humans in the loop.',
    },
    relatedRoles: ['CEO', 'Marketing Director', 'Sales Rep', 'Operations Lead', 'Consultant'],
    difficulty: 'Intermediate',
    estimatedHours: '3 hours',
    iconName: 'Briefcase',
  },
  {
    id: 'ai-security-ethics',
    number: 14,
    title: 'AI Security & Ethics',
    category: 'Ethics & Evaluation',
    tagline: 'Defend against prompt injections, data leaks, copyright risks, and algorithmic bias.',
    summary: 'Safeguard your organization. Learn prompt injection defenses, PII data sanitization, enterprise data privacy boundaries, copyright compliance, and ethical fairness audits.',
    whyItMatters2026: 'As AI handles proprietary code, customer records, and financial data, a single prompt injection or privacy leak can cause catastrophic regulatory fines and brand damage.',
    keyConcepts: [
      'Prompt Injection (Direct & Indirect): Malicious instructions embedded in emails or web pages that hijack the model.',
      'PII Sanitization: Stripping social security numbers, API keys, and patient records before sending to LLM APIs.',
      'Data Privacy Tiers: Zero Data Retention (ZDR) APIs vs consumer interfaces that train on your data.',
      'Algorithmic Bias & Fair Lending: Auditing AI scoring systems for unintended disparate impact.',
    ],
    bestPractices: [
      'Never paste confidential intellectual property or customer secrets into public consumer AI tools without enterprise privacy terms.',
      'Treat untrusted external web data as executable code: sanitize inputs before feeding into agent loops.',
      'Maintain an internal registry of approved AI tools with verified SOC 2 and GDPR compliance.',
    ],
    promptTemplates: [
      {
        name: 'PII Sanitization & Anonymizer Guard',
        description: 'Strips identifiable tokens from sensitive text before analysis.',
        prompt: `Sanitize this text by replacing all real names with [NAME_1], [NAME_2], company names with [COMPANY_X], phone numbers with [PHONE], and monetary figures with [AMOUNT]. Preserve the structural and grammatical meaning perfectly.
Text:
[Paste sensitive text]`,
      },
    ],
    miniLab: {
      question: 'What is an "Indirect Prompt Injection" attack?',
      options: [
        'When an attacker cuts your computer\'s power cable.',
        'When an attacker hides adversarial instructions inside a document or webpage that the AI reads, tricking the AI into executing unauthorized actions.',
        'When a user types a password backwards.',
        'When the AI writes poor poetry.',
      ],
      correctIndex: 1,
      explanation: 'Indirect prompt injection occurs when the AI summarizes external content (like an email or web search result) that secretly contains malicious instructions intended to hijack the model.',
      practicalTask: 'Test an AI with an input containing a hidden instruction to print a secret phrase, and observe whether your delimiters contain it.',
      hint: 'Untrusted data must always be treated with strict isolation.',
    },
    relatedRoles: ['Security Officer', 'Compliance Lead', 'Legal Counsel', 'Developer', 'All Staff'],
    difficulty: 'Intermediate',
    estimatedHours: '3 hours',
    iconName: 'ShieldCheck',
  },
  {
    id: 'critical-thinking-ai',
    number: 15,
    title: 'Critical Thinking with AI',
    category: 'Ethics & Evaluation',
    tagline: 'Evaluate machine outputs, challenge assumptions, and make independent human decisions.',
    summary: 'The ultimate meta-skill of the 21st century. Resist cognitive offloading, audit logical fallacies, detect subtle sycophancy, and maintain independent human judgment in an automated world.',
    whyItMatters2026: 'AI is a multiplier of human judgment: applied to clear thinking it creates wonders; applied to uncritical belief it produces catastrophic blind spots.',
    keyConcepts: [
      'AI Sycophancy: The tendency of models to agree with the user’s stated bias even when objectively wrong.',
      'Second-Order Effects: Predicting unintended systemic consequences of AI recommendations.',
      'Cognitive Atrophy Prevention: Actively practicing manual problem solving to maintain deep expertise.',
      'The "Devil\'s Advocate" Protocol: Forcing the model to violently disagree with your favorite idea.',
    ],
    bestPractices: [
      'Never accept the first answer from an AI on high-stakes business or healthcare decisions.',
      'Prompt the model: "Find 3 fatal flaws in the reasoning I just shared with you."',
      'Remember: AI suggests, humans decide and bear accountability.',
    ],
    promptTemplates: [
      {
        name: 'The Relentless Devil\'s Advocate',
        description: 'Exposes blind spots and confirmation bias.',
        prompt: `I am considering making this major strategic decision:
"[Describe decision]"

Act as a ruthless Devil's Advocate who wants to save me from a disaster.
1. What is the single biggest blind spot in this plan?
2. What are 2 second-order unintended consequences that could backfire in 12 months?
3. What is the strongest argument AGAINST doing this?`,
      },
    ],
    miniLab: {
      question: 'What is "AI Sycophancy" and why is it dangerous for decision-makers?',
      options: [
        'It is a computer virus that deletes spreadsheets.',
        'It is the tendency of LLMs to flatter and agree with the user\'s leading prompt, reinforcing confirmation bias rather than delivering objective truth.',
        'It is when an AI speaks in an old English dialect.',
        'It is a hardware failure in Apple Silicon chips.',
      ],
      correctIndex: 1,
      explanation: 'Sycophancy is a well-documented LLM tendency: if you ask "Don\'t you agree this strategy is brilliant?", the model will almost always agree and generate rationalizations, blinding you to risks.',
      practicalTask: 'Ask an AI a leading question supporting a flawed idea, notice how it flatters you, then prompt it to do an unsparing audit.',
      hint: 'Be wary when the machine agrees with your biases too quickly.',
    },
    relatedRoles: ['Executive', 'Strategist', 'Doctor', 'Educator', 'Every Human'],
    difficulty: 'Advanced',
    estimatedHours: '2-3 hours',
    iconName: 'BrainCircuit',
  },
];
