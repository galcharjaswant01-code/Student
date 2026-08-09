import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { User, Mail, GraduationCap, Calendar, BookOpen, Edit2, ShieldCheck, Check } from 'lucide-react';

const Profile = () => {
  const { currentUser, isGuest } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: currentUser?.displayName || (isGuest ? 'Guest Visitor' : 'Alex Johnson'),
    email: currentUser?.email || (isGuest ? 'guest@studenthub.edu' : 'alex.johnson@university.edu'),
    studentId: 'STU-2026-8942',
    course: 'B.Sc. Computer Science & AI',
    semester: 'Semester 6 (Final Year)',
    enrollmentYear: '2023',
    gpa: '3.88 / 4.00',
  });

  return (
    <div className="p-4 sm:p-6 w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Student Profile</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage your academic credentials and student record.</p>
        </div>
        <Button 
          variant={isEditing ? 'secondary' : 'primary'} 
          icon={isEditing ? Check : Edit2} 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Avatar & Summary */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="text-center flex flex-col items-center p-6">
            <Avatar name={formData.name} size="lg" className="w-20 h-20 text-xl mb-4" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{formData.name}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{formData.email}</p>
            <div className="mt-3">
              <Badge variant="blue">{isGuest ? 'Guest Access Mode' : 'Verified Enrolled Student'}</Badge>
            </div>

            <div className="w-full border-t border-slate-100 dark:border-slate-800 mt-6 pt-4 space-y-2.5 text-left text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Student ID:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formData.studentId}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Academic GPA:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formData.gpa}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Enrollment Year:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formData.enrollmentYear}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Information & Form */}
        <div className="lg:col-span-8">
          <Card title="Academic & Personal Details">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  icon={User}
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  label="Email Address"
                  icon={Mail}
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Enrolled Program / Major"
                  icon={GraduationCap}
                  disabled={!isEditing}
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                />
                <Input
                  label="Current Semester"
                  icon={BookOpen}
                  disabled={!isEditing}
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Student ID Number"
                  icon={ShieldCheck}
                  disabled={true}
                  value={formData.studentId}
                />
                <Input
                  label="Enrollment Year"
                  icon={Calendar}
                  disabled={true}
                  value={formData.enrollmentYear}
                />
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
