-- ClayMind Learning Content Schema
-- Description: Modules, lessons, and learning content
-- Date: 2025-01-01

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE content_type AS ENUM ('video', 'text', 'interactive', 'quiz', 'code_editor', 'ai_lab');
CREATE TYPE module_color AS ENUM ('purple', 'blue', 'green', 'amber', 'pink', 'red', 'cyan', 'indigo');

-- ============================================================================
-- MODULES TABLE
-- ============================================================================

CREATE TABLE public.modules (
    id TEXT PRIMARY KEY, -- e.g., 'ai-basics', 'ml-mini'

    -- Content
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,

    -- Metadata
    difficulty difficulty_level NOT NULL DEFAULT 'beginner',
    color module_color NOT NULL DEFAULT 'purple',
    icon_name TEXT, -- Lucide icon name
    cover_image_url TEXT,

    -- Ordering & visibility
    display_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,

    -- Requirements
    required_level INTEGER DEFAULT 1,
    prerequisite_module_ids TEXT[] DEFAULT '{}',

    -- Stats (updated via triggers)
    total_lessons INTEGER NOT NULL DEFAULT 0,
    estimated_duration_minutes INTEGER NOT NULL DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_at TIMESTAMPTZ,

    -- Metadata
    tags TEXT[] DEFAULT '{}',
    learning_objectives TEXT[] DEFAULT '{}',

    CONSTRAINT valid_display_order CHECK (display_order >= 0),
    CONSTRAINT valid_required_level CHECK (required_level >= 1)
);

-- Indexes for modules
CREATE INDEX idx_modules_display_order ON public.modules(display_order);
CREATE INDEX idx_modules_is_published ON public.modules(is_published);
CREATE INDEX idx_modules_difficulty ON public.modules(difficulty);
CREATE INDEX idx_modules_tags ON public.modules USING GIN(tags);

-- ============================================================================
-- LESSONS TABLE
-- ============================================================================

CREATE TABLE public.lessons (
    id TEXT PRIMARY KEY, -- e.g., 'ai-basics-1', 'ml-mini-2'
    module_id TEXT NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,

    -- Content
    title TEXT NOT NULL,
    description TEXT,

    -- Ordering
    lesson_number INTEGER NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,

    -- Metadata
    estimated_duration_minutes INTEGER NOT NULL DEFAULT 15,
    difficulty difficulty_level NOT NULL DEFAULT 'beginner',

    -- Status
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    is_locked_by_default BOOLEAN NOT NULL DEFAULT FALSE,

    -- Requirements
    unlock_after_lesson_id TEXT REFERENCES public.lessons(id),
    required_previous_lessons INTEGER DEFAULT 0, -- How many previous lessons must be completed

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_at TIMESTAMPTZ,

    -- Metadata
    learning_objectives TEXT[] DEFAULT '{}',
    keywords TEXT[] DEFAULT '{}',

    CONSTRAINT unique_module_lesson_number UNIQUE (module_id, lesson_number),
    CONSTRAINT valid_lesson_number CHECK (lesson_number > 0),
    CONSTRAINT valid_display_order CHECK (display_order >= 0)
);

-- Indexes for lessons
CREATE INDEX idx_lessons_module_id ON public.lessons(module_id);
CREATE INDEX idx_lessons_display_order ON public.lessons(display_order);
CREATE INDEX idx_lessons_lesson_number ON public.lessons(lesson_number);
CREATE INDEX idx_lessons_is_published ON public.lessons(is_published);

-- ============================================================================
-- LESSON CONTENT BLOCKS
-- ============================================================================

CREATE TABLE public.lesson_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id TEXT NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,

    -- Content
    content_type content_type NOT NULL,
    title TEXT,
    content JSONB NOT NULL, -- Flexible structure based on content_type

    -- Ordering
    display_order INTEGER NOT NULL DEFAULT 0,

    -- Visibility
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_content CHECK (jsonb_typeof(content) = 'object')
);

-- Indexes for lesson content
CREATE INDEX idx_lesson_content_lesson_id ON public.lesson_content(lesson_id);
CREATE INDEX idx_lesson_content_display_order ON public.lesson_content(display_order);
CREATE INDEX idx_lesson_content_type ON public.lesson_content(content_type);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Trigger for modules updated_at
CREATE TRIGGER update_modules_updated_at
    BEFORE UPDATE ON public.modules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for lessons updated_at
CREATE TRIGGER update_lessons_updated_at
    BEFORE UPDATE ON public.lessons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for lesson_content updated_at
CREATE TRIGGER update_lesson_content_updated_at
    BEFORE UPDATE ON public.lesson_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to update module stats when lessons change
CREATE OR REPLACE FUNCTION update_module_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.modules
    SET
        total_lessons = (
            SELECT COUNT(*)
            FROM public.lessons
            WHERE module_id = COALESCE(NEW.module_id, OLD.module_id)
            AND is_published = TRUE
        ),
        estimated_duration_minutes = (
            SELECT COALESCE(SUM(estimated_duration_minutes), 0)
            FROM public.lessons
            WHERE module_id = COALESCE(NEW.module_id, OLD.module_id)
            AND is_published = TRUE
        )
    WHERE id = COALESCE(NEW.module_id, OLD.module_id);

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update module stats
CREATE TRIGGER update_module_stats_on_lesson_change
    AFTER INSERT OR UPDATE OR DELETE ON public.lessons
    FOR EACH ROW
    EXECUTE FUNCTION update_module_stats();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.modules IS 'Learning modules (e.g., AI Basics, Prompt Engineering)';
COMMENT ON TABLE public.lessons IS 'Individual lessons within modules';
COMMENT ON TABLE public.lesson_content IS 'Content blocks for lessons (videos, text, interactive elements)';

COMMENT ON COLUMN public.modules.prerequisite_module_ids IS 'Array of module IDs that must be completed first';
COMMENT ON COLUMN public.lesson_content.content IS 'JSONB structure varies by content_type';
COMMENT ON COLUMN public.lessons.unlock_after_lesson_id IS 'Lesson ID that must be completed to unlock this lesson';
