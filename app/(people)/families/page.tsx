"use client";

import {
  HouseLine,
  MagnifyingGlass,
  ArrowsDownUp,
  Baby,
  UserCircleMinus,
  UserPlus,
} from "@phosphor-icons/react";
import React, { useState, useMemo, useEffect } from "react";
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
import { familiesColumns } from "@/components/people/tables/families-columns";
import { StatCardsSkeleton, TableSkeleton } from "@/components/ui/skeleton";
import { useFamilies } from "@/hooks/use-families";
import type { FamilyTableData } from "@/types/families";

type FilterTab = "all" | "has-children" | "no-children";
type SortOption = "name" | "members" | "created";

export default function FamiliesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("created");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Fetch families data from API
  const { data: familiesResponse, isLoading, error } = useFamilies();

  // Debug: Log the response structure
  React.useEffect(() => {
    if (familiesResponse) {
      console.log('Families API Response:', familiesResponse);
    }
  }, [familiesResponse]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('input[placeholder="Search families..."]') as HTMLInputElement;
        searchInput?.focus();
      }
      
      // Escape to clear search
      if (event.key === 'Escape' && searchQuery) {
        setSearchQuery("");
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery]);

  const handleSelectionChange = (selected: any[]) => {
    console.log("Selected families:", selected);
  };

  // Transform API data to table format and apply filters/sorting
  const processedFamilies = useMemo(() => {
    if (!familiesResponse?.data) return [];
    
    // Handle paginated response structure
    let familiesArray: any[] = [];
    
    if (familiesResponse.data.items && Array.isArray(familiesResponse.data.items)) {
      familiesArray = familiesResponse.data.items;
    } else if (Array.isArray(familiesResponse.data)) {
      // Fallback for direct array response
      familiesArray = familiesResponse.data;
    } else {
      console.warn('Unexpected families response structure:', familiesResponse.data);
      return [];
    }
    
    let families: FamilyTableData[] = familiesArray.map(family => ({
      ...family,
      totalMembers: family.memberCount || 0,
      adults: family.adultsCount || 0,
      children: family.childrenCount || 0,
      elders: family.eldersCount || 0,
      status: family.archivedAt ? "Archived" : "Active",
    }));

    // Apply status filter
    switch (activeFilter) {
      case "has-children":
        families = families.filter(family => (family.children || 0) > 0);
        break;
      case "no-children":
        families = families.filter(family => (family.children || 0) === 0);
        break;
      case "all":
      default:
        // Show all except archived
        families = families.filter(family => !family.archivedAt);
        break;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      families = families.filter(family => 
        family.name.toLowerCase().includes(query) ||
        family.headOfHouse?.name?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    families.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "members":
          return (b.totalMembers || 0) - (a.totalMembers || 0);
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return families;
  }, [familiesResponse?.data, activeFilter, searchQuery, sortBy]);

  // Calculate stats from all families data
  const allFamilies = useMemo(() => {
    if (!familiesResponse?.data) return [];
    
    if (familiesResponse.data.items && Array.isArray(familiesResponse.data.items)) {
      return familiesResponse.data.items;
    } else if (Array.isArray(familiesResponse.data)) {
      return familiesResponse.data;
    }
    
    return [];
  }, [familiesResponse?.data]);

  const totalFamilies = allFamilies.filter(f => !f.archivedAt).length;
  const familiesWithChildren = allFamilies.filter(f => !f.archivedAt && (f.childrenCount || 0) > 0).length;
  const newFamilies = allFamilies.filter(f => {
    if (f.archivedAt) return false;
    const createdDate = new Date(f.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdDate > thirtyDaysAgo;
  }).length;

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <HouseLine className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Families</h1>
        </div>
        <StatCardsSkeleton count={3} />
        <TableSkeleton rows={7} cols={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">
          Error loading families: {error.message}
        </div>
      </div>
    );
  }

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={HouseLine} label="Families" value={totalFamilies.toString()} />
        <StatCard icon={Baby} label="With Children" value={familiesWithChildren.toString()} />
        <StatCard icon={UserPlus} label="New Families" value={newFamilies.toString()} />
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search families..."
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
            <HouseLine className="w-4 h-4" />
            All families ({totalFamilies})
          </Button>
          <Button
            variant={activeFilter === "has-children" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("has-children")}
            className="gap-1"
          >
            <Baby className="w-4 h-4" />
            Has children ({familiesWithChildren})
          </Button>
          <Button
            variant={activeFilter === "no-children" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("no-children")}
            className="gap-1"
          >
            <UserCircleMinus className="w-4 h-4" />
            No children ({totalFamilies - familiesWithChildren})
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger size="sm" className="w-[200px] gap-2">
              <ArrowsDownUp className="w-4 h-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created">Recently created</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="members">Most members</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Summary */}
      {searchQuery && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            Showing {processedFamilies.length} result{processedFamilies.length !== 1 ? 's' : ''} 
            {searchQuery && ` for "${searchQuery}"`}
            {activeFilter !== "all" && ` in ${activeFilter.replace('-', ' ')} families`}
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
      {processedFamilies.length === 0 ? (
        <div className="text-center py-12">
          <HouseLine className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? 'No families found' : 'No families yet'}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchQuery 
              ? `No families match your search "${searchQuery}" in ${activeFilter.replace('-', ' ')} families.`
              : activeFilter === "all" 
                ? "Get started by creating your first family."
                : `No ${activeFilter.replace('-', ' ')} families found.`
            }
          </p>
          {!searchQuery && activeFilter === "all" && (
            <Button onClick={() => setCreateDialogOpen(true)}>
              Create first family
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
          columns={familiesColumns}
          data={processedFamilies}
          onSelectionChange={handleSelectionChange}
        />
      )}

      {/* Create Family Dialog */}
      <CreateFamilyDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}
