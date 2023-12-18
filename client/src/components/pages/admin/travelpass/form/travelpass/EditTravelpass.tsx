import DropDownEditSheet from "@/components/ui/dd-edit-sheet";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import FormSubmit from "../../../shareable/form-submit";
import { MutationType, Tables } from "@/types/common";
import TravelpassFields from "./TravelpassFields";
import { useQueryProvider } from "@/components/context/query-provider";

type Props<T> = {
  toEditItem?: T;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  from?: "tableAction" | string;
};

function EditTravelpass<T extends TDataFields>({
  open,
  onOpen,
  toEditItem,
  from,
}: Props<T>) {
  const form = useForm<TDataFields>({
    values: {
      id: toEditItem ? toEditItem.id : "",
      userId: toEditItem ? toEditItem.userId : "",
      typeOf: toEditItem ? toEditItem.typeOf : "",
      start: toEditItem ? toEditItem.start : "",
      end: toEditItem ? toEditItem.end : "",
    } as TDataFields,
  });

  const { editMutation } = useQueryProvider();

  return from === "tableAction" ? (
    <DropDownEditSheet table={Tables.TRAVELPASS} open={open} onOpen={onOpen}>
      <Form {...form}>
        <FormSubmit<TDataFields>
          mutation={editMutation}
          form={form}
          mutationType={MutationType.UPDATE}
        >
          <TravelpassFields form={form} mutationType={MutationType.UPDATE} />
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
        <TravelpassFields form={form} mutationType={MutationType.UPDATE} />
      </FormSubmit>
    </Form>
  );
}

export default EditTravelpass;
