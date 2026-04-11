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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreatePeopleDialog } from "@/components/people/CreatePeopleDialog";
import { DataTable } from "@/components/ui/data-table";
import { peopleColumns, type Person } from "@/components/people/tables/people-columns";

// Mock data
const people: Person[] = [
  {
    id: 1,
    name: "Amebe christian",
    initials: "AC",
    ageGroup: "Adult",
    contact: "christian@jimmy...",
    joinedDate: "2024-01-15",
    status: "Active",
  },
];

type FilterTab = "all" | "active" | "visitors" | "archived";
type SortOption = "joined-church" | "name" | "age-group" | "status";

export default function PeoplePage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("joined-church");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);

  const handleCreatePeople = (people: any[]) => {
    console.log("Creating people:", people);
    // API call here
    // await api.createPeople(people)
  };

  const handleSelectionChange = (selected: Person[]) => {
    setSelectedPeople(selected);
    console.log("Selected people:", selected);
  };

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
                  className="rounded-l-none"
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
        <StatCard icon={Users} label="People" value="1" />
        <StatCard icon={UserCircle} label="Adults" value="1" />
        <StatCard icon={Baby} label="Children" value="0" />
        <StatCard
          icon={UserPlus}
          label="New members"
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
            <Users className="w-4 h-4" />
            All people
          </Button>
          <Button
            variant={activeFilter === "active" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("active")}
            className="gap-1"
          >
            <UserCircle className="w-4 h-4" />
            Active
          </Button>
          <Button
            variant={activeFilter === "visitors" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("visitors")}
            className="gap-1"
          >
            <Eye className="w-4 h-4" />
            Visitors
          </Button>
          <Button
            variant={activeFilter === "archived" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("archived")}
            className="gap-1"
          >
            <Archive className="w-4 h-4" />
            Archived
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
              <SelectItem value="joined-church">Joined church</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="age-group">Age group</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={peopleColumns}
        data={people}
        searchKey="name"
        searchValue={searchQuery}
        onSelectionChange={handleSelectionChange}
      />

      {/* Create People Dialog */}
      <CreatePeopleDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreatePeople}
      />
    </div>
  );
}
