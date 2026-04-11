import * as React from "react"
import { Card } from "@/components/ui/card"

interface ProgressItem {
  label: string
  value: number
}

interface ProgressCardProps {
  title: string
  items: ProgressItem[]
  accentColor?: string
  bgColor?: string
}

export function ProgressCard({ 
  title, 
  items,
  accentColor = "var(--primary)",
  bgColor = "var(--primary-lighter)"
}: ProgressCardProps) {
  const total = items.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <Card className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="font-semibold text-gray-900 mb-5">{title}</h3>
      <div className="space-y-4">
        {items.map((item, i) => {
          const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0
          return (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{percentage}%</span>
                  <span 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-primary"
                    style={{ backgroundColor: bgColor }}
                  >
                    {item.value}
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: accentColor
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
