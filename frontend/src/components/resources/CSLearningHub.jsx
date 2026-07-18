import React, { useState, useEffect } from 'react';

import { Network, Search, Lock, PlayCircle, CheckCircle, ChevronRight, LayoutGrid, Code, Server, Database, Brain } from 'lucide-react';
import { resourcesAPI } from '../../services/mockDjangoResourcesApi';

const CSLearningHub = () => {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePathId, setActivePathId] = useState(null);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const data = await resourcesAPI.getCSLearningPaths();
        setPaths(data);
        if (data.length > 0) setActivePathId(data[0].id);
      } catch (e) {
        console.error("Failed to load CS paths", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPaths();
  }, []);

  if (loading) {
    return <div className="w-full h-96 bg-slate-200/50 dark:bg-slate-800/50 animate-pulse rounded-sm" />;
  }

  const activePath = paths.find(p => p.id === activePathId);

  const getCategoryIcon = (category) => {
    if (category.includes('Web')) return <Code className="w-5 h-5" />;
    if (category.includes('Core')) return <Database className="w-5 h-5" />;
    if (category.includes('AI') || category.includes('Machine')) return <Brain className="w-5 h-5" />;
    return <Server className="w-5 h-5" />;
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Path Selector Sidebar */}
      <div className="w-full xl:w-80 flex flex-col gap-3">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Network className="w-5 h-5 text-primary" /> Learning Roadmaps
        </h3>
        
        {paths.map(path => (
          <button
            key={path.id}
            onClick={() => setActivePathId(path.id)}
            className={`flex items-center gap-4 p-4 rounded-sm border  text-left group ${
              activePathId === path.id 
                ? 'bg-primary text-white border-primary  -primary/20' 
                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-primary/30'
            }`}
          >
            <div className={`p-2 rounded-sm shrink-0  ${
              activePathId === path.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-700 group-hover:text-primary group-hover:bg-primary/10'
            }`}>
              {getCategoryIcon(path.category)}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm line-clamp-2">{path.title}</h4>
              <p className={`text-xs mt-1 ${activePathId === path.id ? 'text-white/80' : 'text-slate-500'}`}>
                {path.progress}% Complete
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Active Path Details */}
      <div className="flex-1 bg-white/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-white/5 rounded-sm p-6 -slate-200/10 dark:-none">
        
          {activePath && (
            <div
              key={activePath.id}
              className="h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-sm mb-3">
                    {activePath.category}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{activePath.title}</h2>
                </div>
                
                <div className="text-right hidden sm:block">
                  <div className="text-3xl font-black text-primary">{activePath.progress}%</div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Overall Progress</div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="relative flex-1">
                <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-slate-100 dark:bg-slate-700" />
                
                <div className="space-y-6 relative z-10">
                  {activePath.modules.map((mod, i) => (
                    <div key={mod.id} className="flex gap-5 group">
                      <div className="shrink-0 relative">
                        {mod.status === 'completed' ? (
                          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center -emerald-500/20 ring-4 ring-white dark:ring-slate-800">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        ) : mod.status === 'in-progress' ? (
                          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center -primary/30 ring-4 ring-primary/20 bg-gradient- bg-primary">
                            <PlayCircle className="w-5 h-5 ml-0.5" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center border border-slate-200 dark:border-slate-700 ring-4 ring-white dark:ring-slate-800">
                            <Lock className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      
                      <div className={`flex-1 p-5 rounded-sm border  ${
                        mod.status === 'in-progress' 
                        ? 'bg-primary/5 border-primary/20 ' 
                        : 'bg-white dark:bg-slate-800/40 border-slate-100 dark:border-white/5 group-hover:border-slate-300 dark:group-hover:border-white/10'
                      }`}>
                        <div className="flex items-center justify-between">
                          <h4 className={`font-bold text-base ${
                            mod.status === 'locked' ? 'text-slate-500' : 'text-slate-900 dark:text-white'
                          }`}>
                            <span className="text-sm font-black text-slate-400 mr-2">{i + 1}.</span> 
                            {mod.title}
                          </h4>
                          
                          {mod.status === 'in-progress' && (
                            <button className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2">
                              Continue <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                          {mod.status === 'completed' && (
                            <span className="text-emerald-500 font-bold text-xs uppercase">Completed</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        
      </div>
    </div>
  );
};

export default CSLearningHub;
