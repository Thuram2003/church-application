import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {/* Illustration placeholder */}
      <div className="mb-8 w-full max-w-md">
        <div className="bg-gray-50 rounded-sm p-8 border border-gray-100">
          <div className="space-y-3">
            {/* Mock table header */}
            <div className="flex gap-2">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded flex-1"></div>
            </div>
            {/* Mock table rows */}
            <div className="flex gap-2 items-center">
              <div className="h-8 w-8 bg-primary-light rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-24"></div>
              <div className="h-5 bg-green-100 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded flex-1"></div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="h-8 w-8 bg-primary-light rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-20"></div>
              <div className="h-5 bg-yellow-100 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded flex-1"></div>
            </div>
            <div className="flex gap-2 items-center opacity-50">
              <div className="h-8 w-8 bg-gray-100 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-5 bg-gray-100 rounded w-16"></div>
              <div className="h-3 bg-gray-100 rounded flex-1"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="text-center space-y-3 max-w-md">
        {icon && <div className="flex justify-center mb-4">{icon}</div>}
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        {actionLabel && onAction && (
          <div className="pt-4">
            <Button onClick={onAction} size="default">
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
