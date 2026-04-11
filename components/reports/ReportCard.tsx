import { Card } from "@/components/ui/card"

export function ReportCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card className={`bg-white rounded-xl border border-gray-100 p-5 ${className || ""}`}>
      {children}
    </Card>
  )
}
