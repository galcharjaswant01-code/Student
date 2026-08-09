import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';

const VerifyMagicLink = () => {
  const [status, setStatus] = useState('verifying');
  const [error, setError] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [needsEmail, setNeedsEmail] = useState(false);
  const { verifyMagicLink, isSignInWithEmailLink } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerification = async () => {
      const href = window.location.href;
      if (!isSignInWithEmailLink(href)) {
        setStatus('error');
        setError('Invalid or expired authentication link.');
        return;
      }

      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        setNeedsEmail(true);
        setStatus('prompt_email');
        return;
      }

      try {
        await verifyMagicLink(email, href);
        window.localStorage.removeItem('emailForSignIn');
        setStatus('success');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } catch (err) {
        console.error('Magic link verification failed:', err);
        setStatus('error');
        setError(err.message || 'Failed to authenticate with magic link.');
      }
    };

    handleVerification();
  }, [isSignInWithEmailLink, verifyMagicLink, navigate]);

  const handleManualEmailSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput) return;

    setStatus('verifying');
    try {
      await verifyMagicLink(emailInput, window.location.href);
      window.localStorage.removeItem('emailForSignIn');
      setStatus('success');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Manual magic link verification failed:', err);
      setStatus('error');
      setError(err.message || 'Verification failed. Please ensure the email matches the request.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-800 dark:text-slate-100">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>

        {status === 'verifying' && (
          <div className="space-y-4">
            <LoadingSpinner size="lg" className="mx-auto" />
            <h2 className="text-xl font-bold">Verifying Magic Link...</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Please wait while we log you into StudentHub.
            </p>
          </div>
        )}

        {status === 'prompt_email' && (
          <form onSubmit={handleManualEmailSubmit} className="space-y-4 text-left">
            <h2 className="text-xl font-bold text-center">Confirm Your Email</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              Please re-enter your email address to complete sign in.
            </p>
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="student@university.edu"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-colors"
            >
              Complete Sign In
            </button>
          </form>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <AlertMessage type="success" message="Successfully authenticated! Redirecting to StudentHub..." />
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <AlertMessage type="error" message={error} />
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl transition-colors mt-4"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyMagicLink;
