import React from 'react';

import { SearchX } from 'lucide-react';
import ResourceCard from './ResourceCard';

const ResourceList = ({ resources, loading, onBookmark, onDownload, onResourceClick }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="h-72 bg-slate-200/50 dark:bg-slate-800/50 animate-pulse rounded-sm" 
          />
        ))}
      </div>
    );
  }

  if (!resources || resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 dark:text-slate-400">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8 opacity-50" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No resources found</h3>
        <p className="text-sm">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      
        {resources.map((resource) => (
          <ResourceCard 
            key={resource.id} 
            resource={resource} 
            onBookmark={onBookmark}
            onDownload={onDownload}
            onClick={onResourceClick}
          />
        ))}
      
    </div>
  );
};

export default ResourceList;
