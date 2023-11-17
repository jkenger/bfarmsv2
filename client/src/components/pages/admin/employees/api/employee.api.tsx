import { toast } from "@/components/ui/use-toast";
import fetch from "@/lib/utils";
import { QueryKeys } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import { TEmployeeInputs } from "../form/EmployeeAddForm";
import { UseFormReturn } from "react-hook-form";
import { AxiosError } from "axios";

type TEmployeeMutation = {
  queryClient: QueryClient;
  form: UseFormReturn<TEmployeeInputs, unknown, undefined>;
};

export const getEmployees = () => {
  return {
    queryKey: [QueryKeys.EMPLOYEES],
    queryFn: async () => {
      try {
        // await new Promise((r) => setTimeout(r, 3000));

        return await fetch.get("/admin/employees");
      } catch (err) {
        const error = err as Error;
        return error.message;
      }
    },
  };
};

export const createEmployee = ({ queryClient, form }: TEmployeeMutation) => {
  const sheetCloseBtn = document.getElementById("sheetCloseBtn");
  return {
    mutationFn: async (data: TEmployeeInputs) => {
      await fetch.post("/admin/employees", {
        ...data,
      });
    },
    onSuccess: async () => {
      toast({
        title: "Employee created",
        description: "Employee has been created successfully",
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
      sheetCloseBtn?.click();
      form.reset();
    },
    onError: async (error: AxiosError) => {
      toast({
        title: "Error",
        description: error.response?.data as string,
      });
    },
  };
};
