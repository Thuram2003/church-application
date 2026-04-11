"use client";

import {
  CalendarBlank,
  Clock,
  CheckCircle,
  MagnifyingGlass,
  CaretDown,
  DotsThree,
  ShareNetwork,
} from "@phosphor-icons/react";
import { useState } from "react";
import { StatCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/EmptyState";
import { CreateAppointmentTypeWizard } from "@/components/calendar/CreateAppointmentTypeWizard";

// Mock data
const schedules = [
  {
    id: 1,
    title: "Pointeh",
    host: {
      name: "Alex Mice",
      initials: "AM",
    },
    dateRange: "From Mar 30, 2026 - Until Apr 29, 2026",
    status: "Open for bookings",
    duration: "30 min call",
  },
];

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const totalSchedules = schedules.length;
  const openForBookings = schedules.filter((s) => s.status === "Open for bookings").length;
  const comingUpBookings = 0;
  const completedAppointments = 0;

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <CalendarBlank className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Appointments</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setShowCreateDialog(true)}>
            Create new
          </Button>
          <Button variant="ghost" size="icon">
            <DotsThree className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {schedules.length === 0 ? (
        /* Empty State */
        <EmptyState
          title="Manage Your Appointments"
          description="Create schedules and manage bookings for meetings, counseling sessions, and other appointments with your members."
          actionLabel="Create Your First Schedule"
          onAction={() => setShowCreateDialog(true)}
        />
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={CalendarBlank}
              label="Schedules"
              value={totalSchedules.toString()}
            />
            <StatCard
              icon={Clock}
              label="Open for bookings"
              value={openForBookings.toString()}
            />
            <StatCard
              icon={Clock}
              label="Coming up bookings"
              value={comingUpBookings.toString()}
            />
            <StatCard
              icon={CheckCircle}
              label="Completed appointments"
              value={completedAppointments.toString()}
            />
          </div>

          {/* Filters and Search */}
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <CalendarBlank className="w-4 h-4" />
                  Status
                  <CaretDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Open for bookings</DropdownMenuItem>
                <DropdownMenuItem>Closed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Schedules List */}
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-white border border-gray-100 rounded-sm p-5 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-10 h-10 bg-primary-lighter rounded-sm flex items-center justify-center flex-shrink-0">
                      <CalendarBlank className="w-5 h-5 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      {/* Title and Host */}
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-2">
                          {schedule.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-primary-light text-primary text-xs font-semibold">
                              {schedule.host.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">
                            {schedule.host.name}
                          </span>
                          <span className="text-sm text-gray-400">
                            {schedule.host.name}
                          </span>
                        </div>
                      </div>

                      {/* Date Range */}
                      <p className="text-sm text-gray-500">
                        {schedule.dateRange}
                      </p>

                      {/* Badges */}
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {schedule.status}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-orange-50 text-orange-700 border-orange-200"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {schedule.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <ShareNetwork className="w-4 h-4" />
                      Share schedule
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                          <DotsThree className="w-4 h-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                        <DropdownMenuItem>View Bookings</DropdownMenuItem>
                        <DropdownMenuItem>Copy Link</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Create Appointment Type Wizard */}
      <CreateAppointmentTypeWizard
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
}
