"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateSubcategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; categoryId: number }) => void;
  categoryId: number;
  categoryName: string;
}

export function CreateSubcategoryDialog({
  open,
  onOpenChange,
  onSubmit,
  categoryId,
  categoryName,
}: CreateSubcategoryDialogProps) {
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError(true);
      return;
    }

    onSubmit({ name, categoryId });
    onOpenChange(false);
    // Reset
    setName("");
    setError(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error && e.target.value.trim()) {
      setError(false);
    }
  };

  // Reset form when dialog closes
  React.useEffect(() => {
    if (!open) {
      setName("");
      setError(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-5 pb-4 border-b border-gray-100">
          <DialogTitle className="text-base font-semibold text-gray-900">
            Add subcategory to {categoryName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Subcategory Name */}
          <div className="space-y-1.5">
            <Label 
              htmlFor="subcategory-name" 
              className="text-xs font-medium text-gray-700"
            >
              Subcategory Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subcategory-name"
              placeholder="Enter subcategory name"
              value={name}
              onChange={handleNameChange}
              className={error ? "border-red-400 focus-visible:ring-red-200" : ""}
            />
            {error && (
              <p className="text-xs text-red-500">Subcategory name is required</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
