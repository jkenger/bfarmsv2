import DropDownEditSheet from "@/components/ui/dd-edit-sheet";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import FormSubmit from "../form-submit";
import { MutationType, Tables } from "@/types/common";
import { useDesignationQuery } from "../../providers/DesignationQueryProvider";
import DesignationFormFields from "../designation/DesignationFormFields";

type Props<T> = {
  toEditItem?: T;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  from?: "tableAction" | string;
};

function EditDesignation<T extends TDataFields>({
  open,
  onOpen,
  toEditItem,
  from,
}: Props<T>) {
  const form = useForm<TDataFields>({
    values: {
      id: toEditItem?.id || "",
      name: toEditItem?.name || "",
      description: toEditItem?.description || "",
      salary: toEditItem?.salary || "",
    } as TDataFields,
  });

  const { editMutation } = useDesignationQuery();

  return from === "tableAction" ? (
    <DropDownEditSheet table={Tables.DESIGNATIONS} open={open} onOpen={onOpen}>
      <Form {...form}>
        <FormSubmit<TDataFields> mutation={editMutation} form={form}>
          <DesignationFormFields<TDataFields>
            form={form}
            mutationType={MutationType.UPDATE}
          />
        </FormSubmit>
      </Form>
    </DropDownEditSheet>
  ) : (
    <Form {...form}>
      <FormSubmit<TDataFields> mutation={editMutation} form={form}>
        <DesignationFormFields<TDataFields>
          form={form}
          mutationType={MutationType.UPDATE}
        />
      </FormSubmit>
    </Form>
  );
}

export default EditDesignation;
