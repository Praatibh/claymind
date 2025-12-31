-- ClayMind Seed Data
-- Description: Test data for local development
-- Date: 2025-01-01

-- ============================================================================
-- CLEAR EXISTING DATA (CAUTION: Use only in development!)
-- ============================================================================

TRUNCATE TABLE
    public.moderation_queue,
    public.blocked_users,
    public.user_safety_settings,
    public.activity_logs,
    public.content_flags,
    public.ai_lab_usage_stats,
    public.ai_lab_templates,
    public.ai_lab_creations,
    public.user_badges,
    public.badges,
    public.lesson_progress,
    public.module_progress,
    public.user_progress,
    public.lesson_content,
    public.lessons,
    public.modules,
    public.teacher_student_links,
    public.parent_child_links,
    public.profiles
CASCADE;

-- ============================================================================
-- MODULES
-- ============================================================================

INSERT INTO public.modules (id, title, description, long_description, difficulty, color, icon_name, display_order, is_published, total_lessons, estimated_duration_minutes, tags, learning_objectives) VALUES
('ai-basics', 'AI Basics', 'Learn what AI is and how it works', 'Discover the fundamentals of Artificial Intelligence through fun, interactive lessons designed for kids. Learn about machine learning, neural networks, and how AI is changing the world!', 'beginner', 'purple', 'Brain', 1, TRUE, 8, 120, ARRAY['beginner', 'foundational', 'ai'], ARRAY['Understand what AI is', 'Learn how computers learn', 'Explore real-world AI applications']),

('ml-mini', 'Mini Machine Learning', 'Train your own AI models', 'Get hands-on experience training simple AI models. Learn how machines learn from data and make predictions!', 'intermediate', 'green', 'Brain', 2, TRUE, 8, 180, ARRAY['machine-learning', 'hands-on', 'intermediate'], ARRAY['Train a simple AI model', 'Understand supervised learning', 'Experiment with different algorithms']),

('build-app', 'Build an App with AI', 'Create your first AI-powered application', 'Learn to build a real AI-powered web application! Combine your coding skills with AI to create something amazing.', 'intermediate', 'amber', 'Sparkles', 3, TRUE, 12, 240, ARRAY['coding', 'application', 'intermediate'], ARRAY['Build a complete AI app', 'Learn API integration', 'Deploy your first project']),

('prompt-engineering', 'Prompt Engineering', 'Master the art of talking to AI', 'Learn how to communicate effectively with AI systems. Master prompt engineering to get the best results from AI tools!', 'intermediate', 'pink', 'MessageSquare', 4, TRUE, 10, 180, ARRAY['prompting', 'communication', 'intermediate'], ARRAY['Write effective prompts', 'Understand prompt patterns', 'Optimize AI responses']),

('ethics-safety', 'Ethics & Safety AI', 'Learn to use AI responsibly and safely', 'Explore the ethical implications of AI and learn how to use it safely and responsibly. Understand bias, privacy, and the future of AI.', 'intermediate', 'blue', 'Shield', 5, TRUE, 8, 150, ARRAY['ethics', 'safety', 'responsibility'], ARRAY['Understand AI bias', 'Learn about data privacy', 'Use AI responsibly']);

-- ============================================================================
-- LESSONS (Sample for ai-basics module)
-- ============================================================================

INSERT INTO public.lessons (id, module_id, title, description, lesson_number, display_order, estimated_duration_minutes, difficulty, is_published, is_locked_by_default, learning_objectives) VALUES
('ai-basics-1', 'ai-basics', 'What is AI?', 'Learn the basics of Artificial Intelligence', 1, 1, 15, 'beginner', TRUE, FALSE, ARRAY['Define AI', 'Understand basic concepts']),
('ai-basics-2', 'ai-basics', 'How Computers Learn', 'Discover how machines learn from data', 2, 2, 20, 'beginner', TRUE, FALSE, ARRAY['Understand machine learning', 'Explore training data']),
('ai-basics-3', 'ai-basics', 'Neural Networks', 'Introduction to neural networks', 3, 3, 20, 'beginner', TRUE, FALSE, ARRAY['Understand neural networks', 'Learn about neurons']),
('ai-basics-4', 'ai-basics', 'Training an AI', 'Learn how to train a simple AI model', 4, 4, 25, 'beginner', TRUE, TRUE, ARRAY['Train a model', 'Understand iterations']),
('ai-basics-5', 'ai-basics', 'AI in Daily Life', 'See AI applications around you', 5, 5, 15, 'beginner', TRUE, TRUE, ARRAY['Identify AI in daily life', 'Understand practical applications']),
('ai-basics-6', 'ai-basics', 'Image Recognition', 'How AI recognizes images', 6, 6, 20, 'beginner', TRUE, TRUE, ARRAY['Understand computer vision', 'Explore image classification']),
('ai-basics-7', 'ai-basics', 'Natural Language', 'How AI understands language', 7, 7, 20, 'beginner', TRUE, TRUE, ARRAY['Understand NLP', 'Explore chatbots']),
('ai-basics-8', 'ai-basics', 'Final Project', 'Build your first AI project!', 8, 8, 30, 'beginner', TRUE, TRUE, ARRAY['Complete a project', 'Apply all concepts']);

-- ============================================================================
-- BADGES
-- ============================================================================

INSERT INTO public.badges (id, name, description, icon_emoji, category, rarity, points_value, unlock_criteria, is_active) VALUES
('first-lesson', 'First Steps', 'Completed your first lesson!', '🎯', 'achievement', 1, 10, '{"type": "lesson_complete", "count": 1}'::jsonb, TRUE),
('streak-7', 'Week Warrior', '7 day learning streak!', '🔥', 'achievement', 2, 50, '{"type": "streak_days", "days": 7}'::jsonb, TRUE),
('streak-30', 'Month Master', '30 day learning streak!', '⭐', 'achievement', 3, 200, '{"type": "streak_days", "days": 30}'::jsonb, TRUE),
('module-ai-basics', 'AI Basics Master', 'Completed AI Basics module!', '🏆', 'module_completion', 2, 100, '{"type": "module_complete", "module_id": "ai-basics"}'::jsonb, TRUE),
('module-ml-mini', 'ML Explorer', 'Completed Mini Machine Learning!', '🧠', 'module_completion', 2, 100, '{"type": "module_complete", "module_id": "ml-mini"}'::jsonb, TRUE),
('module-build-app', 'App Builder', 'Built your first AI app!', '🚀', 'module_completion', 3, 150, '{"type": "module_complete", "module_id": "build-app"}'::jsonb, TRUE),
('level-5', 'Rising Star', 'Reached Level 5!', '🌟', 'milestone', 2, 75, '{"type": "level_reached", "level": 5}'::jsonb, TRUE),
('level-10', 'AI Champion', 'Reached Level 10!', '👑', 'milestone', 3, 200, '{"type": "level_reached", "level": 10}'::jsonb, TRUE),
('ai-creator', 'AI Creator', 'Created 10 AI projects!', '🎨', 'skill', 2, 100, '{"type": "ai_creations", "count": 10}'::jsonb, TRUE),
('prompt-master', 'Prompt Master', 'Created 50 AI projects!', '✨', 'skill', 3, 250, '{"type": "ai_creations", "count": 50}'::jsonb, TRUE);

-- ============================================================================
-- AI LAB TEMPLATES
-- ============================================================================

INSERT INTO public.ai_lab_templates (type, title, description, example_prompt, difficulty, tags, category, is_published, is_featured, display_order) VALUES
('webapp', 'Calculator', 'A colorful calculator with big buttons', 'Create a colorful calculator with big buttons and fun sounds when you press them', 'beginner', ARRAY['math', 'interactive'], 'Tools', TRUE, TRUE, 1),
('webapp', 'To-Do List', 'A fun to-do list with checkboxes', 'Make a to-do list app with checkboxes and confetti when you complete a task', 'beginner', ARRAY['productivity', 'interactive'], 'Tools', TRUE, TRUE, 2),
('webapp', 'Color Picker', 'A rainbow color picker', 'Create a color picker that changes the background to whatever color you choose', 'beginner', ARRAY['colors', 'fun'], 'Fun', TRUE, FALSE, 3),
('webapp', 'Drawing App', 'A simple drawing canvas', 'Build a drawing app where you can draw with different colors and brush sizes', 'intermediate', ARRAY['art', 'creative'], 'Creative', TRUE, FALSE, 4),
('chat', 'AI Basics', 'Learn about AI fundamentals', 'What is artificial intelligence and how does it work?', 'beginner', ARRAY['learning', 'ai'], 'Learning', TRUE, TRUE, 5),
('chat', 'ML Concepts', 'Understand machine learning', 'Explain machine learning in simple terms a kid can understand', 'beginner', ARRAY['learning', 'ml'], 'Learning', TRUE, FALSE, 6);

-- ============================================================================
-- CREATE TEST AUTH USERS
-- ============================================================================

-- Note: Creating users in auth.users table first, then profiles
-- Password is 'password123' hashed with bcrypt for all test users
-- In production, users would be created via Supabase Auth API

-- Insert test users into auth.users
INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    role,
    aud,
    confirmation_token,
    email_change_token_new,
    recovery_token
) VALUES
-- Admin user
(
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000000',
    'admin@claymind.com',
    '$2a$10$mZd2VEfPk.2yEL3.uGJPceaYDEHXYKKaF8wDHO7OZgF0qnZgaKBCu', -- 'password123'
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE,
    'authenticated',
    'authenticated',
    '',
    '',
    ''
),
-- Teacher user
(
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000000',
    'teacher@claymind.com',
    '$2a$10$mZd2VEfPk.2yEL3.uGJPceaYDEHXYKKaF8wDHO7OZgF0qnZgaKBCu',
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE,
    'authenticated',
    'authenticated',
    '',
    '',
    ''
),
-- Parent user
(
    '00000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000000',
    'parent@claymind.com',
    '$2a$10$mZd2VEfPk.2yEL3.uGJPceaYDEHXYKKaF8wDHO7OZgF0qnZgaKBCu',
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE,
    'authenticated',
    'authenticated',
    '',
    '',
    ''
),
-- Student: Alex
(
    '00000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000000',
    'alex@example.com',
    '$2a$10$mZd2VEfPk.2yEL3.uGJPceaYDEHXYKKaF8wDHO7OZgF0qnZgaKBCu',
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE,
    'authenticated',
    'authenticated',
    '',
    '',
    ''
),
-- Student: Emma
(
    '00000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000000',
    'emma@example.com',
    '$2a$10$mZd2VEfPk.2yEL3.uGJPceaYDEHXYKKaF8wDHO7OZgF0qnZgaKBCu',
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE,
    'authenticated',
    'authenticated',
    '',
    '',
    ''
),
-- Student: Noah
(
    '00000000-0000-0000-0000-000000000006',
    '00000000-0000-0000-0000-000000000000',
    'noah@example.com',
    '$2a$10$mZd2VEfPk.2yEL3.uGJPceaYDEHXYKKaF8wDHO7OZgF0qnZgaKBCu',
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE,
    'authenticated',
    'authenticated',
    '',
    '',
    ''
);

-- Also insert into auth.identities for email provider
INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
) VALUES
('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '{"sub":"00000000-0000-0000-0000-000000000001","email":"admin@claymind.com"}', 'email', NOW(), NOW(), NOW()),
('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '{"sub":"00000000-0000-0000-0000-000000000002","email":"teacher@claymind.com"}', 'email', NOW(), NOW(), NOW()),
('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', '{"sub":"00000000-0000-0000-0000-000000000003","email":"parent@claymind.com"}', 'email', NOW(), NOW(), NOW()),
('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', '{"sub":"00000000-0000-0000-0000-000000000004","email":"alex@example.com"}', 'email', NOW(), NOW(), NOW()),
('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', '{"sub":"00000000-0000-0000-0000-000000000005","email":"emma@example.com"}', 'email', NOW(), NOW(), NOW()),
('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006', '{"sub":"00000000-0000-0000-0000-000000000006","email":"noah@example.com"}', 'email', NOW(), NOW(), NOW());

-- ============================================================================
-- CREATE TEST PROFILES
-- ============================================================================

-- Now create profiles for each auth user
-- The trigger will auto-create profiles, but we'll insert with full data

-- Admin user
INSERT INTO public.profiles (
    id, email, first_name, last_name, display_name, username,
    role, account_status, email_verified_at
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin@claymind.com',
    'Admin',
    'User',
    'Admin User',
    'admin_1001',
    'admin',
    'active',
    NOW()
)
ON CONFLICT (id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    display_name = EXCLUDED.display_name,
    username = EXCLUDED.username,
    role = EXCLUDED.role;

-- Teacher user
INSERT INTO public.profiles (
    id, email, first_name, last_name, display_name, username,
    role, account_status, email_verified_at
) VALUES (
    '00000000-0000-0000-0000-000000000002',
    'teacher@claymind.com',
    'Sarah',
    'Johnson',
    'Sarah Johnson',
    'sarah_1002',
    'teacher',
    'active',
    NOW()
)
ON CONFLICT (id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    display_name = EXCLUDED.display_name,
    username = EXCLUDED.username,
    role = EXCLUDED.role;

-- Parent user
INSERT INTO public.profiles (
    id, email, first_name, last_name, display_name, username,
    role, account_status, email_verified_at
) VALUES (
    '00000000-0000-0000-0000-000000000003',
    'parent@claymind.com',
    'John',
    'Smith',
    'John Smith',
    'john_1003',
    'parent',
    'active',
    NOW()
)
ON CONFLICT (id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    display_name = EXCLUDED.display_name,
    username = EXCLUDED.username,
    role = EXCLUDED.role;

-- Student user: Alex
INSERT INTO public.profiles (
    id, email, first_name, last_name, display_name, username,
    role, age, account_status, email_verified_at
) VALUES (
    '00000000-0000-0000-0000-000000000004',
    'alex@example.com',
    'Alex',
    'Explorer',
    'Alex Explorer',
    'alex_1004',
    'student',
    12,
    'active',
    NOW()
)
ON CONFLICT (id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    display_name = EXCLUDED.display_name,
    username = EXCLUDED.username,
    role = EXCLUDED.role,
    age = EXCLUDED.age;

INSERT INTO public.user_progress (user_id) VALUES ('00000000-0000-0000-0000-000000000004')
ON CONFLICT (user_id) DO NOTHING;

-- Student user: Emma
INSERT INTO public.profiles (
    id, email, first_name, last_name, display_name, username,
    role, age, account_status, email_verified_at
) VALUES (
    '00000000-0000-0000-0000-000000000005',
    'emma@example.com',
    'Emma',
    'Coder',
    'Emma Coder',
    'emma_1005',
    'student',
    10,
    'active',
    NOW()
)
ON CONFLICT (id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    display_name = EXCLUDED.display_name,
    username = EXCLUDED.username,
    role = EXCLUDED.role,
    age = EXCLUDED.age;

INSERT INTO public.user_progress (user_id) VALUES ('00000000-0000-0000-0000-000000000005')
ON CONFLICT (user_id) DO NOTHING;

-- Student user: Noah
INSERT INTO public.profiles (
    id, email, first_name, last_name, display_name, username,
    role, age, account_status, email_verified_at
) VALUES (
    '00000000-0000-0000-0000-000000000006',
    'noah@example.com',
    'Noah',
    'Builder',
    'Noah Builder',
    'noah_1006',
    'student',
    14,
    'active',
    NOW()
)
ON CONFLICT (id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    display_name = EXCLUDED.display_name,
    username = EXCLUDED.username,
    role = EXCLUDED.role,
    age = EXCLUDED.age;

INSERT INTO public.user_progress (user_id) VALUES ('00000000-0000-0000-0000-000000000006')
ON CONFLICT (user_id) DO NOTHING;

-- ============================================================================
-- CREATE RELATIONSHIPS
-- ============================================================================

-- Parent-child link
INSERT INTO public.parent_child_links (parent_id, child_id, is_verified, verified_at, can_view_progress, can_manage_account) VALUES
('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', TRUE, NOW(), TRUE, TRUE),
('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000005', TRUE, NOW(), TRUE, TRUE);

-- Teacher-student links
INSERT INTO public.teacher_student_links (teacher_id, student_id, class_name, class_code, is_active) VALUES
('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', 'AI Explorers', 'AI2025A', TRUE),
('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000005', 'AI Explorers', 'AI2025A', TRUE),
('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000006', 'Advanced AI', 'AI2025B', TRUE);

-- ============================================================================
-- SEED PROGRESS DATA
-- ============================================================================

-- Alex's progress (active learner)
UPDATE public.user_progress SET
    current_level = 3,
    current_xp = 150,
    total_xp_earned = 550,
    current_streak_days = 5,
    longest_streak_days = 12,
    last_activity_date = CURRENT_DATE,
    total_lessons_completed = 10,
    total_modules_completed = 1,
    total_time_spent_minutes = 240,
    total_ai_creations = 5
WHERE user_id = '00000000-0000-0000-0000-000000000004';

-- Emma's progress (beginner)
UPDATE public.user_progress SET
    current_level = 2,
    current_xp = 50,
    total_xp_earned = 250,
    current_streak_days = 3,
    longest_streak_days = 5,
    last_activity_date = CURRENT_DATE,
    total_lessons_completed = 5,
    total_modules_completed = 0,
    total_time_spent_minutes = 120,
    total_ai_creations = 2
WHERE user_id = '00000000-0000-0000-0000-000000000005';

-- Noah's progress (advanced)
UPDATE public.user_progress SET
    current_level = 5,
    current_xp = 300,
    total_xp_earned = 1200,
    current_streak_days = 15,
    longest_streak_days = 25,
    last_activity_date = CURRENT_DATE,
    total_lessons_completed = 20,
    total_modules_completed = 2,
    total_time_spent_minutes = 600,
    total_ai_creations = 15
WHERE user_id = '00000000-0000-0000-0000-000000000006';

-- Module progress for Alex (completed ai-basics)
INSERT INTO public.module_progress (user_id, module_id, lessons_completed, total_lessons, progress_percentage, is_started, is_completed, started_at, completed_at) VALUES
('00000000-0000-0000-0000-000000000004', 'ai-basics', 8, 8, 100, TRUE, TRUE, NOW() - INTERVAL '2 weeks', NOW() - INTERVAL '1 week'),
('00000000-0000-0000-0000-000000000004', 'ml-mini', 2, 8, 25, TRUE, FALSE, NOW() - INTERVAL '3 days', NULL);

-- Lesson progress for Alex
INSERT INTO public.lesson_progress (user_id, lesson_id, is_completed, time_spent_minutes, attempts_count, started_at, completed_at) VALUES
('00000000-0000-0000-0000-000000000004', 'ai-basics-1', TRUE, 18, 1, NOW() - INTERVAL '2 weeks', NOW() - INTERVAL '2 weeks'),
('00000000-0000-0000-0000-000000000004', 'ai-basics-2', TRUE, 22, 1, NOW() - INTERVAL '13 days', NOW() - INTERVAL '13 days'),
('00000000-0000-0000-0000-000000000004', 'ai-basics-3', TRUE, 25, 2, NOW() - INTERVAL '12 days', NOW() - INTERVAL '11 days'),
('00000000-0000-0000-0000-000000000004', 'ai-basics-4', TRUE, 30, 1, NOW() - INTERVAL '10 days', NOW() - INTERVAL '9 days');

-- Award badges to Alex
INSERT INTO public.user_badges (user_id, badge_id, earned_at, is_pinned, pin_order) VALUES
('00000000-0000-0000-0000-000000000004', 'first-lesson', NOW() - INTERVAL '2 weeks', TRUE, 1),
('00000000-0000-0000-0000-000000000004', 'streak-7', NOW() - INTERVAL '1 week', TRUE, 2),
('00000000-0000-0000-0000-000000000004', 'module-ai-basics', NOW() - INTERVAL '1 week', TRUE, 3);

-- Award badges to Noah
INSERT INTO public.user_badges (user_id, badge_id, earned_at, is_pinned) VALUES
('00000000-0000-0000-0000-000000000006', 'first-lesson', NOW() - INTERVAL '1 month', TRUE),
('00000000-0000-0000-0000-000000000006', 'streak-7', NOW() - INTERVAL '3 weeks', TRUE),
('00000000-0000-0000-0000-000000000006', 'streak-30', NOW() - INTERVAL '1 week', TRUE),
('00000000-0000-0000-0000-000000000006', 'module-ai-basics', NOW() - INTERVAL '3 weeks', FALSE),
('00000000-0000-0000-0000-000000000006', 'module-ml-mini', NOW() - INTERVAL '1 week', FALSE),
('00000000-0000-0000-0000-000000000006', 'level-5', NOW() - INTERVAL '3 days', TRUE),
('00000000-0000-0000-0000-000000000006', 'ai-creator', NOW() - INTERVAL '2 days', TRUE);

-- ============================================================================
-- AI LAB CREATIONS
-- ============================================================================

INSERT INTO public.ai_lab_creations (user_id, type, title, prompt, output, status, generation_time_ms, model_used, is_favorite) VALUES
('00000000-0000-0000-0000-000000000004', 'webapp', 'My Calculator', 'Create a colorful calculator', '<!DOCTYPE html><html><body><h1>Calculator</h1></body></html>', 'completed', 2500, 'gemini-pro', TRUE),
('00000000-0000-0000-0000-000000000004', 'chat', 'Learning about AI', 'What is AI?', 'AI stands for Artificial Intelligence! It''s when computers learn to do things that normally need human intelligence...', 'completed', 1800, 'gemini-pro', FALSE),
('00000000-0000-0000-0000-000000000006', 'webapp', 'Todo App', 'Make a todo list with confetti', '<!DOCTYPE html><html><body><h1>My Todo List</h1></body></html>', 'completed', 3200, 'gemini-pro', TRUE);

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Verify data was inserted
DO $$
DECLARE
    module_count INTEGER;
    user_count INTEGER;
    badge_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO module_count FROM public.modules WHERE is_published = TRUE;
    SELECT COUNT(*) INTO user_count FROM public.profiles;
    SELECT COUNT(*) INTO badge_count FROM public.badges WHERE is_active = TRUE;

    RAISE NOTICE 'Seed data inserted successfully!';
    RAISE NOTICE 'Published modules: %', module_count;
    RAISE NOTICE 'Test users: %', user_count;
    RAISE NOTICE 'Active badges: %', badge_count;
END $$;
