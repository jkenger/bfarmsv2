import { toast } from "@/components/ui/use-toast";
import fetch from "@/lib/utils";
import { QueryClient, keepPreviousData } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { AxiosError } from "axios";
import { QueryKeys } from "@/types/common";

type TEmployeeMutation = {
  queryClient: QueryClient;
  form?: UseFormReturn<TEmployeeInputs, unknown, undefined>;
};

type TQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  sp: string;
};

export const getEmployees = ({
  page = 1,
  limit = 10,
  search = "",
  sp,
}: TQueryParams) => {
  return {
    queryKey: [QueryKeys.EMPLOYEES, page, search, sp],
    queryFn: async () =>
      await fetch.get<TEmployees>(
        `/admin/employees?page=${page}&limit=${limit}&search=${search}&sp=${sp}`
      ),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
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
      form?.reset();
    },
    onError: async (error: AxiosError) => {
      toast({
        title: "Error",
        description: error.response?.data as string,
      });
    },
  };
};

export const editEmployee = ({ queryClient, form }: TEmployeeMutation) => {
  const sheetCloseBtn = document.getElementById("sheetCloseBtn");
  return {
    mutationFn: async (data: TEmployeeInputs) => {
      await fetch.put(`/admin/employees/${data.id}`, {
        ...data,
      });
    },
    onSuccess: async () => {
      toast({
        title: "Employee updated",
        description: "Employee has been updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
      sheetCloseBtn?.click();
      form?.reset();
    },
    onError: async (error: AxiosError) => {
      toast({
        title: "Error",
        description: error.response?.data as string,
      });
    },
  };
};

export const deleteEmployee = ({ queryClient }: TEmployeeMutation) => {
  return {
    mutationFn: async (id: string) => {
      await fetch.delete(`/admin/employees/${id}`);
    },
    onSuccess: async () => {
      toast({
        title: "Employee deleted",
        description: "Employee has been deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
    },
    onError: async (error: AxiosError) => {
      toast({
        title: "Error",
        description: error.response?.data as string,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
    },
  };
};
