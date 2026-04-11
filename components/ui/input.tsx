import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles - clean white background
        "h-11 w-full min-w-0 rounded-sm border bg-white px-4 py-2 text-sm",
        "text-gray-900 placeholder:text-gray-400",
        
        // Border styling
        "border-gray-200",
        
        // Focus state - your primary color
        "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
        
        // Selection styling
        "selection:bg-primary selection:text-white",
        
        // File input styling
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-700",
        
        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
        
        // Invalid state
        "aria-invalid:border-red-400 aria-invalid:focus:border-red-500 aria-invalid:focus:ring-red-200",
        
        className,
      )}
      {...props}
    />
  );
}

export { Input };