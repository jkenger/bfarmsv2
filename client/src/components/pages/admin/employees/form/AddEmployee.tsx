import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import FormSubmit from "./form-submit";

function AddEmployee() {
  const form = useForm<TEmployeeInputs>({
    defaultValues: {
      employeeId: "",
      firstName: "",
      lastName: "",
      age: "",
    },
  });

  return (
    <Form {...form}>
      <FormSubmit session="create" form={form} />
    </Form>
  );
}

export default AddEmployee;
