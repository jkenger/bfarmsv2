import {  Link, useNavigate } from "react-router-dom";
import BFARLogo from "../../../ui/logo";
import { Links, MutationType, Roles } from "@/types/common";
import BfarHeading from "../../../ui/bfar-heading";
import LoginFields from "./form/login-fields";
import { useForm } from "react-hook-form";
import { loginValues } from "./form/form-values";
import FormSubmit from "../../admin/shareable/form-submit";
import { useQueryProvider } from "@/components/context/query-provider";
import { Form } from "@/components/ui/form";


function Login({ assign }: { assign: Roles }) {
  
  const form = useForm<TDataFields>({
    defaultValues: loginValues(),
  });
  const { createMutation } = useQueryProvider();
  const navigate = useNavigate()

  return (
    <main className="flex h-screen">
      <div className="left-side w-full sm:2/5 md:w-1/3 flex items-center justify-center">
        <div className="px-6 space-y-10 w-full md:w-5/6 -mt-14">
          <div className="flex items-center gap-2">
            <BFARLogo cn="w-20 h-16" />
            <BfarHeading />
          </div>
          <div>
            <p className="font-semibold">Sign in to your account</p>
            <p className="text-sm">
              Access {assign === Roles.ADMIN ? Roles.EMPLOYEE : Roles.ADMIN}{" "}
              <Link
                to={assign === Roles.ADMIN ? Links.LOGIN : Links.LOGIN}
                className="text-primary"
              >
                portal.
              </Link>
            </p>
          </div>
          <div className="inputs space-y-4">
            <Form {...form}>
              <FormSubmit<TDataFields>
                form={form}
                mutation={createMutation}
                mutationType={MutationType.CREATE}
                mutationOptions={{
                  onSuccess: (data: void) => {
                    console.log(data)
                    // @ts-expect-error: data is void
                    const is2FAEnabled = data.data.twofaEnabled
                    if(is2FAEnabled){
                      // @ts-expect-error: data is void
                      navigate(Links.LOGIN_STEP2 + `?email=${data.data.user}`);
                    }else{
                      navigate(Links.DASHBOARD);
                    }
                }}}
              >
                <LoginFields form={form} />
              </FormSubmit>
            </Form>
          </div>
        </div>
      </div>
      <div className="right-side hidden sm:3/5 md:w-2/3 md:bg-primary md:flex items-center justify-center">
        <BFARLogo />
      </div>
    </main>
  );
}

export default Login;
