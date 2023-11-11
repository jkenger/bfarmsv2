import { Link } from "react-router-dom";
import BFARLogo from "../ui/logo";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import { Links, Roles } from "@/types";
import BfarHeading from "../ui/bfar-heading";

function Login({ assign }: { assign: Roles }) {
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
                to={assign === Roles.ADMIN ? Links.LOGIN : Links.ADMIN_LOGIN}
                className="text-primary"
              >
                portal.
              </Link>
            </p>
          </div>
          <div className="inputs space-y-4">
            <div>
              <label htmlFor="email" className="">
                Email address
              </label>
              <Input type="text" />
            </div>
            <div>
              <label htmlFor="password" className="">
                Password
              </label>
              <Input type="password" />
            </div>
          </div>
          <div className="cta-submit w-full">
            <Button type="submit" className="w-full">
              Sign in{" "}
              <MoveRight size={16} strokeWidth={1.75} className="ml-1 " />
            </Button>
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
