"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider
      // Reduce refetch frequency to avoid excessive API calls
      refetchInterval={5 * 60} // Refetch every 5 minutes instead of default
      refetchOnWindowFocus={false} // Don't refetch on window focus
    >
      {children}
    </NextAuthSessionProvider>
  );
}
