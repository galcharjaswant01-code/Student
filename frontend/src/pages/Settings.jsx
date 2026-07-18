import React, { useState } from 'react';

import { 
  User, Shield, Bell, Palette, Camera, 
  Smartphone, Monitor, Moon, Sun, Key, 
  Lock, LogOut, ChevronRight, CheckCircle2 
} from 'lucide-react';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const renderProfile = () => (
    <div
      className="space-y-8"
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Public Profile</h3>
        <p className="text-slate-400 text-sm">Manage how your profile appears to other students and faculty.</p>
      </div>

      <div className="flex items-center gap-6 pb-6 border-b border-slate-700/50">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gradient- bg-indigo-500 flex items-center justify-center text-3xl text-white font-bold">
            SJ
          </div>
          <button className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Camera className="w-6 h-6 text-white" />
          </button>
        </div>
        <div>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-sm text-sm font-medium border border-slate-700">
            Upload Avatar
          </button>
          <p className="text-slate-500 text-xs mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">First Name</label>
          <input type="text" defaultValue="Steve" className="w-full bg-slate-900/50 border border-slate-700 rounded-sm px-4 py-2.5 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Last Name</label>
          <input type="text" defaultValue="Jobs" className="w-full bg-slate-900/50 border border-slate-700 rounded-sm px-4 py-2.5 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Email Address</label>
          <input type="email" defaultValue="steve@university.edu" className="w-full bg-slate-900/50 border border-slate-700 rounded-sm px-4 py-2.5 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-300">Short Bio</label>
          <textarea rows="3" defaultValue="Computer Science major. Passionate about AI and distributed systems." className="w-full bg-slate-900/50 border border-slate-700 rounded-sm px-4 py-2.5 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none"></textarea>
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div
      className="space-y-8"
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Appearance</h3>
        <p className="text-slate-400 text-sm">Customize the UI theme and accent colors.</p>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-slate-300">Theme Preference</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'dark', label: 'Dark Mode', icon: Moon },
            { id: 'light', label: 'Light Mode', icon: Sun },
            { id: 'system', label: 'System Default', icon: Monitor },
          ].map((theme) => (
            <button 
              key={theme.id}
              className={`flex flex-col items-center gap-3 p-6 rounded-sm border  ${
                theme.id === 'dark' 
                  ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' 
                  : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <theme.icon className="w-8 h-8" />
              <span className="font-medium">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-700/50 space-y-4">
        <label className="text-sm font-medium text-slate-300">Accent Color</label>
        <div className="flex gap-4">
          {['bg-indigo-500', 'bg-blue-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500', 'bg-purple-500'].map((color, i) => (
            <button 
              key={i}
              className={`w-10 h-10 rounded-full ${color}    ${i === 0 ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div
      className="space-y-8"
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Notifications</h3>
        <p className="text-slate-400 text-sm">Choose what we notify you about.</p>
      </div>

      <div className="space-y-6">
        {[
          { title: 'New Grades Posted', desc: 'Get notified when an instructor posts a new grade.', default: true },
          { title: 'Upcoming Deadlines', desc: 'Reminders 24 hours before an assignment is due.', default: true },
          { title: 'AI Study Reminders', desc: 'Smart reminders generated by the AI Studio to review notes.', default: false },
          { title: 'P2P Session Invites', desc: 'When someone invites you to a peer study room.', default: true },
        ].map((item, i) => (
          <div key={i} className="flex items-start justify-between bg-slate-900/30 p-4 rounded-sm border border-slate-700/50">
            <div className="pr-4">
              <h4 className="text-white font-medium mb-1">{item.title}</h4>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
            <button className={`w-12 h-6 rounded-full  relative shrink-0 ${item.default ? 'bg-indigo-500' : 'bg-slate-700'}`}>
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1  ${item.default ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div
      className="space-y-8"
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Security & Privacy</h3>
        <p className="text-slate-400 text-sm">Keep your account secure.</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-white font-medium flex items-center gap-2"><Key className="w-4 h-4 text-indigo-400"/> Change Password</h4>
        <div className="bg-slate-900/30 p-6 rounded-sm border border-slate-700/50 grid grid-cols-1 gap-4">
          <input type="password" placeholder="Current Password" className="w-full bg-slate-900/50 border border-slate-700 rounded-sm px-4 py-2.5 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" />
          <input type="password" placeholder="New Password" className="w-full bg-slate-900/50 border border-slate-700 rounded-sm px-4 py-2.5 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" />
          <button className="justify-self-start px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm text-sm font-medium -indigo-500/20">
            Update Password
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-700/50 space-y-4">
        <h4 className="text-white font-medium flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-400"/> Two-Factor Authentication</h4>
        <div className="flex items-center justify-between bg-emerald-500/10 p-4 rounded-sm border border-emerald-500/20">
          <div>
            <h4 className="text-emerald-400 font-medium mb-1">2FA is Enabled</h4>
            <p className="text-emerald-400/70 text-sm">Your account is secured with an authenticator app.</p>
          </div>
          <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-sm text-sm font-medium hover:bg-slate-700">
            Configure
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-700/50 space-y-4">
        <h4 className="text-white font-medium flex items-center gap-2"><Smartphone className="w-4 h-4 text-rose-400"/> Active Sessions</h4>
        <div className="bg-slate-900/30 p-4 rounded-sm border border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Monitor className="w-8 h-8 text-slate-400" />
            <div>
              <p className="text-white font-medium">Mac OS • Safari</p>
              <p className="text-slate-500 text-sm">San Francisco, CA • Current Session</p>
            </div>
          </div>
          <span className="text-xs font-medium bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-sm">Active Now</span>
        </div>
        <button className="text-rose-400 text-sm font-medium hover:text-rose-300 flex items-center gap-2 mt-4">
          <LogOut className="w-4 h-4" /> Log out of all other devices
        </button>
      </div>

    </div>
  );

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto selection:bg-indigo-500/30">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account settings and preferences.</p>
        </div>

        {/* Main Settings Card */}
        <div className="flex-1 flex flex-col md:flex-row gap-8 bg-slate-800/30 border border-slate-700/50 rounded-sm p-6">
          
          {/* Navigation Sidebar */}
          <div className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-slate-700/50 pb-6 md:pb-0 md:pr-6 space-y-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-sm  ${
                    isActive 
                      ? 'bg-indigo-600/10 text-indigo-400' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{tab.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 max-w-2xl relative">
            
              {activeTab === 'profile' && <div key="profile">{renderProfile()}</div>}
              {activeTab === 'appearance' && <div key="appearance">{renderAppearance()}</div>}
              {activeTab === 'notifications' && <div key="notifications">{renderNotifications()}</div>}
              {activeTab === 'security' && <div key="security">{renderSecurity()}</div>}
            

            {/* Sticky Save Bar */}
            <div className="sticky bottom-0 mt-8 pt-4 pb-2 bg-slate-800/80 border-t border-slate-700 flex justify-end">
              <button 
                onClick={handleSave}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm text-sm font-bold -indigo-500/25 flex items-center gap-2"
              >
                {saved ? <><CheckCircle2 className="w-4 h-4"/> Saved</> : 'Save Changes'}
              </button>
            </div>
          </div>

        </div>

      </div>
  );
};

export default Settings;
