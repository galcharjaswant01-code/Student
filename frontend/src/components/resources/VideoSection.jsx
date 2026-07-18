import React, { useEffect, useState } from 'react';

import { PlayCircle, Clock, ChevronRight } from 'lucide-react';
import resourcesApi from '../../services/resourcesApi';

const VideoSection = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    resourcesApi.getVideos().then(setVideos);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Video Learning
          </h3>
          <p className="text-sm text-gray-500 mt-1">Continue where you left off</p>
        </div>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-500 flex items-center">
          View all <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div 
            key={video.id}
            className="group cursor-pointer bg-white dark:bg-gray-800 rounded-sm overflow-hidden -[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 dark:border-gray-700/50 hover:"
          >
            {/* Thumbnail */}
            <div className={`h-40 bg-gradient- ${video.thumbnailColor} relative flex items-center justify-center overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10"></div>
              <PlayCircle className="w-12 h-12 text-white/90 drop- group-" />
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>
            </div>
            
            {/* Details */}
            <div className="p-4">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400 px-2.5 py-1 rounded-full mb-3 inline-block">
                {video.subject}
              </span>
              <h4 className="font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">
                {video.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
