# Loader Visual Reference

## All Loader Variants

### 1. BrandedLoader (Full Screen)
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│            ┌─────────┐              │
│            │  ╔═══╗  │ ← Spinning   │
│            │  ║ 🏢 ║  │   ring       │
│            │  ╚═══╝  │              │
│            └─────────┘              │
│                                     │
│            Movementz                │
│       Loading your workspace...     │
│                                     │
│                                     │
└─────────────────────────────────────┘
```
**Features:**
- Logo with animated spinning ring
- Brand name
- Custom text
- Full screen centered
- Professional appearance

### 2. Loader - Spinner Variant
```
Size: sm (16px)    md (32px)    lg (48px)    xl (64px)
      ⟳             ⟳⟳           ⟳⟳⟳          ⟳⟳⟳⟳
```
**Features:**
- Circular spinner
- Border animation
- Customizable size
- Optional text below

### 3. Loader - Dots Variant
```
● ● ●  (bouncing animation)
```
**Features:**
- Three dots
- Staggered bounce
- Playful animation
- Good for casual contexts

### 4. Loader - Pulse Variant
```
◉  (pulsing animation)
```
**Features:**
- Single circle
- Opacity pulse
- Subtle animation
- Minimal distraction

### 5. PageLoader
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│              ⟳⟳⟳                    │
│         Loading dashboard...        │
│                                     │
│                                     │
└─────────────────────────────────────┘
Min height: 400px
```
**Features:**
- Large spinner
- Centered in container
- Optional text
- Page-level loading

### 6. InlineLoader
```
[⟳ Saving...]  ← In button
⟳ Loading...   ← In card
```
**Features:**
- Small size
- Inline with text
- Horizontal layout
- Compact design

### 7. SkeletonLoader
```
┌─────────────────────────────────────┐
│ ████████████████████████████        │ ← Title
│ ████████████████                    │ ← Line 1
│ ██████████                          │ ← Line 2
│                                     │
│ ┌──────┐  ┌──────┐  ┌──────┐      │
│ │██████│  │██████│  │██████│      │ ← Cards
│ │██████│  │██████│  │██████│      │
│ └──────┘  └──────┘  └──────┘      │
└─────────────────────────────────────┘
```
**Features:**
- Content placeholder
- Animated pulse
- Layout preview
- Better perceived performance

## Size Comparison

```
sm:  ⟳     (16px)  - Buttons, inline
md:  ⟳⟳    (32px)  - Default, cards
lg:  ⟳⟳⟳   (48px)  - Pages, modals
xl:  ⟳⟳⟳⟳  (64px)  - Full screen
```

## Usage Context

### Full Screen Loading
```
┌─────────────────────────────────────┐
│         BrandedLoader               │
│                                     │
│         [Logo + Ring]               │
│         Movementz                   │
│    Loading your workspace...        │
└─────────────────────────────────────┘
```
**When:** App initialization, session loading

### Page Loading
```
┌─────────────────────────────────────┐
│  Sidebar  │  PageLoader             │
│           │                         │
│           │      ⟳⟳⟳                │
│           │  Loading dashboard...   │
│           │                         │
└─────────────────────────────────────┘
```
**When:** Page transitions, route changes

### Section Loading
```
┌─────────────────────────────────────┐
│  Dashboard                          │
│  ┌─────────────────────────────┐   │
│  │  Recent Activity            │   │
│  │  ⟳⟳ Loading...              │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```
**When:** Section/component loading

### Button Loading
```
┌──────────────────┐
│  ⟳ Saving...     │  ← Disabled state
└──────────────────┘
```
**When:** Form submission, actions

### Card Loading
```
┌─────────────────┐
│  Total Users    │
│  ⟳ Loading...   │
└─────────────────┘
```
**When:** Data fetching in cards

### Skeleton Loading
```
┌─────────────────────────────────────┐
│  ████████████████                   │
│  ████████████                       │
│  ██████████                         │
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │██████│  │██████│  │██████│     │
└─────────────────────────────────────┘
```
**When:** Content placeholders, lists

## Animation Speeds

```
Spinner:  1s per rotation
Dots:     Staggered 150ms delay
Pulse:    2s fade in/out
Skeleton: 2s pulse
```

## Color Scheme

```
Primary:   var(--primary)      - Main spinner color
Border:    transparent         - Top border (creates gap)
Text:      var(--muted-foreground) - Loading text
Background: var(--page-bg)     - Full screen background
```

## Accessibility

All loaders include:
```html
<div role="status" aria-label="Loading">
  <!-- Loader content -->
</div>
```

Screen readers announce: "Loading" when loader appears.

## Responsive Behavior

### Desktop
- Full size loaders
- Smooth animations
- All variants available

### Mobile
- Slightly smaller sizes
- Optimized animations
- Touch-friendly spacing

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .animate-spin {
    animation: none;
  }
}
```
Respects user's motion preferences.

## Performance

- **GPU Accelerated**: Uses `transform` and `opacity`
- **No Layout Shift**: Fixed dimensions
- **Lightweight**: ~2KB total
- **Tree-shakeable**: Import only what you need

## Common Patterns

### Loading → Content
```tsx
{isLoading ? <Loader /> : <Content />}
```

### Loading → Error → Content
```tsx
{isLoading ? (
  <Loader />
) : error ? (
  <Error />
) : (
  <Content />
)}
```

### Skeleton → Content
```tsx
{isLoading ? <SkeletonLoader /> : <Content />}
```

### Button State
```tsx
<Button disabled={isLoading}>
  {isLoading ? <InlineLoader /> : "Submit"}
</Button>
```

## Best Practices

1. **Match context**: Use appropriate loader for the context
2. **Provide feedback**: Always include descriptive text
3. **Consistent timing**: Don't show loaders for <200ms
4. **Skeleton preferred**: Use skeletons for better UX
5. **Accessibility**: Ensure screen reader support
