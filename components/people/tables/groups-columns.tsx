"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThree, ArrowsDownUp } from "@phosphor-icons/react";

import type { Group, GroupVisibility } from "@/types/groups";

export type GroupTableData = Group & {
  initials: string;
  memberCount: number;
};

export const groupsColumns: ColumnDef<GroupTableData>[] = [
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-normal"
        >
          Group name
          <ArrowsDownUp className="ml-1 w-3 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            {row.original.iconUrl ? (
              <AvatarImage src={row.original.iconUrl} alt={row.original.name} />
            ) : (
              <AvatarFallback className="bg-primary-light text-primary font-semibold text-xs">
                {row.original.initials}
              </AvatarFallback>
            )}
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
    accessorKey: "visibility",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-normal"
        >
          Type
          <ArrowsDownUp className="ml-1 w-3 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const visibility = row.getValue("visibility") as GroupVisibility;
      return (
        <Badge
          variant="secondary"
          className={
            visibility === "private"
              ? "bg-orange-50 text-orange-700 border-orange-200"
              : visibility === "public"
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : "bg-primary-lighter text-primary-dark border-primary-light"
          }
        >
          {visibility === "private" ? "Private" : visibility === "public" ? "Public" : "Team"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "memberCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-normal"
        >
          Members
          <ArrowsDownUp className="ml-1 w-3 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const members = row.getValue("memberCount") as number;
      return (
        <span className="text-sm text-gray-600">
          {members || 0} {members === 1 ? "member" : "members"}
        </span>
      );
    },
  },
  {
    accessorKey: "enrollment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-normal"
        >
          Status
          <ArrowsDownUp className="ml-1 w-3 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const enrollment = row.getValue("enrollment") as string;
      return (
        <Badge
          variant="secondary"
          className={
            enrollment === "open" 
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-gray-50 text-gray-700 border-gray-200"
          }
        >
          {enrollment === "open" ? "Open" : "Closed"}
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
