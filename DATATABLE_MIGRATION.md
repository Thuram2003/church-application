# DataTable Migration Guide

All tables in the system now use the standardized `DataTable` component for consistency.

## Folder Structure

```
components/
├── calendar/
│   ├── tables/
│   │   └── rooms-columns.tsx
│   ├── CreateRoomDialog.tsx
│   └── index.ts
├── people/
│   ├── tables/
│   │   └── people-columns.tsx
│   ├── CreatePeopleDialog.tsx
│   └── index.ts
├── finances/
│   ├── tables/
│   │   └── giving-columns.tsx
│   ├── CreateGivingDialog.tsx
│   └── index.ts
└── ui/
    ├── data-table.tsx
    └── table.tsx
```

## What's Been Converted

✅ **Rooms** - `app/(calendar)/rooms/page.tsx` → `components/calendar/tables/rooms-columns.tsx`
✅ **People** - `app/(people)/people/page.tsx` → `components/people/tables/people-columns.tsx`
✅ **Giving** - `app/(finances)/giving/page.tsx` → `components/finances/tables/giving-columns.tsx`

## Pattern to Follow

### 1. Create Column Definition File

Create a `tables` subfolder in your feature component folder, then create `{feature}-columns.tsx`:

**Location:** `components/{feature}/tables/{feature}-columns.tsx`

```typescript
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
// ... other imports

export type YourDataType = {
  id: number;
  // ... your fields
};

export const yourColumns: ColumnDef<YourDataType>[] = [
  // Checkbox column (REQUIRED for all tables)
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // ... your data columns
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
    filterFn: (row, id, value) => {
      return row.getValue<string>(id).toLowerCase().includes(value.toLowerCase());
    },
  },
  // Actions column (last column)
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      // ... dropdown menu
    },
  },
];
```

### 2. Update Page Component

```typescript
import { DataTable } from "@/components/ui/data-table";
import { yourColumns, type YourDataType } from "@/components/{feature}/tables/your-columns";

// Type your data
const data: YourDataType[] = [...];

export default function YourPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<YourDataType[]>([]);

  const handleSelectionChange = (selected: YourDataType[]) => {
    setSelectedRows(selected);
    console.log("Selected:", selected);
  };

  return (
    <div>
      {/* ... filters and search */}
      
      <DataTable
        columns={yourColumns}
        data={data}
        searchKey="name" // column to search
        searchValue={searchQuery}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
}
```

### 3. Update Index File

Add export to `components/{feature}/index.ts`:

```typescript
export { yourColumns, type YourDataType } from "./tables/your-columns";
```

### 4. Remove Old Table Imports

Remove these imports:
```typescript
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
```

## Tables Still To Convert

### High Priority
- [ ] `app/(people)/groups/page.tsx`
- [ ] `app/(people)/families/page.tsx`
- [ ] `app/(people)/attendance/page.tsx`
- [ ] `app/(finances)/funds/page.tsx`
- [ ] `app/(finances)/accounting/page.tsx`
- [ ] `app/(finances)/batches/page.tsx`
- [ ] `app/pledges/page.tsx`

### Medium Priority
- [ ] `app/(calendar)/resources/page.tsx`
- [ ] `app/(calendar)/follow-ups/page.tsx`
- [ ] `app/forms/page.tsx`
- [ ] `app/devotion/page.tsx`

### Components
- [ ] `components/users/UsersTab.tsx`
- [ ] `components/users/RolesTab.tsx`
- [ ] `components/financial-settings/PayeesTab.tsx`
- [ ] `components/calendar/CalendarListView.tsx`

## Benefits

✅ **Consistent UI** - All tables look and behave the same
✅ **Built-in Pagination** - Automatic pagination with Previous/Next buttons
✅ **Row Selection** - Checkbox selection with "select all" functionality
✅ **Search/Filter** - Integrated search and filtering
✅ **Sorting** - Column sorting support
✅ **Type Safety** - Full TypeScript support
✅ **Maintainability** - Single source of truth for table behavior

## Column Definition Examples

### With Avatar
```typescript
{
  accessorKey: "name",
  cell: ({ row }) => (
    <div className="flex items-center gap-3">
      <Avatar className="w-8 h-8">
        <AvatarFallback>{row.original.initials}</AvatarFallback>
      </Avatar>
      <span>{row.getValue("name")}</span>
    </div>
  ),
}
```

### With Badge
```typescript
{
  accessorKey: "status",
  cell: ({ row }) => (
    <Badge variant="secondary">
      {row.getValue("status")}
    </Badge>
  ),
}
```

### With Sorting Icon
```typescript
{
  accessorKey: "date",
  header: () => (
    <div className="flex items-center gap-1">
      Date
      <ArrowsDownUp className="w-3 h-3" />
    </div>
  ),
}
```

### Right-Aligned
```typescript
{
  accessorKey: "amount",
  header: () => <div className="text-right">Amount</div>,
  cell: ({ row }) => (
    <div className="text-right">
      XAF {row.getValue<number>("amount").toFixed(2)}
    </div>
  ),
}
```
