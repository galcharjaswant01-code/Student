import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import TopNavbar from '../components/TopNavbar'
import Footer from '../components/ui/Footer'
import useDashboardStore from '../store/useDashboardStore'
import WorkspaceLayout from '../components/workspace/WorkspaceLayout'

const MainLayout = () => {
  const location = useLocation()
  const { 
    themePreferences, 
    isMobileSidebarOpen, 
    setMobileSidebarOpen
  } = useDashboardStore()

  const isLeftCollapsed = themePreferences?.isSidebarCollapsed ?? false;
  const leftWidth = themePreferences?.sidebarWidth || 260;
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        setMobileSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setMobileSidebarOpen])

  const leftSidebarActualWidth = isMobile ? 0 : (isLeftCollapsed ? 76 : leftWidth);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative font-sans">

      {/* Mobile Drawer Backdrop */}
      {isMobile && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Single Resizable & Collapsible Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div 
        className="flex flex-col min-h-screen relative z-0 transition-all duration-150 ease-out w-full max-w-full overflow-x-hidden"
        style={{ 
          marginLeft: leftSidebarActualWidth, 
          marginRight: 0 
        }}
      >
        <TopNavbar />
        
        <main className="flex-1 p-0 relative w-full overflow-x-hidden">
          <WorkspaceLayout>
            <div
              key={location.pathname}
              className="w-full h-full"
            >
              <Outlet />
            </div>
          </WorkspaceLayout>
        </main>

        <Footer />
      </div>

      {/* Floating Mobile Menu Button */}
      {isMobile && !isMobileSidebarOpen && (
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="fixed bottom-5 left-5 z-40 p-3 bg-blue-600 text-white rounded-full shadow-md flex items-center justify-center lg:hidden hover:scale-105 active:scale-95 transition-all"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

    </div>
  )
}

export default MainLayout
