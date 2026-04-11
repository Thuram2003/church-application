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

interface CreateResourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    description: string;
    quantity: number;
    requiresApproval: boolean;
  }) => void;
}

export function CreateResourceDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateResourceDialogProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [requiresApproval, setRequiresApproval] = React.useState(false);
  const [errors, setErrors] = React.useState<{ name?: boolean; quantity?: boolean }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !name.trim(),
      quantity: quantity < 0,
    };

    if (newErrors.name || newErrors.quantity) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ name, description, quantity, requiresApproval });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setQuantity(0);
    setRequiresApproval(false);
    setErrors({});
  };

  React.useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] h-auto flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Add Resource
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter resource name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: false });
              }}
              className={`h-11 ${errors.name ? "border-red-400 focus-visible:ring-red-200" : ""}`}
            />
            {errors.name && (
              <p className="text-xs text-red-500">Name is required</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <textarea
              id="description"
              placeholder="Enter resource description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px] px-3 py-2 text-sm rounded-sm border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
            />
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              Quantity Available <span className="text-red-500">*</span>
            </Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              className={`h-11 w-32 ${errors.quantity ? "border-red-400 focus-visible:ring-red-200" : ""}`}
              value={quantity}
              onChange={(e) => {
                setQuantity(parseInt(e.target.value) || 0);
                if (errors.quantity) setErrors({ ...errors, quantity: false });
              }}
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
                  When enabled, resource requests will need to be approved by an administrator
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
