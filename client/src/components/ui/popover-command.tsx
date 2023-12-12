import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

import { Command, CommandEmpty, CommandGroup } from "./command";

import { FormControl } from "./form";
import { Input } from "./input";

type Props = {
  buttonTrigger: React.ReactNode;
  commandItems: React.ReactNode;
  label?: string;
  formControl?: boolean;
};

// TODO: revision of popup command, think of a better way to implement this component
// TODO: travelpass delete function is not working, it says 404 not found even though the id is correct

function PopoverCommand({ buttonTrigger, commandItems, label }: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <FormControl>
        <PopoverTrigger asChild>{buttonTrigger}</PopoverTrigger>
      </FormControl>
      <PopoverContent className="p-0 ">
        {/* <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">{commandItems}</CommandGroup>
          </CommandList>
          <div className="mr-3">
            <DataTablePaginationNoBtn numOfPages={numOfPages} />
          </div>
        </CommandDialog> */}
        <Command className="">
          <Input className="text-xs" placeholder="Search for an item" />

          <CommandGroup
            heading={label + "s"}
            className="h-auto max-h-48 overflow-y-scroll"
          >
            <CommandEmpty className="text-xs p-4 text-center">
              No {label ? label : "item"} found.
            </CommandEmpty>
            {commandItems}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverCommand;
