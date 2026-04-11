"use client";

import {
  Users,
  House,
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
  CurrencyDollar,
  Envelope,
  ChatCircle,
  Megaphone,
  FileText,
  UserPlus as InviteIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
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
import { CreatePeopleDialog } from "@/components/people/CreatePeopleDialog";
import { CreateFamilyDialog } from "@/components/people/CreateFamilyDialog";
import { CreateGroupDialog } from "@/components/people/CreateGroupDialog";

// Mock data - replace with real data from your API
const recentMembers = [
  { id: 1, name: "Amebe christian", role: "Adult" }
];
const upcomingBirthdays: any[] = [];
const upcomingEvents: any[] = [];

export default function HomePage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createFamilyDialogOpen, setCreateFamilyDialogOpen] = useState(false);
  const [createGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);

  const handleCreatePeople = (people: any[]) => {
    console.log("Creating people:", people);
    // API call here
    // await api.createPeople(people)
  };

  const handleCreateFamily = (family: any) => {
    console.log("Creating family:", family);
    // API call here
    // await api.createFamily(family)
  };

  const handleCreateGroup = (group: any) => {
    console.log("Creating group:", group);
    // API call here
    // await api.createGroup(group)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-2 text-primary">
        <Church className="w-5 h-5" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Members" value="3" onAdd={() => setCreateDialogOpen(true)} />
        <StatCard icon={HouseLine} label="Families" value="4" onAdd={() => setCreateFamilyDialogOpen(true)} />
        <StatCard icon={UsersThree} label="Groups" value="10" onAdd={() => setCreateGroupDialogOpen(true)} />
        <StatCard icon={Coins} label="Funds" count={1} />
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SummaryCard
          title="Recently Added Members"
          emptyIcon={UserPlus}
          emptyText="No people added"
          hasData={recentMembers.length > 0}
          onSeeAll={() => console.log("See all members")}
        >
          <div className="space-y-2">
            {recentMembers.map((member) => (
              <MemberItem
                key={member.id}
                id={member.id}
                name={member.name}
                role={member.role}
                onView={() => console.log("View", member.name)}
                onEdit={() => console.log("Edit", member.name)}
                onDelete={() => console.log("Delete", member.name)}
              />
            ))}
          </div>
        </SummaryCard>
        <SummaryCard
          title="Upcoming Birthdays"
          emptyIcon={Calendar}
          emptyText="No Birthdays found"
          hasData={upcomingBirthdays.length > 0}
          onSeeAll={() => console.log("See all birthdays")}
        />
        <SummaryCard
          title="Upcoming Events"
          emptyIcon={CalendarBlank}
          emptyText="No upcoming events"
          hasData={upcomingEvents.length > 0}
          onSeeAll={() => console.log("See all events")}
        />
      </div>

      {/* Giving Overview */}
      <Card className="border-gray-100 bg-white">
        <CardHeader className="p-5 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Giving Overview</h2>
            <div className="flex items-center gap-3">
              <Button size="sm">
                Connect to Stripe
              </Button>
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
            <MetricBox icon={Wallet} label="Total Giving" value="XAF 4000" />
            <MetricBox icon={Money} label="In-Person Giving" value="XAF 2500" />
            <MetricBox icon={CreditCard} label="Online Giving" value="XAF 1000" />
            <MetricBox icon={Repeat} label="Recurring Giving" value="XAF 500" />
            <MetricBox icon={ClockCounterClockwise} label="Last Donation" value="XAF 200" />
            <MetricBox icon={TrendUp} label="Highest Donation" value="XAF 10,000" />
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

      {/* Create People Dialog */}
      <CreatePeopleDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreatePeople}
      />

      {/* Create Family Dialog */}
      <CreateFamilyDialog
        open={createFamilyDialogOpen}
        onOpenChange={setCreateFamilyDialogOpen}
        onSubmit={handleCreateFamily}
      />

      {/* Create Group Dialog */}
      <CreateGroupDialog
        open={createGroupDialogOpen}
        onOpenChange={setCreateGroupDialogOpen}
        onSubmit={handleCreateGroup}
      />
    </div>
  );
}
