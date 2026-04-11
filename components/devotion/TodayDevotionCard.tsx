"use client";

import { SunHorizon, Calendar } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Devotion } from "@/types/devotion";

interface TodayDevotionCardProps {
  devotion: Devotion | null;
}

export function TodayDevotionCard({ devotion }: TodayDevotionCardProps) {
  if (!devotion) {
    return (
      <div className="bg-white border border-gray-100 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <SunHorizon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No devotion for today
        </h3>
        <p className="text-sm text-gray-600">
          Schedule a devotion to display here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg p-8 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5" />
        <span className="text-sm font-medium opacity-90">
          {new Date(devotion.publishDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <h2 className="text-2xl font-bold mb-3">{devotion.title}</h2>

      <div className="bg-white/10 backdrop-blur-sm rounded-md p-4 mb-4">
        <p className="text-sm font-semibold mb-1 opacity-90">
          {devotion.scriptureReference}
        </p>
        <p className="text-sm leading-relaxed opacity-95">
          {devotion.scriptureText}
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-sm leading-relaxed opacity-95 line-clamp-4">
          {devotion.reflection}
        </p>
      </div>

      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/20">
        <Badge className="bg-white/20 text-white border-white/30">
          {devotion.author}
        </Badge>
        {devotion.seriesId && (
          <Badge className="bg-white/20 text-white border-white/30">
            Series
          </Badge>
        )}
      </div>
    </div>
  );
}
