import { SectionTitle } from "../SectionTitle"
import { StatCard } from "../StatCard"

interface OverviewStat {
  icon: React.ElementType
  label: string
  value: string | number
  sublabel?: string
}

export function DonorBreakdownSection({ title, stats }: { title: string; stats: OverviewStat[] }) {
  return (
    <section>
      <SectionTitle title={title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </section>
  )
}
