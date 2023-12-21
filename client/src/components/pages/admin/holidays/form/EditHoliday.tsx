import DropDownEditSheet from "@/components/ui/dd-edit-sheet";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { MutationType, Tables } from "@/types/common";
import FormSubmit from "../../shareable/form-submit";
import HolidayFields from "./HolidayFields";
import { useQueryProvider } from "@/components/context/query-provider";
import { values } from "./form-values";

type Props<T> = {
  toEditItem?: T;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  from?: "tableAction" | string;
};

function EditHoliday<T extends TDataFields>({
  open,
  onOpen,
  toEditItem,
  from,
}: Props<T>) {
  const form = useForm<TDataFields>({
    values: {
      ...values(toEditItem),
      id: toEditItem?.id || "",
    } as TDataFields,
  });

  const { editMutation } = useQueryProvider();

  return from === "tableAction" ? (
    <DropDownEditSheet table={Tables.DESIGNATIONS} open={open} onOpen={onOpen}>
      <Form {...form}>
        <FormSubmit<TDataFields>
          mutation={editMutation}
          form={form}
          mutationType={MutationType.UPDATE}
        >
          <HolidayFields form={form} mutationType={MutationType.UPDATE} />
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
        <HolidayFields form={form} mutationType={MutationType.UPDATE} />
      </FormSubmit>
    </Form>
  );
}

export default EditHoliday;
