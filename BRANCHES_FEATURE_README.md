# Branches Management Feature

This document outlines the complete branches management system implemented for church settings.

## Overview

The branches feature allows churches to manage multiple locations/branches with full CRUD (Create, Read, Update, Delete) operations. It follows the existing design patterns and integrates with the church settings tab system.

## Current Status

✅ **Implemented:**
- Complete CRUD operations for branches
- Form validation and error handling
- Loading states and user feedback
- Integration with existing design system
- Proper TypeScript types and API service
- React Query hooks for state management

⚠️ **Authentication & Workspace Integration:**
The feature is fully implemented but requires proper authentication and workspace context to function. Currently includes:
- Fallback church ID for development testing
- Proper error handling for authentication issues
- Workspace context integration (uses `useWorkspace` hook)
- Development mode indicators

## API Endpoints

The feature integrates with the following backend endpoints:

- `GET /api/v1/churches/{churchId}/branches` - List all branches
- `GET /api/v1/churches/{churchId}/branches/{id}` - Get single branch
- `POST /api/v1/churches/{churchId}/branches` - Create new branch
- `PATCH /api/v1/churches/{churchId}/branches/{id}` - Update branch
- `DELETE /api/v1/churches/{churchId}/branches/{id}` - Delete branch

## Testing

### Prerequisites
1. Backend server running on `http://localhost:5550`
2. User authenticated with valid session
3. Workspace/church context properly set up

### Development Testing
The component includes a fallback church ID for development testing when workspace context is not available:
- Fallback UUID: `550e8400-e29b-41d4-a716-446655440000`
- Only active in `NODE_ENV === 'development'`
- Shows development mode indicator

### Error Scenarios Handled
1. **Authentication Error (401)**: Shows login prompt
2. **Workspace Not Selected**: Shows workspace selection prompt  
3. **Network/API Errors**: Shows generic error with debug info in development
4. **No Church ID**: Shows appropriate error message

## Files Created/Modified

### Types
- `types/branches.ts` - Branch interfaces and API types
- `types/index.ts` - Added branch types export

### Services
- `lib/services/branches.service.ts` - API service for branch operations

### Hooks
- `hooks/use-branches.ts` - React Query hooks with workspace integration
- `hooks/use-auth.ts` - Updated to provide churchId (with mock data for now)

### Components
- `components/church-settings/BranchesTab.tsx` - Main branches management interface
- `components/church-settings/BranchFormDialog.tsx` - Create/edit branch form
- `components/church-settings/DeleteBranchDialog.tsx` - Delete confirmation dialog
- `components/church-settings/index.ts` - Updated exports
- `components/ui/alert-dialog.tsx` - Added alert dialog component

### Dependencies
- Added `@radix-ui/react-alert-dialog` for delete confirmations

## Features

### Branch List View
- Displays all branches in card format
- Shows branch name, address, contact information
- Empty state when no branches exist
- Loading states during API calls
- Development mode indicator

### Create Branch
- Modal form with validation
- Required fields: name, address, city, state, country, zipCode, phoneNumber, email
- Optional website field
- Form validation using Zod schema

### Edit Branch
- Pre-populated form with existing branch data
- Same validation as create form
- Updates branch information

### Delete Branch
- Confirmation dialog before deletion
- Prevents accidental deletions
- Shows branch name in confirmation message

### Error Handling
- Toast notifications for success/error states
- Proper error messages from API responses
- Loading states during operations
- Authentication and workspace error handling

## Integration Notes

### Authentication
Uses Better Auth cookie-based authentication. The API client automatically includes session cookies with requests.

### Workspace Context
Integrates with the existing `useWorkspace` hook to get the current church ID. Includes fallback for development testing.

### Toast Notifications
Uses the existing Sonner toast system that's already configured in the app.

### Form Validation
Uses React Hook Form with Zod validation, consistent with other forms in the application.

### State Management
Uses React Query for server state management, following the established patterns in the codebase.

## Usage

1. Navigate to Church Settings
2. Click on the "Branches" tab
3. Use "Add Branch" button to create new branches
4. Use the dropdown menu on each branch card to edit or delete
5. All operations provide immediate feedback via toast notifications

## Debugging

The component includes extensive logging in development mode:
- Workspace context information
- API request/response details
- Error details with full stack traces
- Church ID resolution

Check the browser console for detailed debugging information when `NODE_ENV === 'development'`.

## Next Steps

1. **Authentication Setup**: Ensure users are properly authenticated before accessing the feature
2. **Workspace Integration**: Verify workspace context provides correct church ID
3. **Backend Testing**: Test with actual backend API endpoints
4. **Production Testing**: Remove development fallbacks and test with real data

## Future Enhancements

1. **Headquarters Flag**: Add logic to mark one branch as headquarters
2. **Geolocation**: Integrate with mapping services for address validation
3. **Branch Statistics**: Show member counts per branch
4. **Bulk Operations**: Add ability to import/export branches
5. **Branch Images**: Allow uploading branch photos
6. **Advanced Search**: Add filtering and search capabilities

## Dependencies

Make sure these packages are installed:

```bash
npm install @radix-ui/react-alert-dialog
```

All other dependencies are already present in the project.