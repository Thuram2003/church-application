"use client"

import { DonutChart } from "@/components/ui/donut-chart"
import { SectionTitle } from "../SectionTitle"

export function DistributionSection({
  title,
  givingByFundData,
  donationTypesData,
}: {
  title: string
  givingByFundData: any[]
  donationTypesData: any[]
}) {
  return (
    <section>
      <SectionTitle title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DonutChart 
          data={givingByFundData} 
          title="Giving by Fund"
          valueLabel=""
          formatValue={(value) => `${value.toLocaleString()} XAF`}
          showTotal={false}
        />
        <DonutChart 
          data={donationTypesData} 
          title="Donation Types"
          valueLabel="people"
          showTotal={false}
        />
      </div>
    </section>
  )
}
