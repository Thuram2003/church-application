"use client";

import { DotsThree } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: number;
  email: string;
  role: string;
  status: string;
}

interface UsersTabProps {
  users: User[];
  onEditUser?: (user: User) => void;
  onResendInvitation?: (user: User) => void;
  onRemoveUser?: (user: User) => void;
}

export function UsersTab({
  users,
  onEditUser,
  onResendInvitation,
  onRemoveUser,
}: UsersTabProps) {
  return (
    <div className="border border-gray-100 rounded-sm bg-white">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <span className="text-sm text-primary font-medium">
                  {user.email}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-primary-light text-primary border-primary-lighter"
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-pink-50 text-pink-700 border-pink-200"
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                      <DotsThree className="w-4 h-4 text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditUser?.(user)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditUser?.(user)}>
                      Edit Role
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onResendInvitation?.(user)}>
                      Resend Invitation
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => onRemoveUser?.(user)}
                    >
                      Remove User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
