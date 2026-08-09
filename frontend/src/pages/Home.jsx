import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import { getFriendlyErrorMessage } from '../utils/authErrors';
import { Mail, ArrowRight, Compass } from 'lucide-react';

const Home = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { 
    loginWithGoogle, 
    sendMagicLink, 
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

  const handleMagicLinkSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await sendMagicLink(email);
      setSuccessMsg(`A magic sign-in link has been sent to ${email}. Please check your inbox.`);
    } catch (err) {
      console.error('Magic link error:', err);
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
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm sm:shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
        
        {/* LEFT COLUMN — Realistic Student/University Image */}
        <div className="lg:col-span-6 relative min-h-[280px] lg:min-h-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop" 
            alt="University students studying together"
            className="w-full h-full object-cover"
          />
          {/* Natural subtle gradient overlay at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-8 text-white">
            <div className="max-w-md space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Empowering Student Success
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                Join thousands of students managing their courses, attendance, and academic progress with ease.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Clean & Simple Login Section */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white dark:bg-slate-900">
          
          <div className="space-y-6">
            {/* Logo & Header */}
            <div>
              <div className="mb-6">
                <Logo size="md" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Welcome to StudentHub
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-normal leading-relaxed">
                Your digital campus for learning and managing academics.
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

            {/* Login Options */}
            <div className="space-y-4">
              
              {/* 1. Continue with Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-800 dark:text-slate-100 font-semibold text-sm transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center justify-center py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <span className="relative px-3 bg-white dark:bg-slate-900 text-xs text-slate-500 font-medium">
                  or with email magic link
                </span>
              </div>

              {/* 2. Passwordless Magic Link Email Input */}
              <form onSubmit={handleMagicLinkSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Student Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@university.edu"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <LoadingSpinner size="sm" className="text-white" />
                  ) : (
                    <>
                      <span>Send Magic Sign-In Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* 3. Continue as Guest */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGuestAccess}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Continue as Guest</span>
                </button>
              </div>

            </div>
          </div>

          {/* Footer & Links */}
          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-3 text-center text-xs text-slate-500 dark:text-slate-400">
            <div>
              New student?{' '}
              <Link 
                to="/signup" 
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Create your account
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
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
