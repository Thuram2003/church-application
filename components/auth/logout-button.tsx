"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { SignOut } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LogoutButtonProps {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export function LogoutButton({
  variant = "ghost",
  size = "default",
  className,
  showIcon = true,
  children,
}: LogoutButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    
    try {
      await signOut({ redirect: false });
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (error: any) {
      toast.error("Logout failed", {
        description: error.message || "Please try again",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
      disabled={isPending}
    >
      {showIcon && <SignOut className="mr-2 h-4 w-4" />}
      {children || (isPending ? "Logging out..." : "Logout")}
    </Button>
  );
}
