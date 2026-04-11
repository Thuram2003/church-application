"use client";

import {
  Wallet,
  MagnifyingGlass,
  CaretDown,
  Clock,
  DotsThree,
  Users,
  Calendar,
  CreditCard,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateGivingDialog } from "@/components/finances/CreateGivingDialog";
import { DataTable } from "@/components/ui/data-table";
import { givingColumns, type GivingRecord } from "@/components/finances/tables/giving-columns";

// Mock data
const givingRecords: GivingRecord[] = [
  {
    id: "#134ca3fb1",
    date: "Mar 30, 2026",
    donor: {
      name: "Amebe christian",
      initials: "AC",
    },
    fund: "General fund",
    method: "Cash",
    frequency: "One-time",
    amount: 500.00,
  },
];

type GivingType = "total" | "in-person" | "online" | "recurring";

export default function GivingPage() {
  const [activeType, setActiveType] = useState<GivingType>("total");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedMethod, setSelectedMethod] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedGiving, setSelectedGiving] = useState<GivingRecord[]>([]);

  const handleCreateGiving = (giving: any) => {
    console.log("Creating giving:", giving);
    // API call here
  };

  const handleSelectionChange = (selected: GivingRecord[]) => {
    setSelectedGiving(selected);
    console.log("Selected giving:", selected);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Wallet className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Giving</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Split Button */}
          <div className="flex items-center">
            <Button
              onClick={() => setCreateDialogOpen(true)}
              className="rounded-r-none"
              size="sm"
            >
              Add giving
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
                  Add giving
                </DropdownMenuItem>
                <DropdownMenuItem>Import giving</DropdownMenuItem>
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
          value="XAF 500.00"
        />
        <StatCard
          icon={Users}
          label="In-person"
          value="XAF 500.00"
        />
        <StatCard
          icon={CreditCard}
          label="Online"
          value="XAF 0.00"
        />
        <StatCard
          icon={Clock}
          label="Recurring"
          value="XAF 0.00"
        />
      </div>

      {/* Filters */}
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

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px] gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2026">Year of 2026</SelectItem>
            <SelectItem value="2025">Year of 2025</SelectItem>
            <SelectItem value="2024">Year of 2024</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedMethod} onValueChange={setSelectedMethod}>
          <SelectTrigger className="w-[180px] gap-2">
            <CreditCard className="w-4 h-4 text-gray-600" />
            <SelectValue placeholder="All methods" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All methods</SelectItem>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="card">Card</SelectItem>
            <SelectItem value="bank">Bank Transfer</SelectItem>
            <SelectItem value="mobile">Mobile Money</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[140px] gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Data Table */}
      <DataTable
        columns={givingColumns}
        data={givingRecords}
        searchKey="id"
        searchValue={searchQuery}
        onSelectionChange={handleSelectionChange}
      />

      {/* Create Giving Dialog */}
      <CreateGivingDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateGiving}
      />
    </div>
  );
}
