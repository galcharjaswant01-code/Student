import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import { getFriendlyErrorMessage } from '../utils/authErrors';
import { ArrowRight, Compass, Users, BookOpen, Bot } from 'lucide-react';

const Home = () => {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { 
    loginWithGoogle, 
    loginAsGuest,
    currentUser 
  } = useAuth();

  const navigate = useNavigate();

  // Redirect if already authenticated as a full student
  React.useEffect(() => {
    if (currentUser && !currentUser.isGuest) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleGoogleSignIn = async () => {
    setError('');
    setSuccessMsg('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };



  const handleGuestAccess = () => {
    loginAsGuest();
    navigate('/courses');
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* LEFT COLUMN — Realistic Student Visual Section */}
        <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full bg-slate-100 dark:bg-slate-900 overflow-hidden flex flex-col justify-between p-6 sm:p-8">
          {/* Realistic Student Photography */}
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop" 
            alt="University students studying together"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Natural Dark Navy Overlay */}
          <div className="absolute inset-0 bg-slate-950/70" />

          {/* Minimal 3-Color Stats */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 max-w-xs">
            <StatCard icon={Users} title="10K+ Students" subtitle="Active on platform" />
            <StatCard icon={BookOpen} title="500+ Resources" subtitle="Academic library" />
            <StatCard icon={Bot} title="AI Study Assistant" subtitle="Powered learning" />
          </div>

          {/* Bottom Hero Quote */}
          <div className="relative z-10 space-y-1 mt-6">
            <h2 className="text-xl font-bold text-white tracking-tight">
              StudentHub Academic Portal
            </h2>
            <p className="text-xs text-slate-300 font-normal leading-relaxed">
              Designed for modern university students to organize studies, track attendance, and achieve academic goals.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN — Clean 3-Color Authentication Section */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800">
          
          <div className="space-y-6">
            {/* Logo & Header */}
            <div>
              <div className="mb-6">
                <Logo size="md" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Welcome to StudentHub
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-normal leading-relaxed">
                Your digital campus for learning, managing academics, and achieving more.
              </p>
            </div>

            {/* Error / Success Alerts */}
            {error && (
              <AlertMessage 
                type="error" 
                message={error} 
                onClose={() => setError('')} 
              />
            )}
            {successMsg && (
              <AlertMessage 
                type="success" 
                message={successMsg} 
                onClose={() => setSuccessMsg('')} 
              />
            )}

            {/* Authentication Buttons (STRICT TRANSPARENT BACKGROUNDS) */}
            <div className="space-y-3.5">
              
              {/* 1. Continue with Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold text-sm transition-colors disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* 3. Continue as Guest */}
              <div>
                <button
                  type="button"
                  onClick={handleGuestAccess}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-300 dark:border-slate-800 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Continue as Guest</span>
                </button>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-2 text-center text-xs text-slate-500 dark:text-slate-400">
            <div>
              New student?{' '}
              <Link 
                to="/signup" 
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Create your account
              </Link>
            </div>

            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400">
              <a href="#privacy" className="hover:underline">Privacy Policy</a>
              <span>•</span>
              <a href="#terms" className="hover:underline">Terms of Service</a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;
