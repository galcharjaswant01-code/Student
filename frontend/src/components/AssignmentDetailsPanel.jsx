import React from 'react';

import { X, Clock, FileText, UploadCloud } from 'lucide-react';

const getStatusBadge = (status) => {
  switch(status) {
    case 'Completed': return 'bg-success/10 text-success border-success/20';
    case 'Pending': return 'bg-warning/10 text-warning border-warning/20';
    case 'In Review': return 'bg-primary/10 text-primary border-primary/20';
    case 'Overdue': return 'bg-danger/10 text-danger border-danger/20';
    default: return 'bg-gray-100 text-gray-500';
  }
};

const AssignmentDetailsPanel = ({ assignment, onClose, onUploadClick }) => {
  return (
    
      {assignment && (
        <>
          <div
            className="fixed inset-0 z-[90] bg-black/40"
            onClick={onClose}
          />
          <div
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-dark-surface z-[100] border-l border-gray-200 dark:border-gray-800 flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
              <h2 className="font-bold text-xl">Assignment Details</h2>
              <button onClick={onClose} className="p-2 bg-white dark:bg-gray-800 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <X className="w-5 h-5"/>
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-secondary tracking-wider uppercase">{assignment.subject}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusBadge(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{assignment.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 flex items-center">
                  <Clock className="w-4 h-4 mr-1.5"/> Due: {assignment.due}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Instructions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Please complete all questions in the problem set. Show all your work for full credit. 
                  Submit your final answers as a single PDF document. Make sure to adhere to the formatting guidelines discussed in lecture.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Attached Resources</h4>
                <div className="flex items-center p-3 rounded-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <FileText className="w-8 h-8 text-secondary p-1.5 bg-secondary/10 rounded-sm mr-3" />
                  <div>
                    <p className="font-medium text-sm">Problem_Set_4_Reference.pdf</p>
                    <p className="text-xs text-gray-500">2.4 MB • PDF Document</p>
                  </div>
                </div>
              </div>

              {assignment.status === 'In Review' && (
                <div className="p-4 rounded-sm bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <h4 className="font-semibold text-primary mb-1 text-sm">Teacher Comment ({assignment.teacher})</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Your initial draft looks good, but please double check the calculation on question 3.</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-surface">
              <button 
                onClick={() => { onClose(); onUploadClick(); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-primary text-white font-medium hover:bg-blue-700 -primary/30 .5"
              >
                <UploadCloud className="w-5 h-5" />
                Upload Work
              </button>
            </div>
          </div>
        </>
      )}
    
  );
};

export default AssignmentDetailsPanel;
