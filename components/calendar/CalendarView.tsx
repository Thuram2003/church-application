"use client";

import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import { DayView } from "./DayView";

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Moe",
    date: "2026-04-07",
    time: "09:00 AM",
    color: "bg-yellow-200",
  },
  {
    id: 2,
    title: "Sunday Service",
    date: "2026-04-12",
    time: "09:00 AM",
    color: "bg-blue-200",
  },
  {
    id: 3,
    title: "Youth Meeting",
    date: "2026-04-15",
    time: "06:00 PM",
    color: "bg-primary-light",
  },
];

type ViewMode = "month" | "week" | "day";

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 9)); // April 9, 2026
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  // Navigation functions
  const goToPrevious = () => {
    if (viewMode === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
      );
    } else if (viewMode === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 1);
      setCurrentDate(newDate);
    }
  };

  const goToNext = () => {
    if (viewMode === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
      );
    } else if (viewMode === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date(2026, 3, 9)); // April 9, 2026
  };

  const isToday = (date: Date) => {
    const today = new Date(2026, 3, 9);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Get display title based on view mode
  const getDisplayTitle = () => {
    if (viewMode === "month") {
      return currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } else if (viewMode === "week") {
      const weekStart = new Date(currentDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      return `${weekStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${weekEnd.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`;
    } else {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Calendar Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={goToPrevious}
              className="h-8 w-8"
            >
              <CaretLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="min-w-[80px]"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={goToNext}
              className="h-8 w-8"
            >
              <CaretRight className="w-4 h-4" />
            </Button>
          </div>
          <h2 className="text-base font-semibold text-gray-900">
            {getDisplayTitle()}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden">
            <Button
              variant={viewMode === "month" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("month")}
              className="rounded-none border-0"
            >
              Month
            </Button>
            <Button
              variant={viewMode === "week" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("week")}
              className="rounded-none border-0 border-l"
            >
              Week
            </Button>
            <Button
              variant={viewMode === "day" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("day")}
              className="rounded-none border-0 border-l"
            >
              Day
            </Button>
          </div>
        </div>
      </div>

      {/* Render based on view mode */}
      {viewMode === "month" && (
        <MonthView
          currentDate={currentDate}
          events={mockEvents}
          isToday={isToday}
        />
      )}
      {viewMode === "week" && (
        <WeekView
          currentDate={currentDate}
          events={mockEvents}
          isToday={isToday}
        />
      )}
      {viewMode === "day" && (
        <DayView currentDate={currentDate} events={mockEvents} />
      )}
    </div>
  );
}
