import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";

import { useLayoutEffect, useRef } from "react";

import { MutationType } from "@/types/common";
import { usePayrollGroupQuery } from "../../providers/PayrollGroupProvider";
import PayrollGroupsFields from "./PayrollGroupsFields";
import FormSubmit from "../../../shareable/form-submit";
type Props = {
  toEditItem?: TDataFields;
};

function AddPayrollGroups({ toEditItem }: Props) {
  const form = useForm<TDataFields>({
    defaultValues: {
      name: toEditItem ? toEditItem.name : "",
      fundCluster: toEditItem ? toEditItem.fundCluster : "",
      programName: toEditItem ? toEditItem.programName : "",
    },
  });
  const { createMutation } = usePayrollGroupQuery();
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
        <PayrollGroupsFields<TDataFields>
          form={form}
          mutationType={MutationType.CREATE}
        />
      </FormSubmit>
    </Form>
  );
}

export default AddPayrollGroups;
