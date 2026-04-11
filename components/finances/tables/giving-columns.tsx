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
import { DotsThree, ArrowsDownUp } from "@phosphor-icons/react";

export type GivingRecord = {
  id: string;
  date: string;
  donor: {
    name: string;
    initials: string;
  };
  fund: string;
  method: string;
  frequency: string;
  amount: number;
};

export const givingColumns: ColumnDef<GivingRecord>[] = [
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
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          ID
          <ArrowsDownUp className="w-3 h-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm text-primary font-medium">
          {row.getValue("id")}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Date
          <ArrowsDownUp className="w-3 h-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <span className="text-sm text-gray-600">{row.getValue("date")}</span>;
    },
  },
  {
    accessorKey: "donor",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Donor name
          <ArrowsDownUp className="w-3 h-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      const donor = row.getValue("donor") as { name: string; initials: string };
      return (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-[#eef0ff] text-[#443a88] font-semibold text-xs">
              {donor.initials}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">{donor.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "fund",
    header: "Fund",
    cell: ({ row }) => {
      return <span className="text-sm text-primary">{row.getValue("fund")}</span>;
    },
  },
  {
    id: "methodFrequency",
    header: "Method & Frequency",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-primary-lighter text-primary-dark primary-light"
          >
            {row.original.method}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            {row.original.frequency}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <span className="font-semibold text-sm">
            XAF {row.getValue<number>("amount").toFixed(2)}
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
              <DropdownMenuItem>Download Receipt</DropdownMenuItem>
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
