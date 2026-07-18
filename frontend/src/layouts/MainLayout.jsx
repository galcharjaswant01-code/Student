import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import TopNavbar from '../components/TopNavbar'
import AIChatAssistant from '../components/AIChatAssistant'
import AnimatedBackground from '../components/AnimatedBackground'
import useDashboardStore from '../store/useDashboardStore'
import WorkspaceLayout from '../components/workspace/WorkspaceLayout'

const MainLayout = () => {
  const location = useLocation()
  const { themePreferences, isMobileSidebarOpen, setMobileSidebarOpen } = useDashboardStore()
  const isCollapsed = themePreferences?.isSidebarCollapsed ?? false;
  const width = themePreferences?.sidebarWidth || 288;
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      // Automatically close mobile sidebar if switching to desktop
      if (!mobile) {
        setMobileSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setMobileSidebarOpen])

  const sidebarActualWidth = isMobile ? 0 : (isCollapsed ? 80 : width);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-[#050505] text-gray-900 dark:text-gray-100 relative">
      <AnimatedBackground />

      {/* Mobile Drawer Backdrop */}
      
        {isMobile && isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div 
        className="flex flex-col min-h-screen relative z-0 transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarActualWidth }}
      >
        <TopNavbar />
        
        <main className="flex-1 p-0 sm:p-6 relative">
          <WorkspaceLayout>
            
            <div
              key={location.pathname}
              className="w-full h-full"
            >
              <Outlet />
            </div>
          
          </WorkspaceLayout>
        </main>
      </div>

      {/* Floating AI Chat Assistant */}
      <AIChatAssistant />

      {/* Floating Mobile Menu Button */}
      {isMobile && !isMobileSidebarOpen && (
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="fixed bottom-6 left-6 z-[60] p-4 bg-primary text-white rounded-full -primary/50 flex items-center justify-center lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

    </div>
  )
}

export default MainLayout
