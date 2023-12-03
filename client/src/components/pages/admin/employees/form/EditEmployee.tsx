import DropDownEditSheet from "@/components/ui/dd-edit-sheet";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { useEmployee } from "../providers/EmployeeProvider";
import FormSubmit from "./form-submit";

type Props<T> = {
  toEditItem?: T;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  from?: "tableAction" | string;
};

function EditEmployee<T extends TAdminForms>({
  open,
  onOpen,
  toEditItem,
  from,
}: Props<T>) {
  const form = useForm<TAdminForms>({
    values: {
      id: toEditItem?.id || "",
      employeeId: toEditItem?.employeeId || "",
      firstName: toEditItem?.firstName || "",
      lastName: toEditItem?.lastName || "",
      middleName: toEditItem?.middleName || "",
      age: toEditItem?.age || "",
    },
  });

  const { editMutation } = useEmployee();

  return from === "tableAction" ? (
    <DropDownEditSheet table="employees" open={open} onOpen={onOpen}>
      <Form {...form}>
        <FormSubmit<TAdminForms> mutation={editMutation} form={form} />
      </Form>
    </DropDownEditSheet>
  ) : (
    <Form {...form}>
      <FormSubmit<TAdminForms> mutation={editMutation} form={form} />
    </Form>
  );
}

export default EditEmployee;
