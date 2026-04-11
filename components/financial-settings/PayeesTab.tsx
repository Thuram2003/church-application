"use client";

import {
  Plus,
  MagnifyingGlass,
  DotsThree,
  Users,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type Payee = {
  id: number;
  name: string;
  type: string;
  email?: string;
  phone?: string;
};

interface PayeesTabProps {
  payees: Payee[];
  onCreatePayee: () => void;
}

export function PayeesTab({ payees, onCreatePayee }: PayeesTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  if (payees.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-medium text-gray-900 mb-1">
            No payees or vendors yet
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Add your first payee or vendor to get started
          </p>
          <Button size="sm" onClick={onCreatePayee}>
            <Plus className="w-4 h-4 mr-2" />
            Add payee or vendor
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-gray-900">
            Payees & Vendors
            <span className="ml-2 text-sm font-normal text-gray-500">
              {payees.length}
            </span>
          </h2>
          <Button size="sm" onClick={onCreatePayee}>
            <Plus className="w-4 h-4 mr-2" />
            Add payee or vendor
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Payees Table */}
      <div className="border border-gray-100 rounded-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payees.map((payee) => (
              <TableRow key={payee.id}>
                <TableCell>
                  <span className="text-sm font-medium text-gray-900">
                    {payee.name}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      payee.type === "vendor"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-primary-lighter text-primary-dark border-primary-light"
                    }
                  >
                    {payee.type.charAt(0).toUpperCase() + payee.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {payee.email || "-"}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {payee.phone || "-"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                        <DotsThree className="w-4 h-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
