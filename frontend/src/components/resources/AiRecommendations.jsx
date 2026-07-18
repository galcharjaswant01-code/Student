import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, BrainCircuit } from 'lucide-react';
import resourcesApi from '../../services/resourcesApi';

const AiRecommendations = () => {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    resourcesApi.getRecommendations().then(setRecs);
  }, []);

  return (
    <div className="bg-gradient- bg-indigo-900 rounded-sm p-6 -[0_10px_30px_rgba(79,70,229,0.15)] flex flex-col h-full relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10 flex items-center gap-2 mb-6 text-white">
        <BrainCircuit className="w-6 h-6 text-purple-300" />
        <h3 className="font-bold text-lg">AI Recommendations</h3>
      </div>

      <div className="relative z-10 flex flex-col gap-4 flex-1">
        {recs.map((rec) => (
          <div key={rec.id} className="bg-white/10 border border-white/10 rounded-sm p-4 hover:bg-white/15">
            <div className="flex items-start gap-3">
              <Sparkles className={`w-5 h-5 shrink-0 mt-0.5 ${rec.priority === 'high' ? 'text-amber-300' : 'text-blue-300'}`} />
              <div>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {rec.text}
                </p>
                <button className="mt-3 text-xs font-semibold text-white flex items-center gap-1 hover:text-purple-300">
                  Take Action <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AiRecommendations;
