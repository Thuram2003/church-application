import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none cursor-pointer",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-white hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary hover:bg-primary-light/50",
        secondary:
          "bg-primary-light text-primary hover:bg-primary-lighter shadow-sm",
        ghost:
          "bg-transparent text-gray-700 hover:bg-primary-light hover:text-primary",
        link: 
          "bg-transparent text-primary underline-offset-4 hover:underline",
        ideal:
          "bg-primary text-white hover:bg-primary/90 rounded-sm capitalize gap-4 px-10 h-14 shadow-none active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-4 py-2 has-[>svg]:px-3",
        xs: "h-7 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-16 rounded-md px-10 has-[>svg]:px-8",
        icon: "size-10",
        "icon-xs": "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };