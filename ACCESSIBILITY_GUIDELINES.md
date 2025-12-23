# Education for the Age of AI - Accessibility Guidelines

## 🌟 Accessibility Mission Statement

Every child deserves equal access to AI education, regardless of physical, cognitive, or sensory abilities. This platform is designed with accessibility at its core, not as an afterthought.

**Target Compliance**: WCAG 2.1 Level AAA (where feasible), with AA as minimum baseline.

---

## 📋 Comprehensive Accessibility Checklist

### ✅ Visual Accessibility

#### Color & Contrast
- [ ] All text meets WCAG AAA contrast ratio (7:1 for normal text, 4.5:1 for large text)
- [ ] Interactive elements have minimum 3:1 contrast with background
- [ ] Color is never the only means of conveying information
- [ ] Colorblind-friendly palette tested with simulators (Deuteranopia, Protanopia, Tritanopia)
- [ ] High contrast mode available as toggle
- [ ] Dark mode option with appropriate contrast adjustments

**Contrast Examples**
```
✓ PASS: Deep Space Navy (#1A1F3A) on Cloud White (#FFFFFF) = 14.8:1
✓ PASS: Electric Blue (#2D9CDB) on Cloud White (#FFFFFF) = 3.2:1 (large text only)
✓ PASS: Coral Orange (#FF6B6B) on Background Cream (#FFF8F0) = 5.1:1
✗ FAIL: Mint Green (#4ECDC4) on Sunrise Yellow (#F9D56E) = 1.8:1
```

**Color-Independent Information**
- Errors: Icon + color + text (not just red text)
- Success: Icon + color + text (not just green)
- Progress: Percentage number + visual bar + color
- Status: Label + icon + color coding

#### Typography & Readability
- [ ] Minimum font size: 16px body, 14px small (never below)
- [ ] Line height: 1.5-1.75 for body text
- [ ] Paragraph width: Max 70 characters (optimal 60)
- [ ] Font choice: Dyslexia-friendly (Fredoka has good letter spacing)
- [ ] Letter spacing: At least 0.12em
- [ ] Word spacing: At least 0.16em
- [ ] Paragraph spacing: At least 2x font size
- [ ] Text can be resized up to 200% without loss of functionality
- [ ] No justified text (left-aligned for dyslexia support)

**Dyslexia-Friendly Settings** (User toggle)
- Increased letter spacing (+0.15em)
- OpenDyslexic font option
- Line spacing increase to 2.0
- Disable animations option
- Reading ruler overlay (highlight current line)

#### Visual Layout
- [ ] Clear visual hierarchy with heading levels
- [ ] Consistent layout patterns throughout
- [ ] Adequate whitespace between interactive elements
- [ ] No flashing content above 3 flashes per second (seizure prevention)
- [ ] Animation can be paused, stopped, or hidden
- [ ] Parallax and motion effects respect `prefers-reduced-motion`
- [ ] Focus indicators highly visible (3px outline minimum)

**Focus Indicator Standards**
```css
/* All interactive elements */
:focus {
  outline: 3px solid #2D9CDB;
  outline-offset: 2px;
  border-radius: 4px;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :focus {
    outline: 4px solid currentColor;
    outline-offset: 3px;
  }
}
```

---

### ✅ Motor & Physical Accessibility

#### Touch & Click Targets
- [ ] Minimum touch target size: 44×44px (WCAG AAA)
- [ ] Spacing between targets: At least 8px
- [ ] Large click areas for all interactive elements
- [ ] Hover states don't require precise positioning
- [ ] No mouse-only interactions (all keyboard accessible)

**Touch Target Examples**
```
✓ PASS: Primary button = 48×48px with 16px padding
✓ PASS: Icon buttons = 44×44px minimum
✓ PASS: Checkbox/radio = 44×44px interactive area (even if visual is smaller)
✗ FAIL: Link in sentence = 18px font height only (needs padding)
```

#### Keyboard Navigation
- [ ] All functionality available via keyboard
- [ ] Logical tab order (left-to-right, top-to-bottom)
- [ ] Tab order follows visual flow
- [ ] Skip links present ("Skip to main content", "Skip navigation")
- [ ] Focus trapped in modals until closed
- [ ] Escape key closes modals/overlays
- [ ] Arrow keys navigate within components (tabs, carousels, etc.)
- [ ] Enter and Space activate buttons
- [ ] No keyboard traps

**Keyboard Shortcuts** (User can view and customize)
- `Tab` / `Shift+Tab`: Navigate elements
- `Enter` / `Space`: Activate buttons, links
- `Esc`: Close modal, cancel action
- `Arrow keys`: Navigate carousels, tabs, lists
- `Ctrl+S`: Save progress
- `/`: Focus search (like GitHub)
- `?`: Show keyboard shortcuts help

**Keyboard Navigation Map**
```
┌─────────────────────────────────────────┐
│  [1] Skip to main content               │
│  [2] Navigation                         │
│  [3] Main content                       │
│  [4] Sidebar                            │
│  [5] Help (Clai)                        │
└─────────────────────────────────────────┘

Numbers indicate tab order regions.
Each region internally follows visual order.
```

#### Motor Control Support
- [ ] Adjustable time limits with warnings
- [ ] Ability to extend or remove time limits
- [ ] No actions requiring simultaneous inputs
- [ ] Undo/redo functionality for critical actions
- [ ] Confirmation dialogs for destructive actions
- [ ] Drag-and-drop has keyboard alternative
- [ ] Sliders have text input alternative

---

### ✅ Auditory Accessibility

#### Audio Content
- [ ] Captions for all video content (synchronized)
- [ ] Transcripts for audio-only content
- [ ] Visual alternatives for audio cues
- [ ] Volume controls easily accessible
- [ ] Audio auto-play can be disabled
- [ ] No background audio, or can be turned off

#### Text-to-Speech Support
- [ ] Compatible with screen reader text-to-speech
- [ ] Proper pronunciation markup for technical terms
- [ ] Math/code announced clearly
- [ ] ARIA labels for complex interactions

**Audio Indicators with Visual Equivalents**
| Audio Cue | Visual Alternative |
|-----------|--------------------|
| Success sound | Green checkmark + animation |
| Error beep | Red X + shake animation |
| Notification ping | Badge count + highlight |
| Level up fanfare | Full-screen celebration + confetti |
| Streak reminder | Flame icon pulse |

---

### ✅ Cognitive Accessibility

#### Content Clarity
- [ ] Plain language (7-14 year reading level appropriate)
- [ ] Consistent terminology throughout
- [ ] Instructions clear and concise
- [ ] Complex processes broken into steps
- [ ] Progress indicators show where user is
- [ ] Error messages explain how to fix
- [ ] No time pressure unless necessary (can be extended)

**Reading Level Guidelines**
- Sentence length: 10-15 words average
- Avoid jargon; define technical terms
- Use active voice
- Break long content into chunks
- Use bullet points and lists
- Include visuals to support text

#### Memory Support
- [ ] Auto-save progress frequently
- [ ] "Resume where you left off" functionality
- [ ] Clear breadcrumbs showing location
- [ ] Tutorial can be re-accessed anytime
- [ ] Help/hints available throughout
- [ ] Clai mascot provides context reminders

#### Focus & Attention Support
- [ ] Minimal distractions on learning screens
- [ ] "Focus Mode" hides non-essential UI
- [ ] Pomodoro-style break reminders (optional)
- [ ] Animations can be reduced or disabled
- [ ] Notification controls (mute, pause)

**Focus Mode** (Toggle in settings)
```
When enabled:
- Hides leaderboards, social features
- Reduces animations to minimal
- Mutes all sounds except feedback
- Removes time pressure indicators
- Shows only current task and progress
```

#### Error Prevention & Recovery
- [ ] Confirmation for destructive actions
- [ ] "Are you sure?" dialogs
- [ ] Undo within 10 seconds for most actions
- [ ] Auto-save prevents data loss
- [ ] Clear error messages with solutions
- [ ] No punishment for mistakes

**Error Message Examples**
```
❌ BAD: "Error 402: Invalid input"
✓ GOOD: "Oops! Please enter a number between 1 and 10."

❌ BAD: "Password must meet requirements"
✓ GOOD: "Password needs at least 8 characters and 1 number.
         You're almost there!"

❌ BAD: "Access denied"
✓ GOOD: "This lesson unlocks at Level 5. You're Level 3 -
         keep learning to unlock it soon!"
```

---

### ✅ Screen Reader Accessibility

#### Semantic HTML
- [ ] Proper heading hierarchy (H1 → H2 → H3, no skipping)
- [ ] Landmark regions (header, nav, main, aside, footer)
- [ ] Lists use `<ul>`, `<ol>`, `<li>` tags
- [ ] Tables use `<table>`, `<th>`, `<td>` with proper headers
- [ ] Forms use `<label>` for all inputs
- [ ] Buttons are `<button>`, links are `<a>`

**Semantic Structure Example**
```html
<header>
  <nav aria-label="Main navigation">...</nav>
</header>

<main id="main-content">
  <h1>Welcome, Alex!</h1>

  <section aria-labelledby="current-mission">
    <h2 id="current-mission">Current Mission</h2>
    ...
  </section>

  <section aria-labelledby="progress">
    <h2 id="progress">Your Progress</h2>
    ...
  </section>
</main>

<aside aria-label="Help">
  Clai chatbot
</aside>

<footer>...</footer>
```

#### ARIA Attributes
- [ ] ARIA labels for icon-only buttons
- [ ] `aria-describedby` for additional context
- [ ] `aria-live` for dynamic content updates
- [ ] `role` attributes for custom components
- [ ] `aria-expanded` for collapsible sections
- [ ] `aria-selected` for tabs and selections
- [ ] `aria-current` for current page/step

**ARIA Examples**
```html
<!-- Icon button -->
<button aria-label="Close modal">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Progress update -->
<div aria-live="polite" aria-atomic="true">
  You earned 50 XP! Total: 245 XP
</div>

<!-- Tab interface -->
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel1">
    Body
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel2">
    Face
  </button>
</div>

<!-- Loading state -->
<div role="status" aria-live="polite">
  <span class="sr-only">Loading lesson content...</span>
</div>
```

#### Screen Reader Testing
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (Mac/iOS)
- [ ] Test with TalkBack (Android)
- [ ] All content announced clearly
- [ ] Navigation makes sense audio-only
- [ ] Forms can be completed with screen reader
- [ ] Errors announced immediately

**Screen Reader Only Text**
```css
/* Visually hidden but screen reader accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

### ✅ Language & Internationalization

#### Multi-language Support
- [ ] Interface available in multiple languages
- [ ] Language selector prominent and accessible
- [ ] Content translated by native speakers
- [ ] Cultural sensitivity in examples and imagery
- [ ] RTL (right-to-left) language support
- [ ] Date/time formats localized

#### Reading Support
- [ ] `lang` attribute on all pages
- [ ] Language changes marked with `lang` attribute
- [ ] Abbreviations explained on first use
- [ ] Technical terms defined in glossary
- [ ] Text-to-speech pronunciation hints

---

### ✅ Assistive Technology Compatibility

#### Supported Technologies
- [ ] Screen readers (NVDA, JAWS, VoiceOver, TalkBack)
- [ ] Screen magnifiers (ZoomText, MAGic)
- [ ] Speech recognition (Dragon NaturallySpeaking, Voice Control)
- [ ] Switch controls and adaptive input devices
- [ ] Eye tracking software
- [ ] Alternative keyboards (one-handed, on-screen)

#### Testing Requirements
- [ ] Weekly automated accessibility scans (axe, WAVE)
- [ ] Monthly manual testing with assistive tech
- [ ] Quarterly user testing with disabled users
- [ ] Accessibility audit before major releases

---

## 🎨 Accessible Design Patterns

### Interactive Components

#### Accessible Button
```html
<button
  class="btn-primary"
  aria-label="Start your first mission"
  type="button"
>
  Let's Go! 🚀
</button>
```
- Minimum 44×44px
- Clear focus indicator
- High contrast text
- Descriptive label
- Keyboard activatable

#### Accessible Form Input
```html
<div class="form-field">
  <label for="student-name">
    First Name
    <span aria-label="required">*</span>
  </label>
  <input
    type="text"
    id="student-name"
    name="firstName"
    aria-required="true"
    aria-describedby="name-hint name-error"
    aria-invalid="false"
  />
  <div id="name-hint" class="hint">
    Your awesome name...
  </div>
  <div id="name-error" class="error" aria-live="polite">
    <!-- Error message appears here -->
  </div>
</div>
```

#### Accessible Modal
```html
<div
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  aria-modal="true"
>
  <h2 id="modal-title">Achievement Unlocked!</h2>
  <p id="modal-description">You earned the Scholar badge!</p>

  <button aria-label="Close achievement dialog">
    Continue →
  </button>
</div>
```

**Modal Accessibility Requirements**
- Focus trapped inside when open
- Focus returns to trigger element on close
- Escape key closes modal
- Background content inert (aria-hidden)
- Heading structure maintained

#### Accessible Avatar Builder
```html
<div role="region" aria-labelledby="avatar-builder-title">
  <h2 id="avatar-builder-title">Create Your Avatar</h2>

  <!-- Preview -->
  <div aria-live="polite" aria-atomic="true">
    <img
      src="avatar-preview.png"
      alt="Avatar preview: blue robot with red hat and sunglasses"
    />
  </div>

  <!-- Customization -->
  <div role="tablist" aria-label="Avatar customization categories">
    <button role="tab" aria-selected="true" aria-controls="body-panel">
      Body
    </button>
    <button role="tab" aria-selected="false" aria-controls="face-panel">
      Face
    </button>
  </div>

  <div role="tabpanel" id="body-panel" aria-labelledby="body-tab">
    <fieldset>
      <legend>Choose body type</legend>
      <label>
        <input type="radio" name="body-type" value="human" checked />
        Human
      </label>
      <label>
        <input type="radio" name="body-type" value="robot" />
        Robot
      </label>
    </fieldset>
  </div>
</div>
```

---

## 🔧 Settings & Customization

### Accessibility Settings Panel

**User-Controlled Options**
```
┌─────────────────────────────────────────┐
│  ⚙️ Accessibility Settings              │
│                                         │
│  👁️ Vision                              │
│  ☐ High contrast mode                   │
│  ☐ Dark mode                            │
│  ☐ Reduce animations                    │
│  Text size: [Small] [Medium] [Large]    │
│  Font: [Fredoka] [OpenDyslexic]         │
│                                         │
│  🎧 Sound                                │
│  ☐ Mute all sounds                      │
│  ☐ Reduce sound effects                 │
│  Volume: [Slider 0-100%]                │
│  ☐ Visual alerts instead of audio       │
│                                         │
│  ⌨️ Input                                │
│  ☐ Show keyboard shortcuts              │
│  ☐ Disable time limits                  │
│  ☐ Confirm all actions                  │
│  ☐ Sticky keys support                  │
│                                         │
│  🧠 Focus                                │
│  ☐ Focus mode (reduce distractions)     │
│  ☐ Reading ruler                        │
│  ☐ Break reminders every [30] mins      │
│  ☐ Increase spacing                     │
│                                         │
│  [Save Settings]                        │
└─────────────────────────────────────────┘
```

### Reduced Motion Mode

**When `prefers-reduced-motion: reduce` is detected:**
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable non-essential animations */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Keep essential state transitions */
  .essential-animation {
    /* Fade only, no motion */
    transition: opacity 0.2s ease;
  }
}
```

**Essential vs. Non-essential Animations**
- **Essential** (keep): Focus indicators, loading states, success/error feedback
- **Non-essential** (remove): Decorative particles, bounces, mascot idle animations

---

## 📱 Mobile Accessibility

### Touch Accessibility
- Minimum 44×44px touch targets
- Adequate spacing between elements
- Gesture alternatives (swipe = button alternative)
- Orientation support (portrait and landscape)
- No pinch-zoom blocking

### Mobile Screen Reader
- VoiceOver (iOS) tested
- TalkBack (Android) tested
- Gestures compatible with screen reader gestures
- Headings navigable with rotor/TalkBack menu

---

## 🧪 Testing & Validation

### Automated Testing Tools

**Required Tools**
1. **axe DevTools**: Automated WCAG testing
2. **WAVE**: Visual accessibility evaluation
3. **Lighthouse**: Google's accessibility audit
4. **Pa11y**: Command-line accessibility testing
5. **Storybook**: Component accessibility testing

**CI/CD Integration**
```bash
# Run accessibility tests on every commit
npm run test:a11y

# Automated checks:
- Color contrast (WCAG AA minimum)
- ARIA validity
- Keyboard navigation
- Heading hierarchy
- Alt text presence
- Form labels
```

### Manual Testing Checklist

**Weekly Manual Tests**
- [ ] Navigate entire site using only keyboard
- [ ] Test with screen reader (vary weekly: NVDA, JAWS, VoiceOver)
- [ ] Zoom to 200% and verify functionality
- [ ] Enable Windows High Contrast Mode
- [ ] Test with color blindness simulator
- [ ] Disable JavaScript and verify core functionality

**Monthly In-Depth Tests**
- [ ] Full user journey with screen reader
- [ ] Test all forms and interactions
- [ ] Verify all videos have captions
- [ ] Check all images have meaningful alt text
- [ ] Test with speech recognition software
- [ ] Test with screen magnifier

### User Testing with Disabled Users

**Quarterly Sessions**
- Recruit 5-10 children with various disabilities
- Age-appropriate across 7-14 range
- Test new features before release
- Observe pain points and frustrations
- Gather feedback on accessibility features
- Iterate based on real user needs

**Disability Representation**
- Visual impairments (low vision, blind)
- Hearing impairments (hard of hearing, deaf)
- Motor disabilities (limited dexterity, mobility aids)
- Cognitive disabilities (ADHD, dyslexia, autism)

---

## 📚 Resources & Training

### Team Education
- Monthly accessibility training sessions
- WCAG 2.1 certification encouraged
- Screen reader practice sessions
- Empathy exercises (navigate site with eyes closed)

### Documentation
- Accessibility style guide (this document)
- Component accessibility patterns
- ARIA usage examples
- Testing procedures

### External Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)
- [Deque University](https://dequeuniversity.com/)

---

## 🎯 Accessibility Goals & Metrics

### Success Metrics
- 100% WCAG 2.1 AA compliance (minimum)
- 95%+ WCAG 2.1 AAA compliance (goal)
- 0 critical accessibility bugs in production
- <5 moderate accessibility issues at any time
- 95%+ user satisfaction from disabled users

### Monitoring
- Weekly automated scans
- Monthly accessibility reports
- Quarterly user testing
- Annual third-party audit

### Continuous Improvement
- Accessibility is never "done"
- Stay updated on WCAG 3.0 (W3C Silver)
- Monitor assistive tech advancements
- Gather ongoing user feedback
- Iterate and improve constantly

---

*Accessibility is a journey, not a destination. Every child deserves to learn about AI, regardless of ability.*
