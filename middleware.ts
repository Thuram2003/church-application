import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that don't require authentication
const publicRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email", "/verify-email-sent"];

// Routes that require authentication but no organization check
const authOnlyRoutes = ["/onboarding"];

// Routes that require authentication AND organization
const protectedRoutes = ["/home", "/people", "/giving", "/calendar", "/chat", "/appointments", "/follow-ups", "/resources", "/rooms", "/announcements", "/accounting", "/batches", "/financial-settings", "/funds", "/pledges", "/attendance", "/families", "/groups", "/church-settings", "/devotion", "/forms", "/reports", "/users"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session token from NextAuth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const hasChurch = !!token?.churchId;

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  
  // Check if the route requires auth only (no org check)
  const isAuthOnlyRoute = authOnlyRoutes.some((route) => pathname.startsWith(route));
  
  // Check if the route is protected (requires auth + org)
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Root path handling
  if (pathname === "/") {
    if (isAuthenticated) {
      // Check if user has church
      if (hasChurch) {
        return NextResponse.redirect(new URL("/home", request.url));
      } else {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }
    } else {
      // Redirect unauthenticated users to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Auth-only routes (like onboarding) - require auth but no church
  if (isAuthOnlyRoute) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // If user already has church, redirect to home
    if (hasChurch) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes - require auth AND church
  if (isProtectedRoute) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // If authenticated but no church, redirect to onboarding
    if (!hasChurch) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
    return NextResponse.next();
  }

  // If trying to access public route with session, redirect to home
  // EXCEPT for verify-email which should always be accessible
  if (isPublicRoute && isAuthenticated && !pathname.startsWith("/verify-email")) {
    return NextResponse.redirect(new URL("/home", request.url));
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
