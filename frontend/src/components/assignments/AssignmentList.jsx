import React from 'react';

import AssignmentCard from './AssignmentCard';
import { Search } from 'lucide-react';

const AssignmentList = ({ assignments, loading, viewMode, onUploadClick, onDetailsClick }) => {

  if (loading) {
    return (
      <div className={`w-full ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'flex flex-col gap-4'}`}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className={`bg-slate-200 dark:bg-slate-800 rounded-sm animate-pulse ${viewMode === 'grid' ? 'h-[320px]' : 'h-24 rounded-sm'}`} />
        ))}
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div
        className="w-full h-64 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-800/50 rounded-sm border border-white/20 dark:border-white/10 border-dashed"
      >
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <Search className="w-8 h-8 text-primary opacity-50" />
        </div>
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Assignments Found</h3>
        <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'flex flex-col'}`}>
      
        {assignments.map(assignment => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            viewMode={viewMode}
            onUploadClick={onUploadClick}
            onDetailsClick={onDetailsClick}
          />
        ))}
      
    </div>
  );
};

export default AssignmentList;
