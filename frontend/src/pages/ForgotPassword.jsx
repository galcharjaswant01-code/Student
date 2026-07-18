import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for further instructions.');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else {
        setError('Failed to reset password: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen pointer-events-none"></div>

      <div
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-gray-900/60 rounded-sm p-8 border border-white/10 -[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-sm bg-gradient- bg-blue-500 flex items-center justify-center -blue-500/20 mb-4 border border-white/10">
              <span className="text-white font-bold text-3xl leading-none tracking-tighter">S</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
            <p className="text-gray-400 text-sm text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {error && (
            <div
              className="bg-red-500/10 border border-red-500/50 rounded-sm p-3 flex items-start gap-3 mb-6"
            >
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          {message && (
            <div
              className="bg-green-500/10 border border-green-500/50 rounded-sm p-3 flex items-start gap-3 mb-6"
            >
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <p className="text-sm text-green-200">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input 
                  type="email" 
                  required
                  placeholder="Email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-950/50 border border-gray-800 rounded-sm py-3 pl-10 pr-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 placeholder:text-gray-600"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient- bg-blue-600 hover:bg-blue-500 hover: text-white font-bold py-3 px-4 rounded-sm flex items-center justify-center gap-2 -[0_0_20px_rgba(79,70,229,0.3)] hover:-[0_0_25px_rgba(79,70,229,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending link...' : 'Reset Password'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Remember your password?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
