import React, { useState } from 'react';

import { 
  User, Shield, Bell, Palette, Camera, 
  Smartphone, Monitor, Moon, Sun, Key, 
  Lock, LogOut, ChevronRight, CheckCircle2 
} from 'lucide-react';
import useDashboardStore from '../store/useDashboardStore';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  
  const globalProfile = useDashboardStore(state => state.userProfile);
  const setGlobalProfile = useDashboardStore(state => state.setUserProfile);

  const [profile, setProfile] = useState(globalProfile);

  const fileInputRef = React.useRef(null);

  const handleSave = () => {
    if (activeTab === 'profile') {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setGlobalProfile(profile);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, avatar: imageUrl });
    }
  };

  const renderProfile = () => (
    <div
      className="space-y-8"
    >
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Public Profile</h3>
        <p className="text-gray-500 dark:text-slate-400 text-sm">Manage how your profile appears to other students and faculty.</p>
      </div>

      <div className="flex items-center gap-6 pb-6 border-b border-gray-200 dark:border-slate-700/50">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-gray-400 dark:text-slate-400" />
            )}
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Camera className="w-6 h-6 text-white" />
          </button>
        </div>
        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleAvatarChange} 
            accept="image/jpeg, image/png, image/gif" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-white rounded-xl text-sm font-medium border border-gray-200 dark:border-slate-700"
          >
            Upload Avatar
          </button>
          <p className="text-gray-500 dark:text-slate-500 text-xs mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-slate-300">First Name</label>
          <input 
            type="text" 
            value={profile.firstName}
            onChange={(e) => setProfile({...profile, firstName: e.target.value})}
            className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Last Name</label>
          <input 
            type="text" 
            value={profile.lastName}
            onChange={(e) => setProfile({...profile, lastName: e.target.value})}
            className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" 
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Email Address</label>
          <input 
            type="email" 
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" 
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Short Bio</label>
          <textarea 
            rows="3" 
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
            className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div
      className="space-y-8"
    >
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Notifications</h3>
        <p className="text-gray-500 dark:text-slate-400 text-sm">Choose what we notify you about.</p>
      </div>

      <div className="space-y-6">
        {[
          { title: 'New Grades Posted', desc: 'Get notified when an instructor posts a new grade.', default: true },
          { title: 'Upcoming Deadlines', desc: 'Reminders 24 hours before an assignment is due.', default: true },
        ].map((item, i) => (
          <div key={i} className="flex items-start justify-between bg-gray-50 dark:bg-slate-900/30 p-4 rounded-xl border border-gray-200 dark:border-slate-700/50">
            <div className="pr-4">
              <h4 className="text-gray-900 dark:text-white font-medium mb-1">{item.title}</h4>
              <p className="text-gray-500 dark:text-slate-400 text-sm">{item.desc}</p>
            </div>
            <button className={`w-12 h-6 rounded-full  relative shrink-0 ${item.default ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-slate-700'}`}>
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${item.default ? 'left-7' : 'left-1'}`} />
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
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Security & Privacy</h3>
        <p className="text-gray-500 dark:text-slate-400 text-sm">Keep your account secure.</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-gray-900 dark:text-white font-medium flex items-center gap-2"><Key className="w-4 h-4 text-indigo-500 dark:text-indigo-400"/> Change Password</h4>
        <div className="bg-gray-50 dark:bg-slate-900/30 p-6 rounded-xl border border-gray-200 dark:border-slate-700/50 grid grid-cols-1 gap-4">
          <input type="password" placeholder="Current Password" className="w-full bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" />
          <input type="password" placeholder="New Password" className="w-full bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" />
          <button className="justify-self-start px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium shadow-sm">
            Update Password
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-slate-700/50 space-y-4">
        <h4 className="text-gray-900 dark:text-white font-medium flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-500 dark:text-emerald-400"/> Two-Factor Authentication</h4>
        <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-500/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
          <div>
            <h4 className="text-emerald-700 dark:text-emerald-400 font-medium mb-1">2FA is Enabled</h4>
            <p className="text-emerald-600 dark:text-emerald-400/70 text-sm">Your account is secured with an authenticator app.</p>
          </div>
          <button className="px-4 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none">
            Configure
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-slate-700/50 space-y-4">
        <h4 className="text-gray-900 dark:text-white font-medium flex items-center gap-2"><Smartphone className="w-4 h-4 text-rose-500 dark:text-rose-400"/> Active Sessions</h4>
        <div className="bg-gray-50 dark:bg-slate-900/30 p-4 rounded-xl border border-gray-200 dark:border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Monitor className="w-8 h-8 text-gray-400 dark:text-slate-400" />
            <div>
              <p className="text-gray-900 dark:text-white font-medium">Mac OS • Safari</p>
              <p className="text-gray-500 dark:text-slate-500 text-sm">San Francisco, CA • Current Session</p>
            </div>
          </div>
          <span className="text-xs font-medium bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-xl">Active Now</span>
        </div>
        <button className="text-rose-600 dark:text-rose-400 text-sm font-medium hover:text-rose-700 dark:hover:text-rose-300 flex items-center gap-2 mt-4">
          <LogOut className="w-4 h-4" /> Log out of all other devices
        </button>
      </div>

    </div>
  );

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto selection:bg-indigo-500/30 bg-slate-50 dark:bg-[#0B1120] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
        
      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-slate-400">Manage your account settings and preferences.</p>
      </div>

      {/* Main Settings Card */}
      <div className="flex-1 flex flex-col md:flex-row gap-8 bg-white/70 dark:bg-slate-800/30 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-2xl p-6 shadow-sm relative z-10">
        
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-gray-200 dark:border-slate-700/50 pb-6 md:pb-0 md:pr-6 space-y-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-medium font-bold' 
                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-white'
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
            {activeTab === 'notifications' && <div key="notifications">{renderNotifications()}</div>}
            {activeTab === 'security' && <div key="security">{renderSecurity()}</div>}
          

          {/* Sticky Save Bar */}
          <div className="sticky bottom-0 mt-8 pt-4 pb-2 flex justify-end">
            <button 
              onClick={handleSave}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg"
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
