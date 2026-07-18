import React, { useState } from 'react';
import { FileText, Download, X, Bookmark, BookmarkCheck, Maximize2 } from 'lucide-react';
import { resourcesAPI } from '../../services/mockDjangoResourcesApi';

const PDFReaderWidget = ({ resource, onClose, onFullscreen }) => {
  const [isBookmarked, setIsBookmarked] = useState(resource?.isBookmarked || false);
  const [progress, setProgress] = useState(0);

  if (!resource) return null;

  const handleBookmark = async () => {
    try {
      const res = await resourcesAPI.toggleBookmark(resource.id);
      setIsBookmarked(res.isBookmarked);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = async () => {
    try {
      await resourcesAPI.downloadResource(resource.id);
      // Simulate download
    } catch (e) {
      console.error(e);
    }
  };

  const handleScroll = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const currentProgress = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
    setProgress(currentProgress);
    
    // Simulate updating backend reading progress periodically
    if (currentProgress % 25 === 0) {
      resourcesAPI.trackReadingProgress(resource.id, currentProgress, 100);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-sm">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{resource.title}</h3>
            <p className="text-xs text-slate-500">
              {resource.author} • {resource.size}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleBookmark}
            className={`p-2 rounded-sm  ${isBookmarked ? 'bg-primary/10 text-primary' : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500'}`}
          >
            {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </button>
          <button 
            onClick={handleDownload}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 rounded-sm"
          >
            <Download className="w-5 h-5" />
          </button>
          <button 
            onClick={onFullscreen}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 rounded-sm hidden sm:block"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1" />
          <button 
            onClick={onClose}
            className="p-2 hover:bg-red-100 hover:text-red-500 text-slate-500 rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Reading Progress Bar */}
      <div className="w-full h-1 bg-slate-100 dark:bg-slate-800">
        <div 
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Fake PDF Content Area */}
      <div 
        className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-100 dark:bg-slate-950 flex justify-center"
        onScroll={handleScroll}
      >
        <div className="w-full max-w-3xl bg-white dark:bg-slate-900 min-h-[150vh] p-12">
          <h1 className="text-3xl font-bold mb-8 text-center border-b pb-8">{resource.title}</h1>
          <div className="space-y-6 text-slate-700 dark:text-slate-300">
            <p className="leading-relaxed">
              This is a simulated PDF viewer. In a real enterprise application, you would integrate a library like `react-pdf` or `pdf.js` here to render actual document pages.
            </p>
            <p className="leading-relaxed">
              Scroll down to test the reading progress tracking feature, which reports back to the mock Django backend APIs!
            </p>
            {/* Generating some fake long content */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="space-y-4 pt-8">
                <h3 className="text-xl font-bold">Section {i + 1}</h3>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-11/12" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-9/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFReaderWidget;
