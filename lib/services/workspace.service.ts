import { apiClient } from "../api-client";
import type {
  MemberRecord,
  WorkspaceSwitchRequest,
  WorkspaceSwitchResponse,
} from "@/types/auth";

export const workspaceService = {
  // Get all churches/branches the user is a member of
  async getUserMemberships(): Promise<MemberRecord[]> {
    const response = await apiClient.get<MemberRecord[]>("/users/me/churches");
    // Handle potential data wrapper from backend
    const result = response.data as any;
    return result.data || result;
  },

  // Switch workspace context
  async switchWorkspace(data: WorkspaceSwitchRequest): Promise<WorkspaceSwitchResponse> {
    const response = await apiClient.post<WorkspaceSwitchResponse>(
      "/users/workspaces/switch",
      data
    );
    // Handle potential data wrapper from backend
    const result = response.data as any;
    return result.data || result;
  },
};
