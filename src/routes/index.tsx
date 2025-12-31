/**
 * Application Routes
 * Defines all routes for the application using React Router
 */

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Loader } from '../app/components/Loader';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '../app/components/AppLayout';

// Lazy load screens for better performance using feature barrel exports
const LandingPage = lazy(() => import('../features/new-landing/pages/LandingPage'));
const ComingSoonPage = lazy(() => import('../features/new-landing/pages/ComingSoonPage'));
const Auth = lazy(() => import('../features/auth').then(m => ({ default: m.Auth })));
const Login = lazy(() => import('../features/auth').then(m => ({ default: m.Login })));
const Signup = lazy(() => import('../features/auth').then(m => ({ default: m.Signup })));
const KidDashboard = lazy(() => import('../features/dashboard').then(m => ({ default: m.KidDashboard })));
const ParentDashboard = lazy(() => import('../features/dashboard').then(m => ({ default: m.ParentDashboard })));
const Modules = lazy(() => import('../features/modules').then(m => ({ default: m.Modules })));
const ModuleDetail = lazy(() => import('../features/modules').then(m => ({ default: m.ModuleDetail })));
const LessonPlayer = lazy(() => import('../features/modules').then(m => ({ default: m.LessonPlayer })));
const AILab = lazy(() => import('../features/ai-lab').then(m => ({ default: m.AILab })));
const Projects = lazy(() => import('../features/projects').then(m => ({ default: m.Projects })));
const Profile = lazy(() => import('../features/profile').then(m => ({ default: m.Profile })));
const Contact = lazy(() => import('../features/contact').then(m => ({ default: m.Contact })));
const ComponentShowcase = lazy(() => import('../app/screens/ComponentShowcase').then(m => ({ default: m.ComponentShowcase })));

// Email verification pages
const VerifyEmail = lazy(() => import('../pages/VerifyEmail').then(m => ({ default: m.VerifyEmail })));
const AuthCallback = lazy(() => import('../pages/AuthCallback').then(m => ({ default: m.AuthCallback })));

// Onboarding
const Onboarding = lazy(() => import('../features/onboarding').then(m => ({ default: m.Onboarding })));



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
            <LandingPage />
          </Suspense>
        } 
      />
      <Route
        path="/auth"
        element={<Navigate to="/signup" replace />}
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
        path="/verify-email"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <VerifyEmail />
          </Suspense>
        }
      />
      <Route
        path="/auth/callback"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <AuthCallback />
          </Suspense>
        }
      />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute requireEmailVerified={true} requireOnboarding={false}>
            <Suspense fallback={<Loader fullScreen message="Loading..." />}>
              <Onboarding />
            </Suspense>
          </ProtectedRoute>
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
        path="/modules/:moduleId/lesson/:lessonId"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loader fullScreen message="Loading..." />}>
              <LessonPlayer />
            </Suspense>
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

      {/* Landing Page Sub-routes - Company */}
      <Route
        path="/about"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="About Us" />
          </Suspense>
        }
      />
      <Route
        path="/careers"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Careers" />
          </Suspense>
        }
      />
      <Route
        path="/safety"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Safety First" />
          </Suspense>
        }
      />
      <Route
        path="/parents"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Parent Guide" />
          </Suspense>
        }
      />

      {/* Landing Page Sub-routes - Resources */}
      <Route
        path="/blog"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Blog" />
          </Suspense>
        }
      />
      <Route
        path="/curriculum"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Curriculum" />
          </Suspense>
        }
      />
      <Route
        path="/guide"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Learning Guide" />
          </Suspense>
        }
      />
      <Route
        path="/activities"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Activities" />
          </Suspense>
        }
      />

      {/* Landing Page Sub-routes - Buddies */}
      <Route
        path="/buddies/noah"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Noah (Math)" />
          </Suspense>
        }
      />
      <Route
        path="/buddies/dominic"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Dominic (History)" />
          </Suspense>
        }
      />
      <Route
        path="/buddies/ashley"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Ashley (Science)" />
          </Suspense>
        }
      />
      <Route
        path="/buddies/charlie"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Charlie (Coding)" />
          </Suspense>
        }
      />
      <Route
        path="/buddies/chloe"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Chloe (Art)" />
          </Suspense>
        }
      />
      <Route
        path="/pals"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Buddies" />
          </Suspense>
        }
      />

      {/* Landing Page Sub-routes - Research */}
      <Route
        path="/research"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Research" />
          </Suspense>
        }
      />
      <Route
        path="/research/ai-edu"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="AI in Education" />
          </Suspense>
        }
      />
      <Route
        path="/research/safety"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Child Safety" />
          </Suspense>
        }
      />
      <Route
        path="/research/adaptive"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Adaptive Learning" />
          </Suspense>
        }
      />

      {/* Landing Page Sub-routes - Legal */}
      <Route
        path="/privacy"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Privacy Policy" />
          </Suspense>
        }
      />
      <Route
        path="/terms"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Terms of Service" />
          </Suspense>
        }
      />
      <Route
        path="/safety-policy"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Safety Policy" />
          </Suspense>
        }
      />

      {/* Landing Page Sub-routes - Support */}
      <Route
        path="/discord"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Discord" />
          </Suspense>
        }
      />
      <Route
        path="/help"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Help Center" />
          </Suspense>
        }
      />

      {/* Landing Page Sub-routes - Navbar */}
      <Route
        path="/pricing"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Pricing" />
          </Suspense>
        }
      />
      <Route
        path="/subjects/math"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Math" />
          </Suspense>
        }
      />
      <Route
        path="/subjects/science"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Science" />
          </Suspense>
        }
      />
      <Route
        path="/subjects/history"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="History" />
          </Suspense>
        }
      />
      <Route
        path="/subjects/coding"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Coding" />
          </Suspense>
        }
      />
      <Route
        path="/parents/safety"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Safety & Privacy" />
          </Suspense>
        }
      />
      <Route
        path="/parents/guide"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Getting Started" />
          </Suspense>
        }
      />
      <Route
        path="/parents/success-stories"
        element={
          <Suspense fallback={<Loader fullScreen message="Loading..." />}>
            <ComingSoonPage title="Success Stories" />
          </Suspense>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
