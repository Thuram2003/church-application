"use client";

import {
  CalendarBlank,
  CalendarCheck,
  CalendarX,
  Clock,
  CaretDown,
  DotsThreeVertical,
  List,
} from "@phosphor-icons/react";
import { useState } from "react";
import { StatCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TabNavigation } from "@/components/TabNavigation";
import { CalendarView } from "@/components/calendar/CalendarView";
import { CalendarListView } from "@/components/calendar/CalendarListView";
import { CreateEventDialog } from "@/components/calendar/CreateEventDialog";

export default function CalendarPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("calendar");

  const handleCreateEvent = (event: any) => {
    console.log("Creating event:", event);
    // API call here
  };

  const tabs = [
    {
      value: "calendar",
      label: "Calendar",
      icon: <CalendarBlank className="w-4 h-4" />,
      content: <CalendarView />,
    },
    {
      value: "list",
      label: "List",
      icon: <List className="w-4 h-4" />,
      content: <CalendarListView />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <CalendarBlank className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Calendar</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Split Button */}
          <div className="flex items-center">
            <Button
              onClick={() => setCreateDialogOpen(true)}
              className="rounded-r-none"
              size="sm"
            >
              Create event
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-l-none" size="sm">
                  <CaretDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setCreateDialogOpen(true)}>
                  Create event
                </DropdownMenuItem>
                <DropdownMenuItem>Import events</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant="ghost" size="icon">
            <DotsThreeVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CalendarBlank} label="Total events" value="24" />
        <StatCard icon={CalendarCheck} label="Upcoming" value="8" />
        <StatCard icon={Clock} label="This week" value="3" />
        <StatCard icon={CalendarX} label="Cancelled" value="2" />
      </div>

      {/* Tabs */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Create Event Dialog */}
      <CreateEventDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
}
