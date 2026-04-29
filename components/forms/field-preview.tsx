"use client";

import { X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PhoneInput } from "@/components/ui/phone-input";
import { FormElement, FormHeader, isFormField } from "@/types/form";

interface FieldPreviewProps {
  open: boolean;
  onClose: () => void;
  formName: string;
  header: FormHeader;
  elements: FormElement[];
}

export function FieldPreview({
  open,
  onClose,
  formName,
  header,
  elements,
}: FieldPreviewProps) {
  if (!open) return null;

  const renderElement = (element: FormElement) => {
    // Check if it's a section (header or text)
    if (!isFormField(element)) {
      return (
        <div key={element.id} className={element.type === "header" ? "pt-6 pb-2" : "py-3"}>
          {element.type === "header" ? (
            <h2 className="text-xl font-semibold text-gray-900">{element.content}</h2>
          ) : (
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{element.content}</p>
          )}
        </div>
      );
    }

    // Render field
    return (
      <div key={element.id} className="space-y-2">
        <label className="text-sm font-medium text-gray-900 flex items-center gap-1">
          {element.question}
          {element.required && <span className="text-red-500">*</span>}
        </label>
        {element.description && (
          <p className="text-xs text-gray-500">{element.description}</p>
        )}

        {element.type === "short-text" && <Input placeholder="Your answer" />}
        {element.type === "long-text" && (
          <Textarea placeholder="Your answer" rows={4} />
        )}
        {element.type === "email" && (
          <Input type="email" placeholder="your@email.com" />
        )}
        {element.type === "phone" && (
          <PhoneInput international defaultCountry="CM" onChange={() => {}} />
        )}
        {element.type === "number" && <Input type="number" placeholder="0" />}
        {element.type === "date" && (
          <Input type="date" className="cursor-pointer" />
        )}
        {element.type === "time" && (
          <Input type="time" className="cursor-pointer" />
        )}
        {element.type === "multiple-choice" && element.options && (
          <RadioGroup>
            {element.options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${element.id}-${idx}`} />
                <label
                  htmlFor={`${element.id}-${idx}`}
                  className="text-sm text-gray-700"
                >
                  {option}
                </label>
              </div>
            ))}
          </RadioGroup>
        )}
        {element.type === "checkboxes" && element.options && (
          <div className="space-y-2">
            {element.options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <Checkbox id={`${element.id}-${idx}`} />
                <label
                  htmlFor={`${element.id}-${idx}`}
                  className="text-sm text-gray-700"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 bottom-0 w-[500px] bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {formName}
            </h1>
            {header.mode === "header" && header.description && (
              <p className="text-sm text-gray-600">{header.description}</p>
            )}
          </div>
          <div className="space-y-6">{elements.map((element) => renderElement(element))}</div>
          <Button className="w-full">Submit</Button>
        </div>
      </div>
    </>
  );
}
