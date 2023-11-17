import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "../api/employee.api";
import { IconProperties } from "@/types";
import { Loader2 } from "lucide-react";

export type TEmployeeInputs = {
  employeeId: string;
  firstName: string;
  lastName: string;
  age: string | number;
};

function EmployeeAddForm() {
  const form = useForm<TEmployeeInputs>({
    defaultValues: {
      employeeId: "",
      firstName: "",
      lastName: "",
      age: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation(
    createEmployee({ queryClient, form })
  );

  const onSubmit: SubmitHandler<TEmployeeInputs> = (data) => {
    mutate({
      ...data,
      age: Number(data.age),
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 text-xs flex flex-col gap-4 text-muted-foreground"
      >
        <FormField
          control={form.control}
          name="employeeId"
          rules={{
            required: "This field is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-muted-foreground">
                Employee Id
              </FormLabel>
              <FormControl>
                <Input placeholder="column_data" {...field} />
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
              <FormLabel className="text-xs text-muted-foreground">
                First Name
              </FormLabel>
              <FormControl>
                <Input placeholder="column_data" {...field} />
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
              <FormLabel className="text-xs text-muted-foreground">
                Last Name
              </FormLabel>
              <FormControl>
                <Input placeholder="column_data" {...field} />
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
              <FormLabel className="text-xs text-muted-foreground">
                Age
              </FormLabel>
              <FormControl>
                <Input placeholder="column_data" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <div className="flex flex-col gap-2">
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
        </div> */}
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
          <Button variant="default" type="submit" disabled={isPending}>
            {isPending && (
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
    </Form>
  );
}

export default EmployeeAddForm;
