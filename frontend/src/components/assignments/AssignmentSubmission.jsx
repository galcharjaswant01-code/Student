import React, { useState, useRef } from 'react';

import { X, UploadCloud, File, XCircle, CheckCircle, Loader2 } from 'lucide-react';
import { assignmentAPI } from '../../services/mockDjangoApi';

const AssignmentSubmission = ({ assignment, isOpen, onClose, onSubmitted }) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submissionText, setSubmissionText] = useState('');
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen || !assignment) return null;

  const isResubmission = assignment.status === 'Graded' || assignment.status === 'Submitted';

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesSelected(e.target.files);
    }
  };

  const handleFilesSelected = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).filter(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      return ['pdf', 'docx', 'doc', 'ppt', 'pptx', 'zip'].includes(ext);
    });
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (files.length === 0) return;
    
    setIsSubmitting(true);
    setUploadProgress(10);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 200);

    try {
      const formData = new FormData();
      files.forEach(f => formData.append('files', f));
      
      const updatedAssignment = await assignmentAPI.submitAssignment(assignment.id, formData);
      
      setUploadProgress(100);
      clearInterval(progressInterval);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setFiles([]);
        setUploadProgress(0);
        onSubmitted(updatedAssignment);
      }, 500);
      
    } catch (error) {
      console.error('Submission failed', error);
      setIsSubmitting(false);
      setUploadProgress(0);
      clearInterval(progressInterval);
    }
  };

  const handleGenerateFeedback = async () => {
    if (!submissionText) return;
    setIsGeneratingFeedback(true);
    try {
      const token = localStorage.getItem('access_token');
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiBaseUrl}/api/v1/assignments/${assignment.id}/generate_feedback/`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: submissionText })
      });
      if (response.ok) {
        const data = await response.json();
        setAiFeedback(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  return (
    
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          onClick={!isSubmitting ? onClose : undefined}
          className="absolute inset-0 bg-slate-900/60"
        />

        {/* Modal */}
        <div
          className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] rounded-sm overflow-hidden border border-white/20 dark:border-white/10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {isResubmission ? 'Replace Submission' : 'Submit Assignment'}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1 truncate max-w-[300px]">
                {assignment.title}
              </p>
            </div>
            {!isSubmitting && (
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="p-6">
            {isResubmission && (
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-sm flex items-start gap-3">
                <div className="p-1.5 bg-amber-100 dark:bg-amber-500/20 text-amber-600 rounded-full shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400">Warning</h4>
                  <p className="text-xs text-amber-700 dark:text-amber-500/80 mt-1">
                    Uploading a new file will replace your previous submission. Ensure you want to overwrite your existing work before continuing.
                  </p>
                </div>
              </div>
            )}

            {/* Upload Area */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isSubmitting && fileInputRef.current?.click()}
              className={`w-full h-48 border-2 border-dashed rounded-sm flex flex-col items-center justify-center cursor-pointer  ${
                isSubmitting ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
              } ${
                isDragging 
                  ? 'border-primary bg-primary/5 scale-[1.02]' 
                  : 'border-slate-300 dark:border-slate-600 hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                onChange={handleFileChange}
              />
              <div className={`p-4 rounded-full mb-3 ${isDragging ? 'bg-primary/20 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                Drag & Drop files here
              </h3>
              <p className="text-xs text-slate-500">
                or click to browse (PDF, DOCX, PPT, ZIP)
              </p>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6 space-y-3 max-h-[160px] overflow-y-auto custom-scrollbar pr-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Selected Files</h4>
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-sm border border-slate-200 dark:border-white/5">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-white dark:bg-slate-700 rounded-sm text-primary shrink-0">
                        <File className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">{file.name}</p>
                        <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    {!isSubmitting && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-sm shrink-0"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Progress Bar */}
            {isSubmitting && (
              <div className="mt-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" /> Uploading...
                  </span>
                  <span className="text-xs font-bold text-primary">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient- bg-primary rounded-full"
                  />
                </div>
              </div>
            )}
            {/* AI Feedback Section */}
            <div className="mt-6">
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Instant AI Feedback</h4>
              <textarea 
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="Paste your submission draft here to get instant AI feedback before submitting..."
                className="w-full h-24 p-3 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-sm mb-2 custom-scrollbar"
              />
              <button 
                onClick={handleGenerateFeedback}
                disabled={!submissionText || isGeneratingFeedback}
                className="w-full py-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold rounded-sm text-sm border border-indigo-500/20 hover:bg-indigo-500/20 flex items-center justify-center gap-2"
              >
                {isGeneratingFeedback ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {isGeneratingFeedback ? 'Analyzing...' : 'Ask AI for Feedback'}
              </button>

              {aiFeedback && (
                <div className="mt-3 p-4 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-indigo-800 dark:text-indigo-300">Estimated Score: {aiFeedback.score}/100</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">{aiFeedback.summary}</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Strengths:</span>
                      <ul className="list-disc pl-4 mt-1 text-slate-600 dark:text-slate-400">
                        {aiFeedback.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    <div>
                      <span className="font-bold text-amber-600 dark:text-amber-400">Improvements:</span>
                      <ul className="list-disc pl-4 mt-1 text-slate-600 dark:text-slate-400">
                        {aiFeedback.improvements?.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-white/10 flex gap-3">
            <button 
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-sm border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={files.length === 0 || isSubmitting}
              className="flex-1 py-2.5 rounded-sm bg-gradient- bg-primary text-white font-bold flex items-center justify-center gap-2 hover: hover:-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>Submitting...</>
              ) : (
                <><CheckCircle className="w-4 h-4" /> Submit Work</>
              )}
            </button>
          </div>
        </div>
      </div>
    
  );
};

// Also import AlertCircle for the warning
import { AlertCircle } from 'lucide-react';

export default AssignmentSubmission;
