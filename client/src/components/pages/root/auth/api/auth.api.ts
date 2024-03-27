import { AuthProviderAccess } from "@/components/context/auth-provider";
import { fetch } from "@/lib/utils";
import { Links, QueryKeys } from "@/types/common";

import { redirect } from "react-router-dom";
import { toast } from "sonner";

export const login = () => {
  return {
    mutationKey: [QueryKeys.LOGIN],
    mutationFn: async (data: TLogin) => {
      const result = await fetch.post("/auth/login", {
        ...data,
      });
      return result
    },
    onError: async () => {
      toast.error(`Login Failed`, {
        description:
          "The email or password you entered is incorrect. Please try again.",
      });
    },
  };
};

export const loginStep2 = () => {
  return {
    mutationKey: [QueryKeys.LOGIN_STEP2],
    mutationFn: async (data: TStep2) => {
      const result = await fetch.post("/auth/login-step2", {
        ...data,
      });
      return result;
    },
    onSuccess: async () => {
      toast.success(`Login Successfully`, {
        description: "You have successfully logged in.",
      });
    },
    onError: async () => {
      toast.error(`Invalid 2FA Code`, {
        description:
          "The OTP you entered is incorrect. Please try again.",
      });
    },
  };
};

export const getUser = () => {
  return {
    queryKey: [QueryKeys.GET_USER],
    queryFn: async () => {
      try{
        const response = await fetch.get("/auth/current-account");
        AuthProviderAccess.setUser(response.data.account);
        return response.data.account;
      }catch(error){
        return redirect(Links.LOGIN);
      }
    },
  };
}