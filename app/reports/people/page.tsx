"use client"

import {
  Users,
  Archive,
  UsersThree,
  House,
  Heart,
  Phone,
  Envelope,
  Warning,
} from "@phosphor-icons/react"
import { OverviewSection } from "@/components/reports/people/OverviewSection"
import { ContactInfoSection } from "@/components/reports/people/ContactInfoSection"
import { StatisticsSection } from "@/components/reports/people/StatisticsSection"
import { DistributionSection } from "@/components/reports/people/DistributionSection"
import { GrowthChartSection } from "@/components/reports/people/GrowthChartSection"
import { BreakdownsSection } from "@/components/reports/people/BreakdownsSection"
import { getChartColors } from "@/lib/chart-colors"

const mockData = {
  overview: {
    totalPeople: 247,
    archived: 12,
    groups: 18,
    families: 64,
    groupMembers: 189,
  },
  contactInfo: {
    withPhone: 198,
    withEmail: 231,
    missingContact: 16,
    adults: 156,
    children: 91,
  },
  statistics: {
    age: { average: 34, youngest: 2, oldest: 78, withAgeData: 223 },
    group: { averageSize: 11, smallest: 4, largest: 28 },
    family: { averageSize: 4, smallest: 2, largest: 7 },
  },
  growth: [
    { month: "Jan", newMembers: 12, newGroups: 2, newFamilies: 4 },
    { month: "Feb", newMembers: 18, newGroups: 1, newFamilies: 5 },
    { month: "Mar", newMembers: 24, newGroups: 3, newFamilies: 8 },
    { month: "Apr", newMembers: 15, newGroups: 2, newFamilies: 3 },
    { month: "May", newMembers: 21, newGroups: 4, newFamilies: 6 },
    { month: "Jun", newMembers: 19, newGroups: 2, newFamilies: 5 },
  ],
  breakdowns: {
    ageGroup: [
      { label: "Children (0-12)", value: 45 },
      { label: "Teens (13-17)", value: 32 },
      { label: "Young Adults (18-30)", value: 58 },
      { label: "Adults (31-55)", value: 76 },
      { label: "Elder (56+)", value: 36 },
    ],
    maritalStatus: [
      { label: "Unspecified", value: 89 },
      { label: "Married", value: 124 },
      { label: "Divorced", value: 18 },
      { label: "Single", value: 12 },
      { label: "Widowed", value: 4 },
    ],
    groupTypes: [
      { label: "Private", value: 8 },
      { label: "Public", value: 5 },
      { label: "Team", value: 5 },
      { label: "Without Groups", value: 58 },
    ],
  },
}

export default function PeopleReportsPage() {
  const colors = getChartColors()
  
  const distribution = {
    gender: [
      { name: "Male", value: 128, color: colors.chart1 },
      { name: "Female", value: 119, color: colors.chart2 },
    ],
    groupParticipation: [
      { name: "In Group", value: 189, color: colors.chart1 },
      { name: "Not in Group", value: 58, color: colors.chart5 },
    ],
  }

  return (
    <div className="p-6 space-y-8 bg-page-bg min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 text-primary">
        <Users className="w-5 h-5" />
        <h1 className="text-lg font-semibold">People</h1>
      </div>

      {/* Overview Section */}
      <OverviewSection
        title="OVERVIEW"
        stats={[
          { icon: Users, label: "TOTAL PEOPLE", value: mockData.overview.totalPeople },
          { icon: Archive, label: "ARCHIVED", value: mockData.overview.archived },
          { icon: UsersThree, label: "GROUPS", value: mockData.overview.groups },
          { icon: House, label: "FAMILIES", value: mockData.overview.families },
          {
            icon: Heart,
            label: "GROUP MEMBERS",
            value: mockData.overview.groupMembers,
            sublabel: "across all groups",
          },
        ]}
      />

      {/* Contact Information */}
      <ContactInfoSection
        title="CONTACT INFORMATION"
        stats={[
          { icon: Phone, label: "WITH PHONE", value: mockData.contactInfo.withPhone },
          { icon: Envelope, label: "WITH EMAIL", value: mockData.contactInfo.withEmail },
          { icon: Warning, label: "MISSING CONTACT", value: mockData.contactInfo.missingContact },
          {
            icon: Users,
            label: "ADULTS / CHILDREN",
            value: `${mockData.contactInfo.adults} / ${mockData.contactInfo.children}`,
          },
        ]}
      />

      {/* Statistics */}
      <StatisticsSection
        title="STATISTICS"
        ageStats={mockData.statistics.age}
        groupStats={mockData.statistics.group}
        familyStats={mockData.statistics.family}
      />

      {/* Distribution */}
      <DistributionSection
        title="DISTRIBUTION"
        genderData={distribution.gender}
        groupParticipationData={distribution.groupParticipation}
      />

      {/* Growth Over Time */}
      <GrowthChartSection
        title="GROWTH OVER TIME"
        subtitle="New Members, Groups, and Families"
        data={mockData.growth}
      />

      {/* Breakdowns */}
      <BreakdownsSection
        title="BREAKDOWNS"
        ageGroup={mockData.breakdowns.ageGroup}
        maritalStatus={mockData.breakdowns.maritalStatus}
        groupTypes={mockData.breakdowns.groupTypes}
      />
    </div>
  )
}
