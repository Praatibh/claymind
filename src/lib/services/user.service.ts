/**
 * User Service
 * Handles user profile, avatar, settings, and achievements
 */

import { api } from '../api';
import { errorLoggingService } from './error-logging.service';
import type { User, UserProfile, UserProgress } from '../types/api';

export interface AvatarOption {
  id: number;
  color: string;
  icon: string;
}

export interface Badge {
  id: string;
  label: string;
  iconName: string;
  color: 'amber' | 'purple' | 'pink' | 'blue' | 'green';
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

export interface UserStats {
  lessonsCompleted: number;
  totalLearningTimeMinutes: number;
  currentStreakDays: number;
}

export interface ProfileData {
  profile: UserProfile;
  progress: UserProgress;
  badges: Badge[];
  achievements: Achievement[];
  stats: UserStats;
}

export interface UpdateAvatarResult {
  success: boolean;
  avatarId: number;
  message: string;
}

export interface UpdateSettingsData {
  username?: string;
  displayName?: string;
  notifications?: boolean;
  soundEffects?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

export interface UpdateSettingsResult {
  success: boolean;
  message: string;
}

const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 1, color: 'purple', icon: '🤖' },
  { id: 2, color: 'pink', icon: '🚀' },
  { id: 3, color: 'blue', icon: '🌟' },
  { id: 4, color: 'amber', icon: '⚡' },
  { id: 5, color: 'green', icon: '🎨' },
  { id: 6, color: 'violet', icon: '🦄' },
];

class UserService {
  private selectedAvatarId: number = 1;

  /**
   * Get full profile data including progress, badges, achievements
   */
  async getProfileData(): Promise<ProfileData> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'user',
        message: 'Fetching profile data',
        level: 'info',
      });

      // Fetch profile and progress in parallel
      const [profile, progress] = await Promise.all([
        this.getProfile(),
        this.getProgress(),
      ]);

      // Get badges and achievements (stubbed for now)
      const badges = await this.getBadges();
      const achievements = await this.getAchievements();
      const stats = this.calculateStats(progress);

      return {
        profile,
        progress,
        badges,
        achievements,
        stats,
      };
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'UserService',
          action: 'getProfileData',
        }
      );
      throw error;
    }
  }

  /**
   * Get user profile
   */
  async getProfile(): Promise<UserProfile> {
    try {
      const user = await api.getUserProfile();
      return {
        id: user.id,
        username: user.username || `User_${user.id}`,
        level: user.level,
        progress: 65, // Would come from progress API
        joinedDate: user.joinedDate || 'Nov 2024',
        totalBadges: 12,
        totalProjects: 8,
      };
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'UserService',
          action: 'getProfile',
        }
      );
      throw error;
    }
  }

  /**
   * Get user progress
   */
  async getProgress(): Promise<UserProgress> {
    try {
      return await api.getUserProgress();
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'UserService',
          action: 'getProgress',
        }
      );
      throw error;
    }
  }

  /**
   * Get user badges
   */
  async getBadges(): Promise<Badge[]> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'user',
        message: 'Fetching badges',
        level: 'info',
      });

      // Stub: In production, this would fetch from API
      await new Promise((resolve) => setTimeout(resolve, 200));

      return [
        { id: 'quick-learner', label: 'Quick Learner', iconName: 'Star', color: 'amber', unlocked: true },
        { id: 'ai-master', label: 'AI Master', iconName: 'Brain', color: 'purple', unlocked: true },
        { id: 'creative-genius', label: 'Creative Genius', iconName: 'Sparkles', color: 'pink', unlocked: true },
        { id: 'helper', label: 'Helper', iconName: 'Heart', color: 'blue', unlocked: true },
      ];
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'UserService',
          action: 'getBadges',
        }
      );
      throw error;
    }
  }

  /**
   * Get user achievements
   */
  async getAchievements(): Promise<Achievement[]> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'user',
        message: 'Fetching achievements',
        level: 'info',
      });

      // Stub: In production, this would fetch from API
      await new Promise((resolve) => setTimeout(resolve, 200));

      return [
        {
          id: 'first-week',
          title: 'First Week Complete',
          description: 'Finished your first week of learning',
          unlocked: true,
        },
        {
          id: '5-projects',
          title: '5 Projects Created',
          description: 'Built 5 amazing AI projects',
          unlocked: true,
        },
        {
          id: '50-lessons',
          title: '50 Lessons Done',
          description: 'Coming soon!',
          unlocked: false,
          progress: 24,
          target: 50,
        },
      ];
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'UserService',
          action: 'getAchievements',
        }
      );
      throw error;
    }
  }

  /**
   * Calculate stats from progress data
   */
  private calculateStats(progress: UserProgress): UserStats {
    return {
      lessonsCompleted: progress.lessonsCompleted,
      totalLearningTimeMinutes: progress.totalTimeMinutes,
      currentStreakDays: progress.currentStreakDays,
    };
  }

  /**
   * Get available avatar options
   */
  getAvatarOptions(): AvatarOption[] {
    return AVATAR_OPTIONS;
  }

  /**
   * Get currently selected avatar
   */
  getSelectedAvatarId(): number {
    return this.selectedAvatarId;
  }

  /**
   * Update user avatar
   */
  async updateAvatar(avatarId: number): Promise<UpdateAvatarResult> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'user',
        message: `Updating avatar to: ${avatarId}`,
        level: 'info',
      });

      // Validate avatar ID
      const validAvatar = AVATAR_OPTIONS.find((a) => a.id === avatarId);
      if (!validAvatar) {
        throw new Error('Invalid avatar selection');
      }

      // Stub: In production, this would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 500));

      this.selectedAvatarId = avatarId;

      return {
        success: true,
        avatarId,
        message: 'Avatar updated successfully!',
      };
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'UserService',
          action: 'updateAvatar',
          metadata: { avatarId },
        }
      );
      return {
        success: false,
        avatarId: this.selectedAvatarId,
        message: error instanceof Error ? error.message : 'Failed to update avatar',
      };
    }
  }

  /**
   * Update user settings
   */
  async updateSettings(settings: UpdateSettingsData): Promise<UpdateSettingsResult> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'user',
        message: 'Updating user settings',
        level: 'info',
        data: settings,
      });

      // Stub: In production, this would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update profile if username/displayName changed
      if (settings.username || settings.displayName) {
        await api.updateUserProfile({
          username: settings.username,
        });
      }

      return {
        success: true,
        message: 'Settings saved successfully!',
      };
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'UserService',
          action: 'updateSettings',
        }
      );
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to save settings',
      };
    }
  }

  /**
   * Format learning time from minutes to readable string
   */
  formatLearningTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${remainingMinutes}m`;
  }
}

// Export singleton instance
export const userService = new UserService();
