import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import Footer from '../components/ui/Footer';

const MainLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Permanent Left Navigation Sidebar (Flex child; smooth width transition; collapsible) */}
      <Sidebar />

      {/* Main Right Content Area (flex-1 min-w-0 automatically consumes all remaining horizontal space) */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-slate-50/50 dark:bg-slate-950">
        
        {/* Header / TopNavbar */}
        <TopNavbar />

        {/* Scrollable Dynamic Main Content View */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 w-full min-w-0">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>

    </div>
  );
};

export default MainLayout;
