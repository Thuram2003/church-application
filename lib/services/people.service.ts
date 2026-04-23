import { apiClient } from '../api-client';
import type {
  ApiResponse,
  Member,
  PeopleListResponse,
  CreateMemberRequest,
  CreatePeopleBulkRequest,
  UpdateMemberRequest,
  TransferMemberRequest,
  UpdateMemberStatusRequest,
  PaginationQuery,
  BulkCreateResponse,
} from '@/types/people';

export const peopleService = {
  // GET /api/v1/branches/{branchId}/members
  async getPeople(
    branchId: string,
    pagination?: PaginationQuery
  ): Promise<ApiResponse<PeopleListResponse>> {
    const params = new URLSearchParams();
    if (pagination?.limit) params.append('limit', pagination.limit.toString());
    if (pagination?.offset) params.append('offset', pagination.offset.toString());
    
    const queryString = params.toString();
    const url = `/branches/${branchId}/members${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiClient.get<ApiResponse<PeopleListResponse>>(url);
    return response.data;
  },

  // GET /api/v1/branches/{branchId}/members/{memberId}
  async getPerson(branchId: string, memberId: string): Promise<ApiResponse<Member>> {
    const response = await apiClient.get<ApiResponse<Member>>(
      `/branches/${branchId}/members/${memberId}`
    );
    return response.data;
  },

  // POST /api/v1/branches/{branchId}/members
  async createPerson(
    branchId: string,
    data: CreateMemberRequest
  ): Promise<ApiResponse<Member>> {
    const response = await apiClient.post<ApiResponse<Member>>(
      `/branches/${branchId}/members`,
      data
    );
    return response.data;
  },

  // POST /api/v1/branches/{branchId}/members/bulk
  async createPeopleBulk(
    branchId: string,
    data: CreatePeopleBulkRequest
  ): Promise<ApiResponse<BulkCreateResponse>> {
    const response = await apiClient.post<ApiResponse<BulkCreateResponse>>(
      `/branches/${branchId}/members/bulk`,
      data
    );
    return response.data;
  },

  // PATCH /api/v1/branches/{branchId}/members/{memberId}
  async updatePerson(
    branchId: string,
    memberId: string,
    data: UpdateMemberRequest
  ): Promise<ApiResponse<Member>> {
    const response = await apiClient.patch<ApiResponse<Member>>(
      `/branches/${branchId}/members/${memberId}`,
      data
    );
    return response.data;
  },

  // PATCH /api/v1/branches/{branchId}/members/{memberId}/transfer
  async transferPerson(
    branchId: string,
    memberId: string,
    data: TransferMemberRequest
  ): Promise<ApiResponse<Member>> {
    const response = await apiClient.patch<ApiResponse<Member>>(
      `/branches/${branchId}/members/${memberId}/transfer`,
      data
    );
    return response.data;
  },

  // PUT /api/v1/branches/{branchId}/members/{memberId}/status
  async updatePersonStatus(
    branchId: string,
    memberId: string,
    data: UpdateMemberStatusRequest
  ): Promise<ApiResponse<Member>> {
    const response = await apiClient.put<ApiResponse<Member>>(
      `/branches/${branchId}/members/${memberId}/status`,
      data
    );
    return response.data;
  },

  // DELETE /api/v1/branches/{branchId}/members/{memberId}
  async deletePerson(branchId: string, memberId: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/branches/${branchId}/members/${memberId}`
    );
    return response.data;
  },

  // PATCH /api/v1/branches/{branchId}/members/{memberId}/restore
  async restorePerson(branchId: string, memberId: string): Promise<ApiResponse<Member>> {
    const response = await apiClient.patch<ApiResponse<Member>>(
      `/branches/${branchId}/members/${memberId}/restore`
    );
    return response.data;
  },
};