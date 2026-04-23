// API Response wrapper - matches backend exactly
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// Types matching backend group.dto.ts exactly
export type GroupVisibility = 'private' | 'public' | 'team';
export type GroupEnrollment = 'open' | 'closed';

// Group interface matching backend GroupDto exactly
export interface Group {
  id: string;
  name: string;
  description?: string;
  churchId: string;
  branchId?: string;
  visibility: GroupVisibility;
  enrollment: GroupEnrollment;
  location?: string;
  meetupSummary?: string;
  iconUrl?: string;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
}

// Group Member interface matching backend GroupMemberDto exactly
export interface GroupMember {
  groupId: string;
  memberId: string;
  joinedAt: string;
  isLeader: boolean;
  addedByUserId?: string;
}

// Request DTOs matching backend exactly
export interface CreateGroupRequest {
  name: string;
  description?: string;
  branchId?: string;
  visibility?: GroupVisibility;
  enrollment?: GroupEnrollment;
  location?: string;
  meetupSummary?: string;
  iconUrl?: string;
  leaderMemberId?: string;
}

export interface AddMemberToGroupRequest {
  memberId: string;
  isLeader?: boolean;
}

// Extended Group interface for UI (includes member count)
export interface GroupWithStats extends Group {
  memberCount?: number;
  leadersCount?: number;
}