"use client";

import Link from "next/link";
import { House, ArrowLeft, MagnifyingGlass, Question } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function NotFound() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;
  const hasWorkspace = isAuthenticated && !!session?.user?.churchId && !!session?.user?.branchId;
  const homeHref = hasWorkspace ? "/home" : isAuthenticated ? "/workspace-selection" : "/login";

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--page-bg)] p-8">
      <div className="max-w-lg w-full">
        <div className="text-center space-y-8">
          {/* Illustration */}
          <div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
            <div className="relative w-full h-full bg-primary-lighter rounded-full flex items-center justify-center">
              <Question className="w-16 h-16 text-primary" weight="bold" />
            </div>
          </div>

          {/* Error Code */}
          <div className="space-y-3">
            <h1 className="text-7xl font-bold text-primary tracking-tight">404</h1>
            <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary-light mx-auto rounded-full" />
          </div>

          {/* Error Message */}
          <div className="space-y-3 max-w-sm mx-auto">
            <h2 className="text-xl font-semibold text-gray-900">
              Page Not Found
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              We couldn't find the page you're looking for. It may have been moved, deleted, or the URL might be incorrect.
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-white/50 rounded-xl p-4 border border-gray-100 max-w-sm mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <MagnifyingGlass className="w-4 h-4 text-primary" />
              <span className="font-medium">You might want to:</span>
            </div>
            <ul className="text-xs text-gray-500 space-y-1.5 text-left pl-6">
              <li>• Check the URL for typos</li>
            <li>• {isAuthenticated ? "Return to the dashboard" : "Go to login page"}</li>
              <li>• Contact support if you need help</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button asChild className="gap-2 px-6">
              <Link href={homeHref}>
                <House className="w-4 h-4" />
                {isAuthenticated ? "Go to Dashboard" : "Go to Login"}
              </Link>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="gap-2 px-6 border-gray-200 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>

          {/* Help Link */}
          <p className="text-xs text-gray-400 pt-4">
            Need help?{" "}
            <Link href="/support" className="text-primary hover:underline font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}