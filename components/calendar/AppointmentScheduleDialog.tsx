"use client";

import * as React from "react";
import { Plus, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  day: string;
  enabled: boolean;
  slots: TimeSlot[];
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface AppointmentScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
  onSubmit: (schedule: DaySchedule[]) => void;
}

export function AppointmentScheduleDialog({
  open,
  onOpenChange,
  onBack,
  onSubmit,
}: AppointmentScheduleDialogProps) {
  const [schedule, setSchedule] = React.useState<DaySchedule[]>(
    DAYS.map((day) => ({
      day,
      enabled: false,
      slots: [{ id: "1", startTime: "09:00", endTime: "13:00" }],
    }))
  );

  const resetSchedule = () => {
    setSchedule(
      DAYS.map((day) => ({
        day,
        enabled: false,
        slots: [{ id: "1", startTime: "09:00", endTime: "13:00" }],
      }))
    );
  };

  React.useEffect(() => {
    if (!open) resetSchedule();
  }, [open]);

  const toggleDay = (dayIndex: number, checked: boolean) => {
    const updated = [...schedule];
    updated[dayIndex].enabled = checked;
    setSchedule(updated);
  };

  const addSlot = (dayIndex: number) => {
    const updated = [...schedule];
    updated[dayIndex].slots.push({
      id: Math.random().toString(36).substr(2, 9),
      startTime: "09:00",
      endTime: "17:00",
    });
    setSchedule(updated);
  };

  const removeSlot = (dayIndex: number, slotId: string) => {
    const updated = [...schedule];
    updated[dayIndex].slots = updated[dayIndex].slots.filter((s) => s.id !== slotId);
    setSchedule(updated);
  };

  const updateSlot = (
    dayIndex: number,
    slotId: string,
    field: "startTime" | "endTime",
    value: string
  ) => {
    const updated = [...schedule];
    const slot = updated[dayIndex].slots.find((s) => s.id === slotId);
    if (slot) {
      slot[field] = value;
    }
    setSchedule(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(schedule);
    // Don't close - wizard handles this
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden max-h-[90vh]">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Create new appointment type
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Section Header */}
          <h2 className="text-base font-semibold text-gray-900 text-center mb-4">
            Schedule
          </h2>

          {/* Days List */}
          <div className="space-y-3">
            {schedule.map((daySchedule, dayIndex) => (
              <div
                key={daySchedule.day}
                className={`border rounded-sm transition-all ${
                  daySchedule.enabled
                    ? "border-primary bg-primary-lighter/30"
                    : "border-gray-200 bg-white"
                }`}
              >
                {/* Day Header with Checkbox */}
                <div className="flex items-center gap-3 p-3">
                  <Checkbox
                    id={`day-${daySchedule.day}`}
                    checked={daySchedule.enabled}
                    onCheckedChange={(checked) => toggleDay(dayIndex, checked as boolean)}
                  />
                  <Label
                    htmlFor={`day-${daySchedule.day}`}
                    className={`text-sm font-medium cursor-pointer ${
                      daySchedule.enabled ? "text-primary" : "text-gray-900"
                    }`}
                  >
                    {daySchedule.day}
                  </Label>
                </div>

                {/* Expanded Content */}
                {daySchedule.enabled && (
                  <div className="px-3 pb-3 space-y-3">
                    {daySchedule.slots.map((slot, slotIndex) => (
                      <div key={slot.id} className="space-y-2">
                        {/* Time Labels */}
                        {slotIndex === 0 && (
                          <div className="grid grid-cols-2 gap-2">
                            <span className="text-xs text-gray-500">Start Time</span>
                            <span className="text-xs text-gray-500">End Time</span>
                          </div>
                        )}
                        
                        {/* Time Inputs */}
                        <div className="flex items-center gap-2">
                          <div className="grid grid-cols-2 gap-2 flex-1">
                            <Input
                              type="time"
                              value={slot.startTime}
                              onChange={(e) =>
                                updateSlot(dayIndex, slot.id, "startTime", e.target.value)
                              }
                              className="h-9"
                            />
                            <Input
                              type="time"
                              value={slot.endTime}
                              onChange={(e) =>
                                updateSlot(dayIndex, slot.id, "endTime", e.target.value)
                              }
                              className="h-9"
                            />
                          </div>
                          
                          {/* Remove Slot Button */}
                          {daySchedule.slots.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSlot(dayIndex, slot.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Add Slot Button */}
                    <button
                      type="button"
                      onClick={() => addSlot(dayIndex)}
                      className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Slot
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="text-primary hover:text-primary/80 hover:bg-primary-lighter"
          >
            Back
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save & Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
