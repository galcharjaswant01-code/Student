import React, { useState, useEffect } from 'react';
import { Search, Filter, LayoutGrid, List as ListIcon, Plus, Maximize2, Minimize2 } from 'lucide-react';

import useDashboardStore from '../store/useDashboardStore';
import { useWorkspace } from '../context/WorkspaceContext';

import WidgetWrapper from '../components/WidgetWrapper';
import AssignmentStats from '../components/assignments/AssignmentStats';
import AssignmentList from '../components/assignments/AssignmentList';
import AssignmentDetailsPanel from '../components/assignments/AssignmentDetailsPanel';
import AssignmentSubmission from '../components/assignments/AssignmentSubmission';
import AssignmentAIInsights from '../components/assignments/AssignmentAIInsights';
import AssignmentCalendar from '../components/assignments/AssignmentCalendar';

import { assignmentAPI } from '../services/mockDjangoApi';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const { isFullscreen, toggleFullscreen } = useWorkspace();
  
  // Modals / Panels state
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, [filter, searchTerm]);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const response = await assignmentAPI.getAssignments(1, 20, {
        status: filter,
        search: searchTerm
      });
      setAssignments(response.results);
    } catch (error) {
      console.error('Failed to fetch assignments', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetails = (assignment) => {
    setSelectedAssignment(assignment);
    setDetailsPanelOpen(true);
  };

  const handleOpenUpload = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionModalOpen(true);
  };

  const handleSubmissionComplete = (updatedAssignment) => {
    setSubmissionModalOpen(false);
    setAssignments(prev => prev.map(a => a.id === updatedAssignment.id ? updatedAssignment : a));
    
    // If details panel is open, update its state too
    if (detailsPanelOpen && selectedAssignment?.id === updatedAssignment.id) {
      setSelectedAssignment(updatedAssignment);
    }
  };

  return (
    <div className="p-6 w-full h-full overflow-y-auto custom-scrollbar space-y-6 pb-20">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient- bg-primary">
            Assignments
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Manage coursework, track deadlines, and submit your tasks.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Fullscreen Toggle */}
          <button 
            onClick={toggleFullscreen}
            className="p-2.5 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-sm text-slate-500 hover:text-primary flex items-center justify-center"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 w-full md:w-64 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-sm text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-sm text-sm font-medium focus:outline-none focus:border-primary appearance-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Submitted">Submitted</option>
              <option value="Graded">Graded</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-sm p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-sm  ${viewMode === 'grid' ? 'bg-primary text-white ' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-sm  ${viewMode === 'list' ? 'bg-primary text-white ' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="w-full">
        <AssignmentStats />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Assignment Listing (Left/Center) */}
        <div className="xl:col-span-2 flex flex-col min-h-[600px] relative">
          <WidgetWrapper id="assignments-list" innerClassName="p-0 h-full overflow-y-auto custom-scrollbar">
            <div className="p-6 h-full">
              <AssignmentList 
                assignments={assignments} 
                loading={loading} 
                viewMode={viewMode}
                onUploadClick={handleOpenUpload}
                onDetailsClick={handleOpenDetails}
              />
            </div>
          </WidgetWrapper>
        </div>

        {/* Side Panel (Right) - Calendar & AI Insights */}
        <div className="xl:col-span-1 flex flex-col gap-6 h-auto xl:h-[800px] overflow-y-auto custom-scrollbar pb-4">
          
          <div className="h-[350px] shrink-0 relative">
            <WidgetWrapper id="assignments-calendar" innerClassName="p-0 h-full overflow-y-auto custom-scrollbar">
              <AssignmentCalendar assignments={assignments} />
            </WidgetWrapper>
          </div>

          <div className="h-[430px] shrink-0 relative">
            <WidgetWrapper id="assignments-insights" innerClassName="p-0 h-full overflow-y-auto custom-scrollbar">
              <AssignmentAIInsights />
            </WidgetWrapper>
          </div>

        </div>
      </div>

      {/* Modals and Slide-overs */}
      <AssignmentDetailsPanel 
        assignment={selectedAssignment}
        isOpen={detailsPanelOpen}
        onClose={() => setDetailsPanelOpen(false)}
        onUploadClick={handleOpenUpload}
      />

      <AssignmentSubmission 
        assignment={selectedAssignment}
        isOpen={submissionModalOpen}
        onClose={() => setSubmissionModalOpen(false)}
        onSubmitted={handleSubmissionComplete}
      />

    </div>
  );
};

export default Assignments;
