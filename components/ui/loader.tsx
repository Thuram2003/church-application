import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  /** @deprecated use className for sizing */
  size?: "sm" | "md" | "lg" | "xl";
}

export function Loader({ className, size }: LoaderProps) {
  // Legacy size prop support
  const sizeClass = size
    ? { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6", xl: "w-8 h-8" }[size]
    : "w-4 h-4";

  return (
    <svg
      className={cn("animate-spin shrink-0", sizeClass, className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label="Loading"
    >
      {/* Track */}
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Spinner arc */}
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Page-level loader (centered in a container) ──────────────────────────────

export function PageLoader({ text }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-[400px] text-primary">
      <Loader className="w-8 h-8" />
      {text && <p className="text-sm text-gray-500 animate-pulse">{text}</p>}
    </div>
  );
}

// ─── Full-screen branded loader ───────────────────────────────────────────────

export function BrandedLoader({
  text = "Loading...",
  fullScreen = true,
}: {
  text?: string;
  fullScreen?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-8",
        fullScreen && "min-h-screen"
      )}
      style={{ backgroundColor: "var(--page-bg)" }}
    >
      {/* Animated loader container */}
      <div className="relative animate-fade-in">
        {/* Main loader */}
        <div className="relative w-24 h-24">
          {/* Outer spinning ring */}
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              border: "4px solid transparent",
              borderTopColor: "var(--primary)",
              borderRightColor: "var(--primary)",
              animationDuration: "1.2s",
              willChange: "transform",
            }}
          />
          {/* Inner ring - counter rotation */}
          <div
            className="absolute inset-2 rounded-full animate-spin"
            style={{
              border: "3px solid transparent",
              borderTopColor: "var(--primary-light)",
              borderLeftColor: "var(--primary-light)",
              animationDuration: "1.8s",
              animationDirection: "reverse",
              willChange: "transform",
              opacity: 0.6,
            }}
          />
          {/* Center background */}
          <div
            className="absolute inset-4 rounded-full"
            style={{ backgroundColor: "var(--card-bg, white)" }}
          />
        </div>
      </div>

      {/* Brand text */}
      <div className="flex flex-col items-center gap-2 animate-fade-in-up">
        <div className="flex items-center gap-2">
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {text}
          </p>
          {/* Animated dots */}
          <div className="flex gap-1">
            {[0, 150, 300].map((delay) => (
              <div
                key={delay}
                className="w-1.5 h-1.5 rounded-full animate-bounce"
                style={{
                  backgroundColor: "var(--primary)",
                  animationDelay: `${delay}ms`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Inline loader (next to text) ────────────────────────────────────────────

export function InlineLoader({ text, size = "sm" }: { text?: string; size?: "sm" | "md" }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Loader size={size} />
      {text && <span className="text-sm text-gray-500">{text}</span>}
    </span>
  );
}

// ─── Keep SkeletonLoader export for any existing imports ─────────────────────

export function SkeletonLoader() {
  return (
    <div className="space-y-4 p-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
