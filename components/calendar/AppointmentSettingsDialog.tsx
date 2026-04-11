"use client";

import * as React from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AppointmentSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
  onSubmit: (data: {
    sessionDuration: string;
    scheduleStartDate: string;
    allowBookingUpTo: string;
    preventBooking: boolean;
    preventBookingDays: number;
    preventCancellation: boolean;
    preventCancellationDays: number;
  }) => void;
}

export function AppointmentSettingsDialog({
  open,
  onOpenChange,
  onBack,
  onSubmit,
}: AppointmentSettingsDialogProps) {
  const [sessionDuration, setSessionDuration] = React.useState("30");
  const [scheduleStartDate, setScheduleStartDate] = React.useState("2026-04-07");
  const [allowBookingUpTo, setAllowBookingUpTo] = React.useState("30");
  const [preventBooking, setPreventBooking] = React.useState(false);
  const [preventBookingDays, setPreventBookingDays] = React.useState(0);
  const [preventCancellation, setPreventCancellation] = React.useState(false);
  const [preventCancellationDays, setPreventCancellationDays] = React.useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      sessionDuration,
      scheduleStartDate,
      allowBookingUpTo,
      preventBooking,
      preventBookingDays,
      preventCancellation,
      preventCancellationDays,
    });
  };

  const adjustDays = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number,
    delta: number
  ) => {
    const newValue = Math.max(0, value + delta);
    setter(newValue);
  };

  const resetForm = () => {
    setSessionDuration("30");
    setScheduleStartDate("2026-04-07");
    setAllowBookingUpTo("30");
    setPreventBooking(false);
    setPreventBookingDays(0);
    setPreventCancellation(false);
    setPreventCancellationDays(0);
  };

  React.useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Create new appointment type
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Section Header */}
          <h2 className="text-base font-semibold text-gray-900 text-center">
            Settings
          </h2>

          {/* Session Duration */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Session Duration (minutes)
            </Label>
            <Select value={sessionDuration} onValueChange={setSessionDuration}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="45">45</SelectItem>
                <SelectItem value="60">60</SelectItem>
                <SelectItem value="90">90</SelectItem>
                <SelectItem value="120">120</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Schedule Start Date */}
          <div className="space-y-2">
            <Label htmlFor="start-date" className="text-sm font-medium text-gray-700">
              Schedule Start Date
            </Label>
            <Input
              id="start-date"
              type="date"
              className="h-11"
              value={scheduleStartDate}
              onChange={(e) => setScheduleStartDate(e.target.value)}
            />
          </div>

          {/* Allow Booking Up To */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Allow Booking Up To
            </Label>
            <Select value={allowBookingUpTo} onValueChange={setAllowBookingUpTo}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Prevent Booking Toggle */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="prevent-booking" className="text-sm font-medium text-gray-700">
                Prevent Booking
              </Label>
              <Switch
                id="prevent-booking"
                checked={preventBooking}
                onCheckedChange={setPreventBooking}
              />
            </div>

            {/* Conditional: Prevent Booking Days */}
            {preventBooking && (
              <div className="space-y-2 pl-0">
                <Label className="text-sm text-gray-600">
                  Prevent Booking X days before
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    min="0"
                    className="h-11 flex-1"
                    value={preventBookingDays}
                    onChange={(e) => setPreventBookingDays(parseInt(e.target.value) || 0)}
                  />
                  <button
                    type="button"
                    onClick={() => adjustDays(setPreventBookingDays, preventBookingDays, -1)}
                    className="p-2 text-gray-500 hover:text-primary hover:bg-primary-lighter rounded-sm transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustDays(setPreventBookingDays, preventBookingDays, 1)}
                    className="p-2 text-gray-500 hover:text-primary hover:bg-primary-lighter rounded-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Prevent Cancellation Toggle */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="prevent-cancellation" className="text-sm font-medium text-gray-700">
                Prevent Cancellation
              </Label>
              <Switch
                id="prevent-cancellation"
                checked={preventCancellation}
                onCheckedChange={setPreventCancellation}
              />
            </div>

            {/* Conditional: Prevent Cancellation Days */}
            {preventCancellation && (
              <div className="space-y-2 pl-0">
                <Label className="text-sm text-gray-600">
                  Prevent Cancellation X days before
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    min="0"
                    className="h-11 flex-1"
                    value={preventCancellationDays}
                    onChange={(e) => setPreventCancellationDays(parseInt(e.target.value) || 0)}
                  />
                  <button
                    type="button"
                    onClick={() => adjustDays(setPreventCancellationDays, preventCancellationDays, -1)}
                    className="p-2 text-gray-500 hover:text-primary hover:bg-primary-lighter rounded-sm transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustDays(setPreventCancellationDays, preventCancellationDays, 1)}
                    className="p-2 text-gray-500 hover:text-primary hover:bg-primary-lighter rounded-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
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
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
