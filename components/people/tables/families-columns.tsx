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
import type { FamilyTableData } from "@/types/families";

export const familiesColumns: ColumnDef<FamilyTableData>[] = [
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
          Family name
          <ArrowsDownUp className="ml-1 w-3 h-3" />
        </Button>
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
    accessorKey: "adults",
    header: "Adults",
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue("adults")}</span>;
    },
  },
  {
    accessorKey: "children",
    header: "Children",
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue("children")}</span>;
    },
  },
  {
    accessorKey: "elders",
    header: "Elders",
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue("elders")}</span>;
    },
  },
  {
    accessorKey: "totalMembers",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-normal"
        >
          Total Members
          <ArrowsDownUp className="ml-1 w-3 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm font-medium">
          {row.getValue("totalMembers") || row.original.memberCount || 0}
        </span>
      );
    },
  },
  {
    accessorKey: "headOfHouse",
    header: "Head of House",
    cell: ({ row }) => {
      const headOfHouse = row.original.headOfHouse;
      return (
        <span className="text-sm">
          {headOfHouse?.name || "Not assigned"}
        </span>
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
