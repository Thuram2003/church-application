"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EnvelopeSimple, CheckCircle, XCircle } from "@phosphor-icons/react";
import { authService } from "@/lib/services/auth.service";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Link from "next/link";

type VerificationStatus = "idle" | "verifying" | "success" | "error";

export function VerifyForm() {
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get("email");
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    async function verifyWithToken() {
      if (!token) return;

      setVerificationStatus("verifying");
      try {
        console.log("[Verify Form] Verifying token...");
        await authService.verifyEmail(token);
        
        setVerificationStatus("success");
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Token verification failed";
        
        console.error("[Verify Form] Verification failed:", message);
        
        setVerificationStatus("error");
        setErrorMessage(message);
      }
    }

    verifyWithToken();
  }, [token, router]);

  async function handleResend() {
    if (!queryEmail) {
      toast.error("Email not found", {
        description: "Please try registering again.",
      });
      return;
    }

    setIsResending(true);
    try {
      await authService.sendVerificationEmail(queryEmail);
      toast.success("Verification email sent!", {
        description: "Check your inbox for the verification link.",
      });
    } catch (error: any) {
      toast.error("Failed to send email", {
        description: error.response?.data?.message || "Please try again",
      });
    } finally {
      setIsResending(false);
    }
  }

  // Verifying state - show loading skeleton
  if (verificationStatus === "verifying") {
    return (
      <div className="w-full max-w-md space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-black">Verifying your email</h1>
            <p className="text-black/40 md:text-base font-normal">
              Please wait while we verify your account...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success state - show success message
  if (verificationStatus === "success") {
    return (
      <div className="w-full max-w-md space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-green-600" weight="fill" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-black">Email verified!</h1>
            <p className="text-black/60 md:text-base font-normal">
              Your email has been successfully verified.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <p className="text-sm text-black/60 text-center">
            Redirecting you to login in a moment...
          </p>

          <Button 
            asChild 
            className="w-full h-11"
          >
            <Link href="/login">Continue to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Error state - show error message
  if (verificationStatus === "error") {
    return (
      <div className="w-full max-w-md space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
            <XCircle size={48} className="text-red-600" weight="fill" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-black">Verification failed</h1>
            <p className="text-red-600 md:text-base font-normal">
              {errorMessage || "We couldn't verify your email."}
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <p className="text-sm text-black/60 text-center">
            The verification link may have expired or is invalid.
          </p>

          {queryEmail && (
            <Button
              onClick={handleResend}
              disabled={isResending}
              className="w-full h-11"
            >
              {isResending ? "Sending..." : "Request new verification link"}
            </Button>
          )}

          <Button 
            asChild 
            variant="outline" 
            className="w-full h-11"
          >
            <Link href="/login">Back to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Idle state - show email sent message (no token in URL)
  return (
    <div className="w-full max-w-md space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <EnvelopeSimple size={32} className="text-primary" weight="fill" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-black">Check your email</h1>
          <p className="text-black/40 md:text-base font-normal">
            We've sent a verification link to
          </p>
          {queryEmail && (
            <p className="text-black font-medium text-base">{queryEmail}</p>
          )}
        </div>
      </div>

      <div className="space-y-5 pt-2">
        <p className="text-sm text-black/60 text-center">
          Click the link in the email to verify your account and continue to onboarding.
        </p>

        <div className="space-y-3">
          <Button
            onClick={handleResend}
            disabled={isResending || !queryEmail}
            variant="outline"
            className="w-full h-11"
          >
            {isResending ? "Sending..." : "Resend verification email"}
          </Button>

          <Button 
            asChild 
            variant="ghost" 
            className="w-full h-11"
          >
            <Link href="/login">Back to Login</Link>
          </Button>
        </div>
      </div>

      <div className="pt-4 border-t border-black/10">
        <p className="text-xs text-black/40 text-center">
          Didn't receive the email? Check your spam folder or try resending.
        </p>
      </div>
    </div>
  );
}
