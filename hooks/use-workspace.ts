import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function useWorkspace() {
  const router = useRouter();
  const { data: session, update } = useSession();

  const switchWorkspace = async (branchId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/workspaces/switch`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ branchId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to switch workspace");
      }

      const result = await response.json();
      const data = result.data || result;

      // Update NextAuth session with workspace context
      await update({
        churchId: data.churchId,
        branchId: branchId,
        role: data.role,
        memberId: data.memberId,
      });

      return data;
    } catch (error: any) {
      console.error("[Workspace] Failed to switch workspace:", error);
      throw error;
    }
  };

  const navigateToWorkspaceSelection = () => {
    router.push("/workspace-selection");
  };

  const getCurrentWorkspace = () => {
    return {
      churchId: session?.user?.churchId,
      branchId: session?.user?.branchId,
      role: session?.user?.role,
    };
  };

  return {
    switchWorkspace,
    navigateToWorkspaceSelection,
    getCurrentWorkspace,
    session,
  };
}
