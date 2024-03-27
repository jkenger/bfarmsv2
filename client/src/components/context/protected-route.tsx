import { fetch } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { Links } from "@/types/common";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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

  return <>{children}</>;
};