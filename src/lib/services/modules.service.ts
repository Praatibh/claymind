/**
 * Modules Service
 * Handles module and lesson operations, progress tracking
 */

import { api } from '../api';
import { errorLoggingService } from './error-logging.service';
import { storageService } from './storage.service';
import type { Module, ModuleDetail } from '../types/api';

export interface LessonProgress {
  lessonId: string;
  moduleId: string;
  completed: boolean;
  startedAt?: string;
  completedAt?: string;
}

export interface StartLessonResult {
  success: boolean;
  lessonId: string;
  moduleId: string;
  message: string;
}

export interface CompleteLessonResult {
  success: boolean;
  lessonId: string;
  xpEarned?: number;
  message: string;
  nextLessonId?: string;
  moduleCompleted?: boolean;
}

class ModulesService {
  /**
   * Get all available modules
   */
  async getModules(): Promise<Module[]> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'modules',
        message: 'Fetching all modules',
        level: 'info',
      });

      const modules = await api.getModules();
      return modules;
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'ModulesService',
          action: 'getModules',
        }
      );
      throw error;
    }
  }

  /**
   * Get module detail by ID with lessons
   */
  async getModuleDetail(moduleId: string): Promise<ModuleDetail> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'modules',
        message: `Fetching module detail: ${moduleId}`,
        level: 'info',
      });

      const moduleDetail = await api.getModuleDetail(moduleId);
      return moduleDetail;
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'ModulesService',
          action: 'getModuleDetail',
          metadata: { moduleId },
        }
      );
      throw error;
    }
  }

  /**
   * Start a lesson - marks lesson as in-progress
   */
  async startLesson(moduleId: string, lessonId: string): Promise<StartLessonResult> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'modules',
        message: `Starting lesson: ${lessonId} in module: ${moduleId}`,
        level: 'info',
      });

      // Stub: In production, this would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 300));

      return {
        success: true,
        lessonId,
        moduleId,
        message: 'Lesson started successfully!',
      };
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'ModulesService',
          action: 'startLesson',
          metadata: { moduleId, lessonId },
        }
      );
      throw error;
    }
  }

  /**
   * Complete a lesson - REAL PROGRESS TRACKING
   */
  async completeLesson(moduleId: string, lessonId: string): Promise<CompleteLessonResult> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'modules',
        message: `Completing lesson: ${lessonId} in module: ${moduleId}`,
        level: 'info',
      });

      // Mark lesson as completed in storage
      storageService.completLesson(moduleId, lessonId);

      // Award XP (50 XP per lesson)
      const xpResult = storageService.addXP(50);

      // Get module info to update progress
      const modules = await this.getModules();
      const module = modules.find((m) => m.id === moduleId);
      const totalLessons = module?.totalLessons || 8;

      // Get completed lessons count
      const completedLessons = storageService.getCompletedLessonsForModule(moduleId);

      // Update module progress
      storageService.updateModuleProgress(moduleId, {
        completedLessons: completedLessons.length,
        totalLessons,
      });

      // Calculate next lesson
      const nextLessonId = String(parseInt(lessonId) + 1);
      const moduleCompleted = completedLessons.length >= totalLessons;

      // Award badge if module completed
      if (moduleCompleted) {
        storageService.awardBadge({
          id: `module-${moduleId}-complete`,
          name: `${module?.title || 'Module'} Master`,
          description: `Completed all lessons in ${module?.title || 'this module'}!`,
          icon: '🏆',
          category: 'module',
        });
      }

      // Award first lesson badge
      if (completedLessons.length === 1) {
        storageService.awardBadge({
          id: 'first-lesson',
          name: 'First Steps',
          description: 'Completed your first lesson!',
          icon: '🎯',
          category: 'achievement',
        });
      }

      return {
        success: true,
        lessonId,
        xpEarned: 50,
        message: xpResult.leveledUp
          ? `🎉 Level Up! You're now level ${xpResult.newLevel}!`
          : 'Great job! Lesson completed!',
        nextLessonId,
        moduleCompleted,
      };
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'ModulesService',
          action: 'completeLesson',
          metadata: { moduleId, lessonId },
        }
      );
      throw error;
    }
  }

  /**
   * Review a completed lesson
   */
  async reviewLesson(moduleId: string, lessonId: string): Promise<StartLessonResult> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'modules',
        message: `Reviewing lesson: ${lessonId} in module: ${moduleId}`,
        level: 'info',
      });

      // Stub: In production, this would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 300));

      return {
        success: true,
        lessonId,
        moduleId,
        message: 'Opening lesson for review',
      };
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'ModulesService',
          action: 'reviewLesson',
          metadata: { moduleId, lessonId },
        }
      );
      throw error;
    }
  }

  /**
   * Calculate progress for a module based on completed lessons
   */
  calculateModuleProgress(completedLessons: number, totalLessons: number): number {
    if (totalLessons === 0) return 0;
    return Math.round((completedLessons / totalLessons) * 100);
  }

  /**
   * Check if a lesson is unlocked based on previous lessons
   * Rule: A lesson is unlocked if all previous lessons up to 3 ahead of completed are unlocked
   */
  isLessonUnlocked(lessonIndex: number, lastCompletedIndex: number): boolean {
    // First lesson is always unlocked
    if (lessonIndex === 0) return true;
    // Unlock up to 3 lessons after the last completed one
    return lessonIndex <= lastCompletedIndex + 3;
  }

  /**
   * Get the current lesson (first non-completed, non-locked lesson)
   */
  getCurrentLessonId(
    lessons: Array<{ id: string; completed: boolean; locked: boolean }>
  ): string | null {
    const currentLesson = lessons.find((l) => !l.completed && !l.locked);
    return currentLesson?.id || null;
  }

  /**
   * Check if module is fully completed
   */
  isModuleCompleted(lessons: Array<{ completed: boolean }>): boolean {
    return lessons.every((l) => l.completed);
  }

  /**
   * Get icon name for module type/color
   */
  getModuleIcon(moduleId: string): string {
    const iconMap: Record<string, string> = {
      'ai-basics': 'Brain',
      'build-app': 'Sparkles',
      'prompt-engineering': 'MessageSquare',
      'ethics-safety': 'Shield',
      'ml-mini': 'Brain',
      'advanced-ai': 'Sparkles',
    };
    return iconMap[moduleId] || 'Brain';
  }
}

// Export singleton instance
export const modulesService = new ModulesService();
