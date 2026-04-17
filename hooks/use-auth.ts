import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/lib/services/auth.service";
import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  UpdateUserRequest,
  SessionResponse,
} from "@/types/auth";

// Query keys
export const authKeys = {
  session: ["auth", "session"] as const,
};

// Get current session
export function useSession() {
  return useQuery({
    queryKey: authKeys.session,
    queryFn: () => authService.getSession(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
    enabled: typeof window !== 'undefined', // Only run on client side
  });
}

// Sign up mutation
export function useSignUp(options?: {
  onSuccess?: (data: any, variables: RegisterRequest) => void;
  onError?: (error: any) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.signUp(data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: authKeys.session });
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
  });
}

// Sign in mutation
export function useSignIn(options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.signIn(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: authKeys.session });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

// Sign out mutation
export function useSignOut(options?: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      queryClient.setQueryData(authKeys.session, null);
      queryClient.clear();
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
}

// Alias for consistency
export const useLogout = useSignOut;

// Update user mutation
export function useUpdateUser(options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => authService.updateUser(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: authKeys.session });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

// Change password mutation
export function useChangePassword(options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authService.changePassword(data),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// Request password reset mutation
export function useRequestPasswordReset(options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authService.requestPasswordReset(data),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// Reset password mutation
export function useResetPassword(options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// Send verification email mutation
export function useSendVerificationEmail(options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationFn: (email: string) =>
      authService.sendVerificationEmail(email),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
