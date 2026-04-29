"use client";

import {
  Church,
  HouseLine,
  UsersThree,
  Coins,
  Wallet,
  Money,
  CreditCard,
  Repeat,
  ClockCounterClockwise,
  TrendUp,
  UserPlus,
  Calendar,
  CalendarBlank,
  Envelope,
  ChatCircle,
  Megaphone,
  FileText,
  Users,
  UserPlus as InviteIcon,
} from "@phosphor-icons/react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { StatCard, SummaryCard, MetricBox, ActionButton, MemberItem } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCardsSkeleton, MemberListSkeleton } from "@/components/ui/skeleton";
import { CreatePeopleDialog } from "@/components/people/CreatePeopleDialog";
import { usePeople, useCreatePeopleBulk } from "@/hooks/use-people";
import { useFamilies } from "@/hooks/use-families";
import { useGroups } from "@/hooks/use-groups";
import type { CreatePeoplePersonRequest } from "@/types/people";

const upcomingBirthdays: any[] = [];
const upcomingEvents: any[] = [];

export default function HomePage() {
  const router = useRouter();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Each query is independent — they all fire in parallel
  const { data: peopleResponse, isLoading: loadingPeople } = usePeople({ limit: 50, offset: 0 });
  const { data: familiesResponse, isLoading: loadingFamilies } = useFamilies();
  const { data: groupsResponse, isLoading: loadingGroups } = useGroups();

  const createPeopleMutation = useCreatePeopleBulk();

  // Derived counts — each resolves independently
  const allPeople = useMemo(() => {
    const items = peopleResponse?.data?.items ?? [];
    return items.filter((p: any) => !p.archivedAt);
  }, [peopleResponse]);

  const totalPeople = allPeople.length;

  const totalFamilies = useMemo(() => {
    const data = familiesResponse?.data as any;
    if (!data) return 0;
    const items = data.items ?? (Array.isArray(data) ? data : []);
    return items.filter((f: any) => !f.archivedAt).length;
  }, [familiesResponse]);

  const totalGroups = useMemo(() => {
    const data = groupsResponse?.data as any;
    if (!data) return 0;
    const items = Array.isArray(data) ? data : (data.items ?? []);
    return items.length;
  }, [groupsResponse]);

  // Recently added — last 4 by createdAt
  const recentMembers = useMemo(() => {
    return [...allPeople]
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4);
  }, [allPeople]);

  // Stat cards show skeleton only while their own data is loading
  const statsLoading = loadingPeople || loadingFamilies || loadingGroups;

  const handleCreatePeople = async (people: CreatePeoplePersonRequest[]) => {
    try {
      await createPeopleMutation.mutateAsync({ people, defaultRole: "member" });
      setCreateDialogOpen(false);
    } catch {}
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-2 text-primary">
        <Church className="w-5 h-5" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      {/* Stats Cards — skeleton until all three counts are ready */}
      {statsLoading ? (
        <StatCardsSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="Members"
            value={totalPeople.toString()}
            onAdd={() => router.push("/people")}
          />
          <StatCard
            icon={HouseLine}
            label="Families"
            value={totalFamilies.toString()}
            onAdd={() => router.push("/families")}
          />
          <StatCard
            icon={UsersThree}
            label="Groups"
            value={totalGroups.toString()}
            onAdd={() => router.push("/groups")}
          />
          <StatCard icon={Coins} label="Funds" count={0} />
        </div>
      )}

      {/* Summary Cards Row — each section has its own loading state */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recently Added Members */}
        <SummaryCard
          title="Recently Added Members"
          emptyIcon={UserPlus}
          emptyText="No people added yet"
          hasData={!loadingPeople && recentMembers.length > 0}
          onSeeAll={() => router.push("/people")}
        >
          {/* Only show skeleton while loading — once done, let SummaryCard handle empty state */}
          {loadingPeople ? (
            <MemberListSkeleton count={4} />
          ) : recentMembers.length > 0 ? (
            <div className="space-y-2">
              {recentMembers.map((member: any) => (
                <MemberItem
                  key={member.id}
                  id={member.id}
                  name={member.user?.name ?? member.userId}
                  role={member.ageGroup ?? member.role}
                  onView={() => router.push("/people")}
                />
              ))}
            </div>
          ) : null}
        </SummaryCard>

        <SummaryCard
          title="Upcoming Birthdays"
          emptyIcon={Calendar}
          emptyText="No birthdays found"
          hasData={upcomingBirthdays.length > 0}
          onSeeAll={() => router.push("/people")}
        />

        <SummaryCard
          title="Upcoming Events"
          emptyIcon={CalendarBlank}
          emptyText="No upcoming events"
          hasData={upcomingEvents.length > 0}
          onSeeAll={() => router.push("/calendar")}
        />
      </div>

      {/* Giving Overview */}
      <Card className="border-gray-100 bg-white">
        <CardHeader className="p-5 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Giving Overview</h2>
            <div className="flex items-center gap-3">
              <Button size="sm">Connect to Stripe</Button>
              <Select defaultValue="all-time">
                <SelectTrigger size="sm" className="w-[140px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <MetricBox icon={Wallet} label="Total Giving" value="XAF 0" />
            <MetricBox icon={Money} label="In-Person Giving" value="XAF 0" />
            <MetricBox icon={CreditCard} label="Online Giving" value="XAF 0" />
            <MetricBox icon={Repeat} label="Recurring Giving" value="XAF 0" />
            <MetricBox icon={ClockCounterClockwise} label="Last Donation" value="—" />
            <MetricBox icon={TrendUp} label="Highest Donation" value="—" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-gray-100 bg-white">
        <CardHeader className="p-5 pb-4">
          <h2 className="text-base font-semibold text-gray-900">Quick Actions</h2>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="flex flex-wrap gap-3">
            <ActionButton icon={Wallet} label="Add a giving" />
            <ActionButton icon={Envelope} label="Send email" />
            <ActionButton icon={ChatCircle} label="Send SMS" />
            <ActionButton icon={Megaphone} label="Post an announcement" />
            <ActionButton icon={FileText} label="Create form" />
            <ActionButton icon={InviteIcon} label="Invite your team" />
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreatePeopleDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreatePeople}
        isLoading={createPeopleMutation.isPending}
      />
    </div>
  );
}
