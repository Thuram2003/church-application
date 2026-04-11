"use client";

import {
  HouseLine,
  MagnifyingGlass,
  Sliders,
  ArrowsDownUp,
  Baby,
  UserCircleMinus,
  UserPlus,
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
import { CreateFamilyDialog } from "@/components/people/CreateFamilyDialog";
import { DataTable } from "@/components/ui/data-table";
import { familiesColumns, type Family } from "@/components/people/tables/families-columns";

// Mock data
const families: Family[] = [
  {
    id: 1,
    name: "Mbaku",
    adults: 1,
    children: 1,
    elders: 0,
    totalMembers: 2,
    status: "Active",
  },
];

type FilterTab = "all" | "has-children" | "no-children";
type SortOption = "name" | "members" | "status";

export default function FamiliesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedFamilies, setSelectedFamilies] = useState<Family[]>([]);

  const handleCreateFamily = (family: any) => {
    console.log("Creating family:", family);
    // API call here
    // await api.createFamily(family)
  };

  const handleSelectionChange = (selected: Family[]) => {
    setSelectedFamilies(selected);
    console.log("Selected families:", selected);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <HouseLine className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Families</h1>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          size="sm"
        >
          Create new
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard icon={HouseLine} label="Families" value="1" />
        <StatCard
          icon={UserPlus}
          label="New Families"
          value="1"
        />
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
            <HouseLine className="w-4 h-4" />
            All families
          </Button>
          <Button
            variant={activeFilter === "has-children" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("has-children")}
            className="gap-1"
          >
            <Baby className="w-4 h-4" />
            Has children
          </Button>
          <Button
            variant={activeFilter === "no-children" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("no-children")}
            className="gap-1"
          >
            <UserCircleMinus className="w-4 h-4" />
            Does not have children
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
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={familiesColumns}
        data={families}
        searchKey="name"
        searchValue={searchQuery}
        onSelectionChange={handleSelectionChange}
      />

      {/* Create Family Dialog */}
      <CreateFamilyDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateFamily}
      />
    </div>
  );
}
