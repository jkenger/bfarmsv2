import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";

import { useLayoutEffect, useRef } from "react";

import { MutationType } from "@/types/common";

import { useLeaveTypeQuery } from "../providers/LeaveTypeQueryProviders";
import LeaveTypesFields from "./LeaveTypesFields";
import FormSubmit from "../../../shareable/form-submit";

type Props = {
  toEditItem?: TDataFields;
};

function AddLeaveType({ toEditItem }: Props) {
  const form = useForm<TDataFields>({
    defaultValues: {
      name: toEditItem ? toEditItem.name : "",
      description: toEditItem ? toEditItem.description : "",
    },
  });
  const { createMutation } = useLeaveTypeQuery();
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
        <LeaveTypesFields form={form} mutationType={MutationType.CREATE} />
      </FormSubmit>
    </Form>
  );
}

export default AddLeaveType;
