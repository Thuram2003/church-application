"use client";

import { Inter } from "next/font/google"; // Changed from Geist
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const inter = Inter({
  variable: "--font-inter", // Changed variable name
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Inter needs explicit weights
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isOnboarding = pathname === "/onboarding";
  const isAuthPage = pathname?.startsWith("/login") || 
                     pathname?.startsWith("/register") || 
                     pathname?.startsWith("/forgot-password") ||
                     pathname === "/";

  // Pages without sidebar
  if (isOnboarding || isAuthPage) {
    return (
      <html
        lang="en"
        className={`${inter.variable} h-full antialiased`} // Updated
      >
        <head>
          <title>Movementz - Church Management System</title>
          <meta name="description" content="Comprehensive church management platform for member tracking, giving, events, and more" />
        </head>
        <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`} // Updated
    >
      <head>
        <title>Movementz - Church Management System</title>
        <meta name="description" content="Comprehensive church management platform for member tracking, giving, events, and more" />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <SidebarInset>
            <main className="flex-1 overflow-auto bg-page-bg">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}