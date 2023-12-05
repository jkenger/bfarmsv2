import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";

import { Tables } from "@/types/common";
import { identifyMutation } from "@/lib/utils";

type Props<T> = {
  form: UseFormReturn<T & FieldValues, unknown, undefined>;
  mutation?: UseMutationResult<void, Error, TDataFields, unknown>;
  from: Tables;
  children: React.ReactNode;
};

function FormSubmit<T extends TDataFields>({
  form,
  mutation,
  from,
  children,
}: Props<T>) {
  const onSubmit: SubmitHandler<T> = (data) => {
    const closeSheet = document.getElementById("sheetCloseBtn");
    let dataToMutate: TDataFields;
    if (!from) dataToMutate = data;
    
    // Identify where the mutation is coming from
    else dataToMutate = identifyMutation(from, data);

    mutation?.mutate(dataToMutate as TDataFields);
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
