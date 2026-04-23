import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { branchesService } from '@/lib/services/branches.service';
import { useWorkspace } from './use-workspace';
import type {
  CreateBranchRequest,
  UpdateBranchRequest,
  PaginationQuery,
} from '@/types/branches';
import { toast } from 'sonner';

// Query keys
export const branchesKeys = {
  all: ['branches'] as const,
  lists: () => [...branchesKeys.all, 'list'] as const,
  list: (churchId: string, pagination?: PaginationQuery) =>
    [...branchesKeys.lists(), churchId, pagination] as const,
  details: () => [...branchesKeys.all, 'detail'] as const,
  detail: (churchId: string, branchId: string) =>
    [...branchesKeys.details(), churchId, branchId] as const,
};

const noRetryOnAuth = (failureCount: number, error: any) => {
  if (error?.response?.status === 401 || error?.response?.status === 403) return false;
  return failureCount < 2;
};

export function useBranches(pagination?: PaginationQuery) {
  const { getCurrentWorkspace } = useWorkspace();
  const { churchId } = getCurrentWorkspace();

  return useQuery({
    queryKey: branchesKeys.list(churchId || 'no-church', pagination),
    queryFn: () => branchesService.getBranches(churchId!, pagination),
    enabled: !!churchId,
    staleTime: 5 * 60 * 1000,
    retry: noRetryOnAuth,
  });
}

export function useBranch(branchId: string) {
  const { getCurrentWorkspace } = useWorkspace();
  const { churchId } = getCurrentWorkspace();

  return useQuery({
    queryKey: branchesKeys.detail(churchId!, branchId),
    queryFn: () => branchesService.getBranch(churchId!, branchId),
    enabled: !!churchId && !!branchId,
    retry: noRetryOnAuth,
  });
}

export function useCreateBranch() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { churchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: (data: CreateBranchRequest) => branchesService.createBranch(churchId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchesKeys.lists() });
      toast.success('Branch created successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create branch');
    },
  });
}

export function useUpdateBranch(branchId: string) {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { churchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: (data: UpdateBranchRequest) => branchesService.updateBranch(churchId!, branchId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: branchesKeys.detail(churchId!, branchId) });
      toast.success('Branch updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update branch');
    },
  });
}

export function useDeleteBranch() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { churchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: (branchId: string) => branchesService.deleteBranch(churchId!, branchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchesKeys.lists() });
      toast.success('Branch deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete branch');
    },
  });
}
