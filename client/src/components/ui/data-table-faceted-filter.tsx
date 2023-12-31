import { Separator } from "./separator";
import { Button } from "./button";

import React, { Key, useEffect, useState } from "react";
import { Badge } from "./badge";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Check, Filter } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Links } from "@/types/common";

type Props<A> = {
  children: React.ReactNode;
  onSelectedChange: (value: A) => void;
  options: string[];
  ifEmptyLink?: Links;
};
function FacetedFilterButton<A>({
  children,
  onSelectedChange,
  options = [],
  ifEmptyLink,
}: Props<A>) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const filterCount = selectedValues.length || 0;
  const [searchParams] = useSearchParams();
  const optionsLength = options?.length ? true : false;

  // Set State on mount
  useEffect(() => {
    onSelectedChange(selectedValues as unknown as A);
  }, [selectedValues]);

  // Remove if your values do not depends on search params
  useEffect(() => {
    if (searchParams.size === 0) {
      setSelectedValues([]);
    }
  }, [searchParams]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="border-dashed ">
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
              {selectedValues?.map((value) => (
                <React.Fragment key={value}>
                  {value && (
                    <Badge variant="secondary" key={value as Key}>
                      {value as string}{" "}
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
      <PopoverContent align="start" className="p-0 w-auto">
        <Command>
          <CommandInput className="text-xs" placeholder={`Filter by name`} />
          <CommandList>
            <CommandGroup className="">
              {!optionsLength && (
                <span className="text-xs p-4 flex items-center justify-center w-full">
                  No item found.
                  {ifEmptyLink && (
                    <span className="ml-1 text-primary underline">
                      <Link to={ifEmptyLink}> Add</Link>
                    </span>
                  )}
                </span>
              )}
              {optionsLength &&
                options.map((s, i) => (
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
                    className="space-x-2"
                  >
                    <div
                      className={`flex items-center justify-center text-xs w-3 h-3 rounded-sm border text-white ${
                        selectedValues?.includes(s.toLowerCase() as string)
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    >
                      {selectedValues?.includes(s.toLowerCase() as string) && (
                        <Check size="16" />
                      )}
                    </div>
                    <span className="capitalize text-xs">{s as string} </span>
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
