"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"
import { ChartLegend } from "@/components/ui/chart-legend"

interface DonutChartData {
  name: string
  value: number
  color: string
}

interface DonutChartProps {
  data: DonutChartData[]
  title: string
  showLegendValues?: boolean
  valueLabel?: string
  formatValue?: (value: number) => string
  showTotal?: boolean
}

export function DonutChart({ 
  data, 
  title, 
  showLegendValues = true,
  valueLabel = "people",
  formatValue,
  showTotal = true
}: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  const legendItems = data.map(item => ({
    name: item.name,
    color: item.color,
    value: showLegendValues ? item.value : undefined
  }))

  return (
    <Card className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="font-semibold text-gray-900 mb-6">{title}</h3>
      <div className="flex items-center justify-center gap-8">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {showTotal && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {formatValue ? formatValue(total) : total.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {formatValue ? formatValue(item.value) : item.value.toLocaleString()} {valueLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
