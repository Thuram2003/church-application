import { apiClient } from '../api-client';
import type {
  ApiResponse,
  Group,
  GroupMember,
  CreateGroupRequest,
  AddMemberToGroupRequest,
} from '@/types/groups';

export const groupsService = {
  // GET /api/v1/branches/{branchId}/groups
  async getGroups(branchId: string): Promise<ApiResponse<Group[]>> {
    const response = await apiClient.get<ApiResponse<Group[]>>(
      `/branches/${branchId}/groups`
    );
    return response.data;
  },

  // POST /api/v1/branches/{branchId}/groups
  async createGroup(
    branchId: string,
    data: CreateGroupRequest
  ): Promise<ApiResponse<Group>> {
    const response = await apiClient.post<ApiResponse<Group>>(
      `/branches/${branchId}/groups`,
      data
    );
    return response.data;
  },

  // POST /api/v1/branches/{branchId}/groups/{id}/members
  async addMemberToGroup(
    branchId: string,
    groupId: string,
    data: AddMemberToGroupRequest
  ): Promise<ApiResponse<GroupMember>> {
    const response = await apiClient.post<ApiResponse<GroupMember>>(
      `/branches/${branchId}/groups/${groupId}/members`,
      data
    );
    return response.data;
  },

  // DELETE /api/v1/branches/{branchId}/groups/{id}/members/{memberId}
  async removeMemberFromGroup(
    branchId: string,
    groupId: string,
    memberId: string
  ): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/branches/${branchId}/groups/${groupId}/members/${memberId}`
    );
    return response.data;
  },

  // GET /api/v1/branches/{branchId}/groups/{id}/members
  async getGroupMembers(
    branchId: string,
    groupId: string
  ): Promise<ApiResponse<GroupMember[]>> {
    const response = await apiClient.get<ApiResponse<GroupMember[]>>(
      `/branches/${branchId}/groups/${groupId}/members`
    );
    return response.data;
  },

  // Fetch all groups and filter to those containing the given member
  async getGroupsForMember(
    branchId: string,
    memberId: string
  ): Promise<ApiResponse<(Group & { memberRole: GroupMember })[]>> {
    const groupsResponse = await apiClient.get<ApiResponse<Group[]>>(
      `/branches/${branchId}/groups`
    );
    const groups = groupsResponse.data.data ?? [];

    // Fetch members for all groups in parallel, then filter
    const membershipResults = await Promise.all(
      groups.map(async (g) => {
        try {
          const res = await apiClient.get<ApiResponse<GroupMember[]>>(
            `/branches/${branchId}/groups/${g.id}/members`
          );
          const membership = (res.data.data ?? []).find(
            (m) => m.memberId === memberId
          );
          return membership ? { group: g, membership } : null;
        } catch {
          return null;
        }
      })
    );

    const memberGroups = membershipResults
      .filter((r): r is { group: Group; membership: GroupMember } => r !== null)
      .map(({ group: g, membership }) => ({ ...g, memberRole: membership }));

    return {
      success: true,
      data: memberGroups,
      timestamp: new Date().toISOString(),
    };
  },
};