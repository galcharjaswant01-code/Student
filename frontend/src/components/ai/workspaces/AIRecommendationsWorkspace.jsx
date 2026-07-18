import React from 'react';

import { Sparkles, TrendingUp, BookOpen, Target, ExternalLink, Loader2 } from 'lucide-react';

const AIRecommendationsWorkspace = ({ isMobileView, onBack, onToggleInsights }) => {
  const [isRecalculating, setIsRecalculating] = React.useState(false);
  const [recommendations, setRecommendations] = React.useState({
    weakAreas: [
      { subject: 'Data Structures', score: 65, tip: 'Focus on Graph Algorithms and Dynamic Programming.' },
      { subject: 'Database Design', score: 72, tip: 'Review Normalization and Indexing strategies.' }
    ],
    resources: [
      { title: 'Advanced React Patterns', type: 'Course', platform: 'Frontend Masters', match: '98%' },
      { title: 'System Design Interview', type: 'Book', platform: 'Alex Xu', match: '95%' },
      { title: 'Django REST Framework Deep Dive', type: 'Video', platform: 'YouTube', match: '92%' }
    ],
    career: [
      { role: 'Full Stack Developer', readiness: 85, nextStep: 'Build a complex project with real-time features.' },
      { role: 'Backend Engineer', readiness: 78, nextStep: 'Deepen understanding of Docker and CI/CD.' }
    ]
  });

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setRecommendations(prev => ({
        weakAreas: prev.weakAreas.map(area => ({
          ...area,
          score: Math.min(100, Math.max(30, area.score + Math.floor(Math.random() * 15) - 7))
        })),
        resources: prev.resources.map(res => ({
          ...res,
          match: `${Math.min(100, Math.max(50, parseInt(res.match) + Math.floor(Math.random() * 7) - 3))}%`
        })),
        career: prev.career.map(car => ({
          ...car,
          readiness: Math.min(100, Math.max(40, car.readiness + Math.floor(Math.random() * 11) - 5))
        }))
      }));
      setIsRecalculating(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B0F19] relative">
      
      {/* Header */}
      <div className="h-[72px] px-6 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {isMobileView && (
            <button onClick={onBack} className="p-2 -ml-2 text-slate-500 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="w-10 h-10 rounded-sm bg-violet-500/10 text-violet-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">AI Recommendations</h2>
            <p className="text-xs text-slate-500">Personalized learning insights</p>
          </div>
        </div>
        <button onClick={onToggleInsights} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your Learning Radar</h3>
              <p className="text-slate-500 max-w-2xl">Based on your recent quiz scores, project submissions, and study planner usage, our AI has compiled these personalized insights to accelerate your learning journey.</p>
            </div>
            <button 
              onClick={handleRecalculate}
              disabled={isRecalculating}
              className="flex px-4 py-2 bg-violet-500 text-white rounded-sm font-bold items-center gap-2 shadow-sm shadow-violet-500/30 hover:bg-violet-600 disabled:opacity-70 self-start sm:self-auto"
            >
              {isRecalculating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} 
              {isRecalculating ? 'Recalculating...' : 'Recalculate'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Weak Areas Analysis */}
            <div className="bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-sm bg-rose-100 dark:bg-rose-500/20 text-rose-500 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 transform rotate-180" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white">Attention Areas</h4>
              </div>
              
              <div className="space-y-4">
                {recommendations.weakAreas.map((area, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-[#0B0F19] rounded-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-700 dark:text-slate-300">{area.subject}</span>
                      <span className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-md">{area.score}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mb-3 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${area.score}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">💡 {area.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Curated Resources */}
            <div className="bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-6 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-sm bg-indigo-100 dark:bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white">Curated For You</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.resources.map((res, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(res.title + ' ' + res.platform)}`, '_blank')}
                    className="group p-4 bg-slate-50 dark:bg-[#0B0F19] rounded-sm border border-slate-100 dark:border-slate-800 hover:border-indigo-500/50 cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                      <ExternalLink className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-md">{res.type}</span>
                      <span className="text-[10px] font-medium text-slate-400">{res.platform}</span>
                    </div>
                    <h5 className="font-bold text-slate-900 dark:text-white mb-2 pr-6">{res.title}</h5>
                    <div className="flex items-center gap-2">
                      <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: res.match }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-500 shrink-0">{res.match} Match</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Readiness */}
            <div className="bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-6 lg:col-span-3 bg-gradient- bg-white dark:bg-slate-900 dark: relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Target className="w-48 h-48 text-violet-500" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-sm bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Career Trajectory</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.career.map((car, idx) => (
                    <div key={idx} className="p-5 bg-white dark:bg-slate-800/50 rounded-sm border border-slate-100 dark:border-slate-700/50 flex items-center gap-6">
                      <div className="relative w-20 h-20 flex shrink-0 items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="8" />
                          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-violet-500" strokeWidth="8" strokeDasharray={`${car.readiness * 2.82} 282`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xl font-black text-slate-900 dark:text-white leading-none">{car.readiness}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h5 className="font-bold text-slate-900 dark:text-white mb-1">{car.role}</h5>
                        <p className="text-xs text-slate-500 leading-relaxed mb-3"><strong className="text-slate-700 dark:text-slate-300">Next step:</strong> {car.nextStep}</p>
                        <button 
                          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(car.role + ' career path next steps')}`, '_blank')}
                          className="text-[10px] font-bold text-violet-500 hover:text-violet-600 flex items-center gap-1 bg-violet-50 dark:bg-violet-500/10 px-2.5 py-1.5 rounded-sm"
                        >
                          Explore Path <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationsWorkspace;
