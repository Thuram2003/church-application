"use client"

import { ChartBar, TrendUp } from "@phosphor-icons/react"
import { SectionTitle } from "../SectionTitle"
import { ReportCard } from "../ReportCard"
import { StatItem } from "../StatItem"

export function StatisticsSection({
  title,
  giftStats,
  fundPerformance,
}: {
  title: string
  giftStats: any
  fundPerformance: any
}) {
  return (
    <section>
      <SectionTitle title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gift Statistics */}
        <ReportCard>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-sm bg-primary-lighter flex items-center justify-center">
              <ChartBar className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900">Gift Statistics</h3>
          </div>
          <StatItem label="Average Gift Size" value={`${giftStats.averageGiftSize.toLocaleString()} XAF`} />
          <StatItem label="Median Gift" value={`${giftStats.medianGift.toLocaleString()} XAF`} />
          <StatItem label="Gifts per Donor" value={giftStats.giftsPerDonor} />
          <StatItem label="Range" value={`${giftStats.range} XAF`} />
        </ReportCard>

        {/* Fund Performance */}
        <ReportCard>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-sm bg-primary-lighter flex items-center justify-center">
              <TrendUp className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900">Fund Performance</h3>
          </div>
          <StatItem label="Active Funds" value={fundPerformance.activeFunds} />
          <StatItem label="Avg per Fund" value={`${fundPerformance.avgPerFund.toLocaleString()} XAF`} />
          <StatItem label="Donations per Fund" value={fundPerformance.donationsPerFund} />
        </ReportCard>
      </div>
    </section>
  )
}
