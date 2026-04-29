"use client";

import {
  UserCirclePlus,
  UsersThree,
  Money,
  ArrowLeft,
  DotsThreeVertical,
  PencilSimple,
  Archive,
  UserMinus,
  UserPlus,
  House,
  Camera,
  GenderMale,
  GenderFemale,
  Baby,
  PersonSimpleWalk,
  CalendarDots,
  Trash,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TabNavigation, TabItem } from "@/components/TabNavigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PersonProfileTab,
  PersonGroupsTab,
  PersonGivingTab,
} from "@/components/people";
import { usePerson } from "@/hooks/use-people";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getStatusBadgeColor(status: string) {
  switch (status.toLowerCase()) {
    case "active":  return "bg-green-50 text-green-700 border-green-200";
    case "inactive": return "bg-gray-50 text-gray-600 border-gray-200";
    case "visitor": return "bg-blue-50 text-blue-700 border-blue-200";
    case "new":     return "bg-yellow-50 text-yellow-700 border-yellow-200";
    default:        return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

function GenderIcon({ gender }: { gender: string }) {
  if (gender?.toLowerCase() === "female")
    return <GenderFemale className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />;
  if (gender?.toLowerCase() === "male")
    return <GenderMale className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />;
  return <GenderMale className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />;
}

function AgeGroupIcon({ ageGroup }: { ageGroup: string }) {
  switch (ageGroup?.toLowerCase()) {
    case "child":  return <Baby className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />;
    case "youth":  return <PersonSimpleWalk className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />;
    case "senior": return <PersonSimpleWalk className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />;
    default:       return <PersonSimpleWalk className="w-3.5 h-3.5 text-primary flex-shrink-0" />;
  }
}

export default function PersonProfilePage() {
  const params = useParams();
  const router = useRouter();
  const personId = params.id as string;
  const [activeTab, setActiveTab] = useState("profile");
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: response, isLoading } = usePerson(personId);
  const person = response?.data;

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarSrc(url);
    // TODO: upload to server
  };

  const tabs: TabItem[] = [
    {
      value: "profile",
      label: "Profile",
      icon: <UserCirclePlus className="w-4 h-4" />,
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
      icon: <Money className="w-4 h-4" />,
      content: <PersonGivingTab personId={personId} />,
    },
  ];

  const name = person?.user?.name || "Unknown";
  const initials = getInitials(name);
  const isVisitor = person?.isVisitor || person?.status === "visitor";

  return (
    <div className="p-6 space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <nav className="flex items-center gap-1.5 text-sm">
            <Link href="/people" className="text-primary hover:underline font-medium">
              People
            </Link>
            <span className="text-gray-400">/</span>
            {isLoading ? (
              <Skeleton className="h-4 w-28" />
            ) : (
              <span className="text-gray-600 font-medium">{name}</span>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <PencilSimple className="w-3.5 h-3.5" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <DotsThreeVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Record attendance</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                <Trash className="w-4 h-4 mr-2" />
                Delete permanently
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Masonry layout: sidebar + main */}
      <div className="flex gap-5 items-start">

        {/* ── LEFT SIDEBAR ── */}
        <div className="w-52 flex-shrink-0 space-y-3 sticky top-6">

          {isLoading ? (
            <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-4">
              {/* avatar skeleton */}
              <div className="flex flex-col items-center gap-3">
                <Skeleton className="w-20 h-20 rounded-full" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="space-y-2 pt-2 border-t border-gray-100">
                {[1,2,3].map(i => <Skeleton key={i} className="h-3 w-full" />)}
              </div>
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-8 w-full rounded-lg" />)}
              </div>
            </div>
          ) : person ? (
            <>
              {/* ── Person card ── */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col items-center gap-3">

                {/* Avatar with upload */}
                <div className="relative group">
                  <Avatar className="w-20 h-20">
                    {avatarSrc && <AvatarImage src={avatarSrc} alt={name} />}
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  {/* Upload overlay */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    title="Upload photo"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>

                {/* Name + email */}
                <div className="text-center w-full">
                  <h2 className="text-sm font-semibold text-gray-900 leading-snug">{name}</h2>
                  {person.user?.email && (
                    <p className="text-xs text-gray-400 truncate mt-0.5">{person.user.email}</p>
                  )}
                </div>

                {/* Status + role badges */}
                <div className="flex flex-wrap gap-1.5 justify-center">
                  <Badge variant="secondary" className={getStatusBadgeColor(person.status)}>
                    {person.status.charAt(0).toUpperCase() + person.status.slice(1)}
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {person.role.charAt(0).toUpperCase() + person.role.slice(1)}
                  </Badge>
                </div>

                {/* Quick info */}
                <div className="w-full space-y-1.5 pt-2 border-t border-gray-100">
                  {person.gender && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <GenderIcon gender={person.gender} />
                      <span>{person.gender}</span>
                    </div>
                  )}
                  {person.ageGroup && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <AgeGroupIcon ageGroup={person.ageGroup} />
                      <span>{person.ageGroup}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CalendarDots className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>
                      Joined{" "}
                      {new Date(person.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Actions card ── */}
              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-4 pt-3 pb-1">
                  Actions
                </p>

                <div className="px-2 pb-2 space-y-0.5">
                  {/* Add new giving */}
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <Money className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Add new giving
                  </button>

                  {/* Add to group */}
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <UsersThree className="w-4 h-4 text-primary flex-shrink-0" />
                    Add to group
                  </button>

                  {/* View family */}
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <House className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    View family
                  </button>

                  {/* Visitor toggle */}
                  {isVisitor ? (
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors text-left">
                      <UserMinus className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      Remove visitor status
                    </button>
                  ) : (
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors text-left">
                      <UserPlus className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      Mark as visitor
                    </button>
                  )}

                  <div className="h-px bg-gray-100 mx-1 my-1" />

                  {/* Archive */}
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-amber-600 hover:bg-amber-50 transition-colors text-left">
                    <Archive className="w-4 h-4 flex-shrink-0" />
                    Archive person
                  </button>

                  {/* Delete */}
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-600 hover:bg-red-50 transition-colors text-left">
                    <Trash className="w-4 h-4 flex-shrink-0" />
                    Delete person
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white border border-gray-100 rounded-xl p-8 text-center">
              <p className="text-sm text-gray-500">Person not found</p>
            </div>
          )}
        </div>

        {/* ── RIGHT — Tabs (masonry main column) ── */}
        <div className="flex-1 min-w-0">
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
