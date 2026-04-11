"use client"

import { Users, CurrencyDollar, CalendarBlank, ChartBar } from "@phosphor-icons/react"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const reportCategories = [
  {
    icon: Users,
    title: "People",
    description: "View statistics about members, groups, and families",
    href: "/reports/people",
    color: "var(--primary)",
    bgColor: "var(--primary-lighter)",
  },
  {
    icon: CurrencyDollar,
    title: "Giving",
    description: "Analyze donations, pledges, and financial trends",
    href: "/reports/giving",
    color: "var(--success)",
    bgColor: "var(--success-light)",
  },
  {
    icon: CalendarBlank,
    title: "Events",
    description: "Track attendance and event participation",
    href: "/reports/events",
    color: "var(--warning)",
    bgColor: "var(--warning-light)",
  },
  {
    icon: ChartBar,
    title: "Custom",
    description: "Create and view custom reports",
    href: "/reports/custom",
    color: "var(--primary)",
    bgColor: "var(--primary-lighter)",
  },
]

export default function ReportsPage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-6 bg-page-bg min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-1">
          View insights and analytics across your organization
        </p>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportCategories.map((category) => (
          <Card
            key={category.title}
            className="p-6 cursor-pointer hover:shadow-lg transition-all border-gray-100 bg-white"
            onClick={() => router.push(category.href)}
          >
            <div
              className="w-12 h-12 rounded-sm flex items-center justify-center mb-4"
              style={{ backgroundColor: category.bgColor }}
            >
              <category.icon className="w-6 h-6" style={{ color: category.color }} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
            <p className="text-sm text-gray-500">{category.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
