"use client";

import {
  CheckSquare,
  Plus,
  MagnifyingGlass,
  CalendarBlank,
  Users,
  DotsThree,
  Pencil,
  Trash,
} from "@phosphor-icons/react";
import { useState } from "react";
import { StatCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RecordAttendanceDialog } from "@/components/people/RecordAttendanceDialog";

// Mock data
const attendanceRecords = [
  {
    id: 1,
    date: "2024-04-06",
    service: "Sunday Service",
    adults: 45,
    children: 12,
    total: 57,
    recordedBy: "Admin",
  },
  {
    id: 2,
    date: "2024-03-30",
    service: "Sunday Service",
    adults: 42,
    children: 10,
    total: 52,
    recordedBy: "Admin",
  },
];

export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recordDialogOpen, setRecordDialogOpen] = useState(false);

  const handleRecordAttendance = (data: any) => {
    console.log("Recording attendance:", data);
    // API call here
  };

  const totalAttendance = attendanceRecords.reduce((sum, record) => sum + record.total, 0);
  const avgAttendance = Math.round(totalAttendance / attendanceRecords.length);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <CheckSquare className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Attendance</h1>
        </div>
        <Button onClick={() => setRecordDialogOpen(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Record Attendance
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Records" value={attendanceRecords.length.toString()} />
        <StatCard icon={Users} label="Average Attendance" value={avgAttendance.toString()} />
        <StatCard icon={Users} label="Last Service" value={attendanceRecords[0]?.total.toString() || "0"} />
        <StatCard icon={CalendarBlank} label="This Month" value={attendanceRecords.length.toString()} />
      </div>

      {/* Search */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-xs">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by date or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-100 rounded-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Date</TableHead>
              <TableHead>Service/Event</TableHead>
              <TableHead>Adults</TableHead>
              <TableHead>Children</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Recorded By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  {new Date(record.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-primary-light text-primary border-primary-lighter">
                    {record.service}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{record.adults}</TableCell>
                <TableCell className="text-sm">{record.children}</TableCell>
                <TableCell className="font-semibold text-sm">{record.total}</TableCell>
                <TableCell className="text-sm text-gray-600">{record.recordedBy}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                        <DotsThree className="w-4 h-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Record Attendance Dialog */}
      <RecordAttendanceDialog
        open={recordDialogOpen}
        onOpenChange={setRecordDialogOpen}
        onSubmit={handleRecordAttendance}
      />
    </div>
  );
}
