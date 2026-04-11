"use client";

import { Icon } from "@phosphor-icons/react";

interface DevotionStatsCardProps {
  icon: Icon;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function DevotionStatsCard({
  icon: IconComponent,
  label,
  value,
  trend,
}: DevotionStatsCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
          <IconComponent className="w-5 h-5 text-primary" />
        </div>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
