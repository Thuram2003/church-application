"use client";

import * as React from "react";
import { Translation } from "@/types/bible";
import { Check, CaretUpDown, Globe } from "@phosphor-icons/react";
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

interface TranslationSelectorProps {
  translations: Translation[];
  selectedTranslation: string;
  onTranslationChange: (translationId: string) => void;
  disabled?: boolean;
}

export function TranslationSelector({
  translations,
  selectedTranslation,
  onTranslationChange,
  disabled = false,
}: TranslationSelectorProps) {
  const [open, setOpen] = React.useState(false);

  const currentTranslation = translations.find(
    (t) => t.id === selectedTranslation
  );

  // Group translations by language
  const groupedTranslations = translations.reduce((acc, translation) => {
    const lang = translation.languageEnglishName || translation.language;
    if (!acc[lang]) {
      acc[lang] = [];
    }
    acc[lang].push(translation);
    return acc;
  }, {} as Record<string, Translation[]>);

  const handleSelect = (translationId: string) => {
    onTranslationChange(translationId);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-400" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-[200px] justify-between h-10 font-normal"
          >
            {currentTranslation ? (
              <span className="truncate">
                {currentTranslation.shortName} - {currentTranslation.englishName}
              </span>
            ) : (
              "Select translation"
            )}
            <CaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-0 bg-white" align="start">
          <Command className="bg-white">
            <CommandInput placeholder="Search translation..." />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>No translation found.</CommandEmpty>
              {Object.entries(groupedTranslations).map(([language, trans]) => (
                <CommandGroup key={language} heading={language}>
                  {trans.map((translation) => (
                    <CommandItem
                      key={translation.id}
                      value={`${translation.shortName} ${translation.englishName} ${translation.name}`}
                      onSelect={() => handleSelect(translation.id)}
                    >
                      <Check
                        weight="bold"
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedTranslation === translation.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{translation.shortName}</span>
                        <span className="text-xs text-gray-500">
                          {translation.englishName}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
