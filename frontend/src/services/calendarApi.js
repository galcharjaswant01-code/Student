/**
 * Calendar API Service
 * 
 * Mock service layer to interact with Django backend for Calendar events.
 */

const generateMockEvents = () => {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  
  return [
    { id: 1, title: 'Advanced Calculus', type: 'class', start: new Date(y, m, 5, 10, 0).toISOString(), end: new Date(y, m, 5, 11, 30).toISOString(), color: 'bg-blue-500' },
    { id: 2, title: 'Physics Midterm', type: 'exam', start: new Date(y, m, 12, 14, 0).toISOString(), end: new Date(y, m, 12, 16, 0).toISOString(), color: 'bg-purple-500' },
    { id: 3, title: 'AI Study Block: Physics', type: 'study', start: new Date(y, m, 10, 18, 0).toISOString(), end: new Date(y, m, 10, 20, 0).toISOString(), color: 'bg-emerald-500' },
    { id: 4, title: 'Group Project Sync', type: 'meeting', start: new Date(y, m, 18, 15, 0).toISOString(), end: new Date(y, m, 18, 16, 0).toISOString(), color: 'bg-amber-500' },
    { id: 5, title: 'React Final Project', type: 'assignment', start: new Date(y, m, 25, 23, 59).toISOString(), end: new Date(y, m, 25, 23, 59).toISOString(), color: 'bg-rose-500' },
    { id: 6, title: 'Advanced Calculus', type: 'class', start: new Date(y, m, 19, 10, 0).toISOString(), end: new Date(y, m, 19, 11, 30).toISOString(), color: 'bg-blue-500' },
    { id: 7, title: 'Literature Review', type: 'study', start: new Date(y, m, today.getDate() + 1, 16, 0).toISOString(), end: new Date(y, m, today.getDate() + 1, 18, 0).toISOString(), color: 'bg-emerald-500' },
    { id: 8, title: 'Computer Science 101', type: 'class', start: new Date(y, m, today.getDate(), 13, 0).toISOString(), end: new Date(y, m, today.getDate(), 14, 30).toISOString(), color: 'bg-blue-500' },
  ];
};

export const calendarApi = {
  async getEvents() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockEvents());
      }, 500);
    });
  },

  async createEvent(eventData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEvent = {
          id: Date.now(),
          ...eventData,
          color: eventData.type === 'class' ? 'bg-blue-500' :
                 eventData.type === 'exam' ? 'bg-purple-500' :
                 eventData.type === 'study' ? 'bg-emerald-500' :
                 eventData.type === 'assignment' ? 'bg-rose-500' : 'bg-gray-500'
        };
        resolve(newEvent);
      }, 600);
    });
  }
};

export default calendarApi;
