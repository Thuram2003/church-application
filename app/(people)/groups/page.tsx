"use client";

import {
  UsersThree,
  MagnifyingGlass,
  ArrowsDownUp,
  LockKey,
  Globe,
  UsersFour,
} from "@phosphor-icons/react";
import { useState } from "react";
import { StatCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateGroupDialog } from "@/components/people/CreateGroupDialog";
import { DataTable } from "@/components/ui/data-table";
import { groupsColumns, type GroupTableData } from "@/components/people/tables/groups-columns";
import { StatCardsSkeleton, TableSkeleton } from "@/components/ui/skeleton";
import { useGroups, useCreateGroup } from "@/hooks/use-groups";
import type { Group, CreateGroupRequest } from "@/types/groups";
import { useMemo, useCallback } from "react";

type FilterTab = "all" | "public" | "private" | "team";
type SortOption = "name" | "memberCount" | "visibility" | "enrollment";

export default function GroupsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<GroupTableData[]>([]);

  // API hooks
  const { data: groupsResponse, isLoading, error } = useGroups();
  const createGroupMutation = useCreateGroup();

  // Transform groups data for table
  const tableData = useMemo(() => {
    // Handle different response structures
    let groupsArray: Group[] = [];
    
    if (groupsResponse?.data) {
      if (Array.isArray(groupsResponse.data)) {
        groupsArray = groupsResponse.data;
      } else if (groupsResponse.data.items && Array.isArray(groupsResponse.data.items)) {
        // Handle paginated response like people
        groupsArray = groupsResponse.data.items;
      } else {
        console.warn('Unexpected groups response structure:', groupsResponse.data);
        return [];
      }
    }
    
    return groupsArray.map((group: Group): GroupTableData => ({
      ...group,
      initials: group.name.substring(0, 2).toUpperCase(),
      memberCount: 0, // TODO: Get actual member count from API
    }));
  }, [groupsResponse?.data]);

  // Filter groups based on active filter and search
  const filteredGroups = useMemo(() => {
    let filtered = [...tableData];

    // Apply visibility filter
    if (activeFilter !== "all") {
      if (activeFilter === "public") filtered = filtered.filter(group => group.visibility === "public");
      if (activeFilter === "private") filtered = filtered.filter(group => group.visibility === "private");
      if (activeFilter === "teams") filtered = filtered.filter(group => group.visibility === "team");
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(group => 
        group.name.toLowerCase().includes(query) ||
        (group.description && group.description.toLowerCase().includes(query)) ||
        (group.location && group.location.toLowerCase().includes(query)) ||
        group.visibility.toLowerCase().includes(query) ||
        group.enrollment.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "memberCount":
          return (b.memberCount || 0) - (a.memberCount || 0);
        case "visibility":
          return a.visibility.localeCompare(b.visibility);
        case "enrollment":
          return a.enrollment.localeCompare(b.enrollment);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tableData, activeFilter, searchQuery, sortBy]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = tableData.length;
    const publicCount = tableData.filter(g => g.visibility === "public").length;
    const privateCount = tableData.filter(g => g.visibility === "private").length;
    const teamCount = tableData.filter(g => g.visibility === "team").length;
    
    return { total, publicCount, privateCount, teamCount };
  }, [tableData]);

  const handleCreateGroup = async (group: CreateGroupRequest) => {
    try {
      await createGroupMutation.mutateAsync(group);
      setCreateDialogOpen(false);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleSelectionChange = useCallback((selected: GroupTableData[]) => {
    setSelectedGroups(selected);
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <UsersThree className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Groups</h1>
        </div>
        <StatCardsSkeleton count={4} />
        <TableSkeleton rows={7} cols={5} />
      </div>
    );
  }

  // Show error state if there's an API error
  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600">
          Error loading groups: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <UsersThree className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Groups</h1>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          size="sm"
        >
          Create new
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UsersThree} label="Groups" value={stats.total.toString()} />
        <StatCard icon={Globe} label="Public" value={stats.publicCount.toString()} />
        <StatCard icon={LockKey} label="Private" value={stats.privateCount.toString()} />
        <StatCard icon={UsersFour} label="Teams" value={stats.teamCount.toString()} />
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Button
            variant={activeFilter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("all")}
            className="gap-1"
          >
            <UsersThree className="w-4 h-4" />
            All groups ({stats.total})
          </Button>
          <Button
            variant={activeFilter === "public" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("public")}
            className="gap-1"
          >
            <Globe className="w-4 h-4" />
            Public ({stats.publicCount})
          </Button>
          <Button
            variant={activeFilter === "private" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("private")}
            className="gap-1"
          >
            <LockKey className="w-4 h-4" />
            Private ({stats.privateCount})
          </Button>
          <Button
            variant={activeFilter === "teams" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("teams")}
            className="gap-1"
          >
            <UsersFour className="w-4 h-4" />
            Teams ({stats.teamCount})
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger size="sm" className="w-[200px] gap-2">
              <ArrowsDownUp className="w-4 h-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="memberCount">Members</SelectItem>
              <SelectItem value="visibility">Type</SelectItem>
              <SelectItem value="enrollment">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Summary */}
      {searchQuery && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            Showing {filteredGroups.length} result{filteredGroups.length !== 1 ? 's' : ''} 
            {searchQuery && ` for "${searchQuery}"`}
            {activeFilter !== "all" && ` in ${activeFilter} groups`}
          </span>
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="h-auto p-1 text-xs"
            >
              Clear search
            </Button>
          )}
        </div>
      )}

      {/* Data Table */}
      {filteredGroups.length === 0 ? (
        <div className="text-center py-12">
          <UsersThree className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? 'No groups found' : 'No groups yet'}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchQuery 
              ? `No groups match your search "${searchQuery}" in ${activeFilter} groups.`
              : activeFilter === "all" 
                ? "Get started by creating your first group."
                : `No ${activeFilter} groups found.`
            }
          </p>
          {!searchQuery && activeFilter === "all" && (
            <Button onClick={() => setCreateDialogOpen(true)}>
              Create first group
            </Button>
          )}
          {searchQuery && (
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <DataTable
          columns={groupsColumns}
          data={filteredGroups}
          searchKey="name"
          searchValue={searchQuery}
          onSelectionChange={handleSelectionChange}
          isLoading={isLoading}
        />
      )}

      {/* Create Group Dialog */}
      <CreateGroupDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateGroup}
      />
    </div>
  );
}
