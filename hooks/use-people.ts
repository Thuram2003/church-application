import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { peopleService } from '@/lib/services/people.service';
import { useWorkspace } from './use-workspace';
import type {
  CreateMemberRequest,
  CreatePeopleBulkRequest,
  UpdateMemberRequest,
  TransferMemberRequest,
  UpdateMemberStatusRequest,
  PaginationQuery,
} from '@/types/people';

// Query keys for caching
export const peopleKeys = {
  all: ['people'] as const,
  lists: () => [...peopleKeys.all, 'list'] as const,
  list: (branchId: string, pagination?: PaginationQuery) => 
    [...peopleKeys.lists(), branchId, pagination] as const,
  details: () => [...peopleKeys.all, 'detail'] as const,
  detail: (branchId: string, memberId: string) => 
    [...peopleKeys.details(), branchId, memberId] as const,
};

export function usePeople(pagination?: PaginationQuery) {
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useQuery({
    queryKey: peopleKeys.list(branchId!, pagination),
    queryFn: () => peopleService.getPeople(branchId!, pagination),
    enabled: !!branchId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on auth errors
      if (error?.response?.status === 401 || error?.response?.status === 403) return false;
      return failureCount < 2;
    },
  });
}

export function usePerson(memberId: string) {
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useQuery({
    queryKey: peopleKeys.detail(branchId!, memberId),
    queryFn: () => peopleService.getPerson(branchId!, memberId),
    enabled: !!branchId && !!memberId,
  });
}

export function useCreatePerson() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: (data: CreateMemberRequest) => 
      peopleService.createPerson(branchId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: peopleKeys.lists() });
      toast.success('Member created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create Member');
    },
  });
}

export function useCreatePeopleBulk() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: (data: CreatePeopleBulkRequest) => 
      peopleService.createPeopleBulk(branchId!, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: peopleKeys.lists() });
      const { created, failed } = response.data;
      if (failed.length > 0) {
        toast.success(`Created ${created.length} people. ${failed.length} failed.`);
      } else {
        toast.success(`Created ${created.length} people successfully`);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create people');
    },
  });
}

export function useUpdatePerson() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: ({ memberId, data }: { memberId: string; data: UpdateMemberRequest }) =>
      peopleService.updatePerson(branchId!, memberId, data),
    onSuccess: (_, { memberId }) => {
      queryClient.invalidateQueries({ queryKey: peopleKeys.lists() });
      queryClient.invalidateQueries({ 
        queryKey: peopleKeys.detail(branchId!, memberId) 
      });
      toast.success('Person updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update person');
    },
  });
}

export function useTransferPerson() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: ({ memberId, data }: { memberId: string; data: TransferMemberRequest }) =>
      peopleService.transferPerson(branchId!, memberId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: peopleKeys.lists() });
      toast.success('Person transferred successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to transfer person');
    },
  });
}

export function useUpdatePersonStatus() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: ({ memberId, data }: { memberId: string; data: UpdateMemberStatusRequest }) =>
      peopleService.updatePersonStatus(branchId!, memberId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: peopleKeys.lists() });
      toast.success('Person status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update person status');
    },
  });
}

export function useDeletePerson() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: (memberId: string) => 
      peopleService.deletePerson(branchId!, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: peopleKeys.lists() });
      toast.success('Person deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete person');
    },
  });
}