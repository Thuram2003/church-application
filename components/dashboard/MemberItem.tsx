import { DotsThree } from "@phosphor-icons/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MemberItemProps {
  id: number | string;
  name: string;
  role: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

// Helper function to get initials from name (same as people table)
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function MemberItem({ id, name, role, onEdit, onDelete, onView }: MemberItemProps) {
  const initials = getInitials(name);

  return (
    <div className="flex items-center justify-between px-2 py-1.5 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors group">
      <div className="flex items-center gap-2.5 min-w-0">
        <Avatar className="w-7 h-7 flex-shrink-0">
          <AvatarFallback className="bg-primary-light text-primary font-semibold text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-900 truncate leading-tight">{name}</p>
          <p className="text-[11px] text-gray-400 capitalize leading-tight">{role}</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-xs"
          >
            <DotsThree className="w-3.5 h-3.5 text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          {onView && (
            <DropdownMenuItem onClick={onView} className="cursor-pointer text-xs">
              View
            </DropdownMenuItem>
          )}
          {onEdit && (
            <DropdownMenuItem onClick={onEdit} className="cursor-pointer text-xs">
              Edit
            </DropdownMenuItem>
          )}
          {onDelete && (
            <DropdownMenuItem onClick={onDelete} variant="destructive" className="cursor-pointer text-xs">
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
