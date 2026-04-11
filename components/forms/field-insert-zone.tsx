"use client";

import * as React from "react";
import { Plus, TextT, TextAlignLeft } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface FieldInsertZoneProps {
  onAdd: (type: "field" | "header" | "text") => void;
  isVisible: boolean;
}

export function FieldInsertZone({ onAdd, isVisible }: FieldInsertZoneProps) {
  return (
    <div className="relative h-6 -my-3 z-10 group/insert">
      {/* The line that appears on hover */}
      <div
        className={`
        absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-primary
        transition-opacity duration-150
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
      />

      {/* The plus button centered on the line */}
      <div
        className={`
        absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2
        transition-all duration-150
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}
      `}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full bg-primary text-white hover:bg-primary/90 shadow-sm"
            >
              <Plus className="w-4 h-4" weight="bold" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            <DropdownMenuItem onClick={() => onAdd("field")}>
              <TextAlignLeft className="w-4 h-4 mr-2" />
              Add Field
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAdd("header")}>
              <TextT className="w-4 h-4 mr-2" />
              Add Header
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAdd("text")}>
              <TextAlignLeft className="w-4 h-4 mr-2" />
              Add Text
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

