"use client"

import * as React from "react"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"
import { ChartLegend } from "@/components/ui/chart-legend"

interface BarChartDataset {
  dataKey: string
  name: string
  color: string
}

interface BarChartProps {
  data: any[]
  datasets: BarChartDataset[]
  title: string
  xAxisKey: string
  height?: number
  showGrid?: boolean
}

export function BarChart({ 
  data, 
  datasets, 
  title, 
  xAxisKey,
  height = 320,
  showGrid = true 
}: BarChartProps) {
  const legendItems = datasets.map(dataset => ({
    name: dataset.name,
    color: dataset.color
  }))

  return (
    <Card className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <ChartLegend items={legendItems} />
      </div>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart 
            data={data} 
            barGap={6} 
            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
          >
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#f3f4f6" 
              />
            )}
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dx={-5}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.02)" }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                padding: "8px 12px",
              }}
              labelStyle={{ 
                fontWeight: 600, 
                marginBottom: "4px",
                fontSize: "13px"
              }}
              itemStyle={{
                fontSize: "12px",
                padding: "2px 0"
              }}
            />
            {datasets.map((dataset, index) => (
              <Bar
                key={index}
                dataKey={dataset.dataKey}
                name={dataset.name}
                fill={dataset.color}
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
