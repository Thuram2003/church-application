import { ReportCard } from "./ReportCard"

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string | number
  sublabel?: string
}

export function StatCard({ icon: Icon, label, value, sublabel }: StatCardProps) {
  return (
    <ReportCard className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-sm bg-primary-lighter flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
        {sublabel && <p className="text-xs text-gray-400">{sublabel}</p>}
      </div>
    </ReportCard>
  )
}
