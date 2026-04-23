import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;

// Token storage key
const TOKEN_KEY = "auth_token";

// Helper functions for token management
export const tokenManager = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  },
};

// Create axios instance for API calls
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies
});

// Create axios instance for auth calls
export const authClient = axios.create({
  baseURL: AUTH_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get the session from NextAuth to extract the access token
    if (typeof window !== "undefined") {
      try {
        const response = await fetch("/api/auth/session");
        const session = await response.json();
        
        if (session?.user?.accessToken) {
          config.headers.Authorization = `Bearer ${session.user.accessToken}`;
          
          if (process.env.NODE_ENV === 'development') {
            console.log('[API Request]', config.method?.toUpperCase(), config.url);
            console.log('[API Request] Added Bearer token from session');
          }
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.warn('[API Request] No access token found in session');
          }
        }
      } catch (error) {
        console.error('[API Request] Failed to get session:', error);
      }
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Request interceptor for auth client
authClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Better Auth uses cookie-based sessions, so we don't need to add Authorization header
    // The session cookie will be automatically sent with withCredentials: true
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[Auth Request]', config.method?.toUpperCase(), config.url);
      console.log('[Auth Request] Using cookie-based auth (Better Auth)');
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('[Auth Request Error]', error);
    return Promise.reject(error);
  }
);

// Track if we're already redirecting to prevent loops
let isRedirecting = false;

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Response]', response.config.method?.toUpperCase(), response.config.url, '- Status:', response.status);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[API Response Error]', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
    
    if (error.response?.status === 401 && !isRedirecting) {
      // Unauthorized - session expired, force sign out
      isRedirecting = true;
      tokenManager.removeToken();
      
      if (typeof window !== "undefined") {
        // Use NextAuth signOut to properly clear the session
        const { signOut } = await import("next-auth/react");
        await signOut({ callbackUrl: "/login", redirect: true });
      }
    }
    return Promise.reject(error);
  }
);

// Response interceptor for auth client
authClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Auth Response]', response.config.method?.toUpperCase(), response.config.url, '- Status:', response.status);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Auth Response Error]', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
    
    if (error.response?.status === 401) {
      // Unauthorized - session expired
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
