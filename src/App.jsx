import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore.js';
import Header from './components/layout/Header.jsx';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';

// Pages
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CreateQuiz from './pages/CreateQuiz.jsx';
import EditQuiz from './pages/EditQuiz.jsx';
import TakeQuiz from './pages/TakeQuiz.jsx';
import QuizResponses from './pages/QuizResponses.jsx';
import Settings from './pages/Settings.jsx';
import Pricing from './pages/Pricing.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import GoogleAnalytics from './components/GoogleAnalytics.jsx';

function App() {
  const { init } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <GoogleAnalytics />
      <div className="min-h-screen bg-bg-primary">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/create" element={
            <div className="min-h-screen bg-bg-primary">
              <Header />
              <div className="pt-20 px-6 max-w-5xl mx-auto">
                <CreateQuiz />
              </div>
            </div>
          } />

          {/* Protected routes with dashboard layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
          </Route>

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Settings />} />
          </Route>

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <DashboardLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
          </Route>

          {/* Quiz editor - accessible to all (for anonymous quizzes) */}
          <Route
            path="/quiz/:quizId/edit"
            element={
              <div className="min-h-screen bg-bg-primary">
                <Header />
                <div className="pt-20 px-6 max-w-5xl mx-auto">
                  <EditQuiz />
                </div>
              </div>
            }
          />

          {/* Public quiz taking (no auth required) */}
          <Route
            path="/quiz/:shareId/take"
            element={<TakeQuiz />}
          />

          {/* Quiz responses (creator only) */}
          <Route
            path="/quiz/:quizId/responses"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<QuizResponses />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Toast notifications */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#21212D',
              color: '#F5F5F7',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#21212D',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#21212D',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
