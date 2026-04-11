"use client";

import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { FormElement, FormField, FormSection, FormHeader, isFormField } from "@/types/form";

const getDefaultQuestion = (type: string): string => {
  const defaults: Record<string, string> = {
    "short-text": "Your answer",
    "long-text": "Your detailed answer",
    "email": "Your email address",
    "phone": "Your phone number",
    "number": "Enter a number",
    "date": "Select a date",
    "time": "Select a time",
    "multiple-choice": "Choose an option",
    "checkboxes": "Select all that apply",
  };
  return defaults[type] || "Your answer";
};

export function useFormBuilder() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");

  const [formName, setFormName] = useState(() => {
    const templates: Record<string, string> = {
      "member-registration": "Member Registration Form",
      "prayer-request": "Prayer Request Form",
      "event-registration": "Event Registration Form",
      "volunteer-signup": "Volunteer Signup Form",
    };
    return templates[templateId || ""] || "New Form";
  });

  const [header, setHeader] = useState<FormHeader>({
    mode: "header",
    title: "Join our church community",
    description:
      "Share your contact details and family information so we can stay connected and serve you better.",
  });

  const [elements, setElements] = useState<FormElement[]>([
    {
      id: crypto.randomUUID(),
      type: "short-text",
      question: "Your full name",
      description: "",
      required: true,
    } as FormField,
    {
      id: crypto.randomUUID(),
      type: "email",
      question: "Your email address",
      description: "",
      required: true,
    } as FormField,
  ]);

  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    elements[0]?.id || null
  );

  const addElement = useCallback(
    (position: number, elementType: "field" | "header" | "text" = "field", fieldType: string = "short-text") => {
      let newElement: FormElement;
      
      if (elementType === "header" || elementType === "text") {
        newElement = {
          id: crypto.randomUUID(),
          type: elementType,
          content: elementType === "header" ? "Section Title" : "Section description or instructions",
        } as FormSection;
      } else {
        newElement = {
          id: crypto.randomUUID(),
          type: fieldType,
          question: getDefaultQuestion(fieldType),
          description: "",
          required: false,
          options:
            fieldType === "multiple-choice" || fieldType === "checkboxes"
              ? ["Option 1"]
              : undefined,
        } as FormField;
      }

      setElements((prev) => {
        const newElements = [...prev];
        newElements.splice(position, 0, newElement);
        return newElements;
      });
      setSelectedElementId(newElement.id);
    },
    []
  );

  const updateElement = useCallback(
    (id: string, updates: Partial<FormElement>) => {
      setElements((prev) =>
        prev.map((el): FormElement => {
          if (el.id !== id) return el;

          if (isFormField(el) && "type" in updates && updates.type && updates.type !== el.type) {
            const newType = updates.type as FormField["type"];
            const updated: FormField = {
              ...el,
              ...updates,
              type: newType,
              question: getDefaultQuestion(newType),
              options:
                newType === "multiple-choice" || newType === "checkboxes"
                  ? ["Single", "Married", "Divorced", "Widowed"]
                  : undefined,
            };
            return updated;
          }

          return { ...el, ...updates } as FormElement;
        })
      );
    },
    []
  );

  const deleteElement = useCallback(
    (id: string) => {
      setElements((prev) => {
        const filtered = prev.filter((el) => el.id !== id);
        if (selectedElementId === id) {
          setSelectedElementId(filtered[0]?.id || null);
        }
        return filtered;
      });
    },
    [selectedElementId]
  );

  const duplicateElement = useCallback((id: string) => {
    setElements((prev) => {
      const element = prev.find((el) => el.id === id);
      if (!element) return prev;

      const newElement = { ...element, id: crypto.randomUUID() };
      const index = prev.findIndex((el) => el.id === id);
      const newElements = [...prev];
      newElements.splice(index + 1, 0, newElement);
      return newElements;
    });
  }, []);

  const moveElement = useCallback((id: string, direction: "up" | "down") => {
    setElements((prev) => {
      const index = prev.findIndex((el) => el.id === id);
      if (direction === "up" && index > 0) {
        const newElements = [...prev];
        [newElements[index], newElements[index - 1]] = [
          newElements[index - 1],
          newElements[index],
        ];
        return newElements;
      }
      if (direction === "down" && index < prev.length - 1) {
        const newElements = [...prev];
        [newElements[index], newElements[index + 1]] = [
          newElements[index + 1],
          newElements[index],
        ];
        return newElements;
      }
      return prev;
    });
  }, []);

  const addOption = useCallback((fieldId: string) => {
    setElements((prev) =>
      prev.map((el) => {
        if (!isFormField(el) || el.id !== fieldId || !el.options) return el;
        return {
          ...el,
          options: [...el.options, `Option ${el.options.length + 1}`],
        };
      })
    );
  }, []);

  const updateOption = useCallback(
    (fieldId: string, index: number, value: string) => {
      setElements((prev) =>
        prev.map((el) => {
          if (!isFormField(el) || el.id !== fieldId || !el.options) return el;
          const newOptions = [...el.options];
          newOptions[index] = value;
          return { ...el, options: newOptions };
        })
      );
    },
    []
  );

  const deleteOption = useCallback((fieldId: string, index: number) => {
    setElements((prev) =>
      prev.map((el) => {
        if (!isFormField(el) || el.id !== fieldId || !el.options || el.options.length <= 1)
          return el;
        return { ...el, options: el.options.filter((_, i) => i !== index) };
      })
    );
  }, []);

  return {
    formName,
    setFormName,
    header,
    setHeader,
    elements,
    selectedElementId,
    setSelectedElementId,
    addElement,
    updateElement,
    deleteElement,
    duplicateElement,
    moveElement,
    addOption,
    updateOption,
    deleteOption,
  };
}
