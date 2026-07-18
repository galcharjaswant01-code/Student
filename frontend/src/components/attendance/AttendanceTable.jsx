import React, { useState } from 'react';

import { Search, Filter, Download, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock, CalendarDays } from 'lucide-react';
import useResponsive from '../../hooks/useResponsive';

// Simulated Django REST Framework Paginated Response
const generateMockData = () => {
  const results = [
    { id: 1, date: '2025-05-31', subject: 'Mathematics', teacher: 'Dr. Emily Carter', status: 'Present', remarks: '-', percentage: '95%' },
    { id: 2, date: '2025-05-30', subject: 'Physics', teacher: 'Dr. James Wilson', status: 'Present', remarks: '-', percentage: '88%' },
    { id: 3, date: '2025-05-29', subject: 'Computer Science', teacher: 'Prof. Michael Brown', status: 'Late', remarks: '10 min late', percentage: '92%' },
    { id: 4, date: '2025-05-28', subject: 'English', teacher: 'Ms. Sarah Johnson', status: 'Present', remarks: '-', percentage: '98%' },
    { id: 5, date: '2025-05-27', subject: 'Chemistry', teacher: 'Dr. David Lee', status: 'Absent', remarks: 'Medical Leave', percentage: '75%' },
    { id: 6, date: '2025-05-26', subject: 'Mathematics', teacher: 'Dr. Emily Carter', status: 'Present', remarks: '-', percentage: '95%' },
    { id: 7, date: '2025-05-23', subject: 'Physics', teacher: 'Dr. James Wilson', status: 'Present', remarks: '-', percentage: '88%' },
    { id: 8, date: '2025-05-22', subject: 'Computer Science', teacher: 'Prof. Michael Brown', status: 'Late', remarks: '5 min late', percentage: '92%' },
  ];
  
  // Duplicate data to make 48 records total
  let fullData = [...results];
  for(let i = 0; i < 5; i++) {
    fullData = [...fullData, ...results.map(item => ({ ...item, id: item.id + fullData.length }))];
  }
  
  return {
    count: fullData.length,
    next: 'http://api.example.com/attendance/?page=2',
    previous: null,
    results: fullData
  };
};

const apiResponse = generateMockData();

const StatusBadge = ({ status }) => {
  const styles = {
    'Present': 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
    'Absent': 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20',
    'Late': 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
    'Leave Approved': 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
    'Holiday': 'bg-slate-50 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400 border-slate-200 dark:border-slate-500/20',
  };

  const icons = {
    'Present': <CheckCircle2 className="w-3.5 h-3.5 mr-1" />,
    'Absent': <XCircle className="w-3.5 h-3.5 mr-1" />,
    'Late': <Clock className="w-3.5 h-3.5 mr-1" />,
    'Leave Approved': <CalendarDays className="w-3.5 h-3.5 mr-1" />,
    'Holiday': <CalendarDays className="w-3.5 h-3.5 mr-1" />,
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles['Holiday']}`}>
      {icons[status] || null}
      {status}
    </span>
  );
};

const AttendanceTable = ({ isFullscreen = false }) => {
  const { isMobile } = useResponsive();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = isFullscreen ? 12 : 6;

  // Filter logic simulating backend query
  const filteredRecords = apiResponse.results.filter(record => 
    record.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, startIndex + recordsPerPage);

  return (
    <div className="flex flex-col h-full w-full p-6 bg-white/70 dark:bg-slate-800/70 rounded-sm border border-white/20 dark:border-white/10 -[0_8px_30px_rgb(0,0,0,0.04)] dark:-[0_8px_30px_rgb(0,0,0,0.1)]">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">Attendance History</h3>
          <p className="text-sm text-slate-500 mt-1">Showing {startIndex + 1}-{Math.min(startIndex + recordsPerPage, filteredRecords.length)} of {filteredRecords.length} records</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search subject, teacher..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 py-2 w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
            />
          </div>
          <button className="p-2.5 rounded-sm border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300">
            <Filter className="w-4 h-4" />
          </button>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-sm font-semibold">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 pr-1">
        {isMobile ? (
          <div className="flex flex-col gap-4">
            
              {currentRecords.map((record, i) => (
                <div
                  key={record.id} 
                  className="bg-white dark:bg-slate-800/50 p-5 rounded-sm border border-slate-100 dark:border-white/5 flex flex-col gap-3 hover:border-primary/30 cursor-pointer group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary">{record.subject}</h4>
                      <p className="text-xs text-slate-500 mt-1">{new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <StatusBadge status={record.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Teacher</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5 truncate">{record.teacher}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Remarks</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5 truncate">{record.remarks}</p>
                    </div>
                  </div>
                </div>
              ))}
            
          </div>
        ) : (
          <div className="w-full h-full border border-slate-200 dark:border-white/10 rounded-sm overflow-hidden bg-white dark:bg-slate-900/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-white/10">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Teacher</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                
                  {currentRecords.map((record, i) => (
                    <tr
                      key={record.id} 
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 group cursor-pointer"
                    >
                      <td className="p-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary">
                          {record.subject}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{record.teacher}</td>
                      <td className="p-4"><StatusBadge status={record.status} /></td>
                      <td className="p-4 text-sm text-slate-500">{record.remarks}</td>
                    </tr>
                  ))}
                
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 border-t border-slate-200 dark:border-white/10 pt-4">
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-900 dark:text-white">{currentRecords.length}</span> records per page
        </p>
        <div className="flex gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-2 border border-slate-200 dark:border-white/10 rounded-sm disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          <div className="flex items-center gap-1 px-2">
            {[...Array(totalPages)].map((_, i) => {
              if (totalPages > 5 && i > 1 && i < totalPages - 2 && i !== currentPage - 1) {
                if (i === 2) return <span key={i} className="text-slate-400">...</span>;
                return null;
              }
              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-sm text-sm font-semibold  ${
                    currentPage === i + 1 
                      ? 'bg-primary text-white  -primary/20' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-2 border border-slate-200 dark:border-white/10 rounded-sm disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default AttendanceTable;
