import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Table from '../components/ui/Table';
import { FolderOpen, FileText, Video, Download, Search, Filter } from 'lucide-react';

const mockResources = [
  { id: 1, title: 'Calculus III Chapter 4 Notes', type: 'PDF Note', category: 'Math 301', size: '2.4 MB', date: 'Aug 05, 2026' },
  { id: 2, title: 'Data Structures Trees & Graphs Lecture Video', type: 'Video', category: 'CS 202', size: '145 MB', date: 'Aug 03, 2026' },
  { id: 3, title: 'AI Neural Networks Cheat Sheet', type: 'Study Material', category: 'AI 401', size: '1.2 MB', date: 'Jul 28, 2026' },
  { id: 4, title: 'Database SQL Querying & Indexing Guide', type: 'PDF Note', category: 'CS 305', size: '3.1 MB', date: 'Jul 25, 2026' },
  { id: 5, title: 'Physics Optics Experiment Video Walkthrough', type: 'Video', category: 'PHY 202L', size: '89 MB', date: 'Jul 20, 2026' },
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredResources = mockResources.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || item.type.includes(filterType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Academic Resource Vault</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Download lecture notes, PDFs, recorded videos, and study guides.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="w-full sm:w-64">
            <Input 
              icon={Search} 
              placeholder="Search resources or course..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'PDF Note', 'Video', 'Study Material'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filterType === t ? 'bg-blue-600 text-white' : 'border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Resources Table */}
      <Card title="Available Study Materials" subtitle="Click to download file to device">
        <Table headers={['Resource Title', 'Type', 'Course Code', 'File Size', 'Upload Date', 'Action']}>
          {filteredResources.map((item) => (
            <tr key={item.id} className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors">
              <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2.5">
                {item.type === 'Video' ? (
                  <Video className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                ) : (
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                )}
                <span>{item.title}</span>
              </td>
              <td className="px-4 py-3">
                <Badge variant="blue">{item.type}</Badge>
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.category}</td>
              <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{item.size}</td>
              <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{item.date}</td>
              <td className="px-4 py-3">
                <Button variant="primary" size="sm" icon={Download}>
                  Download
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
};

export default Resources;
