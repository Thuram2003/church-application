"use client";

import {
  User,
  UsersThree,
  CurrencyDollar,
  ArrowLeft,
  DotsThree,
  PencilSimple,
  Trash,
} from "@phosphor-icons/react";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TabNavigation, TabItem } from "@/components/TabNavigation";
import {
  PersonProfileTab,
  PersonGroupsTab,
  PersonGivingTab,
} from "@/components/people";
import { usePerson } from "@/hooks/use-people";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getStatusBadgeColor(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-50 text-green-700 border-green-200";
    case "inactive":
      return "bg-gray-50 text-gray-700 border-gray-200";
    case "visitor":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "new":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

export default function PersonProfilePage() {
  const params = useParams();
  const personId = params.id as string;
  const [activeTab, setActiveTab] = useState("profile");
  
  const { data: response, isLoading } = usePerson(personId);
  const person = response?.data;

  const tabs: TabItem[] = [
    {
      value: "profile",
      label: "Profile",
      icon: <User className="w-4 h-4" />,
      content: <PersonProfileTab personId={personId} />,
    },
    {
      value: "groups",
      label: "Groups",
      icon: <UsersThree className="w-4 h-4" />,
      content: <PersonGroupsTab personId={personId} />,
    },
    {
      value: "giving",
      label: "Giving",
      icon: <CurrencyDollar className="w-4 h-4" />,
      content: <PersonGivingTab personId={personId} />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/people">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Link href="/people" className="text-sm text-primary hover:underline">
              People
            </Link>
            <span className="text-sm text-gray-400">—</span>
            {isLoading ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              <span className="text-sm font-semibold text-gray-900">
                {person?.user?.name || "Unknown"}
              </span>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <DotsThree className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 content-justify">
        {/* Left - Person Info */}
        <div className="space-y-6">
          {isLoading ? (
            <>
              <Skeleton className="w-40 h-40 rounded-sm" />
              <div className="space-y-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </>
          ) : person ? (
            <>
              {/* Avatar */}
              <div className="w-40 h-40 bg-primary-light rounded-sm flex items-center justify-center">
                <Avatar className="w-32 h-32">
                  <AvatarFallback className="bg-primary-light text-primary font-semibold text-4xl">
                    {getInitials(person.user?.name || "Unknown")}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Details */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {person.user?.name || "Unknown"}
                </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {person.user?.email || "No email"}
                  </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={getStatusBadgeColor(person.status)}
                    >
                      {person.status.charAt(0).toUpperCase() + person.status.slice(1)}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-primary-light text-primary border-primary-lighter"
                    >
                      {person.role.charAt(0).toUpperCase() + person.role.slice(1)}
                    </Badge>
                  </div>
   
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-2 text-gray-700">
                  <PencilSimple className="w-4 h-4" />
                  Edit details
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash className="w-4 h-4" />
                  Archive person
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Person not found</p>
            </div>
          )}
        </div>

        {/* Right - Tabs Content */}
        <div className="lg:col-span-4">
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
}
