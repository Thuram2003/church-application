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
  id: number;
  name: string;
  role: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

export function MemberItem({ id, name, role, onEdit, onDelete, onView }: MemberItemProps) {
  const initials = name.substring(0, 2).toUpperCase();

  return (
    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-sm hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-primary-light text-primary font-semibold text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon-sm"
            className="h-8 w-8"
          >
            <DotsThree className="w-4 h-4 text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          {onView && (
            <DropdownMenuItem onClick={onView} className="cursor-pointer">
              View Details
            </DropdownMenuItem>
          )}
          {onEdit && (
            <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
              Edit
            </DropdownMenuItem>
          )}
          {onDelete && (
            <DropdownMenuItem onClick={onDelete} variant="destructive" className="cursor-pointer">
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
