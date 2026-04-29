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
import { DotsThreeVertical, ArrowsDownUpIcon } from "@phosphor-icons/react";
import { Member } from "@/types/people";
import Link from "next/link";

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Helper function to get status badge color
function getStatusBadgeColor(status: string) {
  switch (status.toLowerCase()) {
    case 'active':
      return "bg-green-50 text-green-700 border-green-200";
    case 'inactive':
      return "bg-gray-50 text-gray-700 border-gray-200";
    case 'visitor':
      return "bg-blue-50 text-blue-700 border-blue-200";
    case 'new':
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

export const peopleColumns: ColumnDef<Member>[] = [
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
    accessorKey: "user.name",
    id: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-normal"
        >
          Full name
          <ArrowsDownUpIcon className="ml-1 w-3 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.user?.name || 'Unknown';
      const initials = getInitials(name);
      
      return (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary-light text-primary font-semibold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">{name}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const name = row.original.user?.name || '';
      return name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "user.email",
    id: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original.user?.email;
      return (
        <span className="text-sm text-gray-600">
          {email || 'No email'}
        </span>
      );
    },
  },
  {
    accessorKey: "ageGroup",
    header: "Age group",
    cell: ({ row }) => {
      const ageGroup = row.getValue("ageGroup") as string;
      return (
        <Badge
          variant="secondary"
          className="bg-primary-light text-primary border-primary-lighter"
        >
          {ageGroup || 'Not specified'}
        </Badge>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge variant="outline">
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-gray-600">
          {row.getValue("gender") as string}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-normal"
        >
          Joined church
          <ArrowsDownUpIcon className="ml-1 w-3 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-normal"
        >
          Status
          <ArrowsDownUpIcon className="ml-1 w-3 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const isArchived = row.original.archivedAt != null;
      
      if (isArchived) {
        return (
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-600 border-gray-300"
          >
            Archived
          </Badge>
        );
      }
      
      return (
        <Badge
          variant="secondary"
          className={getStatusBadgeColor(status)}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const isArchived = row.original.archivedAt != null;
      const personId = row.original.id;
      
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                <DotsThreeVertical className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isArchived ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href={`/people/${personId}`}>View Details</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-green-600">
                    Restore
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Delete Permanently
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href={`/people/${personId}`}>Go to profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Archive
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

// Export the Member type for use in components
export type { Member as Person };
