"use client";

import {
  DoorOpen,
  CaretDown,
  MagnifyingGlass,
  DotsThree,
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
import { EmptyState } from "@/components/EmptyState";
import { CreateRoomDialog } from "@/components/calendar/CreateRoomDialog";
import { DataTable } from "@/components/ui/data-table";
import { roomsColumns, type Room } from "@/components/calendar/tables/rooms-columns";

// Mock data
const rooms: Room[] = [
  {
    id: 1,
    name: "Main Sanctuary",
    location: "Main Building - Ground Floor",
    capacity: 500,
    status: "available",
    description: "Primary worship space with full AV system and sound equipment",
  },
  {
    id: 2,
    name: "Fellowship Hall",
    location: "Main Building - Ground Floor",
    capacity: 200,
    status: "available",
    description: "Large multi-purpose room with kitchen access",
  },
  {
    id: 3,
    name: "Sunday School Room A",
    location: "Education Wing - 1st Floor",
    capacity: 25,
    status: "in-use",
    description: "Children's classroom with whiteboard and storage",
  },
  {
    id: 4,
    name: "Sunday School Room B",
    location: "Education Wing - 1st Floor",
    capacity: 25,
    status: "available",
    description: "Youth classroom with projector",
  },
  {
    id: 5,
    name: "Conference Room",
    location: "Administration Building - 2nd Floor",
    capacity: 15,
    status: "available",
    description: "Meeting room with conference table and video conferencing",
  },
  {
    id: 6,
    name: "Prayer Chapel",
    location: "Main Building - 2nd Floor",
    capacity: 30,
    status: "available",
    description: "Quiet space for prayer and meditation",
  },
  {
    id: 7,
    name: "Youth Center",
    location: "Recreation Building",
    capacity: 75,
    status: "maintenance",
    description: "Recreation space with games and seating areas",
  },
  {
    id: 8,
    name: "Choir Room",
    location: "Main Building - 1st Floor",
    capacity: 40,
    status: "available",
    description: "Music practice room with piano and risers",
  },
];

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter((r) => r.status === "available").length;

  const handleCreateRoom = (data: any) => {
    console.log("Creating room:", data);
    // API call here
  };

  const handleSelectionChange = (selected: Room[]) => {
    setSelectedRooms(selected);
    console.log("Selected rooms:", selected);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <DoorOpen className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Rooms</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Split Button */}
          <div className="flex items-center">
            <Button
              className="rounded-r-none"
              size="sm"
              onClick={() => setShowCreateDialog(true)}
            >
              Create new
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
                <DropdownMenuItem onClick={() => setShowCreateDialog(true)}>
                  Create new
                </DropdownMenuItem>
                <DropdownMenuItem>Import rooms</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant="ghost" size="icon">
            <DotsThree className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {rooms.length === 0 ? (
        /* Empty State */
        <EmptyState
          title="Manage Your Rooms"
          description="Create rooms to track your church's physical spaces like the main sanctuary, Sunday school rooms, parish hall, and more for scheduling and reservations."
          actionLabel="Create Your First Room"
          onAction={() => setShowCreateDialog(true)}
        />
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              icon={DoorOpen}
              label="Total Rooms"
              value={totalRooms.toString()}
            />
            <StatCard
              icon={DoorOpen}
              label="Available Now"
              value={availableRooms.toString()}
            />
          </div>

          {/* Filters and Search */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <DoorOpen className="w-4 h-4" />
                  Status
                  <CaretDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Available</DropdownMenuItem>
                <DropdownMenuItem>In Use</DropdownMenuItem>
                <DropdownMenuItem>Maintenance</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <DoorOpen className="w-4 h-4" />
                  Capacity
                  <CaretDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Small (1-20)</DropdownMenuItem>
                <DropdownMenuItem>Medium (21-50)</DropdownMenuItem>
                <DropdownMenuItem>Large (51+)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Data Table */}
          <DataTable 
            columns={roomsColumns} 
            data={rooms}
            searchKey="name"
            searchValue={searchQuery}
            onSelectionChange={handleSelectionChange}
          />
        </>
      )}

      {/* Create Room Dialog */}
      <CreateRoomDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateRoom}
      />
    </div>
  );
}
