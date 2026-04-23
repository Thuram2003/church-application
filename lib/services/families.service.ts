import { apiClient } from '../api-client';
import type {
  ApiResponse,
  Family,
  FamilyWithStats,
  CreateFamilyRequest,
  UpdateFamilyRequest,
  AddMemberToFamilyRequest,
  AssignHeadOfHouseRequest,
} from '@/types/families';

export const familiesService = {
  // GET /api/v1/branches/{branchId}/families
  async getFamilies(
    branchId: string,
    params?: { limit?: number; offset?: number }
  ): Promise<ApiResponse<{ items: FamilyWithStats[]; total: number }>> {
    const response = await apiClient.get<ApiResponse<{ items: FamilyWithStats[]; total: number }>>(
      `/branches/${branchId}/families`,
      { params }
    );
    return response.data;
  },

  // GET /api/v1/branches/{branchId}/families/{id}
  async getFamily(
    branchId: string,
    familyId: string
  ): Promise<ApiResponse<FamilyWithStats>> {
    const response = await apiClient.get<ApiResponse<FamilyWithStats>>(
      `/branches/${branchId}/families/${familyId}`
    );
    return response.data;
  },

  // POST /api/v1/branches/{branchId}/families
  async createFamily(
    branchId: string,
    data: CreateFamilyRequest
  ): Promise<ApiResponse<Family>> {
    const response = await apiClient.post<ApiResponse<Family>>(
      `/branches/${branchId}/families`,
      data
    );
    return response.data;
  },

  // PATCH /api/v1/branches/{branchId}/families/{id}
  async updateFamily(
    branchId: string,
    familyId: string,
    data: UpdateFamilyRequest
  ): Promise<ApiResponse<Family>> {
    const response = await apiClient.patch<ApiResponse<Family>>(
      `/branches/${branchId}/families/${familyId}`,
      data
    );
    return response.data;
  },

  // DELETE /api/v1/branches/{branchId}/families/{id}
  async deleteFamily(
    branchId: string,
    familyId: string
  ): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/branches/${branchId}/families/${familyId}`
    );
    return response.data;
  },

  // PATCH /api/v1/branches/{branchId}/families/{id}/head-of-house
  async assignHeadOfHouse(
    branchId: string,
    familyId: string,
    data: AssignHeadOfHouseRequest
  ): Promise<ApiResponse<void>> {
    const response = await apiClient.patch<ApiResponse<void>>(
      `/branches/${branchId}/families/${familyId}/head-of-house`,
      data
    );
    return response.data;
  },

  // POST /api/v1/branches/{branchId}/families/{id}/members
  async addMemberToFamily(
    branchId: string,
    familyId: string,
    data: AddMemberToFamilyRequest
  ): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>(
      `/branches/${branchId}/families/${familyId}/members`,
      data
    );
    return response.data;
  },

  // DELETE /api/v1/branches/{branchId}/families/{id}/members/{memberId}
  async removeMemberFromFamily(
    branchId: string,
    familyId: string,
    memberId: string
  ): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/branches/${branchId}/families/${familyId}/members/${memberId}`
    );
    return response.data;
  },
};