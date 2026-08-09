import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import { FolderOpen, FileText, Video, Download, Search, Filter, Plus, Star, Eye, Upload } from 'lucide-react';

const initialResources = [
  { id: 1, title: 'Calculus III Chapter 4 Notes', type: 'PDF Notes', course: 'Math 301', size: '2.4 MB', date: 'Aug 05, 2026', author: 'Dr. Sarah Jenkins', desc: 'Complete lecture summary including partial derivatives and multivariable integration formulas.', isFavorite: true },
  { id: 2, title: 'Data Structures Trees & Graphs Video', type: 'Video Lectures', course: 'CS 202', size: '145 MB', date: 'Aug 03, 2026', author: 'Prof. Michael Robert', desc: 'Detailed 45-minute recording on AVL tree rotation and graph traversal algorithms.', isFavorite: false },
  { id: 3, title: 'AI Neural Networks Cheat Sheet', type: 'Lab Guides', course: 'AI 401', size: '1.2 MB', date: 'Jul 28, 2026', author: 'Dr. Robert Chen', desc: 'Handy reference sheet covering backpropagation, activation functions, and loss metrics.', isFavorite: true },
  { id: 4, title: 'Database SQL Querying & Indexing Guide', type: 'PDF Notes', course: 'CS 305', size: '3.1 MB', date: 'Jul 25, 2026', author: 'Prof. Amanda Miller', desc: 'Comprehensive tutorial on B-Tree indexing, JOIN optimizations, and SQL transactions.', isFavorite: false },
  { id: 5, title: 'Physics II Mid-Term Past Paper 2025', type: 'Past Papers', course: 'PHY 202L', size: '4.5 MB', date: 'Jul 20, 2026', author: 'Academic Dept', desc: 'Previous year examination paper with verified answer keys and scoring rubric.', isFavorite: false },
];

const Resources = () => {
  const [resources, setResources] = useState(initialResources);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // New upload state
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [newType, setNewType] = useState('PDF Notes');

  const handleToggleFavorite = (id) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    const newRes = {
      id: Date.now(),
      title: newTitle,
      type: newType,
      course: newCourse || 'CS 101',
      size: '1.5 MB',
      date: 'Just now',
      author: 'Student Contributor',
      desc: 'Uploaded study material for course revision.',
      isFavorite: false
    };

    setResources([newRes, ...resources]);
    setNewTitle('');
    setNewCourse('');
    setIsUploadOpen(false);
  };

  const filteredResources = resources.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.course.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesCategory = true;
    if (activeCategory === 'Favorites') matchesCategory = item.isFavorite;
    else if (activeCategory !== 'All') matchesCategory = item.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Academic Resource Vault</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Access notes, lecture recordings, lab guides, past exam papers, and study materials.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="primary" icon={Upload} onClick={() => setIsUploadOpen(true)}>
            Upload Resource
          </Button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'PDF Notes', 'Video Lectures', 'Lab Guides', 'Past Papers', 'Favorites'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${activeCategory === cat ? 'border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 bg-transparent' : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <Input 
            icon={Search} 
            placeholder="Search notes or course..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Table View */}
      <Card title="Course Study Files" subtitle={`Showing ${filteredResources.length} resources`}>
        <Table headers={['Resource Title', 'Category', 'Course Code', 'File Size', 'Upload Date', 'Actions']}>
          {filteredResources.map((item) => (
            <tr key={item.id} className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors">
              <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2.5">
                <button onClick={() => handleToggleFavorite(item.id)} className="text-slate-400 hover:text-blue-600">
                  <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-blue-600 text-blue-600' : ''}`} />
                </button>
                {item.type === 'Video Lectures' ? (
                  <Video className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                ) : (
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                )}
                <span>{item.title}</span>
              </td>
              <td className="px-4 py-3">
                <Badge variant="blue">{item.type}</Badge>
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.course}</td>
              <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{item.size}</td>
              <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{item.date}</td>
              <td className="px-4 py-3 flex items-center gap-2">
                <Button variant="secondary" size="sm" icon={Eye} onClick={() => setSelectedDoc(item)}>
                  Preview
                </Button>
                <Button variant="primary" size="sm" icon={Download}>
                  Download
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      {/* Document Preview Modal */}
      {selectedDoc && (
        <Modal isOpen={!!selectedDoc} onClose={() => setSelectedDoc(null)} title={selectedDoc.title}>
          <div className="space-y-4 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-slate-800 pb-3">
              <span>Author: <strong>{selectedDoc.author}</strong></span>
              <span>Course: <strong>{selectedDoc.course}</strong></span>
              <span>Size: <strong>{selectedDoc.size}</strong></span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {selectedDoc.desc}
            </p>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-2">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto" />
              <p className="text-xs font-bold">{selectedDoc.title}</p>
              <p className="text-[11px] text-slate-400">Ready for instant download</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setSelectedDoc(null)}>Close</Button>
              <Button variant="primary" icon={Download}>Download File</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Resource Modal */}
      {isUploadOpen && (
        <Modal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} title="Upload Study Resource">
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <Input 
              label="Resource Title" 
              required 
              placeholder="e.g. Calculus Chapter 5 Revision Sheet" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)} 
            />
            <Input 
              label="Course Code" 
              placeholder="e.g. CS 202" 
              value={newCourse} 
              onChange={(e) => setNewCourse(e.target.value)} 
            />
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Resource Category</label>
              <select 
                value={newType} 
                onChange={(e) => setNewType(e.target.value)}
                className="w-full py-2.5 px-3 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
              >
                <option value="PDF Notes">PDF Notes</option>
                <option value="Video Lectures">Video Lectures</option>
                <option value="Lab Guides">Lab Guides</option>
                <option value="Past Papers">Past Papers</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" icon={Upload}>Upload File</Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};

export default Resources;
