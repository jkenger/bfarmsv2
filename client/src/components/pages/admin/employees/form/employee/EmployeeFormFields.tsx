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
import { useEffect, useLayoutEffect, useRef } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { MutationType } from "@/types/common";

import { getDesignations } from "../../api/designation.api";
import { useQuery } from "@tanstack/react-query";
import GroupContainer from "../../ui/group-container";

import PopoverCommand from "@/components/ui/popover-command";
import { getPayrollGroups } from "../../../payroll/api/payrollGroups.api";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CommandItem } from "@/components/ui/command";
import { CheckIcon, Loader2 } from "lucide-react";
import { useScrollToView } from "@/components/hooks/useScrollToView";
import GroupItem from "@/components/ui/group-item";

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
  const {
    data: ddataResult,
    isPending: isDesignationPending,
    isSuccess: isDesignationSuccess,
  } = useQuery(getDesignations({ type: "all" }));
  const designationData = ddataResult?.data.data ? ddataResult.data.data : [];

  const designationDetailsSelect = useRef<HTMLSpanElement>(null);

  // Payrollgroup constants/query for facetedfilter
  const {
    data: pgdataResult,
    isPending: isPayrollGroupPending,
    isSuccess: isPayrollGroupSuccess,
  } = useQuery(getPayrollGroups({ type: "all" }));
  const payrollgroupData = pgdataResult?.data.data
    ? pgdataResult.data.data
    : [];

  const payrollgroupDetailsSelect = useRef<HTMLSpanElement>(null);

  const scrollToView = useScrollToView();

  useEffect(() => {
    if (designationDetailsSelect.current) {
      scrollToView(designationDetailsSelect);
    }
  }, [form.getValues("designationId")]);

  useEffect(() => {
    if (payrollgroupDetailsSelect.current) {
      scrollToView(payrollgroupDetailsSelect);
    }
  }, [form.getValues("payrollGroupId")]);

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
          const selectedPayrollGroup: TDataFields = payrollgroupData.find(
            (payrollgroup: TDataFields) => payrollgroup.id === field.value
          );
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
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <PopoverCommand
                      label="PayrollGroup"
                      formControl={true}
                      buttonTrigger={
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            " justify-between text-xs ",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {selectedPayrollGroup ? (
                            selectedPayrollGroup.name
                          ) : (
                            <span>Select Payroll Group</span>
                          )}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      }
                      commandItems={
                        <>
                          {isPayrollGroupPending && (
                            <div className="py-4 flex items-center justify-center">
                              <Loader2 className="animate-spin" />
                            </div>
                          )}
                          {isPayrollGroupSuccess &&
                            payrollgroupData.map((d: TDataFields) => (
                              <CommandItem
                                value={d.id}
                                key={d.id}
                                className="text-xs"
                                onSelect={() => {
                                  form.setValue("payrollGroupId", d.id, {
                                    shouldDirty: true,
                                  });
                                  scrollToView(payrollgroupDetailsSelect);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    d.id === selectedPayrollGroup?.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {d.name}
                              </CommandItem>
                            ))}
                        </>
                      }
                    />
                  </div>
                </div>
                {selectedPayrollGroup?.name && (
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
                    {Object.keys(selectedPayrollGroup).map((key) => (
                      <GroupItem
                        detailsSelect={payrollgroupDetailsSelect}
                        selectedItem={selectedPayrollGroup}
                        objectKey={key}
                        key={key}
                      />
                    ))}
                  </GroupContainer>
                )}
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
          const selectedDesignation: TDataFields = designationData.find(
            (designation: TDataFields) => designation.id === field.value
          );
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
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <PopoverCommand
                      label="Designation"
                      formControl={true}
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
                            selectedDesignation.name
                          ) : (
                            <span>Select Designation</span>
                          )}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      }
                      commandItems={
                        <>
                          {isDesignationPending && (
                            <div className="py-4 flex items-center justify-center">
                              <Loader2 className="animate-spin" />
                            </div>
                          )}
                          {isDesignationSuccess &&
                            designationData.map((d: TDataFields) => (
                              <CommandItem
                                value={d.id}
                                key={d.id}
                                className="text-xs"
                                onSelect={() => {
                                  form.setValue("designationId", d.id, {
                                    shouldDirty: true,
                                  });
                                  scrollToView(payrollgroupDetailsSelect);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    d.id === selectedDesignation?.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {d.name}
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
                    {Object.keys(selectedDesignation).map((key) => (
                      <GroupItem
                        detailsSelect={designationDetailsSelect}
                        selectedItem={selectedDesignation}
                        objectKey={key}
                        key={key}
                      />
                    ))}
                  </GroupContainer>
                )}
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
