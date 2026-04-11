"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, PaperPlaneTilt, ArrowSquareOut } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormBuilderTopBarProps {
  formName: string;
  onNameChange: (name: string) => void;
  onPreview: () => void;
  onPublish: () => void;
}

export function FormBuilderTopBar({
  formName,
  onNameChange,
  onPreview,
  onPublish,
}: FormBuilderTopBarProps) {
  const router = useRouter();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempFormName, setTempFormName] = useState(formName);

  const handleSaveName = () => {
    if (tempFormName.trim()) {
      onNameChange(tempFormName.trim());
    } else {
      setTempFormName(formName);
    }
    setIsEditingName(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => router.push("/forms")}
          className="text-gray-600"
        >
          <X className="w-5 h-5" />
        </Button>
        {isEditingName ? (
          <Input
            value={tempFormName}
            onChange={(e) => setTempFormName(e.target.value)}
            onBlur={handleSaveName}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveName();
              if (e.key === "Escape") {
                setTempFormName(formName);
                setIsEditingName(false);
              }
            }}
            className="font-medium text-base max-w-md"
            autoFocus
          />
        ) : (
          <button
            onClick={() => {
              setTempFormName(formName);
              setIsEditingName(true);
            }}
            className="font-medium text-base text-gray-900 hover:text-primary px-2 py-1 rounded hover:bg-gray-50"
          >
            {formName}
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onPreview} className="gap-2">
          Preview
          <ArrowSquareOut className="w-4 h-4" />
        </Button>
        <Button size="sm" onClick={onPublish} className="gap-2">
          <PaperPlaneTilt className="w-4 h-4" />
          Publish
        </Button>
      </div>
    </div>
  );
}
