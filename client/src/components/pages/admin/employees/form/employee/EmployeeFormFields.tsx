import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-label";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import Group from "../../ui/group";
import { MutationType } from "@/types/common";
import { cn } from "@/lib/utils";

import { getDesignations } from "../../api/designation.api";
import { useQuery } from "@tanstack/react-query";
import GroupContainer from "../../ui/group-container";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";

type Props = {
  form: UseFormReturn<TDataFields & FieldValues, unknown, undefined>;
  mutationType: MutationType;
};

function EmployeeFormFields<T extends TDataFields>({
  form,
  mutationType = MutationType.CREATE,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);
  const { data } = useQuery(getDesignations());
  const designationData = data?.data.data ? data.data.data : [];

  const [selectedDesignation, setSelectedDesignation] = useState<TDataFields>(
    designationData.find(
      (designation: TDataFields) =>
        designation.id === form.getValues("designationId")
    ) || {}
  );
  const designationDetailsSelect = useRef<HTMLSpanElement>(null);

  const scrollToBottom = () => {
    designationDetailsSelect.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedDesignation]);

  return (
    <>
      <FormField
        control={form.control}
        name={"id" as Path<T & FieldValues>}
        render={({ field }) => (
          <FormItem className="sr-only">
            <FormLabel className="text-xs text-foreground">id</FormLabel>
            <FormControl>
              <Input placeholder="column_data" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"employeeId" as Path<T & FieldValues>}
        rules={{
          required: "This field is required",
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-foreground">
              Employee Id
            </FormLabel>
            <FormControl>
              <Input placeholder="column_data" {...field} ref={inputRef} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"firstName" as Path<T & FieldValues>}
        rules={{
          required: "This field is required",
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-foreground">
              First Name
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="column_data" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"middleName" as Path<T & FieldValues>}
        rules={{
          minLength: {
            value: 2,
            message: "Middle name must be at least 2 characters",
          },
        }}
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between">
              <FormLabel className="text-xs text-foreground">
                Middle Name
              </FormLabel>
              <p>Optional</p>
            </div>
            <FormControl>
              <Input {...field} placeholder="column_data" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"lastName" as Path<T & FieldValues>}
        rules={{
          required: "This field is required",
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-foreground">Last Name</FormLabel>
            <FormControl>
              <Input placeholder="column_data" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"age" as Path<T & FieldValues>}
        rules={{
          required: "This field is required",
          validate: (value) => {
            // check if age is number
            if (isNaN(Number(value))) {
              return "Age must be a number";
            }
            return true;
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-foreground">Age</FormLabel>
            <FormControl>
              <Input placeholder="column_data" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Label htmlFor="firstName" className="">
            Payroll Group
          </Label>

          <p>Optional</p>
        </div>
        <div className="bg-card rounded-lg text-muted-foreground border p-4 flex flex-col gap-2">
          <p>
            The following id for this group will be{" "}
            <span className="text-primary">added</span>:{" "}
          </p>
          <div className="flex flex-col gap-4 items-start">
            <Group assignTo="id">023023020302032</Group>
            <Group assignTo="cluster"> NIFEP/BASIL</Group>
            <Group assignTo="project_name">
              CARPS FINGERLING PRODUCTION AND HATCHERY
              DEVELOPMENT/ADMINISTRATION AND OPERATION OF NIFTC/BASIL
            </Group>
          </div>
          <div className="space-x-2 mt-4">
            <Button variant="outline" size="sm" className="text-foreground">
              Edit group{" "}
            </Button>
            <Button variant="outline" size="sm" className="text-foreground">
              Remove
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Label htmlFor="firstName" className="">
            Payroll Group
          </Label>

          <p>Optional</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="self-start bg-background "
        >
          Add payroll group
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Label htmlFor="firstName" className="">
            Designation
          </Label>

          <p>Optional</p>
        </div>
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
                    !selectedDesignation?.name && "text-muted-foreground"
                  )}
                >
                  {selectedDesignation?.name ? (
                    designationData.find(
                      (designation: TDataFields) =>
                        designation.name === selectedDesignation?.name
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
                    {designationData.map((designation: TDataFields) => (
                      <CommandItem
                        value={designation.name}
                        key={designation.id}
                        className="text-xs"
                        onSelect={() => {
                          setSelectedDesignation(designation);
                          form.setValue("designationId", designation.id, {
                            shouldDirty: true,
                          });
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            designation.name === designationData.name
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
          </div>
        </div>
        {selectedDesignation?.id && (
          <GroupContainer>
            {Object.keys(selectedDesignation).map((key) => (
              <Group assignTo={key} key={key}>
                {selectedDesignation[key as keyof TDataFields] ? (
                  <span ref={designationDetailsSelect}>
                    {selectedDesignation[key as keyof TDesignation]}
                  </span>
                ) : (
                  <span className="text-muted-foreground">No data</span>
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
          <Button id="sheetCloseBtn" variant="outline" type="button">
            Cancel
          </Button>
        </SheetClose>

        <Button variant="default" type="submit">
          {mutationType === MutationType.CREATE
            ? "Create Column"
            : "Update Column"}
        </Button>
      </SheetFooter>
    </>
  );
}

export default EmployeeFormFields;
