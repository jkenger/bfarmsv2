import DropDownEditSheet from "@/components/ui/dd-edit-sheet";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import FormSubmit from "../../../shareable/form-submit";
import { MutationType, Tables } from "@/types/common";
import { useDeductionQuery } from "../../providers/DeductionsQueryProviders";
import DeductionFields from "./DeductionFields";

type Props<T> = {
  toEditItem?: T;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  from?: "tableAction" | string;
};

function EditDeduction<T extends TDataFields>({
  open,
  onOpen,
  toEditItem,
  from,
}: Props<T>) {
  const form = useForm<TDataFields>({
    values: {
      id: toEditItem ? toEditItem.id : "",
      name: toEditItem ? toEditItem.name : "",
      amount: toEditItem ? toEditItem.amount : "",
    } as TDataFields,
  });

  const { editMutation } = useDeductionQuery();

  return from === "tableAction" ? (
    <DropDownEditSheet table={Tables.TRAVELPASS} open={open} onOpen={onOpen}>
      <Form {...form}>
        <FormSubmit<TDataFields>
          mutation={editMutation}
          form={form}
          mutationType={MutationType.UPDATE}
        >
          <DeductionFields form={form} mutationType={MutationType.UPDATE} />
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
        <DeductionFields form={form} mutationType={MutationType.UPDATE} />
      </FormSubmit>
    </Form>
  );
}

export default EditDeduction;
