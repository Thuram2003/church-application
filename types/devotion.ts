export type DevotionStatus = "draft" | "scheduled" | "published";

export type RecurrenceType = "once" | "daily" | "weekly" | "custom";

export interface RecurrenceSchedule {
  type: RecurrenceType;
  time: string; // HH:mm format (e.g., "07:00", "19:00")
  daysOfWeek?: number[]; // 0-6 (Sunday-Saturday) for weekly/custom
  startDate: Date;
  endDate?: Date;
}

export interface PrayerPoint {
  id: string;
  text: string;
}

export interface Devotion {
  id: string;
  title: string;
  publishDate: Date;
  recurrence?: RecurrenceSchedule;
  scriptureReference: string;
  scriptureText: string;
  reflection: string;
  prayerPoints: PrayerPoint[];
  declaration?: string;
  memoryVerse: string;
  seriesId?: string;
  author: string;
  status: DevotionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface DevotionSeries {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  devotionCount: number;
  createdAt: Date;
}

export interface MemberSubmission {
  id: string;
  devotion: Omit<Devotion, "id" | "status" | "createdAt" | "updatedAt">;
  submittedBy: string;
  submittedAt: Date;
  status: "pending" | "approved" | "rejected";
  reviewNote?: string;
}
