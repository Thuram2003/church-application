"use client"

import { BarChart } from "@/components/ui/bar-chart"
import { SectionTitle } from "../SectionTitle"
import { getChartColors } from "@/lib/chart-colors"

export function GrowthChartSection({
  title,
  subtitle,
  data,
}: {
  title: string
  subtitle: string
  data: any[]
}) {
  const colors = getChartColors()
  
  const datasets = [
    { dataKey: "newMembers", name: "New Members", color: colors.chart1 },
    { dataKey: "newGroups", name: "New Groups", color: colors.chart2 },
    { dataKey: "newFamilies", name: "New Families", color: colors.chart3 },
  ]

  return (
    <section>
      <SectionTitle title={title} />
      <BarChart 
        data={data}
        datasets={datasets}
        title={subtitle}
        xAxisKey="month"
        height={320}
      />
    </section>
  )
}
