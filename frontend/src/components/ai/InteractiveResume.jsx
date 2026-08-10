import React from 'react';
import { FileCheck, AlertCircle, CheckCircle2, Tag } from 'lucide-react';

const InteractiveResume = ({ data }) => {
  const atsScore = data?.atsScore ?? 80;
  const summary = data?.summary || '';
  const improvements = data?.improvements || [];
  const keywords = data?.keywordsToInclude || [];

  let scoreColor = 'text-emerald-600 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40';
  if (atsScore < 60) scoreColor = 'text-red-600 border-red-500 bg-red-50 dark:bg-red-950/40';
  else if (atsScore < 80) scoreColor = 'text-amber-600 border-amber-500 bg-amber-50 dark:bg-amber-950/40';

  return (
    <div className="my-3 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 shadow-sm space-y-4 max-w-xl">
      {/* Score & Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm">
          <FileCheck className="w-4 h-4" />
          <span>ATS Resume Compatibility Report</span>
        </div>

        <div className={`px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-1.5 ${scoreColor}`}>
          <span>ATS Score: {atsScore} / 100</span>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {summary}
        </p>
      )}

      {/* Recommended Improvements */}
      {improvements.length > 0 && (
        <div className="space-y-2">
          <h5 className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Key Improvement Recommendations:</span>
          </h5>
          <div className="space-y-1.5">
            {improvements.map((item, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ATS Keywords Cloud */}
      {keywords.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <h5 className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span>Recommended ATS Keywords to Add:</span>
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-[11px] font-medium">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveResume;
