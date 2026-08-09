import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowGuest = false }) {
  const { currentUser, isGuest } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (isGuest && !allowGuest) {
    return <Navigate to="/courses" replace state={{ guestNotice: 'Authenticating as a full student is required to access personal student dashboards, attendance, assignments, and AI features.' }} />;
  }

  return children ? children : <Outlet />;
}
