-- Add onboarding tracking fields to profiles table
-- Migration: 00008_add_onboarding_fields
-- Created: 2025-12-29
-- Purpose: Support role-based onboarding flow with profile completion tracking

-- Add onboarding tracking columns
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0;

-- Add helpful comments for documentation
COMMENT ON COLUMN profiles.onboarding_completed_at IS 'Timestamp when user completed the onboarding flow (NULL = not completed)';
COMMENT ON COLUMN profiles.onboarding_step IS 'Current step in onboarding process (0=not started, 1=profile setup, 2=tutorial viewed, 3=welcome seen, 4=completed)';

-- Create index for efficient onboarding status queries
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding_completed
ON profiles(onboarding_completed_at)
WHERE onboarding_completed_at IS NULL;

-- Create index for partial onboarding queries
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding_step
ON profiles(onboarding_step)
WHERE onboarding_step > 0 AND onboarding_step < 4;
