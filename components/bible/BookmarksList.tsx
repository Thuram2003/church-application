import { BibleBookmark } from "@/types/bible";
import { BookmarkSimple, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BookmarksListProps {
  bookmarks: BibleBookmark[];
  onRemoveBookmark: (bookmarkId: string) => void;
  onGoToVerse?: (
    translationId: string,
    bookId: string,
    chapter: number
  ) => void;
}

export function BookmarksList({
  bookmarks,
  onRemoveBookmark,
  onGoToVerse,
}: BookmarksListProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-lg p-8 text-center">
        <BookmarkSimple className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900 mb-1">No bookmarks yet</h3>
        <p className="text-sm text-gray-600">
          Bookmark verses while reading to save them here
        </p>
      </div>
    );
  }

  // Sort bookmarks by date (newest first)
  const sortedBookmarks = [...bookmarks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-3">
      {sortedBookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              {/* Reference */}
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {bookmark.translationId}
                </Badge>
                <button
                  onClick={() =>
                    onGoToVerse?.(
                      bookmark.translationId,
                      bookmark.bookId,
                      bookmark.chapter
                    )
                  }
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {bookmark.bookName} {bookmark.chapter}:{bookmark.verse}
                </button>
              </div>

              {/* Verse Text */}
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                {bookmark.verseText}
              </p>

              {/* Note (if exists) */}
              {bookmark.note && (
                <div className="bg-gray-50 rounded p-2 mt-2">
                  <p className="text-xs text-gray-600 italic">
                    Note: {bookmark.note}
                  </p>
                </div>
              )}

              {/* Date */}
              <p className="text-xs text-gray-500 mt-2">
                Saved {new Date(bookmark.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Delete Button */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onRemoveBookmark(bookmark.id)}
              className="text-gray-400 hover:text-red-600"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
