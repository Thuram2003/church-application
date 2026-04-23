"use client";

import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "sonner";
import { LayoutContent } from "@/components/LayoutContent";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </QueryProvider>
    </SessionProvider>
  );
}
