"use client";

import {
  MagnifyingGlass,
  DotsThree,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Subcategory = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
  subcategories: Subcategory[];
};

interface CategoriesTabProps {
  categories: Category[];
  onCreateCategory: () => void;
  onAddSubcategory: (categoryId: number, categoryName: string) => void;
}

export function CategoriesTab({
  categories,
  onCreateCategory,
  onAddSubcategory,
}: CategoriesTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-gray-900">
            Categories
            <span className="ml-2 text-sm font-normal text-gray-500">
              {categories.length}
            </span>
          </h2>
          <Button size="sm" onClick={onCreateCategory}>
            Add category
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white border border-gray-100 rounded-sm hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">
                  {category.name}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-gray-400 hover:text-gray-600"
                    >
                      <DotsThree className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Rename category</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      Delete category
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary-dark h-auto p-0 text-sm"
                  onClick={() => onAddSubcategory(category.id, category.name)}
                >
                  Add subcategory
                </Button>
              </div>
            </div>

            {/* Subcategories */}
            {category.subcategories.length > 0 && (
              <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
                <div className="space-y-1">
                  {category.subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between py-2 px-3 rounded hover:bg-white transition-colors"
                    >
                      <span className="text-sm text-gray-700">{sub.name}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-6 w-6"
                          >
                            <DotsThree className="w-3 h-3 text-gray-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem variant="destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
