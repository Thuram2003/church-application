import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMemberItemProps {
  id: number;
  name: string;
  email: string;
  online?: boolean;
  avatar: string;
}

export function ChatMemberItem({
  name,
  email,
  online = false,
  avatar,
}: ChatMemberItemProps) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-sm hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="relative flex-shrink-0">
        <Avatar className="w-10 h-10 bg-[#eef0ff]">
          <AvatarFallback className="text-[#443a88] font-semibold text-sm">
            {avatar}
          </AvatarFallback>
        </Avatar>
        {online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-500 truncate">{email}</p>
      </div>
    </div>
  );
}
