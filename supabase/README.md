## ClayMind Supabase Database Schema

Complete production-ready PostgreSQL schema for ClayMind, an AI literacy platform for kids.

### 📁 Folder Structure

```
supabase/
├── migrations/
│   ├── 00001_initial_schema.sql       # Users, profiles, relationships
│   ├── 00002_learning_content.sql     # Modules, lessons, content
│   ├── 00003_progress_gamification.sql # Progress, XP, badges
│   ├── 00004_ai_lab.sql               # AI Lab creations & templates
│   ├── 00005_safety_moderation.sql    # Safety, flags, activity logs
│   ├── 00006_row_level_security.sql   # RLS policies
│   └── 00007_storage_buckets.sql      # Supabase Storage config
├── seed.sql                           # Test data for development
└── README.md                          # This file
```

---

## 🗄️ Database Tables Overview

### **Authentication & Users**
| Table | Description |
|-------|-------------|
| `profiles` | Extended user profiles (students, parents, teachers, admins) |
| `parent_child_links` | Parent-child relationships with permissions |
| `teacher_student_links` | Teacher-student classroom relationships |

### **Learning Content**
| Table | Description |
|-------|-------------|
| `modules` | Learning modules (AI Basics, Prompt Engineering, etc.) |
| `lessons` | Individual lessons within modules |
| `lesson_content` | Content blocks (video, text, interactive, quiz) |

### **Progress & Gamification**
| Table | Description |
|-------|-------------|
| `user_progress` | Overall user stats (level, XP, streaks) |
| `module_progress` | Per-module completion tracking |
| `lesson_progress` | Per-lesson performance data |
| `badges` | Available badges and achievements |
| `user_badges` | Badges earned by users |

### **AI Lab**
| Table | Description |
|-------|-------------|
| `ai_lab_creations` | User AI creations (webapps, chat) |
| `ai_lab_templates` | Pre-made templates and examples |
| `ai_lab_usage_stats` | Daily usage tracking for rate limiting |

### **Safety & Moderation**
| Table | Description |
|-------|-------------|
| `content_flags` | User-reported content flags |
| `activity_logs` | User activity tracking |
| `user_safety_settings` | Parental controls & safety settings |
| `blocked_users` | User blocks for safety |
| `moderation_queue` | Content awaiting review |

---v

## 🚀 Quick Start

### **1. Initialize Supabase Locally**

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase in your project
cd claymind
supabase init

# Start local Supabase
supabase start
```

### **2. Apply Migrations**

```bash
# Apply all migrations in order
supabase db reset

# Or apply individually
supabase db push
```

### **3. Seed Test Data**

```bash
# Run seed file
psql \
  postgresql://postgres:postgres@localhost:54322/postgres \
  -f supabase/seed.sql

# Or using Supabase CLI
supabase db reset --with-seed
```

### **4. Access Local Dashboard**

```
Studio URL:  http://localhost:54323
API URL:     http://localhost:54321
DB URL:      postgresql://postgres:postgres@localhost:54322/postgres
```

---

## 🔐 Row Level Security (RLS)

All tables have RLS enabled with child-safe policies:

### **Student Access** (Role: `student`)
- ✅ View own data (profile, progress, creations)
- ✅ Update own progress
- ✅ Create AI Lab content
- ❌ View other users' data
- ❌ Modify system content

### **Parent Access** (Role: `parent`)
- ✅ View children's profiles (read-only)
- ✅ View children's progress (read-only)
- ✅ View children's AI creations (read-only)
- ✅ Manage children's safety settings
- ❌ Edit children's data

### **Teacher Access** (Role: `teacher`)
- ✅ View assigned students' data (read-only)
- ✅ Manage class links
- ✅ View student progress reports
- ❌ Edit student data

### **Admin Access** (Role: `admin`)
- ✅ Full access to all data
- ✅ Manage content (modules, lessons, badges)
- ✅ Review moderation queue
- ✅ Manage user accounts

---

## 📦 Supabase Storage Buckets

| Bucket | Public | Purpose | Access Rules |
|--------|--------|---------|-------------|
| `avatars` | ✅ | User profile pictures | Users can upload/update own |
| `ai-lab-webapps` | ❌ | AI-generated webapps | User + parents + teachers can view |
| `lesson-content` | ✅ | Course videos & images | Public read, admin write |
| `user-uploads` | ❌ | User files | User-owned private files |
| `assets` | ✅ | App icons & media | Public read, admin write |

---

## 🎯 Key Features

### **Auto-Level Up System**
```sql
-- Users automatically level up when XP threshold is reached
-- Formula: 100 * level * (level + 1) / 2
-- Level 1→2: 100 XP
-- Level 2→3: 300 XP
-- Level 3→4: 600 XP
```

### **Streak Tracking**
```sql
-- Automatic daily streak calculation
-- Updates on every activity
-- Resets if gap > 1 day
```

### **Content Moderation**
```sql
-- Auto-flagging for inappropriate content
-- AI-based pre-screening
-- Manual review queue for admins
```

### **Usage Rate Limiting**
```sql
-- Daily stats per user
-- Track API usage for cost control
-- Configurable limits per user
```

---

## 📊 Sample Queries

### Get user's current progress
```sql
SELECT
  p.display_name,
  up.current_level,
  up.current_xp,
  up.total_lessons_completed,
  up.current_streak_days
FROM profiles p
JOIN user_progress up ON p.id = up.user_id
WHERE p.id = 'user-id-here';
```

### Get module completion stats
```sql
SELECT
  m.title,
  mp.progress_percentage,
  mp.lessons_completed,
  mp.total_lessons,
  mp.completed_at
FROM module_progress mp
JOIN modules m ON mp.module_id = m.id
WHERE mp.user_id = 'user-id-here'
ORDER BY mp.started_at;
```

### Get user's earned badges
```sql
SELECT
  b.name,
  b.description,
  b.icon_emoji,
  b.category,
  ub.earned_at
FROM user_badges ub
JOIN badges b ON ub.badge_id = b.id
WHERE ub.user_id = 'user-id-here'
ORDER BY ub.earned_at DESC;
```

### Get recent AI Lab creations
```sql
SELECT
  title,
  type,
  prompt,
  created_at,
  is_favorite
FROM ai_lab_creations
WHERE user_id = 'user-id-here'
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🧪 Test Users (Seed Data)

| Email | Password | Role | Notes |
|-------|----------|------|-------|
| `admin@claymind.com` | - | Admin | Full access |
| `teacher@claymind.com` | - | Teacher | Manages AI Explorers class |
| `parent@claymind.com` | - | Parent | Parent of Alex & Emma |
| `alex@example.com` | - | Student | Active learner, Level 3 |
| `emma@example.com` | - | Student | Beginner, Level 2 |
| `noah@example.com` | - | Student | Advanced, Level 5 |

> **Note**: In Supabase, users are created via Auth. Update passwords after signup.

---

## 🔧 Migration Commands

### Create a new migration
```bash
supabase migration new migration_name
```

### Apply specific migration
```bash
supabase db push --include-migrations 00001_initial_schema
```

### Rollback last migration
```bash
supabase db reset --db-only
```

### Generate TypeScript types
```bash
supabase gen types typescript --local > src/types/database.types.ts
```

---

## 📝 Important Notes

### **Data Integrity**
- All foreign keys have `ON DELETE CASCADE` where appropriate
- Triggers auto-update `updated_at` timestamps
- Check constraints validate data ranges

### **Performance**
- Indexes on all foreign keys
- GIN indexes for JSONB and array columns
- Full-text search on AI Lab creations

### **Security**
- RLS enabled on ALL tables
- Helper functions for role checks
- Storage policies per bucket

### **Scalability**
- Activity logs can be partitioned by month
- Usage stats table designed for aggregation
- JSONB for flexible metadata

---

## 🆘 Troubleshooting

### RLS blocking queries?
```sql
-- Check current user
SELECT auth.uid();

-- Test as specific user
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "user-id-here"}';
```

### Migrations failing?
```bash
# Check migration status
supabase migration list

# Fix and re-run
supabase db reset
```

### Need to rebuild?
```bash
# Complete reset
supabase stop
supabase db reset
supabase start
```

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

---

**Built for ClayMind** 🎨🤖
Production-ready, child-safe AI learning platform
