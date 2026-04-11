"use client";

import { useState } from "react";
import { Users, Baby, UsersThree } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RecordAttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AttendanceData) => void;
}

interface AttendanceData {
  date: string;
  serviceType: string;
  adults: number;
  children: number;
  visitors: number;
  notes?: string;
}

export function RecordAttendanceDialog({
  open,
  onOpenChange,
  onSubmit,
}: RecordAttendanceDialogProps) {
  const [formData, setFormData] = useState<AttendanceData>({
    date: new Date().toISOString().split("T")[0],
    serviceType: "",
    adults: 0,
    children: 0,
    visitors: 0,
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      serviceType: "",
      adults: 0,
      children: 0,
      visitors: 0,
      notes: "",
    });
  };

  const totalAttendance = formData.adults + formData.children + formData.visitors;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-auto flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Record Attendance
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-4">
              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              {/* Service Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Service/Event Type</label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunday-service">Sunday Service</SelectItem>
                    <SelectItem value="midweek-service">Midweek Service</SelectItem>
                    <SelectItem value="prayer-meeting">Prayer Meeting</SelectItem>
                    <SelectItem value="bible-study">Bible Study</SelectItem>
                    <SelectItem value="youth-service">Youth Service</SelectItem>
                    <SelectItem value="special-event">Special Event</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Attendance Counts */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-gray-700">Adults</span>
                  </div>
                  <Input
                    type="number"
                    min="0"
                    value={formData.adults === 0 ? "" : formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: e.target.value === "" ? 0 : parseInt(e.target.value) })}
                    className="w-20 text-center"
                    placeholder="0"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Baby className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Children</span>
                  </div>
                  <Input
                    type="number"
                    min="0"
                    value={formData.children === 0 ? "" : formData.children}
                    onChange={(e) => setFormData({ ...formData, children: e.target.value === "" ? 0 : parseInt(e.target.value) })}
                    className="w-20 text-center"
                    placeholder="0"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UsersThree className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Visitors</span>
                  </div>
                  <Input
                    type="number"
                    min="0"
                    value={formData.visitors === 0 ? "" : formData.visitors}
                    onChange={(e) => setFormData({ ...formData, visitors: e.target.value === "" ? 0 : parseInt(e.target.value) })}
                    className="w-20 text-center"
                    placeholder="0"
                    required
                  />
                </div>

                <div className="pt-3 border-t border-gray-300">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary">{totalAttendance}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Notes (Optional)</label>
                <Textarea
                  placeholder="Add any additional notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0 bg-white border-t border-gray-200">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
