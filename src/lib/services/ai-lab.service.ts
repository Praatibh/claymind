/**
 * AI Lab Service
 * Handles AI generation, history, and saving to projects
 */

import { api } from '../api';
import { errorLoggingService } from './error-logging.service';
import { projectsService } from './projects.service';
import type { AIGenerateResponse } from '../types/api';

const HISTORY_KEY = 'claymind_ai_lab_history';
const MAX_HISTORY_ITEMS = 20;

export interface GenerationHistoryItem {
  id: string;
  prompt: string;
  output: string;
  type: 'text' | 'image' | 'video';
  createdAt: string;
  savedToProject?: boolean;
  projectId?: string;
}

export interface GenerateRequest {
  prompt: string;
  type?: 'text' | 'image' | 'video';
}

export interface GenerateResult {
  success: boolean;
  output: string;
  prompt: string;
  type: 'text' | 'image' | 'video';
  historyId: string;
}

export interface SaveToProjectResult {
  success: boolean;
  projectId?: string;
  message: string;
}

class AILabService {
  /**
   * Generate AI content based on prompt
   */
  async generate(request: GenerateRequest): Promise<GenerateResult> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'ai-lab',
        message: 'Generating AI content',
        level: 'info',
        data: { type: request.type || 'text', promptLength: request.prompt.length },
      });

      const response: AIGenerateResponse = await api.generateAI({
        prompt: request.prompt,
        type: request.type || 'text',
      });

      if (!response.success) {
        throw new Error('Generation failed');
      }

      // Create history item
      const historyItem: GenerationHistoryItem = {
        id: `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        prompt: request.prompt,
        output: response.output,
        type: response.type || 'text',
        createdAt: new Date().toISOString(),
        savedToProject: false,
      };

      // Save to history
      this.addToHistory(historyItem);

      return {
        success: true,
        output: response.output,
        prompt: response.prompt,
        type: response.type || 'text',
        historyId: historyItem.id,
      };
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'AILabService',
          action: 'generate',
          metadata: { type: request.type },
        }
      );
      throw error;
    }
  }

  /**
   * Save generated content to projects
   */
  async saveToProject(historyId: string, title?: string): Promise<SaveToProjectResult> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'ai-lab',
        message: `Saving generation to project: ${historyId}`,
        level: 'info',
      });

      // Get the history item
      const history = this.getHistory();
      const item = history.find((h) => h.id === historyId);

      if (!item) {
        throw new Error('Generation not found in history');
      }

      // Determine project type based on generation type
      const projectType = item.type === 'image' ? 'Image' : item.type === 'video' ? 'Video' : 'App';

      // Create the project
      const project = await projectsService.createProject({
        title: title || this.generateProjectTitle(item.prompt),
        type: projectType,
      });

      // Update history item
      this.updateHistoryItem(historyId, {
        savedToProject: true,
        projectId: project.id,
      });

      return {
        success: true,
        projectId: project.id,
        message: 'Saved to your projects!',
      };
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'AILabService',
          action: 'saveToProject',
          metadata: { historyId },
        }
      );
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to save to projects',
      };
    }
  }

  /**
   * Get generation history from localStorage
   */
  getHistory(): GenerationHistoryItem[] {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (!stored) return [];
      return JSON.parse(stored) as GenerationHistoryItem[];
    } catch {
      return [];
    }
  }

  /**
   * Add item to history
   */
  private addToHistory(item: GenerationHistoryItem): void {
    try {
      const history = this.getHistory();
      // Add to beginning (most recent first)
      history.unshift(item);
      // Keep only max items
      const trimmed = history.slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error('Failed to save to history'),
        { component: 'AILabService', action: 'addToHistory' }
      );
    }
  }

  /**
   * Update a history item
   */
  private updateHistoryItem(
    historyId: string,
    updates: Partial<GenerationHistoryItem>
  ): void {
    try {
      const history = this.getHistory();
      const index = history.findIndex((h) => h.id === historyId);
      if (index !== -1) {
        history[index] = { ...history[index], ...updates };
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      }
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error('Failed to update history'),
        { component: 'AILabService', action: 'updateHistoryItem' }
      );
    }
  }

  /**
   * Delete a history item
   */
  deleteHistoryItem(historyId: string): boolean {
    try {
      const history = this.getHistory();
      const filtered = history.filter((h) => h.id !== historyId);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clear all history
   */
  clearHistory(): void {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      // Silently fail
    }
  }

  /**
   * Generate a project title from prompt
   */
  private generateProjectTitle(prompt: string): string {
    // Take first few words, clean up, capitalize
    const words = prompt
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .slice(0, 4)
      .join(' ');
    return words.charAt(0).toUpperCase() + words.slice(1);
  }

  /**
   * Get example prompts
   */
  getExamplePrompts(): string[] {
    return [
      'Write a short story about a friendly robot',
      'Explain how plants grow in simple words',
      'Create a fun fact about space',
      'Describe what it would be like to live on Mars',
      'Write a poem about the ocean',
    ];
  }
}

// Export singleton instance
export const aiLabService = new AILabService();
