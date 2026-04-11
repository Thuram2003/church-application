"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CaretRight, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

const formTemplates = [
  { id: "member-registration", name: "Member Registration Form" },
  { id: "prayer-request", name: "Prayer Request Form" },
  { id: "event-registration", name: "Event Registration Form" },
  { id: "volunteer-signup", name: "Volunteer Signup Form" },
];

export function CreateFormDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateFormDialogProps) {
  const router = useRouter();

  const handleTemplateSelect = (templateId: string) => {
    onOpenChange(false);
    // Navigate to builder with template
    router.push(`/forms/builder?template=${templateId}`);
  };

  const handleCustomForm = () => {
    onOpenChange(false);
    // Navigate to builder
    router.push("/forms/builder");
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] p-0 gap-0 overflow-hidden bg-white">
        <DialogHeader className="p-6 pb-5 border-b border-gray-100 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Create a new form
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleClose}
            className="h-8 w-8 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </DialogHeader>

        <div className="p-6 space-y-8">
            {/* Use a template section */}
            <div className="space-y-3">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Use a template
                </h3>
                <p className="text-sm text-gray-500">
                  Adjust ready-made template and publish in few minutes.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {formTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-sm hover:border-primary hover:bg-gray-50 transition-all text-left group"
                  >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {template.name}
                    </span>
                    <CaretRight className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                  </button>
                ))}
              </div>
            </div>

            {/* Create your own section */}
            <div className="space-y-3">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Create your own
                </h3>
                <p className="text-sm text-gray-500">
                  Design and build your own form from scratch, and publish in just a few minutes.
                </p>
              </div>

              <button
                onClick={handleCustomForm}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-sm hover:border-primary hover:bg-gray-50 transition-all text-left group w-full"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Create a custom form
                </span>
                <CaretRight className="w-5 h-5 text-gray-400 group-hover:text-primary" />
              </button>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
}
