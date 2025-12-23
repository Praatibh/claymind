/**
 * Application Routes
 * Defines all routes for the application using React Router
 */

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from '../app/components/Loader';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '../app/components/AppLayout';

// Lazy load screens for better performance using feature barrel exports
const Landing = lazy(() => import('../features/landing').then(m => ({ default: m.Landing })));
const Auth = lazy(() => import('../features/auth').then(m => ({ default: m.Auth })));
const Login = lazy(() => import('../features/auth').then(m => ({ default: m.Login })));
const Signup = lazy(() => import('../features/auth').then(m => ({ default: m.Signup })));
const KidDashboard = lazy(() => import('../features/dashboard').then(m => ({ default: m.KidDashboard })));
const ParentDashboard = lazy(() => import('../features/dashboard').then(m => ({ default: m.ParentDashboard })));
const Modules = lazy(() => import('../features/modules').then(m => ({ default: m.Modules })));
const ModuleDetail = lazy(() => import('../features/modules').then(m => ({ default: m.ModuleDetail })));
const AILab = lazy(() => import('../features/ai-lab').then(m => ({ default: m.AILab })));
const Projects = lazy(() => import('../features/projects').then(m => ({ default: m.Projects })));
const Profile = lazy(() => import('../features/profile').then(m => ({ default: m.Profile })));
const Contact = lazy(() => import('../features/contact').then(m => ({ default: m.Contact })));
const ComponentShowcase = lazy(() => import('../app/screens/ComponentShowcase').then(m => ({ default: m.ComponentShowcase })));

// Wrapper components to provide navigation props to screens
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function LandingWrapper() {
  const navigate = useNavigate();
  return <Landing onGetStarted={() => navigate('/auth')} onParentView={() => navigate('/auth')} />;
}

function AuthWrapper() {
  const navigate = useNavigate();
  
  const handleLogin = async (userType: 'kid' | 'parent') => {
    // For now, just navigate - actual login will be handled in Phase 2
    navigate(userType === 'kid' ? '/kid-dashboard' : '/parent-dashboard');
  };

  return <Auth onLogin={handleLogin} />;
}

function KidDashboardWrapper() {
  const navigate = useNavigate();
  return (
    <KidDashboard
      onContinueLearning={() => navigate('/modules')}
      onViewModules={() => navigate('/modules')}
      onViewProjects={() => navigate('/projects')}
    />
  );
}

function ModulesWrapper() {
  const navigate = useNavigate();
  return <Modules onModuleClick={(moduleId: string) => navigate(`/modules/${moduleId}`)} />;
}

function ModuleDetailWrapper() {
  const navigate = useNavigate();
  return (
    <ModuleDetail
      onStartLesson={(lessonId: string) => navigate(`/ai-lab?lesson=${lessonId}`)}
      onBack={() => navigate('/modules')}
    />
  );
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <LandingWrapper />
          </Suspense>
        } 
      />
      <Route
        path="/auth"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <AuthWrapper />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <Signup />
          </Suspense>
        }
      />
      <Route
        path="/showcase" 
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComponentShowcase />
          </Suspense>
        } 
      />

      {/* Protected Routes - Kid (with Layout) */}
      <Route
        path="/kid-dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Suspense fallback={<Loader fullScreen message="Loading..." />}>
                <KidDashboardWrapper />
              </Suspense>
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/modules"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Suspense fallback={<Loader fullScreen message="Loading..." />}>
                <ModulesWrapper />
              </Suspense>
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/modules/:moduleId"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Suspense fallback={<Loader fullScreen message="Loading..." />}>
                <ModuleDetailWrapper />
              </Suspense>
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-lab"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Suspense fallback={<Loader fullScreen message="Loading..." />}>
                <AILab />
              </Suspense>
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Suspense fallback={<Loader fullScreen message="Loading..." />}>
                <Projects />
              </Suspense>
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Suspense fallback={<Loader fullScreen message="Loading..." />}>
                <Profile />
              </Suspense>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Parent (with Layout) */}
      <Route
        path="/parent-dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Suspense fallback={<Loader fullScreen message="Loading..." />}>
                <ParentDashboard />
              </Suspense>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Shared (with Layout) */}
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Suspense fallback={<Loader fullScreen message="Loading..." />}>
                <Contact />
              </Suspense>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
