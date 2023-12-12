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
                  ifEmptyLink={Links.PAYROLL_GROUPS}
                />
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      {/* Payroll group select
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Label htmlFor="firstName" className="">
            Payroll Groups
          </Label>

          <p>Optional</p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2 mt-4">
            <PopoverCommand
              label="Payroll Group"
              data={payrollgroupData}
              selectedItem={selectedPayrollGroup}
              onSelect={(d) => {
                setSelectedPayrollGroup(d);
                form.setValue("payrollGroupId", d.id, {
                  shouldDirty: true,
                });
              }}
            />
          </div>
        </div>
        {selectedPayrollGroup?.id && (
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
                    setSelectedPayrollGroup({} as TDataFields);
                    form.setValue("payrollGroupId", "");
                  }}
                >
                  Remove
                </Button>
              </>
            }
          >
            {Object.keys(selectedPayrollGroup).map((key) => (
              <Group assignTo={key} key={key}>
                {selectedPayrollGroup[key as keyof TDataFields] ? (
                  <span ref={payrollgroupDetailsSelect}>
                    {
                      selectedPayrollGroup[
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
      </div> */}
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
                <Input id="designation" {...field} className="sr-only" hidden />
              </FormControl>
              <div className="flex flex-col gap-2">
                <PopoverCommandQuery
                  label="Designation"
                  commandItemRender={(d: TDataFields) => d.name}
                  selected={field}
                  getItem={getDesignations}
                  ifEmptyLink={Links.DESIGNATIONS}
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
