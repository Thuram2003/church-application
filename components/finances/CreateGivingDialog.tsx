"use client";

import * as React from "react";
import { Plus, MagnifyingGlass, Trash } from "@phosphor-icons/react";
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
import { cn } from "@/lib/utils";

interface GivingEntry {
  id: string;
  fund: string;
  date: string;
  method: string;
  comment: string;
  amount: string;
}

interface Donor {
  id: string;
  name: string;
  isAnonymous: boolean;
  entries: GivingEntry[];
}

interface CreateGivingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { donors: Donor[]; batchId: string | null }) => void;
}

export function CreateGivingDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateGivingDialogProps) {
  const [donors, setDonors] = React.useState<Donor[]>([
    {
      id: "1",
      name: "",
      isAnonymous: false,
      entries: [
        {
          id: "1-1",
          fund: "general",
          date: new Date().toISOString().split("T")[0],
          method: "cash",
          comment: "",
          amount: "",
        },
      ],
    },
  ]);
  const [selectedBatch, setSelectedBatch] = React.useState<string>("");

  const addDonor = () => {
    setDonors([
      ...donors,
      {
        id: Math.random().toString(36).substring(2, 11),
        name: "",
        isAnonymous: false,
        entries: [
          {
            id: Math.random().toString(36).substring(2, 11),
            fund: "general",
            date: new Date().toISOString().split("T")[0],
            method: "cash",
            comment: "",
            amount: "",
          },
        ],
      },
    ]);
  };

  const addGivingEntry = (donorId: string) => {
    setDonors(
      donors.map((donor) => {
        if (donor.id !== donorId) return donor;
        return {
          ...donor,
          entries: [
            ...donor.entries,
            {
              id: Math.random().toString(36).substring(2, 11),
              fund: "general",
              date: new Date().toISOString().split("T")[0],
              method: "cash",
              comment: "",
              amount: "",
            },
          ],
        };
      })
    );
  };

  const updateDonor = (donorId: string, field: keyof Donor, value: any) => {
    setDonors(donors.map((d) => (d.id === donorId ? { ...d, [field]: value } : d)));
  };

  const updateEntry = (
    donorId: string,
    entryId: string,
    field: keyof GivingEntry,
    value: string
  ) => {
    setDonors(
      donors.map((donor) => {
        if (donor.id !== donorId) return donor;
        return {
          ...donor,
          entries: donor.entries.map((entry) =>
            entry.id === entryId ? { ...entry, [field]: value } : entry
          ),
        };
      })
    );
  };

  const removeDonor = (donorId: string) => {
    if (donors.length > 1) {
      setDonors(donors.filter((d) => d.id !== donorId));
    }
  };

  const removeEntry = (donorId: string, entryId: string) => {
    setDonors(
      donors.map((donor) => {
        if (donor.id !== donorId) return donor;
        if (donor.entries.length <= 1) return donor;
        return {
          ...donor,
          entries: donor.entries.filter((e) => e.id !== entryId),
        };
      })
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ donors, batchId: selectedBatch || null });
    onOpenChange(false);
    setDonors([
      {
        id: "1",
        name: "",
        isAnonymous: false,
        entries: [
          {
            id: "1-1",
            fund: "general",
            date: new Date().toISOString().split("T")[0],
            method: "cash",
            comment: "",
            amount: "",
          },
        ],
      },
    ]);
    setSelectedBatch("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[950px] max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-white">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle className="text-base font-semibold text-gray-900">
            Add giving
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-4">
            {donors.map((donor, donorIndex) => (
              <div
                key={donor.id}
                className="relative border border-gray-100 rounded-sm p-4 space-y-4 bg-white"
              >
                <div className="grid grid-cols-12 gap-4 items-start">
                  {/* Donor Column */}
                  <div className="col-span-3">
                    {donorIndex === 0 && (
                      <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                        Name of the donor <span className="text-red-500">*</span>
                      </label>
                    )}
                    <div className="relative">
                      <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search donor..."
                        className="pl-9"
                        value={donor.name}
                        onChange={(e) => updateDonor(donor.id, "name", e.target.value)}
                        required={!donor.isAnonymous}
                        disabled={donor.isAnonymous}
                      />
                    </div>
                    <div className="flex items-center mt-2">
                      <Checkbox
                        id={`anonymous-${donor.id}`}
                        checked={donor.isAnonymous}
                        onCheckedChange={(checked) =>
                          updateDonor(donor.id, "isAnonymous", checked)
                        }
                      />
                      <label
                        htmlFor={`anonymous-${donor.id}`}
                        className="ml-2 text-xs text-gray-500 cursor-pointer"
                      >
                        Anonymous donation
                      </label>
                    </div>
                  </div>

                  {/* Entries Column */}
                  <div className="col-span-9 space-y-3">
                    {donor.entries.map((entry, entryIndex) => (
                      <div 
                        key={entry.id} 
                        className={cn(
                          "grid grid-cols-12 gap-3 items-end",
                          entryIndex !== donor.entries.length - 1 && "pb-3 border-b border-gray-100"
                        )}
                      >
                        <div className="col-span-3">
                          {donorIndex === 0 && entryIndex === 0 && (
                            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                              Fund
                            </label>
                          )}
                          <Select
                            value={entry.fund}
                            onValueChange={(v) => updateEntry(donor.id, entry.id, "fund", v)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="General..." />
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

                        <div className="col-span-2">
                          {donorIndex === 0 && entryIndex === 0 && (
                            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                              Date <span className="text-red-500">*</span>
                            </label>
                          )}
                          <Input
                            type="date"
                            className=""
                            value={entry.date}
                            onChange={(e) =>
                              updateEntry(donor.id, entry.id, "date", e.target.value)
                            }
                            required
                          />
                        </div>

                        <div className="col-span-2">
                          {donorIndex === 0 && entryIndex === 0 && (
                            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                              Method
                            </label>
                          )}
                          <Select
                            value={entry.method}
                            onValueChange={(v) => updateEntry(donor.id, entry.id, "method", v)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Cash" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cash">Cash</SelectItem>
                              <SelectItem value="check">Check</SelectItem>
                              <SelectItem value="card">Credit Card</SelectItem>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                              <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                              <SelectItem value="orange">Orange Money</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="col-span-3">
                          {donorIndex === 0 && entryIndex === 0 && (
                            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                              Comment
                            </label>
                          )}
                          <Input
                            placeholder="Comment"
                            className=""
                            value={entry.comment}
                            onChange={(e) =>
                              updateEntry(donor.id, entry.id, "comment", e.target.value)
                            }
                          />
                        </div>

                        <div className="col-span-2">
                          {donorIndex === 0 && entryIndex === 0 && (
                            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                              Amount <span className="text-red-500">*</span>
                            </label>
                          )}
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              value={entry.amount}
                              onChange={(e) =>
                                updateEntry(donor.id, entry.id, "amount", e.target.value)
                              }
                              required
                            />
                            {donor.entries.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => removeEntry(donor.id, entry.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add another giving - inside donor card */}
                    <button
                      type="button"
                      onClick={() => addGivingEntry(donor.id)}
                      className="w-full py-2 border border-dashed border-gray-300 rounded-sm text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Add another giving
                    </button>
                  </div>
                </div>

                {/* Remove donor button */}
                {donors.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeDonor(donor.id)}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full shadow-sm border border-gray-200 text-red-500 hover:text-red-700 hover:bg-red-50 hover:border-red-200"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Add another donor - outside cards */}
          <button
            type="button"
            onClick={addDonor}
            className="w-full py-2.5 border border-dashed border-gray-300 rounded-sm text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add another donor
          </button>

          {/* Batch Selection */}
          <div className="pt-2">
            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
              Select batch
            </label>
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a batch (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="batch-1">Sunday Service - March 30</SelectItem>
                <SelectItem value="batch-2">Wednesday Service - March 26</SelectItem>
                <SelectItem value="batch-3">Special Offering - March 20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0 bg-white border-t border-gray-200">
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit">Add giving</Button>
      </div>
    </form>
      </DialogContent>
    </Dialog>
  );
}