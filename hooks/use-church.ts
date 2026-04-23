import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useWorkspace } from "./use-workspace";
import { churchService, type UpdateChurchRequest } from "@/lib/services/church.service";
import { toast } from "sonner";

export const churchKeys = {
  all: ["church"] as const,
  detail: (churchId: string) => [...churchKeys.all, churchId] as const,
};

export function useChurch() {
  const { getCurrentWorkspace } = useWorkspace();
  const { churchId } = getCurrentWorkspace();

  return useQuery({
    queryKey: churchKeys.detail(churchId || ""),
    queryFn: () => churchService.getChurch(churchId!),
    enabled: !!churchId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateChurch() {
  const queryClient = useQueryClient();
  const { getCurrentWorkspace } = useWorkspace();
  const { churchId } = getCurrentWorkspace();

  return useMutation({
    mutationFn: (data: UpdateChurchRequest) =>
      churchService.updateChurch(churchId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: churchKeys.detail(churchId || "") });
      toast.success("Church details updated");
    },
    onError: () => {
      toast.error("Failed to update church details");
    },
  });
}
