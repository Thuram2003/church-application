"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    fund: string;
    startDate: string;
    endDate: string;
  }) => void;
}

export function CreateCampaignDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateCampaignDialogProps) {
  const [name, setName] = React.useState("");
  const [fund, setFund] = React.useState("");
  const [startDate, setStartDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = React.useState(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split("T")[0];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      fund,
      startDate,
      endDate,
    });
    onOpenChange(false);
    // Reset form
    setName("");
    setFund("");
    setStartDate(new Date().toISOString().split("T")[0]);
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    setEndDate(futureDate.toISOString().split("T")[0]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Create campaign
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Campaign Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Campaign name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Associated Fund */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Associated Fund <span className="text-red-500">*</span>
            </label>
            <Select value={fund} onValueChange={setFund} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a fund" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Fund</SelectItem>
                <SelectItem value="tithes">Tithes</SelectItem>
                <SelectItem value="offerings">Offerings</SelectItem>
                <SelectItem value="missions">Missions</SelectItem>
                <SelectItem value="building">Building Fund</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Start Date <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                End Date <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" size="sm">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
