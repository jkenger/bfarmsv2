import DropDownEditSheet from "@/components/ui/dd-edit-sheet";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import FormSubmit from "../../../shareable/form-submit";
import { MutationType, Tables } from "@/types/common";
import EmployeeFormFields from "./EmployeeFormFields";
import { useQueryProvider } from "@/components/context/query-provider";

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
      id: toEditItem ? toEditItem.id : "",
      employeeId: toEditItem ? toEditItem.employeeId : "",
      firstName: toEditItem ? toEditItem.firstName : "",
      middleName: toEditItem ? toEditItem.middleName : "",
      lastName: toEditItem ? toEditItem.lastName : "",
      age: toEditItem ? toEditItem.age : "",
      designationId: toEditItem ? toEditItem.designationId : "",
      payrollGroupId: toEditItem ? toEditItem.payrollGroupId : "",
      deductions: toEditItem ? toEditItem.deductions : "",
    } as TDataFields,
  });

  const { editMutation } = useQueryProvider();

  return from === "tableAction" ? (
    <DropDownEditSheet table={Tables.EMPLOYEES} open={open} onOpen={onOpen}>
      <Form {...form}>
        <FormSubmit<TDataFields>
          mutation={editMutation}
          form={form}
          mutationType={MutationType.UPDATE}
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
        mutationType={MutationType.UPDATE}
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
