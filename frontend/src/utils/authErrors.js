/**
 * Maps raw Firebase auth error codes into friendly, simple English messages for students.
 */
export function getFriendlyErrorMessage(error) {
  if (!error) return 'An unexpected error occurred. Please try again.';

  const code = error.code || '';
  const message = error.message || '';

  switch (code) {
    case 'auth/popup-closed-by-user':
      return 'The sign-in window was closed before finishing. Please click "Continue with Google" again.';

    case 'auth/cancelled-popup-request':
      return 'Sign-in attempt was cancelled. Please try again.';

    case 'auth/popup-blocked':
      return 'Your browser blocked the pop-up window. Please allow pop-ups for this site and try again.';

    case 'auth/invalid-email':
      return 'Please enter a valid student email address (e.g. student@university.edu).';

    case 'auth/user-disabled':
      return 'This student account has been disabled. Please contact campus helpdesk support.';

    case 'auth/user-not-found':
      return 'No student account was found with this email address. Please check your email or create a new account.';

    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please try again or use the passwordless magic link option.';

    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Please sign in instead.';

    case 'auth/weak-password':
      return 'Your password is too weak. Please use at least 6 characters.';

    case 'auth/network-request-failed':
      return 'Unable to connect. Please check your internet connection and try again.';

    case 'auth/too-many-requests':
      return 'Too many sign-in attempts. Please wait a few moments and try again.';

    case 'auth/invalid-action-code':
    case 'auth/expired-action-code':
      return 'This magic sign-in link has expired or was already used. Please request a new magic link.';

    default:
      if (message.includes('popup-closed-by-user')) {
        return 'The sign-in window was closed before finishing. Please try again.';
      }
      if (message.includes('network')) {
        return 'Network connection error. Please check your internet connection.';
      }
      return 'Unable to sign in right now. Please try again or contact support.';
  }
}
