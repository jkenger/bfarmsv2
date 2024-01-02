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

import { Links, MutationType } from "@/types/common";
import { FormDateRangePicker } from "@/components/ui/form-date-range-picker";
import { Label } from "@/components/ui/label";
import PopoverCommandQuery from "@/components/ui/popover-command-query";
import { getPayrollGroups } from "../../api/payrollGroups.api";

type Props = {
  form: UseFormReturn<TDataFields, unknown, undefined>;
  mutationType: MutationType;
};

function PayrollFields({ form, mutationType = MutationType.CREATE }: Props) {
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
                  groupSelect={["name", "fundCluster", "programName"]}
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

export default PayrollFields;
