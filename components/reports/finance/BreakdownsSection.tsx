"use client"

import { SectionTitle } from "../SectionTitle"
import { ReportCard } from "../ReportCard"

export function BreakdownsSection({
  title,
  paymentMethods,
  givingFrequency,
  recentMonthlyTotals,
}: {
  title: string
  paymentMethods: { label: string; value: number }[]
  givingFrequency: { label: string; value: number }[]
  recentMonthlyTotals: { label: string; value: number }[]
}) {
  return (
    <section>
      <SectionTitle title={title} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Payment Methods */}
        <ReportCard>
          <h3 className="font-semibold text-gray-900 mb-5">Payment Methods</h3>
          <div className="space-y-4">
            {paymentMethods.map((item, i) => {
              const total = paymentMethods.reduce((sum, method) => sum + method.value, 0)
              const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0
              return (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{percentage}%</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.value}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all bg-primary"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </ReportCard>

        {/* Giving Frequency */}
        <ReportCard>
          <h3 className="font-semibold text-gray-900 mb-5">Giving Frequency</h3>
          <div className="space-y-4">
            {givingFrequency.map((item, i) => {
              const total = givingFrequency.reduce((sum, freq) => sum + freq.value, 0)
              const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0
              return (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{percentage}%</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.value.toLocaleString()} XAF
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all bg-primary"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </ReportCard>

        {/* Recent Monthly Totals */}
        <ReportCard>
          <h3 className="font-semibold text-gray-900 mb-5">Recent Monthly Totals</h3>
          <div className="space-y-4">
            {recentMonthlyTotals.map((item, i) => {
              const total = recentMonthlyTotals.reduce((sum, month) => sum + month.value, 0)
              const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0
              return (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{percentage}%</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.value.toLocaleString()} XAF
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all bg-primary"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </ReportCard>
      </div>
    </section>
  )
}
