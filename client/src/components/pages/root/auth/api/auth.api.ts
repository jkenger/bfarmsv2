import { AuthProviderAccess } from "@/components/context/auth-provider";
import { fetch } from "@/lib/utils";
import { Links, QueryKeys } from "@/types/common";
import { AxiosResponse } from "axios";

import { redirect } from "react-router-dom";
import { toast } from "sonner";

export const login = ({ form }: TMutation) => {
  return {
    mutationKey: [QueryKeys.LOGIN],
    mutationFn: async (data: TLogin) => {
      const result = await fetch.post("/auth/login", {
        ...data,
      });
      return result
    },
    onSuccess: async (data?: AxiosResponse) => {
      const { account } = data?.data || {};
      toast.success(`Login Successfully`, {
        description: "You have successfully logged in.",
      });
      
      AuthProviderAccess?.setUser(account);
      form?.reset();
    },
    onError: async () => {
      toast.error(`Login Failed`, {
        description:
          "The email or password you entered is incorrect. Please try again.",
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