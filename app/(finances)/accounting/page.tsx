"use client";

import {
  Calculator,
  Plus,
  Minus,
  MagnifyingGlass,
  DotsThree,
  FileText,
  ChartBar,
  GridFour,
  Users,
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
import { CreateAccountDialog } from "@/components/finances/CreateAccountDialog";
import { DataTable } from "@/components/ui/data-table";
import { accountingColumns, type Account } from "@/components/finances/tables/accounting-columns";

// Mock data
const accounts: Account[] = [
  {
    id: 1,
    name: "Back to school Funds",
    type: "Asset",
    fundsConnected: "-",
    openingDate: "Mar 30, 2026",
    openingBalance: 0.00,
    currentBalance: 0.00,
  },
];

type FilterTab = "all" | "asset" | "liability";

export default function AccountingPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState<Account[]>([]);

  const handleCreateAccount = (data: any) => {
    console.log("Creating account:", data);
    // API call here
  };

  const handleSelectionChange = (selected: Account[]) => {
    setSelectedAccounts(selected);
    console.log("Selected accounts:", selected);
  };

  // Calculate totals
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.currentBalance, 0);
  const assetAccounts = accounts.filter(acc => acc.type === "Asset").length;
  const liabilityAccounts = accounts.filter(acc => acc.type === "Liability").length;
  const categories = 4; // Mock value
  const payeesVendors = 8; // Mock value

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Calculator className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Accounting</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setCreateAccountOpen(true)}>
            Add account
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="w-4 h-4" />
            Reports
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ChartBar className="w-4 h-4" />
            Show dashboard
          </Button>
          <Button variant="ghost" size="icon">
            <DotsThree className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={Calculator}
          label="Total balance"
          value={`XAF ${totalBalance.toFixed(2)}`}
        />
        <StatCard
          icon={Plus}
          label="Asset accounts"
          value={assetAccounts.toString()}
        />
        <StatCard
          icon={Minus}
          label="Liability accounts"
          value={liabilityAccounts.toString()}
        />
        <StatCard
          icon={GridFour}
          label="Categories"
          value={categories.toString()}
        />
        <StatCard
          icon={Users}
          label="Payees & Vendors"
          value={payeesVendors.toString()}
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
            <FileText className="w-4 h-4" />
            All accounts
          </Button>
          <Button
            variant={activeFilter === "asset" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("asset")}
            className="gap-1"
          >
            <Plus className="w-4 h-4" />
            Asset
          </Button>
          <Button
            variant={activeFilter === "liability" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("liability")}
            className="gap-1"
          >
            <Minus className="w-4 h-4" />
            Liability
          </Button>
        </div>

        <Button variant="outline" size="sm" className="gap-2">
          <GridFour className="w-4 h-4" />
          Categories & Payees
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={accountingColumns}
        data={accounts}
        searchKey="name"
        searchValue={searchQuery}
        onSelectionChange={handleSelectionChange}
      />

      {/* Create Account Dialog */}
      <CreateAccountDialog
        open={createAccountOpen}
        onOpenChange={setCreateAccountOpen}
        onSubmit={handleCreateAccount}
      />
    </div>
  );
}
