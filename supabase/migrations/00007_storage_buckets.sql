-- ClayMind Storage Buckets Configuration
-- Description: Configure Supabase Storage for AI Lab creations, avatars, etc.
-- Date: 2025-01-01

-- ============================================================================
-- CREATE STORAGE BUCKETS
-- ============================================================================

-- Bucket for user avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Bucket for AI Lab webapp files
INSERT INTO storage.buckets (id, name, public)
VALUES ('ai-lab-webapps', 'ai-lab-webapps', FALSE)
ON CONFLICT (id) DO NOTHING;

-- Bucket for lesson content (videos, images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('lesson-content', 'lesson-content', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Bucket for user uploads (profile pictures, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-uploads', 'user-uploads', FALSE)
ON CONFLICT (id) DO NOTHING;

-- Bucket for module/badge icons
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', TRUE)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STORAGE POLICIES - AVATARS BUCKET
-- ============================================================================

-- Anyone can view avatars (public bucket)
CREATE POLICY "Anyone can view avatars"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

-- Users can upload their own avatar
CREATE POLICY "Users can upload own avatar"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'avatars'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Users can update their own avatar
CREATE POLICY "Users can update own avatar"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'avatars'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Users can delete their own avatar
CREATE POLICY "Users can delete own avatar"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'avatars'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- ============================================================================
-- STORAGE POLICIES - AI LAB WEBAPPS BUCKET
-- ============================================================================

-- Users can view their own webapps
CREATE POLICY "Users can view own webapps"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'ai-lab-webapps'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Parents can view their children's webapps
CREATE POLICY "Parents can view children webapps"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'ai-lab-webapps'
        AND EXISTS (
            SELECT 1 FROM public.parent_child_links pcl
            WHERE pcl.parent_id = auth.uid()
            AND pcl.child_id::text = (storage.foldername(name))[1]
            AND pcl.is_verified = TRUE
        )
    );

-- Teachers can view their students' webapps
CREATE POLICY "Teachers can view student webapps"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'ai-lab-webapps'
        AND EXISTS (
            SELECT 1 FROM public.teacher_student_links tsl
            WHERE tsl.teacher_id = auth.uid()
            AND tsl.student_id::text = (storage.foldername(name))[1]
            AND tsl.is_active = TRUE
        )
    );

-- Users can upload their own webapps
CREATE POLICY "Users can upload own webapps"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'ai-lab-webapps'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Users can update their own webapps
CREATE POLICY "Users can update own webapps"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'ai-lab-webapps'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Users can delete their own webapps
CREATE POLICY "Users can delete own webapps"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'ai-lab-webapps'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Admins can manage all webapps
CREATE POLICY "Admins can manage all webapps"
    ON storage.objects FOR ALL
    USING (
        bucket_id = 'ai-lab-webapps'
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- ============================================================================
-- STORAGE POLICIES - LESSON CONTENT BUCKET (Public)
-- ============================================================================

-- Anyone can view lesson content
CREATE POLICY "Anyone can view lesson content"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'lesson-content');

-- Only admins can upload lesson content
CREATE POLICY "Admins can upload lesson content"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'lesson-content'
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Only admins can update lesson content
CREATE POLICY "Admins can update lesson content"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'lesson-content'
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Only admins can delete lesson content
CREATE POLICY "Admins can delete lesson content"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'lesson-content'
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- ============================================================================
-- STORAGE POLICIES - USER UPLOADS BUCKET
-- ============================================================================

-- Users can view their own uploads
CREATE POLICY "Users can view own uploads"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'user-uploads'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Users can upload files
CREATE POLICY "Users can upload files"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'user-uploads'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Users can update their uploads
CREATE POLICY "Users can update own uploads"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'user-uploads'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Users can delete their uploads
CREATE POLICY "Users can delete own uploads"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'user-uploads'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- ============================================================================
-- STORAGE POLICIES - ASSETS BUCKET (Public, Admin only)
-- ============================================================================

-- Anyone can view assets
CREATE POLICY "Anyone can view assets"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'assets');

-- Only admins can manage assets
CREATE POLICY "Admins can manage assets"
    ON storage.objects FOR ALL
    USING (
        bucket_id = 'assets'
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- ============================================================================
-- COMMENTS
-- ============================================================================
-- Note: Cannot add comments to storage.objects policies (system table)
-- Policy names are self-documenting
