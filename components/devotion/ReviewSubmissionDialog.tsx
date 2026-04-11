"use client";

import { useState } from "react";
import { Calendar } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MemberSubmission } from "@/types/devotion";

interface ReviewSubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission: MemberSubmission | null;
  onApprove: (id: string) => void;
  onReject: (id: string, note: string) => void;
}

export function ReviewSubmissionDialog({
  open,
  onOpenChange,
  submission,
  onApprove,
  onReject,
}: ReviewSubmissionDialogProps) {
  const [reviewNote, setReviewNote] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!submission) return null;

  const handleApprove = () => {
    onApprove(submission.id);
    onOpenChange(false);
  };

  const handleReject = () => {
    if (reviewNote.trim()) {
      onReject(submission.id, reviewNote);
      setReviewNote("");
      setShowRejectForm(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b-0">
          <DialogTitle>Review Submission</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            {/* Submission Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <span>Submitted by {submission.submittedBy}</span>
                <span>•</span>
                <span>{submission.submittedAt.toLocaleDateString()}</span>
              </div>
              <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                Pending Review
              </Badge>
            </div>

            {/* Devotion Content */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {submission.devotion.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(
                      submission.devotion.publishDate
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="bg-primary-light/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-primary mb-1">
                  {submission.devotion.scriptureReference}
                </p>
                <p className="text-sm text-gray-700">
                  {submission.devotion.scriptureText}
                </p>
              </div>

              <div>
                <Label className="text-base">Reflection</Label>
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                  {submission.devotion.reflection}
                </p>
              </div>

              {submission.devotion.prayerPoints.length > 0 && (
                <div>
                  <Label className="text-base">Prayer Points</Label>
                  <ul className="mt-2 space-y-1">
                    {submission.devotion.prayerPoints.map((point) => (
                      <li
                        key={point.id}
                        className="text-sm text-gray-700 flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{point.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {submission.devotion.declaration && (
                <div>
                  <Label className="text-base">Declaration</Label>
                  <p className="text-sm text-gray-700 mt-2 italic">
                    {submission.devotion.declaration}
                  </p>
                </div>
              )}

              <div>
                <Label className="text-base">Memory Verse</Label>
                <p className="text-sm text-gray-700 mt-2">
                  {submission.devotion.memoryVerse}
                </p>
              </div>
            </div>

            {/* Reject Form */}
            {showRejectForm && (
              <div className="space-y-2 border-t pt-4">
                <Label htmlFor="reviewNote">Rejection Note</Label>
                <Textarea
                  id="reviewNote"
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="Provide feedback for the submitter"
                  rows={3}
                />
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0 bg-white border-t border-gray-200">
          {showRejectForm ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowRejectForm(false);
                  setReviewNote("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleReject}
                disabled={!reviewNote.trim()}
              >
                Confirm Rejection
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
              <Button
                type="button"
                variant="outline"
                className="text-red-600"
                onClick={() => setShowRejectForm(true)}
              >
                Reject
              </Button>
              <Button
                type="button"
                className="bg-green-600"
                onClick={handleApprove}
              >
                Approve
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
