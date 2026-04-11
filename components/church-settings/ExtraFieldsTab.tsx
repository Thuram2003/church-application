"use client";

import { ListPlus } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CustomField = {
  id: string;
  displayLabel: string;
  fieldType: string;
  placeholder: string;
  showOnProfile: boolean;
};

export function ExtraFieldsTab() {
  const [fields, setFields] = useState<CustomField[]>([]);
  const [displayLabel, setDisplayLabel] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [showOnProfile, setShowOnProfile] = useState(false);

  const handleAddField = () => {
    if (!displayLabel || !fieldType) return;

    const newField: CustomField = {
      id: Date.now().toString(),
      displayLabel,
      fieldType,
      placeholder,
      showOnProfile,
    };

    setFields([...fields, newField]);
    
    // Reset form
    setDisplayLabel("");
    setFieldType("");
    setPlaceholder("");
    setShowOnProfile(false);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">
          Custom Member Profile Fields
        </h2>
        <p className="text-sm text-gray-600">
          Add custom fields to your member profiles. These fields will appear on both the admin dashboard and member portal profile pages.
        </p>
      </div>

      {/* Add New Field Form */}
      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-6">
          Add New Field
        </h3>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="display-label" className="text-sm font-medium">
                Display Label <span className="text-red-500">*</span>
              </Label>
              <Input
                id="display-label"
                placeholder="e.g., Emergency Contact Name"
                value={displayLabel}
                onChange={(e) => setDisplayLabel(e.target.value)}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field-type" className="text-sm font-medium">
                Field Type <span className="text-red-500">*</span>
              </Label>
              <Select value={fieldType} onValueChange={setFieldType}>
                <SelectTrigger id="field-type" className="h-10">
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="textarea">Text Area</SelectItem>
                  <SelectItem value="select">Dropdown</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-profile"
              checked={showOnProfile}
              onCheckedChange={(checked) => setShowOnProfile(checked as boolean)}
            />
            <Label
              htmlFor="show-profile"
              className="text-sm font-normal cursor-pointer"
            >
              Show on member profile (Church Portal)
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="placeholder" className="text-sm font-medium">
              Placeholder Text
            </Label>
            <Input
              id="placeholder"
              placeholder=""
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              className="h-10"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleAddField} disabled={!displayLabel || !fieldType}>
              Add Field
            </Button>
          </div>
        </div>
      </div>

      {/* Existing Fields */}
      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-2">
          Existing Fields
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Note: Field types cannot be changed after creation. You can edit the label, show on profile status, placeholder, and options.
        </p>

        {fields.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No custom fields added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {fields.map((field) => (
              <div
                key={field.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {field.displayLabel}
                  </h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-gray-500">
                      Type: {field.fieldType}
                    </span>
                    {field.showOnProfile && (
                      <span className="text-xs text-primary">
                        Visible on portal
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
