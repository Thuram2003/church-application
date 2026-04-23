import {
  AvailableTranslations,
  TranslationBooks,
  TranslationBookChapter,
  BibleBookmark,
  ReadingPosition,
} from "@/types/bible";

// Bible API Base URL
const BIBLE_API_BASE_URL = process.env.NEXT_PUBLIC_BIBLE_API_BASE_URL || "https://bible-api.deno.dev/api";

// Cache keys
const CACHE_KEYS = {
  TRANSLATIONS: "bible_translations",
  BOOKS: (translationId: string) => `bible_books_${translationId}`,
  CHAPTER: (translationId: string, bookId: string, chapter: number) =>
    `bible_chapter_${translationId}_${bookId}_${chapter}`,
  BOOKMARKS: "bible_bookmarks",
  READING_POSITION: "bible_reading_position",
};

// Cache duration (in milliseconds)
const CACHE_DURATION = {
  TRANSLATIONS: 7 * 24 * 60 * 60 * 1000, // 7 days
  BOOKS: 7 * 24 * 60 * 60 * 1000, // 7 days
  CHAPTER: 24 * 60 * 60 * 1000, // 1 day
};

interface CachedData<T> {
  data: T;
  timestamp: number;
}

class BibleService {
  // Helper: Check if cache is valid
  private isCacheValid(timestamp: number, duration: number): boolean {
    return Date.now() - timestamp < duration;
  }

  // Helper: Get from cache
  private getFromCache<T>(key: string, duration: number): T | null {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const { data, timestamp }: CachedData<T> = JSON.parse(cached);
      if (this.isCacheValid(timestamp, duration)) {
        return data;
      }

      // Cache expired, remove it
      localStorage.removeItem(key);
      return null;
    } catch (error) {
      console.error("Error reading from cache:", error);
      return null;
    }
  }

  // Helper: Save to cache
  private saveToCache<T>(key: string, data: T): void {
    try {
      const cached: CachedData<T> = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cached));
    } catch (error) {
      console.error("Error saving to cache:", error);
    }
  }

  // API: Get available translations
  async getAvailableTranslations(): Promise<AvailableTranslations> {
    const cacheKey = CACHE_KEYS.TRANSLATIONS;
    const cached = this.getFromCache<AvailableTranslations>(
      cacheKey,
      CACHE_DURATION.TRANSLATIONS
    );

    if (cached) {
      return cached;
    }

    const response = await fetch(
      `${BIBLE_API_BASE_URL}/available_translations.json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch translations");
    }

    const data: AvailableTranslations = await response.json();
    this.saveToCache(cacheKey, data);

    return data;
  }

  // API: Get books for a translation
  async getBooks(translationId: string): Promise<TranslationBooks> {
    const cacheKey = CACHE_KEYS.BOOKS(translationId);
    const cached = this.getFromCache<TranslationBooks>(
      cacheKey,
      CACHE_DURATION.BOOKS
    );

    if (cached) {
      return cached;
    }

    const response = await fetch(
      `${BIBLE_API_BASE_URL}/${translationId}/books.json`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch books for ${translationId}`);
    }

    const data: TranslationBooks = await response.json();
    this.saveToCache(cacheKey, data);

    return data;
  }

  // API: Get a chapter
  async getChapter(
    translationId: string,
    bookId: string,
    chapter: number
  ): Promise<TranslationBookChapter> {
    const cacheKey = CACHE_KEYS.CHAPTER(translationId, bookId, chapter);
    const cached = this.getFromCache<TranslationBookChapter>(
      cacheKey,
      CACHE_DURATION.CHAPTER
    );

    if (cached) {
      return cached;
    }

    const response = await fetch(
      `${BIBLE_API_BASE_URL}/${translationId}/${bookId}/${chapter}.json`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch chapter ${chapter} of ${bookId} (${translationId})`
      );
    }

    const data: TranslationBookChapter = await response.json();
    this.saveToCache(cacheKey, data);

    return data;
  }

  // LocalStorage: Get bookmarks
  getBookmarks(): BibleBookmark[] {
    try {
      const bookmarks = localStorage.getItem(CACHE_KEYS.BOOKMARKS);
      if (!bookmarks) return [];

      return JSON.parse(bookmarks).map((b: BibleBookmark) => ({
        ...b,
        createdAt: new Date(b.createdAt),
      }));
    } catch (error) {
      console.error("Error reading bookmarks:", error);
      return [];
    }
  }

  // LocalStorage: Add bookmark
  addBookmark(bookmark: Omit<BibleBookmark, "id" | "createdAt">): void {
    try {
      const bookmarks = this.getBookmarks();
      const newBookmark: BibleBookmark = {
        ...bookmark,
        id: `${bookmark.translationId}_${bookmark.bookId}_${bookmark.chapter}_${bookmark.verse}_${Date.now()}`,
        createdAt: new Date(),
      };

      bookmarks.push(newBookmark);
      localStorage.setItem(CACHE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (error) {
      console.error("Error adding bookmark:", error);
      throw error;
    }
  }

  // LocalStorage: Remove bookmark
  removeBookmark(bookmarkId: string): void {
    try {
      const bookmarks = this.getBookmarks();
      const filtered = bookmarks.filter((b) => b.id !== bookmarkId);
      localStorage.setItem(CACHE_KEYS.BOOKMARKS, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error removing bookmark:", error);
      throw error;
    }
  }

  // LocalStorage: Check if verse is bookmarked
  isBookmarked(
    translationId: string,
    bookId: string,
    chapter: number,
    verse: number
  ): boolean {
    const bookmarks = this.getBookmarks();
    return bookmarks.some(
      (b) =>
        b.translationId === translationId &&
        b.bookId === bookId &&
        b.chapter === chapter &&
        b.verse === verse
    );
  }

  // LocalStorage: Get reading position
  getReadingPosition(): ReadingPosition | null {
    try {
      const position = localStorage.getItem(CACHE_KEYS.READING_POSITION);
      if (!position) return null;

      const parsed = JSON.parse(position);
      return {
        ...parsed,
        lastRead: new Date(parsed.lastRead),
      };
    } catch (error) {
      console.error("Error reading position:", error);
      return null;
    }
  }

  // LocalStorage: Save reading position
  saveReadingPosition(position: Omit<ReadingPosition, "lastRead">): void {
    try {
      const newPosition: ReadingPosition = {
        ...position,
        lastRead: new Date(),
      };
      localStorage.setItem(
        CACHE_KEYS.READING_POSITION,
        JSON.stringify(newPosition)
      );
    } catch (error) {
      console.error("Error saving reading position:", error);
    }
  }

  // Utility: Clear all cache
  clearCache(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith("bible_")) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  }
}

export const bibleService = new BibleService();
