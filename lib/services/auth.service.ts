import { authClient, tokenManager } from "../api-client";
import type {
  AuthResponse,
  SessionResponse,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  UpdateUserRequest,
} from "@/types/auth";

export const authService = {
  // Sign up with email
  async signUp(data: RegisterRequest): Promise<AuthResponse> {
    const response = await authClient.post<AuthResponse>("/sign-up/email", data);
    // Store token if returned
    if (response.data.token) {
      tokenManager.setToken(response.data.token);
    }
    return response.data;
  },

  // Sign in with email
  async signIn(data: LoginRequest): Promise<AuthResponse> {
    const response = await authClient.post<AuthResponse>("/sign-in/email", data);
    // Store token if returned
    if (response.data.token) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth Service] Storing token:', response.data.token.substring(0, 20) + '...');
      }
      tokenManager.setToken(response.data.token);
      // Verify token was stored
      const storedToken = tokenManager.getToken();
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth Service] Token stored successfully:', !!storedToken);
      }
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Auth Service] No token in response');
      }
    }
    return response.data;
  },

  // Sign out
  async signOut(): Promise<{ success: boolean }> {
    const response = await authClient.post<{ success: boolean }>("/sign-out", {});
    // Clear token on sign out
    tokenManager.removeToken();
    return response.data;
  },

  // Get current session
  async getSession(): Promise<SessionResponse | null> {
    try {
      const token = tokenManager.getToken();
      if (!token) {
        // No token, no need to call the API
        if (process.env.NODE_ENV === 'development') {
          console.log('[Auth Service] No token available, skipping session fetch');
        }
        return null;
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth Service] Getting session, token:', token.substring(0, 20) + '...');
      }
      // Use GET method instead of POST
      const response = await authClient.get<SessionResponse>("/get-session");
      return response.data;
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Auth Service] Get session error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      }
      return null;
    }
  },

  // Update user
  async updateUser(data: UpdateUserRequest): Promise<{ user: AuthResponse["user"] }> {
    const response = await authClient.post<{ user: AuthResponse["user"] }>("/update-user", data);
    return response.data;
  },

  // Change password
  async changePassword(data: ChangePasswordRequest): Promise<AuthResponse> {
    const response = await authClient.post<AuthResponse>("/change-password", data);
    return response.data;
  },

  // Request password reset
  async requestPasswordReset(data: ForgotPasswordRequest): Promise<{ status: boolean; message: string }> {
    const response = await authClient.post<{ status: boolean; message: string }>(
      "/request-password-reset",
      data
    );
    return response.data;
  },

  // Reset password
  async resetPassword(data: ResetPasswordRequest): Promise<{ status: boolean }> {
    const response = await authClient.post<{ status: boolean }>("/reset-password", data);
    return response.data;
  },

  // Verify email
  async verifyEmail(token: string): Promise<{ user: AuthResponse["user"]; status: boolean }> {
    // Use GET method with query parameters as per backend documentation
    const response = await authClient.get<{ user: AuthResponse["user"]; status: boolean }>("/verify-email", {
      params: { token },
    });
    return response.data;
  },

  // Send verification email
  async sendVerificationEmail(email: string): Promise<{ status: boolean }> {
    // Better Auth handles verification email sending
    // The backend will send an email with a verification link
    const response = await authClient.post<{ status: boolean }>("/send-verification-email", {
      email,
      callbackURL: typeof window !== 'undefined' 
        ? `${window.location.origin}/verify`
        : `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify`,
    });
    return response.data;
  },
};
