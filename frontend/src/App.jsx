import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import VerifyMagicLink from './pages/VerifyMagicLink'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Assignments from './pages/Assignments'
import Attendance from './pages/Attendance'
import Courses from './pages/Courses'
import Resources from './pages/Resources'
import Messages from './pages/Messages'
import Calendar from './pages/Calendar'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import AIStudio from './pages/AIStudio'
import AIToolView from './pages/AIToolView'

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
            {/* First Page / Landing & Login Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Home />} />
            <Route path="/verify" element={<VerifyMagicLink />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Student App Portal Routes */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
              <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
              <Route path="/courses" element={<ProtectedRoute allowGuest={true}><Courses /></ProtectedRoute>} />
              <Route path="/resources" element={<ProtectedRoute allowGuest={true}><Resources /></ProtectedRoute>} />
              <Route path="/ai-studio" element={<ProtectedRoute><AIStudio /></ProtectedRoute>} />
              <Route path="/ai-studio/tool/:toolId" element={<ProtectedRoute><AIToolView /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
