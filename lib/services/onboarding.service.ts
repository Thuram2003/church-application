import { apiClient } from "../api-client";
import type { OnboardingData, ChurchOnboardingRequest, ChurchOnboardingResponse } from "@/types/onboarding";

export const onboardingService = {
  // Create church and HQ branch
  async createChurch(data: OnboardingData): Promise<ChurchOnboardingResponse> {
    const payload: ChurchOnboardingRequest = {
      church: {
        name: data.churchInfo.name,
        denomination: data.churchInfo.denomination,
        metadata: data.churchInfo.metadata || undefined,
      },
      branch: {
        name: data.branchInfo.name,
        email: data.branchInfo.email,
        address: data.branchInfo.address,
        city: data.branchInfo.city,
        state: data.branchInfo.state,
        country: data.branchInfo.country,
        zipCode: data.branchInfo.zipCode,
        phoneNumber: data.branchInfo.phoneNumber,
        website: data.branchInfo.website || undefined,
      },
    };

    const response = await apiClient.post<ChurchOnboardingResponse>(
      "/v1/onboarding/church",
      payload
    );
    return response.data;
  },
};
