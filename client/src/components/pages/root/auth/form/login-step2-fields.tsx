import { useQueryProvider } from "@/components/context/query-provider";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { useLayoutEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";

type Props = {
  form: UseFormReturn<TDataFields, unknown, undefined>;
};

function LoginStep2Fields({ form }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { createMutation } = useQueryProvider();
  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <>
      <FormField
        control={form.control}
        name="twofaToken"
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                {...field}
                ref={inputRef}
                disabled={createMutation.isPending}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-14 h-14" />
                  <InputOTPSlot index={1} className="w-14 h-14" />
                  <InputOTPSlot index={2} className="w-14 h-14" />
                  <InputOTPSlot index={3} className="w-14 h-14" />
                  <InputOTPSlot index={4} className="w-14 h-14" />
                  <InputOTPSlot index={5} className="w-14 h-14" />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <p className="text-xs text-muted-foreground">
        Lost your device?{" "}
        <Link to="/reset-2fa" className="text-primary underline">
          Reset your 2FA.
        </Link>
      </p>

      <Button
        variant="default"
        type="submit"
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? "Verifying..." : "Verify"}
      </Button>
    </>
  );
}

export default LoginStep2Fields;
