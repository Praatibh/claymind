# Ultra-Realistic 3D Component Library

## 🎨 Overview

This library provides a complete suite of ultra-realistic 3D UI components designed specifically for the "Education for the Age of AI" platform. Each component features true 3D depth, multi-layer lighting, physics-based interactions, and satisfying animations that make the interface feel tangible and engaging for young learners.

---

## 📦 Component Suite

### 1. **Button3D** - Ultra-Realistic 3D Buttons
### 2. **Card3D** - 3D Mission & Content Cards
### 3. **ProgressBar3D** - Subway Surfers-Style Progress Bars
### 4. **Badge3D** - Achievement Badges with Rarity System

---

## 🔘 Button3D Component

### Features

- **Real 3D Depth Shadow**: 8px solid shadow that compresses to 2px on press
- **Multi-Layer Lighting**: Glossy highlights, inner shadows, depth gradients, border lighting
- **3D Tilt Effect**: Mouse-responsive rotation using Framer Motion
- **Physics-Based Press**: Hover lifts -3px, press compresses +6px
- **Shine Animation**: Sweeping glossy reflection
- **6 Color Variants**: Primary, Secondary, Accent, Success, Danger, Fun
- **4 Sizes**: sm, md, lg, xl (all meet 44×44px accessibility)

### Props

```typescript
interface Button3DProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "success" | "danger" | "fun";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  glow?: boolean;      // Enable hover glow effect
  shine?: boolean;     // Enable shine animation
}
```

### Usage Examples

```tsx
// Basic button
<Button3D variant="primary">
  Start Mission
</Button3D>

// With icon
<Button3D variant="success" icon={<Star size={20} />}>
  Complete Lesson
</Button3D>

// Large CTA
<Button3D variant="fun" size="xl" icon={<Trophy size={28} />}>
  Claim Reward!
</Button3D>

// Without effects
<Button3D variant="primary" glow={false} shine={false}>
  Simple Button
</Button3D>
```

### Variant Colors

- **Primary (Electric Blue)**: Main CTAs, affirmative actions
- **Secondary (Coral Red)**: Alternative actions, warm invitations
- **Accent (Purple)**: Special features, premium content
- **Success (Mint Green)**: Completion actions, positive confirmations
- **Danger (Red)**: Destructive actions, warnings
- **Fun (Sunshine Yellow)**: Rewards, playful interactions

---

## 🎴 Card3D Component

### Features

- **Real 3D Depth**: 8px solid shadow with 25px soft ambient glow
- **Multi-Layer Lighting**: Glossy top, inner shadow, bottom depth
- **3 Hover Effects**: Tilt (3D rotation), Lift (elevation), Glow (scale + glow)
- **Badge System**: Top-right badge with icon and color variants
- **Locked State**: Semi-transparent with lock icon overlay
- **Shine Animation**: Optional sweeping shine effect
- **6 Variants**: Primary, Secondary, Success, Warning, Purple, Gradient

### Props

```typescript
interface Card3DProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "purple" | "gradient";
  hover?: "lift" | "tilt" | "glow" | "none";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  badge?: {
    icon?: LucideIcon;
    text: string;
    color?: "blue" | "green" | "yellow" | "red" | "purple";
  };
  locked?: boolean;
  shine?: boolean;
}
```

### Usage Examples

```tsx
// Mission card with tilt effect
<Card3D
  variant="primary"
  hover="tilt"
  badge={{ icon: Star, text: "New", color: "blue" }}
>
  <h3>Understanding AI Basics</h3>
  <p>Learn how machines learn from data</p>
</Card3D>

// Locked mission card
<Card3D variant="secondary" locked={true}>
  <h3>Advanced Algorithms</h3>
  <p>Complete previous missions to unlock</p>
</Card3D>

// Interactive card with lift effect
<Card3D
  variant="success"
  hover="lift"
  onClick={() => startMission()}
>
  <h3>Daily Challenge</h3>
  <p>Complete today's challenge for bonus XP!</p>
</Card3D>

// Gradient card with glow
<Card3D variant="gradient" hover="glow" size="lg">
  <h2>Special Event!</h2>
  <p>Limited time mission available</p>
</Card3D>
```

### Hover Effects

- **tilt**: 3D rotation following mouse position (12° range)
- **lift**: Elevates -8px with enhanced shadow
- **glow**: Scales 1.02x with gradient overlay
- **none**: No hover effect (for static cards)

---

## 📊 ProgressBar3D Component

### Features

- **Subway Surfers-Inspired**: Animated runner character (Clai)
- **Real 3D Depth**: 6px solid shadow with soft ambient glow
- **Multi-Layer Lighting**: Glossy highlight, inner shadow, bottom depth
- **Particle Effects**: Emits particles when progress increases
- **Animated Runner**: Optional character that bounces on the bar
- **4 Variants**: XP (blue), Mission (teal), Streak (red), Season (yellow)
- **3 Sizes**: sm, md, lg
- **Smooth Animations**: Spring physics for natural movement

### Props

```typescript
interface ProgressBar3DProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "xp" | "mission" | "streak" | "season";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  showParticles?: boolean;
  showRunner?: boolean;
  className?: string;
}
```

### Usage Examples

```tsx
// XP progress with runner
<ProgressBar3D
  current={650}
  max={1000}
  label="XP Progress"
  variant="xp"
  size="lg"
  showRunner={true}
  showParticles={true}
/>

// Mission progress
<ProgressBar3D
  current={3}
  max={5}
  label="Mission Progress"
  variant="mission"
  size="md"
/>

// Daily streak
<ProgressBar3D
  current={7}
  max={30}
  label="Daily Streak"
  variant="streak"
  size="md"
  showParticles={true}
/>

// Season pass
<ProgressBar3D
  current={42}
  max={100}
  label="Season Pass Tier 2"
  variant="season"
  size="md"
/>

// Compact progress (no label)
<ProgressBar3D
  current={85}
  max={100}
  variant="xp"
  size="sm"
  showPercentage={false}
/>
```

### Variant Colors

- **xp (Electric Blue)**: For experience points and leveling
- **mission (Mint Teal)**: For mission/lesson progress
- **streak (Coral Red)**: For daily streaks and challenges
- **season (Sunshine Yellow)**: For season pass and events

---

## 🏅 Badge3D Component

### Features

- **5 Rarity Levels**: Common, Rare, Epic, Legendary, Mythic
- **Real 3D Depth**: 6px solid shadow with enhanced glow for higher rarities
- **Multi-Layer Lighting**: Glossy top, inner shadow, bottom depth
- **3D Tilt**: Mouse-responsive rotation (15° range)
- **Locked State**: Grayscale with lock icon
- **Progress Ring**: Circular progress indicator for locked badges
- **Pulsing Glow**: Legendary/Mythic badges pulse when earned
- **3 Sizes**: sm, md, lg

### Props

```typescript
interface Badge3DProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  rarity?: "common" | "rare" | "epic" | "legendary" | "mythic";
  size?: "sm" | "md" | "lg";
  earned?: boolean;
  progress?: number;  // 0-100 for locked badges
  className?: string;
  onClick?: () => void;
  showShine?: boolean;
  showPulse?: boolean;
}
```

### Usage Examples

```tsx
// Earned rare badge
<Badge3D
  icon={Star}
  title="First Steps"
  description="Complete your first mission"
  rarity="rare"
  earned={true}
  size="md"
/>

// Locked epic badge with progress
<Badge3D
  icon={Crown}
  title="Knowledge King"
  description="Reach level 10"
  rarity="epic"
  earned={false}
  progress={65}
  size="md"
/>

// Legendary badge with pulse
<Badge3D
  icon={Trophy}
  title="Perfect Score"
  description="Get 100% on 10 missions"
  rarity="legendary"
  earned={true}
  size="lg"
  showPulse={true}
/>

// Mythic badge with all effects
<Badge3D
  icon={Zap}
  title="AI Master"
  description="Complete all AI missions"
  rarity="mythic"
  earned={true}
  size="lg"
  showPulse={true}
  onClick={() => showBadgeDetails()}
/>
```

### BadgeGrid3D Component

Display multiple badges in a grid layout with staggered animations.

```typescript
interface BadgeGrid3DProps {
  badges: Array<{
    id: string;
    icon?: LucideIcon;
    title: string;
    description?: string;
    rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
    earned: boolean;
    progress?: number;
  }>;
  size?: "sm" | "md" | "lg";
  columns?: 3 | 4 | 5 | 6;
  onBadgeClick?: (badgeId: string) => void;
}
```

```tsx
<BadgeGrid3D
  badges={userBadges}
  size="md"
  columns={4}
  onBadgeClick={(id) => openBadgeModal(id)}
/>
```

### Rarity Colors & Meanings

| Rarity | Color | Shadow | Glow | Use Case |
|--------|-------|--------|------|----------|
| **Common** | Gray | `#374151` | Medium | Basic achievements |
| **Rare** | Blue | `#1a5c8a` | Enhanced | Skill-based achievements |
| **Epic** | Purple | `#581c87` | Strong | Difficult achievements |
| **Legendary** | Gold | `#b8872c` | Pulsing | Rare achievements |
| **Mythic** | Rainbow | `#581c87` | Intense Pulse | Ultra-rare achievements |

---

## 🎨 Shared Design Principles

### Multi-Layer Lighting System

All components use a consistent 4-layer lighting approach:

1. **Glossy Top Highlight**
   - 50% height gradient from white/30 to transparent
   - Simulates light reflection on top surface

2. **Inner Shadow** (via `after` pseudo-element)
   - Inset shadow at bottom (darker)
   - Inset highlight at top (lighter)
   - Creates depth and curvature

3. **Bottom Depth**
   - 33% height gradient from black/10-20 to transparent
   - Simulates natural shadow under curved surface

4. **Border Lighting**
   - Top border: lighter (catching light)
   - Bottom border: darker (in shadow)

### Real 3D Depth Shadow

Components use dual-shadow approach:

```css
/* Solid depth shadow + Soft ambient glow */
shadow-[0_8px_0_0_#1a5c8a, 0_10px_25px_rgba(45,156,219,0.4)]
```

- **First shadow**: Solid color, no blur (simulates thickness)
- **Second shadow**: Soft blur with transparency (simulates ambient light)

### 3D Tilt Physics

Mouse-responsive 3D rotation:

```typescript
const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
```

- Mouse position tracked relative to element
- Converted to -0.5 to 0.5 range
- Transformed to rotation angles
- Spring physics for smooth movement

### Animation Easing

- **Hover**: `easeOut` (0.15-0.2s duration)
- **Press**: `easeIn` (0.1s duration)
- **Spring Physics**: `stiffness: 200, damping: 20`
- **Shine Animation**: 3s duration, infinite loop

---

## 🚀 Performance Optimizations

### GPU Acceleration

All components use:
- `transform-gpu` class for GPU rendering
- `will-change` implicit in Framer Motion
- Hardware-accelerated CSS transforms

### Best Practices

✅ **Do:**
- Use for primary UI elements (CTAs, mission cards, badges)
- Enable effects for interactive elements
- Disable shine/glow for static grids (10+ items)

❌ **Don't:**
- Animate more than 15 components simultaneously
- Use `showRunner` on multiple progress bars at once
- Enable `showPulse` on all badges in a grid

---

## ♿ Accessibility

### WCAG 2.1 AAA Compliance

✅ **Touch Targets**: All interactive elements ≥44×44px
✅ **Color Contrast**: All text meets AAA standards
✅ **Keyboard Navigation**: Standard button/focus behavior
✅ **Motion**: Respects `prefers-reduced-motion`
✅ **Screen Readers**: Semantic HTML with proper ARIA

### Size Guidelines

| Size | Button Height | Card Min Height | Badge Diameter | Progress Height |
|------|---------------|-----------------|----------------|-----------------|
| **sm** | 44px | auto | 80px | 16px |
| **md** | 56px | auto | 112px | 24px |
| **lg** | 64px | auto | 144px | 32px |
| **xl** | 76px | N/A | N/A | N/A |

---

## 📐 Layout Examples

### Mission Dashboard

```tsx
<div className="space-y-6">
  {/* Current Mission */}
  <Card3D variant="primary" size="lg" hover="lift" badge={{ text: "Active", color: "blue" }}>
    <h2>Understanding AI Basics</h2>
    <ProgressBar3D current={3} max={5} variant="mission" showParticles />
    <Button3D variant="success">Continue</Button3D>
  </Card3D>

  {/* Available Missions Grid */}
  <div className="grid grid-cols-3 gap-4">
    <Card3D variant="secondary" hover="tilt">
      <h3>Machine Learning 101</h3>
      <Button3D variant="primary" size="sm">Start</Button3D>
    </Card3D>
    {/* More cards... */}
  </div>
</div>
```

### Level Up Screen

```tsx
<Card3D variant="gradient" size="lg" hover="glow">
  <div className="text-center space-y-6">
    <Badge3D
      icon={Trophy}
      title="Level Up!"
      rarity="legendary"
      earned={true}
      size="lg"
      showPulse={true}
    />
    <h1>You're now Level 5!</h1>
    <ProgressBar3D current={100} max={100} variant="xp" size="lg" showRunner />
    <Button3D variant="fun" size="xl">Claim Reward</Button3D>
  </div>
</Card3D>
```

### Badge Collection

```tsx
<Card3D variant="secondary" size="lg">
  <h2>Your Achievements</h2>
  <BadgeGrid3D
    badges={userBadges}
    size="md"
    columns={4}
    onBadgeClick={openBadgeModal}
  />
</Card3D>
```

---

## 🎯 Use Cases by Component

### Button3D

- **Primary**: "Start Mission", "Continue", "Next Lesson"
- **Secondary**: "Save Progress", "Skip", "Back"
- **Success**: "Complete", "Submit Answer", "Finish"
- **Danger**: "Delete", "Exit", "Reset Progress"
- **Fun**: "Claim Reward", "Open Chest", "Celebrate"
- **Accent**: "Unlock", "Upgrade", "Premium"

### Card3D

- **Primary**: Active missions, current lessons
- **Secondary**: Available missions, lesson cards
- **Success**: Completed missions, achievements
- **Warning**: Daily challenges, time-limited events
- **Purple**: Premium content, special features
- **Gradient**: Celebrations, rewards, announcements

### ProgressBar3D

- **XP**: Experience points, leveling progress
- **Mission**: Lesson completion, mission stages
- **Streak**: Daily login streaks, challenge progress
- **Season**: Season pass tiers, event progress

### Badge3D

- **Common**: First-time achievements ("First Lesson")
- **Rare**: Skill-based achievements ("5-Day Streak")
- **Epic**: Difficult achievements ("Perfect Score")
- **Legendary**: Rare achievements ("100 Missions")
- **Mythic**: Ultra-rare achievements ("AI Master")

---

## 📦 Installation & Setup

### 1. Dependencies

```bash
npm install framer-motion lucide-react
```

### 2. Copy Components

```
src/app/components/
├── 3d-button.tsx
├── 3d-card.tsx
├── 3d-progress-bar.tsx
├── 3d-badge.tsx
└── UltraRealistic3DShowcase.tsx  # Demo page
```

### 3. Add Global CSS

Add to your global CSS or Tailwind config:

```css
@keyframes shine {
  0% {
    transform: translateX(-100%) skewX(-15deg);
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
  }
}

.animate-shine {
  animation: shine 3s ease-in-out infinite;
}
```

### 4. Import & Use

```tsx
import { Button3D } from '@/components/3d-button';
import { Card3D } from '@/components/3d-card';
import { ProgressBar3D } from '@/components/3d-progress-bar';
import { Badge3D, BadgeGrid3D } from '@/components/3d-badge';

export default function Page() {
  return (
    <Card3D variant="primary">
      <h1>Welcome!</h1>
      <ProgressBar3D current={50} max={100} variant="xp" />
      <Button3D variant="success">Get Started</Button3D>
    </Card3D>
  );
}
```

---

## 🎓 Technical Deep Dive

### Shadow Anatomy

Each component uses a **two-layer shadow system**:

1. **Solid Depth Shadow** (hard edge)
   - `0_8px_0_0_#shadowColor`
   - Simulates physical thickness
   - No blur for crisp edge

2. **Soft Ambient Shadow** (blur)
   - `0_10px_25px_rgba(R,G,B,0.4)`
   - Simulates light falloff
   - Colored glow effect

### Transform Origin & Perspective

```typescript
style={{
  transformStyle: "preserve-3d",
  perspective: "1000px"
}}
```

- `preserve-3d`: Maintains 3D positioning of children
- `perspective: 1000px`: Viewing distance (larger = less dramatic)

### Spring Physics Parameters

```typescript
transition={{
  rotateX: { type: "spring", stiffness: 200, damping: 20 },
  rotateY: { type: "spring", stiffness: 200, damping: 20 }
}}
```

- **stiffness: 200**: Responsive spring (higher = faster)
- **damping: 20**: Smooth motion (higher = less bounce)

---

## 🎨 Creating Custom Variants

### Custom Button Variant

```typescript
const customVariant = {
  bg: "bg-gradient-to-br from-[#YOUR_LIGHT] via-[#YOUR_MID] to-[#YOUR_DARK]",
  shadow: "shadow-[0_8px_0_0_#YOUR_SHADOW,0_10px_25px_rgba(R,G,B,0.4)]",
  hoverShadow: "hover:shadow-[0_6px_0_0_#YOUR_SHADOW,0_12px_35px_rgba(R,G,B,0.6)]",
  activeShadow: "active:shadow-[0_2px_0_0_#YOUR_SHADOW,0_4px_15px_rgba(R,G,B,0.5)]",
  border: "border-t-4 border-t-[#YOUR_LIGHT]/60 border-b-2 border-b-[#YOUR_SHADOW]/80",
  text: "text-white",
};
```

**Color Selection Tips:**
1. Choose base color
2. Create 3 shades: light (top), mid, dark (bottom)
3. Shadow = 30-40% darker than base
4. Top border = 20% lighter than base
5. Bottom border = same as shadow

---

## 🌟 Component Showcase

View the complete showcase at `/components/showcase` or check [UltraRealistic3DShowcase.tsx](./src/app/components/UltraRealistic3DShowcase.tsx).

The showcase demonstrates:
- All button variants and sizes
- All card variants with different hover effects
- All progress bar variants with animations
- All badge rarities and states
- Real-world usage examples
- Technical feature breakdown

---

These components represent the cutting edge of realistic web UI design, combining modern CSS, physics-based animations, and thoughtful lighting to create truly tactile digital experiences perfect for engaging young learners in the "Education for the Age of AI" platform.
