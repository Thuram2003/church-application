"use client";

import { CircleDashed, TextT, Plus, Copy, Trash, ArrowDown } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormHeader as FormHeaderType } from "@/types/form";

interface FormHeaderProps {
  mode: "header" | "text";
  title?: string;
  description?: string;
  onChange: (header: FormHeaderType) => void;
  isSelected: boolean;
  onSelect: () => void;
}

export function FormHeader({
  mode,
  title,
  description,
  onChange,
  isSelected,
  onSelect,
}: FormHeaderProps) {
  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-sm border-2 p-6 cursor-pointer transition-all mb-2 ${
        isSelected
          ? "border-primary shadow-md"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <Button
          variant={mode === "header" ? "secondary" : "ghost"}
          size="sm"
          className="h-8 px-3 gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onChange({ mode: "header", title, description });
          }}
        >
          <CircleDashed className="w-4 h-4" />
          Header
        </Button>
        <Button
          variant={mode === "text" ? "secondary" : "ghost"}
          size="sm"
          className="h-8 px-3 gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onChange({ mode: "text", title, description });
          }}
        >
          <TextT className="w-4 h-4" />
          Text
        </Button>
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon-sm">
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon-sm">
            <TextT className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <Textarea
        value={description || ""}
        onChange={(e) =>
          onChange({ mode, title, description: e.target.value })
        }
        className="min-h-[80px] resize-none"
        placeholder={
          mode === "header"
            ? "Enter form description..."
            : "Enter section text..."
        }
      />
      <div className="flex items-center gap-2 mt-3">
        <Button variant="ghost" size="sm" className="text-primary">
          <Copy className="w-4 h-4 mr-1" />
          Duplicate
        </Button>
        <Button variant="ghost" size="sm" className="text-red-600">
          <Trash className="w-4 h-4 mr-1" />
          Delete
        </Button>
        <Button variant="ghost" size="icon-sm" className="ml-auto">
          <ArrowDown className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
