"use client";

import {
  FileText,
  Plus,
  MagnifyingGlass,
  DotsThree,
  LockOpen,
  Lock,
  CaretDown,
} from "@phosphor-icons/react";
import { useState } from "react";
import { StatCard } from "@/components/dashboard";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateFormDialog } from "@/components/forms/CreateFormDialog";

const forms = [
  {
    id: 1,
    name: "Volunteer Signup Form",
    submissions: 0,
    status: "Open",
    createdDate: "Mar 30, 2026",
  },
];

export default function FormsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const totalForms = forms.length;
  const openForms = forms.filter((f) => f.status === "Open").length;
  const closedForms = forms.filter((f) => f.status === "Closed").length;

  const handleCreateForm = (data: any) => {
    console.log("Creating form:", data);
    // API call here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <FileText className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Forms</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setCreateDialogOpen(true)} size="sm">
            Create form
          </Button>
          <Button variant="outline" size="sm">
            Embed forms
          </Button>
          <Button variant="ghost" size="icon">
            <DotsThree className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={FileText} label="Forms" value={totalForms.toString()} />
        <StatCard icon={LockOpen} label="Open" value={openForms.toString()} />
        <StatCard icon={Lock} label="Closed" value={closedForms.toString()} />
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-100 rounded-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name of the form</TableHead>
              <TableHead>Submissions Received</TableHead>
              <TableHead>Submissions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms.map((form) => (
              <TableRow key={form.id}>
                <TableCell>
                  <span className="text-sm text-primary font-medium">
                    {form.name}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-primary">
                    {form.submissions} submissions
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      form.status === "Open"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }
                  >
                    {form.status}
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
                      <DropdownMenuItem>View Submissions</DropdownMenuItem>
                      <DropdownMenuItem>Edit Form</DropdownMenuItem>
                      <DropdownMenuItem>
                        {form.status === "Open" ? "Close Form" : "Open Form"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
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

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 p-4 border-t border-gray-100">
          <Button variant="ghost" size="icon-sm" disabled>
            <CaretDown className="w-4 h-4 rotate-90" />
          </Button>
          <Button variant="ghost" size="icon-sm" disabled>
            <CaretDown className="w-4 h-4 -rotate-90" />
          </Button>
          <span className="text-sm text-gray-600 mx-2">1</span>
          <Button variant="ghost" size="icon-sm" disabled>
            <CaretDown className="w-4 h-4 rotate-90" />
          </Button>
          <Button variant="ghost" size="icon-sm" disabled>
            <CaretDown className="w-4 h-4 -rotate-90" />
          </Button>
          <Select defaultValue="10">
            <SelectTrigger className="w-[70px] h-8 ml-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Create Form Dialog */}
      <CreateFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateForm}
      />
    </div>
  );
}
