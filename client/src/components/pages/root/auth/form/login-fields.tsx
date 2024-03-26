import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useLayoutEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";



type Props = {
  form: UseFormReturn<TDataFields, unknown, undefined>;
};

function LoginFields({ form }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-foreground">Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="column_data" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-foreground">Password</FormLabel>
            <FormControl>
              <Input type="text" placeholder="column_data" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div
        className="flex justify-end w-full gap-2"
        id="sheetFooter"
      >
        <Button variant="default" type="submit">
          Login
        </Button>
      </div>
    </>
  );
}

export default LoginFields;
