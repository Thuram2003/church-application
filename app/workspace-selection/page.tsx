"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { EmptyWorkspaceState, WorkspaceList } from "@/components/workspace-selection";
import { useWorkspace } from "@/hooks/use-workspace";
import { WorkspaceListSkeleton } from "@/components/ui/skeleton";
import type { GroupedChurch, MemberRecord } from "@/types/auth";

export default function WorkspaceSelectionPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { switchWorkspace } = useWorkspace();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMemberships, setIsFetchingMemberships] = useState(true);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [memberRecords, setMemberRecords] = useState<MemberRecord[]>([]);

  // Fetch user's church memberships on mount
  useEffect(() => {
    const fetchMemberships = async () => {
      if (status !== "authenticated" || !session?.user?.accessToken) {
        return;
      }

      try {
        console.log("[Workspace Selection] Fetching user memberships...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me/churches`,
          {
            credentials: 'include', // Send cookies with the request (Better Auth session)
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch memberships");
        }

        const data = await response.json();
        console.log("[Workspace Selection] Memberships response:", data);

        // Handle different response structures
        let records: MemberRecord[] = [];
        if (data.data) {
          records = data.data;
        } else if (Array.isArray(data)) {
          records = data;
        }

        console.log("[Workspace Selection] Parsed member records count:", records.length);
        setMemberRecords(records);
      } catch (error: any) {
        console.error("[Workspace Selection] Error fetching memberships:", error);
        toast.error("Failed to load workspaces", {
          description: error.message || "Please try again",
        });
      } finally {
        setIsFetchingMemberships(false);
      }
    };

    fetchMemberships();
  }, [status, session?.user?.accessToken]);

  // Group member records by church
  const groupedChurches = useMemo(() => {
    console.log("[Workspace Selection] Grouping member records:", memberRecords);
    console.log("[Workspace Selection] Member records count:", memberRecords.length);
    
    const churchMap = new Map<string, GroupedChurch>();
    
    memberRecords.forEach((member) => {
      const churchId = member.churchId;
      
      if (!churchMap.has(churchId)) {
        churchMap.set(churchId, {
          church: member.church,
          branches: [],
        });
      }
      
      // Only add branch-specific memberships (skip church-wide roles with branchId: null)
      if (member.branchId && member.branch) {
        churchMap.get(churchId)!.branches.push({
          id: member.branch.id,
          name: member.branch.name,
          city: member.branch.city,
          memberRole: member.role,
          memberId: member.id,
        });
      }
    });
    
    const grouped = Array.from(churchMap.values());
    console.log("[Workspace Selection] Grouped churches:", grouped);
    return grouped;
  }, [memberRecords]);

  // Don't auto-redirect if user already has workspace - they might be switching
  // useEffect(() => {
  //   if (status === "authenticated" && session?.user?.churchId && session?.user?.branchId) {
  //     console.log("[Workspace Selection] Workspace already selected, redirecting to home");
  //     router.push("/home");
  //   }
  // }, [status, session?.user?.churchId, session?.user?.branchId, router]);

  const handleSelectWorkspace = async (branchId: string) => {
    // If clicking current workspace, just redirect to home
    if (branchId === session?.user?.branchId) {
      toast.info("Already in this workspace", {
        description: "Redirecting to dashboard...",
      });
      router.push("/home");
      return;
    }

    setIsLoading(true);
    setSelectedBranchId(branchId);
    
    try {
      console.log("[Workspace Selection] Switching to branch:", branchId);
      
      await switchWorkspace(branchId);

      toast.success("Workspace selected!", {
        description: "Redirecting to dashboard...",
      });

      // Redirect to home
      router.push("/home");
      router.refresh();
    } catch (error: any) {
      console.error("[Workspace Selection] Failed to switch workspace:", error);
      toast.error("Failed to select workspace", {
        description: error.message || "Please try again",
      });
    } finally {
      setIsLoading(false);
      setSelectedBranchId(null);
    }
  };

  const handleCreateChurch = () => {
    router.push("/onboarding");
  };

  // Show loading while checking session or fetching memberships
  if (status === "loading" || isFetchingMemberships) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
        <WorkspaceListSkeleton />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
      {groupedChurches.length === 0 ? (
        <EmptyWorkspaceState 
          onCreateChurch={handleCreateChurch}
          isLoading={isLoading}
        />
      ) : (
        <WorkspaceList
          groupedChurches={groupedChurches}
          onSelectWorkspace={handleSelectWorkspace}
          isLoading={isLoading}
          selectedBranchId={selectedBranchId}
          currentBranchId={session?.user?.branchId}
        />
      )}
    </div>
  );
}
