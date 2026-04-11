import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles
          "flex w-full rounded-sm border bg-white px-4 py-3 text-sm",
          "text-gray-900 placeholder:text-gray-400",
          
          // Border styling
          "border-gray-200",
          
          // Focus state - your primary color
          "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
          
          // Min height
          "min-h-[100px]",
          
          // Disabled state
          "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
          
          // Resize behavior
          "resize-y",
          
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };