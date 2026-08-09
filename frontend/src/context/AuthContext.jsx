import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';
import { getApiBaseUrl } from '../services/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    localStorage.removeItem('is_guest_mode');
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    localStorage.removeItem('is_guest_mode');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setCurrentUser(null);
    return signOut(auth);
  }

  async function loginWithGoogle() {
    localStorage.removeItem('is_guest_mode');
    const provider = new GoogleAuthProvider();
    try {
      return await signInWithPopup(auth, provider);
    } catch (err) {
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
        console.warn('Popup blocked or closed, falling back to Google Auth Redirect...');
        return await signInWithRedirect(auth, provider);
      }
      throw err;
    }
  }

  function loginWithGoogleRedirect() {
    localStorage.removeItem('is_guest_mode');
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(auth, provider);
  }

  function sendMagicLink(email) {
    const actionCodeSettings = {
      url: `${window.location.origin}/verify`,
      handleCodeInApp: true,
    };
    window.localStorage.setItem('emailForSignIn', email);
    return sendSignInLinkToEmail(auth, email, actionCodeSettings);
  }

  function verifyMagicLink(email, href) {
    localStorage.removeItem('is_guest_mode');
    return signInWithEmailLink(auth, email, href);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function loginAsGuest() {
    const guestUser = {
      uid: 'guest-visitor-' + Date.now(),
      email: 'guest@studenthub.edu',
      displayName: 'Guest Visitor',
      isGuest: true,
      emailVerified: false
    };
    localStorage.setItem('is_guest_mode', 'true');
    setCurrentUser(guestUser);
    return guestUser;
  }

  function loginAsDemoUser() {
    localStorage.removeItem('is_guest_mode');
    const demoUser = {
      uid: 'demo-student-123',
      email: 'demo@student.edu',
      displayName: 'Demo Student',
      emailVerified: true,
      isGuest: false
    };
    localStorage.setItem('access_token', 'demo-access-token');
    setCurrentUser(demoUser);
    return demoUser;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        localStorage.removeItem('is_guest_mode');
        try {
          const idToken = await user.getIdToken();
          const apiBaseUrl = getApiBaseUrl();
          const response = await axios.post(`${apiBaseUrl}/api/v1/auth/firebase-login/`, {
            token: idToken
          });

          if (response.data.tokens) {
            localStorage.setItem('access_token', response.data.tokens.access);
            localStorage.setItem('refresh_token', response.data.tokens.refresh);
            setCurrentUser({ ...user, isGuest: false, djangoData: response.data.user });
          } else {
            setCurrentUser({ ...user, isGuest: false });
          }
        } catch (error) {
          console.error("Failed to sync with Django backend:", error);
          setCurrentUser({ ...user, isGuest: false });
        }
      } else {
        const isGuestMode = localStorage.getItem('is_guest_mode');
        if (isGuestMode === 'true') {
          setCurrentUser({
            uid: 'guest-visitor',
            email: 'guest@studenthub.edu',
            displayName: 'Guest Visitor',
            isGuest: true,
            emailVerified: false
          });
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setCurrentUser(null);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isGuest: !!currentUser?.isGuest,
    login,
    signup,
    logout,
    loginWithGoogle,
    loginWithGoogleRedirect,
    sendMagicLink,
    verifyMagicLink,
    isSignInWithEmailLink: (href) => isSignInWithEmailLink(auth, href),
    loginAsGuest,
    loginAsDemoUser,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

