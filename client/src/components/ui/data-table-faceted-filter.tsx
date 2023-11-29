import { Separator } from "./separator";
import { Button } from "./button";

import React, { Key, useEffect, useState } from "react";
import { Badge } from "./badge";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Check, Filter } from "lucide-react";

type Props<A> = {
  children: React.ReactNode;
  onSelectedChange: (value: A) => void;
  options: string[];
};
function FacetedFilterButton<A>({
  children,
  onSelectedChange,
  options,
}: Props<A>) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const filterCount = selectedValues.length || 0;

  // Set State on mount
  useEffect(() => {
    onSelectedChange(selectedValues as unknown as A);
  }, [selectedValues]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-dashed ">
          <span className="flex items-center justify-center gap-2">
            <span>
              {" "}
              <Filter size="16" strokeWidth="1" />
            </span>
            {children}
          </span>

          {filterCount !== 0 && selectedValues?.[0] && (
            <Separator orientation="vertical" className="mx-2 h-4" />
          )}
          {filterCount <= 2 && (
            <div className=" space-x-2">
              {selectedValues?.map((list) => (
                <React.Fragment key={list}>
                  {list && (
                    <Badge variant="secondary" key={list as Key}>
                      {list as string}{" "}
                    </Badge>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
          {filterCount > 2 && (
            <>
              <div className="bg-secondary py-.5 px-1 rounded-md ">
                <span className="text-xs">{filterCount} filters </span>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Command>
          <CommandInput placeholder={`Filter by ${children}`} />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup className="">
              {options?.map((s, i) => (
                <CommandItem
                  key={i}
                  onSelect={(e) => {
                    // If e is not in selectedValue, add it, if it is, return the previous selectedValue
                    setSelectedValues((prev) => {
                      if (prev.includes(e as never)) {
                        return prev.filter((item) => item !== e);
                      } else {
                        return [...prev, e];
                      }
                    });
                  }}
                  className="space-x-1"
                >
                  <div
                    className={`flex items-center justify-center text-xs w-4 h-4 rounded-sm border text-white ${
                      selectedValues?.includes(s as string)
                        ? "bg-primary"
                        : "bg-white"
                    }`}
                  >
                    {selectedValues?.includes(s as string) && (
                      <Check size="16" />
                    )}
                  </div>
                  <span className="capitalize">{s as string} </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <Separator />
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              setSelectedValues([]);
              // filter.current = [];
            }}
          >
            Clear filters
          </Button>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default FacetedFilterButton;
