"use client"

import {
  CurrencyDollar,
  Users,
  Wallet,
  TrendUp,
  ChartBar,
} from "@phosphor-icons/react"
import { OverviewSection } from "@/components/reports/finance/OverviewSection"
import { DonorBreakdownSection } from "@/components/reports/finance/DonorBreakdownSection"
import { StatisticsSection } from "@/components/reports/finance/StatisticsSection"
import { DistributionSection } from "@/components/reports/finance/DistributionSection"
import { GivingTrendsSection } from "@/components/reports/finance/GivingTrendsSection"
import { TopPerformingFundsSection } from "@/components/reports/finance/TopPerformingFundsSection"
import { BreakdownsSection } from "@/components/reports/finance/BreakdownsSection"
import { getChartColors } from "@/lib/chart-colors"

const mockData = {
  overview: {
    totalDonations: 342,
    totalDonors: 156,
    totalAmount: 45750000,
    avgDonation: 133772,
  },
  donorBreakdown: {
    recurringDonors: 89,
    oneTimeDonors: 67,
    avgPerDonor: 293269,
    donationRange: { min: 5000, max: 2500000 },
  },
  statistics: {
    giftStats: {
      averageGiftSize: 133772,
      medianGift: 75000,
      giftsPerDonor: 2.2,
      range: "5,000 - 2,500,000",
    },
    fundPerformance: {
      activeFunds: 8,
      avgPerFund: 5718750,
      donationsPerFund: 43,
    },
  },
  givingTrends: [
    { month: "Jan", donationCount: 48, amount: 6200000 },
    { month: "Feb", donationCount: 52, amount: 7100000 },
    { month: "Mar", donationCount: 61, amount: 8500000 },
    { month: "Apr", donationCount: 58, amount: 7800000 },
    { month: "May", donationCount: 64, amount: 8900000 },
    { month: "Jun", donationCount: 59, amount: 7250000 },
  ],
  topPerformingFunds: [
    { fundName: "General Fund", donations: 142, totalAmount: 18500000, avgAmount: 130282 },
    { fundName: "Building Fund", donations: 78, totalAmount: 12300000, avgAmount: 157692 },
    { fundName: "Mission Fund", donations: 64, totalAmount: 8200000, avgAmount: 128125 },
    { fundName: "Youth Ministry", donations: 38, totalAmount: 4150000, avgAmount: 109211 },
    { fundName: "Benevolence", donations: 20, totalAmount: 2600000, avgAmount: 130000 },
  ],
  breakdowns: {
    paymentMethods: [
      { label: "Online", value: 198 },
      { label: "Cash", value: 89 },
      { label: "Check", value: 42 },
      { label: "Bank Transfer", value: 13 },
    ],
    givingFrequency: [
      { label: "Weekly", value: 12800000 },
      { label: "Monthly", value: 24600000 },
      { label: "Quarterly", value: 5850000 },
      { label: "One-time", value: 2500000 },
    ],
    recentMonthlyTotals: [
      { label: "Feb 2026", value: 7100000 },
      { label: "Mar 2026", value: 8500000 },
      { label: "Apr 2026", value: 7800000 },
      { label: "May 2026", value: 8900000 },
      { label: "Jun 2026", value: 7250000 },
    ],
  },
}

export default function FinanceReportsPage() {
  const colors = getChartColors()
  
  const distribution = {
    givingByFund: [
      { name: "General Fund", value: 18500000, color: colors.chart1 },
      { name: "Building Fund", value: 12300000, color: colors.chart2 },
      { name: "Mission Fund", value: 8200000, color: colors.chart3 },
      { name: "Youth Ministry", value: 4150000, color: colors.chart4 },
      { name: "Others", value: 2600000, color: colors.chart5 },
    ],
    donationTypes: [
      { name: "Online", value: 198, color: colors.chart1 },
      { name: "Cash", value: 89, color: colors.chart2 },
      { name: "Check", value: 42, color: colors.chart3 },
      { name: "Bank Transfer", value: 13, color: colors.chart4 },
    ],
  }

  return (
    <div className="p-6 space-y-8 bg-page-bg min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 text-primary">
        <CurrencyDollar className="w-5 h-5" />
        <h1 className="text-lg font-semibold">Finances</h1>
      </div>

      {/* Overview Section */}
      <OverviewSection
        title="OVERVIEW"
        stats={[
          { icon: ChartBar, label: "TOTAL DONATIONS", value: mockData.overview.totalDonations },
          { icon: Users, label: "TOTAL DONORS", value: mockData.overview.totalDonors },
          { icon: Wallet, label: "TOTAL AMOUNT", value: `${mockData.overview.totalAmount.toLocaleString()} XAF` },
          { icon: TrendUp, label: "AVG DONATION", value: `${mockData.overview.avgDonation.toLocaleString()} XAF` },
        ]}
      />

      {/* Donor Breakdown */}
      <DonorBreakdownSection
        title="DONOR BREAKDOWN"
        stats={[
          { icon: Users, label: "RECURRING DONORS", value: mockData.donorBreakdown.recurringDonors },
          { icon: Users, label: "ONE-TIME DONORS", value: mockData.donorBreakdown.oneTimeDonors },
          { icon: Wallet, label: "AVG PER DONOR", value: `${mockData.donorBreakdown.avgPerDonor.toLocaleString()} XAF` },
          {
            icon: TrendUp,
            label: "DONATION RANGE",
            value: `${mockData.donorBreakdown.donationRange.min.toLocaleString()} - ${mockData.donorBreakdown.donationRange.max.toLocaleString()} XAF`,
            sublabel: "Min - Max",
          },
        ]}
      />

      {/* Statistics */}
      <StatisticsSection
        title="STATISTICS"
        giftStats={mockData.statistics.giftStats}
        fundPerformance={mockData.statistics.fundPerformance}
      />

      {/* Distribution */}
      <DistributionSection
        title="DISTRIBUTION"
        givingByFundData={distribution.givingByFund}
        donationTypesData={distribution.donationTypes}
      />

      {/* Giving Trends */}
      <GivingTrendsSection
        title="GIVING TRENDS"
        data={mockData.givingTrends}
      />

      {/* Top Performing Funds */}
      <TopPerformingFundsSection
        title="TOP PERFORMING FUNDS"
        funds={mockData.topPerformingFunds}
      />

      {/* Breakdowns */}
      <BreakdownsSection
        title="BREAKDOWNS"
        paymentMethods={mockData.breakdowns.paymentMethods}
        givingFrequency={mockData.breakdowns.givingFrequency}
        recentMonthlyTotals={mockData.breakdowns.recentMonthlyTotals}
      />
    </div>
  )
}
