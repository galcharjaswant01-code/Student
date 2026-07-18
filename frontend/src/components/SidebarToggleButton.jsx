import React from 'react';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import useDashboardStore from '../store/useDashboardStore';

const SidebarToggleButton = () => {
  const { themePreferences, setSidebarCollapsed } = useDashboardStore();
  const isCollapsed = themePreferences?.isSidebarCollapsed ?? false;
  return (
    <button
      onClick={() => setSidebarCollapsed(!isCollapsed)}
      className="hidden lg:flex p-2 text-slate-500 hover:text-primary hover:bg-primary/10 dark:text-slate-400 dark:hover:text-accent dark:hover:bg-white/5 rounded-sm"
      title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
    >
      {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
    </button>
  );
};

export default SidebarToggleButton;
