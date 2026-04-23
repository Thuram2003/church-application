// User type based on Better Auth API
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  archivedAt?: string | null;
}

// Member record from backend
export interface MemberRecord {
  id: string;
  churchId: string;
  branchId: string | null;
  userId: string;
  familyId: string | null;
  role: "overseer" | "admin" | "pastor" | "member";
  familyRole: string;
  gender: string;
  maritalStatus: string;
  birthDate: string | null;
  phoneNumber: string | null;
  ageGroup: string | null;
  isVisitor: boolean;
  status: string;
  createdBy: string | null;
  createdAt: string;
  archivedAt: string | null;
  church: {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
    denomination: string | null;
    metadata: any;
    createdAt: string;
    archivedAt: string | null;
  };
  branch: {
    id: string;
    churchId: string;
    name: string;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    zipCode: string | null;
    phoneNumber: string | null;
    email: string | null;
    website: string | null;
    createdAt: string;
    archivedAt: string | null;
  } | null;
}

// Grouped church structure for UI
export interface GroupedChurch {
  church: MemberRecord["church"];
  branches: Array<{
    id: string;
    name: string;
    city: string | null;
    memberRole: string;
    memberId: string;
  }>;
}

// Session type based on Better Auth API
export interface Session {
  id: string;
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
  activeOrganizationId?: string;
}

// Auth response types
export interface AuthResponse {
  token?: string;
  user: User;
  session?: Session;
  redirect?: boolean;
  url?: string;
}

export interface SessionResponse {
  session: Session;
  user: User;
}

// Auth request types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  callbackURL?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  image?: string;
  callbackURL?: string;
  rememberMe?: boolean;
  firstName?: string;
  lastName?: string;
  country?: string;
}

export interface ForgotPasswordRequest {
  email: string;
  redirectTo?: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
  token?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  revokeOtherSessions?: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  image?: string;
}

// Workspace switching
export interface WorkspaceSwitchRequest {
  branchId: string;
}

export interface WorkspaceSwitchResponse {
  session: {
    user: User;
  };
  role: "overseer" | "admin" | "pastor" | "member";
  memberId: string;
  churchId: string;
}
