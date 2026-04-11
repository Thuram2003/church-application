"use client";

import {
  Stack,
  Plus,
  MagnifyingGlass,
  DotsThree,
  ArrowsDownUp,
  Users,
  CaretDown,
  Archive,
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
import { CreateBatchDialog } from "@/components/finances/CreateBatchDialog";
import { DataTable } from "@/components/ui/data-table";
import { batchesColumns, type Batch } from "@/components/finances/tables/batches-columns";

// Mock data
const batches: Batch[] = [
  {
    id: 1,
    date: "Mar 30, 2026",
    name: "Schools",
    status: "Open",
    uniqueContributors: 0,
    totalAmount: 0.00,
  },
  {
    id: 2,
    date: "Mar 30, 2026",
    name: "children",
    status: "Open",
    uniqueContributors: 0,
    totalAmount: 0.00,
  },
];

type FilterTab = "all" | "open" | "archived";

export default function BatchesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [createBatchOpen, setCreateBatchOpen] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState<Batch[]>([]);

  // Calculate totals
  const totalBatches = batches.length;
  const totalContributors = batches.reduce((sum, batch) => sum + batch.uniqueContributors, 0);

  const handleCreateBatch = (data: any) => {
    console.log("Creating batch:", data);
    // API call here
  };

  const handleSelectionChange = (selected: Batch[]) => {
    setSelectedBatches(selected);
    console.log("Selected batches:", selected);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Stack className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Batches</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Split Button */}
          <div className="flex items-center">
            <Button 
              className="rounded-r-none" 
              size="sm"
              onClick={() => setCreateBatchOpen(true)}
            >
              Create batch
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-l-none border-l border-white/20" size="sm">
                  <CaretDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setCreateBatchOpen(true)}>
                  Create batch
                </DropdownMenuItem>
                <DropdownMenuItem>Import batches</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant="ghost" size="icon">
            <DotsThree className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard icon={Stack} label="Batches" value={totalBatches.toString()} />
        <StatCard icon={Users} label="Unique contributors" value={totalContributors.toString()} />
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

        <Button
          variant={activeFilter === "all" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveFilter("all")}
          className="gap-1"
        >
          <Stack className="w-4 h-4" />
          All Batches
        </Button>
        <Button
          variant={activeFilter === "open" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveFilter("open")}
          className="gap-1"
        >
          <Stack className="w-4 h-4" />
          Open
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

      {/* Data Table */}
      <DataTable
        columns={batchesColumns}
        data={batches}
        searchKey="name"
        searchValue={searchQuery}
        onSelectionChange={handleSelectionChange}
      />

      {/* Create Batch Dialog */}
      <CreateBatchDialog
        open={createBatchOpen}
        onOpenChange={setCreateBatchOpen}
        onSubmit={handleCreateBatch}
      />
    </div>
  );
}
