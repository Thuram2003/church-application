"use client";

import {
  Coins,
  Plus,
  MagnifyingGlass,
  DotsThree,
  ArrowsDownUp,
  Users,
  Lightning,
  Archive,
  CaretDown,
  Clock,
  Wallet,
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
import { DataTable } from "@/components/ui/data-table";
import { fundsColumns, type Fund } from "@/components/finances/tables/funds-columns";

// Mock data
const funds: Fund[] = [
  {
    id: 1,
    name: "General fund",
    status: "Active",
    totalCollected: 500.00,
    inPersonCollected: 500.00,
    onlineCollected: 0.00,
  },
];

type FilterTab = "all" | "active" | "archived";

export default function FundsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFunds, setSelectedFunds] = useState<Fund[]>([]);

  // Calculate totals
  const totalGiving = funds.reduce((sum, fund) => sum + fund.totalCollected, 0);
  const totalInPerson = funds.reduce((sum, fund) => sum + fund.inPersonCollected, 0);
  const totalOnline = funds.reduce((sum, fund) => sum + fund.onlineCollected, 0);
  const totalRecurring = 0.00; // Placeholder

  const handleSelectionChange = (selected: Fund[]) => {
    setSelectedFunds(selected);
    console.log("Selected funds:", selected);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Coins className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Funds</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Split Button */}
          <div className="flex items-center">
            <Button
              className="rounded-r-none"
              size="sm"
            >
              Create fund
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
                <DropdownMenuItem>Create fund</DropdownMenuItem>
                <DropdownMenuItem>Import funds</DropdownMenuItem>
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
        <StatCard
          icon={Wallet}
          label="Total giving"
          value={`XAF ${totalGiving.toFixed(2)}`}
        />
        <StatCard
          icon={Users}
          label="In-person"
          value={`XAF ${totalInPerson.toFixed(2)}`}
        />
        <StatCard
          icon={Lightning}
          label="Online"
          value={`XAF ${totalOnline.toFixed(2)}`}
        />
        <StatCard
          icon={Clock}
          label="Recurring"
          value={`XAF ${totalRecurring.toFixed(2)}`}
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

        <Button
          variant={activeFilter === "all" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveFilter("all")}
          className="gap-1"
        >
          <Coins className="w-4 h-4" />
          All funds
        </Button>
        <Button
          variant={activeFilter === "active" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveFilter("active")}
          className="gap-1"
        >
          <Coins className="w-4 h-4" />
          Active
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
        columns={fundsColumns}
        data={funds}
        searchKey="name"
        searchValue={searchQuery}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
}
