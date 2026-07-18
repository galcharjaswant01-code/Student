import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const PerformanceAnalyticsWidget = () => {
  const navigate = useNavigate();

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Performance Score',
      data: [82, 85, 84, 88, 91, 93],
      fill: true,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.4)');
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
        return gradient;
      },
      borderColor: '#2563EB',
      borderWidth: 3,
      tension: 0.4,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#2563EB',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    }]
  };

  return (
    <div className="flex flex-col h-full w-full relative z-10">
      <div className="flex justify-between items-center p-5 pb-2 shrink-0">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Performance
        </h3>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full hidden sm:block">This Semester</span>
          <button 
            onClick={() => navigate('/analytics')}
            className="text-sm text-primary hover:text-blue-700 font-medium flex items-center gap-1 group"
          >
            Analytics
            <ArrowRight className="w-3 h-3 group-" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 relative w-full h-full p-4 pt-0 pb-6">
        <Line 
          data={lineChartData} 
          options={{ 
            maintainAspectRatio: false, 
            interaction: {
              mode: 'index',
              intersect: false,
            },
            plugins: { 
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#fff',
                bodyColor: '#e2e8f0',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                  label: (context) => `Score: ${context.parsed.y}%`
                }
              }
            }, 
            scales: { 
              y: { grid: { color: 'rgba(150, 150, 150, 0.1)' }, beginAtZero: false, min: 70 }, 
              x: { grid: { display: false } } 
            } 
          }} 
        />
      </div>
    </div>
  );
};

export default PerformanceAnalyticsWidget;
