/**
 * Onboarding Screen
 * Main orchestrator for the 3-step onboarding flow
 */

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { getUserRole, getDefaultRouteForRole } from '../../../lib/utils/rbac';
import { onboardingService } from '../../../lib/services/onboarding.service';
import { OnboardingWizard } from '../components/OnboardingWizard';
import { ProfileSetupStep } from '../components/ProfileSetupStep';
import { TutorialStep } from '../components/TutorialStep';
import { WelcomeStep } from '../components/WelcomeStep';
import { Loader } from '../../../app/components/Loader';

export function Onboarding() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const currentStep = parseInt(searchParams.get('step') || '1', 10);
  const role = getUserRole(user);

  // Redirect already-completed users to dashboard
  // This prevents showing onboarding again if user reopens tab/browser
  useEffect(() => {
    if (!authLoading) {
      setCheckingStatus(false);
      if (user?.onboardingCompletedAt) {
        // User has already completed onboarding, redirect to their dashboard
        const defaultRoute = getDefaultRouteForRole(user);
        navigate(defaultRoute, { replace: true });
      }
    }
  }, [user, authLoading, navigate]);

  // Scroll to top smoothly when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 3) {
      navigate(`/onboarding?step=${currentStep + 1}`);
    }
  };

  const handleSkip = () => {
    // Only step 2 (tutorial) is skippable
    if (currentStep === 2) {
      navigate('/onboarding?step=3');
    }
  };

  const completeOnboarding = async () => {
    if (!user) return;

    setSaving(true);
    try {
      // Mark onboarding as complete in database
      await onboardingService.completeOnboarding(user.id);

      // Refresh auth context to get updated user data
      // This ensures the onboardingCompletedAt field is updated in the user object
      // so ProtectedRoute won't redirect back to onboarding
      if (window.location) {
        // Force a full page refresh to reload user context
        // This is the most reliable way to ensure all state is fresh
        window.location.href = getDefaultRouteForRole(user);
      } else {
        navigate(getDefaultRouteForRole(user));
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to complete onboarding';
      alert(`❌ ${errorMessage}\n\nPlease try again or contact support if the issue persists.`);
      setSaving(false);
    }
  };

  // Show loading while checking auth and onboarding status
  // This prevents flickering or showing onboarding to already-completed users
  if (authLoading || checkingStatus) {
    return <Loader fullScreen message="Loading..." />;
  }

  // If user has already completed onboarding, don't show anything
  // (they'll be redirected by the useEffect above)
  if (user?.onboardingCompletedAt) {
    return <Loader fullScreen message="Redirecting..." />;
  }

  return (
    <OnboardingWizard currentStep={currentStep} totalSteps={3}>
      {currentStep === 1 && <ProfileSetupStep onNext={handleNext} />}
      {currentStep === 2 && <TutorialStep role={role} onNext={handleNext} onSkip={handleSkip} />}
      {currentStep === 3 && <WelcomeStep role={role} onComplete={completeOnboarding} saving={saving} />}
    </OnboardingWizard>
  );
}
