import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";

import { useLayoutEffect, useRef } from "react";

import FormSubmit from "../../../shareable/form-submit";
import { MutationType } from "@/types/common";
import EmployeeFormFields from "./EmployeeFormFields";
import { useQueryProvider } from "@/components/context/query-provider";
type Props = {
  toEditItem?: TDataFields;
};

function AddEmployee({ toEditItem }: Props) {
  const form = useForm<TDataFields>({
    defaultValues: {
      employeeId: toEditItem ? toEditItem.employeeId : "",
      rfId: toEditItem ? toEditItem.rfId : "",
      firstName: toEditItem ? toEditItem.firstName : "",
      lastName: toEditItem ? toEditItem.lastName : "",
      age: toEditItem ? toEditItem.age : "",
      designationId: toEditItem ? toEditItem.designationId : "",
      payrollGroupId: toEditItem ? toEditItem.payrollGroupId : "",
      deductions: toEditItem ? toEditItem.deductions : [],
    },
  });
  const { createMutation } = useQueryProvider();
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <Form {...form}>
      <FormSubmit<TDataFields>
        form={form}
        mutation={createMutation}
        mutationType={MutationType.CREATE}
      >
        <EmployeeFormFields<TDataFields>
          form={form}
          mutationType={MutationType.CREATE}
        />
      </FormSubmit>
    </Form>
  );
}

export default AddEmployee;
