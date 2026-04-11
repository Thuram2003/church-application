"use client"

import { ProgressCard } from "@/components/ui/progress-card"
import { SectionTitle } from "../SectionTitle"

export function BreakdownsSection({
  title,
  ageGroup,
  maritalStatus,
  groupTypes,
}: {
  title: string
  ageGroup: { label: string; value: number }[]
  maritalStatus: { label: string; value: number }[]
  groupTypes: { label: string; value: number }[]
}) {
  return (
    <section>
      <SectionTitle title={title} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProgressCard title="Age Group" items={ageGroup} />
        <ProgressCard title="Marital Status" items={maritalStatus} />
        <ProgressCard title="Group Types" items={groupTypes} />
      </div>
    </section>
  )
}
