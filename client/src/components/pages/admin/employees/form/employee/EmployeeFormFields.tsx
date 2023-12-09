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
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import Group from "../../ui/group";
import { MutationType } from "@/types/common";

import { getDesignations } from "../../api/designation.api";
import { useQuery } from "@tanstack/react-query";
import GroupContainer from "../../ui/group-container";

import PopoverCommand from "@/components/ui/popover-command";
import { getPayrollGroups } from "../../../payroll/api/payrollGroups.api";

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

  // Designation constants/query for facetedfilter
  const { data: ddataResult } = useQuery(getDesignations({ type: "all" }));
  const designationData = ddataResult?.data.data ? ddataResult.data.data : [];
  const [selectedDesignation, setSelectedDesignation] = useState<TDataFields>(
    designationData.find(
      (designation: TDataFields) =>
        designation.id === form.getValues("designationId")
    ) || {}
  );
  const designationDetailsSelect = useRef<HTMLSpanElement>(null);

  // Payrollgroup constants/query for facetedfilter
  const { data: pgdataResult } = useQuery(getPayrollGroups({ type: "all" }));
  const payrollgroupData = pgdataResult?.data.data
    ? pgdataResult.data.data
    : [];
  const [selectedPayrollGroup, setSelectedPayrollGroup] = useState<TDataFields>(
    payrollgroupData.find(
      (payrollgroup: TDataFields) =>
        payrollgroup.id === form.getValues("payrollGroupId")
    ) || {}
  );
  const payrollgroupDetailsSelect = useRef<HTMLSpanElement>(null);

  const scrollToBottom = () => {
    designationDetailsSelect.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when designation or payroll group is selected
  useEffect(() => {
    scrollToBottom();
  }, [selectedDesignation, selectedPayrollGroup]);

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

      {/* Payroll group select */}
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
      </div>

      {/* Designation select */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Label htmlFor="firstName" className="">
            Designation
          </Label>

          <p>Optional</p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2 mt-4">
            <PopoverCommand
              label="Designation"
              data={designationData}
              selectedItem={selectedDesignation}
              onSelect={(d) => {
                setSelectedDesignation(d);
                form.setValue("designationId", d.id, {
                  shouldDirty: true,
                });
              }}
            />
          </div>
        </div>
        {selectedDesignation?.id && (
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
                    setSelectedDesignation({} as TDataFields);
                    form.setValue("designationId", "");
                  }}
                >
                  Remove
                </Button>
              </>
            }
          >
            {Object.keys(selectedDesignation).map((key) => (
              <Group assignTo={key} key={key}>
                {selectedDesignation[key as keyof TDataFields] ? (
                  <span ref={designationDetailsSelect}>
                    {
                      selectedDesignation[
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
