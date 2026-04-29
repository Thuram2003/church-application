import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Routes that don't require authentication
const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/verify-email-sent",
];

// Routes that require auth but no workspace
const authOnlyRoutes = ["/onboarding", "/workspace-selection"];

// Routes that require auth AND workspace
const protectedRoutes = [
  "/home", "/people", "/giving", "/calendar", "/chat",
  "/appointments", "/follow-ups", "/resources", "/rooms",
  "/announcements", "/accounting", "/batches", "/financial-settings",
  "/funds", "/pledges", "/attendance", "/families", "/groups",
  "/church-settings", "/devotion", "/forms", "/reports", "/users",
  "/bible",
];

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;

  // req.auth is the session object (from the session callback)
  const session = req.auth;
  const isAuthenticated = !!session;
  const hasWorkspace =
    !!session?.user?.churchId && !!session?.user?.branchId;

  const isPublicRoute = publicRoutes.some((r) => pathname.startsWith(r));
  const isProtectedRoute = protectedRoutes.some((r) => pathname.startsWith(r));

  // Root redirect
  if (pathname === "/") {
    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/login", req.url));
    if (!hasWorkspace)
      return NextResponse.redirect(new URL("/workspace-selection", req.url));
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Workspace selection — requires auth, allows switching
  if (pathname === "/workspace-selection") {
    if (!isAuthenticated) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Onboarding — requires auth, no workspace check
  if (pathname === "/onboarding") {
    if (!isAuthenticated) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Protected routes — require auth + workspace
  if (isProtectedRoute) {
    if (!isAuthenticated) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    if (!hasWorkspace)
      return NextResponse.redirect(new URL("/workspace-selection", req.url));
    return NextResponse.next();
  }

  // Redirect authenticated users away from public routes
  if (isPublicRoute && isAuthenticated && !pathname.startsWith("/verify-email")) {
    return NextResponse.redirect(
      new URL(hasWorkspace ? "/home" : "/workspace-selection", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
