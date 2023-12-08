import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { CheckIcon } from "lucide-react";

type Props = {
  data: TDataFields[];
  selectedItem: TDataFields;
  setSelectedItem?: React.Dispatch<React.SetStateAction<TDataFields>>;
  onSelect: (d: TDataFields) => void;
};

function PopoverCommand({ data, selectedItem, onSelect }: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            " justify-between text-xs ",
            !selectedItem?.name && "text-muted-foreground"
          )}
        >
          {selectedItem?.name ? (
            data.find((d: TDataFields) => d.name === selectedItem?.name)?.name
          ) : (
            <span>Select designation</span>
          )}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            className="text-xs"
            placeholder="Search designations..."
          />
          {!data.length && (
            <CommandEmpty className="text-xs p-4 text-center">
              No designation found.
            </CommandEmpty>
          )}
          <CommandGroup>
            {data.map((d: TDataFields) => (
              <CommandItem
                value={d.name}
                key={d.id}
                className="text-xs"
                onSelect={() => {
                  onSelect(d);
                  setOpen(false);
                }}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    d.name === selectedItem.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {d.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverCommand;
