import { Outlet, defer, useNavigate } from "react-router-dom";

import { QueryClient } from "@tanstack/react-query";
import { getUser } from "../pages/root/auth/api/auth.api";
import { useEffect, useState } from "react";
import { fetch } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { Links } from "@/types/common";

export const loader = (queryClient: QueryClient) => async () => {
  return defer({
    data: queryClient.ensureQueryData(getUser()),
  });
};

function Admin() {
  const [isAuth, setIsAuth] = useState(true);
  const navigate = useNavigate();

  async function logoutUser() {
    navigate(Links.LOGIN);
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
      <Outlet />
    </section>
  );
}

export default Admin;
