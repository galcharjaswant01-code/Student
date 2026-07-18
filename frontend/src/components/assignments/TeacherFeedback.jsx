import React from 'react';
import { Award, MessageSquare, Lightbulb, FileText, Download } from 'lucide-react';

const TeacherFeedback = ({ feedback, marks, maxMarks }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
        <Award className="w-5 h-5 text-amber-500" /> Teacher Feedback
      </h3>
      
      <div className="bg-gradient- bg-amber-50 dark:bg-amber-500/10 dark: rounded-sm border border-amber-200/50 dark:border-amber-500/20 overflow-hidden">
        
        {/* Grade Banner */}
        <div className="p-5 border-b border-amber-200/50 dark:border-amber-500/20 flex items-center justify-between bg-white/40 dark:bg-slate-900/40">
          <div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider mb-1">Final Score</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{marks}</span>
              <span className="text-sm font-semibold text-slate-500">/ {maxMarks}</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
              {marks >= maxMarks * 0.9 ? 'A' : marks >= maxMarks * 0.8 ? 'B' : marks >= maxMarks * 0.7 ? 'C' : 'F'}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Comments */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> General Comments
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {feedback.comments}
            </p>
          </div>

          {/* Suggestions */}
          {feedback.improvementSuggestions && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" /> Improvement Suggestions
              </p>
              <div className="p-3 bg-white/60 dark:bg-slate-900/40 rounded-sm border border-white/50 dark:border-white/5">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{feedback.improvementSuggestions}"
                </p>
              </div>
            </div>
          )}

          {/* Reviewed Files */}
          {feedback.reviewedFiles && feedback.reviewedFiles.length > 0 && (
            <div className="pt-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Annotated Files
              </p>
              <div className="space-y-2">
                {feedback.reviewedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-white/80 dark:bg-slate-800 rounded-sm border border-amber-100 dark:border-amber-500/10 group hover:border-amber-300 dark:hover:border-amber-500/30">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-sm">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-600">{file.name}</span>
                    </div>
                    <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-sm">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TeacherFeedback;
