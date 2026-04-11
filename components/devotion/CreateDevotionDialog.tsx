"use client";

import { useState } from "react";
import { Plus, Trash, Clock } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DevotionStatus, PrayerPoint, RecurrenceType } from "@/types/devotion";

interface CreateDevotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (devotion: any) => void;
  series?: Array<{ id: string; name: string }>;
}

const DAYS_OF_WEEK = [
  { value: 0, label: "Sun" },
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
];

export function CreateDevotionDialog({
  open,
  onOpenChange,
  onSubmit,
  series = [],
}: CreateDevotionDialogProps) {
  const [title, setTitle] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [scriptureReference, setScriptureReference] = useState("");
  const [scriptureText, setScriptureText] = useState("");
  const [reflection, setReflection] = useState("");
  const [prayerPoints, setPrayerPoints] = useState<PrayerPoint[]>([
    { id: "1", text: "" },
  ]);
  const [declaration, setDeclaration] = useState("");
  const [memoryVerse, setMemoryVerse] = useState("");
  const [seriesId, setSeriesId] = useState<string>("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<DevotionStatus>("draft");
  
  // Scheduling states
  const [enableScheduling, setEnableScheduling] = useState(false);
  const [recurrenceType, setRecurrenceType] = useState<RecurrenceType>("once");
  const [publishTime, setPublishTime] = useState("07:00");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [endDate, setEndDate] = useState("");

  const handleAddPrayerPoint = () => {
    setPrayerPoints([
      ...prayerPoints,
      { id: Date.now().toString(), text: "" },
    ]);
  };

  const handleRemovePrayerPoint = (id: string) => {
    if (prayerPoints.length > 1) {
      setPrayerPoints(prayerPoints.filter((p) => p.id !== id));
    }
  };

  const handlePrayerPointChange = (id: string, text: string) => {
    setPrayerPoints(
      prayerPoints.map((p) => (p.id === id ? { ...p, text } : p))
    );
  };

  const handleDayToggle = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const devotionData: any = {
      title,
      publishDate: new Date(publishDate),
      scriptureReference,
      scriptureText,
      reflection,
      prayerPoints: prayerPoints.filter((p) => p.text.trim()),
      declaration,
      memoryVerse,
      seriesId: seriesId || undefined,
      author,
      status,
    };

    // Add recurrence if scheduling is enabled
    if (enableScheduling && status === "scheduled") {
      devotionData.recurrence = {
        type: recurrenceType,
        time: publishTime,
        startDate: new Date(publishDate),
        ...(recurrenceType === "weekly" || recurrenceType === "custom"
          ? { daysOfWeek: selectedDays }
          : {}),
        ...(endDate ? { endDate: new Date(endDate) } : {}),
      };
    }

    onSubmit(devotionData);
    handleReset();
  };

  const handleReset = () => {
    setTitle("");
    setPublishDate("");
    setScriptureReference("");
    setScriptureText("");
    setReflection("");
    setPrayerPoints([{ id: "1", text: "" }]);
    setDeclaration("");
    setMemoryVerse("");
    setSeriesId("");
    setAuthor("");
    setStatus("draft");
    setEnableScheduling(false);
    setRecurrenceType("once");
    setPublishTime("07:00");
    setSelectedDays([]);
    setEndDate("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle>Create Devotion</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter devotion title"
                  required
                />
              </div>

              {/* Publish Date */}
              <div className="space-y-2">
                <Label htmlFor="publishDate">Publish Date</Label>
                <Input
                  id="publishDate"
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  required
                />
              </div>

              {/* Scripture Reference */}
              <div className="space-y-2">
                <Label htmlFor="scriptureReference">Scripture Reference</Label>
                <Input
                  id="scriptureReference"
                  value={scriptureReference}
                  onChange={(e) => setScriptureReference(e.target.value)}
                  placeholder="e.g., John 3:16"
                  required
                />
              </div>

              {/* Scripture Text */}
              <div className="space-y-2">
                <Label htmlFor="scriptureText">Scripture Text</Label>
                <Textarea
                  id="scriptureText"
                  value={scriptureText}
                  onChange={(e) => setScriptureText(e.target.value)}
                  placeholder="Enter the full scripture text"
                  rows={3}
                  required
                />
              </div>

              {/* Reflection */}
              <div className="space-y-2">
                <Label htmlFor="reflection">Reflection / Message</Label>
                <Textarea
                  id="reflection"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Write your reflection or message"
                  rows={6}
                  required
                />
              </div>

              {/* Prayer Points */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Prayer Points</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleAddPrayerPoint}
                    className="gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add point
                  </Button>
                </div>
                <div className="space-y-2">
                  {prayerPoints.map((point, index) => (
                    <div key={point.id} className="flex items-start gap-2">
                      <div className="flex-1">
                        <Input
                          value={point.text}
                          onChange={(e) =>
                            handlePrayerPointChange(point.id, e.target.value)
                          }
                          placeholder={`Prayer point ${index + 1}`}
                        />
                      </div>
                      {prayerPoints.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemovePrayerPoint(point.id)}
                          className="flex-shrink-0"
                        >
                          <Trash className="w-4 h-4 text-gray-400" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Declaration */}
              <div className="space-y-2">
                <Label htmlFor="declaration">Declaration (Optional)</Label>
                <Textarea
                  id="declaration"
                  value={declaration}
                  onChange={(e) => setDeclaration(e.target.value)}
                  placeholder="Enter a declaration"
                  rows={2}
                />
              </div>

              {/* Memory Verse */}
              <div className="space-y-2">
                <Label htmlFor="memoryVerse">Memory Verse</Label>
                <Input
                  id="memoryVerse"
                  value={memoryVerse}
                  onChange={(e) => setMemoryVerse(e.target.value)}
                  placeholder="e.g., Philippians 4:13"
                  required
                />
              </div>

              {/* Series */}
              <div className="space-y-2">
                <Label htmlFor="series">Series (Optional)</Label>
                <Select value={seriesId} onValueChange={setSeriesId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a series" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No series</SelectItem>
                    {series.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                  required
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as DevotionStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Schedule</SelectItem>
                    <SelectItem value="published">Publish Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Scheduling Section */}
              {status === "scheduled" && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <Label className="text-sm font-medium text-blue-900">
                        Schedule Settings
                      </Label>
                    </div>
                    <Switch
                      checked={enableScheduling}
                      onCheckedChange={setEnableScheduling}
                    />
                  </div>

                  {enableScheduling && (
                    <div className="space-y-4">
                      {/* Publish Time */}
                      <div className="space-y-2">
                        <Label htmlFor="publishTime" className="text-sm">
                          Publish Time
                        </Label>
                        <Input
                          id="publishTime"
                          type="time"
                          value={publishTime}
                          onChange={(e) => setPublishTime(e.target.value)}
                          required
                        />
                      </div>

                      {/* Recurrence Type */}
                      <div className="space-y-2">
                        <Label htmlFor="recurrence" className="text-sm">
                          Recurrence
                        </Label>
                        <Select
                          value={recurrenceType}
                          onValueChange={(value) =>
                            setRecurrenceType(value as RecurrenceType)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="once">One-time</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="custom">Custom Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Days of Week Selection */}
                      {(recurrenceType === "weekly" ||
                        recurrenceType === "custom") && (
                        <div className="space-y-2">
                          <Label className="text-sm">Select Days</Label>
                          <div className="flex gap-2">
                            {DAYS_OF_WEEK.map((day) => (
                              <button
                                key={day.value}
                                type="button"
                                onClick={() => handleDayToggle(day.value)}
                                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                                  selectedDays.includes(day.value)
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-600 border border-gray-300 hover:border-blue-400"
                                }`}
                              >
                                {day.label}
                              </button>
                            ))}
                          </div>
                          {selectedDays.length === 0 && (
                            <p className="text-xs text-red-500">
                              Please select at least one day
                            </p>
                          )}
                        </div>
                      )}

                      {/* End Date (Optional) */}
                      {recurrenceType !== "once" && (
                        <div className="space-y-2">
                          <Label htmlFor="endDate" className="text-sm">
                            End Date (Optional)
                          </Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={publishDate}
                          />
                          <p className="text-xs text-gray-600">
                            Leave empty for no end date
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0 bg-white border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Devotion</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
