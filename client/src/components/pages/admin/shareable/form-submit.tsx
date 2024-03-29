import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { MutateOptions, UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { MutationType } from "@/types/common";
import { cn } from "@/lib/utils";

type Props<T> = {
  form: UseFormReturn<T & FieldValues, unknown, undefined>;
  mutation?: UseMutationResult<void, Error, TDataFields, unknown>;
  mutationType: MutationType;
  children: React.ReactNode;
  onSubmitFn?: () => void;
  mutationOptions?: MutateOptions<void, Error, TDataFields, unknown> | undefined;
  formClasses?: string;
};

function FormSubmit<T extends TDataFields>({
  form,
  mutation,
  children,
  onSubmitFn,
  mutationType = MutationType.CREATE,
  mutationOptions,
  formClasses = "",
}: Props<T>) {
  // const formValues = form.getValues();
  const onSubmit: SubmitHandler<T> = (data) => {
    const closeSheet = document.getElementById("sheetCloseBtn");

    if (
      JSON.stringify(form.formState.defaultValues) === JSON.stringify(data) &&
      mutationType === MutationType.UPDATE
    ) {
      toast.warning(`No Changes Detected`, {
        description: "No changes were made to the form.",
      });
      return;
    }
    console.log(data);
    mutation?.mutate(data as TDataFields, mutationOptions);
    form.reset();
    onSubmitFn?.();
    closeSheet?.click();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("my-4 text-xs flex flex-col gap-4", formClasses)}
    >
      {children}
    </form>
  );
}

export default FormSubmit;
