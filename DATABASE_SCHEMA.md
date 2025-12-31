# Database Schema - Education for the Age of AI

## 🗄️ Overview

Complete database schema using PostgreSQL with proper relationships, indexes, and constraints for:
- User authentication (COPPA compliant)
- Progress tracking
- Gamification (XP, levels, badges, streaks)
- Content delivery
- Parent/teacher dashboards

**Tech Stack:**
- **Database:** PostgreSQL 14+
- **ORM:** Prisma or TypeORM
- **Authentication:** JWT tokens + Refresh tokens
- **Password Hashing:** bcrypt (cost factor 12)
- **Session Storage:** Redis for active sessions

---

## 📊 Core Tables

### 1. Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic Info
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  age INTEGER CHECK (age BETWEEN 7 AND 14),

  -- Account Status
  account_status VARCHAR(20) DEFAULT 'pending_verification'
    CHECK (account_status IN ('pending_verification', 'active', 'suspended', 'deleted')),
  email_verified BOOLEAN DEFAULT FALSE,
  email_verification_token VARCHAR(255),
  email_verification_expires_at TIMESTAMP,

  -- Parent Consent (COPPA Compliance)
  requires_parent_consent BOOLEAN DEFAULT TRUE,
  parent_consent_given BOOLEAN DEFAULT FALSE,
  parent_consent_timestamp TIMESTAMP,
  parent_id UUID REFERENCES parents(id),

  -- Security
  password_reset_token VARCHAR(255),
  password_reset_expires_at TIMESTAMP,
  last_login_at TIMESTAMP,
  last_login_ip VARCHAR(45),
  failed_login_attempts INTEGER DEFAULT 0,
  account_locked_until TIMESTAMP,

  -- Preferences
  display_name VARCHAR(50),
  avatar_id INTEGER REFERENCES avatars(id),
  theme_preference VARCHAR(20) DEFAULT 'default',
  sound_enabled BOOLEAN DEFAULT TRUE,
  notifications_enabled BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_parent_id ON users(parent_id);
CREATE INDEX idx_users_account_status ON users(account_status);
CREATE INDEX idx_users_created_at ON users(created_at);
```

---

### 2. Parents/Guardians Table

```sql
CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact Info
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),

  -- Account Type
  account_type VARCHAR(20) DEFAULT 'parent'
    CHECK (account_type IN ('parent', 'teacher', 'admin')),

  -- Verification
  email_verified BOOLEAN DEFAULT FALSE,
  email_verification_token VARCHAR(255),

  -- Security
  password_reset_token VARCHAR(255),
  password_reset_expires_at TIMESTAMP,
  last_login_at TIMESTAMP,

  -- Preferences
  email_notifications BOOLEAN DEFAULT TRUE,
  weekly_reports BOOLEAN DEFAULT TRUE,
  achievement_alerts BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_parents_email ON parents(email);
CREATE INDEX idx_parents_account_type ON parents(account_type);
```

---

### 3. User Progress Table

```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Core Progress
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  xp_to_next_level INTEGER DEFAULT 100,

  -- Time Tracking
  total_time_minutes INTEGER DEFAULT 0,
  active_time_minutes INTEGER DEFAULT 0, -- Only time actively learning

  -- Missions & Lessons
  missions_completed INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  quizzes_completed INTEGER DEFAULT 0,

  -- Accuracy Metrics
  questions_answered INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  average_accuracy DECIMAL(5,2) DEFAULT 0.00,

  -- Streaks
  current_streak_days INTEGER DEFAULT 0,
  longest_streak_days INTEGER DEFAULT 0,
  last_activity_date DATE,

  -- Badges & Achievements
  badges_earned INTEGER DEFAULT 0,
  achievements_unlocked INTEGER DEFAULT 0,

  -- Currency
  coins INTEGER DEFAULT 0,
  keys INTEGER DEFAULT 0,

  -- Season Pass
  season_xp INTEGER DEFAULT 0,
  season_level INTEGER DEFAULT 1,
  season_rewards_claimed INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_level ON user_progress(current_level);
CREATE INDEX idx_user_progress_streak ON user_progress(current_streak_days);
```

---

### 4. Missions Table

```sql
CREATE TABLE missions (
  id SERIAL PRIMARY KEY,

  -- Basic Info
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,

  -- Categorization
  topic_id INTEGER REFERENCES topics(id),
  difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
  mission_type VARCHAR(50) CHECK (mission_type IN ('story', 'skill', 'challenge', 'explorer', 'group')),

  -- Content
  estimated_time_minutes INTEGER,
  total_lessons INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 0,

  -- Rewards
  xp_reward INTEGER DEFAULT 100,
  coin_reward INTEGER DEFAULT 50,
  badge_id INTEGER REFERENCES badges(id),

  -- Requirements
  required_level INTEGER DEFAULT 1,
  prerequisite_missions INTEGER[], -- Array of mission IDs

  -- Metadata
  is_active BOOLEAN DEFAULT TRUE,
  is_seasonal BOOLEAN DEFAULT FALSE,
  season_id INTEGER REFERENCES seasons(id),
  sort_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_missions_topic ON missions(topic_id);
CREATE INDEX idx_missions_difficulty ON missions(difficulty);
CREATE INDEX idx_missions_active ON missions(is_active);
CREATE INDEX idx_missions_seasonal ON missions(is_seasonal, season_id);
```

---

### 5. User Mission Progress Table

```sql
CREATE TABLE user_mission_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mission_id INTEGER NOT NULL REFERENCES missions(id),

  -- Progress
  status VARCHAR(20) DEFAULT 'not_started'
    CHECK (status IN ('not_started', 'in_progress', 'completed', 'abandoned')),
  lessons_completed INTEGER DEFAULT 0,
  questions_answered INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  current_lesson_index INTEGER DEFAULT 0,
  progress_percentage DECIMAL(5,2) DEFAULT 0.00,

  -- Performance
  time_spent_minutes INTEGER DEFAULT 0,
  accuracy_percentage DECIMAL(5,2) DEFAULT 0.00,
  hints_used INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 1,

  -- Completion
  completed_at TIMESTAMP,
  xp_earned INTEGER DEFAULT 0,
  coins_earned INTEGER DEFAULT 0,

  -- Timestamps
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id, mission_id)
);

CREATE INDEX idx_user_mission_user ON user_mission_progress(user_id);
CREATE INDEX idx_user_mission_status ON user_mission_progress(user_id, status);
CREATE INDEX idx_user_mission_completed ON user_mission_progress(user_id, completed_at);
```

---

### 6. Lessons Table

```sql
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  mission_id INTEGER NOT NULL REFERENCES missions(id) ON DELETE CASCADE,

  -- Basic Info
  title VARCHAR(200) NOT NULL,
  description TEXT,
  content JSONB NOT NULL, -- Flexible content structure

  -- Ordering
  lesson_order INTEGER NOT NULL,

  -- Type
  lesson_type VARCHAR(50) CHECK (lesson_type IN ('video', 'reading', 'interactive', 'quiz', 'challenge')),

  -- Metadata
  estimated_time_minutes INTEGER,
  xp_reward INTEGER DEFAULT 25,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(mission_id, lesson_order)
);

CREATE INDEX idx_lessons_mission ON lessons(mission_id);
CREATE INDEX idx_lessons_type ON lessons(lesson_type);
```

---

### 7. Questions Table

```sql
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,

  -- Question Content
  question_text TEXT NOT NULL,
  question_type VARCHAR(50) CHECK (question_type IN ('multiple_choice', 'true_false', 'matching', 'interactive')),
  question_data JSONB NOT NULL, -- Flexible structure for different question types

  -- Correct Answer
  correct_answer JSONB NOT NULL,
  explanation TEXT, -- Shown after answering

  -- Hints
  hint_text TEXT,
  hint_cost INTEGER DEFAULT 0, -- Cost in coins to unlock hint

  -- Metadata
  difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
  xp_reward INTEGER DEFAULT 10,
  question_order INTEGER,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_questions_lesson ON questions(lesson_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
```

---

### 8. User Question Attempts Table

```sql
CREATE TABLE user_question_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL REFERENCES questions(id),
  lesson_id INTEGER REFERENCES lessons(id),
  mission_id INTEGER REFERENCES missions(id),

  -- Attempt Data
  user_answer JSONB NOT NULL,
  is_correct BOOLEAN NOT NULL,
  attempt_number INTEGER DEFAULT 1,
  time_taken_seconds INTEGER,

  -- Hints & Help
  hints_used INTEGER DEFAULT 0,
  hint_accessed_at TIMESTAMP,

  -- Rewards
  xp_earned INTEGER DEFAULT 0,

  -- Timestamps
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_attempts_user ON user_question_attempts(user_id);
CREATE INDEX idx_attempts_question ON user_question_attempts(question_id);
CREATE INDEX idx_attempts_correct ON user_question_attempts(user_id, is_correct);
CREATE INDEX idx_attempts_date ON user_question_attempts(answered_at);
```

---

### 9. Badges Table

```sql
CREATE TABLE badges (
  id SERIAL PRIMARY KEY,

  -- Basic Info
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon_url VARCHAR(255),

  -- Categorization
  category VARCHAR(50) CHECK (category IN ('learning', 'streaks', 'mastery', 'exploration', 'social', 'events')),
  rarity VARCHAR(20) CHECK (rarity IN ('common', 'rare', 'epic', 'legendary', 'event', 'secret')),

  -- Unlock Criteria
  unlock_criteria JSONB NOT NULL, -- Flexible criteria definition

  -- Rewards
  xp_reward INTEGER DEFAULT 50,
  coin_reward INTEGER DEFAULT 0,
  key_reward INTEGER DEFAULT 0,

  -- Display
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  is_secret BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_badges_category ON badges(category);
CREATE INDEX idx_badges_rarity ON badges(rarity);
CREATE INDEX idx_badges_active ON badges(is_active);
```

---

### 10. User Badges Table

```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id INTEGER NOT NULL REFERENCES badges(id),

  -- Unlock Info
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unlock_source VARCHAR(100), -- e.g., "mission_complete", "streak_milestone"

  -- Display
  is_equipped BOOLEAN DEFAULT FALSE,
  is_favorite BOOLEAN DEFAULT FALSE,

  UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user ON user_badges(user_id);
CREATE INDEX idx_user_badges_unlocked ON user_badges(user_id, unlocked_at);
CREATE INDEX idx_user_badges_equipped ON user_badges(user_id, is_equipped);
```

---

### 11. Daily Challenges Table

```sql
CREATE TABLE daily_challenges (
  id SERIAL PRIMARY KEY,

  -- Challenge Info
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  challenge_type VARCHAR(50) NOT NULL,

  -- Criteria
  target_value INTEGER NOT NULL, -- e.g., "complete 5 missions"
  criteria JSONB NOT NULL,

  -- Rewards
  xp_reward INTEGER DEFAULT 50,
  coin_reward INTEGER DEFAULT 25,

  -- Timing
  valid_date DATE NOT NULL,
  expires_at TIMESTAMP NOT NULL,

  -- Metadata
  is_active BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_daily_challenges_date ON daily_challenges(valid_date);
CREATE INDEX idx_daily_challenges_active ON daily_challenges(is_active);
```

---

### 12. User Challenge Progress Table

```sql
CREATE TABLE user_challenge_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  challenge_id INTEGER NOT NULL REFERENCES daily_challenges(id),

  -- Progress
  current_value INTEGER DEFAULT 0,
  target_value INTEGER NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  is_claimed BOOLEAN DEFAULT FALSE,

  -- Completion
  completed_at TIMESTAMP,
  claimed_at TIMESTAMP,

  -- Timestamps
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id, challenge_id)
);

CREATE INDEX idx_challenge_progress_user ON user_challenge_progress(user_id);
CREATE INDEX idx_challenge_progress_completed ON user_challenge_progress(user_id, is_completed);
```

---

### 13. Seasons Table

```sql
CREATE TABLE seasons (
  id SERIAL PRIMARY KEY,

  -- Season Info
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  theme VARCHAR(50), -- e.g., "winter", "spring", "ai-ethics"

  -- Timing
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,

  -- Rewards
  total_levels INTEGER DEFAULT 30,
  rewards JSONB NOT NULL, -- Array of rewards per level

  -- Status
  is_active BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_seasons_active ON seasons(is_active);
CREATE INDEX idx_seasons_dates ON seasons(start_date, end_date);
```

---

### 14. User Season Progress Table

```sql
CREATE TABLE user_season_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  season_id INTEGER NOT NULL REFERENCES seasons(id),

  -- Progress
  season_xp INTEGER DEFAULT 0,
  season_level INTEGER DEFAULT 1,

  -- Rewards
  rewards_claimed JSONB DEFAULT '[]', -- Array of claimed level numbers

  -- Timestamps
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id, season_id)
);

CREATE INDEX idx_season_progress_user ON user_season_progress(user_id);
CREATE INDEX idx_season_progress_season ON user_season_progress(season_id);
```

---

### 15. Avatars Table

```sql
CREATE TABLE avatars (
  id SERIAL PRIMARY KEY,

  -- Avatar Info
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR(255) NOT NULL,

  -- Categorization
  category VARCHAR(50), -- e.g., "robot", "animal", "fantasy"
  rarity VARCHAR(20) CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  collection_id INTEGER REFERENCES collections(id),

  -- Unlock Criteria
  unlock_type VARCHAR(50) CHECK (unlock_type IN ('default', 'level', 'badge', 'purchase', 'seasonal')),
  unlock_criteria JSONB,

  -- Cost (if purchasable)
  coin_cost INTEGER DEFAULT 0,
  key_cost INTEGER DEFAULT 0,

  -- Metadata
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_avatars_category ON avatars(category);
CREATE INDEX idx_avatars_rarity ON avatars(rarity);
CREATE INDEX idx_avatars_unlock_type ON avatars(unlock_type);
```

---

### 16. User Avatars Table

```sql
CREATE TABLE user_avatars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  avatar_id INTEGER NOT NULL REFERENCES avatars(id),

  -- Acquisition
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unlock_method VARCHAR(100), -- How they got it

  UNIQUE(user_id, avatar_id)
);

CREATE INDEX idx_user_avatars_user ON user_avatars(user_id);
```

---

### 17. Activity Log Table

```sql
CREATE TABLE activity_log (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Activity Details
  activity_type VARCHAR(100) NOT NULL,
  activity_data JSONB,

  -- Context
  ip_address VARCHAR(45),
  user_agent TEXT,
  session_id VARCHAR(255),

  -- Timestamp
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_user ON activity_log(user_id);
CREATE INDEX idx_activity_type ON activity_log(activity_type);
CREATE INDEX idx_activity_created ON activity_log(created_at);

-- Partition by month for performance
CREATE TABLE activity_log_2024_12 PARTITION OF activity_log
  FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');
```

---

### 18. Sessions Table (Redis Alternative)

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Session Data
  refresh_token VARCHAR(500) UNIQUE NOT NULL,
  access_token_jti VARCHAR(100), -- JWT ID for access token

  -- Device Info
  ip_address VARCHAR(45),
  user_agent TEXT,
  device_type VARCHAR(50),

  -- Expiration
  expires_at TIMESTAMP NOT NULL,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(refresh_token);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

-- Auto-delete expired sessions
CREATE OR REPLACE FUNCTION delete_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM sessions WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup (requires pg_cron extension)
SELECT cron.schedule('delete-expired-sessions', '0 * * * *', 'SELECT delete_expired_sessions()');
```

---

### 19. Topics Table

```sql
CREATE TABLE topics (
  id SERIAL PRIMARY KEY,

  -- Topic Info
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon_url VARCHAR(255),

  -- Ordering
  sort_order INTEGER DEFAULT 0,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_topics_active ON topics(is_active);
```

---

### 20. User Topic Progress Table

```sql
CREATE TABLE user_topic_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id INTEGER NOT NULL REFERENCES topics(id),

  -- Progress
  lessons_completed INTEGER DEFAULT 0,
  lessons_total INTEGER DEFAULT 0,
  progress_percentage DECIMAL(5,2) DEFAULT 0.00,

  -- Performance
  average_accuracy DECIMAL(5,2) DEFAULT 0.00,
  time_spent_minutes INTEGER DEFAULT 0,

  -- Timestamps
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id, topic_id)
);

CREATE INDEX idx_topic_progress_user ON user_topic_progress(user_id);
```

---

## 🔐 Security & Privacy

### Data Encryption

```sql
-- Enable pgcrypto for encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Encrypt sensitive fields (example for parent contact info)
CREATE TABLE parent_contact_encrypted (
  id UUID PRIMARY KEY,
  parent_id UUID REFERENCES parents(id),
  phone_encrypted BYTEA, -- Encrypted with AES
  address_encrypted BYTEA,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Functions to encrypt/decrypt
CREATE OR REPLACE FUNCTION encrypt_data(data TEXT, key TEXT)
RETURNS BYTEA AS $$
BEGIN
  RETURN pgp_sym_encrypt(data, key);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrypt_data(encrypted BYTEA, key TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN pgp_sym_decrypt(encrypted, key);
END;
$$ LANGUAGE plpgsql;
```

### Row-Level Security (RLS)

```sql
-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own data
CREATE POLICY user_own_data ON users
  FOR ALL
  USING (id = current_setting('app.current_user_id')::UUID);

-- Policy: Parents can see their children's data
CREATE POLICY parent_child_data ON users
  FOR SELECT
  USING (parent_id = current_setting('app.current_parent_id')::UUID);
```

---

## 📈 Analytics & Reporting Views

### User Progress Summary View

```sql
CREATE OR REPLACE VIEW v_user_progress_summary AS
SELECT
  u.id AS user_id,
  u.first_name,
  u.age,
  u.created_at AS joined_at,
  up.current_level,
  up.total_xp,
  up.missions_completed,
  up.badges_earned,
  up.current_streak_days,
  up.total_time_minutes,
  up.average_accuracy,
  COUNT(DISTINCT ub.badge_id) AS total_badges,
  COUNT(DISTINCT ump.mission_id) FILTER (WHERE ump.status = 'completed') AS completed_missions
FROM users u
LEFT JOIN user_progress up ON u.id = up.user_id
LEFT JOIN user_badges ub ON u.id = ub.user_id
LEFT JOIN user_mission_progress ump ON u.id = ump.user_id
GROUP BY u.id, u.first_name, u.age, u.created_at, up.current_level,
         up.total_xp, up.missions_completed, up.badges_earned,
         up.current_streak_days, up.total_time_minutes, up.average_accuracy;
```

### Parent Dashboard View

```sql
CREATE OR REPLACE VIEW v_parent_dashboard AS
SELECT
  p.id AS parent_id,
  p.email AS parent_email,
  u.id AS child_id,
  u.first_name AS child_name,
  u.age AS child_age,
  up.current_level,
  up.total_xp,
  up.missions_completed,
  up.current_streak_days,
  up.last_activity_date,
  up.total_time_minutes,
  up.badges_earned,
  COUNT(DISTINCT ub.badge_id) AS total_badges_earned,
  ARRAY_AGG(DISTINCT b.name ORDER BY ub.unlocked_at DESC) FILTER (WHERE ub.unlocked_at > NOW() - INTERVAL '7 days') AS recent_badges
FROM parents p
JOIN users u ON p.id = u.parent_id
LEFT JOIN user_progress up ON u.id = up.user_id
LEFT JOIN user_badges ub ON u.id = ub.user_id
LEFT JOIN badges b ON ub.badge_id = b.id
GROUP BY p.id, p.email, u.id, u.first_name, u.age, up.current_level,
         up.total_xp, up.missions_completed, up.current_streak_days,
         up.last_activity_date, up.total_time_minutes, up.badges_earned;
```

---

## 🚀 Database Functions & Triggers

### Auto-Update Timestamp Trigger

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Calculate Level from XP Function

```sql
CREATE OR REPLACE FUNCTION calculate_level_from_xp(xp INTEGER)
RETURNS INTEGER AS $$
DECLARE
  level INTEGER := 1;
  required_xp INTEGER := 100;
  total_xp INTEGER := 0;
BEGIN
  WHILE total_xp + required_xp <= xp LOOP
    total_xp := total_xp + required_xp;
    level := level + 1;
    required_xp := FLOOR(100 * POWER(level, 1.3));
  END LOOP;
  RETURN level;
END;
$$ LANGUAGE plpgsql;
```

### Update Streak Function

```sql
CREATE OR REPLACE FUNCTION update_user_streak(p_user_id UUID)
RETURNS void AS $$
DECLARE
  last_activity DATE;
  today DATE := CURRENT_DATE;
BEGIN
  SELECT last_activity_date INTO last_activity
  FROM user_progress
  WHERE user_id = p_user_id;

  IF last_activity IS NULL THEN
    -- First activity
    UPDATE user_progress
    SET current_streak_days = 1,
        longest_streak_days = 1,
        last_activity_date = today
    WHERE user_id = p_user_id;

  ELSIF last_activity = today THEN
    -- Already logged activity today, no change
    RETURN;

  ELSIF last_activity = today - INTERVAL '1 day' THEN
    -- Consecutive day, increment streak
    UPDATE user_progress
    SET current_streak_days = current_streak_days + 1,
        longest_streak_days = GREATEST(longest_streak_days, current_streak_days + 1),
        last_activity_date = today
    WHERE user_id = p_user_id;

  ELSE
    -- Streak broken, reset
    UPDATE user_progress
    SET current_streak_days = 1,
        last_activity_date = today
    WHERE user_id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql;
```

---

## 📦 Sample Data Seeds

```sql
-- Insert default avatars
INSERT INTO avatars (name, slug, image_url, category, rarity, unlock_type) VALUES
('Clai (Default)', 'clai-default', '/avatars/clai.png', 'robot', 'common', 'default'),
('Fox Explorer', 'fox-explorer', '/avatars/fox.png', 'animal', 'common', 'level'),
('Space Cadet', 'space-cadet', '/avatars/space.png', 'fantasy', 'rare', 'purchase');

-- Insert topics
INSERT INTO topics (name, slug, description, sort_order) VALUES
('How AI Thinks', 'how-ai-thinks', 'Learn how AI makes decisions', 1),
('Staying Safe Online', 'staying-safe', 'Digital safety and privacy', 2),
('AI and Fairness', 'ai-fairness', 'Ethics and bias in AI', 3);

-- Insert sample mission
INSERT INTO missions (slug, title, description, topic_id, difficulty, xp_reward, total_lessons) VALUES
('spot-the-fake', 'Spot the Fake', 'Learn to identify deepfakes', 2, 'medium', 150, 8);
```

---

This comprehensive database schema supports all features while maintaining data integrity, security (COPPA compliance), and performance through proper indexing and relationships.
