import * as React from "react";
import { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface PledgeStatCardProps {
  icon: Icon;
  label: string;
  value: string | number;
  variant?: "default" | "highlight";
  className?: string;
}

export function PledgeStatCard({
  icon: Icon,
  label,
  value,
  variant = "default",
  className,
}: PledgeStatCardProps) {
  return (
    <div
      className={cn(
        "rounded-sm p-4 border",
        variant === "highlight"
          ? "bg-green-50 border-green-100"
          : "bg-white border-gray-100",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 text-sm mb-1",
          variant === "highlight" ? "text-green-600" : "text-gray-500"
        )}
      >
        <Icon className="w-4 h-4" />
        {label}
      </div>
      <div className="text-2xl font-semibold text-gray-900">
        {value}
      </div>
    </div>
  );
}
