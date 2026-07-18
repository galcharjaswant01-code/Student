import React, { useState, useEffect } from 'react';

import { Sparkles, ArrowRight, BrainCircuit, Target, Clock } from 'lucide-react';
import { resourcesAPI } from '../../services/mockDjangoResourcesApi';

const AIResourceInsights = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await resourcesAPI.getAIRecommendations();
        setRecommendations(data);
      } catch (e) {
        console.error("Failed to load AI recommendations", e);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-48 bg-slate-200/50 dark:bg-slate-800/50 animate-pulse rounded-sm" />
    );
  }

  return (
    <div className="bg-gradient- bg-indigo-900 p-6 md:p-8 rounded-sm -[0_8px_30px_rgb(0,0,0,0.12)] text-white relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-white/20" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2.5 bg-white/10 rounded-sm">
          <BrainCircuit className="w-6 h-6 text-yellow-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">AI Study Insights</h2>
          <p className="text-indigo-200 text-sm font-medium">Smart recommendations based on your activity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {recommendations.map((rec) => (
          <div 
            key={rec.id}
            className="bg-white/10 border border-white/20 p-5 rounded-sm flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-lg text-white leading-tight flex-1">{rec.title}</h3>
              <div className="bg-white/20 p-1.5 rounded-sm shrink-0 ml-3">
                <Target className="w-4 h-4 text-yellow-300" />
              </div>
            </div>
            
            <p className="text-sm text-indigo-100/90 mb-5 flex-1">{rec.reason}</p>
            
            <button className="w-full py-2.5 bg-white text-indigo-900 font-bold text-sm rounded-sm hover:bg-indigo-50 flex items-center justify-center gap-2 group/btn">
              {rec.actionText} 
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIResourceInsights;
