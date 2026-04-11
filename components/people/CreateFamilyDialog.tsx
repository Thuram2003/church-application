"use client";

import * as React from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Member type
interface Member {
  id: string;
  name: string;
  initials: string;
}

// Family data type
interface FamilyData {
  familyName: string;
  selectedMembers: Member[];
}

// Props for the dialog
interface CreateFamilyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (family: FamilyData) => void;
}

export function CreateFamilyDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateFamilyDialogProps) {
  const [familyName, setFamilyName] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedMembers, setSelectedMembers] = React.useState<Member[]>([]);

  // Mock members for demo - replace with actual data
  const availableMembers: Member[] = [
    { id: "1", name: "Moe", initials: "M" },
    { id: "2", name: "John Doe", initials: "JD" },
    { id: "3", name: "Jane Smith", initials: "JS" },
  ];

  // Remove member from selection
  const removeMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== memberId));
  };

  // Add member to selection
  const addMember = (member: Member) => {
    if (!selectedMembers.find((m) => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      familyName,
      selectedMembers,
    });
    onOpenChange(false);
    // Reset form
    setFamilyName("");
    setSearchQuery("");
    setSelectedMembers([]);
  };

  // Filter members based on search
  const filteredMembers = availableMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-auto flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Create Family
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-4">
          {/* Family Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">
              Family name
            </label>
            <Input
              placeholder="Enter family name"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              required
            />
          </div>

          {/* Selected Members */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">
              Selected members
            </label>
            <div className="min-h-[60px] p-3 border border-gray-200 rounded-sm bg-white">
              {selectedMembers.length === 0 ? (
                <p className="text-sm text-gray-400">No members selected</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white border border-gray-200 rounded-full"
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-pink-100 text-pink-600 text-xs font-semibold">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-700">{member.name}</span>
                      <button
                        type="button"
                        onClick={() => removeMember(member.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Family Members Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">
              Family members
            </label>
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {/* Search Results */}
            {searchQuery && (
              <div className="mt-2 border border-gray-200 rounded-sm max-h-40 overflow-y-auto">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => addMember(member)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-pink-100 text-pink-600 text-xs font-semibold">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-700">{member.name}</span>
                    </button>
                  ))
                ) : (
                  <p className="p-3 text-sm text-gray-400">No members found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0 bg-white border-t border-gray-200">
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit">Create</Button>
      </div>
    </form>
      </DialogContent>
    </Dialog>
  );
}
