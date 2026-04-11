"use client";

import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Permission {
  name: string;
  enabled: boolean;
}

interface CreateRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (roleData: {
    name: string;
    description: string;
    permissions: Permission[];
  }) => void;
  initialData?: {
    name: string;
    description: string;
    permissions: Permission[];
  };
}

const availablePermissions = [
  "Members Management",
  "Groups Management",
  "Events Management",
  "Families Management",
  "Messages",
  "Updates",
  "Forms",
  "Funds",
  "Giving",
  "Accounting",
  "Appointments",
  "Pledge Accounts",
  "Settings",
  "Subscription",
  "User Roles",
  "Integrations",
  "Follow Ups",
  "Portal",
  "Batches",
];

export function CreateRoleDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: CreateRoleDialogProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [permissions, setPermissions] = useState<Permission[]>(
    initialData?.permissions ||
      availablePermissions.map((p) => ({ name: p, enabled: false }))
  );

  const togglePermission = (permissionName: string) => {
    setPermissions((prev) =>
      prev.map((p) =>
        p.name === permissionName ? { ...p, enabled: !p.enabled } : p
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      permissions,
    });
    // Reset form
    setName("");
    setDescription("");
    setPermissions(availablePermissions.map((p) => ({ name: p, enabled: false })));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Role" : "Create Custom Role"}
          </DialogTitle>
          <DialogDescription className="pt-4">
            Define a custom role with specific permissions for your team members.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-semibold text-gray-900">
              Role Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., Youth Leader"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-base font-semibold text-gray-900"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what this role can do..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-900">
              Permissions ({permissions.filter((p) => p.enabled).length})
            </Label>
            <div className="border border-gray-200 rounded-sm p-4 max-h-[300px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {permissions.map((permission) => (
                  <button
                    key={permission.name}
                    type="button"
                    onClick={() => togglePermission(permission.name)}
                    className={`flex items-center gap-3 p-3 rounded-sm border transition-colors ${
                      permission.enabled
                        ? "border-primary-light bg-primary-lighter"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                        permission.enabled
                          ? "bg-primary border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {permission.enabled && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        permission.enabled
                          ? "text-purple-900 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {permission.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!name || !description}>
              {initialData ? "Update Role" : "Create Role"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
