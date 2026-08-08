import React from 'react';
import { GripHorizontal } from 'lucide-react';


const WidgetWrapper = ({ id, children, className = "", isEditing = false, innerClassName = "p-2 overflow-y-auto" }) => {
  return (
    <div
      className={`
        group relative h-full w-full overflow-hidden rounded-2xl
        bg-white/70 dark:bg-[#0F172A]/60 backdrop-blur-xl
        border border-slate-200/60 dark:border-white/5
        hover:border-primary/30 dark:hover:border-primary/40
        hover:shadow-xl dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]
        transition-all duration-300
        ${className} 
        ${isEditing ? 'ring-2 ring-primary/50 cursor-move transform scale-[1.02] ' : ''}
      `}
    >
      <div className="absolute inset-0 bg-gradient- bg-white/40 dark:bg-white/5 dark: pointer-events-none rounded-2xl" />
      
      {isEditing && (
        <div className="absolute top-3 right-3 text-white/80 cursor-grab active:cursor-grabbing z-50 bg-primary p-1.5 rounded-xl border border-white/20">
          <GripHorizontal className="w-5 h-5" />
        </div>
      )}

      <div className={`h-full w-full custom-scrollbar ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default WidgetWrapper;

