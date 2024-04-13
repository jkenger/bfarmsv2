import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { iconPropertiesDefault } from "@/types/common";
import { PencilLine } from "lucide-react";
import { useForm } from "react-hook-form";

type TUpdateAccount = {
  id: string;
  email: string;
  username?: string;
  password?: string;
};

const formValues = (toEditItem?: TUpdateAccount): TUpdateAccount => {
  return {
    email: toEditItem?.email || "",
    username: toEditItem?.username || "",
    password: "",
  } as TUpdateAccount;
};

export function UpdateAccountForm({
  toEditItem,
}: {
  toEditItem?: TUpdateAccount;
}) {
  // 1. Define your form.
  const form = useForm<TUpdateAccount>({
    values: {
      ...formValues(toEditItem),
      id: toEditItem ? toEditItem.id : "",
    } as TDataFields,
  });

  // 2. Define a submit handler.
  function onSubmit(values: TUpdateAccount) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mt-4 max-w-md"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            console.log(form);
            return (
              <FormItem>
                <div className="flex jusitfy-between items-center w-full">
                  <FormLabel>Email</FormLabel>
                  <Button type="button" variant="link" onClick={() => {}}>
                    Change password
                    <PencilLine {...iconPropertiesDefault} className="ml-2" />
                  </Button>
                </div>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button variant="outline" type="submit">
          Update account
        </Button>
      </form>
    </Form>
  );
}
