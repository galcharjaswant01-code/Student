import React, { useState } from 'react';

import { X, Plus, Calendar as CalendarIcon, FileText, BookOpen, User } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const AddAssignmentModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, 'assignments'), {
        title,
        subject,
        teacher,
        due: dueDate,
        status: 'Pending',
        progress: 0,
        userId: currentUser.uid,
        createdAt: serverTimestamp()
      });
      
      // Reset form and close modal
      setTitle('');
      setSubject('');
      setTeacher('');
      setDueDate('');
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Failed to add assignment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-gray-900/60"
        />

        {/* Modal Content */}
        <div
          className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-500" />
              New Assignment
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <div className="relative">
                  <FileText className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Advanced Calculus Problem Set 4"
                    className="w-full bg-white dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-sm py-2.5 pl-10 pr-4 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <div className="relative">
                    <BookOpen className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. MATH 301"
                      className="w-full bg-white dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-sm py-2.5 pl-10 pr-4 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teacher</label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={teacher}
                      onChange={(e) => setTeacher(e.target.value)}
                      placeholder="e.g. Dr. Smith"
                      className="w-full bg-white dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-sm py-2.5 pl-10 pr-4 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                <div className="relative">
                  <CalendarIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="e.g. Today, 11:59 PM or Next Week"
                    className="w-full bg-white dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-sm py-2.5 pl-10 pr-4 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 -[0_0_15px_rgba(79,70,229,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? 'Saving...' : 'Add Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    
  );
};

export default AddAssignmentModal;
