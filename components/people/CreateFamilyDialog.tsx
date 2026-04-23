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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePeople } from "@/hooks/use-people";
import { useCreateFamily } from "@/hooks/use-families";
import type { 
  CreateFamilyRequest, 
  FamilyMemberRole,
  CreateFamilyMemberRow 
} from "@/types/families";
import type { Person } from "@/types/people";

// Selected member with role
interface SelectedMember {
  id: string;
  name: string;
  initials: string;
  familyRole: FamilyMemberRole;
}

// Props for the dialog
interface CreateFamilyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FAMILY_ROLES: FamilyMemberRole[] = [
  'Head of House',
  'Spouse',
  'Child',
  'Relative',
  'Other',
];

export function CreateFamilyDialog({
  open,
  onOpenChange,
}: CreateFamilyDialogProps) {
  const [familyName, setFamilyName] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedMembers, setSelectedMembers] = React.useState<SelectedMember[]>([]);

  const { data: peopleResponse } = usePeople();
  const createFamily = useCreateFamily();

  const availableMembers = React.useMemo(() => {
    if (!peopleResponse?.data) return [];
    
    // Handle paginated response structure
    let peopleArray: any[] = [];
    
    if (peopleResponse.data.items && Array.isArray(peopleResponse.data.items)) {
      peopleArray = peopleResponse.data.items;
    } else if (Array.isArray(peopleResponse.data)) {
      // Fallback for direct array response
      peopleArray = peopleResponse.data;
    } else {
      console.warn('Unexpected people response structure:', peopleResponse.data);
      return [];
    }
    
    return peopleArray
      .filter(person => !person.familyId) // Only show people not in a family
      .map(person => ({
        id: person.id,
        name: `${person.firstName} ${person.lastName}`.trim(),
        initials: `${person.firstName?.[0] || ''}${person.lastName?.[0] || ''}`.toUpperCase(),
        email: person.email,
      }));
  }, [peopleResponse?.data]);

  // Remove member from selection
  const removeMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== memberId));
  };

  // Add member to selection with role
  const addMember = (member: { id: string; name: string; initials: string }, role: FamilyMemberRole = 'Other') => {
    if (!selectedMembers.find((m) => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, { ...member, familyRole: role }]);
    }
  };

  // Update member role
  const updateMemberRole = (memberId: string, role: FamilyMemberRole) => {
    setSelectedMembers(members => 
      members.map(member => 
        member.id === memberId ? { ...member, familyRole: role } : member
      )
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!familyName.trim()) return;

    const headOfHouse = selectedMembers.find(m => m.familyRole === 'Head of House');
    
    const familyData: CreateFamilyRequest = {
      name: familyName.trim(),
      headOfHouseId: headOfHouse?.id,
      members: selectedMembers.map(member => ({
        memberId: member.id,
        familyRole: member.familyRole,
      })),
    };

    try {
      await createFamily.mutateAsync(familyData);
      onOpenChange(false);
      // Reset form
      setFamilyName("");
      setSearchQuery("");
      setSelectedMembers([]);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  // Filter members based on search
  const filteredMembers = availableMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedMembers.find(selected => selected.id === member.id)
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
                    <div className="space-y-2">
                      {selectedMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 p-2 bg-gray-50 rounded-sm"
                        >
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-pink-100 text-pink-600 text-xs font-semibold">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-700 flex-1">{member.name}</span>
                          <Select
                            value={member.familyRole}
                            onValueChange={(role: FamilyMemberRole) => updateMemberRole(member.id, role)}
                          >
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {FAMILY_ROLES.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                  Add family members
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
                          <div className="flex-1">
                            <span className="text-sm text-gray-700 block">{member.name}</span>
                            {member.email && (
                              <span className="text-xs text-gray-500">{member.email}</span>
                            )}
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="p-3 text-sm text-gray-400">
                        {availableMembers.length === 0 
                          ? "No members available (all members are already in families)"
                          : "No members found"
                        }
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0 bg-white border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={createFamily.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!familyName.trim() || createFamily.isPending}
            >
              {createFamily.isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
