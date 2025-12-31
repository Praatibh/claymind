# API Endpoints - Education for the Age of AI

## 🌐 Overview

RESTful API endpoints for authentication, user management, progress tracking, and gamification.

**Base URL:** `https://api.education-ai.com/v1`

**Tech Stack:**
- Node.js + Express.js / Next.js API Routes
- PostgreSQL database
- Redis for caching
- JWT for authentication

---

## 📑 Table of Contents

1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Progress & XP](#progress--xp)
4. [Missions & Lessons](#missions--lessons)
5. [Badges & Achievements](#badges--achievements)
6. [Daily Challenges](#daily-challenges)
7. [Season Pass](#season-pass)
8. [Avatars & Customization](#avatars--customization)
9. [Parent Dashboard](#parent-dashboard)
10. [Analytics](#analytics)

---

## 🔐 Authentication

### POST /api/auth/signup

Create a new user account.

**Request:**
```json
{
  "firstName": "Alex",
  "age": 10,
  "email": "alex@example.com",
  "password": "SecurePass123!",
  "parentEmail": "parent@example.com",
  "parentName": "Jane Doe"
}
```

**Response: 201 Created**
```json
{
  "success": true,
  "message": "Account created. Check your email to verify.",
  "userId": "uuid-here",
  "requiresParentConsent": true
}
```

**Errors:**
- `400` - Email already exists
- `400` - Invalid password (too weak)
- `400` - Invalid email format
- `429` - Too many signup attempts

---

### POST /api/auth/login

User login.

**Request:**
```json
{
  "email": "alex@example.com",
  "password": "SecurePass123!"
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "accessToken": "jwt-token-here",
  "refreshToken": "refresh-token-uuid",
  "user": {
    "id": "uuid",
    "firstName": "Alex",
    "email": "alex@example.com",
    "age": 10,
    "level": 5,
    "avatarUrl": "/avatars/clai.png",
    "accountStatus": "active"
  }
}
```

**Set-Cookie:** `refreshToken=xxx; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000`

**Errors:**
- `401` - Invalid credentials
- `403` - Account locked (too many failed attempts)
- `403` - Email not verified
- `403` - Pending parent consent
- `429` - Too many login attempts

---

### POST /api/auth/refresh

Refresh access token using refresh token.

**Request:**
```json
{
  "refreshToken": "uuid-from-cookie-or-body"
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "accessToken": "new-jwt-token",
  "refreshToken": "new-refresh-token-uuid" // Optional: if rotating
}
```

**Errors:**
- `401` - Invalid or expired refresh token
- `403` - Session revoked

---

### POST /api/auth/logout

Logout and invalidate refresh token.

**Headers:** `Authorization: Bearer {accessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### GET /api/auth/verify-email

Verify email address.

**Query Params:** `?token=verification-token-uuid`

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Email verified!",
  "requiresParentConsent": true,
  "redirectUrl": "/waiting-for-parent"
}
```

**Errors:**
- `400` - Invalid or expired token

---

### POST /api/auth/forgot-password

Request password reset.

**Request:**
```json
{
  "email": "alex@example.com"
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

---

### POST /api/auth/reset-password

Reset password with token.

**Request:**
```json
{
  "token": "reset-token-uuid",
  "newPassword": "NewSecurePass123!"
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

### POST /api/auth/parent-consent

Submit parent consent (from parent email link).

**Request:**
```json
{
  "token": "consent-token-uuid",
  "parentName": "Jane Doe",
  "parentEmail": "parent@example.com",
  "consent": true
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Consent recorded. Child account activated.",
  "childUserId": "uuid"
}
```

---

## 👤 User Management

### GET /api/user/profile

Get current user's profile.

**Headers:** `Authorization: Bearer {accessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "firstName": "Alex",
    "age": 10,
    "email": "alex@example.com",
    "displayName": "Alex the Explorer",
    "avatar": {
      "id": 5,
      "name": "Fox Explorer",
      "imageUrl": "/avatars/fox.png"
    },
    "preferences": {
      "theme": "default",
      "soundEnabled": true,
      "notificationsEnabled": true
    },
    "createdAt": "2024-11-15T10:00:00Z",
    "lastLoginAt": "2024-12-20T15:30:00Z"
  }
}
```

---

### PUT /api/user/profile

Update user profile.

**Headers:** `Authorization: Bearer {accessToken}`

**Request:**
```json
{
  "displayName": "Alex the AI Master",
  "avatarId": 8,
  "preferences": {
    "theme": "dark",
    "soundEnabled": false
  }
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Profile updated",
  "user": { /* updated user object */ }
}
```

---

### GET /api/user/progress

Get comprehensive user progress.

**Headers:** `Authorization: Bearer {accessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "progress": {
    "totalXp": 1450,
    "currentLevel": 5,
    "xpToNextLevel": 550,
    "xpRequiredForNextLevel": 2000,
    "progressPercentage": 72.5,
    "
    "totalTimeMinutes": 320,
    "activeTimeMinutes": 280,
    "missionsCompleted": 18,
    "lessonsCompleted": 45,
    "questionsAnswered": 234,
    "questionsCorrect": 198,
    "averageAccuracy": 84.62,
    "currentStreakDays": 7,
    "longestStreakDays": 12,
    "lastActivityDate": "2024-12-20",
    "badgesEarned": 12,
    "coins": 1250,
    "keys": 8,
    "seasonXp": 450,
    "seasonLevel": 3
  }
}
```

---

### GET /api/user/stats

Get detailed statistics.

**Headers:** `Authorization: Bearer {accessToken}`

**Query Params:** `?timeframe=week|month|all`

**Response: 200 OK**
```json
{
  "success": true,
  "timeframe": "week",
  "stats": {
    "xpEarned": 380,
    "timeSpentMinutes": 135,
    "missionsCompleted": 3,
    "lessonsCompleted": 12,
    "accuracy": 87.5,
    "topicProgress": [
      {
        "topicName": "How AI Thinks",
        "progressPercentage": 80,
        "lessonsCompleted": 8,
        "lessonsTotal": 10
      }
    ],
    "streakMaintained": true,
    "badgesEarned": 2
  }
}
```

---

## 📈 Progress & XP

### POST /api/progress/earn-xp

Award XP to user (internal, called after completing lessons/quizzes).

**Headers:** `Authorization: Bearer {accessToken}`

**Request:**
```json
{
  "amount": 50,
  "source": "lesson_complete",
  "sourceId": "lesson-uuid",
  "metadata": {
    "lessonTitle": "How AI Learns",
    "accuracy": 90
  }
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "xpEarned": 50,
  "totalXp": 1500,
  "previousLevel": 5,
  "currentLevel": 6,
  "leveledUp": true,
  "newUnlocks": [
    {
      "type": "avatar",
      "id": 12,
      "name": "Space Explorer"
    },
    {
      "type": "mission_set",
      "id": 4,
      "name": "Advanced AI Concepts"
    }
  ]
}
```

---

### GET /api/progress/leaderboard

Get XP leaderboard.

**Headers:** `Authorization: Bearer {accessToken}`

**Query Params:**
- `?scope=global|age_group|friends`
- `?timeframe=week|month|all`
- `?limit=100`

**Response: 200 OK**
```json
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "userId": "uuid",
      "displayName": "TechWizard",
      "avatarUrl": "/avatars/wizard.png",
      "level": 12,
      "xp": 5430,
      "isCurrentUser": false
    },
    {
      "rank": 2,
      "userId": "current-user-uuid",
      "displayName": "Alex the Explorer",
      "avatarUrl": "/avatars/fox.png",
      "level": 6,
      "xp": 1500,
      "isCurrentUser": true
    }
  ],
  "currentUserRank": 2,
  "totalUsers": 1547
}
```

---

## 🎯 Missions & Lessons

### GET /api/missions

Get all available missions.

**Headers:** `Authorization: Bearer {accessToken}`

**Query Params:**
- `?topicId=1`
- `?difficulty=easy|medium|hard`
- `?status=available|locked|completed`

**Response: 200 OK**
```json
{
  "success": true,
  "missions": [
    {
      "id": 1,
      "slug": "spot-the-fake",
      "title": "Spot the Fake",
      "description": "Learn to identify deepfakes and AI-generated images",
      "topic": {
        "id": 2,
        "name": "Staying Safe Online"
      },
      "difficulty": "medium",
      "estimatedTimeMinutes": 15,
      "totalLessons": 8,
      "rewards": {
        "xp": 150,
        "coins": 50,
        "badge": {
          "id": 5,
          "name": "Fact Checker"
        }
      },
      "requirements": {
        "requiredLevel": 3,
        "prerequisiteMissions": []
      },
      "userProgress": {
        "status": "in_progress",
        "lessonsCompleted": 5,
        "progressPercentage": 62.5,
        "lastAccessedAt": "2024-12-20T14:30:00Z"
      },
      "isLocked": false
    }
  ]
}
```

---

### GET /api/missions/:slug

Get mission details.

**Headers:** `Authorization: Bearer {accessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "mission": {
    "id": 1,
    "slug": "spot-the-fake",
    "title": "Spot the Fake",
    "description": "Full description here...",
    "topic": { "id": 2, "name": "Staying Safe Online" },
    "difficulty": "medium",
    "estimatedTimeMinutes": 15,
    "totalLessons": 8,
    "lessons": [
      {
        "id": 101,
        "title": "What are Deepfakes?",
        "lessonType": "video",
        "estimatedTimeMinutes": 3,
        "xpReward": 25,
        "lessonOrder": 1,
        "isCompleted": true
      },
      {
        "id": 102,
        "title": "How AI Creates Fake Images",
        "lessonType": "reading",
        "estimatedTimeMinutes": 5,
        "xpReward": 30,
        "lessonOrder": 2,
        "isCompleted": true
      }
    ],
    "rewards": {
      "xp": 150,
      "coins": 50,
      "badge": { "id": 5, "name": "Fact Checker" }
    },
    "userProgress": {
      "status": "in_progress",
      "lessonsCompleted": 5,
      "currentLessonIndex": 5,
      "progressPercentage": 62.5
    }
  }
}
```

---

### POST /api/missions/:id/start

Start a mission.

**Headers:** `Authorization: Bearer {accessToken}`

**Response: 201 Created**
```json
{
  "success": true,
  "message": "Mission started!",
  "progress": {
    "id": "progress-uuid",
    "missionId": 1,
    "status": "in_progress",
    "startedAt": "2024-12-20T15:00:00Z"
  },
  "firstLesson": {
    "id": 101,
    "title": "What are Deepfakes?",
    "lessonType": "video"
  }
}
```

---

### GET /api/lessons/:id

Get lesson content.

**Headers:** `Authorization: Bearer {accessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "lesson": {
    "id": 101,
    "title": "What are Deepfakes?",
    "description": "Learn about AI-generated fake images and videos",
    "lessonType": "video",
    "estimatedTimeMinutes": 3,
    "xpReward": 25,
    "content": {
      "videoUrl": "https://cdn.education-ai.com/videos/deepfakes-intro.mp4",
      "transcript": "Full transcript here...",
      "keyPoints": [
        "Deepfakes are AI-generated fake media",
        "They can be very convincing",
        "Learning to spot them is important"
      ]
    },
    "questions": [
      {
        "id": 501,
        "questionText": "What is a deepfake?",
        "questionType": "multiple_choice",
        "options": [
          { "id": "a", "text": "A photo taken underwater" },
          { "id": "b", "text": "An AI-generated fake image or video" },
          { "id": "c", "text": "A really deep swimming pool" }
        ]
      }
    ]
  }
}
```

---

### POST /api/lessons/:id/complete

Mark lesson as complete.

**Headers:** `Authorization: Bearer {accessToken}`

**Request:**
```json
{
  "timeSpentSeconds": 180,
  "questionsAnswered": 3,
  "questionsCorrect": 3
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Lesson completed!",
  "xpEarned": 25,
  "totalXp": 1525,
  "missionProgress": {
    "lessonsCompleted": 6,
    "progressPercentage": 75,
    "isCompleted": false
  }
}
```

---

### POST /api/questions/:id/answer

Submit answer to a question.

**Headers:** `Authorization: Bearer {accessToken}`

**Request:**
```json
{
  "answer": "b",
  "timeSpentSeconds": 12
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "isCorrect": true,
  "correctAnswer": "b",
  "explanation": "That's right! Deepfakes are AI-generated fake images or videos that can look very real.",
  "xpEarned": 10,
  "feedback": {
    "type": "correct",
    "message": "You got it! That's the kind of careful thinking AI experts use."
  }
}
```

**Response: 200 OK (Incorrect)**
```json
{
  "success": true,
  "isCorrect": false,
  "correctAnswer": "b",
  "explanation": "Not quite. Deepfakes are AI-generated fake images or videos.",
  "hint": "Think about what 'AI-generated' means. It's when a computer creates something that didn't really happen.",
  "xpEarned": 5,
  "feedback": {
    "type": "incorrect",
    "message": "Not quite. Let's look again at the definition of deepfakes."
  }
}
```

---

## 🏅 Badges & Achievements

### GET /api/badges

Get all badges.

**Headers:** `Authorization: Bearer {accessToken}`

**Query Params:**
- `?category=learning|streaks|mastery|exploration|social|events`
- `?status=earned|locked|all`

**Response: 200 OK**
```json
{
  "success": true,
  "badges": [
    {
      "id": 5,
      "slug": "fact-checker",
      "name": "Fact Checker",
      "description": "Completed the 'Spot the Fake' mission and learned to think critically about images",
      "category": "learning",
      "rarity": "rare",
      "iconUrl": "/badges/fact-checker.png",
      "rewards": {
        "xp": 50,
        "coins": 25
      },
      "userStatus": {
        "isEarned": true,
        "unlockedAt": "2024-12-20T16:00:00Z",
        "isEquipped": true
      }
    },
    {
      "id": 10,
      "slug": "100-day-streak",
      "name": "Unstoppable",
      "description": "Maintained a 100-day learning streak",
      "category": "streaks",
      "rarity": "epic",
      "iconUrl": "/badges/unstoppable.png",
      "rewards": {
        "xp": 500,
        "keys": 5
      },
      "userStatus": {
        "isEarned": false,
        "progress": {
          "current": 7,
          "target": 100,
          "progressPercentage": 7
        }
      }
    }
  ]
}
```

---

### POST /api/badges/:id/equip

Equip a badge for display.

**Headers:** `Authorization: Bearer {accessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Badge equipped!"
}
```

---

## 🌟 Daily Challenges

### GET /api/challenges/daily

Get today's daily challenges.

**Headers:** `Authorization: Bearer {accessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "challenges": [
    {
      "id": 1,
      "title": "Complete 1 mission today",
      "description": "Finish any mission to earn this reward",
      "challengeType": "mission_completion",
      "targetValue": 1,
      "rewards": {
        "xp": 50,
        "coins": 25
      },
      "expiresAt": "2024-12-20T23:59:59Z",
      "userProgress": {
        "currentValue": 1,
        "targetValue": 1,
        "isCompleted": true,
        "isClaimed": false
      }
    },
    {
      "id": 2,
      "title": "Answer 10 questions correctly",
      "description": "Get 10 correct answers in any lesson",
      "challengeType": "correct_answers",
      "targetValue": 10,
      "rewards": {
        "xp": 25,
        "coins": 10
      },
      "expiresAt": "2024-12-20T23:59:59Z",
      "userProgress": {
        "currentValue": 7,
        "targetValue": 10,
        "isCompleted": false,
        "isClaimed": false
      }
    }
  ],
  "timeUntilReset": "8h 24m"
}
```

---

### POST /api/challenges/:id/claim

Claim reward for completed challenge.

**Headers:** `Authorization: Bearer {accessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Challenge reward claimed!",
  "rewards": {
    "xpEarned": 50,
    "coinsEarned": 25
  },
  "newTotals": {
    "xp": 1575,
    "coins": 1275
  }
}
```

---

## 🎁 Season Pass

### GET /api/season/current

Get current season information.

**Headers:** `Authorization: Bearer {accessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "season": {
    "id": 1,
    "name": "Winter Learning Season",
    "slug": "winter-2024",
    "theme": "winter",
    "startDate": "2024-12-01T00:00:00Z",
    "endDate": "2024-12-31T23:59:59Z",
    "daysRemaining": 11,
    "totalLevels": 30,
    "rewards": [
      {
        "level": 1,
        "type": "xp",
        "amount": 50
      },
      {
        "level": 2,
        "type": "avatar",
        "avatarId": 15,
        "name": "Snowflake Character"
      }
    ],
    "userProgress": {
      "seasonXp": 450,
      "seasonLevel": 3,
      "xpToNextLevel": 50,
      "rewardsClaimed": [1, 2],
      "unclaimedRewards": [3]
    }
  }
}
```

---

### POST /api/season/claim-reward

Claim season pass reward.

**Headers:** `Authorization: Bearer {accessToken}`

**Request:**
```json
{
  "seasonLevel": 3
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Season reward claimed!",
  "reward": {
    "level": 3,
    "type": "coins",
    "amount": 100
  }
}
```

---

## 🎨 Avatars & Customization

### GET /api/avatars

Get all avatars.

**Headers:** `Authorization: Bearer {accessToken}`

**Query Params:**
- `?category=robot|animal|fantasy`
- `?status=owned|locked|all`

**Response: 200 OK**
```json
{
  "success": true,
  "avatars": [
    {
      "id": 1,
      "name": "Clai (Default)",
      "slug": "clai-default",
      "imageUrl": "/avatars/clai.png",
      "category": "robot",
      "rarity": "common",
      "unlockType": "default",
      "cost": null,
      "userStatus": {
        "isOwned": true,
        "unlockedAt": "2024-11-15T10:00:00Z",
        "isEquipped": false
      }
    },
    {
      "id": 8,
      "name": "Space Explorer",
      "slug": "space-explorer",
      "imageUrl": "/avatars/space.png",
      "category": "fantasy",
      "rarity": "rare",
      "unlockType": "level",
      "unlockCriteria": {
        "requiredLevel": 6
      },
      "userStatus": {
        "isOwned": true,
        "unlockedAt": "2024-12-20T16:00:00Z",
        "isEquipped": true
      }
    },
    {
      "id": 12,
      "name": "Dragon Rider",
      "slug": "dragon-rider",
      "imageUrl": "/avatars/dragon.png",
      "category": "fantasy",
      "rarity": "legendary",
      "unlockType": "purchase",
      "cost": {
        "keys": 10
      },
      "userStatus": {
        "isOwned": false,
        "canAfford": false
      }
    }
  ]
}
```

---

### POST /api/avatars/:id/equip

Equip an avatar.

**Headers:** `Authorization: Bearer {accessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Avatar equipped!"
}
```

---

### POST /api/avatars/:id/purchase

Purchase an avatar with coins/keys.

**Headers:** `Authorization: Bearer {accessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Avatar purchased!",
  "avatar": {
    "id": 12,
    "name": "Dragon Rider"
  },
  "cost": {
    "keys": 10
  },
  "newBalance": {
    "keys": 0
  }
}
```

**Errors:**
- `400` - Insufficient currency
- `400` - Already owned

---

## 👨‍👩‍👧 Parent Dashboard

### GET /api/parent/children

Get list of children for parent account.

**Headers:** `Authorization: Bearer {parentAccessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "children": [
    {
      "id": "child-uuid",
      "firstName": "Alex",
      "age": 10,
      "level": 6,
      "totalXp": 1500,
      "currentStreakDays": 7,
      "lastActivityDate": "2024-12-20",
      "accountStatus": "active",
      "createdAt": "2024-11-15T10:00:00Z"
    }
  ]
}
```

---

### GET /api/parent/child/:id/progress

Get detailed progress for a child.

**Headers:** `Authorization: Bearer {parentAccessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "child": {
    "id": "child-uuid",
    "firstName": "Alex",
    "age": 10
  },
  "progress": {
    "currentLevel": 6,
    "totalXp": 1500,
    "missionsCompleted": 18,
    "badgesEarned": 12,
    "currentStreakDays": 7,
    "totalTimeMinutes": 320,
    "averageAccuracy": 84.62
  },
  "topicProgress": [
    {
      "topicName": "How AI Thinks",
      "progressPercentage": 80,
      "lessonsCompleted": 8,
      "lessonsTotal": 10
    }
  ],
  "recentActivity": [
    {
      "type": "mission_complete",
      "title": "Spot the Fake",
      "timestamp": "2024-12-20T16:00:00Z"
    },
    {
      "type": "badge_earned",
      "title": "Fact Checker",
      "timestamp": "2024-12-20T16:00:00Z"
    }
  ]
}
```

---

### GET /api/parent/child/:id/weekly-summary

Get weekly summary for parent email.

**Headers:** `Authorization: Bearer {parentAccessToken}`

**Response: 200 OK**
```json
{
  "success": true,
  "weekStart": "2024-12-15",
  "weekEnd": "2024-12-21",
  "summary": {
    "xpEarned": 380,
    "timeSpentMinutes": 135,
    "missionsCompleted": 3,
    "badgesEarned": 2,
    "streakMaintained": true,
    "topicsExplored": ["How AI Thinks", "AI and Fairness"],
    "newSkills": [
      "Critical thinking (spotting deepfakes)",
      "Pattern recognition",
      "Ethical reasoning"
    ]
  },
  "conversationStarters": [
    "I saw you completed 'Spot the Fake' this week. Can you teach me what warning signs to look for in fake images?",
    "You've been learning about AI fairness. Can you show me an example of when AI might be unfair?"
  ]
}
```

---

## 📊 Analytics

### POST /api/analytics/track

Track user events (internal).

**Headers:** `Authorization: Bearer {accessToken}`

**Request:**
```json
{
  "eventType": "mission_progress",
  "eventData": {
    "missionId": 1,
    "progressPercent": 75,
    "lessonsCompleted": 6
  },
  "metadata": {
    "sessionId": "session-uuid",
    "deviceType": "mobile"
  }
}
```

**Response: 200 OK**
```json
{
  "success": true
}
```

---

## 🔧 Utility Endpoints

### GET /api/health

Health check endpoint.

**Response: 200 OK**
```json
{
  "status": "healthy",
  "timestamp": "2024-12-20T17:00:00Z",
  "services": {
    "database": "connected",
    "redis": "connected"
  }
}
```

---

### GET /api/content/topics

Get all topics.

**Response: 200 OK**
```json
{
  "success": true,
  "topics": [
    {
      "id": 1,
      "name": "How AI Thinks",
      "slug": "how-ai-thinks",
      "description": "Learn how AI makes decisions and processes information",
      "iconUrl": "/icons/brain.svg",
      "missionCount": 12
    }
  ]
}
```

---

## 🚨 Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "error": "Human-readable error message",
  "errorCode": "ERROR_CODE",
  "details": {
    "field": "email",
    "reason": "Email already exists"
  }
}
```

**Common HTTP Status Codes:**
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

---

This API provides complete functionality for authentication, progress tracking, gamification, and parent dashboards with proper security and error handling.
