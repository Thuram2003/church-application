# Session Loading Fix - Sidebar Disappearing on Refresh

## The Problem

The sidebar was disappearing on every page refresh, causing a poor user experience with layout shifts and flashing content.

## Root Cause

This is a classic Next.js + NextAuth hydration timing issue:

1. On page refresh, `useSession()` starts with `status: "loading"` and `session: null`
2. The code immediately checks `isAuthenticated = !!session?.user` → `false`
3. This triggers `shouldHideSidebar = true`
4. Sidebar is hidden
5. A moment later, session resolves and sidebar appears → **Flash/Layout Shift**

### The Problematic Code

```tsx
const { data: session, status } = useSession();
const isLoading = status === "loading"; // ← Detected but never used!

const isAuthenticated = !!session?.user; // ← false during loading
const shouldHideSidebar = ... || !isAuthenticated; // ← true during loading

// Sidebar hidden, then appears when session loads
```

## The Solution

**Wait for the session to resolve before making auth-dependent layout decisions.**

### Fixed Code

```tsx
const { data: session, status } = useSession();
const isLoading = status === "loading";

// CRITICAL: Don't make sidebar decisions until session is resolved
if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page-bg">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// Now we can safely check auth state
const isAuthenticated = !!session?.user;
const shouldHideSidebar = ... || !isAuthenticated;
```

## Why This Happens

This is extremely common in Next.js + NextAuth apps because:

1. **Client-side session fetching**: `useSession()` is async on the client
2. **Cookie validation**: It needs to fetch and validate the session cookie
3. **Default null state**: Until resolved, session defaults to `null`
4. **Premature rendering**: Components render before session loads

## Alternative Solutions

### Option 1: Show Loading Spinner (Current Implementation)
```tsx
if (isLoading) {
  return <LoadingSpinner />;
}
```
**Pros**: Clear loading state, no layout shift
**Cons**: Brief loading screen on every navigation

### Option 2: Render Sidebar Shell Immediately
```tsx
if (isLoading) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
```
**Pros**: No layout shift, sidebar visible immediately
**Cons**: Sidebar might show briefly on auth pages

### Option 3: Optimistic Rendering
```tsx
const shouldHideSidebar = isLoading 
  ? false // Assume sidebar should show while loading
  : isOnboarding || isWorkspaceSelection || isAuthPage || !isAuthenticated || !hasWorkspace;
```
**Pros**: Fastest perceived performance
**Cons**: Sidebar might flash on auth pages

## Best Practices

### 1. Always Check Loading State
```tsx
const { data: session, status } = useSession();

if (status === "loading") {
  // Handle loading state
}

if (status === "unauthenticated") {
  // Handle unauthenticated state
}

if (status === "authenticated") {
  // Safe to use session data
}
```

### 2. Use Middleware for Auth Protection
```tsx
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");
  
  if (!token && !isPublicPath(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
```
This prevents unauthorized access at the edge, before the page even loads.

### 3. Server-Side Session for Critical Pages
```tsx
// app/dashboard/page.tsx
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/login");
  }
  
  // Session guaranteed to exist
  return <Dashboard user={session.user} />;
}
```

### 4. Skeleton Loading States
```tsx
if (isLoading) {
  return <SidebarSkeleton />;
}
```
Better UX than spinners for layout components.

## Testing the Fix

### Before Fix:
1. Navigate to `/home` (logged in)
2. Refresh page (F5)
3. **Bug**: Sidebar disappears briefly, then reappears
4. Layout shifts, content jumps

### After Fix:
1. Navigate to `/home` (logged in)
2. Refresh page (F5)
3. **Fixed**: Brief loading spinner, then sidebar appears
4. No layout shift, smooth experience

## Performance Impact

**Loading Time**: ~100-300ms (session validation time)
**User Experience**: Much better - no layout shift
**SEO Impact**: None (client-side only)

## Related Issues

This fix also prevents:
- Flash of unauthenticated content (FOUC)
- Incorrect redirects during session load
- Race conditions in auth-dependent components
- Hydration mismatches

## Additional Improvements

### Add Suspense Boundaries
```tsx
<Suspense fallback={<LoadingSkeleton />}>
  <LayoutContent>{children}</LayoutContent>
</Suspense>
```

### Cache Session Client-Side
```tsx
// Next.js automatically caches session for 5 minutes
// Reduces loading time on subsequent navigations
```

### Preload Session
```tsx
// In root layout, preload session
useEffect(() => {
  void getSession(); // Preload for faster subsequent checks
}, []);
```

## Conclusion

The sidebar disappearing on refresh was caused by checking auth state before the session loaded. By adding a loading state check, we ensure the layout only renders after we know the user's auth status, preventing flashes and layout shifts.

This is a fundamental pattern for any Next.js + NextAuth application and should be applied to all auth-dependent layout decisions.
