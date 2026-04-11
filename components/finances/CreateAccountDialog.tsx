"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CreateAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    type: "asset" | "liability";
    date: string;
    connectWithFunds: boolean;
    openingBalance: string;
  }) => void;
}

export function CreateAccountDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateAccountDialogProps) {
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState<"asset" | "liability">("asset");
  const [date, setDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [connectWithFunds, setConnectWithFunds] = React.useState(false);
  const [openingBalance, setOpeningBalance] = React.useState("0.00");
  const [errors, setErrors] = React.useState<{ name?: boolean }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrors({ name: true });
      return;
    }

    onSubmit({
      name,
      type,
      date,
      connectWithFunds,
      openingBalance,
    });

    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setType("asset");
    setDate(new Date().toISOString().split("T")[0]);
    setConnectWithFunds(false);
    setOpeningBalance("0.00");
    setErrors({});
  };

  // Reset when dialog closes
  React.useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden bg-white">
        <DialogHeader className="p-5 pb-4 border-b border-gray-100">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Create Account
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Account Name */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-700">
              Account name <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Enter account name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({});
              }}
              className={cn(
                "h-11",
                errors.name && "border-red-400 focus-visible:ring-red-200"
              )}
            />
          </div>

          {/* Account Type */}
          <div className="space-y-3">
            <Label className="text-sm text-gray-700">Account Type</Label>
            <RadioGroup
              value={type}
              onValueChange={(v) => setType(v as "asset" | "liability")}
              className="space-y-3"
            >
              {/* Asset Option */}
              <label
                htmlFor="asset"
                className={cn(
                  "flex items-start gap-3 p-4 rounded-sm border-2 transition-all cursor-pointer",
                  type === "asset"
                    ? "border-primary bg-primary-light"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <RadioGroupItem value="asset" id="asset" className="mt-0.5" />
                <div className="space-y-1">
                  <span className="text-sm font-medium cursor-pointer text-gray-900">
                    Asset
                  </span>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Items like bank accounts, property, or possessions that you own.
                  </p>
                </div>
              </label>

              {/* Liability Option */}
              <label
                htmlFor="liability"
                className={cn(
                  "flex items-start gap-3 p-4 rounded-sm border-2 transition-all cursor-pointer",
                  type === "liability"
                    ? "border-primary bg-primary-light"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <RadioGroupItem value="liability" id="liability" className="mt-0.5" />
                <div className="space-y-1">
                  <span className="text-sm font-medium cursor-pointer text-gray-900">
                    Liability
                  </span>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Refers to loans, mortgages, credit cards, or any account reflecting money you owe.
                  </p>
                </div>
              </label>
            </RadioGroup>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-700">
              Date <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              className="h-11"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Connect with Funds */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="connect-funds"
              checked={connectWithFunds}
              onCheckedChange={(checked) => setConnectWithFunds(checked as boolean)}
            />
            <Label htmlFor="connect-funds" className="text-sm text-gray-700 cursor-pointer">
              Connect with funds
            </Label>
          </div>

          {/* Opening Balance */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-700">
              Opening balance <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-medium text-sm">
                XAF
              </span>
              <Input
                type="number"
                step="0.01"
                min="0"
                className="pl-12 h-11"
                value={openingBalance}
                onChange={(e) => setOpeningBalance(e.target.value)}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
