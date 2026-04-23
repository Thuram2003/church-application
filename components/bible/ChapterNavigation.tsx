import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChapterNavigationProps {
  bookName: string;
  currentChapter: number;
  totalChapters: number;
  onChapterChange: (chapter: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function ChapterNavigation({
  bookName,
  currentChapter,
  totalChapters,
  onChapterChange,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: ChapterNavigationProps) {
  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 rounded-lg p-3">
      {/* Book and Chapter Info */}
      <div className="flex items-center gap-3">
        <h3 className="font-semibold text-gray-900">
          {bookName} {currentChapter}
        </h3>
        <span className="text-sm text-gray-500">
          of {totalChapters} {totalChapters === 1 ? "chapter" : "chapters"}
        </span>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          <CaretLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        {/* Chapter Selector */}
        <Select
          value={currentChapter.toString()}
          onValueChange={(value) => onChapterChange(parseInt(value))}
        >
          <SelectTrigger className="w-auto ">
            <SelectValue placeholder="Chapter" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: totalChapters }, (_, i) => i + 1).map(
              (chapter) => (
                <SelectItem key={chapter} value={chapter.toString()}>
                  Chapter {chapter}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!canGoNext}
        >
          Next
          <CaretRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
