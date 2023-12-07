import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";

import { useLayoutEffect, useRef } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { MutationType } from "@/types/common";

type Props<T> = {
  form: UseFormReturn<T & FieldValues, unknown, undefined>;
  mutationType: MutationType;
};

function DesignationFormFields<T extends TDataFields>({
  form,
  mutationType = MutationType.CREATE,
}: Props<T>) {
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
        name={"name" as Path<T & FieldValues>}
        rules={{
          required: "This field is required",
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-foreground">Name</FormLabel>
            <FormControl>
              <Input placeholder="column_data" {...field} ref={inputRef} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"description" as Path<T & FieldValues>}
        rules={{
          maxLength: {
            value: 200,
            message: "Description must not exceed 200 characters",
          },
        }}
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between">
              <FormLabel className="text-xs text-foreground">
                Description
              </FormLabel>
              <p>Optional</p>
            </div>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Type your description here."
                className="h-24 text-xs"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"salary" as Path<T & FieldValues>}
        rules={{
          required: "This field is required",
          validate: (value) => {
            // check if age is number
            if (isNaN(Number(value))) {
              return "Salary must be a number";
            }
            return true;
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-foreground">Salary</FormLabel>
            <FormControl>
              <Input placeholder="column_data" {...field} ref={inputRef} />
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

export default DesignationFormFields;
