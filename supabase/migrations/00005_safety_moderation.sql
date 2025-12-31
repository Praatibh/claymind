-- ClayMind Safety & Moderation Schema
-- Description: Content flags, activity logs, safety monitoring
-- Date: 2025-01-01

-- ============================================================================
-- CONTENT FLAGS
-- ============================================================================

CREATE TABLE public.content_flags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Flag details
    flag_type flag_type NOT NULL,
    flag_status flag_status NOT NULL DEFAULT 'pending',
    description TEXT,

    -- Content reference (polymorphic)
    flagged_content_type TEXT NOT NULL, -- 'ai_creation', 'lesson_comment', etc.
    flagged_content_id UUID NOT NULL,

    -- Users involved
    flagged_by_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    content_owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Review
    reviewed_by_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    review_notes TEXT,

    -- Action taken
    action_taken TEXT, -- 'removed', 'warning_sent', 'no_action', etc.

    -- Severity (1-5, where 5 is most severe)
    severity_level INTEGER NOT NULL DEFAULT 1,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_severity CHECK (severity_level >= 1 AND severity_level <= 5)
);

-- Indexes for content_flags
CREATE INDEX idx_content_flags_status ON public.content_flags(flag_status);
CREATE INDEX idx_content_flags_type ON public.content_flags(flag_type);
CREATE INDEX idx_content_flags_flagged_by ON public.content_flags(flagged_by_user_id);
CREATE INDEX idx_content_flags_content_owner ON public.content_flags(content_owner_id);
CREATE INDEX idx_content_flags_content ON public.content_flags(flagged_content_type, flagged_content_id);
CREATE INDEX idx_content_flags_created_at ON public.content_flags(created_at DESC);
CREATE INDEX idx_content_flags_severity ON public.content_flags(severity_level DESC);

-- ============================================================================
-- ACTIVITY LOGS
-- ============================================================================

CREATE TABLE public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Activity details
    activity_type TEXT NOT NULL, -- 'lesson_start', 'lesson_complete', 'ai_creation', 'login', etc.
    activity_data JSONB DEFAULT '{}'::jsonb,

    -- Context
    ip_address INET,
    user_agent TEXT,
    session_id UUID,

    -- Metadata
    duration_seconds INTEGER,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,

    -- Timestamp
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_duration CHECK (duration_seconds IS NULL OR duration_seconds >= 0)
);

-- Indexes for activity_logs
CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_activity_type ON public.activity_logs(activity_type);
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX idx_activity_logs_session_id ON public.activity_logs(session_id);
CREATE INDEX idx_activity_logs_data ON public.activity_logs USING GIN(activity_data);

-- Partitioning by month for performance (optional but recommended)
-- This would need to be set up separately with pg_partman or manual partitions

-- ============================================================================
-- SAFETY SETTINGS PER USER
-- ============================================================================

CREATE TABLE public.user_safety_settings (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Content filtering
    enable_content_filter BOOLEAN NOT NULL DEFAULT TRUE,
    filter_level INTEGER NOT NULL DEFAULT 2, -- 1=low, 2=medium, 3=high

    -- AI Lab restrictions
    max_daily_ai_requests INTEGER NOT NULL DEFAULT 50,
    require_approval_for_sharing BOOLEAN NOT NULL DEFAULT TRUE,

    -- Monitoring
    enable_activity_monitoring BOOLEAN NOT NULL DEFAULT TRUE,
    alert_on_suspicious_activity BOOLEAN NOT NULL DEFAULT TRUE,

    -- Time limits (minutes per day)
    daily_time_limit_minutes INTEGER,
    time_limit_enabled BOOLEAN NOT NULL DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_filter_level CHECK (filter_level >= 1 AND filter_level <= 3),
    CONSTRAINT valid_max_requests CHECK (max_daily_ai_requests > 0)
);

-- ============================================================================
-- BLOCKED USERS (for safety)
-- ============================================================================

CREATE TABLE public.blocked_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    blocked_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Reason
    reason TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT no_self_block CHECK (user_id != blocked_user_id),
    CONSTRAINT unique_block UNIQUE (user_id, blocked_user_id)
);

-- Indexes for blocked_users
CREATE INDEX idx_blocked_users_user_id ON public.blocked_users(user_id);
CREATE INDEX idx_blocked_users_blocked_user_id ON public.blocked_users(blocked_user_id);

-- ============================================================================
-- MODERATION QUEUE
-- ============================================================================

CREATE TABLE public.moderation_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Content to review
    content_type TEXT NOT NULL, -- 'ai_creation', 'user_profile', etc.
    content_id UUID NOT NULL,
    content_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Priority (1=low, 5=urgent)
    priority INTEGER NOT NULL DEFAULT 1,

    -- Status
    status flag_status NOT NULL DEFAULT 'pending',

    -- Assignment
    assigned_to_moderator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    assigned_at TIMESTAMPTZ,

    -- AI-based pre-screening
    ai_flagged BOOLEAN NOT NULL DEFAULT FALSE,
    ai_confidence_score NUMERIC(3,2), -- 0.00 to 1.00
    ai_flag_reasons TEXT[],

    -- Resolution
    resolved_at TIMESTAMPTZ,
    resolution_notes TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_priority CHECK (priority >= 1 AND priority <= 5),
    CONSTRAINT valid_confidence CHECK (ai_confidence_score IS NULL OR (ai_confidence_score >= 0 AND ai_confidence_score <= 1))
);

-- Indexes for moderation_queue
CREATE INDEX idx_moderation_queue_status ON public.moderation_queue(status);
CREATE INDEX idx_moderation_queue_priority ON public.moderation_queue(priority DESC);
CREATE INDEX idx_moderation_queue_ai_flagged ON public.moderation_queue(ai_flagged);
CREATE INDEX idx_moderation_queue_assigned_to ON public.moderation_queue(assigned_to_moderator_id);
CREATE INDEX idx_moderation_queue_created_at ON public.moderation_queue(created_at DESC);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_content_flags_updated_at
    BEFORE UPDATE ON public.content_flags
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_safety_settings_updated_at
    BEFORE UPDATE ON public.user_safety_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_moderation_queue_updated_at
    BEFORE UPDATE ON public.moderation_queue
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Auto-create safety settings on user signup
CREATE OR REPLACE FUNCTION create_default_safety_settings()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_safety_settings (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_safety_settings_on_signup
    AFTER INSERT ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION create_default_safety_settings();

-- Auto-flag content if it matches certain patterns
CREATE OR REPLACE FUNCTION auto_flag_suspicious_content()
RETURNS TRIGGER AS $$
BEGIN
    -- Check for inappropriate keywords (simplified example)
    IF NEW.type = 'chat' AND NEW.output IS NOT NULL THEN
        IF NEW.output ~* '(violence|explicit|dangerous)' THEN
            NEW.is_flagged := TRUE;
            NEW.flagged_reason := 'Auto-flagged by content filter';

            -- Add to moderation queue
            INSERT INTO public.moderation_queue (
                content_type,
                content_id,
                content_user_id,
                priority,
                ai_flagged,
                ai_confidence_score
            ) VALUES (
                'ai_creation',
                NEW.id,
                NEW.user_id,
                3, -- Medium priority
                TRUE,
                0.75
            );
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_flag_ai_creations
    BEFORE INSERT OR UPDATE OF output ON public.ai_lab_creations
    FOR EACH ROW
    WHEN (NEW.output IS NOT NULL)
    EXECUTE FUNCTION auto_flag_suspicious_content();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.content_flags IS 'User-reported content flags for moderation';
COMMENT ON TABLE public.activity_logs IS 'User activity tracking for safety and analytics';
COMMENT ON TABLE public.user_safety_settings IS 'Per-user safety and parental control settings';
COMMENT ON TABLE public.blocked_users IS 'User-initiated blocks for safety';
COMMENT ON TABLE public.moderation_queue IS 'Queue of content awaiting moderation review';

COMMENT ON COLUMN public.moderation_queue.ai_confidence_score IS 'AI model confidence that content needs review (0-1)';
