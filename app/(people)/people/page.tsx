"use client";

import {
  Users,
  UserPlus,
  CaretDown,
  MagnifyingGlass,
  Sliders,
  ArrowsDownUp,
  DotsThree,
  UserCircle,
  Baby,
  Eye,
  Archive,
} from "@phosphor-icons/react";
import { useState, useMemo, useEffect } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreatePeopleDialog } from "@/components/people/CreatePeopleDialog";
import { DataTable } from "@/components/ui/data-table";
import { peopleColumns } from "@/components/people/tables/people-columns";
import { StatCardsSkeleton, TableSkeleton } from "@/components/ui/skeleton";
import { usePeople, useCreatePeopleBulk } from "@/hooks/use-people";
import { CreatePeoplePersonRequest, Member } from "@/types/people";

type FilterTab = "all" | "active" | "visitors" | "archived";
type SortOption = "joined-church" | "name" | "age-group" | "status";

export default function PeoplePage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("joined-church");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [pagination, setPagination] = useState({ limit: 50, offset: 0 });

  // Fetch people data from API
  const { data: peopleResponse, isLoading, error } = usePeople(pagination);
  
  // Create people mutation
  const createPeopleMutation = useCreatePeopleBulk();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('input[placeholder="Search..."]') as HTMLInputElement;
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

  const handleCreatePeople = async (people: CreatePeoplePersonRequest[]) => {
    try {
      await createPeopleMutation.mutateAsync({
        people,
        defaultRole: 'member',
      });
      setCreateDialogOpen(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleSelectionChange = (selected: any[]) => {
    console.log("Selected people:", selected);
  };

  // Filter and sort people data
  const filteredAndSortedPeople = useMemo(() => {
    if (!peopleResponse?.data?.items) return [];
    
    let filtered = [...peopleResponse.data.items];

    // Apply status filter
    switch (activeFilter) {
      case "active":
        filtered = filtered.filter(person => person.status === "active");
        break;
      case "visitors":
        filtered = filtered.filter(person => person.isVisitor === true || person.status === "visitor");
        break;
      case "archived":
        filtered = filtered.filter(person => person.archivedAt != null);
        break;
      case "all":
      default:
        // Show all except archived
        filtered = filtered.filter(person => person.archivedAt == null);
        break;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(person => 
        person.user?.name.toLowerCase().includes(query) ||
        person.user?.email.toLowerCase().includes(query) ||
        person.gender.toLowerCase().includes(query) ||
        person.status.toLowerCase().includes(query) ||
        (person.ageGroup && person.ageGroup.toLowerCase().includes(query)) ||
        person.role.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "joined-church":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "name":
          const nameA = a.user?.name || '';
          const nameB = b.user?.name || '';
          return nameA.localeCompare(nameB);
        case "age-group":
          const ageA = a.ageGroup || "Unknown";
          const ageB = b.ageGroup || "Unknown";
          return ageA.localeCompare(ageB);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  }, [peopleResponse?.data?.items, activeFilter, searchQuery, sortBy]);

  // Calculate stats from filtered data
  const allPeople = peopleResponse?.data?.items || [];
  const totalPeople = allPeople.filter(p => p.archivedAt == null).length;
  const activePeople = allPeople.filter(p => p.status === "active" && p.archivedAt == null).length;
  const visitors = allPeople.filter(p => (p.isVisitor === true || p.status === "visitor") && p.archivedAt == null).length;
  const adults = allPeople.filter(p => p.ageGroup === 'Adult' && p.archivedAt == null).length;
  const children = allPeople.filter(p => p.ageGroup === 'Child' && p.archivedAt == null).length;
  const newMembers = allPeople.filter(p => p.status === 'new' && p.archivedAt == null).length;

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <Users className="w-5 h-5" />
          <h1 className="text-lg font-semibold">People</h1>
        </div>
        <StatCardsSkeleton count={4} />
        <TableSkeleton rows={8} cols={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">
          Error loading people: {error.message}
        </div>
      </div>
    );
  }

  const people = filteredAndSortedPeople;
  const meta = peopleResponse?.data?.meta;

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Users className="w-5 h-5" />
          <h1 className="text-lg font-semibold">People</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Split Button */}
          <div className="flex items-center">
            <Button
              onClick={() => setCreateDialogOpen(true)}
              className="rounded-r-none"
              size="sm"
            >
              Create new
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-l-none h-8"
                  size="sm"
                >
                  <CaretDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setCreateDialogOpen(true)}>
                  Create new
                </DropdownMenuItem>
                <DropdownMenuItem>Import people</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant="ghost" size="icon">
            <DotsThree className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="People" value={totalPeople.toString()} />
        <StatCard icon={UserCircle} label="Active" value={activePeople.toString()} />
        <StatCard icon={Eye} label="Visitors" value={visitors.toString()} />
        <StatCard
          icon={UserPlus}
          label="New members"
          value={newMembers.toString()}
        />
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search people..."
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
            <Users className="w-4 h-4" />
            All people ({totalPeople})
          </Button>
          <Button
            variant={activeFilter === "active" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("active")}
            className="gap-1"
          >
            <UserCircle className="w-4 h-4" />
            Active ({activePeople})
          </Button>
          <Button
            variant={activeFilter === "visitors" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("visitors")}
            className="gap-1"
          >
            <Eye className="w-4 h-4" />
            Visitors ({visitors})
          </Button>
          <Button
            variant={activeFilter === "archived" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("archived")}
            className="gap-1"
          >
            <Archive className="w-4 h-4" />
            Archived
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger size="sm" className="w-[200px] gap-2">
              <ArrowsDownUp className="w-4 h-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="joined-church">Joined church</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="age-group">Age group</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Summary */}
      {searchQuery && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            Showing {people.length} result{people.length !== 1 ? 's' : ''} 
            {searchQuery && ` for "${searchQuery}"`}
            {activeFilter !== "all" && ` in ${activeFilter} people`}
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
      {/* Data Table */}
      {people.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? 'No people found' : 'No people yet'}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchQuery 
              ? `No people match your search "${searchQuery}" in ${activeFilter} people.`
              : activeFilter === "all" 
                ? "Get started by creating your first person."
                : `No ${activeFilter} people found.`
            }
          </p>
          {!searchQuery && activeFilter === "all" && (
            <Button onClick={() => setCreateDialogOpen(true)}>
              Create first person
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
          columns={peopleColumns}
          data={people}
          onSelectionChange={handleSelectionChange}
        />
      )}

      {/* Create People Dialog */}
      <CreatePeopleDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreatePeople}
        isLoading={createPeopleMutation.isPending}
      />
    </div>
  );
}
