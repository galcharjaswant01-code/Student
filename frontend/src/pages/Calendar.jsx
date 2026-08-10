import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { format, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, BookOpen, ClipboardList, Clock, ShieldCheck, Plus } from 'lucide-react';
import EventModal from '../components/calendar/EventModal';

const initialEvents = [
  { date: 'Aug 10', time: '09:00 AM', title: 'Calculus III Lecture', type: 'Class', details: 'Hall 302' },
  { date: 'Aug 10', time: '11:59 PM', title: 'Calculus Assignment 4 Due', type: 'Assignment', details: 'Online Submission' },
  { date: 'Aug 12', time: '11:30 AM', title: 'Data Structures Lab Exam', type: 'Exam', details: 'Computer Lab 4' },
  { date: 'Aug 15', time: '02:00 PM', title: 'AI Ethics Guest Seminar', type: 'Event', details: 'Auditorium B' },
];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState('August 2026');
  const [events, setEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Academic Calendar</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Class schedules, exam timetables, assignment deadlines, and events.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={ChevronLeft}>Prev</Button>
          <span className="text-sm font-bold text-slate-900 dark:text-white px-2">{currentMonth}</span>
          <Button variant="secondary" size="sm" icon={ChevronRight}>Next</Button>
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>Event</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Month View Days Grid */}
        <div className="lg:col-span-8">
          <Card title="August 2026 Schedule">
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 py-2 border-b border-slate-100 dark:border-slate-800">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-xs">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const dayDate = new Date(`${currentMonth.split(' ')[0]} ${day}, ${currentMonth.split(' ')[1]}`);
                const dayEvents = events.filter(e => {
  const evDate = e.start ? new Date(e.start) : new Date(`${e.date} ${e.time}`);
  return isSameDay(evDate, dayDate);
});
                const isSelected = day === 10;
                return (
                  <div
                    key={day}
                    className={`h-16 p-1.5 rounded-lg border flex flex-col justify-between transition-colors ${isSelected ? 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 font-bold' : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
                    onClick={() => {
                      if (dayEvents.length) {
                        const ev = dayEvents[0];
                        const start = ev.start ? ev.start : new Date(`${ev.date} ${ev.time}`).toISOString();
                        setSelectedEvent({ ...ev, start });
                        setIsModalOpen(true);
                      }
                    }}
                    style={{ cursor: dayEvents.length ? 'pointer' : 'default' }}
                  >
                    <span className="text-slate-900 dark:text-slate-100">{day}</span>
                    {dayEvents.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 mx-auto mt-1" />
                    )}
                    {day === 10 && <span className="w-2 h-2 rounded-full bg-blue-600 mx-auto" />}
                    {day === 12 && <span className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white mx-auto" />}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: Events Roster */}
        <div className="lg:col-span-4 space-y-4">
          <Card title="Upcoming Events & Exams" subtitle="August 10 - August 15">
            <div className="space-y-3">
              {events.map((evt, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5 hover:border-blue-600/50 transition-colors" onClick={() => { setSelectedEvent(evt); setIsModalOpen(true); }} style={{ cursor: 'pointer' }}>
                  <div className="flex items-center justify-between">
                    <Badge variant={evt.type === 'Exam' ? 'blue' : 'navy'}>{evt.type}</Badge>
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">{evt.start ? format(new Date(evt.start), 'MMM dd') : evt.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{evt.title}</h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                    <span>{evt.start ? format(new Date(evt.start), 'hh:mm a') : evt.time}</span>
                    <span>{evt.details || ''}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        onSave={(newEvent) => {
          if (newEvent.id) {
            setEvents((prev) => prev.map((e) => (e.id === newEvent.id ? newEvent : e)));
          } else {
            newEvent.id = Date.now();
            setEvents((prev) => [...prev, newEvent]);
          }
        }}
        onDelete={(id) => setEvents((prev) => prev.filter((e) => e.id !== id))}
        event={selectedEvent}
      />
    </div>
  );
};

export default Calendar;
