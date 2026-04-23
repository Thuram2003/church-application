"use client";

import { BookOpen, BookmarkSimple, ClockCounterClockwise } from "@phosphor-icons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBible } from "@/hooks/use-bible";
import {
  BibleReader,
  TranslationSelector,
  BookSelector,
  ChapterNavigation,
  BookmarksList,
} from "@/components/bible";
import { TextSkeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ViewMode = "read" | "bookmarks" | "history";

export default function BiblePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("read");
  const {
    translations,
    selectedTranslation,
    setSelectedTranslation,
    books,
    selectedBook,
    setSelectedBook,
    selectedChapter,
    setSelectedChapter,
    chapterData,
    goToNextChapter,
    goToPreviousChapter,
    canGoNext,
    canGoPrevious,
    bookmarks,
    addBookmark,
    removeBookmark,
    isVerseBookmarked,
    readingPosition,
    goToReadingPosition,
    isLoadingTranslations,
    isLoadingBooks,
    isLoadingChapter,
    error,
  } = useBible();

  const handleGoToVerse = (
    translationId: string,
    bookId: string,
    chapter: number
  ) => {
    // Switch to read tab
    setViewMode("read");

    // If different translation, switch it
    if (translationId !== selectedTranslation) {
      setSelectedTranslation(translationId);
    }

    // Set book and chapter
    setSelectedBook(bookId);
    setSelectedChapter(chapter);
  };

  if (isLoadingTranslations) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <BookOpen className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Bible</h1>
        </div>
        <div className="bg-white border border-gray-100 rounded-lg p-4">
          <div className="flex gap-4">
            <div className="h-9 w-36 bg-gray-100 animate-pulse rounded-md" />
            <div className="h-9 w-36 bg-gray-100 animate-pulse rounded-md" />
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-lg p-6">
          <div className="mb-6 pb-4 border-b border-gray-100 space-y-2">
            <div className="h-6 w-40 bg-gray-100 animate-pulse rounded" />
            <div className="h-3.5 w-28 bg-gray-100 animate-pulse rounded" />
          </div>
          <TextSkeleton lines={14} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-semibold mb-2">Error loading Bible</p>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <BookOpen className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Bible</h1>
        </div>

        {/* Resume Reading Button */}
        {readingPosition && viewMode !== "read" && (
          <Button
            variant="outline"
            size="sm"
            onClick={goToReadingPosition}
          >
            <ClockCounterClockwise className="w-4 h-4 mr-1" />
            Resume Reading
          </Button>
        )}
      </div>

      {/* View Tabs */}
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
        <TabsList>
          <TabsTrigger value="read" className="gap-1.5">
            <BookOpen className="w-4 h-4" />
            Read
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="gap-1.5">
            <BookmarkSimple className="w-4 h-4" />
            Bookmarks
            {bookmarks.length > 0 && (
              <span className="ml-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                {bookmarks.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Read Tab */}
        <TabsContent value="read" className="space-y-6 mt-6">
          {/* Controls */}
          <div className="bg-white border border-gray-100 rounded-lg p-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Translation Selector */}
              <TranslationSelector
                translations={translations}
                selectedTranslation={selectedTranslation}
                onTranslationChange={setSelectedTranslation}
                disabled={isLoadingBooks}
              />

              {/* Book Selector */}
              <BookSelector
                books={books}
                selectedBook={selectedBook}
                onBookChange={setSelectedBook}
                disabled={isLoadingBooks}
              />

              {/* Reading Position Info */}
              {readingPosition && (
                <div className="ml-auto text-sm text-gray-600">
                  Last read: {readingPosition.bookName}{" "}
                  {readingPosition.chapter}
                </div>
              )}
            </div>
          </div>

          {/* Chapter Navigation */}
          {selectedBook && (
            <ChapterNavigation
              bookName={selectedBook.name}
              currentChapter={selectedChapter}
              totalChapters={selectedBook.numberOfChapters}
              onChapterChange={setSelectedChapter}
              onPrevious={goToPreviousChapter}
              onNext={goToNextChapter}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
            />
          )}

          {/* Bible Reader */}
          <BibleReader
            chapterData={chapterData}
            isLoading={isLoadingChapter}
            onBookmark={addBookmark}
            isVerseBookmarked={isVerseBookmarked}
          />

          {/* Bottom Navigation */}
          {selectedBook && chapterData && (
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={goToPreviousChapter}
                disabled={!canGoPrevious}
              >
                Previous Chapter
              </Button>
              <span className="text-sm text-gray-600">
                {selectedBook.name} {selectedChapter} of{" "}
                {selectedBook.numberOfChapters}
              </span>
              <Button
                variant="outline"
                onClick={goToNextChapter}
                disabled={!canGoNext}
              >
                Next Chapter
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Bookmarks Tab */}
        <TabsContent value="bookmarks" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {bookmarks.length === 0
                ? "No bookmarks yet"
                : `${bookmarks.length} ${
                    bookmarks.length === 1 ? "bookmark" : "bookmarks"
                  } saved`}
            </p>
          </div>

          <BookmarksList
            bookmarks={bookmarks}
            onRemoveBookmark={removeBookmark}
            onGoToVerse={handleGoToVerse}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
