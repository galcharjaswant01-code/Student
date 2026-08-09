import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import { CheckCircle, Calendar as CalendarIcon, Clock, Filter, BookOpen } from 'lucide-react';

const subjectAttendance = [
  { id: 1, subject: 'Calculus III (Math 301)', attended: 28, total: 30, percentage: 93.3, status: 'Regular' },
  { id: 2, subject: 'Data Structures & Algorithms (CS 202)', attended: 32, total: 32, percentage: 100.0, status: 'Perfect' },
  { id: 3, subject: 'Artificial Intelligence (AI 401)', attended: 24, total: 26, percentage: 92.3, status: 'Regular' },
  { id: 4, subject: 'Database Management Systems (CS 305)', attended: 27, total: 30, percentage: 90.0, status: 'Regular' },
  { id: 5, subject: 'Physics II Laboratory (PHY 202L)', attended: 15, total: 15, percentage: 100.0, status: 'Perfect' },
];

const monthlyAttendanceData = [
  { month: 'January', percentage: 96 },
  { month: 'February', percentage: 94 },
  { month: 'March', percentage: 98 },
  { month: 'April', percentage: 95 },
  { month: 'May', percentage: 97 },
];

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('All Months');

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Attendance Record</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Track biometric check-ins, subject percentages, and monthly attendance logs.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={Filter} size="sm">
            Filter Month
          </Button>
          <Button variant="primary" icon={CheckCircle} size="sm">
            Mark Check-In
          </Button>
        </div>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Overall Attendance</span>
            <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mt-2">95.2%</div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-600 dark:bg-blue-500 h-full rounded-full" style={{ width: '95.2%' }} />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Classes Attended</span>
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mt-2">126 / 133</div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium">7 Authorized absences logged</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Attendance Status</span>
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-2">Dean's Honor Threshold</div>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-2 font-semibold">Above 85% requirement</p>
        </Card>
      </div>

      {/* Monthly Attendance Chart Bar (Pure 4-Color Styled UI) */}
      <Card title="Monthly Attendance Trend" subtitle="Percentage breakdown by academic month">
        <div className="grid grid-cols-5 gap-3 pt-4 items-end h-44 border-b border-slate-100 dark:border-slate-800 pb-4">
          {monthlyAttendanceData.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{item.percentage}%</span>
              <div 
                className="w-full max-w-[48px] bg-blue-600 dark:bg-blue-500 rounded-t-md transition-all duration-300 hover:bg-blue-700" 
                style={{ height: `${item.percentage * 1.2}px` }} 
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">{item.month}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Subject-Wise Table */}
      <Card title="Subject-Wise Breakdown" subtitle="Detailed attendance log for current semester courses">
        <Table headers={['Subject Name', 'Classes Attended', 'Total Conducted', 'Percentage', 'Status']}>
          {subjectAttendance.map((row) => (
            <tr key={row.id} className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors">
              <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{row.subject}</td>
              <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.attended}</td>
              <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.total}</td>
              <td className="px-4 py-3 font-bold text-blue-600 dark:text-blue-400">{row.percentage}%</td>
              <td className="px-4 py-3">
                <Badge variant={row.percentage >= 95 ? 'blue' : 'outline'}>{row.status}</Badge>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

    </div>
  );
};

export default Attendance;
