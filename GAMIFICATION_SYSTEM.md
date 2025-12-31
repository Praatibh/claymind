# Education for the Age of AI - Gamification System

## 🎮 Overview

The gamification system transforms learning into an engaging adventure through progression mechanics, rewards, and social features that motivate continued engagement while maintaining educational focus.

---

## 💎 Experience Points (XP) System

### XP Earning Activities

| Activity | XP Reward | Frequency |
|----------|-----------|-----------|
| Complete lesson | 50-100 XP | Per lesson (varies by difficulty) |
| Perfect quiz (100%) | +25 bonus XP | Per quiz |
| Daily login | 10 XP | Once per day |
| Maintain streak | +5 XP per day | Cumulative (7-day = 35 XP) |
| Complete mission | 200-500 XP | Per mission |
| Help another student | 20 XP | Per helpful action |
| Creative project submission | 100 XP | Per project |
| Challenge completion | 150 XP | Per challenge |
| Code playground creation | 75 XP | Per original project |
| Peer review participation | 30 XP | Per review |

### XP Multipliers

**Streak Bonuses**
- 7-day streak: 1.1x multiplier
- 14-day streak: 1.25x multiplier
- 30-day streak: 1.5x multiplier
- 100-day streak: 2x multiplier (legendary!)

**Special Events**
- Weekend Challenge: 1.5x XP
- Monthly Theme Week: 2x XP
- Birthday Week: 3x XP
- New Content Launch: 1.25x XP

**Performance Bonuses**
- First attempt success: +10% XP
- Speed bonus (under par time): +15% XP
- Perfect score: +25% XP
- Exploration bonus (view all optional content): +20% XP

### XP Display & Feedback

**Visual Elements**
```
┌────────────────────────────────────────┐
│  Level 5  [████████░░] 1,245/2,000 XP │
│  Next: Level 6 "AI Apprentice"         │
│  🎯 755 XP to go!                      │
└────────────────────────────────────────┘
```

**XP Gain Animation**
1. Number count-up with tick sound
2. Progress bar fills smoothly
3. Particle effect (coins, stars) fly to XP bar
4. Subtle screen shake on large gains
5. Level-up celebration if threshold crossed

**Microcopy**
- Small gain: "+50 XP earned! 💎"
- Medium gain: "+150 XP! Great job! ⭐"
- Large gain: "+500 XP! You're on fire! 🔥"
- Level up: "🎉 LEVEL UP! You're now Level [X]!"

---

## 📊 Level System

### Level Progression

**Level Tiers**
- **Levels 1-5**: Beginner (100-300 XP per level)
- **Levels 6-10**: Explorer (400-600 XP per level)
- **Levels 11-20**: Apprentice (700-1,000 XP per level)
- **Levels 21-35**: Expert (1,200-2,000 XP per level)
- **Levels 36-50**: Master (2,500-4,000 XP per level)
- **Levels 51+**: Legend (5,000+ XP per level)

**XP Formula**: `XP_required = base_xp × (level ^ 1.3)`
- Ensures consistent progression curve
- Early levels feel quick and rewarding
- Later levels provide long-term goals

### Level Titles & Badges

| Level Range | Title | Badge Design | Unlocks |
|-------------|-------|--------------|---------|
| 1-5 | AI Curious | Lightbulb | Basic lessons, 3 avatar items |
| 6-10 | AI Explorer | Compass | Intermediate lessons, 5 avatar items, Profile themes |
| 11-20 | AI Apprentice | Book with gears | Advanced lessons, Custom avatars, Mission creator |
| 21-35 | AI Expert | Trophy | Expert challenges, Mentor badge, Leaderboards |
| 36-50 | AI Master | Crown | Master projects, Teaching tools, Special events |
| 51+ | AI Legend | Diamond crown | All content, Exclusive items, Name in Hall of Fame |

### Level-Up Celebration

**Animation Sequence** (3 seconds)
```
1. Screen dims with spotlight effect (0.5s)
2. Level badge zooms in and rotates (1s)
3. Confetti explosion from badge (0.5s)
4. New title displays with shine effect (0.5s)
5. Unlocks showcase with slide-in cards (0.5s)
```

**Level-Up Modal**
```
┌─────────────────────────────────────────┐
│         🎉 LEVEL UP! 🎉                 │
│                                         │
│    ╔═══════════════════════╗            │
│    ║    Level 6 Achieved!  ║            │
│    ║                       ║            │
│    ║    👑 AI EXPLORER 👑   ║            │
│    ╚═══════════════════════╝            │
│                                         │
│  🎁 New Unlocks:                        │
│  ✓ 5 new avatar accessories             │
│  ✓ Blue theme for profile               │
│  ✓ "Creative AI" mission set            │
│  ✓ Group challenges                     │
│                                         │
│  ┌───────────────────────┐              │
│  │  Awesome! Continue →  │              │
│  └───────────────────────┘              │
└─────────────────────────────────────────┘
```

**Microcopy**
- Header: "🎉 LEVEL UP! 🎉"
- Announcement: "Level [X] Achieved!"
- Title: "You're now an [Title]!"
- Unlocks Header: "🎁 New Unlocks:"
- Encouragement: "You're becoming an AI expert!"
- CTA: "Awesome! Continue →"

---

## 🏆 Achievements & Badges System

### Achievement Categories

#### 1. Learning Milestones
| Badge | Name | Unlock Criteria | Rarity |
|-------|------|-----------------|--------|
| 📖 | First Lesson | Complete first lesson | Common |
| 🎓 | Scholar | Complete 10 lessons | Common |
| 🧠 | Knowledge Seeker | Complete 50 lessons | Rare |
| 📚 | Librarian | Complete 100 lessons | Epic |
| 🌟 | Enlightened | Complete all lessons in a topic | Legendary |

#### 2. Streak & Consistency
| Badge | Name | Unlock Criteria | Rarity |
|-------|------|-----------------|--------|
| 🔥 | Getting Started | 3-day streak | Common |
| ⚡ | Consistent Learner | 7-day streak | Common |
| 💫 | Dedicated Student | 30-day streak | Rare |
| 🌠 | Unstoppable | 100-day streak | Epic |
| ☀️ | Eternal Flame | 365-day streak | Legendary |

#### 3. Mastery & Performance
| Badge | Name | Unlock Criteria | Rarity |
|-------|------|-----------------|--------|
| ✨ | Perfect Score | Get 100% on any quiz | Common |
| 🎯 | Sharpshooter | Get 100% on 5 quizzes | Rare |
| 🏅 | Quiz Master | Get 100% on 25 quizzes | Epic |
| ⏱️ | Speed Demon | Complete lesson in half the time | Rare |
| 🧩 | Problem Solver | Complete 10 challenges | Rare |

#### 4. Exploration & Discovery
| Badge | Name | Unlock Criteria | Rarity |
|-------|------|-----------------|--------|
| 🔍 | Curious Mind | Explore all optional content in a lesson | Common |
| 🗺️ | Adventurer | Visit all areas of learning map | Rare |
| 🎨 | Creative Thinker | Complete 5 creative projects | Rare |
| 🚀 | Innovation | Create something unique in playground | Epic |
| 🌈 | Renaissance Learner | Touch all topic categories | Epic |

#### 5. Social & Community
| Badge | Name | Unlock Criteria | Rarity |
|-------|------|-----------------|--------|
| 🤝 | Helpful Friend | Help 5 other students | Common |
| 💬 | Conversationalist | Participate in 10 discussions | Rare |
| 👥 | Team Player | Complete 5 group challenges | Rare |
| 🎖️ | Mentor | Guide 10 newer students | Epic |
| 👑 | Community Leader | Top contributor for a month | Legendary |

#### 6. Special Events
| Badge | Name | Unlock Criteria | Rarity |
|-------|------|-----------------|--------|
| 🎃 | Halloween Hacker | Complete Halloween AI challenge | Event |
| 🎄 | Code & Cookies | Complete Winter coding event | Event |
| 🎂 | Birthday Star | Login on your birthday | Special |
| 🥇 | Champion | Win monthly competition | Event |
| 🌍 | Global Citizen | Participate in worldwide event | Event |

### Badge Rarity System

**Rarity Levels**
- **Common** (Gray): 60% of badges, easy to obtain
- **Rare** (Blue): 25% of badges, requires effort
- **Epic** (Purple): 10% of badges, significant achievement
- **Legendary** (Gold): 4% of badges, exceptional accomplishment
- **Event** (Rainbow): 1% of badges, time-limited special
- **Secret** (???): Hidden badges, discovered by exploration

**Visual Design by Rarity**
```
Common:    Simple icon, gray border, no animation
Rare:      Detailed icon, blue border, gentle glow
Epic:      Animated icon, purple border, particle effect
Legendary: 3D icon, gold border, rotating glow, sparkles
Event:     Themed icon, rainbow border, special effects
Secret:    Unlock reveals unique design per badge
```

### Achievement Unlock Animation

**Unlock Sequence** (2-3 seconds)
```
1. Sound effect: "Achievement unlocked!" chime
2. Badge flies in from top of screen
3. Badge lands center screen with bounce
4. Rarity-specific animation plays:
   - Common: Simple flash
   - Rare: Blue glow pulse
   - Epic: Purple particle burst
   - Legendary: Golden rays + confetti
5. Badge details display below
6. Add to collection with slide effect
```

**Achievement Modal**
```
┌─────────────────────────────────────────┐
│    🏆 ACHIEVEMENT UNLOCKED! 🏆          │
│                                         │
│       ┌─────────────────┐               │
│       │   [Badge Icon]  │               │
│       │   ⚡ CONSISTENT  │               │
│       │   LEARNER ⚡     │               │
│       └─────────────────┘               │
│           [RARE]                        │
│                                         │
│  "Maintained a 7-day learning streak!"  │
│                                         │
│  🎁 Rewards:                            │
│  • +100 Bonus XP                        │
│  • Streak protector item (1x)          │
│  • Blue flame avatar effect             │
│                                         │
│  ┌──────────────┐  ┌──────────────┐    │
│  │  Share 📤    │  │  Continue →  │    │
│  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────┘
```

**Microcopy**
- Header: "🏆 ACHIEVEMENT UNLOCKED! 🏆"
- Badge Name: Displayed prominently with icon
- Rarity Tag: "[COMMON/RARE/EPIC/LEGENDARY]"
- Description: Friendly explanation of achievement
- Rewards Header: "🎁 Rewards:"
- Share CTA: "Share 📤" (to parent/teacher)
- Continue: "Continue →" or "Amazing! →"

### Badge Collection Display

**Profile Badge Showcase**
```
┌─────────────────────────────────────────────────┐
│  🏆 Achievement Collection                      │
│  45 / 120 Badges Earned (38%)                   │
│                                                 │
│  [All] [Learning] [Streaks] [Mastery] [Social] │
│                                                 │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐           │
│  │ 📖 │ │ 🎓 │ │ 🔥 │ │ ✨ │ │ 🔍 │           │
│  │Earned│Earned│Earned│Earned│Earned│           │
│  └────┘ └────┘ └────┘ └────┘ └────┘           │
│                                                 │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐           │
│  │ ??? │ │ ??? │ │ ??? │ │ ??? │ │ ??? │          │
│  │Locked│Locked│Locked│Locked│Locked│           │
│  └────┘ └────┘ └────┘ └────┘ └────┘           │
│                                                 │
│  🌟 Featured: "Unstoppable" (100-day streak)    │
│     └─ Progress: 47/100 days (Keep going!)      │
└─────────────────────────────────────────────────┘
```

**Badge Details View** (Click on badge)
```
┌─────────────────────────────────────────┐
│  [← Back to Collection]                 │
│                                         │
│     ┌─────────────────┐                 │
│     │   🎓 SCHOLAR    │  [COMMON]       │
│     │   [Animated]    │                 │
│     └─────────────────┘                 │
│                                         │
│  "Complete 10 lessons"                  │
│                                         │
│  ✓ Unlocked on: March 15, 2024          │
│  🎁 Rewards: +50 XP, Scholar avatar hat │
│                                         │
│  📊 Progress to Next:                   │
│  Knowledge Seeker (50 lessons)          │
│  [████░░░░░░] 10/50                     │
│                                         │
│  👥 12,847 students have this badge     │
│  🌟 You're in the top 45%!              │
│                                         │
│  ┌─────────────────────┐                │
│  │  Share Achievement  │                │
│  └─────────────────────┘                │
└─────────────────────────────────────────┘
```

---

## 🔥 Streak System

### Streak Mechanics

**Streak Rules**
- Earned by logging in and completing at least 1 activity per day
- Activity = lesson, quiz, challenge, or 10+ minutes of engagement
- Resets to 0 if a day is missed (without streak freeze)
- Timezone-aware (based on user's local time)
- Streak updates at midnight local time

**Streak Milestones**
| Days | Milestone | Reward |
|------|-----------|--------|
| 3 | Getting Started | 🔥 Badge, +25 XP |
| 7 | One Week Strong | ⚡ Badge, +50 XP, 1 Streak Freeze |
| 14 | Two Week Warrior | 💫 Badge, +100 XP, 1 Streak Freeze |
| 30 | Monthly Master | 🌠 Badge, +250 XP, 3 Streak Freezes |
| 50 | Unstoppable Force | ☄️ Badge, +500 XP, Special avatar effect |
| 100 | Century Club | 🏆 Badge, +1000 XP, 5 Streak Freezes, Gold badge |
| 365 | Year Legend | 👑 Badge, +5000 XP, Lifetime recognition |

### Streak Protectors & Freezes

**Streak Freeze**
- Automatically protects streak if you miss a day
- User is notified: "🛡️ Streak freeze activated! Your 24-day streak is safe!"
- Limited quantity: Earned through achievements or special events
- Can hold max 5 at a time
- Shows in inventory with count

**Earning Freezes**
- Every 7-day milestone: +1 freeze
- Monthly milestones: +3 freezes
- Special events: +1-2 freezes
- Achievement rewards: Varies
- Can't purchase (keeps it achievement-based)

**Weekend Warrior Mode** (Optional setting)
- Weekends don't count against streak
- For users with inconsistent weekend access
- Must complete 2x activity on weekdays to qualify
- Badge indicator: "⚡ Weekend Warrior Mode"

### Streak Display & Notifications

**Main Display**
```
┌────────────────────────────────────┐
│  🔥 24 Day Streak!                 │
│  ████████████████████████░░░░░░    │
│  6 days to "Monthly Master"        │
│  🛡️ 2 Streak Freezes available     │
└────────────────────────────────────┘
```

**Daily Reminder Notification**
- Sent 2 hours before day ends if no activity
- Message: "Don't lose your 24-day streak! 🔥 Quick 5-min lesson?"
- Links to shortest available lessons
- Can customize reminder time or disable

**Streak Recovery Offer** (After miss)
```
┌─────────────────────────────────────────┐
│  😢 Oh no! Your streak ended.           │
│                                         │
│  Your 24-day streak was amazing!        │
│  Want to start fresh?                   │
│                                         │
│  🎯 New Goal: Beat your record!         │
│     Try for a 25-day streak!            │
│                                         │
│  ┌─────────────────────┐                │
│  │  Let's Start! 🚀    │                │
│  └─────────────────────┘                │
│                                         │
│  (Next time, use a Streak Freeze! 🛡️)  │
└─────────────────────────────────────────┘
```

**Microcopy**
- Active: "🔥 [X] Day Streak! Keep it going!"
- Milestone approaching: "[X] days to '[Milestone Name]'!"
- Freeze activated: "🛡️ Streak freeze used! You're protected!"
- Record broken: "🎉 NEW RECORD! [X] days is your best yet!"
- Encouragement: "Come back tomorrow to keep the 🔥 alive!"

---

## 🎯 Mission System

### Mission Types

**1. Story Missions** (Linear narrative)
- 5-10 lessons in sequential order
- Unlocks story content progressively
- Characters and plot development
- Final boss challenge
- Example: "AI Detective: Solve the Mystery"

**2. Skill Missions** (Topic mastery)
- Focus on specific skill (e.g., "Master Pattern Recognition")
- 3-5 lessons + practice challenges
- Skill assessment at end
- Earns skill badge on completion

**3. Challenge Missions** (Timed/Limited)
- Available for 1-2 weeks
- Higher XP rewards
- Leaderboard competition
- Special themed badges
- Example: "Build an AI Art Generator in 7 Days"

**4. Explorer Missions** (Non-linear)
- Complete any 5 of 10 available lessons
- Choose your own path
- Multiple completion routes
- Encourages exploration

**5. Group Missions** (Collaborative)
- 2-4 students work together
- Shared progress
- Team-based puzzles
- Collaboration badges

### Mission Structure

**Mission Card**
```
┌─────────────────────────────────────────┐
│  🕵️ AI DETECTIVE: PATTERN MYSTERY       │
│  [Story Mission]              [Level 5+]│
│                                         │
│  Help Clai solve mysterious patterns    │
│  appearing in the city using AI!        │
│                                         │
│  Progress: ████████░░ 8/10 Complete     │
│                                         │
│  Rewards:                               │
│  • 500 XP                               │
│  • "Detective" badge                    │
│  • Detective hat avatar item            │
│                                         │
│  ⏱️ ~45 mins total  |  🎯 Medium         │
│                                         │
│  ┌─────────────────────┐                │
│  │  Continue Mission → │                │
│  └─────────────────────┘                │
└─────────────────────────────────────────┘
```

**Mission Completion Celebration**
```
┌─────────────────────────────────────────┐
│       🎉 MISSION COMPLETE! 🎉           │
│                                         │
│     🕵️ AI Detective: Pattern Mystery    │
│                                         │
│  Clai: "Amazing work, Detective! You    │
│  used AI to crack the case!"            │
│                                         │
│  ⭐ Mission Stats:                       │
│  • Time: 42 mins (3 mins under par!)    │
│  • Score: 95% average                   │
│  • Bonus XP: +50 (speed bonus)          │
│                                         │
│  🎁 Rewards Unlocked:                    │
│  ✓ +500 XP (+50 bonus)                  │
│  ✓ 🕵️ "Detective" badge                 │
│  ✓ 🎩 Detective hat (avatar item)       │
│  ✓ 🗝️ Unlocked: Next mission set        │
│                                         │
│  ┌──────────────┐  ┌──────────────┐    │
│  │  View Story  │  │  Next Mission│    │
│  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────┘
```

---

## 🎁 Rewards & Unlockables

### Avatar Customization Items

**Earned Through Progression**
- Level unlocks: 3-5 items per level tier
- Achievement rewards: Themed items per badge
- Mission completions: Story-specific items
- Seasonal events: Limited-time cosmetics

**Item Categories**
1. **Hats & Headwear**: 50+ options
2. **Glasses & Eye accessories**: 30+ options
3. **Clothing & Outfits**: 40+ options
4. **Accessories**: Scarves, capes, wings, etc.
5. **Special Effects**: Auras, particles, animations
6. **Backgrounds**: Profile background themes
7. **Badges**: Display case items

**Rarity System** (Same as badges)
- Common: Free, level-based
- Rare: Achievement-based
- Epic: Mission completions
- Legendary: Major milestones
- Event: Time-limited specials

### Profile Themes & Customization

**Theme Packs** (Unlock at certain levels)
- Space Explorer (Level 10)
- Ocean Adventure (Level 15)
- Forest Magic (Level 20)
- Cyberpunk City (Level 25)
- Custom theme creator (Level 35)

**Profile Elements**
- Background image/gradient
- Border style and color
- Font style (from approved list)
- Animation effects
- Music toggle (optional background music)
- Bio/About me section

### Learning Tools & Perks

**Unlockable Features**
- **Code Playground** (Level 5): Create and save projects
- **Mission Creator** (Level 20): Design custom challenges
- **Study Buddy Match** (Level 10): Connect with peers
- **Advanced Analytics** (Level 15): Detailed progress insights
- **Mentor Badge** (Level 30): Help guide newer students
- **Early Access** (Level 40): Try new content first
- **Custom Lessons** (Level 45): Personalized learning paths

### Special Titles & Recognition

**Hall of Fame**
- Top 100 global learners (monthly reset)
- Permanent record of achievements
- Special "Hall of Fame" profile badge
- Featured on platform homepage

**Leaderboards**
- Global (all users)
- Age group (7-9, 10-12, 13-14)
- Regional/Country
- Classroom (if school account)
- Friends only

**Leaderboard Display**
```
┌─────────────────────────────────────────┐
│  🏆 LEADERBOARD - This Week             │
│  [Global] [Age] [Region] [Class]        │
│                                         │
│  1. 👑 SuperCoder47      2,450 XP       │
│  2. 🥈 AIWhiz_12         2,380 XP       │
│  3. 🥉 TechNinja         2,310 XP       │
│  ...                                    │
│  47. ⭐ You (Alex)       1,240 XP       │
│                                         │
│  🎯 +110 XP to rank #46!                │
│                                         │
│  Resets in: 2d 14h 23m                  │
└─────────────────────────────────────────┘
```

---

## 📈 Progress Tracking & Analytics

### Student Dashboard Insights

**Weekly Summary**
```
┌─────────────────────────────────────────┐
│  📊 This Week's Progress                │
│                                         │
│  🔥 Streak: 24 days                     │
│  ⏱️ Time Spent: 3h 42m                  │
│  📚 Lessons: 8 completed                │
│  🎯 Missions: 1 completed, 1 in progress│
│  ⭐ Average Score: 94%                   │
│  💎 XP Earned: 780 XP                   │
│                                         │
│  📈 +12% more than last week!           │
│                                         │
│  🎖️ New Badges: 2                       │
│  🏆 Rank: #47 in your age group         │
└─────────────────────────────────────────┘
```

**Topic Mastery View**
```
┌─────────────────────────────────────────┐
│  🧠 Your AI Knowledge Map               │
│                                         │
│  AI Basics          ████████░░ 80%      │
│  Creative AI        ██████░░░░ 60%      │
│  Digital Safety     ██████████ 100% ✓   │
│  AI Ethics          ████░░░░░░ 40%      │
│  How AI Works       ██░░░░░░░░ 20%      │
│                                         │
│  🎯 Recommended: Continue "AI Ethics"   │
│     to unlock the "Responsible AI" badge│
└─────────────────────────────────────────┘
```

### Parent/Teacher Dashboard

**Overview for Adults**
- Time spent learning (daily/weekly)
- Topics explored
- Strengths and areas for growth
- Social interactions (if enabled)
- Achievements earned
- Suggested next steps
- Safety reports (content accessed, interactions)

**Weekly Email Report** (Optional)
- Progress summary
- Highlights and achievements
- Time on platform
- Recommended encouragement
- Upcoming content they're excited about

---

## 🎪 Seasonal Events & Limited Content

### Event Types

**1. Seasonal Celebrations**
- Halloween: "AI Spooky Pattern Hunt"
- Winter: "Code & Cookies Challenge"
- Spring: "AI Earth Day Project"
- Summer: "Build-a-Bot Summer Camp"

**2. Global Events**
- Hour of Code week
- International AI Day
- World Kindness Day (AI for good)
- Pi Day (Math + AI challenges)

**3. Platform Milestones**
- Anniversary celebrations
- User count milestones
- New content launches

**Event Features**
- Limited-time missions
- Exclusive badges
- 2x XP periods
- Special avatar items
- Collaborative global goals
- Themed UI decorations

**Event Announcement**
```
┌─────────────────────────────────────────┐
│       🎃 SPECIAL EVENT LIVE! 🎃         │
│                                         │
│  Halloween AI Mystery Challenge         │
│  October 25-31, 2024                    │
│                                         │
│  Help Clai solve spooky AI patterns     │
│  and earn exclusive rewards!            │
│                                         │
│  🎁 Rewards:                             │
│  • 🎃 "Spooky Detective" badge          │
│  • 👻 Ghost avatar pet                  │
│  • 2x XP all week!                      │
│                                         │
│  ⏰ Ends in: 5d 18h 32m                 │
│                                         │
│  ┌─────────────────────┐                │
│  │  Join Event! 🚀     │                │
│  └─────────────────────┘                │
└─────────────────────────────────────────┘
```

---

## 🤝 Social & Community Features

### Friend System

**Add Friends**
- Unique friend code
- Classroom join codes
- Accept/reject requests
- Max friends: Age-appropriate (7-9: 20, 10-14: 50)

**Friend Features**
- See friends' levels (not real names)
- Compare badges
- Send encouragement stickers
- Collaborative challenges
- Leaderboard view

**Safety First**
- No free-text messaging
- Pre-approved sticker/emoji only
- Parent controls
- Moderation tools
- Report feature

### Team Challenges

**How It Works**
1. 2-4 students form a team
2. Complete shared mission
3. All contribute progress
4. Team rewards distributed

**Team Benefits**
- Collaborative problem solving
- Social learning
- "Teamwork" badge series
- Higher XP rewards
- Unique team-only content

---

*This gamification system is designed to motivate through intrinsic rewards (mastery, curiosity, creativity) while using extrinsic rewards (badges, XP) as supportive scaffolding.*
