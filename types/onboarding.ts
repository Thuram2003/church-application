// Types matching the API structure for POST /api/v1/onboarding/church

export interface ChurchInfo {
  name: string;
  denomination: string;
  metadata?: string;
}

export interface BranchInfo {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  website?: string;
}

export interface OnboardingData {
  churchInfo: ChurchInfo;
  branchInfo: BranchInfo;
}

export interface ChurchOnboardingRequest {
  church: {
    name: string;
    denomination: string;
    metadata?: string;
  };
  branch: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phoneNumber: string;
    website?: string;
  };
}

export interface ChurchOnboardingResponse {
  church: Record<string, unknown>;
  hqBranch: Record<string, unknown>;
  branchCount: number;
}
