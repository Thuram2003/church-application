# Component Organization Structure

This document outlines the standardized folder structure for components in the project.

## Table Components Structure

All table-related column definitions are organized in `tables/` subfolders within their respective feature folders.

```
components/
├── calendar/
│   ├── tables/
│   │   ├── rooms-columns.tsx          ✅ Implemented
│   │   ├── resources-columns.tsx      ⏳ To be created
│   │   └── follow-ups-columns.tsx     ⏳ To be created
│   ├── CreateRoomDialog.tsx
│   ├── CreateResourceDialog.tsx
│   ├── CalendarView.tsx
│   └── index.ts
│
├── people/
│   ├── tables/
│   │   ├── people-columns.tsx         ✅ Implemented
│   │   ├── groups-columns.tsx         ⏳ To be created
│   │   ├── families-columns.tsx       ⏳ To be created
│   │   └── attendance-columns.tsx     ⏳ To be created
│   ├── CreatePeopleDialog.tsx
│   ├── CreateGroupDialog.tsx
│   └── index.ts
│
├── finances/
│   ├── tables/
│   │   ├── giving-columns.tsx         ✅ Implemented
│   │   ├── funds-columns.tsx          ⏳ To be created
│   │   ├── accounting-columns.tsx     ⏳ To be created
│   │   ├── batches-columns.tsx        ⏳ To be created
│   │   └── pledges-columns.tsx        ⏳ To be created
│   ├── CreateGivingDialog.tsx
│   ├── CreateBatchDialog.tsx
│   └── index.ts
│
├── forms/
│   ├── tables/
│   │   └── forms-columns.tsx          ⏳ To be created
│   ├── CreateFormDialog.tsx
│   └── index.ts
│
├── devotion/
│   ├── tables/
│   │   └── devotion-columns.tsx       ⏳ To be created
│   ├── CreateDevotionDialog.tsx
│   └── index.ts
│
├── users/
│   ├── tables/
│   │   ├── users-columns.tsx          ⏳ To be created
│   │   └── roles-columns.tsx          ⏳ To be created
│   ├── UsersTab.tsx
│   └── RolesTab.tsx
│
└── ui/
    ├── data-table.tsx                 ✅ Core component
    ├── table.tsx                      ✅ Base table styles
    ├── button.tsx
    ├── input.tsx
    └── ...

```

## Naming Conventions

### Column Files
- **Location:** `components/{feature}/tables/`
- **Naming:** `{feature}-columns.tsx` (kebab-case)
- **Export:** Named export for columns array and type

```typescript
// components/people/tables/people-columns.tsx
export type Person = { ... };
export const peopleColumns: ColumnDef<Person>[] = [ ... ];
```

### Dialog/Form Components
- **Location:** `components/{feature}/`
- **Naming:** `Create{Feature}Dialog.tsx` (PascalCase)
- **Export:** Named export

```typescript
// components/people/CreatePeopleDialog.tsx
export function CreatePeopleDialog({ ... }) { ... }
```

### Index Files
- **Location:** `components/{feature}/index.ts`
- **Purpose:** Re-export all public components from the feature folder

```typescript
// components/people/index.ts
export { CreatePeopleDialog } from "./CreatePeopleDialog";
export { peopleColumns, type Person } from "./tables/people-columns";
```

## Import Patterns

### From Pages
```typescript
// ✅ Good - Import from feature folder
import { DataTable } from "@/components/ui/data-table";
import { peopleColumns, type Person } from "@/components/people/tables/people-columns";

// ❌ Bad - Don't import from index if you only need table columns
import { peopleColumns } from "@/components/people";
```

### From Other Components
```typescript
// ✅ Good - Import from index for multiple items
import { CreatePeopleDialog, peopleColumns } from "@/components/people";

// ✅ Also Good - Direct import for single item
import { CreatePeopleDialog } from "@/components/people/CreatePeopleDialog";
```

## Benefits of This Structure

✅ **Clear Separation** - Table definitions are separate from UI components
✅ **Easy to Find** - All table columns are in `tables/` subfolder
✅ **Scalable** - Easy to add new table definitions
✅ **Consistent** - Same pattern across all features
✅ **Type-Safe** - TypeScript types are co-located with columns
✅ **Maintainable** - Changes to table structure are isolated

## Migration Checklist

When converting a table to use DataTable:

- [ ] Create `tables/` subfolder in feature component folder
- [ ] Create `{feature}-columns.tsx` file with column definitions
- [ ] Export type and columns array
- [ ] Update feature `index.ts` to re-export columns
- [ ] Update page to import from new location
- [ ] Replace old Table component with DataTable
- [ ] Add selection handler
- [ ] Test pagination, sorting, and selection
- [ ] Remove old Table imports

## Quick Reference

| Feature | Column File | Page |
|---------|-------------|------|
| Rooms | `components/calendar/tables/rooms-columns.tsx` | `app/(calendar)/rooms/page.tsx` |
| People | `components/people/tables/people-columns.tsx` | `app/(people)/people/page.tsx` |
| Giving | `components/finances/tables/giving-columns.tsx` | `app/(finances)/giving/page.tsx` |
| Groups | `components/people/tables/groups-columns.tsx` | `app/(people)/groups/page.tsx` |
| Families | `components/people/tables/families-columns.tsx` | `app/(people)/families/page.tsx` |
| Funds | `components/finances/tables/funds-columns.tsx` | `app/(finances)/funds/page.tsx` |
| Batches | `components/finances/tables/batches-columns.tsx` | `app/(finances)/batches/page.tsx` |
| Pledges | `components/finances/tables/pledges-columns.tsx` | `app/pledges/page.tsx` |
