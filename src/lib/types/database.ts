/**
 * Supabase Database Types
 * Auto-generated types for ClayMind database schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string | null
          display_name: string | null
          username: string | null
          role: 'student' | 'parent' | 'teacher' | 'admin'
          age: number | null
          avatar_url: string | null
          bio: string | null
          account_status: 'active' | 'suspended' | 'pending_verification'
          email_verified_at: string | null
          onboarding_completed_at: string | null
          onboarding_step: number
          last_login_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name?: string | null
          display_name?: string | null
          username?: string | null
          role?: 'student' | 'parent' | 'teacher' | 'admin'
          age?: number | null
          avatar_url?: string | null
          bio?: string | null
          account_status?: 'active' | 'suspended' | 'pending_verification'
          email_verified_at?: string | null
          onboarding_completed_at?: string | null
          onboarding_step?: number
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string | null
          display_name?: string | null
          username?: string | null
          role?: 'student' | 'parent' | 'teacher' | 'admin'
          age?: number | null
          avatar_url?: string | null
          bio?: string | null
          account_status?: 'active' | 'suspended' | 'pending_verification'
          email_verified_at?: string | null
          onboarding_completed_at?: string | null
          onboarding_step?: number
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          user_id: string
          current_level: number
          current_xp: number
          total_xp_earned: number
          current_streak_days: number
          longest_streak_days: number
          last_activity_date: string | null
          total_lessons_completed: number
          total_modules_completed: number
          total_time_spent_minutes: number
          total_ai_creations: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          current_level?: number
          current_xp?: number
          total_xp_earned?: number
          current_streak_days?: number
          longest_streak_days?: number
          last_activity_date?: string | null
          total_lessons_completed?: number
          total_modules_completed?: number
          total_time_spent_minutes?: number
          total_ai_creations?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          current_level?: number
          current_xp?: number
          total_xp_earned?: number
          current_streak_days?: number
          longest_streak_days?: number
          last_activity_date?: string | null
          total_lessons_completed?: number
          total_modules_completed?: number
          total_time_spent_minutes?: number
          total_ai_creations?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'student' | 'parent' | 'teacher' | 'admin'
      account_status: 'active' | 'suspended' | 'pending_verification'
      difficulty_level: 'beginner' | 'intermediate' | 'advanced'
    }
  }
}
