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
};