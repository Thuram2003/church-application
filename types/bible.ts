// Translation Types
export interface Translation {
  id: string;
  name: string;
  englishName: string;
  website: string;
  licenseUrl: string;
  shortName: string;
  language: string;
  languageName?: string;
  languageEnglishName?: string;
  textDirection: "ltr" | "rtl";
  availableFormats: ("json" | "usfm")[];
  listOfBooksApiLink: string;
  numberOfBooks: number;
  totalNumberOfChapters: number;
  totalNumberOfVerses: number;
}

export interface AvailableTranslations {
  translations: Translation[];
}

// Book Types
export interface TranslationBook {
  id: string;
  translationId?: string;
  name: string;
  commonName: string;
  title: string | null;
  order: number;
  numberOfChapters: number;
  firstChapterNumber: number;
  firstChapterApiLink: string;
  lastChapterNumber: number;
  lastChapterApiLink: string;
  totalNumberOfVerses: number;
  isApocryphal?: boolean;
}

export interface TranslationBooks {
  translation: Translation;
  books: TranslationBook[];
}

// Chapter Content Types
export type ChapterContent =
  | ChapterHeading
  | ChapterLineBreak
  | ChapterVerse
  | ChapterHebrewSubtitle;

export interface ChapterHeading {
  type: "heading";
  content: string[];
}

export interface ChapterLineBreak {
  type: "line_break";
}

export interface ChapterHebrewSubtitle {
  type: "hebrew_subtitle";
  content: (string | FormattedText | VerseFootnoteReference)[];
}

export interface ChapterVerse {
  type: "verse";
  number: number;
  content: (
    | string
    | FormattedText
    | InlineHeading
    | InlineLineBreak
    | VerseFootnoteReference
  )[];
}

export interface FormattedText {
  text: string;
  poem?: number;
  wordsOfJesus?: boolean;
}

export interface InlineHeading {
  heading: string;
}

export interface InlineLineBreak {
  lineBreak: true;
}

export interface VerseFootnoteReference {
  noteId: number;
}

export interface ChapterFootnote {
  noteId: number;
  text: string;
  reference?: {
    chapter: number;
    verse: number;
  };
  caller: "+" | string | null;
}

export interface ChapterData {
  number: number;
  content: ChapterContent[];
  footnotes: ChapterFootnote[];
}

// Chapter Response Types
export interface TranslationBookChapterAudioLinks {
  [reader: string]: string;
}

export interface TranslationBookChapter {
  translation: Translation;
  book: TranslationBook;
  thisChapterLink: string;
  thisChapterAudioLinks: TranslationBookChapterAudioLinks;
  nextChapterApiLink: string | null;
  nextChapterAudioLinks: TranslationBookChapterAudioLinks | null;
  previousChapterApiLink: string | null;
  previousChapterAudioLinks: TranslationBookChapterAudioLinks | null;
  numberOfVerses: number;
  chapter: ChapterData;
}

// Bookmark Types (Local Storage)
export interface BibleBookmark {
  id: string;
  translationId: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  verseText: string;
  note?: string;
  createdAt: Date;
}

// Reading Position (Local Storage)
export interface ReadingPosition {
  translationId: string;
  bookId: string;
  bookName: string;
  chapter: number;
  lastRead: Date;
}

// UI State Types
export interface BibleReaderState {
  selectedTranslation: string;
  selectedBook: string | null;
  selectedChapter: number;
  isLoading: boolean;
  error: string | null;
}

// Search Types (Future)
export interface BibleSearchResult {
  translationId: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  context?: string;
}
