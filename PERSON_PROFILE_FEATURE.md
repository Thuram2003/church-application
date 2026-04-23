# Person Profile Feature

## Overview
Added a comprehensive person profile page accessible from the People datagrid's three-dots menu. The layout follows the pledges detail page design pattern with a back button, person info sidebar, and tabbed content.

## Structure

### Route
- **Path**: `/people/[id]`
- **File**: `app/(people)/people/[id]/page.tsx`

### Layout Design
The page uses a two-column layout similar to the pledges detail page:

**Left Column (1/3 width)**:
- Large avatar (40x40 container with 32x32 avatar)
- Person name as heading
- Status and role badges
- Email and joined date
- Action buttons (Edit details, Archive person)

**Right Column (2/3 width)**:
- Tab navigation with three tabs
- Tab content area

### Components
Created in `components/people/profile/`:

1. **PersonProfileTab.tsx**
   - Three sections: Contact Details, Family, Additional Details
   - **Contact Details**: Email, Phone, Address
   - **Family**: Connected family with link to family page
   - **Additional Details**: Gender, Age group, Role, Joined date
   - Edit mode with form validation
   - Uses FormSkeleton for loading state

2. **PersonGroupsTab.tsx**
   - Shows groups the person belongs to
   - Displays group name, type, role, and member count
   - "Add to group" action button
   - Empty state when no groups

3. **PersonGivingTab.tsx**
   - Three stat cards: Total giving, This year, Last gift
   - Giving history table with date, type, method, and amount
   - Empty state when no giving history

### Navigation
- Back button to return to `/people`
- Breadcrumb: People — [Person Name]
- Updated `people-columns.tsx` to add "Go to profile" option in the three-dots menu
- Clicking navigates to `/people/[id]` route

## Design System
- Follows pledges detail page layout pattern
- Uses TabNavigation component (same as church settings)
- Consistent with existing UI patterns and skeleton loaders
- Icons from @phosphor-icons/react
- Responsive grid layout (1 column on mobile, 3 columns on desktop)

## API Integration
- Uses existing `usePerson` hook from `hooks/use-people.ts`
- Fetches data from `/branches/{branchId}/members/{memberId}`
- Proper loading and error states
- Avatar with initials fallback

## Future Enhancements
- Implement edit functionality with API integration
- Add real groups data from backend
- Add real giving data from backend
- Add real family data from backend
- Implement archive person functionality
- Add more tabs (Attendance, Forms, Notes) as needed
- Add phone and address fields to backend
