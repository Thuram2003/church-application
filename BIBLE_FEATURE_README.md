# Bible Feature Documentation

## Overview
A complete Bible reading experience integrated into the Gracely church management system. Users can read multiple Bible translations, bookmark verses, and track their reading progress.

## Features

### 📖 Bible Reading
- Access to 66 books of the Bible
- Multiple translations available (BSB, KJV, NIV, ESV, and more)
- Clean, readable verse-by-verse display
- Proper formatting for poems, headings, and Words of Jesus
- Footnotes and cross-references
- Audio Bible links (when available)

### 🔖 Bookmarks
- Bookmark any verse with one click
- Add personal notes to bookmarks
- View all bookmarks in one place
- Click bookmark to navigate to verse
- Delete bookmarks easily

### 📍 Reading Position
- Automatically saves your reading position
- Resume reading from where you left off
- Shows last read book and chapter
- Works across sessions (localStorage)

### 🎨 Design
- Matches existing app design patterns
- Responsive on all devices
- Smooth transitions and animations
- Loading states for better UX
- Error handling with user-friendly messages

## File Structure

```
gracely-frontend/
├── app/(spiritual)/bible/
│   └── page.tsx                    # Main Bible page
├── components/bible/
│   ├── BibleReader.tsx             # Main reading interface
│   ├── TranslationSelector.tsx    # Translation dropdown
│   ├── BookSelector.tsx            # Book navigation
│   ├── ChapterNavigation.tsx      # Chapter controls
│   ├── VerseDisplay.tsx            # Individual verse rendering
│   ├── BookmarksList.tsx           # Bookmarks display
│   └── index.ts                    # Component exports
├── hooks/
│   └── use-bible.ts                # Bible state management hook
├── lib/services/
│   └── bible.service.ts            # API client & caching
└── types/
    └── bible.ts                    # TypeScript interfaces
```

## API Integration

### Base URL
```
https://bible.helloao.org/api
```

### Endpoints Used
- `/available_translations.json` - Get all Bible translations
- `/{translationId}/books.json` - Get books for a translation
- `/{translationId}/{bookId}/{chapter}.json` - Get chapter content

### Caching Strategy
- **Translations**: Cached for 7 days
- **Books**: Cached for 7 days per translation
- **Chapters**: Cached for 1 day
- **Bookmarks**: Stored in localStorage (persistent)
- **Reading Position**: Stored in localStorage (persistent)

## Usage

### For Users

1. **Navigate to Bible**
   - Click "Spiritual" in the sidebar
   - Select "Bible"

2. **Select Translation**
   - Click the translation dropdown (defaults to BSB)
   - Choose your preferred Bible version

3. **Choose a Book**
   - Click the book dropdown
   - Select from Old Testament or New Testament tabs
   - Choose your book

4. **Navigate Chapters**
   - Use Previous/Next buttons
   - Or select chapter from dropdown
   - Automatically advances to next book when chapter ends

5. **Bookmark Verses**
   - Hover over any verse
   - Click the bookmark icon
   - View all bookmarks in the Bookmarks tab

6. **Resume Reading**
   - Your position is automatically saved
   - Click "Resume Reading" to continue where you left off

### For Developers

#### Using the Hook
```typescript
import { useBible } from "@/hooks/use-bible";

function MyComponent() {
  const {
    translations,
    selectedTranslation,
    setSelectedTranslation,
    books,
    selectedBook,
    setSelectedBook,
    chapterData,
    bookmarks,
    addBookmark,
    isLoadingChapter,
  } = useBible();

  // Use the data and functions
}
```

#### Using the Service Directly
```typescript
import { bibleService } from "@/lib/services/bible.service";

// Get translations
const translations = await bibleService.getAvailableTranslations();

// Get books
const books = await bibleService.getBooks("BSB");

// Get chapter
const chapter = await bibleService.getChapter("BSB", "GEN", 1);

// Manage bookmarks
bibleService.addBookmark({
  translationId: "BSB",
  bookId: "GEN",
  bookName: "Genesis",
  chapter: 1,
  verse: 1,
  verseText: "In the beginning...",
});
```

## Components

### BibleReader
Main reading interface that displays chapter content with verses, headings, and footnotes.

**Props:**
- `chapterData`: Chapter data from API
- `isLoading`: Loading state
- `onBookmark`: Callback for bookmarking
- `isVerseBookmarked`: Function to check if verse is bookmarked

### TranslationSelector
Dropdown for selecting Bible translation.

**Props:**
- `translations`: Array of available translations
- `selectedTranslation`: Current translation ID
- `onTranslationChange`: Callback for translation change
- `disabled`: Optional disabled state

### BookSelector
Dropdown for selecting Bible book with Old/New Testament tabs.

**Props:**
- `books`: Array of books
- `selectedBook`: Current book
- `onBookChange`: Callback for book change
- `disabled`: Optional disabled state

### ChapterNavigation
Navigation controls for chapters.

**Props:**
- `bookName`: Current book name
- `currentChapter`: Current chapter number
- `totalChapters`: Total chapters in book
- `onChapterChange`: Callback for chapter change
- `onPrevious`: Previous chapter callback
- `onNext`: Next chapter callback
- `canGoPrevious`: Can navigate to previous
- `canGoNext`: Can navigate to next

### VerseDisplay
Renders individual verse with formatting and bookmark button.

**Props:**
- `verse`: Verse data
- `isBookmarked`: Whether verse is bookmarked
- `onBookmark`: Bookmark callback

### BookmarksList
Displays list of bookmarked verses.

**Props:**
- `bookmarks`: Array of bookmarks
- `onRemoveBookmark`: Remove bookmark callback
- `onGoToVerse`: Navigate to verse callback

## Performance

### Caching
- Reduces API calls significantly
- Improves load times for frequently accessed content
- Automatic cache expiration

### Lazy Loading
- Chapters loaded on demand
- Only loads what's needed
- Smooth transitions between chapters

### LocalStorage
- Bookmarks persist across sessions
- Reading position saved automatically
- No backend required for personal data

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

### Planned Features
- 🔍 Search across translations
- 📝 Personal notes on verses
- 🎨 Highlight verses with colors
- 📚 Reading plans
- 💬 Commentary integration
- 🔗 Cross-references display
- 📤 Share verses (social media, email)
- 🌙 Dark mode for reading
- 📖 Parallel translations view
- 🎧 Audio Bible player

## Troubleshooting

### Bible not loading
- Check internet connection
- Clear browser cache
- Check browser console for errors

### Bookmarks not saving
- Ensure localStorage is enabled
- Check browser privacy settings
- Try a different browser

### Slow performance
- Clear Bible cache: `bibleService.clearCache()`
- Check network speed
- Reduce number of bookmarks

## Credits

### API
- **Bible API**: [bible.helloao.org](https://bible.helloao.org)
- Free and open-source Bible API
- Multiple translations available
- No API key required

### Icons
- **Phosphor Icons**: [phosphoricons.com](https://phosphoricons.com)

## License
Part of the Gracely church management system.
