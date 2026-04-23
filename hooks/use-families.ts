import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { familiesService } from '@/lib/services/families.service';
import { useWorkspace } from './use-workspace';
import type {
  CreateFamilyRequest,
  UpdateFamilyRequest,
  AddMemberToFamilyRequest,
  AssignHeadOfHouseRequest,
} from '@/types/families';

// Query keys for caching
export const familiesKeys = {
  all: ['families'] as const,
  lists: () => [...familiesKeys.all, 'list'] as const,
  list: (branchId: string) => [...familiesKeys.lists(), branchId] as const,
  detail: (branchId: string, familyId: string) => 
    [...familiesKeys.all, 'detail', branchId, familyId] as const,
};

export function useFamilies(params?: { limit?: number; offset?: number }) {
  const { getCurrentWorkspace } = useWorkspace();
  const workspace = getCurrentWorkspace();
  const { branchId } = workspace || {};

  return useQuery({
    queryKey: familiesKeys.list(branchId!),
    queryFn: () => familiesService.getFamilies(branchId!, params),
    enabled: !!branchId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry on error for debugging
  });
}

export function useFamily(familyId: string) {
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useQuery({
    queryKey: familiesKeys.detail(branchId!, familyId),
    queryFn: () => familiesService.getFamily(branchId!, familyId),
    enabled: !!branchId && !!familyId,
  });
}

export function useCreateFamily() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: (data: CreateFamilyRequest) => 
      familiesService.createFamily(branchId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: familiesKeys.lists() });
      toast.success('Family created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create family');
    },
  });
}

export function useUpdateFamily() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: ({ familyId, data }: { familyId: string; data: UpdateFamilyRequest }) =>
      familiesService.updateFamily(branchId!, familyId, data),
    onSuccess: (_, { familyId }) => {
      queryClient.invalidateQueries({ queryKey: familiesKeys.lists() });
      queryClient.invalidateQueries({ 
        queryKey: familiesKeys.detail(branchId!, familyId) 
      });
      toast.success('Family updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update family');
    },
  });
}

export function useDeleteFamily() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: (familyId: string) =>
      familiesService.deleteFamily(branchId!, familyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: familiesKeys.lists() });
      toast.success('Family deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete family');
    },
  });
}

export function useAssignHeadOfHouse() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: ({ familyId, data }: { familyId: string; data: AssignHeadOfHouseRequest }) =>
      familiesService.assignHeadOfHouse(branchId!, familyId, data),
    onSuccess: (_, { familyId }) => {
      queryClient.invalidateQueries({ queryKey: familiesKeys.lists() });
      queryClient.invalidateQueries({ 
        queryKey: familiesKeys.detail(branchId!, familyId) 
      });
      toast.success('Head of house assigned successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to assign head of house');
    },
  });
}

export function useAddMemberToFamily() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: ({ familyId, data }: { familyId: string; data: AddMemberToFamilyRequest }) =>
      familiesService.addMemberToFamily(branchId!, familyId, data),
    onSuccess: (_, { familyId }) => {
      queryClient.invalidateQueries({ queryKey: familiesKeys.lists() });
      queryClient.invalidateQueries({ 
        queryKey: familiesKeys.detail(branchId!, familyId) 
      });
      toast.success('Member added to family successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add member to family');
    },
  });
}

export function useRemoveMemberFromFamily() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: ({ familyId, memberId }: { familyId: string; memberId: string }) =>
      familiesService.removeMemberFromFamily(branchId!, familyId, memberId),
    onSuccess: (_, { familyId }) => {
      queryClient.invalidateQueries({ queryKey: familiesKeys.lists() });
      queryClient.invalidateQueries({ 
        queryKey: familiesKeys.detail(branchId!, familyId) 
      });
      toast.success('Member removed from family successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to remove member from family');
    },
  });
}