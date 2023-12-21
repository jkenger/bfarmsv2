import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";

import { useLayoutEffect, useRef } from "react";

import FormSubmit from "../../../shareable/form-submit";
import { MutationType } from "@/types/common";
import EmployeeFormFields from "./EmployeeFormFields";
import { useQueryProvider } from "@/components/context/query-provider";
import { values } from "./form-values";
type Props = {
  toEditItem?: TDataFields;
};

function AddEmployee({ toEditItem }: Props) {
  const form = useForm<TDataFields>({
    defaultValues: values(toEditItem),
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
