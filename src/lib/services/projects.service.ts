/**
 * Projects Service
 * Handles project CRUD operations and sharing
 */

import { api } from '../api';
import { errorLoggingService } from './error-logging.service';
import type { Project } from '../types/api';

export interface ProjectsStats {
  total: number;
  thisMonth: number;
  shared: number;
}

export interface CreateProjectData {
  title: string;
  type: 'App' | 'Image' | 'Video' | 'Other';
  description?: string;
  thumbnail?: string;
}

export interface ShareProjectResult {
  success: boolean;
  shareUrl?: string;
  message: string;
}

class ProjectsService {
  /**
   * Get all projects for the current user
   */
  async getProjects(): Promise<Project[]> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'projects',
        message: 'Fetching projects',
        level: 'info',
      });

      const projects = await api.getProjects();
      return projects;
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'ProjectsService',
          action: 'getProjects',
        }
      );
      throw error;
    }
  }

  /**
   * Get a single project by ID
   */
  async getProject(projectId: string): Promise<Project> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'projects',
        message: `Fetching project ${projectId}`,
        level: 'info',
      });

      const project = await api.getProject(projectId);
      return project;
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'ProjectsService',
          action: 'getProject',
          metadata: { projectId },
        }
      );
      throw error;
    }
  }

  /**
   * Create a new project
   */
  async createProject(data: CreateProjectData): Promise<Project> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'projects',
        message: 'Creating new project',
        level: 'info',
        data: { type: data.type, title: data.title },
      });

      const project = await api.createProject({
        title: data.title,
        type: data.type,
        thumbnail: data.thumbnail,
      });

      return project;
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'ProjectsService',
          action: 'createProject',
          metadata: { type: data.type },
        }
      );
      throw error;
    }
  }

  /**
   * Share a project (generates shareable link)
   */
  async shareProject(projectId: string): Promise<ShareProjectResult> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'projects',
        message: `Sharing project ${projectId}`,
        level: 'info',
      });

      // Stub: In production, this would call an API endpoint
      // For now, simulate the share action
      await new Promise((resolve) => setTimeout(resolve, 500));

      const shareUrl = `${window.location.origin}/shared/${projectId}`;

      return {
        success: true,
        shareUrl,
        message: 'Project shared successfully! Link copied to clipboard.',
      };
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'ProjectsService',
          action: 'shareProject',
          metadata: { projectId },
        }
      );
      throw error;
    }
  }

  /**
   * Copy share URL to clipboard
   */
  async copyShareLink(projectId: string): Promise<boolean> {
    try {
      const result = await this.shareProject(projectId);
      if (result.shareUrl) {
        await navigator.clipboard.writeText(result.shareUrl);
        return true;
      }
      return false;
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'ProjectsService',
          action: 'copyShareLink',
          metadata: { projectId },
        }
      );
      return false;
    }
  }

  /**
   * Calculate project statistics
   */
  calculateStats(projects: Project[]): ProjectsStats {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const thisMonthProjects = projects.filter((p) => {
      const projectDate = new Date(p.date);
      return projectDate >= startOfMonth;
    });

    // Stub: shared count would come from API in production
    const sharedCount = Math.min(Math.floor(projects.length / 3), projects.length);

    return {
      total: projects.length,
      thisMonth: thisMonthProjects.length,
      shared: sharedCount,
    };
  }

  /**
   * Get icon component name for project type
   */
  getProjectTypeIcon(type: Project['type']): string {
    switch (type) {
      case 'Image':
        return 'Image';
      case 'Video':
        return 'Video';
      case 'App':
        return 'Sparkles';
      default:
        return 'FileText';
    }
  }

  /**
   * Get color for project type
   */
  getProjectTypeColor(type: Project['type']): string {
    switch (type) {
      case 'Image':
        return 'pink';
      case 'Video':
        return 'green';
      case 'App':
        return 'purple';
      default:
        return 'gray';
    }
  }
}

// Export singleton instance
export const projectsService = new ProjectsService();
