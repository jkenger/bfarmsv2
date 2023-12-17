import DropDownEditSheet from "@/components/ui/dd-edit-sheet";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { MutationType, Tables } from "@/types/common";

import { useLeaveTypeQuery } from "../providers/LeaveTypeQueryProviders";
import LeaveTypesFields from "./LeaveTypesFields";
import FormSubmit from "../../../shareable/form-submit";

type Props<T> = {
  toEditItem?: T;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  from?: "tableAction" | string;
};

function EditLeaveType<T extends TDataFields>({
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
    } as TDataFields,
  });

  const { editMutation } = useLeaveTypeQuery();

  return from === "tableAction" ? (
    <DropDownEditSheet table={Tables.DESIGNATIONS} open={open} onOpen={onOpen}>
      <Form {...form}>
        <FormSubmit<TDataFields>
          mutation={editMutation}
          form={form}
          mutationType={MutationType.UPDATE}
        >
          <LeaveTypesFields form={form} mutationType={MutationType.UPDATE} />
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
        <LeaveTypesFields form={form} mutationType={MutationType.UPDATE} />
      </FormSubmit>
    </Form>
  );
}

export default EditLeaveType;
