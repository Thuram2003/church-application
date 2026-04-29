"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  User,
  SignOut as SignOutIcon,
  Buildings,
  CaretDown,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { email } from "zod";

export function AppSidebarUserMenu() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setOpen(false);
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

  const handleProfile = () => {
    setOpen(false);
    router.push("/profile");
  };

  const handleSwitchWorkspace = () => {
    setOpen(false);
    router.push("/workspace-selection");
  };

  // Get user data from session
  const firstName = session?.user?.firstName || "";
  const lastName = session?.user?.lastName || "";
  const userEmail = session?.user?.email || "";
  
  // Build full name
  const fullName = firstName && lastName 
    ? `${firstName} ${lastName}` 
    : session?.user?.name || "User";
  
  // Get initials (first letter of first and last name)
  const initials = firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    : fullName.charAt(0).toUpperCase();

  // Show loading state while session is being fetched
  if (status === "loading") {
    return (
      <div className="w-full px-2 py-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
          <div className="flex-1 min-w-0 space-y-2 group-data-[collapsible=icon]:hidden">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-32" />
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no session
  if (!session) {
    return null;
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-2 py-2 h-auto hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center"
        >
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {initials}
            </span>
          </div>
          <div className="flex-1 min-w-0 text-left group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">
              {fullName}
            </p>
            <p className="text-xs text-sidebar-foreground/70 truncate">
              {userEmail}
            </p>
          </div>
          <CaretDown
            className="w-4 h-4 text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden"
            weight="bold"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="top"
        className="w-56"
        sideOffset={8}
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none ">{fullName}</p>
            <p className="text-xs font-medium leading-none text-gray-400 ">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleSwitchWorkspace}
          className="cursor-pointer"
        >
          <Buildings className="mr-2 h-4 w-4" />
          <span>Switch Workspace</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isPending}
          className="cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-50"
        >
          <SignOutIcon className="mr-2 h-4 w-4 text-red-600" />
          <span>{isPending ? "Logging out..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
