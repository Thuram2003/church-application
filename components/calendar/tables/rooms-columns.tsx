"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThree, ArrowsDownUp } from "@phosphor-icons/react";

export type Room = {
  id: number;
  name: string;
  location: string;
  capacity: number;
  status: "available" | "in-use" | "maintenance";
  description: string;
};

export const roomsColumns: ColumnDef<Room>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Name
          <ArrowsDownUp className="w-3 h-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm text-primary font-medium">
          {row.getValue("name")}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return row.getValue<string>(id).toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Location
          <ArrowsDownUp className="w-3 h-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm text-gray-600">
          {row.getValue("location")}
        </span>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Capacity
          <ArrowsDownUp className="w-3 h-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue("capacity")} people</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Status
          <ArrowsDownUp className="w-3 h-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant="secondary"
          className={
            status === "available"
              ? "bg-green-50 text-green-700 border-green-200"
              : status === "in-use"
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : "bg-orange-50 text-orange-700 border-orange-200"
          }
        >
          {status === "available" ? "Available" : 
           status === "in-use" ? "In Use" : "Maintenance"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="h-8 w-8"
              >
                <DotsThree className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>View Schedule</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
