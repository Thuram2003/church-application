"use client"

import { Calendar, UsersThree, House } from "@phosphor-icons/react"
import { SectionTitle } from "../SectionTitle"
import { ReportCard } from "../ReportCard"
import { StatItem } from "../StatItem"

export function StatisticsSection({
  title,
  ageStats,
  groupStats,
  familyStats,
}: {
  title: string
  ageStats: any
  groupStats: any
  familyStats: any
}) {
  return (
    <section>
      <SectionTitle title={title} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Age Statistics */}
        <ReportCard>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-sm bg-primary-lighter flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900">Age Statistics</h3>
          </div>
          <StatItem label="Average Age" value={ageStats.average || "-"} />
          <StatItem label="Youngest" value={ageStats.youngest || "-"} />
          <StatItem label="Oldest" value={ageStats.oldest || "-"} />
          <div className="pt-3 mt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">People with age data</span>
              <span className="text-xs font-medium text-gray-600">{ageStats.withAgeData}</span>
            </div>
          </div>
        </ReportCard>

        {/* Group Statistics */}
        <ReportCard>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-sm bg-primary-lighter flex items-center justify-center">
              <UsersThree className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900">Group Statistics</h3>
          </div>
          <StatItem label="Average Size" value={groupStats.averageSize} />
          <StatItem label="Smallest" value={groupStats.smallest} />
          <StatItem label="Largest" value={groupStats.largest} />
        </ReportCard>

        {/* Family Statistics */}
        <ReportCard>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-sm bg-primary-lighter flex items-center justify-center">
              <House className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900">Family Statistics</h3>
          </div>
          <StatItem label="Average Size" value={familyStats.averageSize} />
          <StatItem label="Smallest" value={familyStats.smallest} />
          <StatItem label="Largest" value={familyStats.largest} />
        </ReportCard>
      </div>
    </section>
  )
}
