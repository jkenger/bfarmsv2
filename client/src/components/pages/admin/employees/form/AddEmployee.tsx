import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";

import { useLayoutEffect, useRef } from "react";

import FormSubmit from "./form-submit";
import { useEmployeeQuery } from "../providers/EmployeeQueryProvider";
type Props = {
  toEditItem?: TAdminForms;
};

function AddEmployee({ toEditItem }: Props) {
  const form = useForm<TAdminForms>({
    defaultValues: {
      employeeId: toEditItem ? toEditItem.employeeId : "",
      firstName: toEditItem ? toEditItem.firstName : "",
      lastName: toEditItem ? toEditItem.lastName : "",
      age: toEditItem ? toEditItem.age : "",
    },
  });
  const { createMutation } = useEmployeeQuery();
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <Form {...form}>
      <FormSubmit<TAdminForms> form={form} mutation={createMutation} />
    </Form>
  );
}

export default AddEmployee;
