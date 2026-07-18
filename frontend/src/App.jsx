import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Assignments from './pages/Assignments'
import Attendance from './pages/Attendance'
import Courses from './pages/Courses'
import Resources from './pages/Resources'
import Messages from './pages/Messages'
import AIStudio from './pages/AIStudio'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import useDashboardStore from './store/useDashboardStore'

function App() {
  const { themePreferences } = useDashboardStore();

  React.useEffect(() => {
    if (themePreferences?.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [themePreferences?.theme]);

  return (
    <ErrorBoundary>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="courses" element={<Courses />} />
            <Route path="resources" element={<Resources />} />
            <Route path="messages" element={<Messages />} />
            <Route path="assistant" element={<AIStudio />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
