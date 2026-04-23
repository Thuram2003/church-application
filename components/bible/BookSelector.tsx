"use client";

import * as React from "react";
import { TranslationBook } from "@/types/bible";
import { Check, CaretUpDown, BookOpen } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BookSelectorProps {
  books: TranslationBook[];
  selectedBook: TranslationBook | null;
  onBookChange: (bookId: string) => void;
  disabled?: boolean;
}

export function BookSelector({
  books,
  selectedBook,
  onBookChange,
  disabled = false,
}: BookSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"old" | "new">("old");

  // Split books into Old Testament (first 39) and New Testament (rest)
  const oldTestament = books.filter((book) => book.order <= 39);
  const newTestament = books.filter((book) => book.order > 39);

  const handleSelect = (bookId: string) => {
    onBookChange(bookId);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <BookOpen className="w-4 h-4 text-gray-400" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-[200px] justify-between h-10 font-normal"
          >
            {selectedBook ? (
              <span className="truncate">{selectedBook.name}</span>
            ) : (
              "Select book"
            )}
            <CaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-0 bg-white" align="start">
          <Command className="bg-white">
            <CommandInput placeholder="Search book..." />
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "old" | "new")} className="w-full">
              <TabsList className="w-full grid grid-cols-2 mx-2 mt-2">
                <TabsTrigger value="old" className="text-xs">
                  Old Testament
                </TabsTrigger>
                <TabsTrigger value="new" className="text-xs">
                  New Testament
                </TabsTrigger>
              </TabsList>

              <TabsContent value="old" className="mt-0">
                <CommandList className="max-h-[300px]">
                  <CommandEmpty>No book found.</CommandEmpty>
                  <CommandGroup>
                    {oldTestament.map((book) => (
                      <CommandItem
                        key={book.id}
                        value={`${book.name} ${book.commonName}`}
                        onSelect={() => handleSelect(book.id)}
                      >
                        <Check
                          weight="bold"
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedBook?.id === book.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className="flex items-center justify-between w-full">
                          <span>{book.name}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            {book.numberOfChapters} ch
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </TabsContent>

              <TabsContent value="new" className="mt-0">
                <CommandList className="max-h-[300px]">
                  <CommandEmpty>No book found.</CommandEmpty>
                  <CommandGroup>
                    {newTestament.map((book) => (
                      <CommandItem
                        key={book.id}
                        value={`${book.name} ${book.commonName}`}
                        onSelect={() => handleSelect(book.id)}
                      >
                        <Check
                          weight="bold"
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedBook?.id === book.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className="flex items-center justify-between w-full">
                          <span>{book.name}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            {book.numberOfChapters} ch
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </TabsContent>
            </Tabs>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
