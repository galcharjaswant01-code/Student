import React, { useState, useRef } from 'react';

import { Library, UploadCloud, AlignLeft, Sparkles, FileText, ChevronRight } from 'lucide-react';
import { aiApi } from '../../../services/aiApi';

const NotesSummarizerWorkspace = ({ isMobileView, onBack, onToggleInsights }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleGenerate = async () => {
    if (!text.trim() && !file) return;
    setIsGenerating(true);
    
    try {
      let contentToSummarize = text;
      
      // If a file is provided, try to extract text locally (basic text extraction)
      // Note: Full PDF/DOCX parsing requires a backend or heavy frontend library,
      // but we'll read .txt files correctly here and simulate the rest.
      if (file) {
        if (file.name.endsWith('.txt')) {
          contentToSummarize = await file.text();
        } else {
          // Mock content extraction for PDF/DOCX for this demo
          contentToSummarize = `Extracted content from ${file.name}. This document covers important concepts that will be on the exam.`;
        }
      }
      
      const data = await aiApi.summarizeNotes(contentToSummarize);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
          <div className="w-10 h-10 rounded-sm bg-fuchsia-500/10 text-fuchsia-500 flex items-center justify-center">
            <Library className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">Notes Summarizer</h2>
            <p className="text-xs text-slate-500">Extract key points and summary</p>
          </div>
        </div>
        <button onClick={onToggleInsights} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col lg:flex-row p-4 sm:p-6 gap-6">
        
        {/* Left Side: Input */}
        <div className="flex-1 flex flex-col gap-4 min-w-[300px]">
          <div className="bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-5 flex flex-col h-full min-h-[400px]">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Paste Notes or Upload Document</h3>
            
            <div className="flex-1 flex flex-col gap-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={!!file}
                placeholder="Paste your lecture notes here..."
                className="flex-1 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 rounded-sm p-4 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-fuchsia-500/50 resize-none custom-scrollbar disabled:opacity-50"
              />
              
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                <span className="text-xs font-bold text-slate-400 uppercase">OR</span>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
              </div>

              <div 
                className={`border-2 border-dashed rounded-sm p-6 text-center  ${
                  file ? 'border-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-500/10' : 'border-slate-300 dark:border-slate-700 hover:border-fuchsia-500'
                }`}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".txt,.pdf,.doc,.docx" />
                {file ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-fuchsia-500" />
                      <div className="text-left">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{file.name}</p>
                        <p className="text-[10px] text-slate-500">{(file.size/1024/1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button onClick={() => setFile(null)} className="text-slate-400 hover:text-rose-500 text-sm">Remove</button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <UploadCloud className="w-8 h-8 text-slate-400" />
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Upload PDF or Document</p>
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating || (!text.trim() && !file)}
              className="mt-4 flex items-center justify-center gap-2 bg-fuchsia-500 hover:bg-fuchsia-600 text-white w-full py-3 rounded-sm font-bold disabled:opacity-50 -fuchsia-500/20"
            >
              {isGenerating ? (
                <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing Document...</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Summarize Notes</>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="flex-[1.5] bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-5 overflow-y-auto custom-scrollbar min-h-[400px]">
          {!result ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <AlignLeft className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-sm font-medium">Your summary will appear here</p>
            </div>
          ) : (
            
              <div className="space-y-6">
                
                <div>
                  <h3 className="text-sm font-bold text-fuchsia-500 uppercase tracking-wider mb-3">Executive Summary</h3>
                  <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-500/10 border border-fuchsia-200 dark:border-fuchsia-500/20 rounded-sm">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{result.summary}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Key Takeaways</h3>
                  <ul className="space-y-2">
                    {result.keyPoints.map((pt, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 items-start p-3 bg-slate-50 dark:bg-[#0B0F19] rounded-sm border border-slate-100 dark:border-slate-800">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0"><ChevronRight className="w-3 h-3" /></span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>



              </div>
            
          )}
        </div>

      </div>
    </div>
  );
};

export default NotesSummarizerWorkspace;
