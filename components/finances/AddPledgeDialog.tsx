"use client";

import * as React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddPledgeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    pledger: string;
    amount: string;
    type: string;
    contributeFromStart: boolean;
  }) => void;
  campaignName?: string;
  daysLeft?: number;
}

export function AddPledgeDialog({
  open,
  onOpenChange,
  onSubmit,
  campaignName = "New Items for Students",
  daysLeft = 364,
}: AddPledgeDialogProps) {
  const [pledger, setPledger] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [pledgeType, setPledgeType] = React.useState("one-time");
  const [contributeFromStart, setContributeFromStart] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      pledger,
      amount,
      type: pledgeType,
      contributeFromStart,
    });
    onOpenChange(false);
    // Reset form
    setPledger("");
    setAmount("");
    setPledgeType("one-time");
    setContributeFromStart(false);
  };

  const totalAmount = amount ? parseFloat(amount) : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-auto flex flex-col p-0 gap-0 overflow-hidden bg-white">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle className="text-base font-semibold text-gray-900">
            Add Pledge
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-4">

          {/* Pledger Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Pledger <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search pledger..."
                className="pl-9"
                value={pledger}
                onChange={(e) => setPledger(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Amount and Type Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Pledge Amount <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Pledge Type
              </label>
              <Select value={pledgeType} onValueChange={setPledgeType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contribute from start checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contribute-from-start"
              checked={contributeFromStart}
              onCheckedChange={(checked) => setContributeFromStart(checked as boolean)}
            />
            <label
              htmlFor="contribute-from-start"
              className="text-sm text-gray-700 cursor-pointer"
            >
              Contribute from start
            </label>
          </div>

          {/* Total Amount Display */}
          <div className="pt-2">
            <p className="text-sm text-gray-500">
              Total pledge amount: <span className="font-semibold">XAF {totalAmount.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0 bg-white border-t border-gray-200">
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit">Add Pledge</Button>
      </div>
    </form>
      </DialogContent>
    </Dialog>
  );
}
