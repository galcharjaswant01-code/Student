/**
 * Attendance API Service
 * 
 * This file serves as the communication layer between the React frontend
 * and the Django REST Framework backend for all Attendance-related features.
 * 
 * Replace the mocked data with actual axios/fetch calls when the backend is ready.
 */

const BASE_URL = '/api/v1/attendance';

export const attendanceApi = {
  
  /**
   * Fetch top-level attendance statistics (Overall %, Present, Absent, Late)
   * Django Endpoint Idea: GET /api/v1/attendance/summary/
   */
  async getSummary() {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          overallPercentage: 92,
          presentDays: 45,
          absentDays: 3,
          lateEntries: 1
        });
      }, 500);
    });
    
    // Future Implementation:
    // const response = await fetch(`${BASE_URL}/summary/`);
    // return await response.json();
  },

  /**
   * Fetch graph data for attendance trends
   * Django Endpoint Idea: GET /api/v1/attendance/charts/?period=weekly
   */
  async getChartData(period = 'weekly') {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          weekly: [100, 80, 100, 60, 100],
          subjects: {
            labels: ['Math', 'Physics', 'History', 'CS', 'Chem'],
            data: [95, 85, 100, 90, 88]
          }
        });
      }, 500);
    });
  },

  /**
   * Fetch detailed attendance records for the table
   * Django Endpoint Idea: GET /api/v1/attendance/records/?page=1&status=Present
   */
  async getRecords(filters = {}) {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, date: '2026-05-25', subject: 'MATH 301', teacher: 'Dr. Smith', status: 'Present', remarks: 'On time' },
          { id: 2, date: '2026-05-25', subject: 'PHYS 201', teacher: 'Prof. Johnson', status: 'Present', remarks: '-' },
          { id: 3, date: '2026-05-24', subject: 'HIST 105', teacher: 'Dr. Williams', status: 'Absent', remarks: 'Medical leave' },
        ]);
      }, 500);
    });
  },

  /**
   * Fetch AI Insights and Notifications
   * Django Endpoint Idea: GET /api/v1/attendance/insights/
   */
  async getInsights() {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          trends: "Positive Trend Detected",
          warnings: ["Risk Warning: Physics 201"],
          notifications: ["Absence Recorded: MATH 301"]
        });
      }, 500);
    });
  }
};

export default attendanceApi;
