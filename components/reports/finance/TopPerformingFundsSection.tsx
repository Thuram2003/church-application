"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SectionTitle } from "../SectionTitle"
import { ReportCard } from "../ReportCard"

interface Fund {
  fundName: string
  donations: number
  totalAmount: number
  avgAmount: number
}

export function TopPerformingFundsSection({
  title,
  funds,
}: {
  title: string
  funds: Fund[]
}) {
  return (
    <section>
      <SectionTitle title={title} />
      <ReportCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase">Fund Name</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase">Donations</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase">Total Amount</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase">Avg Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {funds.map((fund, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{fund.fundName}</TableCell>
                <TableCell>{fund.donations}</TableCell>
                <TableCell>{fund.totalAmount.toLocaleString()} XAF</TableCell>
                <TableCell>{fund.avgAmount.toLocaleString()} XAF</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ReportCard>
    </section>
  )
}
