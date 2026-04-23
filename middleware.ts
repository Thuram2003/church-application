import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that don't require authentication
const publicRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email", "/verify-email-sent"];

// Routes that require authentication but no workspace
const authOnlyRoutes = ["/onboarding", "/workspace-selection"];

// Routes that require authentication AND workspace
const protectedRoutes = ["/home", "/people", "/giving", "/calendar", "/chat", "/appointments", "/follow-ups", "/resources", "/rooms", "/announcements", "/accounting", "/batches", "/financial-settings", "/funds", "/pledges", "/attendance", "/families", "/groups", "/church-settings", "/devotion", "/forms", "/reports", "/users"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session token from NextAuth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const hasWorkspace = !!token?.churchId && !!token?.branchId;

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  
  // Check if the route requires auth only (no workspace check)
  const isAuthOnlyRoute = authOnlyRoutes.some((route) => pathname.startsWith(route));
  
  // Check if the route is protected (requires auth + workspace)
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Root path handling
  if (pathname === "/") {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    // Authenticated but no workspace selected
    if (!hasWorkspace) {
      return NextResponse.redirect(new URL("/workspace-selection", request.url));
    }
    
    // Has workspace - go to home
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Workspace selection page - requires auth but allows switching
  if (pathname === "/workspace-selection") {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Allow access even if user already has a workspace (for switching)
    return NextResponse.next();
  }

  // Onboarding - requires auth but no workspace check (user can create new church)
  if (pathname === "/onboarding") {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Allow access even if user has workspaces (creating new church)
    return NextResponse.next();
  }

  // Protected routes - require auth AND workspace
  if (isProtectedRoute) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // No workspace selected
    if (!hasWorkspace) {
      return NextResponse.redirect(new URL("/workspace-selection", request.url));
    }
    
    return NextResponse.next();
  }

  // If trying to access public route with session, redirect to home
  // EXCEPT for verify-email which should always be accessible
  if (isPublicRoute && isAuthenticated && !pathname.startsWith("/verify-email")) {
    if (hasWorkspace) {
      return NextResponse.redirect(new URL("/home", request.url));
    } else {
      return NextResponse.redirect(new URL("/workspace-selection", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
