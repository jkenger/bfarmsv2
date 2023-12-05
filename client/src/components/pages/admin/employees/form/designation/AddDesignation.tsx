import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";

import { useLayoutEffect, useRef } from "react";

import FormSubmit from "../form-submit";
import DesignationFormFields from "./DesignationFormFields";
import { MutationType, Tables } from "@/types/common";
import { useDesignationQuery } from "../../providers/DesignationQueryProvider";
type Props = {
  toEditItem?: TDataFields;
};

function AddDesignation({ toEditItem }: Props) {
  const form = useForm<TDataFields>({
    defaultValues: {
      name: toEditItem ? toEditItem.name : "",
      description: toEditItem ? toEditItem.description : "",
      salary: toEditItem ? toEditItem.salary : "",
    },
  });
  const { createMutation } = useDesignationQuery();
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <Form {...form}>
      <FormSubmit<TDataFields>
        form={form}
        mutation={createMutation}
        from={Tables.DESIGNATIONS}
      >
        <DesignationFormFields<TDataFields>
          form={form}
          mutationType={MutationType.CREATE}
        />
      </FormSubmit>
    </Form>
  );
}

export default AddDesignation;
