import { useMutation } from "@tanstack/react-query";
import { onboardingService } from "@/lib/services/onboarding.service";
import type { OnboardingData } from "@/types/onboarding";

export function useCreateChurch(options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationFn: (data: OnboardingData) => onboardingService.createChurch(data),
    onSuccess: options?.onSuccess,
    onError: (error: any) => {
      options?.onError?.(error);
    },
  });
}
