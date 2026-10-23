import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Maximize2,
  Minimize2,
  Trash2,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { ChatMessage } from '../types';

export const AiCopilot: React.FC = () => {
  const {
    copilotOpen,
    setCopilotOpen,
    activeSkillForCopilot,
    setActiveSkillForCopilot,
    apiKey,
    isOnline,
    addXp,
    setActiveSandboxTab,
  } = useApp();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `👋 Welcome! I'm your **VibeAI Copilot** powered by Gemini. 

I'm here to help you master the 15 essential AI skills for 2026. You can ask me to:
- 💡 Explain any concept in simple terms
- 🎯 Critique and optimize your prompts
- 🛠️ Generate real-world project blueprints
- 🧪 Quiz you on edge-case scenarios

How can I help future-proof your workflow today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCopilotOpen(!copilotOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [copilotOpen]);

  const handleSend = async (overridePrompt?: string) => {
    const textToSend = overridePrompt || inputText;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      skillContext: activeSkillForCopilot?.title,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-gemini-api-key': apiKey } : {}),
        },
        body: JSON.stringify({
          message: textToSend.trim(),
          activeSkill: activeSkillForCopilot,
          conversationHistory: messages.slice(-5),
        }),
      });

      const data = await res.json();
      const replyText = data.reply || data.fallback || 'Sorry, I could not generate a response at this time.';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOffline: data.offline,
      };

      setMessages((prev) => [...prev, botMsg]);
      addXp(15);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'assistant',
          text: `⚠️ Error connecting to Gemini API: ${err.message || 'Network failure'}. Falling back to offline guide.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'init-reset',
        sender: 'assistant',
        text: 'Chat history cleared. What skill would you like to explore next?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendToSandbox = (text: string) => {
    setActiveSandboxTab('prompt');
    setCopilotOpen(false);
    const sandboxEl = document.getElementById('vibe-sandbox');
    if (sandboxEl) {
      sandboxEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick contextual prompts
  const quickPrompts = activeSkillForCopilot
    ? [
        `Explain ${activeSkillForCopilot.title} in simple 2026 terms`,
        `Give me 3 production prompt examples for ${activeSkillForCopilot.title}`,
        `What are the most common mistakes people make in ${activeSkillForCopilot.title}?`,
        `Quiz me with a tough real-world scenario on ${activeSkillForCopilot.title}`,
      ]
    : [
        'How do I pick my 4-5 focus skills for 2026?',
        'What is Vibe Coding and how do I start?',
        'Give me a 1-week AI study schedule',
        'How can I prevent AI hallucinations in data analysis?',
      ];

  if (!copilotOpen) {
    return (
      <button
        onClick={() => setCopilotOpen(true)}
        title="Open VibeAI Copilot (⌘K)"
        aria-label="Open VibeAI Copilot"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold text-xs shadow-2xl shadow-violet-600/40 hover:scale-105 active:scale-95 transition-all group"
      >
        <div className="relative">
          <Bot className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
        </div>
        <span className="font-bold">AI Copilot</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-mono">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col transition-all duration-200 animate-in slide-in-from-bottom-4 ${
        expanded
          ? 'inset-4 md:inset-12 rounded-3xl'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[460px] h-[640px] max-h-[85vh] rounded-2xl'
      }`}
    >
      {/* Top Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#090D16]/70 rounded-t-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-0.5 shadow-md">
            <div className="w-full h-full bg-white dark:bg-[#0F172A] rounded-[10px] flex items-center justify-center text-violet-600 dark:text-violet-400">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-slate-900 dark:text-white">VibeAI Copilot</span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                Gemini 3.8
              </span>
            </div>
            {activeSkillForCopilot ? (
              <div className="text-[10px] text-violet-600 dark:text-violet-400 font-medium flex items-center gap-1">
                <span>Context: {activeSkillForCopilot.title}</span>
                <button
                  onClick={() => setActiveSkillForCopilot(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  (reset)
                </button>
              </div>
            ) : (
              <div className="text-[10px] text-slate-400">General Learning Coach</div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            title="Clear Chat History"
            aria-label="Clear chat history"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            title={expanded ? 'Collapse' : 'Expand'}
            aria-label={expanded ? 'Collapse Copilot window' : 'Expand Copilot window'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:block"
          >
            {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setCopilotOpen(false)}
            aria-label="Close Copilot"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
        {messages.map((msg) => {
          const isBot = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed relative group ${
                  isBot
                    ? 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-slate-200/60 dark:border-slate-700/60'
                    : 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                }`}
              >
                {/* Active skill pill on user messages if present */}
                {msg.skillContext && (
                  <span className="block text-[10px] opacity-80 mb-1 font-mono uppercase tracking-wider">
                    Context: {msg.skillContext}
                  </span>
                )}

                <div className="whitespace-pre-wrap leading-relaxed select-text">
                  {msg.text}
                </div>

                {isBot && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono">{msg.timestamp}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyMessage(msg.text, msg.id)}
                        className="hover:text-violet-600 dark:hover:text-violet-400 flex items-center gap-1 transition-colors"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={() => handleSendToSandbox(msg.text)}
                        className="hover:text-cyan-500 flex items-center gap-1 transition-colors"
                      >
                        <Terminal className="w-3 h-3" />
                        <span>Sandbox</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px] font-medium text-slate-400">Gemini is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800/80 overflow-x-auto scrollbar-none flex items-center gap-1.5">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-violet-500 hover:text-violet-600 whitespace-nowrap transition-colors"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] rounded-b-2xl flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            activeSkillForCopilot
              ? `Ask anything about ${activeSkillForCopilot.title}...`
              : 'Ask a question or request a prompt template...'
          }
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-violet-500 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none transition-all"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white transition-all shadow-md shadow-violet-600/25 active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Privacy note */}
      <div className="px-4 py-1.5 bg-slate-50 dark:bg-slate-950 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-200/50 dark:border-slate-800/50">
        <span className="flex items-center gap-1 text-slate-500">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>Local consent: your queries are never trained on</span>
        </span>
        <span className="font-mono">{isOnline ? 'Online' : 'Offline'}</span>
      </div>
    </div>
  );
};
