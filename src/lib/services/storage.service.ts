/**
 * Storage Service
 * Production-level local storage management for user data, progress, and authentication
 */

import type { User, UserProgress } from '../types/api';

// Storage keys
const STORAGE_KEYS = {
  USER: 'claymind_user',
  PROGRESS: 'claymind_progress',
  MODULE_PROGRESS: 'claymind_module_progress',
  LESSON_PROGRESS: 'claymind_lesson_progress',
  BADGES: 'claymind_badges',
  ACHIEVEMENTS: 'claymind_achievements',
  SETTINGS: 'claymind_settings',
} as const;

export interface ModuleProgress {
  moduleId: string;
  progress: number; // 0-100
  completedLessons: number;
  totalLessons: number;
  startedAt?: string;
  completedAt?: string;
}

export interface LessonProgress {
  moduleId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  timeSpent?: number;
  completedAt?: string;
  quizResults?: QuizResult[];
}

export interface QuizResult {
  questionId: string;
  correct: boolean;
  attempts: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: 'lesson' | 'module' | 'achievement' | 'special';
}

export interface Achievement {
  id: string;
  type: 'streak' | 'quiz' | 'speed' | 'perfect' | 'explorer';
  value: number;
  unlockedAt: string;
}

class StorageService {
  /**
   * Clear all user data (for logout or reset)
   */
  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  }

  // ==================== USER ====================

  /**
   * Save user data
   */
  saveUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  /**
   * Get current user
   */
  getUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Update user fields
   */
  updateUser(updates: Partial<User>): User | null {
    const user = this.getUser();
    if (!user) return null;

    const updated = { ...user, ...updates };
    this.saveUser(updated);
    return updated;
  }

  // ==================== PROGRESS ====================

  /**
   * Initialize default progress for new user
   */
  initializeProgress(): UserProgress {
    const defaultProgress: UserProgress = {
      totalXp: 0,
      currentLevel: 1,
      xpToNextLevel: 100,
      xpRequiredForNextLevel: 100,
      progressPercentage: 0,
      totalTimeMinutes: 0,
      activeTimeMinutes: 0,
      missionsCompleted: 0,
      lessonsCompleted: 0,
      questionsAnswered: 0,
      questionsCorrect: 0,
      averageAccuracy: 0,
      currentStreakDays: 0,
      longestStreakDays: 0,
      lastActivityDate: new Date().toISOString().split('T')[0],
      badgesEarned: 0,
      coins: 0,
      keys: 0,
      seasonXp: 0,
      seasonLevel: 1,
    };

    this.saveProgress(defaultProgress);
    return defaultProgress;
  }

  /**
   * Get user progress
   */
  getProgress(): UserProgress {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!data) {
      return this.initializeProgress();
    }
    return JSON.parse(data);
  }

  /**
   * Save progress
   */
  saveProgress(progress: UserProgress): void {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  }

  /**
   * Add XP and calculate level up
   */
  addXP(amount: number): { leveledUp: boolean; newLevel: number; totalXp: number } {
    const progress = this.getProgress();
    progress.totalXp += amount;
    progress.seasonXp += amount;

    // Calculate level (every 100 XP = 1 level, scaling)
    const newLevel = Math.floor(Math.sqrt(progress.totalXp / 50)) + 1;
    const leveledUp = newLevel > progress.currentLevel;

    if (leveledUp) {
      progress.currentLevel = newLevel;
    }

    // Calculate XP to next level
    const xpForCurrentLevel = Math.pow(progress.currentLevel - 1, 2) * 50;
    const xpForNextLevel = Math.pow(progress.currentLevel, 2) * 50;
    progress.xpRequiredForNextLevel = xpForNextLevel;
    progress.xpToNextLevel = xpForNextLevel - progress.totalXp;

    this.saveProgress(progress);

    return {
      leveledUp,
      newLevel: progress.currentLevel,
      totalXp: progress.totalXp,
    };
  }

  /**
   * Update streak
   */
  updateStreak(): void {
    const progress = this.getProgress();
    const today = new Date().toISOString().split('T')[0];
    const lastActivity = progress.lastActivityDate;

    if (lastActivity === today) {
      // Already counted today
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastActivity === yesterdayStr) {
      // Continue streak
      progress.currentStreakDays += 1;
    } else {
      // Streak broken, restart
      progress.currentStreakDays = 1;
    }

    progress.longestStreakDays = Math.max(
      progress.longestStreakDays,
      progress.currentStreakDays
    );
    progress.lastActivityDate = today;

    this.saveProgress(progress);
  }

  // ==================== MODULE PROGRESS ====================

  /**
   * Get all module progress
   */
  getModuleProgress(): Record<string, ModuleProgress> {
    const data = localStorage.getItem(STORAGE_KEYS.MODULE_PROGRESS);
    return data ? JSON.parse(data) : {};
  }

  /**
   * Get specific module progress
   */
  getModuleProgressById(moduleId: string): ModuleProgress | null {
    const all = this.getModuleProgress();
    return all[moduleId] || null;
  }

  /**
   * Update module progress
   */
  updateModuleProgress(moduleId: string, data: Partial<ModuleProgress>): void {
    const all = this.getModuleProgress();
    const existing = all[moduleId] || {
      moduleId,
      progress: 0,
      completedLessons: 0,
      totalLessons: 8, // Default, should be passed
      startedAt: new Date().toISOString(),
    };

    all[moduleId] = { ...existing, ...data };

    // Calculate progress percentage
    if (all[moduleId].totalLessons > 0) {
      all[moduleId].progress = Math.round(
        (all[moduleId].completedLessons / all[moduleId].totalLessons) * 100
      );
    }

    localStorage.setItem(STORAGE_KEYS.MODULE_PROGRESS, JSON.stringify(all));
  }

  // ==================== LESSON PROGRESS ====================

  /**
   * Get all lesson progress
   */
  getLessonProgress(): LessonProgress[] {
    const data = localStorage.getItem(STORAGE_KEYS.LESSON_PROGRESS);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Get specific lesson progress
   */
  getLessonProgressById(moduleId: string, lessonId: string): LessonProgress | null {
    const all = this.getLessonProgress();
    return all.find((p) => p.moduleId === moduleId && p.lessonId === lessonId) || null;
  }

  /**
   * Mark lesson as completed
   */
  completLesson(moduleId: string, lessonId: string, score?: number, quizResults?: QuizResult[]): void {
    const all = this.getLessonProgress();
    const index = all.findIndex((p) => p.moduleId === moduleId && p.lessonId === lessonId);

    const lessonData: LessonProgress = {
      moduleId,
      lessonId,
      completed: true,
      score,
      completedAt: new Date().toISOString(),
      quizResults,
    };

    if (index >= 0) {
      all[index] = { ...all[index], ...lessonData };
    } else {
      all.push(lessonData);
    }

    localStorage.setItem(STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(all));

    // Update user progress stats
    const progress = this.getProgress();
    progress.lessonsCompleted = all.filter((p) => p.completed).length;

    if (quizResults) {
      progress.questionsAnswered += quizResults.length;
      progress.questionsCorrect += quizResults.filter((q) => q.correct).length;
      progress.averageAccuracy = progress.questionsAnswered > 0
        ? (progress.questionsCorrect / progress.questionsAnswered) * 100
        : 0;
    }

    this.saveProgress(progress);

    // Update streak
    this.updateStreak();
  }

  /**
   * Get completed lessons for a module
   */
  getCompletedLessonsForModule(moduleId: string): string[] {
    const all = this.getLessonProgress();
    return all
      .filter((p) => p.moduleId === moduleId && p.completed)
      .map((p) => p.lessonId);
  }

  // ==================== BADGES ====================

  /**
   * Get all earned badges
   */
  getBadges(): Badge[] {
    const data = localStorage.getItem(STORAGE_KEYS.BADGES);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Award a badge
   */
  awardBadge(badge: Omit<Badge, 'earnedAt'>): void {
    const badges = this.getBadges();

    // Check if already has this badge
    if (badges.some((b) => b.id === badge.id)) {
      return;
    }

    const newBadge: Badge = {
      ...badge,
      earnedAt: new Date().toISOString(),
    };

    badges.push(newBadge);
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));

    // Update badge count in progress
    const progress = this.getProgress();
    progress.badgesEarned = badges.length;
    this.saveProgress(progress);
  }

  /**
   * Check if user has a specific badge
   */
  hasBadge(badgeId: string): boolean {
    const badges = this.getBadges();
    return badges.some((b) => b.id === badgeId);
  }

  // ==================== ACHIEVEMENTS ====================

  /**
   * Get all achievements
   */
  getAchievements(): Achievement[] {
    const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Unlock achievement
   */
  unlockAchievement(achievement: Omit<Achievement, 'unlockedAt'>): void {
    const achievements = this.getAchievements();

    // Check if already unlocked
    if (achievements.some((a) => a.id === achievement.id)) {
      return;
    }

    const newAchievement: Achievement = {
      ...achievement,
      unlockedAt: new Date().toISOString(),
    };

    achievements.push(newAchievement);
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }

  // ==================== SETTINGS ====================

  /**
   * Get user settings
   */
  getSettings(): Record<string, any> {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {};
  }

  /**
   * Save settings
   */
  saveSettings(settings: Record<string, any>): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }
}

// Export singleton
export const storageService = new StorageService();
