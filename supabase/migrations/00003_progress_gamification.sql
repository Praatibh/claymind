-- ClayMind Progress & Gamification Schema
-- Description: User progress, XP, levels, badges, and achievements
-- Date: 2025-01-01

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE badge_category AS ENUM ('achievement', 'milestone', 'skill', 'special', 'module_completion');

-- ============================================================================
-- USER PROGRESS (OVERALL)
-- ============================================================================

CREATE TABLE public.user_progress (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Level & XP
    current_level INTEGER NOT NULL DEFAULT 1,
    current_xp INTEGER NOT NULL DEFAULT 0,
    total_xp_earned INTEGER NOT NULL DEFAULT 0,

    -- Streaks
    current_streak_days INTEGER NOT NULL DEFAULT 0,
    longest_streak_days INTEGER NOT NULL DEFAULT 0,
    last_activity_date DATE,

    -- Stats
    total_lessons_completed INTEGER NOT NULL DEFAULT 0,
    total_modules_completed INTEGER NOT NULL DEFAULT 0,
    total_time_spent_minutes INTEGER NOT NULL DEFAULT 0,
    total_ai_creations INTEGER NOT NULL DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_level CHECK (current_level >= 1),
    CONSTRAINT valid_xp CHECK (current_xp >= 0),
    CONSTRAINT valid_total_xp CHECK (total_xp_earned >= 0),
    CONSTRAINT valid_streak CHECK (current_streak_days >= 0 AND longest_streak_days >= 0)
);

-- Indexes for user_progress
CREATE INDEX idx_user_progress_level ON public.user_progress(current_level DESC);
CREATE INDEX idx_user_progress_total_xp ON public.user_progress(total_xp_earned DESC);
CREATE INDEX idx_user_progress_streak ON public.user_progress(current_streak_days DESC);

-- ============================================================================
-- MODULE PROGRESS
-- ============================================================================

CREATE TABLE public.module_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id TEXT NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,

    -- Progress
    lessons_completed INTEGER NOT NULL DEFAULT 0,
    total_lessons INTEGER NOT NULL DEFAULT 0,
    progress_percentage INTEGER NOT NULL DEFAULT 0,

    -- Status
    is_started BOOLEAN NOT NULL DEFAULT FALSE,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,

    -- Timestamps
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    last_accessed_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT unique_user_module UNIQUE (user_id, module_id),
    CONSTRAINT valid_progress_percentage CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    CONSTRAINT valid_lessons_count CHECK (lessons_completed >= 0 AND lessons_completed <= total_lessons)
);

-- Indexes for module_progress
CREATE INDEX idx_module_progress_user_id ON public.module_progress(user_id);
CREATE INDEX idx_module_progress_module_id ON public.module_progress(module_id);
CREATE INDEX idx_module_progress_is_completed ON public.module_progress(is_completed);
CREATE INDEX idx_module_progress_percentage ON public.module_progress(progress_percentage);

-- ============================================================================
-- LESSON PROGRESS
-- ============================================================================

CREATE TABLE public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,

    -- Progress
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    is_locked BOOLEAN NOT NULL DEFAULT FALSE,

    -- Performance
    time_spent_minutes INTEGER NOT NULL DEFAULT 0,
    attempts_count INTEGER NOT NULL DEFAULT 0,
    score NUMERIC(5,2), -- For quizzes/assessments

    -- Timestamps
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    last_accessed_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Metadata
    notes TEXT,

    CONSTRAINT unique_user_lesson UNIQUE (user_id, lesson_id),
    CONSTRAINT valid_time_spent CHECK (time_spent_minutes >= 0),
    CONSTRAINT valid_attempts CHECK (attempts_count >= 0),
    CONSTRAINT valid_score CHECK (score IS NULL OR (score >= 0 AND score <= 100))
);

-- Indexes for lesson_progress
CREATE INDEX idx_lesson_progress_user_id ON public.lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lesson_id ON public.lesson_progress(lesson_id);
CREATE INDEX idx_lesson_progress_is_completed ON public.lesson_progress(is_completed);
CREATE INDEX idx_lesson_progress_last_accessed ON public.lesson_progress(last_accessed_at DESC);

-- ============================================================================
-- BADGES
-- ============================================================================

CREATE TABLE public.badges (
    id TEXT PRIMARY KEY, -- e.g., 'first-lesson', 'streak-7', 'module-ai-basics'

    -- Content
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_emoji TEXT NOT NULL,

    -- Metadata
    category badge_category NOT NULL,
    rarity INTEGER NOT NULL DEFAULT 1, -- 1=common, 2=rare, 3=epic, 4=legendary
    points_value INTEGER NOT NULL DEFAULT 0,

    -- Unlock criteria (stored as JSONB for flexibility)
    unlock_criteria JSONB NOT NULL,

    -- Display
    icon_url TEXT,
    color_hex TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,

    -- Visibility
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_secret BOOLEAN NOT NULL DEFAULT FALSE, -- Hidden until earned

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_rarity CHECK (rarity >= 1 AND rarity <= 4),
    CONSTRAINT valid_points CHECK (points_value >= 0)
);

-- Indexes for badges
CREATE INDEX idx_badges_category ON public.badges(category);
CREATE INDEX idx_badges_rarity ON public.badges(rarity);
CREATE INDEX idx_badges_is_active ON public.badges(is_active);

-- ============================================================================
-- USER BADGES
-- ============================================================================

CREATE TABLE public.user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id TEXT NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,

    -- Earning details
    earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Display
    is_pinned BOOLEAN NOT NULL DEFAULT FALSE, -- Show on profile
    pin_order INTEGER,

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb, -- Additional context about how it was earned

    CONSTRAINT unique_user_badge UNIQUE (user_id, badge_id)
);

-- Indexes for user_badges
CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON public.user_badges(badge_id);
CREATE INDEX idx_user_badges_earned_at ON public.user_badges(earned_at DESC);
CREATE INDEX idx_user_badges_is_pinned ON public.user_badges(is_pinned);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_user_progress_updated_at
    BEFORE UPDATE ON public.user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_module_progress_updated_at
    BEFORE UPDATE ON public.module_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_progress_updated_at
    BEFORE UPDATE ON public.lesson_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_badges_updated_at
    BEFORE UPDATE ON public.badges
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate XP needed for next level
CREATE OR REPLACE FUNCTION calculate_xp_for_level(level INTEGER)
RETURNS INTEGER AS $$
BEGIN
    -- Formula: 100 * level * (level + 1) / 2
    -- Level 1->2: 100, Level 2->3: 300, Level 3->4: 600, etc.
    RETURN 100 * level * (level + 1) / 2;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to auto-level up user when XP threshold is reached
CREATE OR REPLACE FUNCTION check_level_up()
RETURNS TRIGGER AS $$
DECLARE
    xp_needed INTEGER;
BEGIN
    xp_needed := calculate_xp_for_level(NEW.current_level);

    WHILE NEW.current_xp >= xp_needed LOOP
        NEW.current_level := NEW.current_level + 1;
        NEW.current_xp := NEW.current_xp - xp_needed;
        xp_needed := calculate_xp_for_level(NEW.current_level);
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_level_up
    BEFORE INSERT OR UPDATE OF current_xp ON public.user_progress
    FOR EACH ROW
    EXECUTE FUNCTION check_level_up();

-- Function to update streak
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
BEGIN
    -- If last activity was yesterday, increment streak
    IF NEW.last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN
        NEW.current_streak_days := OLD.current_streak_days + 1;
        NEW.longest_streak_days := GREATEST(OLD.longest_streak_days, NEW.current_streak_days);
    -- If last activity was today, keep same streak
    ELSIF NEW.last_activity_date = CURRENT_DATE THEN
        NEW.current_streak_days := OLD.current_streak_days;
    -- If gap is more than 1 day, reset streak
    ELSIF NEW.last_activity_date IS NULL OR NEW.last_activity_date < CURRENT_DATE - INTERVAL '1 day' THEN
        NEW.current_streak_days := 1;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_streak
    BEFORE UPDATE OF last_activity_date ON public.user_progress
    FOR EACH ROW
    WHEN (NEW.last_activity_date IS DISTINCT FROM OLD.last_activity_date)
    EXECUTE FUNCTION update_user_streak();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.user_progress IS 'Overall user progress: level, XP, streaks, stats';
COMMENT ON TABLE public.module_progress IS 'Per-module progress tracking';
COMMENT ON TABLE public.lesson_progress IS 'Per-lesson completion and performance';
COMMENT ON TABLE public.badges IS 'Available badges and achievements';
COMMENT ON TABLE public.user_badges IS 'Badges earned by users';

COMMENT ON COLUMN public.badges.unlock_criteria IS 'JSONB with criteria like {"type": "complete_module", "module_id": "ai-basics"}';
COMMENT ON FUNCTION calculate_xp_for_level IS 'Returns XP needed to reach next level from given level';
