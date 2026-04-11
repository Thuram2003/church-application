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

export type Fund = {
  id: number;
  name: string;
  status: string;
  totalCollected: number;
  inPersonCollected: number;
  onlineCollected: number;
};

export const fundsColumns: ColumnDef<Fund>[] = [
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
          Fund name
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
    accessorKey: "status",
    header: "Status",
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
    accessorKey: "totalCollected",
    header: () => <div className="text-right">Total collected</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <span className="font-semibold text-sm">
            XAF {row.getValue<number>("totalCollected").toFixed(2)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "inPersonCollected",
    header: () => <div className="text-right">In-person collected</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <span className="font-semibold text-sm">
            XAF {row.getValue<number>("inPersonCollected").toFixed(2)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "onlineCollected",
    header: () => <div className="text-right">Online collected</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <span className="font-semibold text-sm">
            XAF {row.getValue<number>("onlineCollected").toFixed(2)}
          </span>
        </div>
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
              <DropdownMenuItem>Archive</DropdownMenuItem>
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
