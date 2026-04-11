"use client"

import { BarChart } from "@/components/ui/bar-chart"
import { SectionTitle } from "../SectionTitle"
import { getChartColors } from "@/lib/chart-colors"

export function GivingTrendsSection({
  title,
  data,
}: {
  title: string
  data: any[]
}) {
  const colors = getChartColors()
  
  const datasets = [
    { dataKey: "donationCount", name: "Donation Count", color: colors.chart1 },
    { dataKey: "amount", name: "Amount", color: colors.chart2 },
  ]

  return (
    <section>
      <SectionTitle title={title} />
      <BarChart 
        data={data}
        datasets={datasets}
        title="Giving Trends"
        xAxisKey="month"
        height={320}
      />
    </section>
  )
}
