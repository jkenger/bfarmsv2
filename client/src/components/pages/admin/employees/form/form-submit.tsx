import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";

type Props<T> = {
  form: UseFormReturn<T & FieldValues, unknown, undefined>;
  mutation?: UseMutationResult<void, Error, TDataFields, unknown>;

  children: React.ReactNode;
};

function FormSubmit<T extends TDataFields>({
  form,
  mutation,
  children,
}: Props<T>) {
  // const formValues = form.getValues();
  const onSubmit: SubmitHandler<T> = (data) => {
    const closeSheet = document.getElementById("sheetCloseBtn");
    console.log(data);
    mutation?.mutate(data as TDataFields);
    closeSheet?.click();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-4 text-xs flex flex-col gap-4"
    >
      {children}
    </form>
  );
}

export default FormSubmit;
