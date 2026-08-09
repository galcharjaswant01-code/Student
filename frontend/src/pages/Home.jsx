import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import { 
  Users, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  Mail, 
  ArrowRight, 
  UserCheck, 
  Lock, 
  ShieldCheck, 
  Compass,
  GraduationCap
} from 'lucide-react';

const Home = () => {
  const [authMethod, setAuthMethod] = useState('magic-link'); // 'magic-link' | 'password'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { 
    loginWithGoogle, 
    sendMagicLink, 
    login, 
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
      setError(err.message || 'Google authentication failed. Please try again.');
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
      setSuccessMsg(`Magic login link sent to ${email}! Check your inbox to complete sign in.`);
    } catch (err) {
      console.error('Magic link error:', err);
      setError(err.message || 'Failed to send magic link. Please check your email.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Password login error:', err);
      setError('Invalid email or password. You can also try sending a magic link.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    loginAsGuest();
    navigate('/courses');
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 flex items-center justify-center p-0 md:p-6 lg:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Subtle Gradient Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl min-h-screen md:min-h-[85vh] bg-slate-950/70 border border-white/10 backdrop-blur-2xl rounded-none md:rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT COLUMN — Realistic Student Visual Section (55% desktop ~ 7/12 cols) */}
        <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
          {/* High-quality realistic student image background */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-100"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop')` 
            }}
          />
          
          {/* Subtle Dark Gradient Overlay for optimal text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />

          {/* Top Brand Pill */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="backdrop-blur-md bg-slate-900/60 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-lg">
              <Logo size="sm" />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Campus Portal
            </div>
          </div>

          {/* Floating UI Stat Cards */}
          <div className="relative z-10 my-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
            <StatCard 
              icon={Users} 
              title="10K+ Students" 
              subtitle="Enrolled across top departments"
              badge="Active"
              delayClass="animate-bounce-slow"
            />
            <StatCard 
              icon={CheckCircle2} 
              title="95% Attendance" 
              subtitle="Automated biometric & QR check-in"
              badge="Verified"
              delayClass="animate-pulse-slow"
            />
            <StatCard 
              icon={BookOpen} 
              title="500+ Resources" 
              subtitle="Lecture notes, labs & e-books"
              badge="Updated"
              delayClass="animate-bounce-slow"
            />
            <StatCard 
              icon={Sparkles} 
              title="AI Study Assistant" 
              subtitle="24/7 personal tutor & quiz maker"
              badge="GenAI"
              delayClass="animate-pulse-slow"
            />
          </div>

          {/* Bottom Hero Description */}
          <div className="relative z-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Empowering Students. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400">
                Simplifying Academic Life.
              </span>
            </h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Access course schedules, track your attendance, collaborate on assignments, and leverage AI learning tools—all in one unified student portal.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN — Login / Welcome Section (45% desktop ~ 5/12 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-slate-900/90 backdrop-blur-xl">
          
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
                <GraduationCap className="w-3.5 h-3.5" />
                Student Portal Gateway
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Welcome to StudentHub
              </h1>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                Your complete digital campus for learning, managing academics, and achieving more.
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

            {/* Auth Buttons */}
            <div className="space-y-3">
              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 group"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800" />
                </div>
                <span className="relative px-3 bg-slate-900 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  or sign in with email
                </span>
              </div>

              {/* Method Switcher */}
              <div className="grid grid-cols-2 p-1 bg-slate-800/80 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAuthMethod('magic-link')}
                  className={`py-2 rounded-lg transition-all ${authMethod === 'magic-link' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  ✨ Passwordless Link
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('password')}
                  className={`py-2 rounded-lg transition-all ${authMethod === 'password' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  🔒 Password Sign-In
                </button>
              </div>

              {/* Email Form */}
              {authMethod === 'magic-link' ? (
                <form onSubmit={handleMagicLinkSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Student Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@university.edu"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-600/25 disabled:opacity-50"
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
              ) : (
                <form onSubmit={handlePasswordLoginSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Student Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@university.edu"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-slate-300">
                        Password
                      </label>
                      <Link 
                        to="/forgot-password" 
                        className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-600/25 disabled:opacity-50"
                  >
                    {loading ? (
                      <LoadingSpinner size="sm" className="text-white" />
                    ) : (
                      <span>Sign In to Account</span>
                    )}
                  </button>
                </form>
              )}

              {/* Continue as Guest Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGuestAccess}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white font-medium text-xs transition-all duration-200"
                >
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>Continue as Guest Visitor</span>
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-1">
                  Browse public courses, syllabus & resources without signing in
                </p>
              </div>
            </div>
          </div>

          {/* Footer & Links */}
          <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-3 text-center text-xs text-slate-500">
            <div>
              New student?{' '}
              <Link 
                to="/signup" 
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors inline-flex items-center gap-1"
              >
                <span>Create your account</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
              <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#help" className="hover:text-slate-400 transition-colors">Campus Helpdesk</a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;
