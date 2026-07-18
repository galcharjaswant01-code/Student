import React from 'react';
import { Target, ArrowRight } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';

const StudyProgressTrackingWidget = () => {
  const goalHours = 40;
  const currentHours = 32;
  const progressPercentage = Math.round((currentHours / goalHours) * 100);

  const doughnutData = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [currentHours, goalHours - currentHours],
      backgroundColor: ['#10B981', 'rgba(148, 163, 184, 0.2)'],
      borderWidth: 0,
      circumference: 270,
      rotation: 225,
      cutout: '80%',
      borderRadius: 10,
    }]
  };

  return (
    <div className="flex flex-col h-full w-full relative z-10">
      <div className="flex justify-between items-center p-5 pb-2 shrink-0">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          Study Goal
        </h3>
      </div>
      
      <div className="flex-1 min-h-0 relative flex flex-col justify-center items-center w-full h-full pb-4">
        <div className="relative w-48 h-48">
          <Doughnut 
            data={doughnutData} 
            options={{ 
              maintainAspectRatio: false, 
              plugins: { 
                legend: { display: false },
                tooltip: { enabled: false }
              } 
            }} 
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{currentHours}<span className="text-xl text-slate-500">h</span></span>
            <span className="text-sm font-medium text-slate-500 mt-1">/ {goalHours}h Goal</span>
          </div>
        </div>
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-[-10px]">
          {progressPercentage}% Completed!
        </p>
      </div>
    </div>
  );
};

export default StudyProgressTrackingWidget;
