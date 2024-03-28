import { buttonVariants } from "@/components/ui/button";
import BFARLogo from "@/components/ui/logo";
import { IconProperties, Links, MutationType } from "@/types/common";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { step2Values } from "./form/form-values";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormSubmit from "../../admin/shareable/form-submit";
import { useQueryProvider } from "@/components/context/query-provider";
import LoginStep2Fields from "./form/login-step2-fields";

const LoginStep2 = () => {
  const form = useForm<TDataFields>({
    defaultValues: step2Values(),
  });
  const { createMutation } = useQueryProvider();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") ?? "";
  const twofaCode = searchParams.get("devOTP") ?? "";
  const timeRemaining = searchParams.get("devTimeRemaining") ?? "";
  return (
    <main className="relative w-screen h-[100vh]">
      <Link
        className={
          buttonVariants({
            variant: "outline",
          }) + " absolute top-6 left-2"
        }
        to={Links.LOGIN}
      >
        <ChevronLeft
          strokeWidth={IconProperties.STROKE_WIDTH}
          size={IconProperties.SIZE}
        />
      </Link>
      <div className="-mt-4 w-inherit h-[100vh] flex items-center justify-center">
        <div className="flex flex-col items-start gap-3">
          <BFARLogo cn="w-20 h-18" />
          <h2 className="text-2xl font-bold">Verify your indetity</h2>
          <p className="text-xs text-muted-foreground max-w-sm">
            Use the code from your 2FA Authenticator App on your phone to
            confirm this login.
          </p>
          <div>
            <h2 className="text-lg font-bold">Account</h2>
            <p className="text-xs ml-2 mt-2">{email}</p>
          </div>

          <Form {...form}>
            <FormSubmit<TDataFields>
              form={form}
              mutation={createMutation}
              mutationType={MutationType.CREATE}
              mutationOptions={{
                onSuccess: () => {
                  navigate(Links.DASHBOARD);
                },
              }}
              formClasses="mt-0 w-full"
            >
              <LoginStep2Fields form={form} />
            </FormSubmit>
          </Form>
          <div>
            <p className="text-yellow-500">DEV PURPOSE ONLY:</p>
            <h2 className="text-lg font-bold">Time Remaining</h2>
            <p className="text-xs ml-2 mt-2">{timeRemaining}s</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">2FA Code</h2>
            <p className="text-xs ml-2 mt-2">{twofaCode}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginStep2;
