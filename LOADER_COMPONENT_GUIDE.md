# Loader Component Guide

## Overview

A unified, reusable loader component system for consistent loading states throughout the application.

## Components

### 1. Loader (Base Component)

The main loader component with multiple variants and sizes.

```tsx
import { Loader } from "@/components/ui/loader";

// Basic spinner
<Loader />

// With text
<Loader text="Loading data..." />

// Different sizes
<Loader size="sm" />   // Small (16px)
<Loader size="md" />   // Medium (32px) - default
<Loader size="lg" />   // Large (48px)
<Loader size="xl" />   // Extra large (64px)

// Different variants
<Loader variant="spinner" />  // Spinning circle - default
<Loader variant="dots" />     // Three bouncing dots
<Loader variant="pulse" />    // Pulsing circle

// Full screen
<Loader fullScreen text="Loading..." />
```

### 2. BrandedLoader

Branded loader with the Movementz logo and animated ring. Perfect for initial app loading.

```tsx
import { BrandedLoader } from "@/components/ui/loader";

// Default (full screen)
<BrandedLoader />

// Custom text
<BrandedLoader text="Loading your workspace..." />

// Not full screen
<BrandedLoader fullScreen={false} text="Initializing..." />
```

**Used in:**
- `LayoutContent.tsx` - Session loading
- Initial app load
- Workspace switching

### 3. PageLoader

Loader for page transitions and content loading.

```tsx
import { PageLoader } from "@/components/ui/loader";

// Basic
<PageLoader />

// With text
<PageLoader text="Loading dashboard..." />
```

**Use cases:**
- Page transitions
- Loading page content
- Suspense fallbacks

### 4. InlineLoader

Small loader for inline use in buttons, cards, or small components.

```tsx
import { InlineLoader } from "@/components/ui/loader";

// In a button
<Button disabled>
  <InlineLoader text="Saving..." />
</Button>

// In a card
<Card>
  <InlineLoader size="sm" text="Loading..." />
</Card>

// Without text
<InlineLoader size="md" />
```

**Use cases:**
- Button loading states
- Inline content loading
- Small component loading

### 5. SkeletonLoader

Skeleton loader for content placeholders.

```tsx
import { SkeletonLoader } from "@/components/ui/loader";

<SkeletonLoader />
```

**Use cases:**
- Content placeholders
- List loading states
- Card loading states

## Usage Examples

### Session Loading (Current Implementation)

```tsx
// components/LayoutContent.tsx
if (isLoading) {
  return <BrandedLoader text="Loading your workspace..." />;
}
```

### Page Loading

```tsx
// app/dashboard/page.tsx
import { PageLoader } from "@/components/ui/loader";

export default function DashboardPage() {
  const { data, isLoading } = useQuery("dashboard");

  if (isLoading) {
    return <PageLoader text="Loading dashboard..." />;
  }

  return <Dashboard data={data} />;
}
```

### Button Loading State

```tsx
// components/forms/submit-button.tsx
import { InlineLoader } from "@/components/ui/loader";

<Button disabled={isSubmitting}>
  {isSubmitting ? (
    <InlineLoader text="Saving..." />
  ) : (
    "Save Changes"
  )}
</Button>
```

### Data Table Loading

```tsx
// components/tables/data-table.tsx
import { SkeletonLoader } from "@/components/ui/loader";

{isLoading ? (
  <SkeletonLoader />
) : (
  <Table data={data} />
)}
```

### Modal/Dialog Loading

```tsx
// components/modals/edit-modal.tsx
import { Loader } from "@/components/ui/loader";

<Dialog>
  <DialogContent>
    {isLoading ? (
      <Loader size="lg" text="Loading details..." />
    ) : (
      <Form />
    )}
  </DialogContent>
</Dialog>
```

### Suspense Fallback

```tsx
// app/layout.tsx
import { PageLoader } from "@/components/ui/loader";

<Suspense fallback={<PageLoader />}>
  <Component />
</Suspense>
```

### Card Loading

```tsx
// components/cards/stat-card.tsx
import { InlineLoader } from "@/components/ui/loader";

<Card>
  <CardHeader>
    <CardTitle>Total Users</CardTitle>
  </CardHeader>
  <CardContent>
    {isLoading ? (
      <InlineLoader size="sm" />
    ) : (
      <p className="text-3xl font-bold">{count}</p>
    )}
  </CardContent>
</Card>
```

## Customization

### Custom Colors

```tsx
// Use Tailwind classes
<Loader className="[&>div]:border-red-500" />

// Or modify the component
<div className="border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
```

### Custom Sizes

```tsx
<Loader className="w-20 h-20" />
```

### Custom Animation Speed

```css
/* globals.css */
.animate-spin-slow {
  animation: spin 2s linear infinite;
}

.animate-spin-fast {
  animation: spin 0.5s linear infinite;
}
```

```tsx
<Loader className="animate-spin-slow" />
```

## Best Practices

### 1. Choose the Right Loader

- **BrandedLoader**: Initial app load, session loading
- **PageLoader**: Page transitions, main content loading
- **InlineLoader**: Buttons, small components
- **SkeletonLoader**: Content placeholders
- **Loader**: General purpose, custom implementations

### 2. Always Provide Context

```tsx
// Good
<Loader text="Loading members..." />

// Bad
<Loader />
```

### 3. Match Size to Context

```tsx
// Button
<InlineLoader size="sm" />

// Page
<PageLoader />  // Uses size="lg"

// Modal
<Loader size="md" />
```

### 4. Use Skeleton for Better UX

```tsx
// Better UX
{isLoading ? <SkeletonLoader /> : <Content />}

// vs just a spinner
{isLoading ? <Loader /> : <Content />}
```

### 5. Accessibility

All loaders include:
- `role="status"` for screen readers
- `aria-label="Loading"` for context
- Semantic HTML

## Performance

- **Lightweight**: Minimal CSS, no external dependencies
- **GPU Accelerated**: Uses `transform` and `opacity`
- **Tree-shakeable**: Import only what you need
- **No Layout Shift**: Fixed dimensions prevent CLS

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Full support

All animations use standard CSS with excellent cross-browser support.

## Migration Guide

### Before (Inline Loaders)

```tsx
// Scattered throughout codebase
<div className="flex items-center justify-center">
  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
</div>
```

### After (Unified Component)

```tsx
import { Loader } from "@/components/ui/loader";

<Loader size="md" />
```

### Benefits

1. **Consistency**: Same loader everywhere
2. **Maintainability**: Update once, applies everywhere
3. **Flexibility**: Multiple variants and sizes
4. **Accessibility**: Built-in ARIA labels
5. **Performance**: Optimized animations

## Future Enhancements

Potential additions:

1. **Progress Loader**: Show percentage
2. **Determinate Loader**: Show progress bar
3. **Custom Animations**: More animation variants
4. **Theme Support**: Dark/light mode variants
5. **Sound Effects**: Optional audio feedback
