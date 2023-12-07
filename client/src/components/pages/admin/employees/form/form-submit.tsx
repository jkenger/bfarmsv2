import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { MutationType } from "@/types/common";

type Props<T> = {
  form: UseFormReturn<T & FieldValues, unknown, undefined>;
  mutation?: UseMutationResult<void, Error, TDataFields, unknown>;
  mutationType: MutationType;
  children: React.ReactNode;
};

function FormSubmit<T extends TDataFields>({
  form,
  mutation,
  children,
  mutationType = MutationType.CREATE,
}: Props<T>) {
  // const formValues = form.getValues();
  const onSubmit: SubmitHandler<T> = (data) => {
    const closeSheet = document.getElementById("sheetCloseBtn");

    if (!form.formState.isDirty && mutationType === MutationType.UPDATE) {
      toast.warning(`No Changes Detected`, {
        description: "No changes were made to the form.",
      });
      return;
    }

    mutation?.mutate(data as TDataFields);
    form.reset();
    closeSheet?.click();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="my-4 text-xs flex flex-col gap-4"
    >
      {children}
    </form>
  );
}

export default FormSubmit;
