"use client";

import { UsersThree, Plus } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CardListSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/EmptyState";
import { usePersonGroups } from "@/hooks/use-groups";
import type { GroupVisibility } from "@/types/groups";

interface PersonGroupsTabProps {
  personId: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getVisibilityBadgeClass(visibility: GroupVisibility) {
  switch (visibility) {
    case "private":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "public":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "team":
      return "bg-primary-lighter text-primary-dark border-primary-light";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

export function PersonGroupsTab({ personId }: PersonGroupsTabProps) {
  const { data: response, isLoading } = usePersonGroups(personId);
  const groups = response?.data ?? [];

  if (isLoading) {
    return (
      <div className="space-y-6 py-6">
        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <UsersThree className="w-5 h-5 text-primary" />
            <h2 className="text-base font-semibold text-gray-900">Groups</h2>
          </div>
        </div>
        <CardListSkeleton count={3} />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <UsersThree className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-gray-900">
            Groups
            {groups.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({groups.length})
              </span>
            )}
          </h2>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add to group
        </Button>
      </div>

      {/* Groups List */}
      {groups.length === 0 ? (
        <EmptyState
          icon={<UsersThree className="w-12 h-12" />}
          title="No groups yet"
          description="This person is not part of any groups"
        />
      ) : (
        <div className="grid gap-3 max-w-2xl">
          {groups.map((group) => (
            <div
              key={group.id}
              className="border border-gray-200 rounded-xl overflow-hidden flex items-stretch hover:border-gray-300 transition-colors"
            >
              <div className="w-1 bg-primary flex-shrink-0" />
              <div className="flex-1 px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      {group.iconUrl ? (
                        <img src={group.iconUrl} alt={group.name} className="w-full h-full object-cover" />
                      ) : (
                        <AvatarFallback className="bg-primary-light text-primary font-semibold text-sm">
                          {getInitials(group.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {group.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="secondary"
                          className={getVisibilityBadgeClass(group.visibility)}
                        >
                          {group.visibility.charAt(0).toUpperCase() + group.visibility.slice(1)}
                        </Badge>
                        {group.memberRole.isLeader && (
                          <Badge
                            variant="secondary"
                            className="bg-primary-light text-primary border-primary-lighter"
                          >
                            Leader
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Joined</p>
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(group.memberRole.joinedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
