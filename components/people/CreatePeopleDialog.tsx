"use client";

import * as React from "react";
import { X, Plus, Trash } from "@phosphor-icons/react";
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
import { CreatePeoplePersonRequest } from "@/types/people";

// Props for the dialog
interface CreatePeopleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (people: CreatePeoplePersonRequest[]) => void;
  isLoading?: boolean;
}

export function CreatePeopleDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: CreatePeopleDialogProps) {
  // State for multiple people rows using the correct type from people.ts
  const [people, setPeople] = React.useState<CreatePeoplePersonRequest[]>([
    {
      name: "",
      email: "",
      gender: "Male",
      ageGroup: "Adult",
      visitor: false,
    },
  ]);

  // Add new person row
  const addPerson = () => {
    setPeople([
      ...people,
      {
        name: "",
        email: "",
        gender: "Male",
        ageGroup: "Adult",
        visitor: false,
      },
    ]);
  };

  // Update person field
  const updatePerson = (
    index: number,
    field: keyof CreatePeoplePersonRequest,
    value: string | boolean
  ) => {
    const updated = [...people];
    updated[index] = { ...updated[index], [field]: value };
    setPeople(updated);
  };

  // Remove person row
  const removePerson = (index: number) => {
    if (people.length > 1) {
      setPeople(people.filter((_, i) => i !== index));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(people);
    // Reset form only if not loading (will be reset when dialog closes)
    if (!isLoading) {
      setPeople([
        {
          name: "",
          email: "",
          gender: "Male",
          ageGroup: "Adult",
          visitor: false,
        },
      ]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-white">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Create people
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Let's set their member's profile. Later on, you can add more details.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-4">
          {/* Person Rows */}
          <div className="space-y-3">
            {people.map((person, index) => (
              <div key={index} className="grid grid-cols-12 gap-3 items-start">
                {/* Full Name */}
                <div className="col-span-3">
                  {index === 0 && (
                    <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                  )}
                  <Input
                    placeholder="Full name"
                    value={person.name}
                    onChange={(e) =>
                      updatePerson(index, "name", e.target.value)
                    }
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Email */}
                <div className="col-span-3">
                  {index === 0 && (
                    <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      Email
                    </label>
                  )}
                  <Input
                    type="email"
                    placeholder="Email (optional)"
                    value={person.email || ""}
                    onChange={(e) => updatePerson(index, "email", e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {/* Gender */}
                <div className="col-span-2">
                  {index === 0 && (
                    <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      Gender
                    </label>
                  )}
                  <Select
                    value={person.gender}
                    onValueChange={(value) => updatePerson(index, "gender", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age Group */}
                <div className="col-span-2">
                  {index === 0 && (
                    <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      Age Group
                    </label>
                  )}
                  <Select
                    value={person.ageGroup}
                    onValueChange={(value) =>
                      updatePerson(index, "ageGroup", value)
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Adult">Adult</SelectItem>
                      <SelectItem value="Youth">Youth</SelectItem>
                      <SelectItem value="Child">Child</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Visitor Checkbox */}
                <div className="col-span-1">
                  {index === 0 && (
                    <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      Visitor
                    </label>
                  )}
                  <div className="flex items-center h-10">
                    <Checkbox
                      id={`visitor-${index}`}
                      checked={person.visitor || false}
                      onCheckedChange={(checked) =>
                        updatePerson(index, "visitor", checked as boolean)
                      }
                      disabled={isLoading}
                    />
                    <label
                      htmlFor={`visitor-${index}`}
                      className="ml-2 text-sm text-gray-600 cursor-pointer"
                    >
                      Yes
                    </label>
                  </div>
                </div>

                {/* Delete Button */}
                <div className="col-span-1">
                  {index === 0 && (
                    <div className="h-[22px] mb-1.5" />
                  )}
                  {people.length > 1 && (
                    <div className="flex items-center h-10">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removePerson(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add More Button */}
          <button
            type="button"
            onClick={addPerson}
            disabled={isLoading}
            className="w-full py-2.5 border border-dashed border-gray-300 rounded-sm text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Create more
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0 bg-white border-t border-gray-200">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => onOpenChange(false)}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </form>
      </DialogContent>
    </Dialog>
  );
}
