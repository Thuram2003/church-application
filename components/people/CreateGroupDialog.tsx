"use client";

import * as React from "react";
import { Plus, LockKey, Globe, UsersFour } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Group data type
interface GroupData {
  groupName: string;
  groupType: "private" | "public" | "team";
  groupImage?: string;
}

// Props for the dialog
interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (group: GroupData) => void;
}

export function CreateGroupDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateGroupDialogProps) {
  const [groupName, setGroupName] = React.useState("");
  const [groupType, setGroupType] = React.useState<"private" | "public" | "team">("private");
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle image upload
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      groupName,
      groupType,
      groupImage: imagePreview || undefined,
    });
    onOpenChange(false);
    // Reset form
    setGroupName("");
    setGroupType("private");
    setImagePreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-auto flex flex-col p-0 gap-0 overflow-hidden bg-white">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Create group
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-4">
          <div className="flex gap-4">
            {/* Group Image Upload */}
            <div className="flex-shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={handleImageClick}
                className="w-32 h-32 border-2 border-dashed border-primary rounded-sm flex items-center justify-center bg-primary-lighter hover:bg-primary-light transition-colors overflow-hidden"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Group preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Plus className="w-8 h-8 text-primary" />
                )}
              </button>
            </div>

            {/* Group Name */}
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Name of your group <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Ministry Army"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                className="h-10"
              />
            </div>
          </div>

          {/* Group Type Selection */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setGroupType("private")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-sm border transition-colors ${
                groupType === "private"
                  ? "bg-primary-lighter border-primary text-primary"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <LockKey className="w-4 h-4" />
              <span className="text-sm font-medium">Private group</span>
            </button>
            <button
              type="button"
              onClick={() => setGroupType("public")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-sm border transition-colors ${
                groupType === "public"
                  ? "bg-primary-lighter border-primary text-primary"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Public group</span>
            </button>
            <button
              type="button"
              onClick={() => setGroupType("team")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-sm border transition-colors ${
                groupType === "team"
                  ? "bg-primary-lighter border-primary text-primary"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <UsersFour className="w-4 h-4" />
              <span className="text-sm font-medium">Team</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0 bg-white border-t border-gray-200">
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit">Add group</Button>
      </div>
    </form>
      </DialogContent>
    </Dialog>
  );
}
