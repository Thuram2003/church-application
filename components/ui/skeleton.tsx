import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gray-100 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

/** 4-column stat card row skeleton — matches StatCard grid */
function StatCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${count} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-gray-100 rounded-xl p-4 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <Skeleton className="h-7 w-12" />
        </div>
      ))}
    </div>
  );
}

/** Table skeleton — header + N rows */
function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-100 bg-gray-50">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3.5 border-b border-gray-50 last:border-0">
          <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          {Array.from({ length: cols - 1 }).map((_, j) => (
            <Skeleton key={j} className={cn("h-3 flex-1", j === 0 ? "max-w-[140px]" : "")} />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Form fields skeleton — label + input rows */
function FormSkeleton({ fields = 3 }: { fields?: number }) {
  return (
    <div className="space-y-6 max-w-2xl">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="w-36 pt-2 space-y-1.5">
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="flex-1 h-10 rounded-md" />
        </div>
      ))}
    </div>
  );
}

/** Card list skeleton — matches branch card shape */
function CardListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden flex items-stretch">
          <div className="w-1 bg-gray-200 flex-shrink-0" />
          <div className="flex-1 px-5 py-4 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-9 h-9 rounded-lg flex-shrink-0" />
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex gap-6">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Text lines skeleton — for content like Bible verses */
function TextSkeleton({ lines = 8 }: { lines?: number }) {
  const widths = ["w-full", "w-11/12", "w-full", "w-4/5", "w-full", "w-11/12", "w-3/4", "w-full"];
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4", widths[i % widths.length])} />
      ))}
    </div>
  );
}

/** Workspace list skeleton */
function WorkspaceListSkeleton() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 space-y-6">
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="w-16 h-16 rounded-full" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-5 w-5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export {
  Skeleton,
  StatCardsSkeleton,
  TableSkeleton,
  FormSkeleton,
  CardListSkeleton,
  TextSkeleton,
  WorkspaceListSkeleton,
};
