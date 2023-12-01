import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import FormSubmit from "./form-submit";

function AddEmployee({ item }: { item?: TEmployeeInputs }) {
  const form = useForm<TEmployeeInputs>({
    defaultValues: {
      employeeId: item ? item.employeeId : "",
      firstName: item ? item.firstName : "",
      lastName: item ? item.lastName : "",
      age: item ? item.age : "",
    },
  });

  return (
    <Form {...form}>
      <FormSubmit session="create" form={form} />
    </Form>
  );
}

export default AddEmployee;
