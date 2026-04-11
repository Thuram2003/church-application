"use client";

import {
  ClipboardText,
  MagnifyingGlass,
  DotsThree,
  Clock,
  CheckCircle,
  CaretDown,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatCard, MemberItem } from "@/components/dashboard";
import { AssignFollowUpDialog } from "@/components/calendar/AssignFollowUpDialog";

// Mock data
const followUps = [
  {
    id: 1,
    member: {
      name: "Moe",
      initials: "M",
      color: "#9b87f5",
    },
    dueDate: "7 Apr 2026",
    responsible: {
      name: "Tjay",
      initials: "T",
      color: "#7c9ff5",
    },
    status: "Pending",
    type: "Home Visit",
    action: "Home Visit",
  },
];

type FilterTab = "all" | "pending" | "completed";

export default function FollowUpsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);

  const totalFollowUps = followUps.length;
  const pendingFollowUps = followUps.filter((f) => f.status === "Pending").length;
  const completedFollowUps = followUps.filter((f) => f.status === "Completed").length;

  const handleAssignFollowUp = (data: any) => {
    console.log("Assigning follow up:", data);
    // API call here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <ClipboardText className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Follow-Ups</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Button 
              className="rounded-r-none" 
              size="sm"
              onClick={() => setAssignDialogOpen(true)}
            >
              Create new
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-l-none border-l border-white/20" size="sm">
                  <CaretDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setAssignDialogOpen(true)}>
                  Create new
                </DropdownMenuItem>
                <DropdownMenuItem>Import follow-ups</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant="ghost" size="icon">
            <DotsThree className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={ClipboardText} label="Total follow-ups" value={totalFollowUps.toString()} />
        <StatCard icon={Clock} label="Pending follow-ups" value={pendingFollowUps.toString()} />
        <StatCard
          icon={CheckCircle}
          label="Completed follow-ups"
          value={`${completedFollowUps}`}
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
            className="pl-9 h-9"
          />
        </div>

        <Button
          variant={activeFilter === "all" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveFilter("all")}
          className="gap-1"
        >
          <ClipboardText className="w-4 h-4" />
          All
        </Button>
        <Button
          variant={activeFilter === "pending" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveFilter("pending")}
          className="gap-1"
        >
          <Clock className="w-4 h-4" />
          Pending
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              Responsible
              <CaretDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Tjay</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="border border-gray-100 rounded-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead>Member(s)</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Responsible</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {followUps.map((followUp) => (
              <TableRow key={followUp.id}>
                <TableCell>
                  <input type="checkbox" className="rounded" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-[#eef0ff] text-[#443a88] font-semibold text-xs">
                        {followUp.member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{followUp.member.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{followUp.dueDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-[#eef0ff] text-[#443a88] font-semibold text-xs">
                        {followUp.responsible.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{followUp.responsible.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-amber-50 text-amber-700 border-amber-200"
                  >
                    {followUp.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                        <DotsThree className="w-4 h-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Assign Follow Up Dialog */}
      <AssignFollowUpDialog
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        onSubmit={handleAssignFollowUp}
      />
    </div>
  );
}
