export type HeaderMode = "header" | "text";

export interface FormHeader {
  mode: HeaderMode;
  title?: string;
  description?: string;
}

export interface FormField {
  id: string;
  type: "short-text" | "long-text" | "multiple-choice" | "checkboxes" | "email" | "phone" | "number" | "date" | "time";
  question: string;
  description: string;
  required: boolean;
  options?: string[];
}

export interface FormSection {
  id: string;
  type: "header" | "text";
  content: string;
}

export type FormElement = FormField | FormSection;

export function isFormField(element: FormElement): element is FormField {
  return "question" in element;
}

export function isFormSection(element: FormElement): element is FormSection {
  return "content" in element && (element.type === "header" || element.type === "text");
}

export const fieldTypes = [
  { id: "short-text", label: "Short text" },
  { id: "long-text", label: "Long text" },
  { id: "multiple-choice", label: "Multiple choice" },
  { id: "checkboxes", label: "Checkboxes" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone number" },
  { id: "number", label: "Number" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
] as const;
