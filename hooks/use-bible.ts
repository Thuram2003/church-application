import { useState, useEffect, useCallback } from "react";
import { bibleService } from "@/lib/services/bible.service";
import {
  Translation,
  TranslationBook,
  TranslationBookChapter,
  BibleBookmark,
  ReadingPosition,
} from "@/types/bible";

interface UseBibleReturn {
  // Translations
  translations: Translation[];
  selectedTranslation: string;
  setSelectedTranslation: (translationId: string) => void;

  // Books
  books: TranslationBook[];
  selectedBook: TranslationBook | null;
  setSelectedBook: (bookId: string) => void;

  // Chapter
  selectedChapter: number;
  setSelectedChapter: (chapter: number) => void;
  chapterData: TranslationBookChapter | null;

  // Navigation
  goToNextChapter: () => void;
  goToPreviousChapter: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;

  // Bookmarks
  bookmarks: BibleBookmark[];
  addBookmark: (
    verse: number,
    verseText: string,
    note?: string
  ) => Promise<void>;
  removeBookmark: (bookmarkId: string) => void;
  isVerseBookmarked: (verse: number) => boolean;

  // Reading Position
  readingPosition: ReadingPosition | null;
  goToReadingPosition: () => void;

  // Loading & Error States
  isLoadingTranslations: boolean;
  isLoadingBooks: boolean;
  isLoadingChapter: boolean;
  error: string | null;
}

export function useBible(): UseBibleReturn {
  // State
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [selectedTranslation, setSelectedTranslationState] =
    useState<string>("BSB");
  const [books, setBooks] = useState<TranslationBook[]>([]);
  const [selectedBook, setSelectedBookState] =
    useState<TranslationBook | null>(null);
  const [selectedChapter, setSelectedChapterState] = useState<number>(1);
  const [chapterData, setChapterData] =
    useState<TranslationBookChapter | null>(null);
  const [bookmarks, setBookmarks] = useState<BibleBookmark[]>([]);
  const [readingPosition, setReadingPosition] =
    useState<ReadingPosition | null>(null);

  // Loading states
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(true);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const [isLoadingChapter, setIsLoadingChapter] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load translations on mount
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoadingTranslations(true);
        setError(null);
        const data = await bibleService.getAvailableTranslations();
        setTranslations(data.translations);

        // Load reading position
        const position = bibleService.getReadingPosition();
        setReadingPosition(position);

        // If there's a reading position, use it
        if (position) {
          setSelectedTranslationState(position.translationId);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load translations"
        );
      } finally {
        setIsLoadingTranslations(false);
      }
    };

    loadTranslations();
  }, []);

  // Load books when translation changes
  useEffect(() => {
    const loadBooks = async () => {
      if (!selectedTranslation) return;

      try {
        setIsLoadingBooks(true);
        setError(null);
        const data = await bibleService.getBooks(selectedTranslation);
        setBooks(data.books);

        // If there's a reading position for this translation, select that book
        if (
          readingPosition &&
          readingPosition.translationId === selectedTranslation
        ) {
          const book = data.books.find((b) => b.id === readingPosition.bookId);
          if (book) {
            setSelectedBookState(book);
            setSelectedChapterState(readingPosition.chapter);
            return;
          }
        }

        // Otherwise, select the first book (Genesis)
        if (data.books.length > 0) {
          setSelectedBookState(data.books[0]);
          setSelectedChapterState(1);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load books");
      } finally {
        setIsLoadingBooks(false);
      }
    };

    loadBooks();
  }, [selectedTranslation]);

  // Load chapter when book or chapter changes
  useEffect(() => {
    const loadChapter = async () => {
      if (!selectedTranslation || !selectedBook) return;

      try {
        setIsLoadingChapter(true);
        setError(null);
        const data = await bibleService.getChapter(
          selectedTranslation,
          selectedBook.id,
          selectedChapter
        );
        setChapterData(data);

        // Save reading position
        bibleService.saveReadingPosition({
          translationId: selectedTranslation,
          bookId: selectedBook.id,
          bookName: selectedBook.name,
          chapter: selectedChapter,
        });

        // Update local reading position state
        setReadingPosition({
          translationId: selectedTranslation,
          bookId: selectedBook.id,
          bookName: selectedBook.name,
          chapter: selectedChapter,
          lastRead: new Date(),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load chapter");
      } finally {
        setIsLoadingChapter(false);
      }
    };

    loadChapter();
  }, [selectedTranslation, selectedBook, selectedChapter]);

  // Load bookmarks on mount and when they change
  useEffect(() => {
    const loadBookmarks = () => {
      const marks = bibleService.getBookmarks();
      setBookmarks(marks);
    };

    loadBookmarks();
  }, []);

  // Handlers
  const setSelectedTranslation = useCallback((translationId: string) => {
    setSelectedTranslationState(translationId);
  }, []);

  const setSelectedBook = useCallback(
    (bookId: string) => {
      const book = books.find((b) => b.id === bookId);
      if (book) {
        setSelectedBookState(book);
        setSelectedChapterState(1);
      }
    },
    [books]
  );

  const setSelectedChapter = useCallback((chapter: number) => {
    setSelectedChapterState(chapter);
  }, []);

  const goToNextChapter = useCallback(() => {
    if (!selectedBook) return;

    if (selectedChapter < selectedBook.numberOfChapters) {
      setSelectedChapterState((prev) => prev + 1);
    } else {
      // Move to next book
      const currentIndex = books.findIndex((b) => b.id === selectedBook.id);
      if (currentIndex < books.length - 1) {
        setSelectedBookState(books[currentIndex + 1]);
        setSelectedChapterState(1);
      }
    }
  }, [selectedBook, selectedChapter, books]);

  const goToPreviousChapter = useCallback(() => {
    if (!selectedBook) return;

    if (selectedChapter > 1) {
      setSelectedChapterState((prev) => prev - 1);
    } else {
      // Move to previous book's last chapter
      const currentIndex = books.findIndex((b) => b.id === selectedBook.id);
      if (currentIndex > 0) {
        const prevBook = books[currentIndex - 1];
        setSelectedBookState(prevBook);
        setSelectedChapterState(prevBook.numberOfChapters);
      }
    }
  }, [selectedBook, selectedChapter, books]);

  const canGoNext =
    selectedBook !== null &&
    (selectedChapter < selectedBook.numberOfChapters ||
      books.findIndex((b) => b.id === selectedBook.id) < books.length - 1);

  const canGoPrevious =
    selectedBook !== null &&
    (selectedChapter > 1 ||
      books.findIndex((b) => b.id === selectedBook.id) > 0);

  const addBookmark = useCallback(
    async (verse: number, verseText: string, note?: string) => {
      if (!selectedBook) return;

      try {
        bibleService.addBookmark({
          translationId: selectedTranslation,
          bookId: selectedBook.id,
          bookName: selectedBook.name,
          chapter: selectedChapter,
          verse,
          verseText,
          note,
        });

        // Reload bookmarks
        const marks = bibleService.getBookmarks();
        setBookmarks(marks);
      } catch (err) {
        console.error("Failed to add bookmark:", err);
      }
    },
    [selectedTranslation, selectedBook, selectedChapter]
  );

  const removeBookmark = useCallback((bookmarkId: string) => {
    try {
      bibleService.removeBookmark(bookmarkId);

      // Reload bookmarks
      const marks = bibleService.getBookmarks();
      setBookmarks(marks);
    } catch (err) {
      console.error("Failed to remove bookmark:", err);
    }
  }, []);

  const isVerseBookmarked = useCallback(
    (verse: number): boolean => {
      if (!selectedBook) return false;

      return bibleService.isBookmarked(
        selectedTranslation,
        selectedBook.id,
        selectedChapter,
        verse
      );
    },
    [selectedTranslation, selectedBook, selectedChapter]
  );

  const goToReadingPosition = useCallback(() => {
    if (!readingPosition) return;

    setSelectedTranslationState(readingPosition.translationId);
    // Books will be loaded by the effect, and then the book/chapter will be set
  }, [readingPosition]);

  return {
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
  };
}
