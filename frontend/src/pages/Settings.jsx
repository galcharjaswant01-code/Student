import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { User, Bell, Moon, Sun, Lock, Shield, Check } from 'lucide-react';
import useDashboardStore from '../store/useDashboardStore';

const Settings = () => {
  const { themePreferences, setTheme } = useDashboardStore();
  const isDark = themePreferences?.theme !== 'light';

  const [activeTab, setActiveTab] = useState('Account');
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = () => {
    setSavedMsg('Settings saved successfully.');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Portal Settings</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Configure account preferences, notifications, security, and theme appearance.</p>
        </div>
        <Button variant="primary" icon={Check} onClick={handleSave}>
          Save Settings
        </Button>
      </div>

      {savedMsg && (
        <div className="p-3 rounded-lg border border-blue-600/40 bg-blue-50/50 dark:bg-blue-950/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          {savedMsg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {['Account', 'Notifications', 'Appearance', 'Security', 'Privacy'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${activeTab === tab ? 'border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 bg-transparent' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Settings Tab Panes */}
      {activeTab === 'Account' && (
        <Card title="Account Settings" subtitle="Personal student identity and communication email">
          <form className="space-y-4 max-w-lg">
            <Input label="Student Name" defaultValue="Alex Johnson" icon={User} />
            <Input label="Student Email" defaultValue="alex.johnson@university.edu" icon={User} />
            <Input label="Student ID" defaultValue="STU-2026-8942" disabled />
          </form>
        </Card>
      )}

      {activeTab === 'Notifications' && (
        <Card title="Notification Preferences" subtitle="Manage alerts for assignments, grades, and classes">
          <div className="space-y-4 max-w-lg text-xs">
            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Email Assignment Reminders</p>
                <p className="text-slate-500 dark:text-slate-400">Receive an email 24h before submission deadline</p>
              </div>
              <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4" />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Class Schedule Notifications</p>
                <p className="text-slate-500 dark:text-slate-400">Push notifications for upcoming lectures</p>
              </div>
              <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4" />
            </label>
          </div>
        </Card>
      )}

      {activeTab === 'Appearance' && (
        <Card title="Theme & Visual Appearance" subtitle="Choose light or dark mode font theme">
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 w-36 transition-colors ${!isDark ? 'border-blue-600 text-blue-600 font-bold bg-blue-50/50' : 'border-slate-200 dark:border-slate-800 text-slate-500'}`}
            >
              <Sun className="w-6 h-6" />
              <span className="text-xs">Light Mode</span>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 w-36 transition-colors ${isDark ? 'border-blue-500 text-blue-400 font-bold bg-blue-950/40' : 'border-slate-200 dark:border-slate-800 text-slate-500'}`}
            >
              <Moon className="w-6 h-6" />
              <span className="text-xs">Dark Mode</span>
            </button>
          </div>
        </Card>
      )}

      {activeTab === 'Security' && (
        <Card title="Security & Authentication" subtitle="Manage passwordless authentication and security keys">
          <div className="space-y-4 max-w-lg">
            <Input label="New Password" type="password" placeholder="••••••••" icon={Lock} />
            <Input label="Confirm New Password" type="password" placeholder="••••••••" icon={Lock} />
          </div>
        </Card>
      )}

      {activeTab === 'Privacy' && (
        <Card title="Privacy Settings" subtitle="Control visibility of student academic record">
          <div className="space-y-3 max-w-lg text-xs">
            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white">Allow directory search by classmates</span>
              <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4" />
            </label>
          </div>
        </Card>
      )}

    </div>
  );
};

export default Settings;
