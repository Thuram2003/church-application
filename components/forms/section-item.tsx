"use client";

import { TextT, Copy, Trash, ArrowUp, ArrowDown } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "@/types/form";

interface SectionItemProps {
  section: FormSection;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<FormSection>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export function SectionItem({
  section,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: SectionItemProps) {
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
        {/* Type Toggle */}
        <div className="flex items-center gap-3">
          <Button
            variant={section.type === "header" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 px-3 gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate({ type: "header" });
            }}
          >
            <TextT className="w-4 h-4" />
            Header
          </Button>
          <Button
            variant={section.type === "text" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 px-3 gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate({ type: "text" });
            }}
          >
            <TextT className="w-4 h-4" />
            Text
          </Button>
        </div>

        {/* Content */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">
            {section.type === "header" ? "Header Title" : "Text Content"}
          </label>
          <Textarea
            value={section.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            placeholder={
              section.type === "header"
                ? "Enter section title..."
                : "Enter section description or instructions..."
            }
            className="min-h-[80px] resize-none"
          />
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
