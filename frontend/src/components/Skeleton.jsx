import React from 'react';


export const Skeleton = ({ className = '', rounded = 'rounded-sm' }) => (
  <div className={`relative overflow-hidden bg-slate-200/50 dark:bg-slate-800/50 ${rounded} ${className}`}>
    <div
      className="absolute inset-0 bg-gradient- bg-transparent dark: w-full"
    />
  </div>
);

export const WidgetSkeleton = () => (
  <div className="h-full w-full p-4 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <Skeleton className="w-12 h-12" rounded="rounded-sm" />
      <Skeleton className="w-10 h-10" rounded="rounded-full" />
    </div>
    <div className="space-y-3">
      <Skeleton className="w-24 h-8" />
      <Skeleton className="w-32 h-4" />
      <Skeleton className="w-20 h-4" />
    </div>
  </div>
);
