import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, Tag, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const EventModal = ({ isOpen, onClose, onSave, onDelete, selectedDate, event }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('class');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [time, setTime] = useState('09:00');

  useEffect(() => {
    if (isOpen) {
      if (event) {
        setTitle(event.title || '');
        setType(event.type || 'class');
        setDate(event.start ? format(new Date(event.start), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'));
        setTime(event.start ? format(new Date(event.start), 'HH:mm') : '09:00');
      } else {
        setTitle('');
        setType('class');
        setDate(selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'));
        setTime('09:00');
      }
    }
  }, [isOpen, event, selectedDate]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    // Construct full ISO strings for start/end
    const baseDate = date || format(new Date(), 'yyyy-MM-dd');
    const start = new Date(`${baseDate}T${time}:00`).toISOString();
    
    // Default end time to 1 hour after start
    const endDate = new Date(`${baseDate}T${time}:00`);
    endDate.setHours(endDate.getHours() + 1);
    const end = endDate.toISOString();

    onSave({ id: event?.id, title, type, start, end });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-[#111827] w-full max-w-md rounded-sm border border-gray-200 dark:border-gray-800 overflow-hidden animate-in fade-in zoom-in">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{event ? 'Edit Event' : 'Create Event'}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          
          {/* Title */}
          <div>
            <input 
              type="text" 
              placeholder="Event Title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-lg font-semibold bg-transparent border-none border-b-2 border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-0 px-0 py-2 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              autoFocus
            />
          </div>

          {/* Date & Time */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 font-medium bg-gray-50 dark:bg-gray-800/50 py-2 px-3 rounded-sm border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white dark:[color-scheme:dark]"
                required
              />
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <Clock className="w-5 h-5 text-gray-400" />
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1 font-medium bg-gray-50 dark:bg-gray-800/50 py-2 px-3 rounded-sm border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white dark:[color-scheme:dark]"
                required
              />
            </div>

            {/* Type */}
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <Tag className="w-5 h-5 text-gray-400" />
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-sm px-3 py-2 flex-1 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white"
              >
                <option value="class">Class / Lecture</option>
                <option value="study">Study Block</option>
                <option value="exam">Exam / Quiz</option>
                <option value="assignment">Assignment Deadline</option>
                <option value="meeting">Group Meeting</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between gap-3">
            {event && onDelete ? (
              <button 
                type="button"
                onClick={() => onDelete(event.id)}
                className="px-3 py-2 rounded-sm text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-1 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            ) : (
              <div></div>
            )}
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-sm text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={!title}
                className="px-6 py-2 rounded-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed -[0_4px_15px_rgba(79,70,229,0.3)]"
              >
                {event ? 'Update Event' : 'Save Event'}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EventModal;
