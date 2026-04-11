"use client"

import { DonutChart } from "@/components/ui/donut-chart"
import { SectionTitle } from "../SectionTitle"

export function DistributionSection({
  title,
  genderData,
  groupParticipationData,
}: {
  title: string
  genderData: any[]
  groupParticipationData: any[]
}) {
  return (
    <section>
      <SectionTitle title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DonutChart data={genderData} title="Gender Distribution" showTotal={false} />
        <DonutChart data={groupParticipationData} title="Group Participation" showTotal={false} />
      </div>
    </section>
  )
}
