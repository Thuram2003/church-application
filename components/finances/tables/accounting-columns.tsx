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

export type Account = {
  id: number;
  name: string;
  type: string;
  fundsConnected: string;
  openingDate: string;
  openingBalance: number;
  currentBalance: number;
};

export const accountingColumns: ColumnDef<Account>[] = [
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
          Account name
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
    accessorKey: "type",
    header: "Account type",
    cell: ({ row }) => {
      return (
        <Badge
          variant="secondary"
          className="bg-primary-lighter text-primary-dark border-primary-light"
        >
          {row.getValue("type")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "fundsConnected",
    header: "Fund(s) connected",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-gray-600">
          {row.getValue("fundsConnected")}
        </span>
      );
    },
  },
  {
    accessorKey: "openingDate",
    header: "Opening date",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-gray-600">
          {row.getValue("openingDate")}
        </span>
      );
    },
  },
  {
    accessorKey: "openingBalance",
    header: () => <div className="text-right">Opening balance</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <span className="font-semibold text-sm">
            XAF {row.getValue<number>("openingBalance").toFixed(2)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "currentBalance",
    header: () => <div className="text-right">Current balance</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <span className="font-semibold text-sm">
            XAF {row.getValue<number>("currentBalance").toFixed(2)}
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
              <DropdownMenuItem>View Transactions</DropdownMenuItem>
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
