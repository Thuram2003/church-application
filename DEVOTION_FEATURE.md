# Devotion Management System

A comprehensive devotion management system for church administration with creation, scheduling, series management, and member submission review capabilities.

## Features

### 1. Overview Dashboard
- **Today's Devotion Card**: Large, readable display of the current day's devotion
- **Quick Stats**: 
  - Total devotions
  - This month's count
  - Scheduled ahead
  - Pending member submissions
- **Upcoming Devotions**: Next 7 days preview
- **Recent Activity**: Latest updates and changes

### 2. Devotion Library
- **Full List View**: Table display of all devotions
- **Filters**:
  - Status (Draft / Scheduled / Published)
  - Series
  - Date range
  - Search by title or scripture
- **Actions**: Edit, Duplicate, Delete, Preview
- **Status Badges**:
  - Draft (gray)
  - Scheduled (blue)
  - Published (green)

### 3. Create/Edit Devotion Form
Clean, intuitive form with the following blocks:
- **Title**: Devotion title
- **Publish Date**: Date picker for scheduling
- **Scripture Reference**: e.g., "John 3:16"
- **Scripture Text**: Full Bible verse text
- **Reflection/Message**: Rich text area for the main content
- **Prayer Points**: Repeatable field (add/remove multiple points)
- **Declaration**: Optional inspirational declaration
- **Memory Verse**: Key verse to remember
- **Series**: Link to a devotion series (optional)
- **Author**: Author name
- **Status**: Draft / Schedule / Publish Now

### 4. Series Manager
- **Create Series**: Name, description, and cover
- **View Series**: See all devotions in a series
- **Card View**: Visual display of series with devotion count
- **Actions**: View devotions, Edit, Delete

### 5. Member Submissions
- **Inbox-style Review**: List of submitted devotions from members
- **Review Dialog**: Full preview of submission content
- **Actions**:
  - Approve (moves to library as draft)
  - Reject with feedback note
  - Preview full content
- **Status Tracking**: Pending / Approved / Rejected

## Components

### Main Components
- `app/devotion/page.tsx` - Main devotion page with tabs
- `components/devotion/CreateDevotionDialog.tsx` - Devotion creation form
- `components/devotion/TodayDevotionCard.tsx` - Today's devotion display
- `components/devotion/DevotionStatsCard.tsx` - Statistics card component
- `components/devotion/CreateSeriesDialog.tsx` - Series creation form
- `components/devotion/ReviewSubmissionDialog.tsx` - Submission review interface

### Types
- `types/devotion.ts` - TypeScript interfaces for devotions, series, and submissions

## Design Principles

1. **No Overengineering**: Admin tool focused on functionality
2. **Pleasant UX**: Especially for repeatable fields (prayer points)
3. **Clear Status**: Color-coded badges always visible
4. **Front and Center**: Today's devotion prominently displayed
5. **Consistent Design**: Matches app's blue theme, uses Radix components

## Status Colors

- **Draft**: Gray (`bg-gray-100 text-gray-700`)
- **Scheduled**: Blue (`bg-blue-50 text-blue-700`)
- **Published**: Green (`bg-green-50 text-green-700`)
- **Pending**: Amber (`bg-amber-50 text-amber-700`)

## Usage

### Creating a Devotion
1. Click "Create devotion" button
2. Fill in all required fields
3. Add multiple prayer points as needed
4. Select status (Draft/Schedule/Publish)
5. Submit

### Managing Series
1. Navigate to "Series" tab
2. Click "Create series"
3. Enter name and description
4. Link devotions to series when creating/editing

### Reviewing Submissions
1. Navigate to "Submissions" tab
2. Click "Review" on any submission
3. Read through the content
4. Approve (adds to library) or Reject (with feedback)

## Future Enhancements

- Rich text editor for reflection field
- Image upload for series covers
- Email notifications for approved/rejected submissions
- Analytics and engagement metrics
- Export devotions to PDF
- Mobile app integration
- Automated scheduling suggestions
