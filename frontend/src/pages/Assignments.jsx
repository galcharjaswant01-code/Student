import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import { ClipboardList, CheckCircle, Clock, Upload, Plus, FileText } from 'lucide-react';

const mockAssignments = [
  { id: 1, title: 'Calculus III Chapter 4 Problem Set', course: 'Math 301', due: 'Aug 10, 2026', status: 'Pending', grade: 'Pending' },
  { id: 2, title: 'Binary Search Trees Implementation', course: 'CS 202', due: 'Aug 12, 2026', status: 'Pending', grade: 'Pending' },
  { id: 3, title: 'Neural Networks Architecture Report', course: 'AI 401', due: 'Aug 15, 2026', status: 'Submitted', grade: 'A' },
  { id: 4, title: 'Database SQL Indexing Lab', course: 'CS 305', due: 'Aug 04, 2026', status: 'Completed', grade: 'A-' },
  { id: 5, title: 'Physics Optics Experiment Report', course: 'PHY 202L', due: 'Aug 01, 2026', status: 'Completed', grade: 'A' },
];

const Assignments = () => {
  const [filter, setFilter] = useState('All');

  const filteredAssignments = mockAssignments.filter(item => {
    if (filter === 'All') return true;
    return item.status === filter;
  });

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Academic Assignments</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Submit coursework, track upcoming deadlines, and review faculty grades.</p>
        </div>
        <Button variant="primary" icon={Upload} size="sm">
          Submit Homework
        </Button>
      </div>

      {/* 4 Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <span className="text-xs text-slate-500 font-medium">Total Assigned</span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">15</div>
        </Card>
        <Card className="p-4 text-center">
          <span className="text-xs text-slate-500 font-medium">Pending Submission</span>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">2</div>
        </Card>
        <Card className="p-4 text-center">
          <span className="text-xs text-slate-500 font-medium">Under Review</span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1</div>
        </Card>
        <Card className="p-4 text-center">
          <span className="text-xs text-slate-500 font-medium">Completed & Graded</span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">12</div>
        </Card>
      </div>

      {/* Filter Tabs & Assignments Table */}
      <Card 
        title="Assignment Roster" 
        subtitle="Manage your coursework submissions"
        action={
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            {['All', 'Pending', 'Submitted', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${filter === tab ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        }
      >
        <Table headers={['Assignment Title', 'Course Code', 'Due Date', 'Status', 'Grade / Result']}>
          {filteredAssignments.map((item) => (
            <tr key={item.id} className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors">
              <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{item.title}</span>
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.course}</td>
              <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">{item.due}</td>
              <td className="px-4 py-3">
                <Badge variant={item.status === 'Pending' ? 'blue' : 'navy'}>{item.status}</Badge>
              </td>
              <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{item.grade}</td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
};

export default Assignments;
