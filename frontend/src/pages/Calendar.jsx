import React, { useState, useEffect } from 'react';
import CalendarSidebar from '../components/calendar/CalendarSidebar';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';
import UpcomingEventsPanel from '../components/calendar/UpcomingEventsPanel';
import EventModal from '../components/calendar/EventModal';
import { calendarApi } from '../services/calendarApi';
import { format } from 'date-fns';
import useResponsive from '../hooks/useResponsive';
import { useWorkspace } from '../context/WorkspaceContext';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [events, setEvents] = useState([]);
  
  // Sidebar state
  const { isMobile: isMobileView, isTablet } = useResponsive();
  const [showSidebarOnMobile, setShowSidebarOnMobile] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState({
    class: true,
    exam: true,
    study: true,
    assignment: true,
    meeting: true
  });

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch initial events
    calendarApi.getEvents().then(data => setEvents(data));
  }, []);

  // Force agenda view on mobile, or keep selected view
  useEffect(() => {
    if (isMobileView) {
      setView('agenda');
      setShowSidebarOnMobile(false);
    } else if (view === 'agenda') {
      setView('month');
    }
  }, [isMobileView]);

  const handleSaveEvent = async (eventData) => {
    try {
      const newEvent = await calendarApi.createEvent(eventData);
      setEvents(prev => [...prev, newEvent]);
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const { isFullscreen } = useWorkspace();

  return (
    <div className={`flex ${isFullscreen ? 'h-full' : 'h-[calc(100vh-64px)]'} w-full overflow-hidden rounded-tl-2xl relative`}>
      
      {/* Mobile Overlay for Sidebar */}
      {isMobileView && showSidebarOnMobile && (
        <div 
          className="absolute inset-0 bg-black/50 z-20"
          onClick={() => setShowSidebarOnMobile(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        absolute lg:relative z-30 h-full  
        ${isMobileView ? (showSidebarOnMobile ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
      `}>
        <CalendarSidebar 
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          filters={filters}
          setFilters={setFilters}
          onAddEvent={() => setIsModalOpen(true)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <CalendarHeader 
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          view={view}
          setView={setView}
          toggleSidebar={() => setShowSidebarOnMobile(!showSidebarOnMobile)}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <CalendarGrid 
            currentDate={currentDate}
            events={events}
            filters={filters}
            view={view}
          />
          <UpcomingEventsPanel 
            events={events}
          />
        </div>
      </div>

      {/* Modals */}
      <EventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        selectedDate={currentDate}
      />
    </div>
  );
};

export default Calendar;
