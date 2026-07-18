import React from 'react';

import { Sparkles, Play } from 'lucide-react';

const FeaturedBanner = () => {
  return (
    <div
      className="relative w-full rounded-sm overflow-hidden bg-gray-900 text-white min-h-[280px] flex items-center -[0_10px_30px_rgba(37,99,235,0.15)] group"
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient- bg-gray-900 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" 
          alt="Abstract representation of AI"
          className="w-full h-full object-cover opacity-60 group-"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 p-8 md:p-12 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold mb-4 text-blue-300">
          <Sparkles className="w-3.5 h-3.5" />
          Featured Series
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Mastering AI-Assisted Development
        </h2>
        
        <p className="text-gray-300 text-sm md:text-base mb-8 max-w-lg leading-relaxed">
          Unlock the true potential of modern coding by integrating large language models directly into your daily workflow. A completely free 5-part video series.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-sm font-semibold -[0_0_20px_rgba(37,99,235,0.4)]">
            <Play className="w-5 h-5 fill-current" />
            Watch First Episode
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-sm font-semibold border border-white/10">
            View Syllabus
          </button>
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/40 blur-[100px] rounded-full pointer-events-none z-10" />
      <div className="absolute -top-24 right-20 w-64 h-64 bg-purple-600/30 blur-[100px] rounded-full pointer-events-none z-10" />
    </div>
  );
};

export default FeaturedBanner;
