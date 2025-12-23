# Implementation Guide - Complete Code Examples

## 🚀 Quick Start Setup

### Project Structure

```
education-ai/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── jwt.ts
│   │   │   └── redis.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── progress.controller.ts
│   │   │   └── mission.controller.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── rateLimiter.middleware.ts
│   │   │   └── validation.middleware.ts
│   │   ├── models/
│   │   │   └── (Prisma schema)
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── email.service.ts
│   │   │   └── xp.service.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   └── mission.routes.ts
│   │   ├── utils/
│   │   │   ├── bcrypt.ts
│   │   │   ├── jwt.ts
│   │   │   └── validators.ts
│   │   └── app.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── XPAnimation.tsx
│   │   │   └── LevelUpModal.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useProgress.ts
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── Dashboard.tsx
│   │   └── services/
│   │       └── api.ts
│   └── package.json
└── README.md
```

---

## 🔐 Backend Implementation

### 1. Prisma Schema Setup

**File:** `backend/prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id                       String    @id @default(uuid())
  email                    String    @unique
  passwordHash             String
  firstName                String
  age                      Int
  accountStatus            String    @default("pending_verification")
  emailVerified            Boolean   @default(false)
  emailVerificationToken   String?
  requiresParentConsent    Boolean   @default(true)
  parentConsentGiven       Boolean   @default(false)
  parentId                 String?
  parent                   Parent?   @relation(fields: [parentId], references: [id])

  displayName              String?
  avatarId                 Int?
  avatar                   Avatar?   @relation(fields: [avatarId], references: [id])

  lastLoginAt              DateTime?
  failedLoginAttempts      Int       @default(0)
  accountLockedUntil       DateTime?

  createdAt                DateTime  @default(now())
  updatedAt                DateTime  @updatedAt

  progress                 UserProgress?
  sessions                 Session[]
  missionProgress          UserMissionProgress[]
  badges                   UserBadge[]

  @@index([email])
  @@index([parentId])
  @@index([accountStatus])
}

model Parent {
  id                       String    @id @default(uuid())
  email                    String    @unique
  passwordHash             String?
  firstName                String?
  lastName                 String?
  accountType              String    @default("parent")
  emailVerified            Boolean   @default(false)

  createdAt                DateTime  @default(now())
  updatedAt                DateTime  @updatedAt

  children                 User[]

  @@index([email])
}

model UserProgress {
  id                       String    @id @default(uuid())
  userId                   String    @unique
  user                     User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  totalXp                  Int       @default(0)
  currentLevel             Int       @default(1)
  xpToNextLevel            Int       @default(100)

  totalTimeMinutes         Int       @default(0)
  activeTimeMinutes        Int       @default(0)

  missionsCompleted        Int       @default(0)
  lessonsCompleted         Int       @default(0)
  questionsAnswered        Int       @default(0)
  questionsCorrect         Int       @default(0)
  averageAccuracy          Float     @default(0.0)

  currentStreakDays        Int       @default(0)
  longestStreakDays        Int       @default(0)
  lastActivityDate         DateTime?

  badgesEarned             Int       @default(0)
  coins                    Int       @default(0)
  keys                     Int       @default(0)

  seasonXp                 Int       @default(0)
  seasonLevel              Int       @default(1)

  createdAt                DateTime  @default(now())
  updatedAt                DateTime  @updatedAt

  @@index([userId])
  @@index([currentLevel])
}

model Session {
  id                       String    @id @default(uuid())
  userId                   String
  user                     User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  refreshToken             String    @unique
  ipAddress                String?
  userAgent                String?

  expiresAt                DateTime
  isActive                 Boolean   @default(true)
  lastActivityAt           DateTime  @default(now())

  createdAt                DateTime  @default(now())

  @@index([userId])
  @@index([refreshToken])
  @@index([expiresAt])
}

model Mission {
  id                       Int       @id @default(autoincrement())
  slug                     String    @unique
  title                    String
  description              String
  difficulty               String
  estimatedTimeMinutes     Int
  totalLessons             Int       @default(0)

  xpReward                 Int       @default(100)
  coinReward               Int       @default(50)

  requiredLevel            Int       @default(1)
  isActive                 Boolean   @default(true)

  createdAt                DateTime  @default(now())
  updatedAt                DateTime  @updatedAt

  lessons                  Lesson[]
  userProgress             UserMissionProgress[]

  @@index([slug])
  @@index([isActive])
}

model Lesson {
  id                       Int       @id @default(autoincrement())
  missionId                Int
  mission                  Mission   @relation(fields: [missionId], references: [id], onDelete: Cascade)

  title                    String
  lessonType               String
  content                  Json
  lessonOrder              Int

  estimatedTimeMinutes     Int
  xpReward                 Int       @default(25)

  createdAt                DateTime  @default(now())
  updatedAt                DateTime  @updatedAt

  questions                Question[]

  @@unique([missionId, lessonOrder])
  @@index([missionId])
}

model Question {
  id                       Int       @id @default(autoincrement())
  lessonId                 Int
  lesson                   Lesson    @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  questionText             String
  questionType             String
  questionData             Json
  correctAnswer            Json
  explanation              String?
  hintText                 String?

  difficulty               String
  xpReward                 Int       @default(10)
  questionOrder            Int

  createdAt                DateTime  @default(now())

  @@index([lessonId])
}

model UserMissionProgress {
  id                       String    @id @default(uuid())
  userId                   String
  user                     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  missionId                Int
  mission                  Mission   @relation(fields: [missionId], references: [id])

  status                   String    @default("not_started")
  lessonsCompleted         Int       @default(0)
  questionsAnswered        Int       @default(0)
  questionsCorrect         Int       @default(0)
  currentLessonIndex       Int       @default(0)
  progressPercentage       Float     @default(0.0)

  timeSpentMinutes         Int       @default(0)
  completedAt              DateTime?

  startedAt                DateTime  @default(now())
  lastAccessedAt           DateTime  @default(now())
  updatedAt                DateTime  @updatedAt

  @@unique([userId, missionId])
  @@index([userId])
  @@index([status])
}

model Badge {
  id                       Int       @id @default(autoincrement())
  slug                     String    @unique
  name                     String
  description              String
  category                 String
  rarity                   String
  iconUrl                  String?

  xpReward                 Int       @default(50)
  coinReward               Int       @default(0)
  keyReward                Int       @default(0)

  isActive                 Boolean   @default(true)

  createdAt                DateTime  @default(now())

  users                    UserBadge[]

  @@index([category])
  @@index([rarity])
}

model UserBadge {
  id                       String    @id @default(uuid())
  userId                   String
  user                     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  badgeId                  Int
  badge                    Badge     @relation(fields: [badgeId], references: [id])

  unlockedAt               DateTime  @default(now())
  isEquipped               Boolean   @default(false)

  @@unique([userId, badgeId])
  @@index([userId])
}

model Avatar {
  id                       Int       @id @default(autoincrement())
  name                     String
  slug                     String    @unique
  imageUrl                 String
  category                 String
  rarity                   String
  unlockType               String

  coinCost                 Int       @default(0)
  keyCost                  Int       @default(0)

  isActive                 Boolean   @default(true)

  createdAt                DateTime  @default(now())

  users                    User[]

  @@index([category])
  @@index([unlockType])
}
```

---

### 2. Auth Controller

**File:** `backend/src/controllers/auth.controller.ts`

```typescript
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { generateAccessToken, generateRefreshToken, verifyAccessToken } from '../utils/jwt';
import { sendVerificationEmail, sendParentConsentEmail } from '../services/email.service';

const prisma = new PrismaClient();
const SALT_ROUNDS = 12;

export async function signup(req: Request, res: Response) {
  try {
    const { firstName, age, email, password, parentEmail, parentName } = req.body;

    // Validation
    if (!firstName || !age || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if email exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Generate verification token
    const emailVerificationToken = crypto.randomUUID();

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        age,
        accountStatus: 'pending_verification',
        emailVerificationToken,
        requiresParentConsent: age < 13
      }
    });

    // Create user progress record
    await prisma.userProgress.create({
      data: {
        userId: user.id
      }
    });

    // Send verification email
    await sendVerificationEmail(user.email, user.firstName, emailVerificationToken);

    // If under 13, handle parent consent
    if (age < 13 && parentEmail) {
      // Create parent record or link existing
      let parent = await prisma.parent.findUnique({ where: { email: parentEmail } });

      if (!parent) {
        parent = await prisma.parent.create({
          data: {
            email: parentEmail,
            firstName: parentName
          }
        });
      }

      // Link child to parent
      await prisma.user.update({
        where: { id: user.id },
        data: { parentId: parent.id }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Account created. Check your email to verify.',
      userId: user.id,
      requiresParentConsent: age < 13
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { progress: true, avatar: true }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check account lock
    if (user.accountLockedUntil && user.accountLockedUntil > new Date()) {
      const minutesRemaining = Math.ceil((user.accountLockedUntil.getTime() - Date.now()) / 60000);
      return res.status(403).json({
        error: `Account locked. Try again in ${minutesRemaining} minutes.`
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      // Increment failed attempts
      const failedAttempts = user.failedLoginAttempts + 1;

      if (failedAttempts >= 5) {
        // Lock account for 30 minutes
        const lockUntil = new Date(Date.now() + 30 * 60 * 1000);
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: failedAttempts,
            accountLockedUntil: lockUntil
          }
        });
        return res.status(403).json({
          error: 'Account locked due to too many failed attempts. Try again in 30 minutes.'
        });
      } else {
        await prisma.user.update({
          where: { id: user.id },
          data: { failedLoginAttempts: failedAttempts }
        });
        return res.status(401).json({
          error: `Incorrect password. ${5 - failedAttempts} attempts remaining.`
        });
      }
    }

    // Check account status
    if (!user.emailVerified) {
      return res.status(403).json({ error: 'Email not verified. Check your inbox.' });
    }

    if (user.requiresParentConsent && !user.parentConsentGiven) {
      return res.status(403).json({ error: 'Waiting for parent consent' });
    }

    if (user.accountStatus !== 'active') {
      return res.status(403).json({ error: 'Account is not active' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    // Store refresh token in database
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        expiresAt
      }
    });

    // Update user login info
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        accountLockedUntil: null,
        lastLoginAt: new Date()
      }
    });

    // Update streak
    await updateUserStreak(user.id);

    // Set refresh token in cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
        age: user.age,
        level: user.progress?.currentLevel || 1,
        avatarUrl: user.avatar?.imageUrl || '/avatars/default.png',
        accountStatus: user.accountStatus
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}

export async function refreshAccessToken(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body || req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token required' });
    }

    // Find session
    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true }
    });

    if (!session || !session.isActive || session.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }

    // Generate new access token
    const accessToken = generateAccessToken(session.user);

    // Optionally rotate refresh token
    const newRefreshToken = generateRefreshToken();
    const newExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.session.update({
      where: { id: session.id },
      data: {
        refreshToken: newRefreshToken,
        expiresAt: newExpiresAt,
        lastActivityAt: new Date()
      }
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      accessToken,
      refreshToken: newRefreshToken
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await prisma.session.updateMany({
        where: { refreshToken },
        data: { isActive: false }
      });
    }

    res.clearCookie('refreshToken');

    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
}

async function updateUserStreak(userId: string) {
  const progress = await prisma.userProgress.findUnique({
    where: { userId }
  });

  if (!progress) return;

  const today = new Date().toISOString().split('T')[0];
  const lastActivity = progress.lastActivityDate?.toISOString().split('T')[0];

  if (!lastActivity) {
    // First activity
    await prisma.userProgress.update({
      where: { userId },
      data: {
        currentStreakDays: 1,
        longestStreakDays: 1,
        lastActivityDate: new Date()
      }
    });
  } else if (lastActivity === today) {
    // Already logged today
    return;
  } else {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (lastActivity === yesterday) {
      // Consecutive day
      const newStreak = progress.currentStreakDays + 1;
      await prisma.userProgress.update({
        where: { userId },
        data: {
          currentStreakDays: newStreak,
          longestStreakDays: Math.max(progress.longestStreakDays, newStreak),
          lastActivityDate: new Date()
        }
      });
    } else {
      // Streak broken
      await prisma.userProgress.update({
        where: { userId },
        data: {
          currentStreakDays: 1,
          lastActivityDate: new Date()
        }
      });
    }
  }
}
```

---

### 3. Progress/XP Service

**File:** `backend/src/services/xp.service.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function awardXP(
  userId: string,
  amount: number,
  source: string,
  sourceId?: string
) {
  const progress = await prisma.userProgress.findUnique({
    where: { userId }
  });

  if (!progress) {
    throw new Error('User progress not found');
  }

  const newTotalXp = progress.totalXp + amount;
  const previousLevel = progress.currentLevel;

  // Calculate new level
  const newLevel = calculateLevelFromXP(newTotalXp);
  const xpToNext = calculateXPForLevel(newLevel + 1) - newTotalXp;

  // Update progress
  await prisma.userProgress.update({
    where: { userId },
    data: {
      totalXp: newTotalXp,
      currentLevel: newLevel,
      xpToNextLevel: xpToNext
    }
  });

  const leveledUp = newLevel > previousLevel;
  let newUnlocks = [];

  if (leveledUp) {
    // Get unlocks for new level
    newUnlocks = await checkLevelUnlocks(newLevel);
  }

  return {
    xpEarned: amount,
    totalXp: newTotalXp,
    previousLevel,
    currentLevel: newLevel,
    leveledUp,
    newUnlocks
  };
}

function calculateLevelFromXP(xp: number): number {
  let level = 1;
  let requiredXp = 100;
  let totalXp = 0;

  while (totalXp + requiredXp <= xp) {
    totalXp += requiredXp;
    level++;
    requiredXp = Math.floor(100 * Math.pow(level, 1.3));
  }

  return level;
}

function calculateXPForLevel(level: number): number {
  let totalXp = 0;
  for (let i = 1; i < level; i++) {
    totalXp += Math.floor(100 * Math.pow(i, 1.3));
  }
  return totalXp;
}

async function checkLevelUnlocks(level: number) {
  const unlocks = [];

  // Check for avatar unlocks
  const avatars = await prisma.avatar.findMany({
    where: {
      unlockType: 'level',
      // Add level requirement check from unlockCriteria JSON
    }
  });

  return unlocks;
}
```

---

### 4. Auth Middleware

**File:** `backend/src/middleware/auth.middleware.ts`

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your-secret-key';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
    level: number;
  };
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);

    // Verify token
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as any;

    // Check if user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, accountStatus: true, email: true }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (user.accountStatus !== 'active') {
      return res.status(403).json({ error: 'Account not active' });
    }

    // Attach user to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      level: decoded.level
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: 'Token expired',
        code: 'TOKEN_EXPIRED'
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(500).json({ error: 'Authentication error' });
  }
}
```

---

## 🎨 Frontend Implementation

### React Auth Context

**File:** `frontend/src/contexts/AuthContext.tsx`

```typescript
import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  firstName: string;
  email: string;
  level: number;
  avatarUrl: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: any) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const response = await api.get('/user/profile');
        setUser(response.data.user);
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);
    setUser(user);
  }

  async function logout() {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    setUser(null);
  }

  async function signup(data: any) {
    await api.post('/auth/signup', data);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

---

### Progress Bar Component

**File:** `frontend/src/components/ProgressBar.tsx`

```typescript
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ProgressBar.css';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  animate?: boolean;
}

export function ProgressBar({ current, total, label, animate = true }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  const percentage = Math.min((current / total) * 100, 100);

  useEffect(() => {
    if (animate && fillRef.current) {
      gsap.fromTo(
        fillRef.current,
        { width: '0%' },
        {
          width: `${percentage}%`,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    }
  }, [percentage, animate]);

  return (
    <div className="progress-bar-container">
      {label && (
        <div className="progress-label">
          {label} {current}/{total}
        </div>
      )}
      <div ref={barRef} className="progress-bar">
        <div ref={fillRef} className="progress-fill" style={{ width: animate ? '0%' : `${percentage}%` }} />
      </div>
    </div>
  );
}
```

**File:** `frontend/src/components/ProgressBar.css`

```css
.progress-bar-container {
  width: 100%;
  margin: 16px 0;
}

.progress-label {
  font-size: 14px;
  font-weight: 600;
  color: #1A1F3A;
  margin-bottom: 8px;
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 24px;
  background: rgba(26, 31, 58, 0.1);
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #2D9CDB;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4ECDC4 0%, #2D9CDB 50%, #9B59B6 100%);
  border-radius: 10px;
  position: relative;
}

.progress-fill::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
  animation: shine 2s ease-in-out infinite;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 200%; }
}
```

---

This implementation guide provides production-ready code examples for authentication, progress tracking, and gamified UI components that can be directly integrated into the Education for the Age of AI platform.
