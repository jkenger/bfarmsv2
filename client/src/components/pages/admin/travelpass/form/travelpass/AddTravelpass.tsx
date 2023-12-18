import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";

import { useLayoutEffect, useRef } from "react";

import { MutationType } from "@/types/common";
import FormSubmit from "../../../shareable/form-submit";
import TravelpassFields from "./TravelpassFields";
import { useQueryProvider } from "@/components/context/query-provider";

type Props = {
  toEditItem?: TDataFields;
};

function AddTravelpass({ toEditItem }: Props) {
  const form = useForm<TDataFields>({
    defaultValues: {
      userId: toEditItem ? toEditItem.userId : "",
      typeOf: toEditItem ? toEditItem.typeOf : "",
      start: toEditItem ? toEditItem.start : "",
      end: toEditItem ? toEditItem.end : "",
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
        <TravelpassFields form={form} mutationType={MutationType.CREATE} />
      </FormSubmit>
    </Form>
  );
}

export default AddTravelpass;
