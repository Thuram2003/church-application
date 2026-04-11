"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface CreateAppointmentTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    assignUser: string;
    location: string;
    visibility: string;
    description: string;
  }) => void;
}

export function CreateAppointmentTypeDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateAppointmentTypeDialogProps) {
  const [name, setName] = React.useState("");
  const [assignUser, setAssignUser] = React.useState("");
  const [location, setLocation] = React.useState("phone");
  const [visibility, setVisibility] = React.useState("public");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, assignUser, location, visibility, description });
    // Don't close or reset - wizard handles this
  };

  const resetForm = () => {
    setName("");
    setAssignUser("");
    setLocation("phone");
    setVisibility("public");
    setDescription("");
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
            General Info
          </h2>

          {/* Appointment Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Appointment Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11"
            />
          </div>

          {/* Assign Users */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Assign Users
            </Label>
            <Select value={assignUser} onValueChange={setAssignUser}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user1">John Doe</SelectItem>
                <SelectItem value="user2">Jane Smith</SelectItem>
                <SelectItem value="user3">Mike Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Location
            </Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">via Phone</SelectItem>
                <SelectItem value="video">via Video Call</SelectItem>
                <SelectItem value="in-person">In Person</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Visibility */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Visibility
            </Label>
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="members-only">Members Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[120px] px-3 py-2 text-sm rounded-sm border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
            />
            <p className="text-xs text-gray-500">
              Visibility determines who can access this appointment type.
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <Button type="submit" className="px-6">
              Save & Next
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
