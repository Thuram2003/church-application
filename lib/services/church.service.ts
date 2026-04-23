import { apiClient } from "../api-client";

export interface ChurchDetails {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  denomination: string | null;
  metadata: string | null;
  createdAt: string;
  archivedAt: string | null;
}

export interface UpdateChurchRequest {
  name?: string;
  logo?: string;
  denomination?: string;
  metadata?: string;
}

export const churchService = {
  async getChurch(churchId: string): Promise<ChurchDetails> {
    const response = await apiClient.get<ChurchDetails>(`/churches/${churchId}`);
    const result = response.data as any;
    return result.data || result;
  },

  async updateChurch(churchId: string, data: UpdateChurchRequest): Promise<ChurchDetails> {
    const response = await apiClient.patch<ChurchDetails>(`/churches/${churchId}`, data);
    const result = response.data as any;
    return result.data || result;
  },
};
