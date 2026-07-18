import React, { useState } from 'react';

import { Code2, Play, Copy, Check, Terminal, Sparkles, ChevronDown } from 'lucide-react';
import { aiApi } from '../../../services/aiApi';

const CodeAssistantWorkspace = ({ isMobileView, onBack, onToggleInsights }) => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('python');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    const response = await aiApi.generateCode(prompt, language);
    setResult(response);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B0F19] relative">
      
      {/* Header */}
      <div className="h-[72px] px-6 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {isMobileView && (
            <button onClick={onBack} className="p-2 -ml-2 text-slate-500 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="w-10 h-10 rounded-sm bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">Code Assistant</h2>
            <p className="text-xs text-slate-500">Generate, debug, and optimize code</p>
          </div>
        </div>
        <button onClick={onToggleInsights} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col lg:flex-row p-4 sm:p-6 gap-6">
        
        {/* Left Side: Prompt Area */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">What do you want to build?</h3>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Write a Django REST API view for user registration with JWT authentication..."
              className="w-full h-32 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 rounded-sm p-4 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500/50 resize-none custom-scrollbar mb-4"
            />
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Language</span>
                <div className="relative">
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="appearance-none bg-slate-100 dark:bg-slate-800 border-none text-sm font-medium text-slate-900 dark:text-white py-2 pl-4 pr-10 rounded-sm focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="html">HTML/CSS</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed -amber-500/20"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating...
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Code
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Explanation Area */}
          
            {result && (
              <div
                className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-sm p-5"
              >
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-2">AI Explanation</h4>
                <p className="text-sm text-emerald-900 dark:text-emerald-100 leading-relaxed">
                  {result.explanation}
                </p>
              </div>
            )}
          
        </div>

        {/* Right Side: Code Preview */}
        <div className="flex-1 flex flex-col bg-[#1E1E1E] rounded-sm border border-slate-200 dark:border-white/10 overflow-hidden min-h-[400px]">
          <div className="h-12 bg-[#2D2D2D] border-b border-black/20 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-mono text-slate-300">result.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : 'cpp'}</span>
            </div>
            <div className="flex items-center gap-2">
              {result && (
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 px-2 py-1 rounded">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-auto custom-scrollbar bg-[#1E1E1E]">
            {isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <p className="text-sm font-mono animate-pulse">Writing optimal code...</p>
              </div>
            ) : result ? (
              <pre className="font-mono text-sm text-emerald-400 leading-loose"><code>{result.code}</code></pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500/50">
                <Code2 className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-sm font-medium">Your generated code will appear here</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CodeAssistantWorkspace;
