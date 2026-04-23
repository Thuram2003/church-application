"use client";

import {
  SunHorizon,
  MagnifyingGlass,
  Plus,
  Calendar,
  Clock,
  Users,
  Stack,
  List,
  DotsThree,
  ArrowsDownUp,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TodayDevotionCard } from "@/components/devotion/TodayDevotionCard";
import { DevotionStatsCard } from "@/components/devotion/DevotionStatsCard";
import { CreateDevotionDialog } from "@/components/devotion/CreateDevotionDialog";
import { CreateSeriesDialog } from "@/components/devotion/CreateSeriesDialog";
import { ReviewSubmissionDialog } from "@/components/devotion/ReviewSubmissionDialog";
import { Devotion, DevotionStatus, MemberSubmission } from "@/types/devotion";

// Mock data
const mockDevotions: Devotion[] = [
  {
    id: "1",
    title: "Walking in Faith",
    publishDate: new Date("2026-04-10"),
    recurrence: {
      type: "daily",
      time: "07:00",
      startDate: new Date("2026-04-10"),
    },
    scriptureReference: "Hebrews 11:1",
    scriptureText:
      "Now faith is confidence in what we hope for and assurance about what we do not see.",
    reflection:
      "Faith is not just believing in God, but trusting Him completely with our lives. When we walk by faith, we demonstrate our confidence in His promises and His character...",
    prayerPoints: [
      { id: "1", text: "For stronger faith in difficult times" },
      { id: "2", text: "For wisdom to trust God's timing" },
    ],
    declaration: "I walk by faith and not by sight!",
    memoryVerse: "Hebrews 11:1",
    author: "Pastor John",
    status: "published",
    createdAt: new Date("2026-04-01"),
    updatedAt: new Date("2026-04-01"),
  },
];

const mockSeries = [
  { id: "1", name: "Faith Series", devotionCount: 7 },
  { id: "2", name: "Prayer & Fasting", devotionCount: 21 },
];

const mockSubmissions: MemberSubmission[] = [
  {
    id: "1",
    submittedBy: "Jane Doe",
    submittedAt: new Date("2026-04-09"),
    devotion: {
      title: "God's Grace",
      publishDate: new Date("2026-04-15"),
      scriptureReference: "Ephesians 2:8-9",
      scriptureText:
        "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.",
      reflection:
        "Grace is God's unmerited favor. We cannot earn it, we cannot buy it, we can only receive it with grateful hearts...",
      prayerPoints: [
        { id: "1", text: "For a deeper understanding of God's grace" },
      ],
      memoryVerse: "Ephesians 2:8",
      author: "Jane Doe",
    },
    status: "pending",
  },
];

type ViewMode = "overview" | "library" | "series" | "submissions";

export default function DevotionPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [seriesFilter, setSeriesFilter] = useState<string>("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createSeriesDialogOpen, setCreateSeriesDialogOpen] = useState(false);
  const [reviewSubmissionDialogOpen, setReviewSubmissionDialogOpen] =
    useState(false);
  const [selectedSubmission, setSelectedSubmission] =
    useState<MemberSubmission | null>(null);

  // Get today's devotion
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayDevotion = mockDevotions.find((d) => {
    const devDate = new Date(d.publishDate);
    devDate.setHours(0, 0, 0, 0);
    return devDate.getTime() === today.getTime() && d.status === "published";
  });

  // Calculate stats
  const totalDevotions = mockDevotions.length;
  const thisMonth = mockDevotions.filter((d) => {
    const date = new Date(d.publishDate);
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }).length;
  const scheduledAhead = mockDevotions.filter(
    (d) => d.status === "scheduled"
  ).length;
  const pendingSubmissions = mockSubmissions.filter(
    (s) => s.status === "pending"
  ).length;

  // Get upcoming devotions (next 7 days)
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const upcomingDevotions = mockDevotions
    .filter((d) => {
      const devDate = new Date(d.publishDate);
      return devDate > today && devDate <= nextWeek;
    })
    .sort(
      (a, b) =>
        new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
    );

  const handleCreateDevotion = (devotion: any) => {
    console.log("Creating devotion:", devotion);
    setCreateDialogOpen(false);
  };

  const handleCreateSeries = (series: any) => {
    console.log("Creating series:", series);
    setCreateSeriesDialogOpen(false);
  };

  const handleApproveSubmission = (id: string) => {
    console.log("Approving submission:", id);
    setReviewSubmissionDialogOpen(false);
    setSelectedSubmission(null);
  };

  const handleRejectSubmission = (id: string, note: string) => {
    console.log("Rejecting submission:", id, "Note:", note);
    setReviewSubmissionDialogOpen(false);
    setSelectedSubmission(null);
  };

  const handleReviewSubmission = (submission: MemberSubmission) => {
    setSelectedSubmission(submission);
    setReviewSubmissionDialogOpen(true);
  };

  const getStatusBadge = (status: DevotionStatus) => {
    const styles = {
      draft: "bg-gray-100 text-gray-700 border-gray-200",
      scheduled: "bg-blue-50 text-blue-700 border-blue-200",
      published: "bg-green-50 text-green-700 border-green-200",
    };
    return styles[status];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <SunHorizon className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Devotion</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Create devotion
          </Button>
          <Button variant="ghost" size="icon">
            <DotsThree className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* View Tabs */}
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
        <TabsList>
          <TabsTrigger value="overview" className="gap-1.5">
            <SunHorizon className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="library" className="gap-1.5">
            <List className="w-4 h-4" />
            Library
          </TabsTrigger>
          <TabsTrigger value="series" className="gap-1.5">
            <Stack className="w-4 h-4" />
            Series
          </TabsTrigger>
          <TabsTrigger value="submissions" className="gap-1.5">
            <Users className="w-4 h-4" />
            Submissions
            {pendingSubmissions > 0 && (
              <Badge className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0">
                {pendingSubmissions}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Today's Devotion */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Today's Devotion
            </h2>
            <TodayDevotionCard devotion={todayDevotion || null} />
          </div>

          {/* Quick Stats */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Quick Stats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <DevotionStatsCard
                icon={SunHorizon}
                label="Total devotions"
                value={totalDevotions}
              />
              <DevotionStatsCard
                icon={Calendar}
                label="This month"
                value={thisMonth}
              />
              <DevotionStatsCard
                icon={Clock}
                label="Scheduled ahead"
                value={scheduledAhead}
              />
              <DevotionStatsCard
                icon={Users}
                label="Pending submissions"
                value={pendingSubmissions}
              />
            </div>
          </div>

          {/* Upcoming Devotions */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Upcoming (Next 7 Days)
            </h2>
            <div className="space-y-2">
              {upcomingDevotions.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-lg p-6 text-center">
                  <p className="text-sm text-gray-600">
                    No devotions scheduled for the next 7 days
                  </p>
                </div>
              ) : (
                upcomingDevotions.map((devotion) => (
                  <div
                    key={devotion.id}
                    className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {devotion.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(devotion.publishDate).toLocaleDateString()}
                          </span>
                          <span>{devotion.scriptureReference}</span>
                          <Badge
                            variant="secondary"
                            className={getStatusBadge(devotion.status)}
                          >
                            {devotion.status}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Recent Activity
            </h2>
            <div className="bg-white border border-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Library Tab */}
        <TabsContent value="library" className="space-y-4 mt-6">
          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search devotions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>

            <Select value={seriesFilter} onValueChange={setSeriesFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All series" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All series</SelectItem>
                {mockSeries.map((series) => (
                  <SelectItem key={series.id} value={series.id}>
                    {series.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border border-gray-100 rounded-sm bg-white">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Title
                      <ArrowsDownUp className="w-3 h-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Date
                      <ArrowsDownUp className="w-3 h-3" />
                    </div>
                  </TableHead>
                  <TableHead>Scripture</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDevotions.map((devotion) => (
                  <TableRow key={devotion.id}>
                    <TableCell>
                      <span className="font-medium text-sm">
                        {devotion.title}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(devotion.publishDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-primary">
                      {devotion.scriptureReference}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {devotion.author}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getStatusBadge(devotion.status)}
                      >
                        {devotion.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
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
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Preview</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem variant="destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Series Tab */}
        <TabsContent value="series" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Manage devotion series and group related content
            </p>
            <Button size="sm" onClick={() => setCreateSeriesDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-1" />
              Create series
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSeries.map((series) => (
              <div
                key={series.id}
                className="bg-white border border-gray-100 rounded-lg p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                    <Stack className="w-6 h-6 text-primary" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                        <DotsThree className="w-4 h-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View devotions</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {series.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {series.devotionCount} devotions
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Submissions Tab */}
        <TabsContent value="submissions" className="space-y-4 mt-6">
          <p className="text-sm text-gray-600">
            Review and manage devotion submissions from members
          </p>

          <div className="space-y-3">
            {mockSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white border border-gray-100 rounded-lg p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {submission.devotion.title}
                      </h3>
                      <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                        Pending
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Submitted by {submission.submittedBy}
                    </p>
                    <p className="text-xs text-gray-500">
                      {submission.submittedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReviewSubmission(submission)}
                    >
                      Review
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-green-600"
                      onClick={() => handleApproveSubmission(submission.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                      onClick={() => handleReviewSubmission(submission)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Devotion Dialog */}
      <CreateDevotionDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateDevotion}
        series={mockSeries}
      />

      {/* Create Series Dialog */}
      <CreateSeriesDialog
        open={createSeriesDialogOpen}
        onOpenChange={setCreateSeriesDialogOpen}
        onSubmit={handleCreateSeries}
      />

      {/* Review Submission Dialog */}
      <ReviewSubmissionDialog
        open={reviewSubmissionDialogOpen}
        onOpenChange={setReviewSubmissionDialogOpen}
        submission={selectedSubmission}
        onApprove={handleApproveSubmission}
        onReject={handleRejectSubmission}
      />
    </div>
  );
}
