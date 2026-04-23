import { ChapterVerse, FormattedText } from "@/types/bible";
import { BookmarkSimple } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VerseDisplayProps {
  verse: ChapterVerse;
  isBookmarked: boolean;
  onBookmark: (verse: number, text: string) => void;
}

export function VerseDisplay({
  verse,
  isBookmarked,
  onBookmark,
}: VerseDisplayProps) {
  // Extract plain text from verse content for bookmarking
  const getVerseText = (): string => {
    return verse.content
      .map((item) => {
        if (typeof item === "string") return item;
        if (typeof item === "object" && "text" in item) return item.text;
        if (typeof item === "object" && "heading" in item) return item.heading;
        return "";
      })
      .join(" ")
      .trim();
  };

  // Render verse content with formatting
  const renderContent = () => {
    return verse.content.map((item, index) => {
      // Plain string
      if (typeof item === "string") {
        return <span key={index}>{item} </span>;
      }

      // Formatted text
      if (typeof item === "object" && "text" in item) {
        const formatted = item as FormattedText;
        return (
          <span
            key={index}
            className={cn(
              formatted.wordsOfJesus && "text-red-600",
              formatted.poem && "block italic",
              formatted.poem && formatted.poem > 1 && "ml-4"
            )}
          >
            {formatted.text}{" "}
          </span>
        );
      }

      // Inline heading
      if (typeof item === "object" && "heading" in item) {
        return (
          <span key={index} className="font-semibold text-gray-900">
            {item.heading}{" "}
          </span>
        );
      }

      // Inline line break
      if (typeof item === "object" && "lineBreak" in item) {
        return <br key={index} />;
      }

      // Footnote reference
      if (typeof item === "object" && "noteId" in item) {
        return (
          <sup key={index} className="text-xs text-primary">
            [{item.noteId}]
          </sup>
        );
      }

      return null;
    });
  };

  return (
    <div className="group flex gap-3 py-2 hover:bg-gray-50 rounded-md px-2 -mx-2 transition-colors">
      {/* Verse number */}
      <span className="text-sm font-semibold text-primary min-w-[2rem] select-none">
        {verse.number}
      </span>

      {/* Verse content */}
      <div className="flex-1 text-gray-800 leading-relaxed">
        {renderContent()}
      </div>

      {/* Bookmark button */}
      <Button
        variant="ghost"
        size="icon-sm"
        className={cn(
          "opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6",
          isBookmarked && "opacity-100"
        )}
        onClick={() => onBookmark(verse.number, getVerseText())}
      >
        <BookmarkSimple
          weight={isBookmarked ? "fill" : "regular"}
          className={cn("w-4 h-4", isBookmarked && "text-primary")}
        />
      </Button>
    </div>
  );
}
