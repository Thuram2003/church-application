"use client";

import {
  TextAlignLeft,
  TextT,
  Envelope,
  Phone,
  Hash,
  Calendar,
  Clock,
  CircleDashed,
  CheckSquare,
  Plus,
  Trash,
  Copy,
  ArrowUp,
  ArrowDown,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/types/form";

const fieldTypeIcons: Record<string, any> = {
  "short-text": TextAlignLeft,
  "long-text": TextT,
  "multiple-choice": CircleDashed,
  checkboxes: CheckSquare,
  email: Envelope,
  phone: Phone,
  number: Hash,
  date: Calendar,
  time: Clock,
};

const fieldTypes = [
  { id: "short-text", label: "Short text", icon: TextAlignLeft },
  { id: "long-text", label: "Long text", icon: TextT },
  { id: "multiple-choice", label: "Multiple choice", icon: CircleDashed },
  { id: "checkboxes", label: "Checkboxes", icon: CheckSquare },
  { id: "email", label: "Email", icon: Envelope },
  { id: "phone", label: "Phone number", icon: Phone },
  { id: "number", label: "Number", icon: Hash },
  { id: "date", label: "Date", icon: Calendar },
  { id: "time", label: "Time", icon: Clock },
];

interface FieldItemProps {
  field: FormField;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<FormField>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onAddOption: () => void;
  onUpdateOption: (index: number, value: string) => void;
  onDeleteOption: (index: number) => void;
}

export function FieldItem({
  field,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  onAddOption,
  onUpdateOption,
  onDeleteOption,
}: FieldItemProps) {
  const FieldIcon = fieldTypeIcons[field.type] || TextAlignLeft;

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-sm border-2 p-6 cursor-pointer transition-all ${
        isSelected
          ? "border-primary shadow-md"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="space-y-4">
        {/* Type Selector */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">
            Type
          </label>
          <Select
            value={field.type}
            onValueChange={(v) => onUpdate({ type: v as FormField["type"] })}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <FieldIcon className="w-4 h-4" />
                <span>
                  {fieldTypes.find((t) => t.id === field.type)?.label ||
                    field.type}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              {fieldTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  <div className="flex items-center gap-2">
                    <type.icon className="w-4 h-4" />
                    {type.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Question */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">
            Question
          </label>
          <Input
            value={field.question}
            onChange={(e) => onUpdate({ question: e.target.value })}
            placeholder="Enter your question"
          />
        </div>

        {/* Options for multiple choice/checkboxes */}
        {(field.type === "multiple-choice" || field.type === "checkboxes") &&
          field.options && (
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                Options
              </label>
              <div className="space-y-2">
                {field.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => onUpdateOption(optIndex, e.target.value)}
                      placeholder={`Option ${optIndex + 1}`}
                    />
                    {field.options && field.options.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onDeleteOption(optIndex)}
                        className="text-red-500"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onAddOption}
                  className="text-primary"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Option
                </Button>
              </div>
            </div>
          )}

        {/* Description */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">
            Description (optional)
          </label>
          <Input
            value={field.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Enter description"
          />
        </div>

        {/* Required Toggle */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`required-${field.id}`}
            checked={field.required}
            onCheckedChange={(checked) => onUpdate({ required: !!checked })}
          />
          <label
            htmlFor={`required-${field.id}`}
            className="text-sm text-gray-700 cursor-pointer"
          >
            Required question
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDuplicate}
            className="text-primary hover:text-primary-dark hover:bg-primary-lighter"
          >
            <Copy className="w-4 h-4 mr-1" />
            Duplicate
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash className="w-4 h-4 mr-1" />
            Delete
          </Button>
          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onMoveUp}
              disabled={!canMoveUp}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onMoveDown}
              disabled={!canMoveDown}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
