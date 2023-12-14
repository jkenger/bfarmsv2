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

import { MutationType } from "@/types/common";

type Props = {
  form: UseFormReturn<TDataFields, unknown, undefined>;
  mutationType: MutationType;
};

function DeductionFields({ form, mutationType = MutationType.CREATE }: Props) {
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

      <FormField
        control={form.control}
        name={"name"}
        rules={{
          required: "This field is required",
          maxLength: {
            value: 100,
            message: "Name must be 100 characters long",
          },
        }}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel className="text-xs text-foreground">Name</FormLabel>
              <FormControl>
                <Input placeholder="column_data" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name={"amount"}
        rules={{
          required: "This field is required",
          maxLength: {
            value: 50,
            message: "Name must be 50 characters long",
          },
          validate: (value) => {
            if (isNaN(Number(value))) {
              return "Amount must be a number";
            }
            if (Number(value) < 0) {
              return "Amount must be above 0 number";
            }
            return true;
          },
        }}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel className="text-xs text-foreground">Amount</FormLabel>
              <FormControl>
                <Input placeholder="column_data" {...field} />
              </FormControl>
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

export default DeductionFields;
