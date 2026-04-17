"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "sonner";
import { LayoutContent } from "../components/LayoutContent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <title>Movementz - Church Management System</title>
        <meta name="description" content="Comprehensive church management platform for member tracking, giving, events, and more" />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <SessionProvider>
          <QueryProvider>
            <AuthProvider>
              <LayoutContent>{children}</LayoutContent>
              <Toaster position="top-right" richColors />
            </AuthProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}