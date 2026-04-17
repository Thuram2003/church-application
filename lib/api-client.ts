import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

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
    // Get session from NextAuth
    const session = await getSession();
    
    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[API Request]', config.method?.toUpperCase(), config.url);
        console.log('[API Request] Token from session:', session.user.accessToken.substring(0, 20) + '...');
      }
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('[API Request]', config.method?.toUpperCase(), config.url, '- No session found');
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Request interceptor for auth client
authClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get session from NextAuth
    const session = await getSession();
    
    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth Request]', config.method?.toUpperCase(), config.url);
        console.log('[Auth Request] Token from session:', session.user.accessToken.substring(0, 20) + '...');
        console.log('[Auth Request] Headers:', {
          Authorization: 'Bearer ***',
          'Content-Type': config.headers['Content-Type'],
        });
      }
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('[Auth Request]', config.method?.toUpperCase(), config.url, '- No session found');
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      tokenManager.removeToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Response interceptor for auth client
authClient.interceptors.response.use(
  (response) => {
    // Note: Token is now managed by NextAuth, not localStorage
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - session expired
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
