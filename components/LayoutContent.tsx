"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BrandedLoader } from "@/components/ui/loader";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Show loader only while session is resolving on first load
  if (status === "loading") {
    return <BrandedLoader text="Loading your workspace..." />;
  }

  const isAuthenticated = !!session?.user;
  const hasWorkspace = !!session?.user?.churchId && !!session?.user?.branchId;

  const shouldHideSidebar =
    pathname === "/onboarding" ||
    pathname === "/workspace-selection" ||
    pathname?.startsWith("/(auth)") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/forgot-password") ||
    pathname?.startsWith("/verify") ||
    pathname === "/" ||
    !isAuthenticated ||
    !hasWorkspace;

  if (shouldHideSidebar) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 overflow-auto bg-page-bg">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
