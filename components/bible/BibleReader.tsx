import { TranslationBookChapter, ChapterContent } from "@/types/bible";
import { VerseDisplay } from "./VerseDisplay";
import { TextSkeleton } from "@/components/ui/skeleton";

interface BibleReaderProps {
  chapterData: TranslationBookChapter | null;
  isLoading: boolean;
  onBookmark: (verse: number, text: string) => void;
  isVerseBookmarked: (verse: number) => boolean;
}

export function BibleReader({
  chapterData,
  isLoading,
  onBookmark,
  isVerseBookmarked,
}: BibleReaderProps) {
  if (isLoading) {
    return (
      <div className="bg-white border border-gray-100 rounded-lg p-6">
        <div className="mb-6 pb-4 border-b border-gray-100 space-y-2">
          <div className="h-6 w-40 bg-gray-100 animate-pulse rounded" />
          <div className="h-3.5 w-28 bg-gray-100 animate-pulse rounded" />
        </div>
        <TextSkeleton lines={12} />
      </div>
    );
  }

  if (!chapterData) {
    return (
      <div className="bg-white border border-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-600">Select a book and chapter to start reading</p>
      </div>
    );
  }

  const renderContent = (content: ChapterContent[]) => {
    return content.map((item, index) => {
      // Heading
      if (item.type === "heading") {
        return (
          <h3
            key={index}
            className="text-lg font-bold text-gray-900 mt-6 mb-3"
          >
            {item.content.join(" ")}
          </h3>
        );
      }

      // Line break
      if (item.type === "line_break") {
        return <div key={index} className="h-4" />;
      }

      // Hebrew subtitle
      if (item.type === "hebrew_subtitle") {
        return (
          <p key={index} className="text-sm italic text-gray-600 mb-3">
            {item.content
              .map((c) => (typeof c === "string" ? c : "text" in c ? c.text : ""))
              .join(" ")}
          </p>
        );
      }

      // Verse
      if (item.type === "verse") {
        return (
          <VerseDisplay
            key={index}
            verse={item}
            isBookmarked={isVerseBookmarked(item.number)}
            onBookmark={onBookmark}
          />
        );
      }

      return null;
    });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-lg">
      {/* Chapter Content */}
      <div className="p-6">
        {/* Book and Chapter Title */}
        <div className="mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            {chapterData.book.name} {chapterData.chapter.number}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {chapterData.translation.englishName} (
            {chapterData.translation.shortName})
          </p>
        </div>

        {/* Verses */}
        <div className="space-y-1 max-w-4xl">
          {renderContent(chapterData.chapter.content)}
        </div>

        {/* Footnotes */}
        {chapterData.chapter.footnotes.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Footnotes
            </h4>
            <div className="space-y-2">
              {chapterData.chapter.footnotes.map((footnote) => (
                <div key={footnote.noteId} className="text-xs text-gray-600">
                  <span className="font-semibold text-primary">
                    [{footnote.noteId}]
                  </span>{" "}
                  {footnote.reference && (
                    <span className="text-gray-500">
                      ({footnote.reference.chapter}:{footnote.reference.verse})
                    </span>
                  )}{" "}
                  {footnote.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Audio Links (if available) */}
      {Object.keys(chapterData.thisChapterAudioLinks).length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-lg">
          <p className="text-xs text-gray-600 mb-2">Audio available:</p>
          <div className="flex gap-2">
            {Object.entries(chapterData.thisChapterAudioLinks).map(
              ([reader, url]) => (
                <a
                  key={reader}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline capitalize"
                >
                  {reader}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
