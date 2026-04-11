"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateRoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    location: string;
    capacity: number;
    description: string;
    requiresApproval: boolean;
  }) => void;
}

export function CreateRoomDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateRoomDialogProps) {
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [capacity, setCapacity] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [requiresApproval, setRequiresApproval] = React.useState(false);
  const [errors, setErrors] = React.useState<{ name?: boolean; capacity?: boolean }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !name.trim(),
      capacity: capacity < 0,
    };

    if (newErrors.name || newErrors.capacity) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ name, location, capacity, description, requiresApproval });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setLocation("");
    setCapacity(0);
    setDescription("");
    setRequiresApproval(false);
    setErrors({});
  };

  React.useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] h-auto flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Add Room
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Room Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Main Sanctuary, Sunday School Room A"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: false });
                  }}
                  className={`h-11 ${errors.name ? "border-red-400 focus-visible:ring-red-200" : ""}`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">Room name is required</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location/Building
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., Main Building - 2nd Floor, Parish Hall"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <Label htmlFor="capacity" className="text-sm font-medium text-gray-700">
                  Capacity (People) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  min="0"
                  placeholder="0"
                  className={`h-11 w-32 ${errors.capacity ? "border-red-400 focus-visible:ring-red-200" : ""}`}
                  value={capacity || ""}
                  onChange={(e) => {
                    setCapacity(parseInt(e.target.value) || 0);
                    if (errors.capacity) setErrors({ ...errors, capacity: false });
                  }}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <textarea
                  id="description"
                  placeholder="Enter room description, special notes, or available equipment"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full min-h-[80px] px-3 py-2 text-sm rounded-sm border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
                />
              </div>

              {/* Requires Approval */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="requires-approval"
                    checked={requiresApproval}
                    onCheckedChange={(checked) => setRequiresApproval(checked as boolean)}
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="requires-approval"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Requires Approval
                    </Label>
                    <p className="text-xs text-gray-500">
                      When enabled, room reservations will need to be approved by an administrator
                    </p>
                  </div>
                </div>
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
