import React from 'react';

import { Clock, MoreVertical, UploadCloud, CheckCircle, FileText, AlertCircle } from 'lucide-react';

const getStatusBadge = (status) => {
  switch(status) {
    case 'Graded': 
    case 'Completed': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 -emerald-500/10';
    case 'Submitted': 
    case 'Under Review': return 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20 -blue-500/10';
    case 'In Progress': return 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20 -amber-500/10';
    case 'Overdue': return 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20 -red-500/10';
    case 'Not Started':
    default: return 'bg-slate-50 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400 border-slate-200 dark:border-slate-500/20 -slate-500/10';
  }
};

const getPriorityColor = (priority) => {
  if (priority === 'Critical') return 'bg-red-500 -red-500/30';
  if (priority === 'High') return 'bg-orange-500 -orange-500/30';
  if (priority === 'Medium') return 'bg-blue-500 -blue-500/30';
  return 'bg-slate-400 -slate-400/30';
};

const AssignmentCard = ({ assignment, viewMode = 'grid', onUploadClick, onDetailsClick }) => {
  const isGrid = viewMode === 'grid';
  
  // Calculate days left
  const dueDate = new Date(assignment.dueDate);
  const now = new Date();
  const diffTime = dueDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let dueText = `Due in ${diffDays} days`;
  if (diffDays < 0) dueText = `Overdue by ${Math.abs(diffDays)} days`;
  if (diffDays === 0) dueText = 'Due Today';

  if (!isGrid) {
    return (
      <div
        className="flex items-center justify-between p-4 mb-3 bg-white/70 dark:bg-slate-800/70 rounded-sm border border-white/20 dark:border-white/10 hover: group cursor-pointer"
        onClick={() => onDetailsClick(assignment)}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-2 h-10 rounded-full ${getPriorityColor(assignment.priority)}  shrink-0`} />
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary">{assignment.title}</h3>
            <p className="text-xs text-slate-500 font-medium">{assignment.subject} • {assignment.teacher.name}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className={`text-xs px-2.5 py-1 rounded-full border  ${getStatusBadge(assignment.status)}`}>
              {assignment.status}
            </span>
          </div>
          <div className="flex flex-col items-end w-32">
            <div className={`flex items-center text-xs font-semibold ${diffDays <= 2 && diffDays >= 0 ? 'text-amber-500' : diffDays < 0 ? 'text-red-500' : 'text-slate-500'}`}>
              <Clock className="w-3.5 h-3.5 mr-1" />
              {dueText}
            </div>
            <p className="text-[10px] text-slate-400">{dueDate.toLocaleDateString()}</p>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onUploadClick(assignment); }}
            className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-sm shrink-0"
          >
            <UploadCloud className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col p-6 bg-white/70 dark:bg-slate-800/70 rounded-sm border border-white/20 dark:border-white/10 -[0_8px_30px_rgb(0,0,0,0.04)] dark:-[0_8px_30px_rgb(0,0,0,0.1)] group relative overflow-hidden"
    >
      {/* Priority Indicator Line */}
      <div className={`absolute top-0 left-0 w-full h-1 ${getPriorityColor(assignment.priority)}`} />

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md tracking-wide">
            {assignment.subject}
          </span>
          {assignment.marks !== null && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 px-2 py-1 rounded-md">
              {assignment.marks}/{assignment.maxMarks}
            </span>
          )}
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border  ${getStatusBadge(assignment.status)}`}>
          {assignment.status}
        </span>
      </div>

      <div className="flex-1 mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-primary">
          {assignment.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
          {assignment.description}
        </p>
      </div>

      <div className="flex items-center justify-between text-sm mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-2 min-w-0">
          <img src={assignment.teacher.avatar} alt="Teacher" className="w-6 h-6 rounded-full shrink-0" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">{assignment.teacher.name}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400 shrink-0 ml-2">
          <FileText className="w-4 h-4 shrink-0" />
          <span className="text-xs font-semibold whitespace-nowrap">{assignment.attachedResources.length} Files</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className={`flex items-center text-xs font-bold ${diffDays <= 2 && diffDays >= 0 ? 'text-amber-500' : diffDays < 0 ? 'text-red-500' : 'text-slate-500'}`}>
          <Clock className="w-4 h-4 mr-1.5 shrink-0" />
          <span className="truncate">{dueText}</span>
        </div>
        {assignment.priority === 'Critical' && (
          <div className="flex items-center text-xs font-bold text-red-500 animate-pulse shrink-0 ml-2">
            <AlertCircle className="w-3.5 h-3.5 mr-1" /> Critical
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-auto">
        <button 
          onClick={() => onDetailsClick(assignment)}
          className="flex-1 px-1 py-2.5 rounded-sm border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 whitespace-nowrap"
        >
          Details
        </button>
        <button 
          onClick={() => onUploadClick(assignment)}
          className={`flex-[1.2] px-1 py-2.5 rounded-sm text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 whitespace-nowrap  ${
            assignment.status === 'Graded' || assignment.status === 'Submitted' 
              ? 'bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 -slate-500/20' 
              : 'bg-gradient- bg-primary  hover:-primary/40'
          }`}
        >
          {assignment.status === 'Graded' || assignment.status === 'Submitted' ? (
            <>View Work</>
          ) : (
            <><UploadCloud className="w-3.5 h-3.5 shrink-0" /> Submit</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
