"use client";

import {
  CalendarBlank,
  CalendarCheck,
  CalendarX,
  Clock,
  MagnifyingGlass,
  Funnel,
  ArrowsDownUp,
  DotsThreeVertical,
  MapPin,
  Users,
  Copy,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Mock data
const events = [
  {
    id: 1,
    title: "Sunday Service",
    date: "2026-04-12",
    time: "09:00 AM",
    location: "Main Sanctuary",
    attendees: 150,
    type: "Service",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Youth Meeting",
    date: "2026-04-15",
    time: "06:00 PM",
    location: "Youth Hall",
    attendees: 45,
    type: "Meeting",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Bible Study",
    date: "2026-04-10",
    time: "07:00 PM",
    location: "Conference Room",
    attendees: 30,
    type: "Meeting",
    status: "Upcoming",
  },
];

type FilterTab = "all" | "upcoming" | "past" | "cancelled";
type SortOption = "date" | "title" | "attendees" | "type";

export function CalendarListView() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date");

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Button
            variant={activeFilter === "all" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("all")}
            className="gap-1"
          >
            <CalendarBlank className="w-4 h-4" />
            All events
          </Button>
          <Button
            variant={activeFilter === "upcoming" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("upcoming")}
            className="gap-1"
          >
            <CalendarCheck className="w-4 h-4" />
            Upcoming
          </Button>
          <Button
            variant={activeFilter === "past" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("past")}
            className="gap-1"
          >
            <Clock className="w-4 h-4" />
            Past
          </Button>
          <Button
            variant={activeFilter === "cancelled" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("cancelled")}
            className="gap-1"
          >
            <CalendarX className="w-4 h-4" />
            Cancelled
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Funnel className="w-4 h-4" />
            Filters
          </Button>
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger size="sm" className="w-[200px] gap-2">
              <ArrowsDownUp className="w-4 h-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
              <SelectItem value="attendees">Attendees</SelectItem>
              <SelectItem value="type">Type</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-100 rounded-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12">
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Event title
                  <ArrowsDownUp className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Date & Time
                  <ArrowsDownUp className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead>Location</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Attendees
                  <ArrowsDownUp className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Status
                  <ArrowsDownUp className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <input type="checkbox" className="rounded" />
                </TableCell>
                <TableCell>
                  <span className="font-medium text-sm">{event.title}</span>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">
                    <div>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="text-xs text-gray-500">{event.time}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {event.location}
                    </span>
                    <Button variant="ghost" size="icon-sm" className="h-6 w-6">
                      <Copy className="w-3 h-3 text-gray-400" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-gray-400" />
                    {event.attendees}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-primary-light text-primary border-primary-lighter"
                  >
                    {event.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="h-8 w-8"
                      >
                        <DotsThreeVertical className="w-4 h-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">
                        Cancel Event
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
