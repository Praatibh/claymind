/**
 * API Client
 * Axios-based API client with interceptors for authentication and error handling
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { config } from './config';
import { errorLoggingService } from './services/error-logging.service';
import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  User,
  UserProfile,
  UserProgress,
  Module,
  ModuleDetail,
  Project,
  ContactFormData,
  ContactResponse,
  AIGenerateRequest,
  AIGenerateResponse,
  ApiError,
  ApiResponse,
} from './types/api';

class ApiClient {
  private client: AxiosInstance;
  private refreshTokenPromise: Promise<string> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: config.api.baseUrl,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor - add auth token and breadcrumb
    this.client.interceptors.request.use(
      (requestConfig) => {
        const token = this.getAccessToken();
        if (token && requestConfig.headers) {
          requestConfig.headers.Authorization = `Bearer ${token}`;
        }

        // Add breadcrumb for request tracking
        errorLoggingService.addBreadcrumb({
          category: 'http',
          message: `${requestConfig.method?.toUpperCase()} ${requestConfig.url}`,
          level: 'info',
          data: {
            method: requestConfig.method,
            url: requestConfig.url,
          },
        });

        return requestConfig;
      },
      (error) => {
        errorLoggingService.logApiError(
          error instanceof Error ? error : new Error(String(error)),
          {
            method: error.config?.method || 'UNKNOWN',
            url: error.config?.url || 'UNKNOWN',
          }
        );
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle token refresh on 401 and log errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Log API errors (skip 401s that will be retried)
        const shouldLogError = error.response?.status !== 401 || originalRequest._retry;
        if (shouldLogError && error.response) {
          errorLoggingService.logApiError(
            new Error(error.response.data?.error || error.message || 'API Error'),
            {
              method: originalRequest.method || 'UNKNOWN',
              url: originalRequest.url || 'UNKNOWN',
              status: error.response.status,
              requestId: error.response.headers?.['x-request-id'] as string | undefined,
            }
          );
        }

        // If 401 and we haven't retried, try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshAccessToken();
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return this.client(originalRequest);
          } catch (refreshError) {
            // Refresh failed, clear tokens and redirect to login
            errorLoggingService.logAuthError(
              refreshError instanceof Error ? refreshError : new Error('Token refresh failed'),
              'token refresh'
            );
            this.clearTokens();
            window.location.href = '/auth';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Get access token from storage
   */
  private getAccessToken(): string | null {
    return localStorage.getItem(config.auth.tokenKey);
  }

  /**
   * Get refresh token from storage
   */
  private getRefreshToken(): string | null {
    return localStorage.getItem(config.auth.refreshTokenKey);
  }

  /**
   * Store access token
   */
  setAccessToken(token: string): void {
    localStorage.setItem(config.auth.tokenKey, token);
  }

  /**
   * Store refresh token
   */
  setRefreshToken(token: string): void {
    localStorage.setItem(config.auth.refreshTokenKey, token);
  }

  /**
   * Clear all tokens
   */
  clearTokens(): void {
    localStorage.removeItem(config.auth.tokenKey);
    localStorage.removeItem(config.auth.refreshTokenKey);
  }

  /**
   * Refresh access token using refresh token
   */
  private async refreshAccessToken(): Promise<string> {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    this.refreshTokenPromise = (async () => {
      try {
        const response = await axios.post<RefreshTokenResponse>(
          `${config.api.baseUrl}/auth/refresh`,
          { refreshToken } as RefreshTokenRequest
        );

        if (response.data.success && response.data.accessToken) {
          this.setAccessToken(response.data.accessToken);
          if (response.data.refreshToken) {
            this.setRefreshToken(response.data.refreshToken);
          }
          return response.data.accessToken;
        }

        throw new Error('Failed to refresh token');
      } finally {
        this.refreshTokenPromise = null;
      }
    })();

    return this.refreshTokenPromise;
  }

  // ==================== Authentication Endpoints ====================

  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.stubRequest<AuthResponse>(
      () => this.client.post('/auth/login', credentials),
      {
        success: true,
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        user: {
          id: 'user-1',
          firstName: credentials.email.split('@')[0],
          email: credentials.email,
          age: 12,
          level: 5,
          avatarUrl: '/avatars/clai.png',
          accountStatus: 'active',
          username: 'AIExplorer_Alex',
          displayName: credentials.email.split('@')[0],
          joinedDate: 'Nov 2024',
        },
      }
    );
  }

  /**
   * Signup new user
   */
  async signup(data: SignupRequest): Promise<AuthResponse> {
    return this.stubRequest<AuthResponse>(
      () => this.client.post('/auth/signup', data),
      {
        success: true,
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        user: {
          id: 'user-' + Date.now(),
          firstName: data.firstName,
          email: data.email,
          age: data.age,
          level: 1,
          avatarUrl: '/avatars/clai.png',
          accountStatus: 'active',
          username: data.firstName + '_' + Math.floor(Math.random() * 1000),
          displayName: data.firstName,
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        },
        message: 'Account created successfully',
      }
    );
  }

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse> {
    return this.stubRequest<ApiResponse>(
      () => this.client.post('/auth/logout'),
      {
        success: true,
        message: 'Logged out successfully',
      }
    );
  }

  // ==================== User Endpoints ====================

  /**
   * Get current user profile
   */
  async getUserProfile(): Promise<User> {
    return this.stubRequest<User>(
      () => this.client.get('/user/profile'),
      {
        id: 'user-1',
        firstName: 'Alex',
        email: 'alex@example.com',
        age: 12,
        level: 8,
        avatarUrl: '/avatars/clai.png',
        accountStatus: 'active',
        username: 'AIExplorer_Alex',
        displayName: 'Alex',
        joinedDate: 'Nov 2024',
      }
    );
  }

  /**
   * Update user profile
   */
  async updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return this.stubRequest<UserProfile>(
      () => this.client.put('/user/profile', data),
      {
        id: 'user-1',
        username: data.username || 'AIExplorer_Alex',
        level: data.level || 8,
        progress: data.progress || 65,
        joinedDate: data.joinedDate || 'Nov 2024',
        totalBadges: data.totalBadges || 12,
        totalProjects: data.totalProjects || 8,
      }
    );
  }

  /**
   * Get user progress
   */
  async getUserProgress(): Promise<UserProgress> {
    return this.stubRequest<UserProgress>(
      () => this.client.get('/user/progress'),
      {
        totalXp: 1450,
        currentLevel: 8,
        xpToNextLevel: 550,
        xpRequiredForNextLevel: 2000,
        progressPercentage: 65,
        totalTimeMinutes: 320,
        activeTimeMinutes: 280,
        missionsCompleted: 18,
        lessonsCompleted: 24,
        questionsAnswered: 234,
        questionsCorrect: 198,
        averageAccuracy: 84.62,
        currentStreakDays: 7,
        longestStreakDays: 12,
        lastActivityDate: new Date().toISOString().split('T')[0],
        badgesEarned: 12,
        coins: 1250,
        keys: 8,
        seasonXp: 450,
        seasonLevel: 3,
      }
    );
  }

  // ==================== Modules Endpoints ====================

  /**
   * Get all modules
   */
  async getModules(): Promise<Module[]> {
    return this.stubRequest<Module[]>(
      () => this.client.get('/modules'),
      [
        {
          id: 'ai-basics',
          title: 'AI Basics',
          description: 'Learn what AI is and how it works',
          difficulty: 1,
          lessons: 8,
          duration: '2 hours',
          color: 'purple',
          locked: false,
          progress: 100,
          totalLessons: 8,
        },
        {
          id: 'build-app',
          title: 'Build an App with AI',
          description: 'Create your first AI-powered application',
          difficulty: 2,
          lessons: 12,
          duration: '4 hours',
          color: 'amber',
          locked: false,
          progress: 60,
          totalLessons: 12,
        },
        {
          id: 'image-creation',
          title: 'Image & Video Creation',
          description: 'Generate amazing images with AI',
          difficulty: 2,
          lessons: 10,
          duration: '3 hours',
          color: 'pink',
          locked: false,
          progress: 30,
          totalLessons: 10,
        },
        {
          id: 'video-creation',
          title: 'AI Video Magic',
          description: 'Create and edit videos using AI tools',
          difficulty: 3,
          lessons: 15,
          duration: '5 hours',
          color: 'blue',
          locked: false,
          progress: 0,
          totalLessons: 15,
        },
        {
          id: 'ml-mini',
          title: 'Mini Machine Learning',
          description: 'Train your own AI models',
          difficulty: 3,
          lessons: 20,
          duration: '6 hours',
          color: 'green',
          locked: true,
          progress: 0,
          totalLessons: 20,
        },
      ]
    );
  }

  /**
   * Get module detail by ID
   */
  async getModuleDetail(moduleId: string): Promise<ModuleDetail> {
    return this.stubRequest<ModuleDetail>(
      () => this.client.get(`/modules/${moduleId}`),
      {
        id: moduleId,
        title: 'Build an App with AI',
        description: 'Create your first AI-powered application',
        progress: 60,
        totalLessons: 12,
        completedLessons: 4,
        lessons: [
          { id: '1', title: 'Introduction to AI Apps', duration: '15 min', completed: true, locked: false },
          { id: '2', title: 'Understanding APIs', duration: '20 min', completed: true, locked: false },
          { id: '3', title: 'Your First AI Request', duration: '25 min', completed: true, locked: false },
          { id: '4', title: 'Building the Interface', duration: '30 min', completed: true, locked: false },
          { id: '5', title: 'Creating a Chatbot', duration: '35 min', completed: false, locked: false, current: true },
          { id: '6', title: 'Adding Voice Features', duration: '30 min', completed: false, locked: false },
          { id: '7', title: 'Image Recognition', duration: '40 min', completed: false, locked: false },
          { id: '8', title: 'Data Processing', duration: '35 min', completed: false, locked: true },
          { id: '9', title: 'Testing Your App', duration: '25 min', completed: false, locked: true },
          { id: '10', title: 'Improving Performance', duration: '30 min', completed: false, locked: true },
          { id: '11', title: 'Adding Polish', duration: '20 min', completed: false, locked: true },
          { id: '12', title: 'Final Project', duration: '45 min', completed: false, locked: true },
        ],
      }
    );
  }

  // ==================== Projects Endpoints ====================

  /**
   * Get user projects
   */
  async getProjects(): Promise<Project[]> {
    return this.stubRequest<Project[]>(
      () => this.client.get('/projects'),
      [
        {
          id: '1',
          title: 'AI Story Generator',
          type: 'App',
          date: 'Dec 21, 2024',
          color: 'purple',
          thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
        },
        {
          id: '2',
          title: 'Colorful Abstract Art',
          type: 'Image',
          date: 'Dec 20, 2024',
          color: 'pink',
          thumbnail: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=300&fit=crop',
        },
        {
          id: '3',
          title: 'Nature Documentary',
          type: 'Video',
          date: 'Dec 19, 2024',
          color: 'blue',
          thumbnail: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=300&fit=crop',
        },
        {
          id: '4',
          title: 'Recipe Helper',
          type: 'App',
          date: 'Dec 18, 2024',
          color: 'green',
          thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop',
        },
        {
          id: '5',
          title: 'Animal Classifier',
          type: 'App',
          date: 'Dec 21, 2024',
          color: 'amber',
          thumbnail: 'https://images.unsplash.com/photo-1621158240033-a87959ac7e2b?w=400&h=300&fit=crop',
        },
        {
          id: '6',
          title: 'Dream Landscape',
          type: 'Image',
          date: 'Dec 21, 2024',
          color: 'violet',
          thumbnail: 'https://images.unsplash.com/photo-1610274672835-65a79c852f58?w=400&h=300&fit=crop',
        },
      ]
    );
  }

  /**
   * Create new project
   */
  async createProject(data: Partial<Project>): Promise<Project> {
    return this.stubRequest<Project>(
      () => this.client.post('/projects', data),
      {
        id: 'project-' + Date.now(),
        title: data.title || 'New Project',
        type: data.type || 'App',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        color: data.color || 'purple',
        thumbnail: data.thumbnail || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      }
    );
  }

  /**
   * Get project by ID
   */
  async getProject(projectId: string): Promise<Project> {
    return this.stubRequest<Project>(
      () => this.client.get(`/projects/${projectId}`),
      {
        id: projectId,
        title: 'Sample Project',
        type: 'App',
        date: 'Dec 21, 2024',
        color: 'purple',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      }
    );
  }

  // ==================== Contact Endpoints ====================

  /**
   * Send contact form message
   */
  async sendContactMessage(data: ContactFormData): Promise<ContactResponse> {
    return this.stubRequest<ContactResponse>(
      () => this.client.post('/contact', data),
      {
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon!',
      }
    );
  }

  /**
   * Get FAQ list
   */
  async getFAQs(): Promise<Array<{ question: string; answer: string }>> {
    return this.stubRequest<Array<{ question: string; answer: string }>>(
      () => this.client.get('/contact/faqs'),
      [
        {
          question: 'How do I start learning?',
          answer: 'Just sign up, choose a module that interests you, and start with the first lesson!',
        },
        {
          question: 'Is ClayMind really safe for kids?',
          answer: 'Yes! We have content filters, parental controls, and all activities are monitored to ensure a safe learning environment.',
        },
        {
          question: 'Can I share my projects?',
          answer: 'Yes! You can share your projects with friends and family directly from your project gallery.',
        },
        {
          question: 'What if I need help with a lesson?',
          answer: 'Each lesson has built-in hints and tips. You can also ask for help in the support section!',
        },
      ]
    );
  }

  // ==================== AI Lab Endpoints ====================

  /**
   * Generate AI content
   */
  async generateAI(data: AIGenerateRequest): Promise<AIGenerateResponse> {
    return this.stubRequest<AIGenerateResponse>(
      () => this.client.post('/ai-lab/generate', data),
      {
        success: true,
        output: `This is a simulated AI response for: "${data.prompt}". In a real app, this would be generated by AI based on your prompt. Keep experimenting!`,
        prompt: data.prompt,
        type: data.type || 'text',
      }
    );
  }

  // ==================== Helper Methods ====================

  /**
   * Stub request - returns mock data instead of making actual API call
   * In production, remove this wrapper and use the actual axios call
   */
  private async stubRequest<T>(
    apiCall: () => Promise<AxiosResponse<T>>,
    mockData: T
  ): Promise<T> {
    // In development, return mock data immediately
    if (config.app.isDev) {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200));
      return mockData;
    }

    // In production, make actual API call
    try {
      const response = await apiCall();
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiError>);
    }
  }

  /**
   * Handle API errors
   */
  private handleError(error: AxiosError<ApiError>): Error {
    if (error.response) {
      // Server responded with error status
      const apiError = error.response.data;
      const message = apiError?.error || error.message || 'An error occurred';
      const customError = new Error(message) as Error & { code?: string; details?: unknown };
      customError.code = apiError?.errorCode;
      customError.details = apiError?.details;
      return customError;
    } else if (error.request) {
      // Request made but no response
      return new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

// Export singleton instance
export const api = new ApiClient();

// Export types for convenience
export type { ApiClient };

