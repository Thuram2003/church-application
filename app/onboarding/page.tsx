"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChurchInfoStep, ChurchInfoData } from "@/components/onboarding/ChurchInfoStep";
import { BranchInfoStep, BranchInfoData } from "@/components/onboarding/BranchInfoStep";
import { useCreateChurch } from "@/hooks/use-onboarding";
import { toast } from "sonner";
import type { OnboardingData as OnboardingDataType } from "@/types/onboarding";

type OnboardingStep = "church" | "branch";

interface OnboardingData {
  church: ChurchInfoData | null;
  branch: BranchInfoData | null;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("church");
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    church: null,
    branch: null,
  });

  // Allow users to create new churches even if they have existing workspaces
  // The middleware handles authentication, so we don't need to redirect here
  // useEffect(() => {
  //   if (status === "authenticated" && session?.user?.churchId && session?.user?.branchId) {
  //     console.log("[Onboarding] User already has complete workspace, redirecting to home");
  //     router.push("/home");
  //   }
  // }, [status, session?.user?.churchId, session?.user?.branchId, router]);

  const { mutate: createChurch, isPending } = useCreateChurch({
    onSuccess: async (data) => {
      console.log("[Onboarding] Church created successfully:", data);
      
      const churchId = data.church.id;
      const branchId = data.hqBranch.id;

      try {
        // Switch to the new workspace
        console.log("[Onboarding] Switching to new workspace...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/workspaces/switch`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Send cookies with the request (Better Auth session)
            body: JSON.stringify({ branchId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to switch workspace");
        }

        const result = await response.json();
        const workspaceData = result.data || result;

        console.log("[Onboarding] Workspace switched:", workspaceData);

        // Update session with workspace context
        await update({
          churchId: workspaceData.churchId,
          branchId: branchId,
          role: workspaceData.role,
          memberId: workspaceData.memberId,
        });

        toast.success("Church created successfully!", {
          description: "Welcome to Movementz. Let's get started.",
        });

        // Redirect to home
        router.push("/home");
        router.refresh();
      } catch (error: any) {
        console.error("[Onboarding] Failed to switch workspace:", error);
        toast.error("Church created but failed to switch workspace", {
          description: "Please try again or contact support.",
        });
        // Stay on onboarding page - don't redirect
      }
    },
    onError: (error: any) => {
      console.error("[Onboarding] Failed to create church:", error);
      toast.error("Failed to create church", {
        description: error.response?.data?.message || "Please try again",
      });
    },
  });

  const handleChurchInfoComplete = (data: ChurchInfoData) => {
    setOnboardingData((prev) => ({ ...prev, church: data }));
    setCurrentStep("branch");
  };

  const handleBranchInfoComplete = async (data: BranchInfoData) => {
    setOnboardingData((prev) => ({ ...prev, branch: data }));
    
    if (!onboardingData.church) {
      toast.error("Missing information", {
        description: "Please complete all steps",
      });
      return;
    }

    console.log("[Onboarding] Submitting church creation with bearer token from session");

    const finalData: OnboardingDataType = {
      churchInfo: onboardingData.church,
      branchInfo: data,
    };

    createChurch(finalData);
  };

  const handleBackToChurch = () => {
    setCurrentStep("church");
  };

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            {/* Progress Bar Background */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full" />
            
            {/* Progress Bar Fill */}
            <div 
              className="absolute top-5 left-0 h-1 bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: currentStep === "church" ? "0%" : "100%" }}
            />
            
            {/* Steps */}
            <div className="relative flex justify-between">
              {/* Step 1: Church */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    onboardingData.church
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : currentStep === "church"
                      ? "bg-white text-primary border-2 border-primary shadow-md"
                      : "bg-white text-gray-400 border-2 border-gray-200"
                  }`}
                >
                  {onboardingData.church ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    "1"
                  )}
                </div>
                <span className={`text-sm mt-2 font-medium transition-colors ${
                  currentStep === "church" || onboardingData.church ? "text-gray-900" : "text-gray-500"
                }`}>
                  Church Info
                </span>
              </div>

              {/* Step 2: Branch */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    onboardingData.branch
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : currentStep === "branch"
                      ? "bg-white text-primary border-2 border-primary shadow-md"
                      : "bg-white text-gray-400 border-2 border-gray-200"
                  }`}
                >
                  {onboardingData.branch ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    "2"
                  )}
                </div>
                <span className={`text-sm mt-2 font-medium transition-colors ${
                  currentStep === "branch" || onboardingData.branch ? "text-gray-900" : "text-gray-500"
                }`}>
                  Branch Info
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12">
          {currentStep === "church" && (
            <ChurchInfoStep
              onNext={handleChurchInfoComplete}
              initialData={onboardingData.church || undefined}
            />
          )}

          {currentStep === "branch" && (
            <BranchInfoStep
              onNext={handleBranchInfoComplete}
              onBack={handleBackToChurch}
              initialData={onboardingData.branch || undefined}
              isSubmitting={isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
}
