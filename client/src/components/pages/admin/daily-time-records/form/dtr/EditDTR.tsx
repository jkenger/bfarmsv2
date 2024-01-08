import DropDownEditSheet from "@/components/ui/dd-edit-sheet";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { MutationType, Tables } from "@/types/common";
import FormSubmit from "../../../shareable/form-submit";

import { useQueryProvider } from "@/components/context/query-provider";
import { values } from "./form-values";
import DTRFields from "./DTRFields";

type Props = {
  toEditItem?: TDataFields;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  from?: "tableAction" | string;
};

function EditDTR({ open, onOpen, toEditItem, from }: Props) {
  const form = useForm<TDataFields>({
    values: {
      ...values(toEditItem, "edit"),
      id: toEditItem?.id || "",
    } as TDataFields,
  });

  const { editMutation } = useQueryProvider();

  return from === "tableAction" ? (
    <DropDownEditSheet table={Tables.DESIGNATIONS} open={open} onOpen={onOpen}>
      <Form {...form}>
        <FormSubmit<TDataFields>
          mutation={editMutation}
          form={form}
          mutationType={MutationType.UPDATE}
        >
          <DTRFields form={form} mutationType={MutationType.UPDATE} />
        </FormSubmit>
      </Form>
    </DropDownEditSheet>
  ) : (
    <Form {...form}>
      <FormSubmit<TDataFields>
        mutation={editMutation}
        form={form}
        mutationType={MutationType.UPDATE}
      >
        <DTRFields form={form} mutationType={MutationType.UPDATE} />
      </FormSubmit>
    </Form>
  );
}

export default EditDTR;
