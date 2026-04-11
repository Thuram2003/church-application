"use client";

import {
  Target,
  Plus,
  MagnifyingGlass,
  DotsThree,
  ArrowsDownUp,
  Clock,
  CheckCircle,
  CaretDown,
  Lightning,
} from "@phosphor-icons/react";
import { useState } from "react";
import Link from "next/link";
import { StatCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateCampaignDialog } from "@/components/finances/CreateCampaignDialog";
import { DataTable } from "@/components/ui/data-table";
import { pledgesColumns, type Pledge } from "@/components/finances/tables/pledges-columns";

const pledges: Pledge[] = [
  {
    id: 1,
    campaignName: "New Items for Students",
    fund: "General fund",
    status: "Active",
    startDate: "Mar 30, 2026",
    endDate: "Mar 30, 2027",
    totalPledged: 0.00,
    totalRaised: 0.00,
    remaining: 0.00,
    progress: 0,
  },
];

type FilterTab = "all" | "in-progress" | "completed";

export default function PledgesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [createCampaignOpen, setCreateCampaignOpen] = useState(false);
  const [selectedPledges, setSelectedPledges] = useState<Pledge[]>([]);

  const totalPledged = pledges.reduce((sum, p) => sum + p.totalPledged, 0);
  const totalRaised = pledges.reduce((sum, p) => sum + p.totalRaised, 0);
  const totalRemaining = pledges.reduce((sum, p) => sum + p.remaining, 0);

  const handleCreateCampaign = (data: any) => {
    console.log("Creating campaign:", data);
    // API call here
  };

  const handleSelectionChange = (selected: Pledge[]) => {
    setSelectedPledges(selected);
    console.log("Selected pledges:", selected);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Target className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Pledges</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Button 
              className="rounded-r-none" 
              size="sm"
              onClick={() => setCreateCampaignOpen(true)}
            >
              Add campaign
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-l-none border-l border-white/20" size="sm">
                  <CaretDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setCreateCampaignOpen(true)}>
                  Add campaign
                </DropdownMenuItem>
                <DropdownMenuItem>Import campaigns</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant="ghost" size="icon">
            <DotsThree className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={Target} label="Total Pledged" value={`XAF ${totalPledged.toFixed(2)}`} />
        <StatCard icon={CheckCircle} label="Total Raised" value={`XAF ${totalRaised.toFixed(2)}`} />
        <StatCard icon={Clock} label="Remaining" value={`XAF ${totalRemaining.toFixed(2)}`} />
      </div>

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
          <Target className="w-4 h-4" />
          All pledges
        </Button>
        <Button
          variant={activeFilter === "in-progress" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveFilter("in-progress")}
          className="gap-1"
        >
          <Clock className="w-4 h-4" />
          In progress
        </Button>
        <Button
          variant={activeFilter === "completed" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveFilter("completed")}
          className="gap-1"
        >
          <CheckCircle className="w-4 h-4" />
          Completed
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={pledgesColumns}
        data={pledges}
        searchKey="campaignName"
        searchValue={searchQuery}
        onSelectionChange={handleSelectionChange}
      />

      {/* Create Campaign Dialog */}
      <CreateCampaignDialog
        open={createCampaignOpen}
        onOpenChange={setCreateCampaignOpen}
        onSubmit={handleCreateCampaign}
      />
    </div>
  );
}
