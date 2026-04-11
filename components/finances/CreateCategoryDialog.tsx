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

interface CreateCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string }) => void;
}

export function CreateCategoryDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateCategoryDialogProps) {
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError(true);
      return;
    }

    onSubmit({ name });
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
      <DialogContent className="sm:max-w-[420px] h-auto flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle className="text-base font-semibold text-gray-900">
            Add category
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-4">
          {/* Category Name */}
          <div className="space-y-1.5">
            <Label 
              htmlFor="category-name" 
              className="text-xs font-medium text-gray-700"
            >
              Category Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="category-name"
              placeholder="Enter category name"
              value={name}
              onChange={handleNameChange}
              className={error ? "border-red-400 focus-visible:ring-red-200" : ""}
            />
            {error && (
              <p className="text-xs text-red-500">Category name is required</p>
            )}
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
