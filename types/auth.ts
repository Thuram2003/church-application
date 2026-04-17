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
