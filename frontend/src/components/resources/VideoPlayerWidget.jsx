import React, { useState, useEffect } from 'react';
import { PlayCircle, Download, X, Bookmark, BookmarkCheck, Maximize2, SkipForward } from 'lucide-react';
import { resourcesAPI } from '../../services/mockDjangoResourcesApi';

const VideoPlayerWidget = ({ resource, onClose, onFullscreen }) => {
  const [isBookmarked, setIsBookmarked] = useState(resource?.isBookmarked || false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!resource) return null;

  const handleBookmark = async () => {
    try {
      const res = await resourcesAPI.toggleBookmark(resource.id);
      setIsBookmarked(res.isBookmarked);
    } catch (e) {
      console.error(e);
    }
  };

  // Simulate updating watch progress every 10 seconds
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        resourcesAPI.trackVideoProgress(resource.id, Math.floor(Date.now() / 1000));
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, resource.id]);

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-sm overflow-hidden border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-sm">
            <PlayCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold line-clamp-1">{resource.title}</h3>
            <p className="text-xs text-slate-400">
              {resource.author} • {resource.duration}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleBookmark}
            className={`p-2 rounded-sm  ${isBookmarked ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </button>
          <button 
            onClick={onFullscreen}
            className="p-2 hover:bg-slate-800 text-slate-400 rounded-sm hidden sm:block"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-slate-700 mx-1" />
          <button 
            onClick={onClose}
            className="p-2 hover:bg-red-500/20 hover:text-red-400 text-slate-400 rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Player Area */}
      <div className="flex-1 relative bg-black flex flex-col">
        {resource.videoUrl ? (
          <iframe 
            src={`${resource.videoUrl}?autoplay=1`}
            className="w-full h-full flex-1"
            allow="autoplay; encrypted-media"
            allowFullScreen
            onLoad={() => setIsPlaying(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
            <PlayCircle className="w-20 h-20 mb-4 opacity-50" />
            <p>Video source unavailable</p>
          </div>
        )}

        {/* Video Overlay Info / Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
          <div className="bg-black/60 px-3 py-1.5 rounded-sm text-white/90 text-sm font-bold pointer-events-auto border border-white/10">
            {resource.category}
          </div>
        </div>
      </div>

      {/* Playlist / Next Up Simulation */}
      <div className="bg-slate-900 p-4 border-t border-white/10 flex items-center justify-between text-white">
        <div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Up Next</p>
          <p className="font-bold text-sm">Advanced Graph Algorithms</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-sm font-bold text-sm -indigo-600/20">
          Play Next <SkipForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayerWidget;
