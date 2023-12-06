import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import Group from "../../ui/group";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { MutationType } from "@/types/common";
import { toast } from "sonner";
import GroupContainer from "../../ui/group-container";

type Props = {
  data: TDataFields[];
  mutationType: MutationType;
  onSelectDesignation: React.Dispatch<
    React.SetStateAction<TDataFields | undefined>
  >;
};

function AddEmployeeDesignationFormFields({
  data,
  mutationType = MutationType.CREATE,
  onSelectDesignation,
}: Props) {
  const [selectedDesignation, setSelectedDesignation] =
    React.useState<TDataFields>(data[0]);

  const handleOnClick = () => {
    const sheetCloseBtn = document.getElementById("designationSheetCloseBtn");

    if (!selectedDesignation.id) {
      toast.error("Please select a designation");
      return;
    }

    onSelectDesignation(selectedDesignation);
    sheetCloseBtn?.click();
    toast.success(`Designation Selected`, {
      description: "A designation has been successfully selected.",
    });
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-2 mt-4">
        <h1 className="text-xs">Designations</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                " justify-between text-xs ",
                !selectedDesignation.name && "text-muted-foreground"
              )}
            >
              {selectedDesignation.name ? (
                data.find(
                  (designation: TDataFields) =>
                    designation.name === selectedDesignation.name
                )?.name
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
                placeholder="Search language..."
              />
              <CommandEmpty className="text-xs p-4 text-center">
                No designation found.
              </CommandEmpty>
              <CommandGroup>
                {data.map((designation: TDataFields) => (
                  <CommandItem
                    value={designation.name}
                    key={designation.id}
                    className="text-xs"
                    onSelect={() => {
                      setSelectedDesignation(designation);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        designation.name === selectedDesignation.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {designation.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        {selectedDesignation.id && (
          <GroupContainer>
            {Object.keys(selectedDesignation).map((key) => (
              <Group assignTo={key} key={key}>
                {selectedDesignation[key as keyof TDataFields] ? (
                  selectedDesignation[key as keyof TDataFields]
                ) : (
                  <span className="text-muted-foreground">no data</span>
                )}
              </Group>
            ))}
          </GroupContainer>
        )}
      </div>
      <SheetFooter
        id="sheetFooter"
        className="flex justify-end absolute bottom-4 right-4 w-full gap-2"
      >
        <SheetClose asChild>
          <Button id="designationSheetCloseBtn" variant="outline" type="button">
            Cancel
          </Button>
        </SheetClose>

        <Button variant="default" type="button" onClick={handleOnClick}>
          {mutationType === MutationType.CREATE
            ? "Create Column"
            : "Update Column"}
        </Button>
      </SheetFooter>
    </div>
  );
}

export default AddEmployeeDesignationFormFields;
