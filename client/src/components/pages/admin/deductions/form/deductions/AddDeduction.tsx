import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";

import { useLayoutEffect, useRef } from "react";

import { MutationType } from "@/types/common";
import FormSubmit from "../../../shareable/form-submit";

import { useDeductionQuery } from "../../providers/DeductionsQueryProviders";
import DeductionFields from "./DeductionFields";

type Props = {
  toEditItem?: TDataFields;
};

function AddDeduction({ toEditItem }: Props) {
  const form = useForm<TDataFields>({
    defaultValues: {
      name: toEditItem ? toEditItem.name : "",
      amount: toEditItem ? toEditItem.amount : "",
    },
  });
  const { createMutation } = useDeductionQuery();
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
        <DeductionFields form={form} mutationType={MutationType.CREATE} />
      </FormSubmit>
    </Form>
  );
}

export default AddDeduction;
