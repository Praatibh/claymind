/**
 * Onboarding Service
 * Handles onboarding flow business logic including profile setup,
 * username validation, and completion tracking
 */

import { supabase } from '../supabase';
import { errorLoggingService } from './error-logging.service';

export interface ProfileSetupData {
  username: string;
  avatarUrl: string;
  bio?: string;
}

class OnboardingService {
  /**
   * Check if a username is available
   * @param username - Username to check
   * @returns true if available, false if taken
   */
  async checkUsernameAvailability(username: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();

      // If no data and no error, username is available
      // If data exists, username is taken
      // If error (PGRST116 = not found), username is available
      return !data && (!error || error.code === 'PGRST116');
    } catch (error) {
      errorLoggingService.logError(error as Error, {
        component: 'OnboardingService',
        action: 'checkUsernameAvailability',
      });
      // On error, assume unavailable to be safe
      return false;
    }
  }

  /**
   * Save profile setup data (Step 1 of onboarding)
   * @param userId - User ID to update
   * @param data - Profile setup data (username, avatar, bio)
   */
  async saveProfileSetup(userId: string, data: ProfileSetupData): Promise<void> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          avatar_url: data.avatarUrl,
          bio: data.bio || null,
          onboarding_step: 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      errorLoggingService.addBreadcrumb({
        category: 'onboarding',
        message: 'Profile setup completed',
        level: 'info',
        data: { userId, hasUsername: !!data.username, hasBio: !!data.bio },
      });
    } catch (error) {
      errorLoggingService.logError(error as Error, {
        component: 'OnboardingService',
        action: 'saveProfileSetup',
        userId,
      });
      throw error;
    }
  }

  /**
   * Mark tutorial step as viewed (Step 2 of onboarding)
   * @param userId - User ID to update
   */
  async markTutorialViewed(userId: string): Promise<void> {
    try {
      await supabase
        .from('profiles')
        .update({
          onboarding_step: 2,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      errorLoggingService.addBreadcrumb({
        category: 'onboarding',
        message: 'Tutorial step viewed',
        level: 'info',
        data: { userId },
      });
    } catch (error) {
      // Non-critical error, log but don't throw
      errorLoggingService.logError(error as Error, {
        component: 'OnboardingService',
        action: 'markTutorialViewed',
        userId,
      });
    }
  }

  /**
   * Complete the entire onboarding flow
   * @param userId - User ID to mark as completed
   */
  async completeOnboarding(userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_completed_at: new Date().toISOString(),
          onboarding_step: 4,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      errorLoggingService.addBreadcrumb({
        category: 'onboarding',
        message: 'User completed onboarding successfully',
        level: 'info',
        data: { userId },
      });
    } catch (error) {
      errorLoggingService.logError(error as Error, {
        component: 'OnboardingService',
        action: 'completeOnboarding',
        userId,
      });
      throw error;
    }
  }

  /**
   * Reset onboarding progress (for testing/admin purposes)
   * @param userId - User ID to reset
   */
  async resetOnboarding(userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_completed_at: null,
          onboarding_step: 0,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      errorLoggingService.addBreadcrumb({
        category: 'onboarding',
        message: 'Onboarding reset for user',
        level: 'info',
        data: { userId },
      });
    } catch (error) {
      errorLoggingService.logError(error as Error, {
        component: 'OnboardingService',
        action: 'resetOnboarding',
        userId,
      });
      throw error;
    }
  }
}

export const onboardingService = new OnboardingService();
