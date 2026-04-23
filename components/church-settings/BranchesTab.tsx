"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Phone, Envelope, PencilSimple, Trash } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThree } from "@phosphor-icons/react";
import { BranchFormDialog } from "./BranchFormDialog";
import { DeleteBranchDialog } from "./DeleteBranchDialog";
import { useBranches, useCreateBranch, useUpdateBranch, useDeleteBranch } from "@/hooks/use-branches";
import { useWorkspace } from "@/hooks/use-workspace";
import type { Branch, CreateBranchRequest, UpdateBranchRequest } from "@/types/branches";

export function BranchesTab() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | undefined>();

  // Queries and mutations
  const { data: branchesResponse, isLoading, error } = useBranches();
  const { getCurrentWorkspace } = useWorkspace();
  const { branchId: currentBranchId } = getCurrentWorkspace();
  const createBranchMutation = useCreateBranch();
  const updateBranchMutation = useUpdateBranch(selectedBranch?.id || "");
  const deleteBranchMutation = useDeleteBranch();

  const branches = branchesResponse?.data?.items || [];

  // Handlers
  const handleCreateBranch = async (data: CreateBranchRequest | UpdateBranchRequest) => {
    try {
      await createBranchMutation.mutateAsync(data as CreateBranchRequest);
      setIsCreateDialogOpen(false);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleUpdateBranch = async (data: CreateBranchRequest | UpdateBranchRequest) => {
    if (!selectedBranch) return;
    try {
      await updateBranchMutation.mutateAsync(data as UpdateBranchRequest);
      setIsEditDialogOpen(false);
      setSelectedBranch(undefined);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleDeleteBranch = async () => {
    if (!selectedBranch) return;
    try {
      await deleteBranchMutation.mutateAsync(selectedBranch.id);
      setIsDeleteDialogOpen(false);
      setSelectedBranch(undefined);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleEditClick = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsDeleteDialogOpen(true);
  };

  if (error) {
    console.error('[BranchesTab] Error details:', error);
    
    // Check if it's an authentication error
    const isAuthError = (error as any)?.response?.status === 401;
    const isWorkspaceError = error?.message?.includes('No church ID available');
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Branches</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your church locations and branches
            </p>
          </div>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            {isAuthError ? (
              <>
                <p className="text-sm text-red-600 text-center mb-2">
                  Authentication required
                </p>
                <p className="text-xs text-gray-500 text-center mb-4">
                  Please log in to access branches
                </p>
                <Button onClick={() => window.location.href = '/login'}>
                  Go to Login
                </Button>
              </>
            ) : isWorkspaceError ? (
              <>
                <p className="text-sm text-red-600 text-center mb-2">
                  Workspace not selected
                </p>
                <p className="text-xs text-gray-500 text-center mb-4">
                  Please select a workspace to manage branches
                </p>
                <Button onClick={() => window.location.href = '/workspace-selection'}>
                  Select Workspace
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm text-red-600 text-center mb-2">
                  Failed to load branches
                </p>
                <p className="text-xs text-gray-500 text-center">
                  {error?.message || 'Please try again later.'}
                </p>
              </>
            )}
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-xs text-gray-400">
                <summary>Debug Info</summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded text-left overflow-auto max-w-full">
                  {JSON.stringify(error, null, 2)}
                </pre>
              </details>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Branches</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage your church locations and branches
          </p>
        </div>
        <Button
          size="sm"
          className="gap-1.5 h-8 text-sm px-3"
          onClick={() => setIsCreateDialogOpen(true)}
          disabled={isLoading}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Branch
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden flex items-stretch">
              <div className="w-1 bg-gray-200 flex-shrink-0" />
              <div className="flex-1 px-5 py-4 space-y-3 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-200 rounded-lg flex-shrink-0" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-32 bg-gray-200 rounded" />
                    <div className="h-3 w-20 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="border-t border-gray-100" />
                <div className="flex gap-6">
                  <div className="h-3 w-28 bg-gray-100 rounded" />
                  <div className="h-3 w-36 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : branches.length > 0 ? (
        <div className="grid gap-3">
          {branches.map((branch) => (
            <Card key={branch.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-stretch">
                  {/* Left accent bar */}
                  <div className="w-1 bg-primary/70 flex-shrink-0 rounded-l-xl" />

                  <div className="flex-1 px-5 py-4">
                    <div className="flex items-start justify-between gap-4">
                      {/* Icon + Name + Location */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 bg-primary/10 rounded-lg flex-shrink-0">
                          <MapPin className="w-4 h-4 text-primary" weight="fill" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-gray-900 leading-tight">{branch.name}</h3>
                            {branch.id === currentBranchId && (
                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-0">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{branch.city}, {branch.state}</p>
                        </div>
                      </div>

                      {/* Actions menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md flex-shrink-0">
                            <DotsThree className="w-4 h-4" weight="bold" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                          <DropdownMenuItem onClick={() => handleEditClick(branch)} className="gap-2 text-sm">
                            <PencilSimple className="w-3.5 h-3.5" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(branch)}
                            className="gap-2 text-sm text-red-600 focus:text-red-600 focus:bg-red-50"
                          >
                            <Trash className="w-3.5 h-3.5" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-3" />

                    {/* Contact info */}
                    <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{branch.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Envelope className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{branch.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-gray-200 rounded-xl px-6 py-10 flex flex-col items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-400" weight="fill" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">No branches yet</p>
            <p className="text-xs text-gray-400 mt-0.5">Add your first branch to manage multiple locations</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-3.5 h-3.5" />
            Add Branch
          </Button>
        </div>
      )}

      {/* Dialogs */}
      <BranchFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateBranch}
        isLoading={createBranchMutation.isPending}
      />

      <BranchFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleUpdateBranch}
        branch={selectedBranch}
        isLoading={updateBranchMutation.isPending}
      />

      <DeleteBranchDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteBranch}
        branch={selectedBranch}
        isLoading={deleteBranchMutation.isPending}
      />
    </div>
  );
}
