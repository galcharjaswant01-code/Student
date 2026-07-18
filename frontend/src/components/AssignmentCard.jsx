import React from 'react';

import { Clock, MoreVertical, UploadCloud, CheckCircle, Trash2 } from 'lucide-react';

const getStatusBadge = (status) => {
  switch(status) {
    case 'Completed': return 'bg-success/10 text-success border-success/20';
    case 'Pending': return 'bg-warning/10 text-warning border-warning/20';
    case 'In Review': return 'bg-primary/10 text-primary border-primary/20';
    case 'Overdue': return 'bg-danger/10 text-danger border-danger/20';
    default: return 'bg-gray-100 text-gray-500';
  }
};

const AssignmentCard = ({ assignment, onUploadClick, onDetailsClick, onComplete, onDelete }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div
      className="card relative group hover: dark:hover:-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-primary/30"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-semibold text-secondary tracking-wider uppercase">{assignment.subject}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusBadge(assignment.status)}`}>
              {assignment.status}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{assignment.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Teacher: {assignment.teacher}</p>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          
          
            {showMenu && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-sm border border-gray-100 dark:border-gray-700 overflow-hidden z-20"
              >
                {assignment.status !== 'Completed' && (
                  <button 
                    onClick={() => { onComplete(assignment); setShowMenu(false); }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <CheckCircle className="w-4 h-4 text-success" />
                    Mark Complete
                  </button>
                )}
                <button 
                  onClick={() => { onDelete(assignment); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-danger hover:bg-danger/10 border-t border-gray-100 dark:border-gray-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Assignment
                </button>
              </div>
            )}
          
        </div>
      </div>

      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4 mr-1.5" />
          <span className={assignment.status === 'Overdue' ? 'text-danger font-medium' : ''}>{assignment.due}</span>
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-300">{assignment.progress}%</span>
      </div>

      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mb-6">
        <div
          className={`h-1.5 rounded-full ${
            assignment.progress === 100 ? 'bg-success' : 'bg-gradient- bg-primary '
          }`}
        />
      </div>

      <div className="flex gap-3">
        <button 
          onClick={() => onUploadClick(assignment)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-sm bg-primary/10 text-primary font-medium hover:bg-primary hover:text-white"
        >
          <UploadCloud className="w-4 h-4" />
          Upload
        </button>
        <button 
          onClick={() => onDetailsClick(assignment)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-sm border border-gray-200 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
