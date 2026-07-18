import React from 'react';

import { FileText, FileCode, PlayCircle, BookOpen, Download, Bookmark, Star } from 'lucide-react';

const getResourceIcon = (type) => {
  switch (type) {
    case 'pdf': return <FileText className="w-8 h-8 text-rose-500" />;
    case 'code': return <FileCode className="w-8 h-8 text-blue-500" />;
    case 'video': return <PlayCircle className="w-8 h-8 text-indigo-500" />;
    case 'notes': return <BookOpen className="w-8 h-8 text-emerald-500" />;
    case 'ebook': return <BookOpen className="w-8 h-8 text-amber-500" />;
    default: return <FileText className="w-8 h-8 text-slate-500" />;
  }
};

const ResourceCard = ({ resource, onBookmark, onDownload, onClick }) => {
  return (
    <div
      onClick={() => onClick && onClick(resource)}
      className="group flex flex-col bg-white/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-white/5 rounded-sm -[0_8px_30px_rgb(0,0,0,0.04)] dark:-[0_8px_30px_rgb(0,0,0,0.1)] overflow-hidden cursor-pointer hover: hover:border-indigo-500/30"
    >
      <div className="relative w-full h-40 overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
        {resource.thumbnail ? (
          <>
            <img 
              src={resource.thumbnail} 
              alt={resource.title}
              className="w-full h-full object-cover group- opacity-60"
            />
            <div className="absolute inset-0 bg-gradient- bg-slate-900/80" />
          </>
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-800" />
        )}
        
        {/* Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-sm bg-white/10 border border-white/20 flex items-center justify-center transform group-">
            {getResourceIcon(resource.type)}
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white bg-black/40 rounded-sm border border-white/20">
            {resource.type}
          </span>
          <button 
            onClick={(e) => { e.stopPropagation(); onBookmark(resource.id); }}
            className={`p-2 rounded-sm  border border-white/20  ${
              resource.isBookmarked 
                ? 'bg-amber-500/90 text-white' 
                : 'bg-black/40 text-white/70 hover:bg-black/60 hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${resource.isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-2">
            {resource.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-md">
            {resource.category}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-md">
            {resource.subject}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
              {resource.rating}
            </div>
            <div className="text-xs font-medium text-slate-500">
              {resource.size || resource.duration}
            </div>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onDownload(resource.id); }}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 px-3 py-1.5 rounded-sm"
          >
            <Download className="w-4 h-4" />
            <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
