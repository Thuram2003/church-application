// API Response wrapper - matches backend exactly
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// Family Member Role enum matching backend exactly
export type FamilyMemberRole = 
  | 'Head of House'
  | 'Spouse'
  | 'Child'
  | 'Relative'
  | 'Other';

// Family interface matching backend FamilyDto exactly
export interface Family {
  id: string;
  name: string;
  churchId: string;
  branchId?: string;
  headOfHouseId?: string;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
}

// Family Member interface for linking members to families
export interface FamilyMember {
  familyId: string;
  memberId: string;
  familyRole: FamilyMemberRole;
  joinedAt: string;
}

// Request DTOs matching backend exactly
export interface CreateFamilyRequest {
  name: string;
  branchId?: string;
  headOfHouseId?: string;
  members?: CreateFamilyMemberRow[];
}

export interface CreateFamilyMemberRow {
  memberId: string;
  familyRole: FamilyMemberRole;
}

export interface UpdateFamilyRequest {
  name?: string;
  branchId?: string;
}

export interface AddMemberToFamilyRequest {
  memberId: string;
  familyRole: FamilyMemberRole;
}

export interface AssignHeadOfHouseRequest {
  memberId: string;
}

// Extended Family interface for UI (includes member stats and head of house info)
export interface FamilyWithStats extends Family {
  memberCount?: number;
  childrenCount?: number;
  adultsCount?: number;
  eldersCount?: number;
  headOfHouse?: {
    id: string;
    name: string;
    email?: string;
  };
  members?: Array<{
    id: string;
    name: string;
    familyRole: FamilyMemberRole;
    ageGroup?: string;
  }>;
}

// Table data type for families table
export interface FamilyTableData extends FamilyWithStats {
  totalMembers: number;
  adults: number;
  children: number;
  elders: number;
  status: string;
}