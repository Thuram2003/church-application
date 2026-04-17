import { NextRequest, NextResponse } from "next/server";

/**
 * API Route: /api/auth/verify-email
 * 
 * This route is a fallback for backward compatibility.
 * Better Auth should send emails directly to /verify-email after FRONTEND_URL is set.
 * 
 * This route simply redirects to the main /verify-email page.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  console.log("[API Route] /api/auth/verify-email called (fallback)");
  console.log("[API Route] Token:", token?.substring(0, 20) + "...");

  if (!token) {
    console.error("[API Route] No token provided");
    return NextResponse.redirect(new URL("/login?error=invalid_verification_link", request.url));
  }

  // Redirect to the main verify-email page
  const verifyUrl = new URL("/verify-email", request.url);
  verifyUrl.searchParams.set("token", token);

  console.log("[API Route] Redirecting to:", verifyUrl.toString());
  return NextResponse.redirect(verifyUrl);
}

