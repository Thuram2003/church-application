"use client";

import { useState } from "react";
import { FieldItem } from "./field-item";
import { SectionItem } from "./section-item";
import { FieldInsertZone } from "./field-insert-zone";
import { FormElement, isFormField } from "@/types/form";

interface FieldListProps {
  elements: FormElement[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: (position: number, elementType: "field" | "header" | "text", fieldType?: string) => void;
  onUpdate: (id: string, updates: Partial<FormElement>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  onAddOption: (fieldId: string) => void;
  onUpdateOption: (fieldId: string, index: number, value: string) => void;
  onDeleteOption: (fieldId: string, index: number) => void;
}

export function FieldList({
  elements,
  selectedId,
  onSelect,
  onAdd,
  onUpdate,
  onDelete,
  onDuplicate,
  onMove,
  onAddOption,
  onUpdateOption,
  onDeleteOption,
}: FieldListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="space-y-0">
      {/* Insert Zone BEFORE first element */}
      <div
        onMouseEnter={() => setHoveredIndex(-1)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <FieldInsertZone
          onAdd={(type) => onAdd(0, type)}
          isVisible={hoveredIndex === -1}
        />
      </div>

      {elements.map((element, index) => (
        <div key={element.id}>
          <div
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {isFormField(element) ? (
              <FieldItem
                field={element}
                isSelected={selectedId === element.id}
                onSelect={() => onSelect(element.id)}
                onUpdate={(updates) => onUpdate(element.id, updates)}
                onDelete={() => onDelete(element.id)}
                onDuplicate={() => onDuplicate(element.id)}
                onMoveUp={() => onMove(element.id, "up")}
                onMoveDown={() => onMove(element.id, "down")}
                canMoveUp={index > 0}
                canMoveDown={index < elements.length - 1}
                onAddOption={() => onAddOption(element.id)}
                onUpdateOption={(i, v) => onUpdateOption(element.id, i, v)}
                onDeleteOption={(i) => onDeleteOption(element.id, i)}
              />
            ) : (
              <SectionItem
                section={element}
                isSelected={selectedId === element.id}
                onSelect={() => onSelect(element.id)}
                onUpdate={(updates) => onUpdate(element.id, updates)}
                onDelete={() => onDelete(element.id)}
                onDuplicate={() => onDuplicate(element.id)}
                onMoveUp={() => onMove(element.id, "up")}
                onMoveDown={() => onMove(element.id, "down")}
                canMoveUp={index > 0}
                canMoveDown={index < elements.length - 1}
              />
            )}
          </div>

          {/* Insert Zone AFTER element */}
          <div
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <FieldInsertZone
              onAdd={(type) => onAdd(index + 1, type)}
              isVisible={hoveredIndex === index}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

