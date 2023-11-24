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
import { Loader2 } from "lucide-react";

import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { createEmployee, editEmployee } from "../api/employee.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconProperties } from "@/types/common";
import { useLayoutEffect, useRef } from "react";
import Group from "./group";

type Props<T> = {
  session: "create" | "edit";
  form: UseFormReturn<TEmployeeInputs, unknown, undefined>;
  items?: T;
};

function FormSubmit<T extends TTableActions>({ session, form }: Props<T>) {
  const queryClient = useQueryClient();
  const action = session === "create" ? createEmployee : editEmployee;
  const { mutate, isPending: isSubmitting } = useMutation(
    action({ queryClient, form })
  );
  const onSubmit: SubmitHandler<TEmployeeInputs> = (data) => {
    mutate({
      ...data,
      age: Number(data.age),
    });
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-4 text-xs flex flex-col gap-4"
    >
      <FormField
        control={form.control}
        name="id"
        render={({ field }) => (
          <FormItem className="sr-only">
            <FormLabel className="text-xs">id</FormLabel>
            <FormControl>
              <Input
                placeholder="column_data"
                {...field}
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="employeeId"
        rules={{
          required: "This field is required",
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Employee Id</FormLabel>
            <FormControl>
              <Input
                placeholder="column_data"
                {...field}
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="firstName"
        rules={{
          required: "This field is required",
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">First Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="column_data"
                ref={inputRef}
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        rules={{
          required: "This field is required",
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Last Name</FormLabel>
            <FormControl>
              <Input
                placeholder="column_data"
                {...field}
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="age"
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
            <FormLabel className="text-xs">Age</FormLabel>
            <FormControl>
              <Input
                placeholder="column_data"
                {...field}
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Label htmlFor="firstName" className="">
            Payroll Group
          </Label>

          <p>Optional</p>
        </div>
        <div className="bg-card rounded-lg text-muted-foreground border p-4 flex flex-col gap-2">
          <p>
            The following id for this group will be{" "}
            <span className="text-primary">added</span>:{" "}
          </p>
          <div className="flex flex-col gap-4 items-start">
            <Group assignTo="id">023023020302032</Group>
            <Group assignTo="cluster"> NIFEP/BASIL</Group>
            <Group assignTo="project_name">
              CARPS FINGERLING PRODUCTION AND HATCHERY
              DEVELOPMENT/ADMINISTRATION AND OPERATION OF NIFTC/BASIL
            </Group>
          </div>
          <div className="space-x-2 mt-4">
            <Button variant="outline" size="sm" className="text-foreground">
              Edit group{" "}
            </Button>
            <Button variant="outline" size="sm" className="text-foreground">
              Remove
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Label htmlFor="firstName" className="">
            Payroll Group
          </Label>

          <p>Optional</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="self-start bg-background "
        >
          Add payroll group
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Label htmlFor="firstName" className="">
            Designation
          </Label>

          <p>Optional</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="self-start bg-background "
        >
          Add designation
        </Button>
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
        <Button variant="default" type="submit" disabled={isSubmitting}>
          {isSubmitting && (
            <Loader2
              size={IconProperties.SIZE}
              strokeWidth={IconProperties.STROKE_WIDTH}
              className="text-primary-foreground animate-spin"
            />
          )}
          Add Column
        </Button>
      </SheetFooter>
    </form>
  );
}

export default FormSubmit;
