import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';


const AttendanceOverviewWidget = () => {
  const navigate = useNavigate();

  const doughnutData = {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [{
      data: [90, 5, 5],
      backgroundColor: ['#06B6D4', '#8B5CF6', '#2563EB'],
      borderWidth: 0,
      hoverOffset: 8
    }]
  };

  return (
    <div className="flex flex-col h-full w-full p-5 relative z-10">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-success" />
          Attendance
        </h3>
        <button 
          onClick={() => navigate('/attendance')}
          className="text-sm text-primary hover:text-blue-700 font-medium flex items-center gap-1 group"
        >
          Details
          <ArrowRight className="w-3 h-3 group-" />
        </button>
      </div>
      <div className="flex-1 min-h-0 relative flex justify-center items-center w-full h-full pb-2">
        <Doughnut 
          data={doughnutData} 
          options={{ 
            maintainAspectRatio: false, 
            cutout: '75%', 
            plugins: { 
              legend: { position: 'bottom', labels: { usePointStyle: true, padding: 15, color: '#64748b' } },
              tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                padding: 12,
                callbacks: {
                  label: (context) => ` ${context.parsed}%`
                }
              }
            } 
          }} 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white">90%</span>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Present</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverviewWidget;
