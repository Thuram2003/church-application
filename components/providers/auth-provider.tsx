"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSession } from "@/hooks/use-auth";
import type { SessionResponse } from "@/types/auth";

interface AuthContextType {
  session: SessionResponse | null | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isLoading } = useSession();

  const value: AuthContextType = {
    session: session,
    isLoading,
    isAuthenticated: !!session?.user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
