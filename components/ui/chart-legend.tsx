import * as React from "react"

interface ChartLegendItem {
  name: string
  color: string
  value?: number
}

interface ChartLegendProps {
  items: ChartLegendItem[]
  showValues?: boolean
}

export function ChartLegend({ items, showValues = false }: ChartLegendProps) {
  return (
    <div className="flex items-center gap-6">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{item.name}</span>
            {showValues && item.value !== undefined && (
              <span className="text-xs text-gray-500">({item.value})</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
