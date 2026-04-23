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

// Types matching backend member.dto.ts exactly
export type MemberRole = 'admin' | 'pastor' | 'member' | 'overseer';
export type AgeGroup = 'Child' | 'Youth' | 'Adult' | 'Senior';
export type Gender = 'Male' | 'Female' | 'Other';
export type MemberStatus = 'new' | 'old' | 'active' | 'inactive' | 'visitor';

// Member interface matching backend MemberDto exactly
export interface Member {
  id: string;
  churchId: string;
  branchId?: string;
  userId: string;
  familyId?: string;
  role: MemberRole;
  gender: string;
  ageGroup?: string;
  isVisitor: boolean;
  status: string;
  createdAt: string;
  archivedAt?: string;
  user?: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
  };
}

// Request DTOs matching backend exactly
export interface CreateMemberRequest {
  name: string;
  email: string;
  churchId: string;
  branchId?: string;
  role: MemberRole;
  gender?: Gender;
  ageGroup?: AgeGroup;
  visitor?: boolean;
}

export interface CreatePeoplePersonRequest {
  name: string;
  email?: string;
  gender?: Gender;
  ageGroup?: AgeGroup;
  visitor?: boolean;
}

export interface CreatePeopleBulkRequest {
  people: CreatePeoplePersonRequest[];
  branchId?: string;
  defaultRole?: MemberRole;
}

export interface UpdateMemberRequest {
  role?: MemberRole;
  status?: MemberStatus;
  gender?: Gender;
  ageGroup?: AgeGroup;
  isVisitor?: boolean;
}

export interface TransferMemberRequest {
  newBranchId: string;
}

export interface UpdateMemberStatusRequest {
  status: MemberStatus;
}

// Response types
export interface PeopleListResponse {
  items: Member[];
  meta: PaginationMeta;
}

export interface PaginationQuery {
  limit?: number;
  offset?: number;
}

// Bulk create response
export interface BulkCreateResponse {
  created: Member[];
  failed: { name: string; email?: string; reason: string }[];
  count: number;
}
