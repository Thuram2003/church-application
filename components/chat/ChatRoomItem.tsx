import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, Checks } from "@phosphor-icons/react/dist/ssr";

interface ChatRoomItemProps {
  id: number;
  name: string;
  lastMessage?: string;
  lastMessageTime?: string;
  memberCount: number;
  online?: number;
  unread?: number;
  avatar: string;
  isActive?: boolean;
  messageStatus?: "sent" | "delivered" | "read";
  onClick?: () => void;
}

export function ChatRoomItem({
  name,
  lastMessage,
  lastMessageTime,
  online,
  unread = 0,
  avatar,
  isActive = false,
  messageStatus,
  onClick,
}: ChatRoomItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
        isActive ? "bg-gray-100" : ""
      }`}
    >
      <div className="relative flex-shrink-0">
        <Avatar className="w-12 h-12 bg-primary-light">
          <AvatarFallback className="text-primary font-semibold text-base">
            {avatar}
          </AvatarFallback>
        </Avatar>
        {online !== undefined && online > 0 && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {name}
          </h3>
          {lastMessageTime && (
            <span className={`text-xs flex-shrink-0 ml-2 ${
              unread > 0 ? "text-primary font-medium" : "text-gray-500"
            }`}>
              {lastMessageTime}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            {messageStatus && (
              <span className="flex-shrink-0">
                {messageStatus === "read" ? (
                  <Checks className="w-4 h-4 text-blue-500" weight="bold" />
                ) : messageStatus === "delivered" ? (
                  <Checks className="w-4 h-4 text-gray-500" />
                ) : (
                  <Check className="w-4 h-4 text-gray-500" />
                )}
              </span>
            )}
            <p className={`text-sm truncate ${
              unread > 0 ? "text-gray-900 font-medium" : "text-gray-500"
            }`}>
              {lastMessage || "No messages yet"}
            </p>
          </div>
          
          {unread > 0 && (
            <Badge className="bg-primary text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0 min-w-[20px] h-5 flex items-center justify-center">
              {unread}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
