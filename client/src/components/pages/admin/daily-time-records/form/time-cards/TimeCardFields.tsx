import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";

import { useLayoutEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";

import { Links, MutationType } from "@/types/common";
import { FormDateRangePicker } from "@/components/ui/form-date-range-picker";
import { Label } from "@/components/ui/label";
import PopoverCommandQuery from "@/components/ui/popover-command-query";
import { getEmployees } from "../../../employees/api/employee.api";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  form: UseFormReturn<TDataFields, unknown, undefined>;
  mutationType: MutationType;
};

function TimeCardFields({ form, mutationType = MutationType.CREATE }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

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
      <FormDateRangePicker form={form} />
      <FormField
        control={form.control}
        name="isAllEmployees"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Create for All Employees</FormLabel>
              <FormDescription>
                If checked, this will create a time card for all employees.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      {!form.getValues("isAllEmployees") ? (
        <FormField
          control={form.control}
          name="employeeId"
          rules={{ required: "This field is required" }}
          render={({ field }) => {
            return (
              <FormItem>
                <div className="flex justify-between">
                  <Label htmlFor="payrollGroup" className="">
                    Employee
                  </Label>
                </div>
                <FormControl>
                  <Input {...field} className="sr-only" />
                </FormControl>
                <div className="flex flex-col gap-2">
                  <PopoverCommandQuery
                    label="Employee"
                    commandItemRender={(d: TDataFields) => d.fullName}
                    selected={field}
                    getItem={getEmployees}
                    displayField="fullName"
                    ifEmptyLink={Links.EMPLOYEES}
                    groupSelect={[
                      "fullName",
                      "age",
                      "payrollGroupId",
                      "designationId",
                      "employeeId",
                    ]}
                  />
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      ) : null}

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

export default TimeCardFields;
