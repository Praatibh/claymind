# Education for the Age of AI - Design System

## 🎨 Visual Style Guide

### Color Palette

**Primary Colors**
- **Electric Blue** `#2D9CDB` - Trust, technology, intelligence
- **Coral Orange** `#FF6B6B` - Energy, creativity, warmth
- **Mint Green** `#4ECDC4` - Growth, success, calm
- **Soft Violet** `#9B59B6` - Imagination, mystery, AI magic
- **Sunrise Yellow** `#F9D56E` - Optimism, achievement, joy

**Supporting Colors**
- **Background Cream** `#FFF8F0` - Soft, non-fatiguing base
- **Deep Space Navy** `#1A1F3A` - Text, depth, contrast
- **Cloud White** `#FFFFFF` - Clean surfaces, cards
- **Success Spark** `#52C41A` - Positive feedback
- **Warning Glow** `#FFA940` - Gentle alerts

**Gradient Combinations**
- Hero sections: Electric Blue → Soft Violet
- Success states: Sunrise Yellow → Coral Orange
- Progress bars: Mint Green → Electric Blue
- Background ambiance: Soft Violet → Deep Space Navy (10% opacity)

### Typography

**Primary Font: "Fredoka" (Google Fonts)**
- Rounded, friendly, highly readable for children
- Weights: 400 (Regular), 600 (SemiBold), 700 (Bold)

**Secondary Font: "Space Grotesk" (for tech/AI elements)**
- Modern, futuristic feel for system messages
- Weights: 400, 500, 700

**Type Scale**
```
H1 (Page Titles): 48px/56px, Fredoka Bold
H2 (Section Headers): 36px/44px, Fredoka SemiBold
H3 (Card Titles): 24px/32px, Fredoka SemiBold
Body Large: 18px/28px, Fredoka Regular
Body: 16px/24px, Fredoka Regular
Small: 14px/20px, Fredoka Regular
Button Text: 16px, Fredoka SemiBold, 0.5px letter-spacing
Mascot Dialogue: 18px/28px, Fredoka Regular
System/AI Text: 14px/20px, Space Grotesk Medium
```

**Minimum Touch Targets**: 44px × 44px (WCAG AAA)
**Maximum Line Length**: 60 characters for body text

### Icon System

**Style**: Rounded, playful, 2.5px stroke weight
**Library Base**: Remix Icon (customized with rounded caps)

**Core Icon Categories**
- Navigation: Home, Map, Profile, Settings, Help
- Learning: Book, Lightbulb, Puzzle, Brain, Rocket
- Gamification: Star, Trophy, Medal, Shield, Crown
- AI Elements: Robot, Chip, Network, Sparkles, Wand
- Emotions: Heart, Fire, Thumbs-up, Celebrate, Think

**Icon Sizes**
- Small: 16px (inline with text)
- Medium: 24px (buttons, cards)
- Large: 48px (feature highlights)
- Mascot: 64-120px (contextual)

### Component Library

#### Buttons

**Primary Button**
```
Background: Electric Blue gradient
Text: Cloud White, Fredoka SemiBold 16px
Border-radius: 24px (pill shape)
Padding: 14px 32px
Shadow: 0 4px 12px rgba(45, 156, 219, 0.3)
Hover: Scale 1.05, shadow grows
Active: Confetti particle burst
Icon: Optional left or right, 20px
```

**Secondary Button**
```
Background: Cloud White
Border: 2px solid Electric Blue
Text: Electric Blue, Fredoka SemiBold 16px
Border-radius: 24px
Padding: 14px 32px
Hover: Background → Electric Blue 10%
```

**Fun Button (Special Actions)**
```
Background: Coral Orange → Sunrise Yellow gradient
Text: Deep Space Navy, Fredoka Bold 16px
Border-radius: 24px
Padding: 14px 32px
Animation: Gentle pulse (1.5s loop)
Shadow: 0 6px 16px rgba(255, 107, 107, 0.4)
Sparkle particles on hover
```

#### Cards

**Learning Card**
```
Background: Cloud White
Border-radius: 20px
Shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
Padding: 24px
Hover: Lift (translateY -4px), shadow intensifies
Border-top: 4px solid [category color]
Icon badge in top-left corner
```

**Achievement Card**
```
Background: Gradient based on achievement type
Border-radius: 24px
Border: 3px solid Sunrise Yellow
Shadow: 0 8px 24px rgba(249, 213, 110, 0.4)
Padding: 20px
Shine animation on reveal
Star particles floating
```

#### Progress Components

**XP Bar**
```
Height: 16px
Border-radius: 12px
Background: Cloud White
Fill: Mint Green → Electric Blue gradient
Border: 2px solid Electric Blue
Label: Above bar, "245 / 500 XP to Level 5"
Animation: Smooth fill with number count-up
Spark effect at leading edge
```

**Level Badge**
```
Shape: Hexagon or shield
Size: 56px × 56px
Background: Soft Violet gradient
Border: 3px solid Sunrise Yellow
Level number: Fredoka Bold 24px, Cloud White
Glow pulse animation
```

**Streak Counter**
```
Icon: Fire emoji or flame icon
Background: Coral Orange → Sunrise Yellow
Border-radius: 20px
Padding: 8px 16px
Text: "🔥 7 Day Streak!"
Flicker animation on flame
```

### Animation Guidelines

**Micro-interactions** (100-200ms)
- Button hover: scale, shadow
- Icon highlights: bounce, glow
- Input focus: border color fade

**Transitions** (300-400ms)
- Page navigation: slide, fade
- Card appearance: stagger fade-up
- Modal open/close: scale from center

**Celebrations** (800-1200ms)
- Achievement unlock: confetti burst
- Level up: star explosion
- Correct answer: success ripple
- Badge earned: shine + scale pulse

**Ambient** (2-4s loop)
- Mascot idle: gentle bob, blink
- Background elements: float, rotate
- Particle systems: drift, sparkle

**Easing Functions**
- Standard: cubic-bezier(0.4, 0.0, 0.2, 1)
- Bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
- Smooth: cubic-bezier(0.25, 0.1, 0.25, 1)

### Spacing System

**Base Unit**: 8px

```
Space-1: 4px (tight)
Space-2: 8px (compact)
Space-3: 16px (base)
Space-4: 24px (comfortable)
Space-5: 32px (spacious)
Space-6: 48px (sections)
Space-8: 64px (page divisions)
```

### Layout Grid

**Breakpoints**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

**Container Max-width**: 1200px
**Grid**: 12 columns, 24px gutters
**Margins**:
- Mobile: 16px
- Tablet: 32px
- Desktop: 48px

---

## 🤖 AI Mascot: "Clai" (Clay + AI)

### Character Design
**Appearance**: Friendly robot with expressive LED eyes, rounded body, floating design
**Color**: Primary Electric Blue with Mint Green accents
**Personality**: Curious, encouraging, playful teacher

### Expression System
- **Happy**: Wide eyes, upturn mouth, bounce animation
- **Thinking**: Eyes look up-right, finger to chin, question mark bubble
- **Excited**: Sparkle eyes, raised arms, confetti particles
- **Encouraging**: Warm smile, thumbs up, heart particles
- **Confused**: Tilted head, squiggle mouth, sweat drop

### Voice & Tone
**Greeting**: "Hey there, future AI explorer!"
**Encouragement**: "You're doing amazing! Keep going!"
**Teaching**: "Let me show you something cool..."
**Celebration**: "WOW! You're a natural at this!"
**Gentle Redirect**: "Hmm, let's try that again together!"

### Positioning
- **Login Screen**: Peeking from corner, waving
- **Onboarding**: Center-left, guiding through steps
- **Learning**: Bottom-right corner, expandable help
- **Achievement**: Center, celebrating with user

---

## 📱 Responsive Design Principles

### Mobile-First Approach
1. Touch-optimized (44px minimum)
2. Single-column layouts
3. Thumb-zone primary actions
4. Sticky bottom navigation
5. Swipe gestures for progress

### Tablet Optimization
1. Two-column adaptive layouts
2. Landscape mode split-view
3. Stylus support for activities
4. Picture-in-picture mascot
5. Keyboard shortcuts overlay

### Desktop Enhancement
1. Three-column dashboard
2. Hover states and tooltips
3. Keyboard navigation
4. Side navigation panel
5. Multi-task view (parent/teacher mode)

---

## 🎯 Design Principles

### 1. **Immediate Delight**
Every interaction should spark joy - from button presses to page transitions.

### 2. **Progressive Disclosure**
Don't overwhelm - reveal complexity gradually as users advance.

### 3. **Positive Reinforcement**
Celebrate every win, no matter how small. No negative feedback, only growth prompts.

### 4. **Personalization First**
Users should feel the platform is uniquely theirs through avatars, themes, and choices.

### 5. **Visual Learning**
Use illustrations, animations, and color coding to explain concepts before text.

### 6. **Safety & Trust**
Warm colors, rounded edges, friendly language - create a safe learning space.

### 7. **Accessible by Default**
High contrast, scalable text, keyboard nav, screen reader support from day one.

---

*This design system is a living document. Update as we learn from user testing with 7-14 year olds.*
