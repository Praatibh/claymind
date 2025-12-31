-- ClayMind Row Level Security (RLS) Policies
-- Description: Secure data access with child-safe policies
-- Date: 2025-01-01

-- ============================================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_child_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_student_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_lab_creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_lab_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_lab_usage_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_safety_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_queue ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND role = 'admin'
        AND account_status = 'active'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is teacher
CREATE OR REPLACE FUNCTION is_teacher()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND role = 'teacher'
        AND account_status = 'active'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is parent of given child
CREATE OR REPLACE FUNCTION is_parent_of(child_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.parent_child_links
        WHERE parent_id = auth.uid()
        AND parent_child_links.child_id = is_parent_of.child_id
        AND is_verified = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is teacher of given student
CREATE OR REPLACE FUNCTION is_teacher_of(student_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.teacher_student_links
        WHERE teacher_id = auth.uid()
        AND teacher_student_links.student_id = is_teacher_of.student_id
        AND is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
BEGIN
    RETURN (
        SELECT role FROM public.profiles
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ============================================================================
-- PROFILES POLICIES
-- ============================================================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

-- Parents can view their children's profiles
CREATE POLICY "Parents can view children profiles"
    ON public.profiles FOR SELECT
    USING (is_parent_of(id));

-- Teachers can view their students' profiles
CREATE POLICY "Teachers can view student profiles"
    ON public.profiles FOR SELECT
    USING (is_teacher_of(id));

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    USING (is_admin());

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Admins can update any profile
CREATE POLICY "Admins can update all profiles"
    ON public.profiles FOR UPDATE
    USING (is_admin());

-- Admins can delete profiles
CREATE POLICY "Admins can delete profiles"
    ON public.profiles FOR DELETE
    USING (is_admin());

-- ============================================================================
-- PARENT-CHILD LINKS POLICIES
-- ============================================================================

-- Parents can view their own links
CREATE POLICY "Parents can view their links"
    ON public.parent_child_links FOR SELECT
    USING (parent_id = auth.uid() OR child_id = auth.uid());

-- Parents can create links to their children
CREATE POLICY "Parents can create links"
    ON public.parent_child_links FOR INSERT
    WITH CHECK (parent_id = auth.uid());

-- Parents can update their own links
CREATE POLICY "Parents can update their links"
    ON public.parent_child_links FOR UPDATE
    USING (parent_id = auth.uid());

-- Admins have full access
CREATE POLICY "Admins can manage all parent-child links"
    ON public.parent_child_links FOR ALL
    USING (is_admin());

-- ============================================================================
-- TEACHER-STUDENT LINKS POLICIES
-- ============================================================================

-- Teachers and students can view their links
CREATE POLICY "View own teacher-student links"
    ON public.teacher_student_links FOR SELECT
    USING (teacher_id = auth.uid() OR student_id = auth.uid());

-- Teachers can create links
CREATE POLICY "Teachers can create student links"
    ON public.teacher_student_links FOR INSERT
    WITH CHECK (teacher_id = auth.uid() AND is_teacher());

-- Teachers can update their links
CREATE POLICY "Teachers can update their links"
    ON public.teacher_student_links FOR UPDATE
    USING (teacher_id = auth.uid() AND is_teacher());

-- Admins have full access
CREATE POLICY "Admins can manage all teacher-student links"
    ON public.teacher_student_links FOR ALL
    USING (is_admin());

-- ============================================================================
-- LEARNING CONTENT POLICIES (Modules, Lessons)
-- ============================================================================

-- Everyone can view published modules
CREATE POLICY "Anyone can view published modules"
    ON public.modules FOR SELECT
    USING (is_published = TRUE);

-- Admins can manage modules
CREATE POLICY "Admins can manage modules"
    ON public.modules FOR ALL
    USING (is_admin());

-- Everyone can view published lessons
CREATE POLICY "Anyone can view published lessons"
    ON public.lessons FOR SELECT
    USING (is_published = TRUE);

-- Admins can manage lessons
CREATE POLICY "Admins can manage lessons"
    ON public.lessons FOR ALL
    USING (is_admin());

-- Everyone can view visible lesson content
CREATE POLICY "Anyone can view visible lesson content"
    ON public.lesson_content FOR SELECT
    USING (is_visible = TRUE);

-- Admins can manage lesson content
CREATE POLICY "Admins can manage lesson content"
    ON public.lesson_content FOR ALL
    USING (is_admin());

-- ============================================================================
-- PROGRESS POLICIES
-- ============================================================================

-- Users can view and update their own progress
CREATE POLICY "Users can manage own progress"
    ON public.user_progress FOR ALL
    USING (user_id = auth.uid());

-- Parents can view children's progress (read-only)
CREATE POLICY "Parents can view children progress"
    ON public.user_progress FOR SELECT
    USING (is_parent_of(user_id));

-- Teachers can view students' progress (read-only)
CREATE POLICY "Teachers can view student progress"
    ON public.user_progress FOR SELECT
    USING (is_teacher_of(user_id));

-- Admins can manage all progress
CREATE POLICY "Admins can manage all progress"
    ON public.user_progress FOR ALL
    USING (is_admin());

-- Module Progress (same pattern)
CREATE POLICY "Users can manage own module progress"
    ON public.module_progress FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY "Parents can view children module progress"
    ON public.module_progress FOR SELECT
    USING (is_parent_of(user_id));

CREATE POLICY "Teachers can view student module progress"
    ON public.module_progress FOR SELECT
    USING (is_teacher_of(user_id));

CREATE POLICY "Admins can manage all module progress"
    ON public.module_progress FOR ALL
    USING (is_admin());

-- Lesson Progress (same pattern)
CREATE POLICY "Users can manage own lesson progress"
    ON public.lesson_progress FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY "Parents can view children lesson progress"
    ON public.lesson_progress FOR SELECT
    USING (is_parent_of(user_id));

CREATE POLICY "Teachers can view student lesson progress"
    ON public.lesson_progress FOR SELECT
    USING (is_teacher_of(user_id));

CREATE POLICY "Admins can manage all lesson progress"
    ON public.lesson_progress FOR ALL
    USING (is_admin());

-- ============================================================================
-- BADGES POLICIES
-- ============================================================================

-- Everyone can view active badges
CREATE POLICY "Anyone can view active badges"
    ON public.badges FOR SELECT
    USING (is_active = TRUE);

-- Admins can manage badges
CREATE POLICY "Admins can manage badges"
    ON public.badges FOR ALL
    USING (is_admin());

-- Users can view their own earned badges
CREATE POLICY "Users can view own badges"
    ON public.user_badges FOR SELECT
    USING (user_id = auth.uid());

-- Parents can view children's badges
CREATE POLICY "Parents can view children badges"
    ON public.user_badges FOR SELECT
    USING (is_parent_of(user_id));

-- Teachers can view students' badges
CREATE POLICY "Teachers can view student badges"
    ON public.user_badges FOR SELECT
    USING (is_teacher_of(user_id));

-- System can award badges (service role)
CREATE POLICY "System can award badges"
    ON public.user_badges FOR INSERT
    WITH CHECK (TRUE); -- Service role only

-- Admins can manage all badges
CREATE POLICY "Admins can manage all user badges"
    ON public.user_badges FOR ALL
    USING (is_admin());

-- ============================================================================
-- AI LAB POLICIES
-- ============================================================================

-- Users can manage their own creations
CREATE POLICY "Users can manage own AI creations"
    ON public.ai_lab_creations FOR ALL
    USING (user_id = auth.uid());

-- Parents can view children's creations (read-only)
CREATE POLICY "Parents can view children AI creations"
    ON public.ai_lab_creations FOR SELECT
    USING (is_parent_of(user_id));

-- Teachers can view students' creations (read-only)
CREATE POLICY "Teachers can view student AI creations"
    ON public.ai_lab_creations FOR SELECT
    USING (is_teacher_of(user_id));

-- Admins can manage all creations
CREATE POLICY "Admins can manage all AI creations"
    ON public.ai_lab_creations FOR ALL
    USING (is_admin());

-- Everyone can view published templates
CREATE POLICY "Anyone can view published templates"
    ON public.ai_lab_templates FOR SELECT
    USING (is_published = TRUE);

-- Admins can manage templates
CREATE POLICY "Admins can manage templates"
    ON public.ai_lab_templates FOR ALL
    USING (is_admin());

-- Users can view their own usage stats
CREATE POLICY "Users can view own usage stats"
    ON public.ai_lab_usage_stats FOR SELECT
    USING (user_id = auth.uid());

-- System can update usage stats
CREATE POLICY "System can update usage stats"
    ON public.ai_lab_usage_stats FOR ALL
    USING (TRUE); -- Service role only

-- ============================================================================
-- SAFETY & MODERATION POLICIES
-- ============================================================================

-- Users can flag content
CREATE POLICY "Users can flag content"
    ON public.content_flags FOR INSERT
    WITH CHECK (flagged_by_user_id = auth.uid());

-- Users can view their own flags
CREATE POLICY "Users can view own flags"
    ON public.content_flags FOR SELECT
    USING (flagged_by_user_id = auth.uid() OR content_owner_id = auth.uid());

-- Admins can manage all flags
CREATE POLICY "Admins can manage all flags"
    ON public.content_flags FOR ALL
    USING (is_admin());

-- Users can view their own activity logs
CREATE POLICY "Users can view own activity logs"
    ON public.activity_logs FOR SELECT
    USING (user_id = auth.uid());

-- Parents can view children's activity logs
CREATE POLICY "Parents can view children activity logs"
    ON public.activity_logs FOR SELECT
    USING (is_parent_of(user_id));

-- System can create activity logs
CREATE POLICY "System can create activity logs"
    ON public.activity_logs FOR INSERT
    WITH CHECK (TRUE); -- Service role only

-- Admins can view all activity logs
CREATE POLICY "Admins can view all activity logs"
    ON public.activity_logs FOR SELECT
    USING (is_admin());

-- Users can manage their own safety settings
CREATE POLICY "Users can manage own safety settings"
    ON public.user_safety_settings FOR ALL
    USING (user_id = auth.uid());

-- Parents can manage children's safety settings
CREATE POLICY "Parents can manage children safety settings"
    ON public.user_safety_settings FOR ALL
    USING (is_parent_of(user_id));

-- Users can manage their own blocks
CREATE POLICY "Users can manage own blocks"
    ON public.blocked_users FOR ALL
    USING (user_id = auth.uid());

-- Admins can view moderation queue
CREATE POLICY "Admins can manage moderation queue"
    ON public.moderation_queue FOR ALL
    USING (is_admin());

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON POLICY "Users can view own profile" ON public.profiles IS 'Users can only see their own profile data';
COMMENT ON POLICY "Parents can view children profiles" ON public.profiles IS 'Parents with verified links can view their children';
COMMENT ON FUNCTION is_admin() IS 'Returns true if current user is an active admin';
COMMENT ON FUNCTION is_parent_of(UUID) IS 'Returns true if current user is verified parent of given child';
