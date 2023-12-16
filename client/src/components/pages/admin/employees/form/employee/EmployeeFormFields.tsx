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
import { useLayoutEffect, useRef } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { Links, MutationType } from "@/types/common";

import { getDesignations } from "../../api/designation.api";
import { getPayrollGroups } from "../../../payroll/api/payrollGroups.api";

import PopoverCommandQuery from "@/components/ui/popover-command-query";
import { getDeductions } from "../../../deductions/api/deductions.api";
import PopoverCommandQueryMultiple from "@/components/ui/popover-command-query-multiple";

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
            if (Number(value) < 0) {
              return "Age must be above 0 number";
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

      <FormField
        control={form.control}
        name="payrollGroupId"
        render={({ field }) => {
          return (
            <FormItem>
              <div className="flex justify-between">
                <Label htmlFor="payrollGroup" className="">
                  Payroll Groups
                </Label>
                <p>Optional</p>
              </div>
              <FormControl>
                <Input {...field} className="sr-only" />
              </FormControl>
              <div className="flex flex-col gap-2">
                <PopoverCommandQuery
                  label="Payroll Group"
                  commandItemRender={(d: TDataFields) => d.name}
                  selected={field}
                  getItem={getPayrollGroups}
                  displayField="name"
                  ifEmptyLink={Links.PAYROLL_GROUPS}
                />
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      {/* Designation select */}
      <FormField
        control={form.control}
        name="designationId"
        render={({ field }) => {
          return (
            <FormItem>
              <div className="flex justify-between">
                <Label htmlFor="designation" className="">
                  Designation
                </Label>

                <p>Optional</p>
              </div>
              <FormControl>
                <Input
                  id="designation"
                  {...field}
                  value={field.value}
                  className="sr-only"
                  hidden
                />
              </FormControl>
              <div className="flex flex-col gap-2">
                <PopoverCommandQuery
                  label="Designation"
                  commandItemRender={(d: TDataFields) => d.name}
                  selected={field}
                  getItem={getDesignations}
                  displayField="name"
                  ifEmptyLink={Links.DESIGNATIONS}
                />
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="deductions"
        render={({ field }) => {
          return (
            <FormItem>
              <div className="flex justify-between">
                <Label htmlFor="deductions" className="">
                  Deductions
                </Label>
                <p>Optional</p>
              </div>
              <div className="flex flex-col gap-2">
                <PopoverCommandQueryMultiple
                  label="Deduction"
                  commandItemRender={(d: TDataFields) => d.name}
                  selected={field}
                  getItem={getDeductions}
                  ifEmptyLink={Links.PAYROLL_GROUPS}
                  groupSelect={["name", "amount"]}
                />
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
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

export default EmployeeFormFields;
