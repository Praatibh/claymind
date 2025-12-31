-- ClayMind Initial Schema Migration
-- Description: Core tables for users, profiles, roles, and relationships
-- Author: ClayMind Team
-- Date: 2025-01-01

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ENUMS
-- ============================================================================

-- User roles enum
CREATE TYPE user_role AS ENUM ('student', 'parent', 'teacher', 'admin');

-- Account status enum
CREATE TYPE account_status AS ENUM ('active', 'suspended', 'pending_verification', 'deleted');

-- Content flag types
CREATE TYPE flag_type AS ENUM ('inappropriate', 'safety_concern', 'spam', 'copyright', 'other');

-- Flag status
CREATE TYPE flag_status AS ENUM ('pending', 'reviewed', 'resolved', 'dismissed');

-- ============================================================================
-- PROFILES TABLE
-- ============================================================================

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Basic Info
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT,
    display_name TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,

    -- User Type & Status
    role user_role NOT NULL DEFAULT 'student',
    account_status account_status NOT NULL DEFAULT 'active',

    -- Student-specific fields
    age INTEGER CHECK (age IS NULL OR (age >= 6 AND age <= 18)),
    grade_level INTEGER CHECK (grade_level IS NULL OR (grade_level >= 1 AND grade_level <= 12)),

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ,
    email_verified_at TIMESTAMPTZ,

    -- Metadata
    settings JSONB DEFAULT '{}'::jsonb,

    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
    CONSTRAINT valid_username CHECK (username IS NULL OR (length(username) >= 3 AND length(username) <= 30))
);

-- Indexes for profiles
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_account_status ON public.profiles(account_status);
CREATE INDEX idx_profiles_created_at ON public.profiles(created_at DESC);

-- ============================================================================
-- PARENT-CHILD RELATIONSHIPS
-- ============================================================================

CREATE TABLE public.parent_child_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Relationship status
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verified_at TIMESTAMPTZ,

    -- Permissions
    can_view_progress BOOLEAN NOT NULL DEFAULT TRUE,
    can_manage_account BOOLEAN NOT NULL DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Constraints
    CONSTRAINT no_self_link CHECK (parent_id != child_id),
    CONSTRAINT unique_parent_child UNIQUE (parent_id, child_id)
);

-- Indexes for parent-child links
CREATE INDEX idx_parent_child_parent ON public.parent_child_links(parent_id);
CREATE INDEX idx_parent_child_child ON public.parent_child_links(child_id);
CREATE INDEX idx_parent_child_verified ON public.parent_child_links(is_verified);

-- ============================================================================
-- TEACHER-STUDENT RELATIONSHIPS
-- ============================================================================

CREATE TABLE public.teacher_student_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Class/Group info
    class_name TEXT,
    class_code TEXT,

    -- Status
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Constraints
    CONSTRAINT no_self_teach CHECK (teacher_id != student_id),
    CONSTRAINT unique_teacher_student UNIQUE (teacher_id, student_id)
);

-- Indexes for teacher-student links
CREATE INDEX idx_teacher_student_teacher ON public.teacher_student_links(teacher_id);
CREATE INDEX idx_teacher_student_student ON public.teacher_student_links(student_id);
CREATE INDEX idx_teacher_student_class_code ON public.teacher_student_links(class_code);
CREATE INDEX idx_teacher_student_active ON public.teacher_student_links(is_active);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for parent_child_links updated_at
CREATE TRIGGER update_parent_child_links_updated_at
    BEFORE UPDATE ON public.parent_child_links
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for teacher_student_links updated_at
CREATE TRIGGER update_teacher_student_links_updated_at
    BEFORE UPDATE ON public.teacher_student_links
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', 'User'),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.profiles IS 'Extended user profiles with role-based fields';
COMMENT ON TABLE public.parent_child_links IS 'Parent-child relationships with permissions';
COMMENT ON TABLE public.teacher_student_links IS 'Teacher-student classroom relationships';

COMMENT ON COLUMN public.profiles.settings IS 'User preferences stored as JSONB (theme, notifications, etc.)';
COMMENT ON COLUMN public.parent_child_links.is_verified IS 'Whether parent has verified relationship via email/code';
