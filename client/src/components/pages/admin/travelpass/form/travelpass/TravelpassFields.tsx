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

import { useLayoutEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  GetQueryType,
  IconProperties,
  MutationType,
  TravelpassType,
} from "@/types/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, CheckIcon, Loader2 } from "lucide-react";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../../../employees/api/employee.api";
import PopoverCommand from "@/components/ui/popover-command";
import GroupContainer from "../../../employees/ui/group-container";
import Group from "../../../employees/ui/group";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CommandItem } from "@/components/ui/command";
import FormatToFullName from "@/components/ui/format-to-fullname";

type Props = {
  form: UseFormReturn<TDataFields, unknown, undefined>;
  mutationType: MutationType;
};

function TravelpassFields({ form, mutationType = MutationType.CREATE }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: queryData,
    isPending: isEmployeePending,
    isSuccess: isEmployeeSuccess,
  } = useQuery(getEmployees({ type: GetQueryType.ALL }));

  const employeeData = queryData?.data.data || [];
  const employeeDetailsSelect = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <>
      <FormField
        control={form.control}
        name={"id"}
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
        name={"userId"}
        rules={{
          required: "This field is required",
          maxLength: {
            value: 100,
            message: "Name must be 100 characters long",
          },
        }}
        render={({ field }) => {
          const selectedEmployee: TDataFields =
            employeeData.find((d: TDataFields) => d.id === field.value) || {};
          console.log(selectedEmployee);
          return (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel className="text-xs text-foreground">Name</FormLabel>
              </div>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col gap-2 mt-4">
                    <PopoverCommand
                      label="Employee"
                      buttonTrigger={
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            " justify-between text-xs ",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            <FormatToFullName
                              firstName={selectedEmployee.firstName}
                              middleName={selectedEmployee.middleName}
                              lastName={selectedEmployee.lastName}
                            />
                          ) : (
                            <span>Select Employee</span>
                          )}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      }
                      commandItems={
                        <>
                          {isEmployeePending && (
                            <span>
                              <Loader2
                                size={IconProperties.SIZE}
                                className="animate-spin"
                              />
                            </span>
                          )}
                          {isEmployeeSuccess &&
                            employeeData.map((d: TDataFields) => (
                              <CommandItem
                                value={d.id}
                                key={d.id}
                                className="text-xs"
                                onSelect={() => {
                                  form.setValue("userId", d.id, {
                                    shouldDirty: true,
                                  });
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    d.employeeId === selectedEmployee?.userId
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <FormatToFullName
                                  firstName={d.firstName}
                                  middleName={d.middleName}
                                  lastName={d.lastName}
                                />
                              </CommandItem>
                            ))}
                        </>
                      }
                    />
                  </div>
                </div>
                {field?.value && (
                  <GroupContainer
                    groupActions={
                      <>
                        <Button variant="outline" size="sm" type="button">
                          Edit Group
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          type="button"
                          onClick={() => {
                            field.onChange("");
                          }}
                        >
                          Remove
                        </Button>
                      </>
                    }
                  >
                    {Object.keys(selectedEmployee).map((key) => (
                      <Group assignTo={key} key={key}>
                        {selectedEmployee[key as keyof TDataFields] ? (
                          <span ref={employeeDetailsSelect}>
                            {
                              selectedEmployee[
                                key as keyof TDataFields
                              ] as React.ReactNode
                            }
                          </span>
                        ) : (
                          <span className="text-muted-foreground">No data</span>
                        )}
                      </Group>
                    ))}
                  </GroupContainer>
                )}
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name={"typeOf"}
        rules={{
          required: "This field is required",
          validate: (value) =>
            Object.values(TravelpassType).includes(value) ||
            "Type of must be either Official Business(O.B) or Travel Order(T.O)",

          maxLength: {
            value: 50,
            message: "Travelpass type must be 50 characters long",
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-foreground">Type of</FormLabel>

            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="text-xs">
                  {field.value ? field.value : "Select Travel Type"}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(TravelpassType).map((type) => (
                  <SelectItem key={type} value={type} className="captalize">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"start"}
        rules={{
          required: "This field is required",
        }}
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between">
              <FormLabel className="text-xs text-foreground">
                Start date
              </FormLabel>
            </div>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Pick a start date for travelpass</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="flex w-auto flex-col space-y-2 p-2"
                >
                  <Select
                    onValueChange={(value) => {
                      field.onChange(addDays(new Date(), parseInt(value)));
                      value
                        ? form.setValue(
                            "end",
                            String(addDays(new Date(value), 1))
                          )
                        : form.setValue("end", "");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Today</SelectItem>
                      <SelectItem value="1">Tomorrow</SelectItem>
                      <SelectItem value="3">In 3 days</SelectItem>
                      <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={(date) => {
                        field.onChange(date);
                        date
                          ? form.setValue(
                              "end",
                              String(addDays(new Date(date), 1))
                            )
                          : form.setValue("end", "");
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"end"}
        rules={{
          required: "This field is required",
        }}
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between">
              <FormLabel className="text-xs text-foreground">
                End date
              </FormLabel>
            </div>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Pick end date for travelpass</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="flex w-auto flex-col space-y-2 p-2"
                >
                  <Select
                    onValueChange={(value) => {
                      field.onChange(addDays(new Date(), parseInt(value)));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Today</SelectItem>
                      <SelectItem value="1">Tomorrow</SelectItem>
                      <SelectItem value="3">In 3 days</SelectItem>
                      <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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

export default TravelpassFields;
