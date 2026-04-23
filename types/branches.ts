// API Response wrapper - matches backend exactly
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// Pagination metadata - matches backend exactly
export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

// Branch interface matching backend API exactly
export interface Branch {
  id: string;
  name: string;
  churchId: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude?: string;
  longitude?: string;
  phoneNumber: string;
  email: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
}

// Request DTOs matching backend exactly
export interface CreateBranchRequest {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  website: string;
}

export interface UpdateBranchRequest {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
}

// Response types
export interface BranchesListResponse {
  items: Branch[];
  meta: PaginationMeta;
}

export interface PaginationQuery {
  limit?: number;
  offset?: number;
}