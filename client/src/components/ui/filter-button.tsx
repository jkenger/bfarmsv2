import { Separator } from "./separator";
import { Button } from "./button";

import React, { Key } from "react";
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
import { Check } from "lucide-react";

type Props<A, O> = {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;

  // How do I make these two generic?
  // I want to be able to use this component for both JobStatus and JobType

  list?: string[]; // Can also be JobType type as well
  setList: (name: A, value: O) => void;
  paramName: string;
  options: string[]; // Can be JobType type as well
  filter: React.MutableRefObject<string[]>;
};

function FilterButton<A, O>({
  children,
  icon,
  title,
  list,
  setList,
  filter,
  options,
  paramName,
}: Props<A, O>) {
  const filterCount = list?.length || 0;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-dashed w-full lg:w-auto">
          <span className="flex items-center justify-center gap-1">
            {icon}
            {children}
          </span>

          {filterCount !== 0 && list?.[0] && (
            <Separator orientation="vertical" className="mx-2 h-4" />
          )}
          {filterCount <= 2 && (
            <div className=" space-x-2">
              {list?.map((list) => (
                <React.Fragment key={list}>
                  {list && (
                    <Badge key={list as Key} className="capitalize">
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
          <CommandInput placeholder={`Filter by ${title}`} />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup className="">
              {options?.map((s, i) => (
                <CommandItem
                  key={i}
                  onSelect={() => {
                    filter.current = filter.current.includes(s)
                      ? [...filter.current.filter((f) => f !== s)]
                      : [...filter.current, s];
                    setList(paramName as A, filter.current as O);
                  }}
                  className="space-x-1"
                >
                  <div
                    className={`flex items-center justify-center text-xs w-4 h-4 rounded-sm border text-white ${
                      list?.includes(s as string) ? "bg-primary" : "bg-white"
                    }`}
                  >
                    {list?.includes(s as string) && <Check />}
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
              setList(paramName as A, [] as O);
              filter.current = [];
            }}
          >
            Clear filters
          </Button>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default FilterButton;
