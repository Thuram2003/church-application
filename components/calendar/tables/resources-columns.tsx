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

export type Resource = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  requiresApproval: boolean;
};

export const resourcesColumns: ColumnDef<Resource>[] = [
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
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Description
          <ArrowsDownUp className="w-3 h-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm text-gray-600">
          {row.getValue("description")}
        </span>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Quantity
          <ArrowsDownUp className="w-3 h-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue("quantity")}</span>;
    },
  },
  {
    accessorKey: "requiresApproval",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Requires Approval
          <ArrowsDownUp className="w-3 h-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      const requiresApproval = row.getValue<boolean>("requiresApproval");
      return (
        <Badge
          variant="secondary"
          className={
            requiresApproval
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-gray-50 text-gray-700 border-gray-200"
          }
        >
          {requiresApproval ? "Yes" : "No"}
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
