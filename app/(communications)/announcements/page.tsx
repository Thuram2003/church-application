"use client";

import {
  Megaphone,
  CaretDown,
  MagnifyingGlass,
  DotsThree,
  Clock,
  PushPin,
} from "@phosphor-icons/react";
import { useState } from "react";
import { StatCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostAnnouncementDialog } from "@/components/communications/PostAnnouncementDialog";

// Mock data
const announcements = [
  {
    id: 1,
    title: "nn",
    publishedDate: "7 Apr 2026",
    status: "Public",
  },
];

type FilterTab = "all" | "pinned" | "scheduled";

export default function AnnouncementsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const totalAnnouncements = announcements.length;
  const scheduledAnnouncements = announcements.filter((a) => a.status === "Scheduled").length;
  const pinnedAnnouncements = announcements.filter((a) => a.status === "Pinned").length;

  const handlePostAnnouncement = (data: any) => {
    console.log("Posting announcement:", data);
    // API call here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Megaphone className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Announcements</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setCreateDialogOpen(true)}>
            Create new
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={Megaphone}
          label="Announcements"
          value={totalAnnouncements.toString()}
        />
        <StatCard
          icon={Clock}
          label="Scheduled"
          value={scheduledAnnouncements.toString()}
        />
        <StatCard
          icon={PushPin}
          label="Pinned"
          value={pinnedAnnouncements.toString()}
        />
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        <Button
          variant={activeFilter === "all" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveFilter("all")}
          className="gap-1"
        >
          <Megaphone className="w-4 h-4" />
          All posts
        </Button>
        <Button
          variant={activeFilter === "pinned" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveFilter("pinned")}
          className="gap-1"
        >
          <PushPin className="w-4 h-4" />
          Pinned only
        </Button>
        <Button
          variant={activeFilter === "scheduled" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveFilter("scheduled")}
          className="gap-1"
        >
          <Clock className="w-4 h-4" />
          Scheduled
        </Button>
      </div>

      {/* Announcements List */}
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="border border-gray-100 rounded-sm bg-white p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-primary-light rounded-sm flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {announcement.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Published on {announcement.publishedDate}
                  </p>
                  <div className="mt-2">
                    <Badge
                      variant="secondary"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {announcement.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Preview
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                      <DotsThree className="w-4 h-4 text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Pin</DropdownMenuItem>
                    <DropdownMenuItem>Schedule</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Announcement Dialog */}
      <PostAnnouncementDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handlePostAnnouncement}
      />
    </div>
  );
}
