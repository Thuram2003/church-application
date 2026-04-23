import { apiClient } from '../api-client';
import type {
  ApiResponse,
  Branch,
  BranchesListResponse,
  CreateBranchRequest,
  UpdateBranchRequest,
  PaginationQuery,
} from '@/types/branches';

export const branchesService = {
  // GET /api/v1/churches/{churchId}/branches
  async getBranches(
    churchId: string,
    pagination?: PaginationQuery
  ): Promise<ApiResponse<BranchesListResponse>> {
    const params = new URLSearchParams();
    if (pagination?.limit) params.append('limit', pagination.limit.toString());
    if (pagination?.offset) params.append('offset', pagination.offset.toString());
    
    const queryString = params.toString();
    const url = `/churches/${churchId}/branches${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiClient.get<ApiResponse<BranchesListResponse>>(url);
    return response.data;
  },

  // GET /api/v1/churches/{churchId}/branches/{id}
  async getBranch(churchId: string, branchId: string): Promise<ApiResponse<Branch>> {
    const response = await apiClient.get<ApiResponse<Branch>>(
      `/churches/${churchId}/branches/${branchId}`
    );
    return response.data;
  },

  // POST /api/v1/churches/{churchId}/branches
  async createBranch(
    churchId: string,
    data: CreateBranchRequest
  ): Promise<ApiResponse<Branch>> {
    const response = await apiClient.post<ApiResponse<Branch>>(
      `/churches/${churchId}/branches`,
      data
    );
    return response.data;
  },

  // PATCH /api/v1/churches/{churchId}/branches/{id}
  async updateBranch(
    churchId: string,
    branchId: string,
    data: UpdateBranchRequest
  ): Promise<ApiResponse<Branch>> {
    const response = await apiClient.patch<ApiResponse<Branch>>(
      `/churches/${churchId}/branches/${branchId}`,
      data
    );
    return response.data;
  },

  // DELETE /api/v1/churches/{churchId}/branches/{id}
  async deleteBranch(churchId: string, branchId: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/churches/${churchId}/branches/${branchId}`
    );
    return response.data;
  },
};