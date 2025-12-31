/**
 * API Type Definitions
 * Types matching the current application data shapes
 */

// ==================== Authentication ====================

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  age?: number;
  level: number;
  avatarUrl?: string;
  accountStatus: 'active' | 'pending_verification' | 'locked' | 'suspended';
  username?: string;
  displayName?: string;
  joinedDate?: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  emailVerifiedAt?: string;
  onboardingCompletedAt?: string;
  bio?: string;
}

export interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken?: string;
  user: User;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  email: string;
  password: string;
  age?: number;
  parentEmail?: string;
  parentName?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken?: string;
}

// ==================== User Profile ====================

export interface UserProfile {
  id: string;
  username: string;
  level: number;
  progress: number;
  joinedDate: string;
  totalBadges: number;
  totalProjects: number;
  avatarId?: number;
  email?: string;
  displayName?: string;
}

export interface AvatarOption {
  id: number;
  color: string;
  icon: string;
}

export interface Badge {
  id: string;
  icon?: string; // Icon name or URL
  label: string;
  unlocked: boolean;
  color: 'amber' | 'purple' | 'pink' | 'blue' | 'green' | 'yellow' | 'red';
}

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  unlockedAt?: string;
  progress?: number;
  total?: number;
}

// ==================== Progress & Stats ====================

export interface UserProgress {
  totalXp: number;
  currentLevel: number;
  xpToNextLevel: number;
  xpRequiredForNextLevel: number;
  progressPercentage: number;
  totalTimeMinutes: number;
  activeTimeMinutes: number;
  missionsCompleted: number;
  lessonsCompleted: number;
  questionsAnswered: number;
  questionsCorrect: number;
  averageAccuracy: number;
  currentStreakDays: number;
  longestStreakDays: number;
  lastActivityDate: string;
  badgesEarned: number;
  coins: number;
  keys: number;
  seasonXp: number;
  seasonLevel: number;
}

export interface Stats {
  label: string;
  value: string | number;
  color: string;
}

// ==================== Modules & Lessons ====================

export interface Module {
  id: string;
  title: string;
  description: string;
  icon?: string; // Icon name or URL
  difficulty: number;
  lessons: number;
  duration: string;
  color: string;
  locked: boolean;
  progress: number;
  totalLessons?: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  current?: boolean;
  moduleId?: string;
}

export interface ModuleDetail {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lessons: Lesson[];
}

// ==================== Projects ====================

export interface Project {
  id: string;
  title: string;
  type: 'App' | 'Image' | 'Video' | 'Other';
  icon?: string; // Icon name or URL
  date: string;
  color: string;
  thumbnail: string;
  description?: string;
  userId?: string;
}

export interface ProjectsStats {
  total: number;
  thisMonth: number;
  shared: number;
}

// ==================== Contact ====================

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// ==================== AI Lab ====================

export interface AIGenerateRequest {
  prompt: string;
  type?: 'text' | 'image' | 'video';
}

export interface AIGenerateResponse {
  success: boolean;
  output: string;
  prompt: string;
  type: string;
}

// ==================== API Error Response ====================

export interface ApiError {
  success: false;
  error: string;
  errorCode?: string;
  details?: Record<string, unknown>;
}

// ==================== Generic API Response ====================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

