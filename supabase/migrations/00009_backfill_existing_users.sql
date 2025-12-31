-- Backfill existing users with onboarding completion
-- Migration: 00009_backfill_existing_users
-- Created: 2025-12-29
-- Purpose: Mark all existing users as having completed onboarding to avoid forcing them through it

-- Mark all existing users (created before this migration) as having completed onboarding
UPDATE profiles
SET
  onboarding_completed_at = created_at,
  onboarding_step = 4
WHERE
  onboarding_completed_at IS NULL
  AND created_at < NOW();

-- Add comment
COMMENT ON COLUMN profiles.onboarding_completed_at IS 'Timestamp when user completed onboarding (backfilled for existing users)';
