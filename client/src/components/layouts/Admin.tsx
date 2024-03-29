import { Navigate, Outlet, redirect } from "react-router-dom";

import { QueryClient } from "@tanstack/react-query";
import { getUser } from "../pages/root/auth/api/auth.api";
import { useEffect, useState } from "react";
import { fetch } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { Links } from "@/types/common";

export const loader = (queryClient: QueryClient) => async () => {
  try{
    return await queryClient.ensureQueryData(getUser())
  }catch (error) {
    return redirect("/login");
  }
};

function Admin() {
  const [isAuth, setIsAuth] = useState(true);
  async function logoutUser() {
    await fetch.post("/auth/logout");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  }

  fetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuth(false);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (isAuth) return;
    logoutUser();
  }, [isAuth]);

  return (
    <section className="bg-background">
      {isAuth ? <Outlet /> : <Navigate to={Links.LOGIN} replace={true} /> } 
    </section>
  );
}

export default Admin;
