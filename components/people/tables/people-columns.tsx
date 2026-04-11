"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThree, ArrowsDownUp, Copy, Plus } from "@phosphor-icons/react";

export type Person = {
  id: number;
  name: string;
  initials: string;
  ageGroup: string;
  contact: string;
  joinedDate: string;
  status: string;
};

export const peopleColumns: ColumnDef<Person>[] = [
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
          Full name
          <ArrowsDownUp className="w-3 h-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary-light text-primary font-semibold text-xs">
              {row.original.initials}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">{row.getValue("name")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.getValue<string>(id).toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "ageGroup",
    header: "Age group",
    cell: ({ row }) => {
      return (
        <Badge
          variant="secondary"
          className="bg-primary-light text-primary border-primary-lighter"
        >
          {row.getValue("ageGroup")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "Contact information",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{row.getValue("contact")}</span>
          <Button variant="ghost" size="icon-sm" className="h-6 w-6">
            <Copy className="w-3 h-3 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="h-6 w-6">
            <Plus className="w-3 h-3 text-gray-400" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "joinedDate",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Joined church
          <ArrowsDownUp className="w-3 h-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinedDate"));
      return (
        <span className="text-sm text-gray-600">
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      );
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
      return (
        <Badge
          variant="secondary"
          className="bg-green-50 text-green-700 border-green-200"
        >
          {row.getValue("status")}
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
              <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                <DotsThree className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
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
