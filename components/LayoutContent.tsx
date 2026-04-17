"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useSession } from "@/hooks/use-auth";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, isLoading } = useSession();

  const isOnboarding = pathname === "/onboarding";
  const isAuthPage = pathname?.startsWith("/login") || 
                     pathname?.startsWith("/register") || 
                     pathname?.startsWith("/forgot-password") ||
                     pathname?.startsWith("/verify") ||
                     pathname === "/";

  // Check if user is authenticated
  const isAuthenticated = !!session?.user;

  // Pages without sidebar: auth pages, onboarding, or any page when not authenticated
  const shouldHideSidebar = isOnboarding || isAuthPage || !isAuthenticated;

  if (shouldHideSidebar) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 overflow-auto bg-page-bg">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
