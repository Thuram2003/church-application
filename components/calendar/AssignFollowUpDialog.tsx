"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface AssignFollowUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    member: string;
    assignTo: string;
    type: string;
    action: string;
    date: string;
    time: string;
    notes: string;
  }) => void;
}

export function AssignFollowUpDialog({
  open,
  onOpenChange,
  onSubmit,
}: AssignFollowUpDialogProps) {
  const [member, setMember] = React.useState("");
  const [assignTo, setAssignTo] = React.useState("");
  const [type, setType] = React.useState("");
  const [action, setAction] = React.useState("");
  const [date, setDate] = React.useState("2026-03-30");
  const [time, setTime] = React.useState("05:46");
  const [notes, setNotes] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ member, assignTo, type, action, date, time, notes });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setMember("");
    setAssignTo("");
    setType("");
    setAction("");
    setDate("2026-03-30");
    setTime("05:46");
    setNotes("");
  };

  React.useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Assign Follow Up
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Row 1: Member & Assign To */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-700">Member</Label>
              <Select value={member} onValueChange={setMember}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select members" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member1">John Doe</SelectItem>
                  <SelectItem value="member2">Jane Smith</SelectItem>
                  <SelectItem value="member3">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-700">Assign To</Label>
              <Select value={assignTo} onValueChange={setAssignTo}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user1">Pastor Smith</SelectItem>
                  <SelectItem value="user2">Elder Johnson</SelectItem>
                  <SelectItem value="user3">Deacon Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: Type & Action */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-700">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visit">Home Visit</SelectItem>
                  <SelectItem value="call">Phone Call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-700">Action</Label>
              <Select value={action} onValueChange={setAction}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="welcome">Welcome</SelectItem>
                  <SelectItem value="check-in">Check-in</SelectItem>
                  <SelectItem value="prayer">Prayer Request</SelectItem>
                  <SelectItem value="concern">Pastoral Concern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-700">Follow-Up Date</Label>
              <Input
                type="date"
                className="h-10"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-700">Follow-Up Time</Label>
              <Input
                type="time"
                className="h-10"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          {/* Row 4: Notes */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-gray-700">Notes</Label>
            <Textarea
              placeholder="Enter notes..."
              className="min-h-[80px] resize-y"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button type="submit" size="sm">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
