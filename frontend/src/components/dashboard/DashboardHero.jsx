import React from 'react';
import { BookOpen, Target, Flame, ChevronRight, Play, FileText, Sparkles, Sun } from 'lucide-react';

const DashboardHero = () => {
  return (
    <div className="w-full bg-white rounded-[2rem] p-6 sm:p-8 relative overflow-hidden border border-gray-100/50">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient- from-[#E3EDFF] via-[#F4F1FF] opacity-80 pointer-events-none rounded-bl-[100%]"></div>
      <div className="absolute -top-24 -right-12 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-32 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col xl:flex-row justify-between">
        
        {/* Left: Text & Mini Stats */}
        <div className="flex-1 max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50/80 text-blue-600 px-4 py-2 rounded-full font-semibold text-sm border border-blue-100/50">
            <span className="text-base">👋</span> Welcome back!
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-5 tracking-tight">
            Good morning, <span className="text-[#3B66FF]">Alex!</span>
          </h1>
          <p className="text-gray-500 font-medium mt-3 text-base sm:text-lg">
            Ready to make today productive and achieve your goals?
          </p>

          {/* Mini Stats Row */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-sm bg-[#F0E6FF] text-[#8B5CF6] flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-[15px]">March 18, 2025</h4>
                <p className="text-xs text-gray-500 font-medium">Tuesday</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-sm bg-[#E6F8F0] text-[#10B981] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-[15px]">78%</h4>
                <p className="text-xs text-gray-500 font-medium">Weekly Goal</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-sm bg-[#FFF0E6] text-[#F97316] flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-[15px]">12</h4>
                <p className="text-xs text-gray-500 font-medium">Day Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Date/Time Badge & Avatar Space */}
        <div className="hidden xl:block w-96 relative">
          <div className="absolute top-0 right-0 flex items-start gap-2">
            <Sun className="w-6 h-6 text-yellow-400 mt-1 drop-" fill="currentColor" />
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-600">Good Morning</p>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">09:30 AM</h3>
            </div>
          </div>
          
          {/* Avatar Image Container */}
          <div className="absolute -bottom-10 -right-10 w-[450px] h-[450px] pointer-events-none z-0">
            <img 
              src="/avatar.avif" 
              alt="Student Avatar" 
              className="w-full h-full object-contain object-bottom drop-"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Cards Row */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
        
        {/* Progress Card */}
        <div className="bg-white/80 rounded-sm p-5 border border-white/50 -[0_8px_30px_rgb(0,0,0,0.04)]">
          <h3 className="font-bold text-gray-900 mb-4">Your Progress Today</h3>
          <div className="flex items-center gap-5">
            {/* Circular Progress Placeholder */}
            <div className="relative w-24 h-24 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" className="stroke-indigo-100" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="40" className="stroke-[#3B66FF]" strokeWidth="10" fill="none" strokeDasharray="251.2" strokeDashoffset="87.92" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-xl font-bold text-gray-900 leading-none">65<span className="text-xs">%</span></span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-sm">Daily Progress</h4>
              <p className="text-xs text-gray-500 font-medium mt-1 mb-3">You're doing great! Keep it up.</p>
              
              <div className="flex items-center gap-2">
                <div className="h-2 w-full bg-indigo-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3B66FF] rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-[10px] font-bold text-[#3B66FF]">65%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Card */}
        <div className="lg:col-span-2 bg-white/80 rounded-sm p-5 border border-white/50 -[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Today's Schedule</h3>
            <button className="text-xs font-bold text-[#3B66FF] bg-blue-50 px-3 py-1.5 rounded-sm flex items-center gap-1 hover:bg-blue-100">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Item 1 */}
            <div className="flex-1 flex gap-3">
              <div className="w-12 h-12 rounded-sm bg-[#F0E6FF] text-[#8B5CF6] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-bold text-gray-900">Math Class</h4>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5">10:00 AM - 11:00 AM</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></div>
                  <span className="text-[10px] font-bold text-[#8B5CF6]">Upcoming</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px bg-gray-100"></div>

            {/* Item 2 */}
            <div className="flex-1 flex gap-3">
              <div className="w-12 h-12 rounded-sm bg-[#E6F8F0] text-[#10B981] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-bold text-gray-900">Physics Assignment</h4>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5">Due: 01:00 PM</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div>
                  <span className="text-[10px] font-bold text-gray-600">Due Soon</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px bg-gray-100"></div>

            {/* Item 3 */}
            <div className="flex-1 flex gap-3">
              <div className="w-12 h-12 rounded-sm bg-[#E3EDFF] text-[#3B66FF] flex items-center justify-center shrink-0">
                <Play className="w-5 h-5 ml-0.5" />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-bold text-gray-900">Live Session</h4>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5">03:00 PM - 04:00 PM</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                  <span className="text-[10px] font-bold text-gray-600">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Pro Tip Bar */}
      <div className="relative z-10 mt-5 bg-gradient- from-[#F5F3FF] to-[#EFF6FF] rounded-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#6366F1] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-sm font-medium text-gray-700">
            <span className="font-bold text-[#6366F1]">Pro Tip:</span> Take short breaks and stay consistent. You're closer than you think!
          </p>
        </div>
        <button className="text-sm font-bold text-[#6366F1] bg-white px-4 py-2 rounded-sm flex items-center justify-center gap-1 hover: - shrink-0">
          Explore Resources <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default DashboardHero;
