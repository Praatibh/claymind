# Supabase Setup Guide for ClayMind

Complete step-by-step guide to set up Supabase for local development and production.

---

## 📦 Prerequisites

- Node.js 18+ installed
- Docker Desktop (for local Supabase)
- Git
- Supabase account (for production)

---

## 🚀 Part 1: Local Development Setup

### Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

Verify installation:
```bash
supabase --version
```

### Step 2: Initialize Supabase in Project

```bash
cd claymind
supabase init
```

This creates a `supabase/` folder with:
- `config.toml` - Supabase configuration
- `migrations/` - Database migrations (already created!)
- `seed.sql` - Test data (already created!)

### Step 3: Start Local Supabase

```bash
supabase start
```

**This will start:**
- PostgreSQL database
- Auth server
- Storage server
- Realtime server
- Studio (Web UI)

**Output** will show:
```
API URL: http://localhost:54321
GraphQL URL: http://localhost:54321/graphql/v1
DB URL: postgresql://postgres:postgres@localhost:54322/postgres
Studio URL: http://localhost:54323
Anon key: eyJh...
Service role key: eyJh...
```

**⚠️ Save these keys!** You'll need them for `.env`

### Step 4: Apply Database Migrations

```bash
# Apply all migrations in order
supabase db reset
```

This will:
1. Drop existing database
2. Run all migrations in `supabase/migrations/`
3. Run seed data from `supabase/seed.sql`

**Verify migrations:**
```bash
supabase migration list
```

### Step 5: Access Studio Dashboard

Open browser to: **http://localhost:54323**

You should see:
- ✅ 19 tables created
- ✅ Seed data loaded (6 test users)
- ✅ RLS policies active

**Test Users:**
| Email | Role | Password |
|-------|------|----------|
| `alex@example.com` | Student | (set in Auth panel) |
| `emma@example.com` | Student | (set in Auth panel) |
| `noah@example.com` | Student | (set in Auth panel) |
| `parent@claymind.com` | Parent | (set in Auth panel) |
| `teacher@claymind.com` | Teacher | (set in Auth panel) |
| `admin@claymind.com` | Admin | (set in Auth panel) |

### Step 6: Configure Environment Variables

Create `.env.local` in your project root:

```env
# Supabase
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=eyJh... # From `supabase start` output

# AI Lab - Gemini API
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Step 7: Test Database Connection

Create `test-db.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Test query
const { data, error } = await supabase
  .from('modules')
  .select('*')
  .eq('is_published', true)

console.log('Modules:', data)
console.log('Error:', error)
```

Run:
```bash
npx tsx test-db.ts
```

Should output 5 published modules.

---

## ☁️ Part 2: Production Setup (Supabase Cloud)

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click **New Project**
3. Choose organization
4. Set project name: `claymind-prod`
5. Set strong database password
6. Choose region (closest to users)
7. Click **Create Project**

Wait ~2 minutes for provisioning.

### Step 2: Get Production Credentials

In Supabase Dashboard → **Settings** → **API**:

- `Project URL`: `https://xxx.supabase.co`
- `anon` key: `eyJh...`
- `service_role` key: `eyJh...` (keep secret!)

### Step 3: Link Local Project to Production

```bash
supabase link --project-ref xxx
```

(Replace `xxx` with your project ref from URL)

Enter your database password when prompted.

### Step 4: Push Migrations to Production

```bash
supabase db push
```

This applies all migrations from `supabase/migrations/` to production.

**Verify:**
```bash
supabase db remote list
```

### Step 5: (Optional) Seed Production Data

**⚠️ Only do this once!**

```bash
psql "postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres" \
  -f supabase/seed.sql
```

Or use Studio Dashboard → **SQL Editor** and paste `seed.sql` contents.

### Step 6: Configure Storage Buckets

In Supabase Dashboard → **Storage**:

Run this SQL in **SQL Editor**:

```sql
-- This is already in migrations/00007_storage_buckets.sql
-- Just verify buckets exist:
SELECT * FROM storage.buckets;
```

You should see:
- `avatars` (public)
- `ai-lab-webapps` (private)
- `lesson-content` (public)
- `user-uploads` (private)
- `assets` (public)

### Step 7: Set Production Environment Variables

Update `.env.production`:

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJh... # Production anon key
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**⚠️ NEVER commit `.env.production` to git!**

### Step 8: Configure Auth Settings

In Supabase Dashboard → **Authentication** → **Providers**:

**Email Provider:**
- ✅ Enable Email provider
- ✅ Confirm email: ON
- Email templates: Customize for kids

**Email Templates** (customize in **Email Templates**):
- **Confirm signup**: Make kid-friendly
- **Magic Link**: Simple language
- **Change Email**: Clear instructions

**URL Configuration** (in **Authentication** → **URL Configuration**):
- Site URL: `https://your-domain.com`
- Redirect URLs: Add production domain

### Step 9: Set Up Database Backups

In Supabase Dashboard → **Database** → **Backups**:

- ✅ Enable daily backups
- Retention: 7 days (free tier)

### Step 10: Monitor Usage

In Supabase Dashboard → **Database** → **Usage**:

Track:
- Database size
- API requests
- Storage usage
- Realtime connections

---

## 🔧 Part 3: Advanced Configuration

### Enable Realtime (Optional)

For live progress updates:

```sql
-- Enable realtime for specific tables
ALTER PUBLICATION supabase_realtime ADD TABLE user_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE ai_lab_creations;
```

In client:
```typescript
supabase
  .channel('user-progress')
  .on('postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'user_progress' },
    (payload) => console.log('Progress updated!', payload)
  )
  .subscribe()
```

### Set Up Database Functions (Stored Procedures)

Already created in migrations! Key functions:

```sql
-- Check if user is admin
SELECT is_admin();

-- Check if user is parent of child
SELECT is_parent_of('child-user-id');

-- Calculate XP needed for level
SELECT calculate_xp_for_level(5); -- Returns 1500
```

### Configure Rate Limiting

Create Edge Function for rate limiting:

```typescript
// supabase/functions/check-rate-limit/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(...)
  const userId = req.headers.get('user-id')

  // Check today's usage
  const { data } = await supabase
    .from('ai_lab_usage_stats')
    .select('total_requests_count')
    .eq('user_id', userId)
    .eq('date', new Date().toISOString().split('T')[0])
    .single()

  const limit = 50 // From user_safety_settings
  const allowed = !data || data.total_requests_count < limit

  return new Response(JSON.stringify({ allowed }))
})
```

Deploy:
```bash
supabase functions deploy check-rate-limit
```

---

## 🧪 Part 4: Testing

### Test RLS Policies

```sql
-- Test as student
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "00000000-0000-0000-0000-000000000004"}';

-- Should return 1 row (own profile)
SELECT * FROM profiles;

-- Should return own progress only
SELECT * FROM user_progress;

-- Reset
RESET role;
RESET request.jwt.claims;
```

### Test Triggers

```sql
-- Test auto-level up
UPDATE user_progress
SET current_xp = 150  -- Level 1->2 needs 100 XP
WHERE user_id = '00000000-0000-0000-0000-000000000004';

-- Check if leveled up
SELECT current_level, current_xp FROM user_progress
WHERE user_id = '00000000-0000-0000-0000-000000000004';
-- Should be: level=2, xp=50 (150-100)
```

### Test Search

```sql
-- Full-text search in AI Lab
SELECT title, prompt FROM ai_lab_creations
WHERE search_vector @@ to_tsquery('english', 'calculator')
ORDER BY created_at DESC;
```

---

## 📊 Part 5: Monitoring & Maintenance

### View Active Connections

```sql
SELECT
  count(*),
  state
FROM pg_stat_activity
GROUP BY state;
```

### Check Table Sizes

```sql
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Vacuum & Analyze (Maintenance)

```sql
-- Run weekly
VACUUM ANALYZE;
```

### Monitor Slow Queries

In Supabase Dashboard → **Database** → **Query Performance**

---

## 🚨 Troubleshooting

### Migration Failed?

```bash
# Check current migration status
supabase migration list

# Rollback and retry
supabase db reset

# Or manually fix and re-run
psql "postgresql://..." -f supabase/migrations/00001_initial_schema.sql
```

### RLS Blocking Queries?

```sql
-- Disable RLS temporarily (development only!)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Re-enable
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

### Storage Not Working?

Check policies:
```sql
SELECT * FROM storage.policies;
```

Test upload:
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/avatar.jpg`, file)
```

### Can't Connect to Local DB?

```bash
# Check if containers are running
docker ps

# Restart Supabase
supabase stop
supabase start
```

---

## 📝 Maintenance Tasks

### Daily
- Monitor error logs in Supabase Dashboard
- Check API usage

### Weekly
- Review flagged content in moderation queue
- Check database size

### Monthly
- Review and optimize slow queries
- Update user stats
- Clean up old activity logs

---

## 🔒 Security Checklist

- ✅ RLS enabled on all tables
- ✅ Service role key kept secret
- ✅ HTTPS only in production
- ✅ Email verification required
- ✅ Content filtering active
- ✅ Rate limiting implemented
- ✅ Activity logging enabled
- ✅ Backups configured

---

## 📚 Additional Resources

- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- [RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)
- [Edge Functions](https://supabase.com/docs/guides/functions)

---

## 🆘 Support

**Issues?** Check:
1. Supabase status: https://status.supabase.com
2. Community: https://github.com/supabase/supabase/discussions
3. Discord: https://discord.supabase.com

---

**Setup Complete!** 🎉

Your ClayMind database is now ready for development and production use.
