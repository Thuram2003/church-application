"use client";

import * as React from "react";
import { Clock, PushPin } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/RichTextEditor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PostAnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    title: string;
    content: string;
    isPinned: boolean;
    scheduleForLater: boolean;
    scheduledDate?: string;
    scheduledTime?: string;
  }) => void;
}

export function PostAnnouncementDialog({
  open,
  onOpenChange,
  onSubmit,
}: PostAnnouncementDialogProps) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isPinned, setIsPinned] = React.useState(false);
  const [scheduleForLater, setScheduleForLater] = React.useState(false);
  const [scheduledDate, setScheduledDate] = React.useState("");
  const [scheduledTime, setScheduledTime] = React.useState("");
  const [errors, setErrors] = React.useState<{ title?: boolean; content?: boolean }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      title: !title.trim(),
      content: !content.trim() || content === "<p></p>",
    };

    if (newErrors.title || newErrors.content) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title,
      content,
      isPinned,
      scheduleForLater,
      ...(scheduleForLater && {
        scheduledDate,
        scheduledTime,
      }),
    });

    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setIsPinned(false);
    setScheduleForLater(false);
    setScheduledDate("");
    setScheduledTime("");
    setErrors({});
  };

  React.useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] h-auto flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Post an announcement
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title of your announcement <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder=""
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: false });
              }}
              className={`h-11 ${errors.title ? "border-red-400 focus-visible:ring-red-200" : ""}`}
            />
          </div>

          {/* Pin Toggle */}
          <div className="flex items-center gap-3">
            <Switch
              id="pin-toggle"
              checked={isPinned}
              onCheckedChange={setIsPinned}
            />
            <PushPin 
              weight={isPinned ? "fill" : "regular"} 
              className={`w-4 h-4 ${isPinned ? "text-primary" : "text-gray-400"}`}
            />
            <Label 
              htmlFor="pin-toggle" 
              className="text-sm text-gray-700 cursor-pointer font-normal"
            >
              {isPinned ? "Pinned" : "Not pinned"}
            </Label>
          </div>

          {/* Content with Rich Text Editor */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Announcement content <span className="text-red-500">*</span>
            </Label>
            <RichTextEditor
              content={content}
              onChange={(newContent) => {
                setContent(newContent);
                if (errors.content) setErrors({ ...errors, content: false });
              }}
              error={errors.content}
            />
            {errors.content && (
              <p className="text-xs text-red-500">Content is required</p>
            )}
          </div>

          {/* Schedule Toggle */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch
                id="schedule-toggle"
                checked={scheduleForLater}
                onCheckedChange={setScheduleForLater}
              />
              <Clock className="w-4 h-4 text-gray-400" />
              <Label 
                htmlFor="schedule-toggle" 
                className="text-sm text-gray-700 cursor-pointer font-normal"
              >
                Schedule for later
              </Label>
            </div>

            {/* Conditional: Date & Time Inputs */}
            {scheduleForLater && (
              <div className="grid grid-cols-2 gap-3 pl-0">
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-600">Date</Label>
                  <Input
                    type="date"
                    className="h-10"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    required={scheduleForLater}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-600">Time</Label>
                  <Input
                    type="time"
                    className="h-10"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    required={scheduleForLater}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0 bg-white border-t border-gray-200">
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit">
          {scheduleForLater ? "Schedule" : "Post now"}
        </Button>
      </div>
    </form>
      </DialogContent>
    </Dialog>
  );
}
