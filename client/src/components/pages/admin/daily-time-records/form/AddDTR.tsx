import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";

import { useLayoutEffect, useRef } from "react";

import { MutationType } from "@/types/common";
import FormSubmit from "../../shareable/form-submit";

import { useQueryProvider } from "@/components/context/query-provider";
import DTRFields from "./DTRFields";
import { values } from "./form-values";

type Props = {
  toEditItem?: TDataFields;
};

function AddDTR({ toEditItem }: Props) {
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
        <DTRFields form={form} mutationType={MutationType.CREATE} />
      </FormSubmit>
    </Form>
  );
}

export default AddDTR;
