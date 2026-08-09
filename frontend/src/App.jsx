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
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import AIStudio from './pages/AIStudio'
import AIToolView from './pages/AIToolView'
import useDashboardStore from './store/useDashboardStore'

function App() {
  React.useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

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
            <Route path="calendar" element={<Calendar />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="ai-studio" element={<AIStudio />} />
            <Route path="ai-studio/tool/:toolId" element={<AIToolView />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
