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

import { getEmployees } from "../../employees/api/employee.api";
import FormatToFullName from "@/components/ui/format-to-fullname";
import PopoverCommandQuery from "@/components/ui/popover-command-query";

type Props = {
  form: UseFormReturn<TDataFields, unknown, undefined>;
  mutationType: MutationType;
};

function DTRFields({ form, mutationType = MutationType.CREATE }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  const regex =
    /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}, ([0-9]|1[0-2]):[0-5][0-9]:[0-5][0-9] (AM|PM)$/;

  const validateString = (inputString: string) => {
    return regex.test(inputString);
  };

  const timeInputValidate = (value: string) => {
    if (value) {
      if (!validateString(value)) {
        return "Invalid time format. Please use mm/dd/YYYY, HH:mm:ss AM/PM format";
      }
    }
  };

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
            message: "userId must be 100 characters long",
          },
        }}
        render={({ field }) => {
          return (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel className="text-xs text-foreground">User</FormLabel>
              </div>
              <FormControl>
                <Input {...field} className="sr-only" />
              </FormControl>
              <div className="flex flex-col gap-2">
                <PopoverCommandQuery
                  label="Employee"
                  commandItemRender={(d: TDataFields) => (
                    <FormatToFullName
                      firstName={d.firstName}
                      middleName={d.middleName}
                      lastName={d.lastName}
                    />
                  )}
                  ifEmptyLink={Links.EMPLOYEES}
                  selected={field}
                  getItem={getEmployees}
                  displayField="fullName"
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

      <FormField
        control={form.control}
        name={"amTimeIn"}
        rules={{
          validate: timeInputValidate,
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-foreground">
              AM Time In
            </FormLabel>
            <FormControl>
              <Input className="text-xs" placeholder="HH:mm:ss" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"amTimeOut"}
        rules={{
          validate: timeInputValidate,
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-foreground">
              AM Time Out
            </FormLabel>
            <FormControl>
              <Input className="text-xs" placeholder="HH:mm:ss" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"pmTimeIn"}
        rules={{
          validate: timeInputValidate,
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-foreground">
              PM Time In
            </FormLabel>
            <FormControl>
              <Input className="text-xs" placeholder="HH:mm:ss" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"pmTimeOut"}
        rules={{
          validate: timeInputValidate,
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-foreground">
              PM Time Out
            </FormLabel>
            <FormControl>
              <Input className="text-xs" placeholder="HH:mm:ss" {...field} />
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

export default DTRFields;
