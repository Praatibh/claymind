-- ClayMind AI Lab Schema
-- Description: AI-generated content, user creations, and generation history
-- Date: 2025-01-01

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE creation_type AS ENUM ('webapp', 'chat');
CREATE TYPE creation_status AS ENUM ('generating', 'completed', 'failed', 'flagged');

-- ============================================================================
-- AI LAB CREATIONS
-- ============================================================================

CREATE TABLE public.ai_lab_creations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Creation details
    type creation_type NOT NULL,
    title TEXT,
    prompt TEXT NOT NULL,
    output TEXT, -- Generated code/response

    -- Status
    status creation_status NOT NULL DEFAULT 'generating',
    error_message TEXT,

    -- Metadata
    generation_time_ms INTEGER, -- How long it took to generate
    model_used TEXT, -- e.g., 'gemini-pro'
    tokens_used INTEGER,

    -- Engagement
    view_count INTEGER NOT NULL DEFAULT 0,
    like_count INTEGER NOT NULL DEFAULT 0,
    is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
    is_shared BOOLEAN NOT NULL DEFAULT FALSE,

    -- Safety
    is_flagged BOOLEAN NOT NULL DEFAULT FALSE,
    flagged_reason TEXT,
    moderation_reviewed_at TIMESTAMPTZ,

    -- Storage (for webapp HTML files)
    file_storage_path TEXT, -- Path in Supabase Storage

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Search
    search_vector tsvector,

    CONSTRAINT valid_prompt_length CHECK (length(prompt) >= 1 AND length(prompt) <= 5000),
    CONSTRAINT valid_generation_time CHECK (generation_time_ms IS NULL OR generation_time_ms >= 0)
);

-- Indexes for ai_lab_creations
CREATE INDEX idx_ai_lab_creations_user_id ON public.ai_lab_creations(user_id);
CREATE INDEX idx_ai_lab_creations_type ON public.ai_lab_creations(type);
CREATE INDEX idx_ai_lab_creations_status ON public.ai_lab_creations(status);
CREATE INDEX idx_ai_lab_creations_created_at ON public.ai_lab_creations(created_at DESC);
CREATE INDEX idx_ai_lab_creations_is_favorite ON public.ai_lab_creations(is_favorite);
CREATE INDEX idx_ai_lab_creations_is_flagged ON public.ai_lab_creations(is_flagged);
CREATE INDEX idx_ai_lab_creations_search ON public.ai_lab_creations USING GIN(search_vector);

-- ============================================================================
-- AI LAB TEMPLATES (Optional - for pre-made examples)
-- ============================================================================

CREATE TABLE public.ai_lab_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Content
    type creation_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    example_prompt TEXT NOT NULL,
    preview_code TEXT,

    -- Metadata
    difficulty difficulty_level NOT NULL DEFAULT 'beginner',
    tags TEXT[] DEFAULT '{}',
    category TEXT,

    -- Display
    thumbnail_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,

    -- Visibility
    is_published BOOLEAN NOT NULL DEFAULT FALSE,

    -- Stats
    use_count INTEGER NOT NULL DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_display_order CHECK (display_order >= 0)
);

-- Indexes for ai_lab_templates
CREATE INDEX idx_ai_lab_templates_type ON public.ai_lab_templates(type);
CREATE INDEX idx_ai_lab_templates_is_published ON public.ai_lab_templates(is_published);
CREATE INDEX idx_ai_lab_templates_is_featured ON public.ai_lab_templates(is_featured);
CREATE INDEX idx_ai_lab_templates_tags ON public.ai_lab_templates USING GIN(tags);

-- ============================================================================
-- AI LAB USAGE STATS (Track API usage)
-- ============================================================================

CREATE TABLE public.ai_lab_usage_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Date tracking
    date DATE NOT NULL DEFAULT CURRENT_DATE,

    -- Usage counts
    webapp_generations_count INTEGER NOT NULL DEFAULT 0,
    chat_messages_count INTEGER NOT NULL DEFAULT 0,
    total_requests_count INTEGER NOT NULL DEFAULT 0,

    -- API usage
    total_tokens_used INTEGER NOT NULL DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT unique_user_date UNIQUE (user_id, date),
    CONSTRAINT valid_counts CHECK (
        webapp_generations_count >= 0 AND
        chat_messages_count >= 0 AND
        total_requests_count >= 0 AND
        total_tokens_used >= 0
    )
);

-- Indexes for usage stats
CREATE INDEX idx_ai_lab_usage_stats_user_id ON public.ai_lab_usage_stats(user_id);
CREATE INDEX idx_ai_lab_usage_stats_date ON public.ai_lab_usage_stats(date DESC);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_ai_lab_creations_updated_at
    BEFORE UPDATE ON public.ai_lab_creations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_lab_templates_updated_at
    BEFORE UPDATE ON public.ai_lab_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_lab_usage_stats_updated_at
    BEFORE UPDATE ON public.ai_lab_usage_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to update search vector
CREATE OR REPLACE FUNCTION update_ai_lab_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector :=
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.prompt, '')), 'B');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ai_lab_creations_search_vector
    BEFORE INSERT OR UPDATE OF title, prompt ON public.ai_lab_creations
    FOR EACH ROW
    EXECUTE FUNCTION update_ai_lab_search_vector();

-- Function to track AI Lab usage
CREATE OR REPLACE FUNCTION track_ai_lab_usage()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        INSERT INTO public.ai_lab_usage_stats (user_id, date, total_requests_count, total_tokens_used)
        VALUES (
            NEW.user_id,
            CURRENT_DATE,
            1,
            COALESCE(NEW.tokens_used, 0)
        )
        ON CONFLICT (user_id, date) DO UPDATE SET
            total_requests_count = ai_lab_usage_stats.total_requests_count + 1,
            total_tokens_used = ai_lab_usage_stats.total_tokens_used + COALESCE(NEW.tokens_used, 0),
            webapp_generations_count = CASE
                WHEN NEW.type = 'webapp' THEN ai_lab_usage_stats.webapp_generations_count + 1
                ELSE ai_lab_usage_stats.webapp_generations_count
            END,
            chat_messages_count = CASE
                WHEN NEW.type = 'chat' THEN ai_lab_usage_stats.chat_messages_count + 1
                ELSE ai_lab_usage_stats.chat_messages_count
            END,
            updated_at = NOW();
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_ai_lab_usage_trigger
    AFTER INSERT OR UPDATE OF status ON public.ai_lab_creations
    FOR EACH ROW
    EXECUTE FUNCTION track_ai_lab_usage();

-- Function to update user total creations
CREATE OR REPLACE FUNCTION update_user_ai_creations_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND (TG_OP = 'INSERT' OR OLD.status != 'completed') THEN
        UPDATE public.user_progress
        SET total_ai_creations = total_ai_creations + 1
        WHERE user_id = NEW.user_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_ai_creations_count_trigger
    AFTER INSERT OR UPDATE OF status ON public.ai_lab_creations
    FOR EACH ROW
    EXECUTE FUNCTION update_user_ai_creations_count();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.ai_lab_creations IS 'User-generated AI creations (webapps, chat responses)';
COMMENT ON TABLE public.ai_lab_templates IS 'Pre-made templates and examples for AI Lab';
COMMENT ON TABLE public.ai_lab_usage_stats IS 'Daily usage statistics per user for rate limiting';

COMMENT ON COLUMN public.ai_lab_creations.file_storage_path IS 'Path to stored HTML file in Supabase Storage bucket';
COMMENT ON COLUMN public.ai_lab_creations.search_vector IS 'Full-text search vector for title and prompt';
