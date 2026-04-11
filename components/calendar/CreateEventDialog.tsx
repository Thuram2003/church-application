"use client";

import * as React from "react";
import { Image as ImageIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Event data type
interface EventData {
  name: string;
  description: string;
  calendar: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  isAllDay: boolean;
  repeat: string;
  locationType: string;
  location: string;
  limitedSeats: boolean;
  enableChildCheckIn: boolean;
  isPaidEvent: boolean;
  requiresRegistration: boolean;
}

// Props for the dialog
interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: EventData) => void;
}

export function CreateEventDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateEventDialogProps) {
  // State for event data
  const [eventData, setEventData] = React.useState<EventData>({
    name: "",
    description: "",
    calendar: "Main Calendar",
    startDate: "",
    startTime: "09:00",
    endDate: "",
    endTime: "11:00",
    isAllDay: false,
    repeat: "Does not repeat",
    locationType: "Custom Location",
    location: "",
    limitedSeats: false,
    enableChildCheckIn: false,
    isPaidEvent: false,
    requiresRegistration: false,
  });

  // Update event field
  const updateField = (field: keyof EventData, value: string | boolean) => {
    setEventData({ ...eventData, [field]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(eventData);
    onOpenChange(false);
    // Reset form
    setEventData({
      name: "",
      description: "",
      calendar: "Main Calendar",
      startDate: "",
      startTime: "09:00",
      endDate: "",
      endTime: "11:00",
      isAllDay: false,
      repeat: "Does not repeat",
      locationType: "Custom Location",
      location: "",
      limitedSeats: false,
      enableChildCheckIn: false,
      isPaidEvent: false,
      requiresRegistration: false,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-[600px] p-0 flex flex-col">
        {/* Header - Fixed */}
        <SheetHeader className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <SheetTitle className="text-xl font-semibold text-gray-900">
            Create Event
          </SheetTitle>
        </SheetHeader>

        {/* Form - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <form id="create-event-form" onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Image Upload Area */}
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-primary-lighter rounded-sm flex items-center justify-center border-2 border-dashed border-primary-light flex-shrink-0">
                <ImageIcon className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <Input
                  placeholder="Name of the event *"
                  value={eventData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                  className="mb-2"
                />
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  + Add description
                </button>
                <p className="text-xs text-gray-400 mt-2">Max image size: 1MB</p>
              </div>
            </div>

            {/* Event Calendar */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Event calendar <span className="text-red-500">*</span>
              </label>
              <Select
                value={eventData.calendar}
                onValueChange={(value) => updateField("calendar", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main Calendar">Main Calendar</SelectItem>
                  <SelectItem value="Youth Calendar">Youth Calendar</SelectItem>
                  <SelectItem value="Children Calendar">
                    Children Calendar
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Event Start and End */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Event start <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={eventData.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                  required
                />
                <Input
                  type="time"
                  value={eventData.startTime}
                  onChange={(e) => updateField("startTime", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Event end <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={eventData.endDate}
                  onChange={(e) => updateField("endDate", e.target.value)}
                  required
                />
                <Input
                  type="time"
                  value={eventData.endTime}
                  onChange={(e) => updateField("endTime", e.target.value)}
                />
              </div>
            </div>

            {/* All Day Event Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="allDay"
                checked={eventData.isAllDay}
                onChange={(e) => updateField("isAllDay", e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="allDay" className="text-sm text-gray-600">
                This is an all day event.
              </label>
            </div>

            {/* Event Duration Info */}
            <p className="text-sm text-gray-500">1 day event</p>

            {/* Repeat */}
            <div className="space-y-2">
              <Select
                value={eventData.repeat}
                onValueChange={(value) => updateField("repeat", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Does not repeat">
                    Does not repeat
                  </SelectItem>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">
                    Weekly on{" "}
                    {new Date().toLocaleDateString("en-US", { weekday: "long" })}
                  </SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Location Type
              </label>
              <Select
                value={eventData.locationType}
                onValueChange={(value) => updateField("locationType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Custom Location">
                    Custom Location
                  </SelectItem>
                  <SelectItem value="Main Sanctuary">Main Sanctuary</SelectItem>
                  <SelectItem value="Youth Hall">Youth Hall</SelectItem>
                  <SelectItem value="Conference Room">Conference Room</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Event Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Event location
              </label>
              <Input
                placeholder="Enter event location or online link"
                value={eventData.location}
                onChange={(e) => updateField("location", e.target.value)}
              />
            </div>

            {/* Toggle Options */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <label htmlFor="limitedSeats" className="text-sm text-gray-600">
                  Limited seats
                </label>
                <Switch
                  id="limitedSeats"
                  checked={eventData.limitedSeats}
                  onCheckedChange={(checked) =>
                    updateField("limitedSeats", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="childCheckIn" className="text-sm text-gray-600">
                  Enable child check-in
                </label>
                <Switch
                  id="childCheckIn"
                  checked={eventData.enableChildCheckIn}
                  onCheckedChange={(checked) =>
                    updateField("enableChildCheckIn", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="paidEvent" className="text-sm text-gray-600">
                  This is a paid event.
                </label>
                <Switch
                  id="paidEvent"
                  checked={eventData.isPaidEvent}
                  onCheckedChange={(checked) =>
                    updateField("isPaidEvent", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="registration" className="text-sm text-gray-600">
                  Requires registrations
                </label>
                <Switch
                  id="registration"
                  checked={eventData.requiresRegistration}
                  onCheckedChange={(checked) =>
                    updateField("requiresRegistration", checked)
                  }
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer - Fixed */}
        <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0 bg-white">
          <Button 
            type="submit" 
            form="create-event-form"
            size="default" 
            className="w-full sm:w-auto px-8"
          >
            Create Event
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
