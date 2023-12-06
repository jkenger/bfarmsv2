import { fetch } from "@/lib/utils";
import { QueryClient, keepPreviousData } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";

import { QueryKeys } from "@/types/common";
import { getSearchParams } from "@/components/hooks/useFilterParams";
import { toast } from "sonner";

type TEmployeeMutation = {
  queryClient: QueryClient;
  form?: UseFormReturn<TDataFields, unknown, undefined>;
};

export type getEmployeeResponse = {
  data: TDataFields[];
  numOfPages: number;
};

export const getEmployees = () => {
  const { searchParams: employeeSearchParams } = getSearchParams();
  const searchParams = new URLSearchParams(employeeSearchParams);
  return {
    queryKey: [QueryKeys.EMPLOYEES, searchParams.toString()],
    queryFn: async () => {
      return await fetch.get(`/admin/employees?${searchParams.toString()}`);
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  };
};

export const createEmployee = ({ queryClient, form }: TEmployeeMutation) => {
  return {
    mutationKey: [QueryKeys.CREATE_EMPLOYEE],
    mutationFn: async (data: TDataFields) => {
      await fetch.post("/admin/employees", {
        ...data,
        age: Number(data.age),
      });
    },
    onSuccess: async () => {
      toast.success(`Employee Created`, {
        description: "A new employee has been successfully addded.",
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Delete Employee`, {
        description:
          "The employee could not be removed due to an issue. Please try again.",
      });
    },
  };
};

export const editEmployee = ({ queryClient, form }: TEmployeeMutation) => {
  const sheetCloseBtn = document.getElementById("sheetCloseBtn");
  return {
    mutationKey: [QueryKeys.EDIT_EMPLOYEE],
    mutationFn: async (data: TDataFields) => {
      await fetch.put(`/admin/employees/${data.id}`, {
        ...data,
      });
    },
    onSuccess: async () => {
      toast.success(`Employee Updated`, {
        description: "Changes to the employee details have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
      sheetCloseBtn?.click();
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Update Employee`, {
        description:
          "Changes to the employee details could not be saved. Please retry.",
      });
    },
  };
};

export const deleteEmployee = ({ queryClient }: TEmployeeMutation) => {
  return {
    mutationKey: [QueryKeys.DELETE_EMPLOYEE],
    mutationFn: async (data: TDataFields) => {
      await fetch.delete(`/admin/employees/${data.id}`);
    },
    onSuccess: async () => {
      toast.warning(`Employee Deleted`, {
        className: "bg-primary",
        description: "The employee has been removed from the records.",
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
    },
    onError: async () => {
      toast.error("Failed to Delete Employee", {
        description:
          "The employee could not be removed due to an issue. Please try again.",
      });
    },
  };
};
