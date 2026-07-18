import React, { useState } from 'react';

import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, ArcElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { ChevronDown, BarChart2, PieChart } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

const CardWrapper = ({ children, title, icon: Icon, delay }) => (
  <div
    className="bg-white/70 dark:bg-slate-800/70 rounded-sm p-6 -[0_8px_30px_rgb(0,0,0,0.04)] dark:-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/20 dark:border-white/10 flex flex-col h-[360px] relative overflow-y-auto custom-scrollbar"
  >
    <div className="flex justify-between items-center mb-6 relative z-10">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-primary/10 dark:bg-primary/20 rounded-sm">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white tracking-tight">{title}</h3>
      </div>
      <button className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-2 py-1 bg-slate-100 dark:bg-slate-700/50 rounded-md">
        This Month <ChevronDown className="w-3 h-3" />
      </button>
    </div>
    <div className="flex-1 w-full relative z-10">
      {children}
    </div>
  </div>
);

const AttendanceCharts = () => {
  // Line Chart Data
  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Attendance %',
        data: [82, 88, 75, 92, 89.6],
        borderColor: '#6366F1', // Indigo color
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
          return gradient;
        },
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#6366F1',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y}% Attendance`
        }
      },
    },
    scales: {
      y: {
        min: 50,
        max: 100,
        ticks: { stepSize: 10, color: '#94a3b8', font: { size: 11, family: 'Inter' } },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        border: { display: false }
      },
      x: {
        ticks: { color: '#94a3b8', font: { size: 11, family: 'Inter' } },
        grid: { display: false },
        border: { display: false }
      }
    },
  };

  // Subject Doughnut Data
  const subjectData = {
    labels: ['Mathematics', 'Physics', 'Comp Sci', 'English', 'Chemistry'],
    datasets: [{
      data: [92, 86, 85, 90, 87],
      backgroundColor: ['#6366F1', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
      borderWidth: 0,
      hoverOffset: 6
    }]
  };

  // Distribution Doughnut Data
  const distributionData = {
    labels: ['Present', 'Absent', 'Late', 'Excused', 'Holiday'],
    datasets: [{
      data: [82, 5, 3, 2, 8],
      backgroundColor: ['#10B981', '#EF4444', '#F59E0B', '#3B82F6', '#64748B'],
      borderWidth: 0,
      cutout: '75%',
      hoverOffset: 6
    }]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: { 
      legend: { display: false }, 
      tooltip: { 
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        callbacks: {
          label: (context) => ` ${context.label}: ${context.parsed}%`
        }
      } 
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Attendance Trend Line Chart */}
      <div className="col-span-1 lg:col-span-1">
        <CardWrapper title="Attendance Trend" icon={BarChart2} delay={0.1}>
          <Line data={lineData} options={lineOptions} />
        </CardWrapper>
      </div>

      {/* Subject-wise Attendance */}
      <div className="col-span-1 lg:col-span-1">
        <CardWrapper title="Subject Breakdown" icon={PieChart} delay={0.2}>
          <div className="flex h-full items-center justify-between pb-4">
            <div className="w-[140px] h-[140px] shrink-0 relative">
              <Doughnut data={subjectData} options={doughnutOptions} />
            </div>
            <div className="flex flex-col gap-3 flex-1 ml-6 justify-center">
              {[
                { label: 'Math', val: '92%', color: 'bg-indigo-500' },
                { label: 'Physics', val: '86%', color: 'bg-blue-500' },
                { label: 'CS', val: '85%', color: 'bg-emerald-500' },
                { label: 'English', val: '90%', color: 'bg-amber-500' },
                { label: 'Chemistry', val: '87%', color: 'bg-purple-500' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs group cursor-pointer">
                  <div className="flex items-center text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                    <div className={`w-2 h-2 rounded-full ${item.color} mr-2 -[0_0_8px_${item.color.replace('bg-', '')}]`} />
                    {item.label}
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </CardWrapper>
      </div>

      {/* Attendance Distribution */}
      <div className="col-span-1 lg:col-span-1">
        <CardWrapper title="Status Distribution" icon={PieChart} delay={0.3}>
          <div className="flex h-full items-center justify-between pb-4">
            <div className="w-[140px] h-[140px] shrink-0 relative">
              <Doughnut data={distributionData} options={doughnutOptions} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">82%</span>
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Present</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1 ml-6 justify-center">
              {[
                { label: 'Present', count: '82%', color: 'bg-emerald-500' },
                { label: 'Absent', count: '5%', color: 'bg-red-500' },
                { label: 'Late', count: '3%', color: 'bg-amber-500' },
                { label: 'Excused', count: '2%', color: 'bg-blue-500' },
                { label: 'Holiday', count: '8%', color: 'bg-slate-500' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs group cursor-pointer">
                  <div className="flex items-center text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                    <div className={`w-2 h-2 rounded-full ${item.color} mr-2`} />
                    {item.label}
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardWrapper>
      </div>

    </div>
  );
};

export default AttendanceCharts;
