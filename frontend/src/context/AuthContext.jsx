import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  sendPasswordResetEmail
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
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function loginWithGoogleRedirect() {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(auth, provider);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function loginAsDemoUser() {
    const demoUser = {
      uid: 'demo-student-123',
      email: 'demo@student.edu',
      displayName: 'Demo Student',
      emailVerified: true
    };
    localStorage.setItem('access_token', 'demo-access-token');
    setCurrentUser(demoUser);
    return demoUser;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          const apiBaseUrl = getApiBaseUrl();
          const response = await axios.post(`${apiBaseUrl}/api/v1/auth/firebase-login/`, {
            token: idToken
          });

          
          if (response.data.tokens) {
            localStorage.setItem('access_token', response.data.tokens.access);
            localStorage.setItem('refresh_token', response.data.tokens.refresh);
            setCurrentUser({ ...user, djangoData: response.data.user });
          } else {
            setCurrentUser(user);
          }
        } catch (error) {
          console.error("Failed to sync with Django backend:", error);
          setCurrentUser(user);
        }
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loginWithGoogle,
    loginWithGoogleRedirect,
    loginAsDemoUser,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
