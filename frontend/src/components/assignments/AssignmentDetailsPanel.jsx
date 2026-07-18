import React from 'react';

import { X, FileText, Calendar, Clock, Link as LinkIcon, User, Download, UploadCloud, CheckCircle } from 'lucide-react';
import TeacherFeedback from './TeacherFeedback';

const getStatusBadge = (status) => {
  switch(status) {
    case 'Graded': 
    case 'Completed': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
    case 'Submitted': 
    case 'Under Review': return 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
    case 'In Progress': return 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
    case 'Overdue': return 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20';
    case 'Not Started':
    default: return 'bg-slate-50 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400 border-slate-200 dark:border-slate-500/20';
  }
};

const AssignmentDetailsPanel = ({ assignment, isOpen, onClose, onUploadClick }) => {
  if (!isOpen || !assignment) return null;

  return (
    
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40"
        />

        {/* Panel */}
        <div
          className="relative w-full max-w-2xl h-full bg-white dark:bg-[#0B1120] overflow-y-auto custom-scrollbar border-l border-white/20 dark:border-white/10"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/80 dark:bg-[#0B1120]/80 border-b border-slate-200 dark:border-white/10 p-6 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md tracking-wide">
                  {assignment.subject}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border  ${getStatusBadge(assignment.status)}`}>
                  {assignment.status}
                </span>
                {assignment.priority === 'Critical' && (
                  <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-md">Critical</span>
                )}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {assignment.title}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            
            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-sm border border-slate-100 dark:border-white/5">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/> Due Date</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{new Date(assignment.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> Time</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{new Date(assignment.dueDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><User className="w-3.5 h-3.5"/> Teacher</p>
                <div className="flex items-center gap-2">
                  <img src={assignment.teacher.avatar} alt="Teacher" className="w-5 h-5 rounded-full" />
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{assignment.teacher.name}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><FileText className="w-3.5 h-3.5"/> Max Marks</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{assignment.maxMarks} Points</p>
              </div>
            </div>

            {/* Content sections */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Description</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                {assignment.description}
              </p>
            </div>

            {assignment.instructions && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Instructions</h3>
                <div className="p-4 bg-primary/5 border border-primary/10 rounded-sm">
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line text-sm leading-relaxed">
                    {assignment.instructions}
                  </p>
                </div>
              </div>
            )}

            {/* Resources */}
            {assignment.attachedResources && assignment.attachedResources.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-slate-400" /> Attached Resources
                </h3>
                <div className="space-y-3">
                  {assignment.attachedResources.map((resource, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-sm hover:border-primary/30 group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-sm">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-white group-hover:text-primary">{resource.name}</p>
                          <p className="text-xs text-slate-400">{resource.type} • {resource.size}</p>
                        </div>
                      </div>
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-sm">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback / Submission Status */}
            {assignment.feedback ? (
              <TeacherFeedback feedback={assignment.feedback} marks={assignment.marks} maxMarks={assignment.maxMarks} />
            ) : assignment.submission ? (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Your Submission</h3>
                <div className="p-5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 rounded-full">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-emerald-800 dark:text-emerald-400">Successfully Submitted</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-500">
                        {new Date(assignment.submission.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {assignment.submission.files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-white/60 dark:bg-slate-900/40 rounded-sm">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{file.name}</span>
                        <span className="text-xs text-slate-500">{file.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-white/80 dark:bg-[#0B1120]/80 border-t border-slate-200 dark:border-white/10 p-6 flex gap-4">
            <button 
              onClick={onClose}
              className="px-6 py-3 rounded-sm border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Close
            </button>
            <button 
              onClick={() => { onClose(); onUploadClick(assignment); }}
              className={`flex-1 py-3 rounded-sm text-white font-bold flex items-center justify-center gap-2   ${
                assignment.status === 'Graded' || assignment.status === 'Submitted'
                  ? 'bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 -slate-500/20'
                  : 'bg-gradient- bg-primary  hover:-primary/40'
              }`}
            >
              {assignment.status === 'Graded' || assignment.status === 'Submitted' ? (
                <>Replace Submission</>
              ) : (
                <><UploadCloud className="w-5 h-5" /> Submit Assignment</>
              )}
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default AssignmentDetailsPanel;
