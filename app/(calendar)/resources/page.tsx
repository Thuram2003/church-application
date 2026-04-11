"use client";

import {
  Package,
  CaretDown,
  MagnifyingGlass,
  DotsThree,
  ArrowsDownUp,
} from "@phosphor-icons/react";
import { useState } from "react";
import { StatCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/EmptyState";
import { CreateResourceDialog } from "@/components/calendar/CreateResourceDialog";
import { DataTable } from "@/components/ui/data-table";
import { resourcesColumns, type Resource } from "@/components/calendar/tables/resources-columns";

// Mock data - empty for now
const resources: Resource[] = [];

type FilterTab = "all" | "status" | "quantity";

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedResources, setSelectedResources] = useState<Resource[]>([]);

  const totalResources = resources.length;
  const requiresApproval = resources.filter((r) => r.requiresApproval).length;

  const handleCreateResource = (data: any) => {
    console.log("Creating resource:", data);
    // API call here
  };

  const handleSelectionChange = (selected: Resource[]) => {
    setSelectedResources(selected);
    console.log("Selected resources:", selected);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Package className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Resources</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Split Button */}
          <div className="flex items-center">
            <Button
              className="rounded-r-none"
              size="sm"
              onClick={() => setShowCreateDialog(true)}
            >
              Create new
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-l-none border-l border-white/20"
                  size="sm"
                >
                  <CaretDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setShowCreateDialog(true)}>
                  Create new
                </DropdownMenuItem>
                <DropdownMenuItem>Import resources</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant="ghost" size="icon">
            <DotsThree className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {resources.length === 0 ? (
        /* Empty State */
        <EmptyState
          title="Manage Your Equipment"
          description="Create resources to track your organization's equipment, supplies, and other reservable items with approval workflows."
          actionLabel="Create Your First Resource"
          onAction={() => setShowCreateDialog(true)}
        />
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              icon={Package}
              label="Resources"
              value={totalResources.toString()}
            />
            <StatCard
              icon={Package}
              label="Requires Approval"
              value={requiresApproval.toString()}
            />
          </div>

          {/* Filters and Search */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Package className="w-4 h-4" />
                  Status
                  <CaretDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Allowed</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Package className="w-4 h-4" />
                  Quantity
                  <CaretDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>In Stock</DropdownMenuItem>
                <DropdownMenuItem>Low Stock</DropdownMenuItem>
                <DropdownMenuItem>Out of Stock</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Data Table */}
          <DataTable
            columns={resourcesColumns}
            data={resources}
            searchKey="name"
            searchValue={searchQuery}
            onSelectionChange={handleSelectionChange}
          />
        </>
      )}

      {/* Create Resource Dialog */}
      <CreateResourceDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateResource}
      />
    </div>
  );
}
