import { Check, Checks } from "@phosphor-icons/react/dist/ssr";

interface MessageBubbleProps {
  id: number;
  content: string;
  timestamp: string;
  isSent: boolean;
  senderName?: string;
  status?: "sent" | "delivered" | "read";
}

export function MessageBubble({
  content,
  timestamp,
  isSent,
  senderName,
  status,
}: MessageBubbleProps) {
  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[65%] rounded-sm px-3 py-2 ${
          isSent
            ? "bg-[#d9fdd3] text-gray-900"
            : "bg-white text-gray-900 shadow-sm"
        }`}
      >
        {!isSent && senderName && (
          <p className="text-xs font-semibold text-primary mb-1">
            {senderName}
          </p>
        )}
        <p className="text-sm break-words">{content}</p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-[11px] text-gray-500">{timestamp}</span>
          {isSent && status && (
            <span className="flex-shrink-0">
              {status === "read" ? (
                <Checks className="w-4 h-4 text-blue-500" weight="bold" />
              ) : status === "delivered" ? (
                <Checks className="w-4 h-4 text-gray-500" />
              ) : (
                <Check className="w-4 h-4 text-gray-500" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
