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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreatePayeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    type: string;
    email?: string;
    phone?: string;
  }) => void;
}

export function CreatePayeeDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreatePayeeDialogProps) {
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("payee");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError(true);
      return;
    }

    onSubmit({ name, type, email, phone });
    onOpenChange(false);
    // Reset
    setName("");
    setType("payee");
    setEmail("");
    setPhone("");
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
      setType("payee");
      setEmail("");
      setPhone("");
      setError(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] h-auto flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle className="text-base font-semibold text-gray-900">
            Add payee or vendor
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="payee-name" className="text-xs font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="payee-name"
              placeholder="Enter name"
              value={name}
              onChange={handleNameChange}
              className={error ? "border-red-400 focus-visible:ring-red-200" : ""}
            />
            {error && <p className="text-xs text-red-500">Name is required</p>}
          </div>

          {/* Type */}
          <div className="space-y-1.5">
            <Label htmlFor="payee-type" className="text-xs font-medium text-gray-700">
              Type
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="payee-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payee">Payee</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="payee-email" className="text-xs font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="payee-email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="payee-phone" className="text-xs font-medium text-gray-700">
              Phone
            </Label>
            <Input
              id="payee-phone"
              type="tel"
              placeholder="+237 XXX XXX XXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
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
