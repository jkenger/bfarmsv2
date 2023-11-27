import DropDownEditSheet from "@/components/ui/dd-edit-sheet";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import FormSubmit from "./form-submit";

type Props<T> = {
  item: T;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditEmployee<T extends TEmployeeInputs>({
  open,
  onOpen,
  item,
}: Props<T>) {
  const form = useForm<TEmployeeInputs>({
    defaultValues: {
      id: item.id,
      employeeId: item.employeeId,
      firstName: item.firstName,
      lastName: item.lastName,
      middleName: item.middleName,
      age: item.age,
    },
  });
  return (
    <DropDownEditSheet table="employees" open={open} onOpen={onOpen}>
      <Form {...form}>
        <FormSubmit session="edit" form={form} />
      </Form>
      ,
    </DropDownEditSheet>
  );
}

export default EditEmployee;
