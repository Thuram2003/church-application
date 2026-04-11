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
import Link from "next/link";

export type Pledge = {
  id: number;
  campaignName: string;
  fund: string;
  status: string;
  startDate: string;
  endDate: string;
  totalPledged: number;
  totalRaised: number;
  remaining: number;
  progress: number;
};

export const pledgesColumns: ColumnDef<Pledge>[] = [
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
    accessorKey: "campaignName",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Name of the campaign
          <ArrowsDownUp className="w-3 h-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`/pledges/${row.original.id}`}
          className="text-sm text-primary font-medium hover:underline"
        >
          {row.getValue("campaignName")}
        </Link>
      );
    },
    filterFn: (row, id, value) => {
      return row.getValue<string>(id).toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "fund",
    header: "Fund",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-primary">
          {row.getValue("fund")}
        </span>
      );
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
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-gray-600">
          {row.getValue("startDate")}
        </span>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-gray-600">
          {row.getValue("endDate")}
        </span>
      );
    },
  },
  {
    accessorKey: "totalPledged",
    header: () => <div className="text-right">Total Pledged</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <span className="font-semibold text-sm">
            XAF {row.getValue<number>("totalPledged").toFixed(2)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalRaised",
    header: () => <div className="text-right">Total Raised</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <span className="font-semibold text-sm">
            XAF {row.getValue<number>("totalRaised").toFixed(2)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "remaining",
    header: () => <div className="text-right">Remaining</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <span className="font-semibold text-sm">
            XAF {row.getValue<number>("remaining").toFixed(2)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const progress = row.getValue<number>("progress");
      return (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-600 min-w-[35px]">
            {progress}%
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
              <DropdownMenuItem asChild>
                <Link href={`/pledges/${row.original.id}`}>View</Link>
              </DropdownMenuItem>
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
