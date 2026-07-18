import React, { useState, useRef } from 'react';
import { analyzeResume } from '../../services/aiService';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setResponse('');

    try {
      const stream = await analyzeResume(file);
      for await (const part of stream) {
        setResponse((prev) => prev + (part.text || ''));
      }
    } catch (error) {
      setResponse('Failed to analyze the resume. Please ensure it is a valid document.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/30 rounded-sm p-6 border border-slate-700/50 -[0_0_50px_rgba(0,0,0,0.3)] flex flex-col h-full w-full max-h-[calc(100vh-140px)]">
      <div className="flex items-center justify-between mb-6 border-b border-slate-700/50 pb-4 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-sm bg-gradient- bg-orange-400 flex items-center justify-center -orange-500/20">
            <span className="text-2xl">📄</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Resume Analyzer</h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-orange-400 text-xs font-medium uppercase tracking-wider">AI-powered ATS screening & feedback</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 overflow-hidden">
        
        {/* Upload Column */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-900/50 border border-slate-700/50 rounded-sm">
          <div 
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`w-full max-w-md border-2 border-dashed rounded-sm p-12 text-center cursor-pointer   flex flex-col items-center justify-center gap-4 ${
              isDragOver ? 'border-orange-500 bg-orange-500/10 scale-[1.02]' : 'border-slate-600 hover:border-orange-400 hover:bg-white/5'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".pdf,.doc,.docx,.txt" 
              className="hidden" 
            />
            <div className={`w-20 h-20 rounded-full flex items-center justify-center  ${file ? 'bg-green-500/20' : 'bg-slate-800'}`}>
              <span className="text-4xl">{file ? '✅' : '📁'}</span>
            </div>
            <div>
              <p className="text-slate-200 font-bold text-lg mb-1">
                {file ? file.name : "Drop your resume here"}
              </p>
              <p className="text-slate-500 text-sm font-medium">
                {file ? "Ready to analyze" : "or click to browse files (PDF, DOCX)"}
              </p>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="mt-8 bg-gradient- bg-orange-500 hover:bg-orange-400 hover: text-slate-900 px-12 py-4 rounded-full font-bold text-lg -orange-500/20 disabled:opacity-50 disabled:scale-100 flex items-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                Analyzing Resume...
              </>
            ) : (
              <>
                <span className="text-xl">✨</span> Begin Deep Analysis
              </>
            )}
          </button>
        </div>

        {/* Results Column */}
        <div className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-sm p-6 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4 shrink-0 border-b border-slate-800 pb-2">
            <h3 className="text-orange-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Analysis Results
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            {!response && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center space-y-4">
                <span className="text-5xl opacity-50">🎯</span>
                <p>Upload a resume to get actionable feedback<br/>on ATS compatibility, formatting, and impact.</p>
              </div>
            )}
            {response && (
              <div className="prose prose-invert prose-orange max-w-none">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{response}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
