import React, { useState, useRef } from 'react';

import { FileText, UploadCloud, CheckCircle2, AlertCircle, X, ChevronRight, Download } from 'lucide-react';
import { aiApi } from '../../../services/aiApi';

const ResumeAnalyzerWorkspace = ({ isMobileView, onBack, onToggleInsights }) => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const analyzeResume = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    const analysis = await aiApi.analyzeResume(file);
    setResult(analysis);
    setIsAnalyzing(false);
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
          <div className="w-10 h-10 rounded-sm bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">Resume Analyzer</h2>
            <p className="text-xs text-slate-500">ATS Scoring & Optimization</p>
          </div>
        </div>
        <button onClick={onToggleInsights} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {!result && (
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className={`border-2 border-dashed rounded-sm p-12 text-center  ${
                file ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 bg-white dark:bg-slate-900'
              }`}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".pdf,.doc,.docx" />
              
              {file ? (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-rose-100 dark:bg-rose-500/20 text-rose-500 rounded-sm flex items-center justify-center mb-4 -rose-500/20">
                    <FileText className="w-10 h-10" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">{file.name}</h3>
                  <p className="text-sm text-slate-500 mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  
                  <div className="flex gap-3">
                    <button onClick={() => setFile(null)} className="px-5 py-2.5 rounded-sm font-medium text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800">
                      Cancel
                    </button>
                    <button 
                      onClick={analyzeResume}
                      disabled={isAnalyzing}
                      className="px-6 py-2.5 rounded-sm font-bold text-white bg-rose-500 hover:bg-rose-600 -rose-500/30 flex items-center gap-2 disabled:opacity-70"
                    >
                      {isAnalyzing ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</>
                      ) : 'Analyze Resume'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-6">
                    <UploadCloud className="w-10 h-10" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Upload your Resume</h3>
                  <p className="text-sm text-slate-500 mb-8 max-w-sm">Drag and drop your PDF or DOCX file here, or click to browse. We'll analyze it against top ATS algorithms.</p>
                  <button onClick={() => fileInputRef.current?.click()} className="px-8 py-3 rounded-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 -indigo-600/30">
                    Browse Files
                  </button>
                </div>
              )}
            </div>
          )}

          
            {result && (
              <div className="space-y-6">
                
                {/* Score Header */}
                <div className="bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-8 flex flex-col md:flex-row items-center gap-8">
                  <div className="relative w-32 h-32 flex shrink-0 items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="8" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className={`${result.atsScore >= 75 ? 'text-emerald-500' : 'text-amber-500'}`} strokeWidth="8" strokeDasharray={`${result.atsScore * 2.82} 282`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">{result.atsScore}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Score</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">ATS Compatibility</h3>
                    <p className="text-slate-500 leading-relaxed">{result.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                      <button className="px-4 py-2 rounded-sm bg-slate-100 dark:bg-slate-800 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2">
                        <Download className="w-4 h-4" /> Download Report
                      </button>
                      <button onClick={() => {setResult(null); setFile(null);}} className="px-4 py-2 rounded-sm border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
                        Analyze Another
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Improvements */}
                  <div className="bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" /> Improvement Suggestions
                    </h4>
                    <ul className="space-y-3">
                      {result.improvements.map((imp, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 items-start">
                          <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5"><ChevronRight className="w-3 h-3" /></span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Keywords */}
                  <div className="bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Recommended Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.keywordsToInclude.map((kw, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-sm text-sm font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}
          

        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzerWorkspace;
