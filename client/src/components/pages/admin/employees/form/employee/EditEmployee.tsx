import DropDownEditSheet from "@/components/ui/dd-edit-sheet";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import FormSubmit from "../form-submit";
import { useEmployeeQuery } from "../../providers/EmployeeQueryProvider";
import { MutationType, Tables } from "@/types/common";
import EmployeeFormFields from "../designation/DesignationFormFields";

type Props<T> = {
  toEditItem?: T;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  from?: "tableAction" | string;
};

function EditEmployee<T extends TDataFields>({
  open,
  onOpen,
  toEditItem,
  from,
}: Props<T>) {
  const form = useForm<TDataFields>({
    values: {
      id: toEditItem?.id || "",
      employeeId: toEditItem?.employeeId || "",
      firstName: toEditItem?.firstName || "",
      lastName: toEditItem?.lastName || "",
      middleName: toEditItem?.middleName || "",
      age: toEditItem?.age || "",
    } as TDataFields,
  });

  const { editMutation } = useEmployeeQuery();

  return from === "tableAction" ? (
    <DropDownEditSheet table={Tables.EMPLOYEES} open={open} onOpen={onOpen}>
      <Form {...form}>
        <FormSubmit<TDataFields>
          mutation={editMutation}
          form={form}
          from={Tables.EMPLOYEES}
        >
          <EmployeeFormFields<TDataFields>
            form={form}
            mutationType={MutationType.UPDATE}
          />
        </FormSubmit>
      </Form>
    </DropDownEditSheet>
  ) : (
    <Form {...form}>
      <FormSubmit<TDataFields>
        mutation={editMutation}
        form={form}
        from={Tables.EMPLOYEES}
      >
        <EmployeeFormFields<TDataFields>
          form={form}
          mutationType={MutationType.UPDATE}
        />
      </FormSubmit>
    </Form>
  );
}

export default EditEmployee;
