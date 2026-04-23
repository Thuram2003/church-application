"use client";

import { CurrencyDollar, TrendUp, Calendar } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { StatCardsSkeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/EmptyState";

interface PersonGivingTabProps {
  personId: string;
}

// Mock data - replace with actual API call
const mockGivingStats = {
  totalGiving: 5420.0,
  thisYear: 2840.0,
  lastGift: 150.0,
  lastGiftDate: "2026-04-15",
};

const mockGivingHistory = [
  {
    id: "1",
    date: "2026-04-15",
    amount: 150.0,
    type: "Tithe",
    method: "Bank Transfer",
  },
  {
    id: "2",
    date: "2026-04-08",
    amount: 200.0,
    type: "Offering",
    method: "Cash",
  },
  {
    id: "3",
    date: "2026-04-01",
    amount: 150.0,
    type: "Tithe",
    method: "Bank Transfer",
  },
  {
    id: "4",
    date: "2026-03-25",
    amount: 100.0,
    type: "Special Offering",
    method: "Mobile Money",
  },
];

export function PersonGivingTab({ personId }: PersonGivingTabProps) {
  const isLoading = false; // Replace with actual loading state
  const stats = mockGivingStats; // Replace with actual data
  const history = mockGivingHistory; // Replace with actual data

  if (isLoading) {
    return (
      <div className="space-y-6 py-6">
        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <CurrencyDollar className="w-5 h-5 text-primary" />
            <h2 className="text-base font-semibold text-gray-900">Giving</h2>
          </div>
        </div>
        <StatCardsSkeleton count={3} />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <CurrencyDollar className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-gray-900">Giving</h2>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Giving */}
        <div className="border border-gray-100 rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Total giving</span>
            <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center">
              <CurrencyDollar className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${stats.totalGiving.toLocaleString()}
          </p>
        </div>

        {/* This Year */}
        <div className="border border-gray-100 rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">This year</span>
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
              <TrendUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${stats.thisYear.toLocaleString()}
          </p>
        </div>

        {/* Last Gift */}
        <div className="border border-gray-100 rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Last gift</span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${stats.lastGift.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(stats.lastGiftDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Giving History */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900">Giving history</h3>

        {history.length === 0 ? (
          <EmptyState
            icon={<CurrencyDollar className="w-12 h-12" />}
            title="No giving history"
            description="This person has not made any contributions yet"
          />
        ) : (
          <div className="border border-gray-100 rounded-lg overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-primary-light text-primary border-primary-lighter"
                      >
                        {record.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {record.method}
                    </TableCell>
                    <TableCell className="text-right text-sm font-semibold text-gray-900">
                      ${record.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
