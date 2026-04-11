"use client";

import {
  UsersThree,
  MagnifyingGlass,
  Sliders,
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
import { groupsColumns, type Group } from "@/components/people/tables/groups-columns";

// Mock data
const groups: Group[] = [
  {
    id: 1,
    name: "CYF",
    initials: "CY",
    type: "Private",
    members: 0,
    status: "Active",
  },
];

type FilterTab = "all" | "public" | "private" | "teams";
type SortOption = "name" | "members" | "type" | "status";

export default function GroupsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<Group[]>([]);

  const handleCreateGroup = (group: any) => {
    console.log("Creating group:", group);
    // API call here
    // await api.createGroup(group)
  };

  const handleSelectionChange = (selected: Group[]) => {
    setSelectedGroups(selected);
    console.log("Selected groups:", selected);
  };

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
        <StatCard icon={UsersThree} label="Groups" value="1" />
        <StatCard icon={Globe} label="Public" value="0" />
        <StatCard icon={LockKey} label="Private" value="1" />
        <StatCard icon={UsersFour} label="Teams" value="0" />
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
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

          <Button
            variant={activeFilter === "all" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("all")}
            className="gap-1"
          >
            <UsersThree className="w-4 h-4" />
            All groups
          </Button>
          <Button
            variant={activeFilter === "public" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("public")}
            className="gap-1"
          >
            <Globe className="w-4 h-4" />
            Public
          </Button>
          <Button
            variant={activeFilter === "private" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("private")}
            className="gap-1"
          >
            <LockKey className="w-4 h-4" />
            Private
          </Button>
          <Button
            variant={activeFilter === "teams" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("teams")}
            className="gap-1"
          >
            <UsersFour className="w-4 h-4" />
            Teams
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Sliders className="w-4 h-4" />
            Advance filters
          </Button>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger size="sm" className="w-[200px] gap-2">
              <ArrowsDownUp className="w-4 h-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="members">Members</SelectItem>
              <SelectItem value="type">Type</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={groupsColumns}
        data={groups}
        searchKey="name"
        searchValue={searchQuery}
        onSelectionChange={handleSelectionChange}
      />

      {/* Create Group Dialog */}
      <CreateGroupDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateGroup}
      />
    </div>
  );
}
