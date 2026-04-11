"use client"

import * as React from "react"
import { Check } from "@phosphor-icons/react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base styles
        "peer size-4 shrink-0 rounded border bg-white transition-all",
        
        // Border styling
        "border-gray-300",
        
        // Hover state
        "hover:border-primary",
        
        // Checked state - your brand colors
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white",
        
        // Focus state
        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
        
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:border-gray-200",
        
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        <Check className="size-3.5" weight="bold" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }