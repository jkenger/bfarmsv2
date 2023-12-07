import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";

import { useLayoutEffect, useRef } from "react";

import FormSubmit from "../form-submit";
import { useEmployeeQuery } from "../../providers/EmployeeQueryProvider";
import { MutationType } from "@/types/common";
import EmployeeFormFields from "./EmployeeFormFields";
type Props = {
  toEditItem?: TDataFields;
};

function AddEmployee({ toEditItem }: Props) {
  const form = useForm<TDataFields>({
    defaultValues: {
      employeeId: toEditItem ? toEditItem.employeeId : "",
      firstName: toEditItem ? toEditItem.firstName : "",
      lastName: toEditItem ? toEditItem.lastName : "",
      age: toEditItem ? toEditItem.age : "",
      designationId: toEditItem ? toEditItem.designationId : "",
    },
  });
  const { createMutation } = useEmployeeQuery();
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <Form {...form}>
      <FormSubmit<TDataFields> form={form} mutation={createMutation}>
        <EmployeeFormFields<TDataFields>
          form={form}
          mutationType={MutationType.CREATE}
        />
      </FormSubmit>
    </Form>
  );
}

export default AddEmployee;
