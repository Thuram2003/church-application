import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { groupsService } from '@/lib/services/groups.service';
import { useWorkspace } from './use-workspace';
import type {
  CreateGroupRequest,
  AddMemberToGroupRequest,
} from '@/types/groups';

// Query keys for caching
export const groupsKeys = {
  all: ['groups'] as const,
  lists: () => [...groupsKeys.all, 'list'] as const,
  list: (branchId: string) => [...groupsKeys.lists(), branchId] as const,
  members: () => [...groupsKeys.all, 'members'] as const,
  groupMembers: (branchId: string, groupId: string) => 
    [...groupsKeys.members(), branchId, groupId] as const,
};

export function useGroups() {
  const { getCurrentWorkspace } = useWorkspace();
  const workspace = getCurrentWorkspace();
  const { branchId } = workspace || {};

  return useQuery({
    queryKey: groupsKeys.list(branchId!),
    queryFn: () => groupsService.getGroups(branchId!),
    enabled: !!branchId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry on error for debugging
  });
}

export function useGroupMembers(groupId: string) {
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useQuery({
    queryKey: groupsKeys.groupMembers(branchId!, groupId),
    queryFn: () => groupsService.getGroupMembers(branchId!, groupId),
    enabled: !!branchId && !!groupId,
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: (data: CreateGroupRequest) => 
      groupsService.createGroup(branchId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupsKeys.lists() });
      toast.success('Group created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create group');
    },
  });
}

export function useAddMemberToGroup() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: ({ groupId, data }: { groupId: string; data: AddMemberToGroupRequest }) =>
      groupsService.addMemberToGroup(branchId!, groupId, data),
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({ queryKey: groupsKeys.lists() });
      queryClient.invalidateQueries({ 
        queryKey: groupsKeys.groupMembers(branchId!, groupId) 
      });
      toast.success('Member added to group successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add member to group');
    },
  });
}

export function useRemoveMemberFromGroup() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: ({ groupId, memberId }: { groupId: string; memberId: string }) =>
      groupsService.removeMemberFromGroup(branchId!, groupId, memberId),
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({ queryKey: groupsKeys.lists() });
      queryClient.invalidateQueries({ 
        queryKey: groupsKeys.groupMembers(branchId!, groupId) 
      });
      toast.success('Member removed from group successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to remove member from group');
    },
  });
}